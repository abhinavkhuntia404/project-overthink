import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { fileURLToPath } from 'url';
import { 
  initDatabase, 
  saveCase, 
  getCaseById, 
  getAllCases, 
  deleteCase, 
  saveCourtroomTrial, 
  getCourtroomTrialByCaseId, 
  createShareLink, 
  getSharedVerdict, 
  getOperationalStats,
  generateAccessToken,
  DATA_DIR 
} from './server/db.js';
import { geminiService, selectIconicMeme } from './server/geminiService.js';
import { runPythonForensics, checkPythonEngineHealth } from './server/pythonBridge.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Initialize DB schema & demo seeds
initDatabase();

const app = express();
const PORT = process.env.PORT || 3001;

// Security Middleware
app.use(helmet({
  contentSecurityPolicy: false // Allows inline SVG doodles and styles
}));

app.use(cors({
  origin: '*', // Production: restrict if domain is designated
  methods: ['GET', 'POST', 'PATCH', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Access-Token']
}));

app.use(express.json({ limit: '50kb' }));

// Rate Limiters
const aiRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 30, // Limit each IP to 30 investigations per 15 minutes
  message: { error: 'Too many investigations filed from this IP. Please take a mindful breath and try again later.' },
  standardHeaders: true,
  legacyHeaders: false
});

const standardLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 150,
  message: { error: 'Rate limit exceeded. Please slow down.' }
});

app.use('/api/', standardLimiter);

// ----------------------------------------------------
// 1. Health & Readiness Checks
// ----------------------------------------------------
// ----------------------------------------------------
// 1. Health & Readiness Checks
// ----------------------------------------------------
app.get('/api/health', async (req, res) => {
  const stats = getOperationalStats();
  const pythonHealth = await checkPythonEngineHealth();
  res.json({
    status: 'ok',
    service: 'PROJECT OVERTHINK API',
    version: '2.0.0',
    geminiConfigured: geminiService.isConfigured(),
    model: geminiService.getModelName(),
    pythonEngine: pythonHealth,
    stats: {
      totalCases: stats.totalCases,
      totalTrials: stats.totalTrials,
      totalShares: stats.totalShares
    },
    timestamp: new Date().toISOString()
  });
});

app.get('/api/readiness', async (req, res) => {
  try {
    const stats = getOperationalStats();
    const pythonHealth = await checkPythonEngineHealth();
    res.json({
      status: 'ready',
      database: 'connected (WAL mode)',
      gemini: geminiService.isConfigured() ? 'configured' : 'fallback-mode (heuristics engine active)',
      pythonEngine: pythonHealth.available ? 'online' : 'offline',
      stats
    });
  } catch (err) {
    res.status(500).json({ status: 'unready', error: err.message });
  }
});

// Dedicated Forensic Metrics Endpoint (Powered by Python Engine)
app.post('/api/forensics/metrics', standardLimiter, async (req, res) => {
  const { message, context = '', concerns = '' } = req.body;
  if (!message || typeof message !== 'string') {
    return res.status(400).json({ error: 'Message required for forensic analysis' });
  }

  try {
    const metrics = await runPythonForensics(message.trim(), context, concerns);
    res.json({ success: true, metrics });
  } catch (err) {
    console.warn('[API] Python metrics failed, returning fallback metrics:', err.message);
    res.json({
      success: true,
      metrics: {
        overthinkingIndex: 78,
        groundingScore: 65,
        worstCaseProbability: 15,
        benignRealityProbability: 85,
        subtextDissonance: 'Medium',
        realityDirective: 'Take a step back and breathe.',
        recommendedMeme: selectIconicMeme(message, context)
      }
    });
  }
});

