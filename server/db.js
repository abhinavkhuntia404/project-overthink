import Database from 'better-sqlite3';
import path from 'path';
import fs from 'fs';
import crypto from 'crypto';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const DATA_DIR = path.join(__dirname, '..', 'data');
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

export const DB_PATH = path.join(DATA_DIR, 'overthink.db');
const db = new Database(DB_PATH);

// Enable WAL mode for high concurrency & performance
db.pragma('journal_mode = WAL');
db.pragma('foreign_keys = ON');

// Initialize database schema
export function initDatabase() {
  db.exec(`
    CREATE TABLE IF NOT EXISTS cases (
      id TEXT PRIMARY KEY,
      access_token TEXT NOT NULL,
      title TEXT NOT NULL,
      original_message TEXT NOT NULL,
      context TEXT,
      concerns TEXT,
      status TEXT NOT NULL,
      analysis_json TEXT,
      is_sample INTEGER DEFAULT 0,
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS courtroom_trials (
      id TEXT PRIMARY KEY,
      case_id TEXT NOT NULL,
      prosecution_json TEXT NOT NULL,
      defence_json TEXT NOT NULL,
      verdict_json TEXT NOT NULL,
      meme_json TEXT,
      created_at TEXT NOT NULL,
      FOREIGN KEY (case_id) REFERENCES cases(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS shareable_verdicts (
      share_token TEXT PRIMARY KEY,
      case_id TEXT NOT NULL,
      include_original_message INTEGER DEFAULT 0,
      is_public INTEGER DEFAULT 1,
      created_at TEXT NOT NULL,
      expires_at TEXT,
      FOREIGN KEY (case_id) REFERENCES cases(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS operational_logs (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      event_type TEXT NOT NULL,
      duration_ms INTEGER,
      model_used TEXT,
      status TEXT,
      created_at TEXT NOT NULL
    );

    CREATE INDEX IF NOT EXISTS idx_cases_token ON cases(access_token);
    CREATE INDEX IF NOT EXISTS idx_cases_created ON cases(created_at);
    CREATE INDEX IF NOT EXISTS idx_trials_case ON courtroom_trials(case_id);
    CREATE INDEX IF NOT EXISTS idx_shares_case ON shareable_verdicts(case_id);
  `);

  seedDemoCasesIfEmpty();
}

// Generate secure random access token for case ownership
export function generateAccessToken() {
  return crypto.randomBytes(24).toString('hex');
}

export function generateShareToken() {
  return crypto.randomBytes(16).toString('hex');
}

// Case Operations
export function saveCase(caseData) {
  const stmt = db.prepare(`
    INSERT INTO cases (id, access_token, title, original_message, context, concerns, status, analysis_json, is_sample, created_at, updated_at)
    VALUES (@id, @access_token, @title, @original_message, @context, @concerns, @status, @analysis_json, @is_sample, @created_at, @updated_at)
    ON CONFLICT(id) DO UPDATE SET
      title = excluded.title,
      status = excluded.status,
      analysis_json = excluded.analysis_json,
      updated_at = excluded.updated_at
  `);

  stmt.run({
    id: caseData.id,
    access_token: caseData.accessToken || caseData.access_token || generateAccessToken(),
    title: caseData.title || 'Untitled Case',
    original_message: caseData.message || caseData.original_message || '',
    context: caseData.context || '',
    concerns: caseData.concerns || '',
    status: caseData.status || 'created',
    analysis_json: JSON.stringify(caseData),
    is_sample: caseData.isSample ? 1 : 0,
    created_at: caseData.createdAt || new Date().toISOString(),
    updated_at: new Date().toISOString()
  });

  return getCaseById(caseData.id);
}

export function getCaseById(id) {
  const stmt = db.prepare('SELECT * FROM cases WHERE id = ?');
  const row = stmt.get(id);
  if (!row) return null;

  try {
    const analysis = row.analysis_json ? JSON.parse(row.analysis_json) : {};
    return {
      ...analysis,
      id: row.id,
      title: row.title,
      message: row.original_message,
      context: row.context,
      concerns: row.concerns,
      status: row.status,
      isSample: row.is_sample === 1,
      createdAt: row.created_at,
      updatedAt: row.updated_at,
      accessToken: row.access_token
    };
  } catch (err) {
    console.error('Failed to parse analysis_json for case:', id, err);
    return null;
  }
}

export function getAllCases(limit = 50) {
  const stmt = db.prepare('SELECT * FROM cases ORDER BY created_at DESC LIMIT ?');
  const rows = stmt.all(limit);
  return rows.map(row => {
    try {
      const parsed = row.analysis_json ? JSON.parse(row.analysis_json) : {};
      return {
        ...parsed,
        id: row.id,
        title: row.title,
        message: row.original_message,
        context: row.context,
        status: row.status,
        isSample: row.is_sample === 1,
        createdAt: row.created_at,
        accessToken: row.access_token
      };
    } catch {
      return {
        id: row.id,
        title: row.title,
        message: row.original_message,
        context: row.context,
        status: row.status,
        createdAt: row.created_at
      };
    }
  });
}