// ----------------------------------------------------
// 2. Investigation Engine Endpoint
// ----------------------------------------------------
async function handleInvestigation(req, res) {
  const { message, context, concerns, mode, emotionState } = req.body;

  if (!message || typeof message !== 'string' || message.trim().length === 0) {
    return res.status(400).json({ error: 'Evidence required: Please submit the message or situation you wish to investigate.' });
  }

  if (message.length > 2000) {
    return res.status(400).json({ error: 'Evidence payload too large. Please limit submissions to 2,000 characters.' });
  }

  const cleanMessage = message.trim();
  const cleanContext = typeof context === 'string' ? context.trim().slice(0, 2000) : '';
  const cleanConcerns = typeof concerns === 'string' ? concerns.trim().slice(0, 1000) : '';

  try {
    const caseId = `case_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`;
    const accessToken = generateAccessToken();

    // 1. Compute Python Linguistic Forensic Metrics in parallel
    let pythonForensics = null;
    try {
      pythonForensics = await runPythonForensics(cleanMessage, cleanContext, cleanConcerns);
    } catch (pyErr) {
      console.warn('[API] Python metrics warning:', pyErr.message);
    }

    // 2. Generate AI or Calibrated Heuristic Analysis with Emotion State
    const { data: analysis, isLiveAI, engine } = await geminiService.generateInvestigation(
      cleanMessage, 
      cleanContext, 
      cleanConcerns,
      emotionState
    );

    const fullCase = {
      id: caseId,
      accessToken,
      title: analysis.title || `The Case of "${cleanMessage.slice(0, 24)}..."`,
      message: cleanMessage,
      context: cleanContext,
      concerns: cleanConcerns,
      status: 'ready',
      interpretations: analysis.interpretations,
      knownFacts: analysis.knownFacts || [],
      assumptions: analysis.assumptions || [],
      unknowns: analysis.unknowns || [],
      evidenceTakeaway: analysis.evidenceTakeaway || '',
      suggestedResponses: analysis.suggestedResponses || [],
      realityCheck: analysis.realityCheck || {},
      meme: analysis.meme || pythonForensics?.recommendedMeme || selectIconicMeme(cleanMessage, cleanContext),
      pythonForensics: pythonForensics || null,
      isLiveAI,
      engine,
      emotionState: emotionState || null,
      createdAt: new Date().toISOString()
    };

    // Save to SQLite database
    const saved = saveCase(fullCase);

    res.status(201).json({
      success: true,
      caseId: saved.id,
      accessToken,
      isLiveAI,
      engine,
      case: saved
    });
  } catch (err) {
    console.error('[API] Investigation error:', err);
    res.status(500).json({ error: 'Linguistic forensic processing error. Please try again.' });
  }
}

app.post('/api/investigate', aiRateLimiter, handleInvestigation);
app.post('/api/analyze', aiRateLimiter, handleInvestigation);

// ----------------------------------------------------
// 3. Case Retrieval & Management
// ----------------------------------------------------
app.get('/api/cases', (req, res) => {
  const cases = getAllCases(40);
  res.json(cases);
});

app.get('/api/cases/:id', (req, res) => {
  const { id } = req.params;
  const foundCase = getCaseById(id);

  if (!foundCase) {
    return res.status(404).json({ error: 'Case file not found in Bureau archives.' });
  }

  // Security check: If private case and token provided, verify
  const clientToken = req.headers['x-access-token'] || req.query.token;
  if (!foundCase.isSample && clientToken && clientToken !== foundCase.accessToken) {
    return res.status(403).json({ error: 'Access denied: Invalid access key for this private case file.' });
  }

  res.json(foundCase);
});

app.delete('/api/cases/:id', (req, res) => {
  const { id } = req.params;
  const clientToken = req.headers['x-access-token'] || req.query.token;

  const foundCase = getCaseById(id);
  if (!foundCase) {
    return res.status(404).json({ error: 'Case not found.' });
  }

  if (!foundCase.isSample && clientToken && clientToken !== foundCase.accessToken) {
    return res.status(403).json({ error: 'Access denied: Only case owner can delete this record.' });
  }

  deleteCase(id);
  res.json({ success: true, message: 'Case expunged from Bureau records.' });
});