export function deleteCase(id) {
  const stmt = db.prepare('DELETE FROM cases WHERE id = ?');
  const result = stmt.run(id);
  return result.changes > 0;
}

// Trial Operations
export function saveCourtroomTrial(trialData) {
  const stmt = db.prepare(`
    INSERT INTO courtroom_trials (id, case_id, prosecution_json, defence_json, verdict_json, meme_json, created_at)
    VALUES (@id, @case_id, @prosecution_json, @defence_json, @verdict_json, @meme_json, @created_at)
    ON CONFLICT(id) DO UPDATE SET
      prosecution_json = excluded.prosecution_json,
      defence_json = excluded.defence_json,
      verdict_json = excluded.verdict_json,
      meme_json = excluded.meme_json
  `);

  stmt.run({
    id: trialData.id || `trial_${Date.now()}`,
    case_id: trialData.caseId,
    prosecution_json: JSON.stringify(trialData.prosecution || {}),
    defence_json: JSON.stringify(trialData.defence || {}),
    verdict_json: JSON.stringify(trialData.verdict || {}),
    meme_json: JSON.stringify(trialData.meme || null),
    created_at: trialData.createdAt || new Date().toISOString()
  });

  // Update parent case status
  db.prepare('UPDATE cases SET status = ?, updated_at = ? WHERE id = ?')
    .run('verdict_reached', new Date().toISOString(), trialData.caseId);

  return trialData;
}

export function getCourtroomTrialByCaseId(caseId) {
  const stmt = db.prepare('SELECT * FROM courtroom_trials WHERE case_id = ? ORDER BY created_at DESC LIMIT 1');
  const row = stmt.get(caseId);
  if (!row) return null;

  return {
    id: row.id,
    caseId: row.case_id,
    prosecution: JSON.parse(row.prosecution_json || '{}'),
    defence: JSON.parse(row.defence_json || '{}'),
    verdict: JSON.parse(row.verdict_json || '{}'),
    meme: row.meme_json ? JSON.parse(row.meme_json) : null,
    createdAt: row.created_at
  };
}

// Shareable Verdict Operations
export function createShareLink(caseId, includeOriginalMessage = false) {
  const shareToken = generateShareToken();
  const stmt = db.prepare(`
    INSERT INTO shareable_verdicts (share_token, case_id, include_original_message, is_public, created_at)
    VALUES (?, ?, ?, 1, ?)
  `);
  stmt.run(shareToken, caseId, includeOriginalMessage ? 1 : 0, new Date().toISOString());
  return shareToken;
}

export function getSharedVerdict(shareToken) {
  const stmt = db.prepare(`
    SELECT s.share_token, s.include_original_message, s.created_at as shared_at,
           c.id as case_id, c.title, c.original_message, c.context, c.analysis_json,
           t.prosecution_json, t.defence_json, t.verdict_json, t.meme_json
    FROM shareable_verdicts s
    JOIN cases c ON s.case_id = c.id
    LEFT JOIN courtroom_trials t ON c.id = t.case_id
    WHERE s.share_token = ? AND s.is_public = 1
  `);
  const row = stmt.get(shareToken);
  if (!row) return null;

  const analysis = row.analysis_json ? JSON.parse(row.analysis_json) : {};
  const verdict = row.verdict_json ? JSON.parse(row.verdict_json) : analysis.verdict;
  const prosecution = row.prosecution_json ? JSON.parse(row.prosecution_json) : analysis.prosecution;
  const defence = row.defence_json ? JSON.parse(row.defence_json) : analysis.defence;
  const meme = row.meme_json ? JSON.parse(row.meme_json) : null;

  return {
    shareToken: row.share_token,
    title: row.title,
    sharedAt: row.shared_at,
    originalMessage: row.include_original_message === 1 ? row.original_message : '[Redacted for Privacy]',
    context: row.include_original_message === 1 ? row.context : undefined,
    verdict,
    prosecution,
    defence,
    meme,
    evidenceTakeaway: analysis.evidenceTakeaway,
    interpretations: analysis.interpretations
  };
}

export function revokeShareLink(shareToken) {
  const stmt = db.prepare('UPDATE shareable_verdicts SET is_public = 0 WHERE share_token = ?');
  const result = stmt.run(shareToken);
  return result.changes > 0;
}

// Operational Logging
export function logOperation(eventType, durationMs, modelUsed, status) {
  try {
    const stmt = db.prepare(`
      INSERT INTO operational_logs (event_type, duration_ms, model_used, status, created_at)
      VALUES (?, ?, ?, ?, ?)
    `);
    stmt.run(eventType, durationMs, modelUsed, status, new Date().toISOString());
  } catch (err) {
    console.error('Failed to write operational log:', err);
  }
}

export function getOperationalStats() {
  const totalCases = db.prepare('SELECT count(*) as count FROM cases').get().count;
  const totalTrials = db.prepare('SELECT count(*) as count FROM courtroom_trials').get().count;
  const totalShares = db.prepare('SELECT count(*) as count FROM shareable_verdicts').get().count;
  const recentLogs = db.prepare('SELECT * FROM operational_logs ORDER BY created_at DESC LIMIT 10').all();

  return {
    totalCases,
    totalTrials,
    totalShares,
    recentLogs
  };
}

// Seed Demo Cases
function seedDemoCasesIfEmpty() {
  const count = db.prepare('SELECT count(*) as count FROM cases').get().count;
  if (count > 0) return;

  const demoCases = [
    {
      id: 'case_demo_1',
      accessToken: 'demo_token_1',
      title: 'The Dry Text Incident',
      message: 'They replied: Okay.',
      context: 'Dating for 2 months. Sent a paragraph explaining weekend brunch plans. Received single capitalized word with full stop.',
      createdAt: new Date(Date.now() - 3600000 * 48).toISOString(),
      status: 'verdict_reached',
      isSample: true,
      interpretations: {
        optimistic: {
          title: 'Total Agreement & Trust',
          text: 'They read the plan, agreed without hesitation, and see no need for unnecessary fluff.',
          plausibility: 'High'
        },
        neutral: {
          title: 'Simple Acknowledgment',
          text: 'They were walking to their car or typing with one hand while paying for coffee. It means literally: received and acknowledged.',
          plausibility: 'Very High'
        },
        pessimistic: {
          title: 'Passive-Aggressive Displeasure',
          text: 'The period at the end represents emotional distance and a deliberate withholding of the exclamation mark you gave them.',
          plausibility: 'Low'
        },
        unexpected: {
          title: 'Voice-to-Text Dictation Accident',
          text: 'Their phone auto-punctuated the word while they were dodging a puddle on 5th Avenue.',
          plausibility: 'Moderate'
        },
        evidenceBased: {
          title: 'Insufficient Emotional Telepathy',
          text: 'The word "Okay" conveys confirmation of receipt. No tone, grievance, or underlying hostility is present in the text itself.',
          plausibility: 'Highest'
        }
      },
      knownFacts: [
        'You sent a plan for weekend brunch.',
        'They responded with the word "Okay."',
        'A standard period was placed at the end.'
      ],
      assumptions: [
        'A single word signifies a cooling of romantic affection.',
        'A period is an act of calculated hostility rather than basic grammar.',
        'They had uninterrupted free time to craft an enthusiastic essay.'
      ],
      unknowns: [
        'What they were physically doing when they saw your message.',
        'Their general punctuation habits with other humans.',
        'Whether they even remember punctuation exists after 5 PM on a Tuesday.'
      ],
      evidenceTakeaway: 'There is not enough information to reliably infer emotional withdrawal from a four-letter affirmative word.',
      prosecution: {
        arguments: [
          'Exhibits demonstrate a 92% drop in character volume compared to prior communications.',
          'The period is abrupt, formal, and starkly devoid of warmth.',
          'Human texting etiquette normally dictates at least one emoji or vowel extension (e.g., "Okayy").'
        ],
        exhibitEvidence: 'Exhibit A: 4 letters. 1 full stop. Zero exclamation marks.',
        notes: 'Prosecution requests immediate speculative spiral.'
      },
      defence: {
        arguments: [
          'The client was simply confirming receipt while living their actual life.',
          'No accusatory statements or complaints were voiced.',
          'Grammar is not a crime under international texting law.'
        ],
        counterpoints: [
          'Alternative explanation: They are busy.',
          'Alternative explanation: They are an adult with a job.'
        ],
        notes: 'Defence moves to dismiss all imaginary charges.'
      },
      verdict: {
        category: 'not_enough_evidence',
        title: 'NOT ENOUGH EVIDENCE',
        summary: 'The court recognises your imagination. It does not recognise it as a witness.',
        annotation: 'Unfortunately, your anxiety brought zero credible exhibits to the stand.',
        confidence: 'High'
      },
      nextStep: {
        headline: 'Put The Phone Down For 4 Hours',
        suggestion: 'Do not follow up with "Everything okay?" or a test message. Show up to brunch as planned.',
        proportionateAction: 'Assume compliance until contrary evidence arrives.'
      },
      thoughtSpiralSteps: [
        { label: 'Short reply', text: 'They said "Okay."' },
        { label: 'Punctuation panic', text: 'Why is there a full stop? Nobody uses periods unless they are angry.' },
        { label: 'Catastrophe leap', text: 'They hated brunch last week and they are looking for an exit ramp.' },
        { label: 'Existential spiral', text: 'I will die alone in an apartment filled with unread drafts.' }
      ]
    }
  ];

  for (const c of demoCases) {
    saveCase(c);
    saveCourtroomTrial({
      id: `trial_${c.id}`,
      caseId: c.id,
      prosecution: c.prosecution,
      defence: c.defence,
      verdict: c.verdict,
      meme: {
        url: '/memes/two_buttons.jpg',
        title: 'Daily Dilemma',
        caption: 'Option 1: Believe they are busy. Option 2: Overthink until sunrise.'
      },
      createdAt: c.createdAt
    });
  }
}

export default db;