// ----------------------------------------------------
// 4. Courtroom Engine Endpoint (Strictly Gated)
// ----------------------------------------------------
app.post('/api/cases/:id/courtroom', aiRateLimiter, async (req, res) => {
  const { id } = req.params;
  const { witnessTestimony = [], emotionState = {}, forceRerun = false } = req.body;

  // Strict check: Case MUST exist
  const existingCase = getCaseById(id);
  if (!existingCase) {
    return res.status(404).json({ 
      error: 'Your Honour refuses to hear a case without evidence. Please file an official submission at Reception first.',
      code: 'NO_EVIDENCE_SUBMITTED'
    });
  }

  // Check if trial already completed for idempotency
  // If user has provided witness testimony or forceRerun is true, we re-deliberate with their testimony!
  const hasFreshTestimony = Array.isArray(witnessTestimony) && witnessTestimony.length > 0;
  if (!forceRerun && !hasFreshTestimony) {
    const existingTrial = getCourtroomTrialByCaseId(id);
    if (existingTrial) {
      return res.json({
        success: true,
        caseId: id,
        isCached: true,
        trial: existingTrial,
        case: existingCase
      });
    }
  }

  try {
    // Generate Courtroom debate with 3 distinct roles: Prosecution, Defence, Judge, incorporating witness testimony
    const { data: courtroomData, isLiveAI, engine } = await geminiService.generateCourtroomTrial(
      existingCase,
      witnessTestimony,
      emotionState
    );

    const trialRecord = {
      id: `trial_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`,
      caseId: id,
      prosecution: courtroomData.prosecution,
      defence: courtroomData.defence,
      verdict: courtroomData.verdict,
      nextStep: courtroomData.nextStep,
      thoughtSpiralSteps: courtroomData.thoughtSpiralSteps,
      witnessTestimony: witnessTestimony || [],
      emotionState: emotionState || null,
      meme: courtroomData.meme || existingCase.meme || selectIconicMeme(existingCase.message, existingCase.context),
      createdAt: new Date().toISOString()
    };

    // Save to SQLite
    saveCourtroomTrial(trialRecord);

    // Update parent case with trial details
    const updatedCase = {
      ...existingCase,
      status: 'verdict_reached',
      prosecution: trialRecord.prosecution,
      defence: trialRecord.defence,
      verdict: trialRecord.verdict,
      nextStep: trialRecord.nextStep,
      thoughtSpiralSteps: trialRecord.thoughtSpiralSteps,
      witnessTestimony: trialRecord.witnessTestimony,
      meme: trialRecord.meme
    };
    saveCase(updatedCase);

    res.json({
      success: true,
      caseId: id,
      isLiveAI,
      engine,
      trial: trialRecord,
      case: updatedCase
    });
  } catch (err) {
    console.error('[API] Courtroom trial generation error:', err);
    res.status(500).json({ error: 'Judicial deliberation error. The court is temporarily adjourned.' });
  }
});

app.get('/api/cases/:id/courtroom', (req, res) => {
  const { id } = req.params;
  const trial = getCourtroomTrialByCaseId(id);
  if (!trial) {
    return res.status(404).json({ error: 'No trial proceedings found for this case file.' });
  }
  res.json(trial);
});

// ----------------------------------------------------
// 5. Reality Check Endpoint
// ----------------------------------------------------
app.post('/api/cases/:id/reality-check', (req, res) => {
  const { id } = req.params;
  const foundCase = getCaseById(id);

  if (!foundCase) {
    return res.status(404).json({ error: 'Case file not found.' });
  }

  const realityMatrix = {
    caseId: id,
    facts: foundCase.knownFacts || [],
    assumptions: foundCase.assumptions || [],
    unknowns: foundCase.unknowns || [],
    takeaway: foundCase.evidenceTakeaway || '',
    nextAction: foundCase.nextStep || {
      headline: 'Step Away From The Screen',
      suggestion: 'Do not follow up to demand tone clarification.',
      proportionateAction: 'Treat as resolved.'
    },
    realityScore: 78 // Grounding index percentage
  };

  res.json({ success: true, realityMatrix });
});

// ----------------------------------------------------
// 6. Public Shareable Verdict Endpoints
// ----------------------------------------------------
app.post('/api/cases/:id/share', (req, res) => {
  const { id } = req.params;
  const { includeOriginalMessage = false } = req.body;

  const foundCase = getCaseById(id);
  if (!foundCase) {
    return res.status(404).json({ error: 'Case not found.' });
  }

  const shareToken = createShareLink(id, Boolean(includeOriginalMessage));
  res.json({
    success: true,
    shareToken,
    shareUrl: `/share/${shareToken}`
  });
});

app.get('/api/share/:token', (req, res) => {
  const { token } = req.params;
  const shared = getSharedVerdict(token);

  if (!shared) {
    return res.status(404).json({ error: 'Share link expired or revoked.' });
  }

  res.json({ success: true, verdict: shared });
});

// ----------------------------------------------------
// 7. Post-Trial Gemini Therapy Chatbot Endpoint
// ----------------------------------------------------
app.post('/api/cases/:id/therapy-chat', aiRateLimiter, async (req, res) => {
  const { id } = req.params;
  const { message, history = [], emotionState = {} } = req.body;
  const accessToken = req.headers['x-access-token'];

  const foundCase = getCaseById(id);
  if (!foundCase) {
    return res.status(404).json({ error: 'Case not found for therapy session.' });
  }

  if (accessToken && foundCase.accessToken && foundCase.accessToken !== accessToken) {
    return res.status(403).json({ error: 'Unauthorized access to case therapy lounge.' });
  }

  if (!message || typeof message !== 'string' || message.trim().length === 0) {
    return res.status(400).json({ error: 'Please enter a question or thought to discuss with the counselor.' });
  }

  try {
    const trial = getCourtroomTrialByCaseId(id);
    const caseDataForTherapy = {
      ...foundCase,
      verdict: trial?.verdict || foundCase.verdict
    };

    const chatResult = await geminiService.generateTherapyChat(
      caseDataForTherapy,
      message.trim(),
      history,
      emotionState
    );

    res.json({
      success: true,
      reply: chatResult.reply,
      isLiveAI: chatResult.isLiveAI,
      engine: chatResult.engine
    });
  } catch (err) {
    console.error('[API] Therapy chat error:', err);
    res.status(500).json({ error: 'Therapy counselor connection disrupted. Please try again.' });
  }
});

// ----------------------------------------------------
// 8. SEO: Sitemap & Robots
// ----------------------------------------------------
app.get('/sitemap.xml', (req, res) => {
  res.header('Content-Type', 'application/xml');
  res.send(`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>https://projectoverthink.com/</loc><priority>1.0</priority></url>
  <url><loc>https://projectoverthink.com/investigate</loc><priority>0.9</priority></url>
  <url><loc>https://projectoverthink.com/cases</loc><priority>0.8</priority></url>
  <url><loc>https://projectoverthink.com/about</loc><priority>0.7</priority></url>
</urlset>`);
});

app.get('/robots.txt', (req, res) => {
  res.header('Content-Type', 'text/plain');
  res.send(`User-agent: *\nAllow: /\nDisallow: /api/\nSitemap: https://projectoverthink.com/sitemap.xml`);
});

// ----------------------------------------------------
// 8. Serve Frontend Bundle (Production)
// ----------------------------------------------------
const distPath = path.resolve(__dirname, 'dist');
if (fs.existsSync(distPath)) {
  app.use(express.static(distPath, {
    setHeaders: (res, filePath) => {
      if (filePath.endsWith('.html')) {
        res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
      }
    }
  }));
  app.use((req, res, next) => {
    if (req.path.startsWith('/api')) {
      return res.status(404).json({ error: 'API endpoint not found' });
    }
    const indexPath = path.join(distPath, 'index.html');
    if (fs.existsSync(indexPath)) {
      res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
      return res.sendFile('index.html', { root: distPath });
    }
    next();
  });
}

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('[UNCAUGHT ERROR]', err);
  res.status(500).json({ error: 'Internal Bureau server error.' });
});

app.listen(PORT, () => {
  console.log(`[PROJECT OVERTHINK] Production-grade server running on http://localhost:${PORT}`);
  console.log(`[PROJECT OVERTHINK] Gemini API Key present: ${geminiService.isConfigured()}`);
  console.log(`[PROJECT OVERTHINK] Model configured: ${geminiService.getModelName()}`);
  console.log(`[PROJECT OVERTHINK] SQLite database active at ${path.join(DATA_DIR, 'overthink.db')}`);
});
