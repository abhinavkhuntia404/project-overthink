import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowRight, 
  Scale, 
  CheckCircle, 
  Copy, 
  Check, 
  AlertCircle, 
  Sparkles, 
  Eye,
  PlusCircle,
  Laugh
} from 'lucide-react';
import { useCase } from '../context/CaseContext';
import { EvidenceTagDoodle, MagnifyingGlassDoodle } from '../components/doodles/CourtroomDoodles';
import BuildingDirectory from '../components/common/BuildingDirectory';
import { REAL_INTERNET_MEMES } from '../components/memes/MemeEvidenceVault';
import SuggestedResponseList from '../components/responses/SuggestedResponseList';

export default function Decode() {
  const navigate = useNavigate();
  const { currentCase, resetCase, isLiveAI } = useCase();
  const [copied, setCopied] = useState(false);
  const [activeMeme, setActiveMeme] = useState(null);

  useEffect(() => {
    if (currentCase?.meme) {
      setActiveMeme(currentCase.meme);
    }
  }, [currentCase]);

  const shuffleMeme = () => {
    const randomMeme = REAL_INTERNET_MEMES[Math.floor(Math.random() * REAL_INTERNET_MEMES.length)];
    setActiveMeme({
      id: randomMeme.id,
      url: randomMeme.image,
      title: randomMeme.title,
      defaultCaption: randomMeme.description
    });
  };

  useEffect(() => {
    if (!currentCase) {
      navigate('/investigate', { replace: true });
    }
  }, [currentCase, navigate]);

  if (!currentCase) {
    return null;
  }

  const handleCopySummary = () => {
    if (!currentCase) return;
    const summaryText = `PROJECT OVERTHINK FORENSIC SUMMARY:
Exhibit: "${currentCase.message}"
Verdict: ${currentCase.verdict?.title || 'NOT ENOUGH EVIDENCE'}
Evidence-Based Takeaway: ${currentCase.evidenceTakeaway}
Recommended Next Step: ${currentCase.nextStep?.headline} — ${currentCase.nextStep?.suggestion}`;

    navigator.clipboard.writeText(summaryText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2400);
  };

  return (
    <div className="container-wide" style={{ padding: '30px 24px 80px' }}>
      <BuildingDirectory currentDepartment="lab" />
      
      {/* Page Header */}
      <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 40px' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
          <span className="chip chip-lavender">
            <Sparkles size={13} />
            <span>Forensic Interpretation Lab</span>
          </span>
          <span style={{ fontSize: '0.8rem', color: 'var(--color-muted-slate)', fontWeight: 600 }}>
            {isLiveAI ? 'Connected to Gemini Intelligence' : 'Active Heuristic Engine'}
          </span>
        </div>
        <h1 style={{ fontSize: 'clamp(2.2rem, 4vw, 3.2rem)', fontWeight: 800, color: 'var(--color-graphite)', marginBottom: '14px' }}>
          Let’s examine the evidence.
        </h1>
        <p style={{ fontSize: '1.05rem', color: 'var(--color-muted-slate)', lineHeight: 1.5 }}>
          Submit the message your mind has been running endless simulations on. We’ll generate five distinct possibility lenses and extract verifiable facts.
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>

            
            {/* Top Action Bar & Case Header */}
            <div 
              className="glass-evidence" 
              style={{ 
                borderRadius: '24px', 
                padding: '24px 32px',
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '20px'
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
                  <EvidenceTagDoodle label="ACTIVE CASE" />
                  <span style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--color-muted-slate)' }}>
                    Logged: {new Date(currentCase.createdAt).toLocaleDateString()}
                  </span>
                  {currentCase.isSample && (
                    <span className="chip chip-amber" style={{ fontSize: '0.7rem' }}>Sample Case</span>
                  )}
                </div>
                <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--color-graphite)' }}>
                  {currentCase.title}
                </h2>
              </div>

              {/* Action Buttons */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                <button
                  onClick={() => navigate('/courtroom')}
                  className="btn-indigo"
                  style={{ padding: '10px 20px', fontSize: '0.9rem' }}
                >
                  <Scale size={16} />
                  <span>Put It on Trial</span>
                </button>

                <button
                  onClick={() => navigate('/reality-check')}
                  className="btn-secondary"
                  style={{ padding: '10px 18px', fontSize: '0.9rem' }}
                >
                  <CheckCircle size={16} />
                  <span>Run Reality Check</span>
                </button>

                <button
                  onClick={handleCopySummary}
                  className="btn-ghost"
                  style={{ border: '1px solid var(--color-subtle-border)', padding: '10px 16px' }}
                  title="Copy forensic summary to clipboard"
                >
                  {copied ? <Check size={16} color="#2E7D32" /> : <Copy size={16} />}
                  <span>{copied ? 'Copied' : 'Copy Summary'}</span>
                </button>

                <button
                  onClick={() => {
                    resetCase();
                    navigate('/investigate');
                  }}
                  className="btn-ghost"
                  style={{ border: '1px solid var(--color-subtle-border)', padding: '10px 16px' }}
                >
                  <PlusCircle size={16} />
                  <span>Start New Case</span>
                </button>
              </div>
            </div>

            {/* Exhibit Highlight Banner */}
            <div 
              style={{
                backgroundColor: '#FFFFFF',
                border: '1px solid var(--color-subtle-border)',
                borderRadius: '20px',
                padding: '28px 32px',
                boxShadow: 'var(--shadow-glass)',
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: '20px'
              }}
            >
              <div style={{ maxWidth: '680px' }}>
                <div style={{ fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--color-indigo)', marginBottom: '8px' }}>
                  Submitted Exhibit In Question
                </div>
                <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--color-graphite)', marginBottom: '8px' }}>
                  "{currentCase.message}"
                </div>
                {currentCase.context && (
                  <div style={{ fontSize: '0.95rem', color: 'var(--color-muted-slate)' }}>
                    <strong>Reported Background:</strong> {currentCase.context}
                  </div>
                )}
              </div>
              <MagnifyingGlassDoodle note="Interesting. Or completely normal." />
            </div>

            {/* CASE'S ICONIC INTERNET MEME EXHIBITION */}
            {activeMeme && (
              <div 
                className="glass-evidence scroll-reveal card-interactive"
                style={{
                  borderRadius: '24px',
                  padding: '24px 28px',
                  border: '1px solid rgba(89, 102, 232, 0.25)',
                  background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(233, 237, 255, 0.65) 100%)',
                  display: 'grid',
                  gridTemplateColumns: 'minmax(220px, 300px) 1fr',
                  gap: '24px',
                  alignItems: 'center',
                  boxShadow: 'var(--shadow-glass)'
                }}
              >
                <div style={{ borderRadius: '16px', overflow: 'hidden', border: '1px solid var(--color-subtle-border)', boxShadow: '0 8px 20px rgba(32, 33, 31, 0.08)' }}>
                  <img 
                    src={activeMeme.url || activeMeme.image || '/memes/expanding_brain.jpg'} 
                    alt={activeMeme.title} 
                    style={{ width: '100%', height: 'auto', display: 'block', maxHeight: '220px', objectFit: 'cover' }} 
                  />
                </div>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                    <span className="chip chip-lavender" style={{ fontSize: '0.75rem', fontWeight: 700 }}>
                      <Laugh size={13} />
                      Case Reaction Meme
                    </span>
                    <span style={{ fontSize: '0.78rem', color: 'var(--color-muted-slate)', fontWeight: 600 }}>
                      Linguistic Exhibit Evidence
                    </span>
                  </div>
                  <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--color-graphite)', marginBottom: '8px' }}>
                    {activeMeme.title}
                  </h3>
                  <p style={{ fontSize: '1rem', color: 'var(--color-graphite-soft)', lineHeight: 1.5, marginBottom: '14px', fontStyle: 'italic' }}>
                    "{activeMeme.defaultCaption || activeMeme.tagline || 'Anxiety creates a cinematic disaster out of a simple communication.'}"
                  </p>
                  <button 
                    onClick={shuffleMeme}
                    className="btn-ghost"
                    style={{ fontSize: '0.82rem', padding: '6px 14px', border: '1px solid var(--color-subtle-border)', backgroundColor: '#FFFFFF' }}
                  >
                    <Sparkles size={14} color="var(--color-indigo)" />
                    <span>Shuffle Reaction Meme</span>
                  </button>
                </div>
              </div>
            )}

            {/* PYTHON FORENSIC LINGUISTIC INTELLIGENCE BAR */}
            {currentCase.pythonForensics && (
              <div 
                className="glass-evidence scroll-reveal"
                style={{
                  borderRadius: '20px',
                  padding: '22px 28px',
                  borderLeft: '4px solid var(--color-indigo)',
                  backgroundColor: 'rgba(255, 255, 255, 0.9)'
                }}
              >
                <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '16px', marginBottom: '10px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span className="chip" style={{ backgroundColor: 'rgba(89, 102, 232, 0.12)', color: 'var(--color-indigo)', fontWeight: 700, fontSize: '0.78rem' }}>
                      Python Forensic Engine
                    </span>
                    <span style={{ fontSize: '0.9rem', fontWeight: 800, color: 'var(--color-graphite)' }}>
                      Overthinking Severity Index: {currentCase.pythonForensics.overthinkingIndex}%
                    </span>
                  </div>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <span className="chip chip-amber" style={{ fontSize: '0.75rem', fontWeight: 600 }}>
                      Grounding: {currentCase.pythonForensics.groundingScore}%
                    </span>
                    <span className="chip" style={{ backgroundColor: 'rgba(46, 125, 50, 0.1)', color: '#2E7D32', fontSize: '0.75rem', fontWeight: 600 }}>
                      Benign Reality Probability: {currentCase.pythonForensics.benignRealityProbability}%
                    </span>
                  </div>
                </div>
                <div style={{ fontSize: '0.9rem', color: 'var(--color-graphite-soft)', lineHeight: 1.5 }}>
                  <strong style={{ color: 'var(--color-indigo)' }}>Reality Directive:</strong> {currentCase.pythonForensics.realityDirective}
                </div>
              </div>
            )}

            {/* 5 INTERPRETATION CATEGORIES */}
            <div>
              <div style={{ marginBottom: '18px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--color-graphite)' }}>
                    The 5 Interpretive Possibilities
                  </h3>
                  <p style={{ fontSize: '0.88rem', color: 'var(--color-muted-slate)' }}>
                    These are possible lenses, not established telepathic facts.
                  </p>
                </div>
                <span className="chip chip-lavender">Cognitive Spectrum</span>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '18px' }}>
                {currentCase.interpretations && Object.entries(currentCase.interpretations).map(([key, item]) => {
                  const configs = {
                    optimistic: { label: '1. Optimistic', color: '#5966E8', bg: 'rgba(89, 102, 232, 0.05)' },
                    neutral: { label: '2. Neutral', color: '#20211F', bg: 'rgba(32, 33, 31, 0.04)' },
                    pessimistic: { label: '3. Pessimistic', color: '#E65353', bg: 'rgba(230, 83, 83, 0.05)' },
                    unexpected: { label: '4. Unexpected', color: '#DCA96B', bg: 'rgba(220, 169, 107, 0.08)' },
                    evidenceBased: { label: '5. Evidence-Based', color: '#2E7D32', bg: 'rgba(46, 125, 50, 0.06)' }
                  };
                  const cfg = configs[key] || { label: key, color: '#5966E8', bg: 'transparent' };

                  return (
                    <div 
                      key={key}
                      className="glass-evidence"
                      style={{
                        borderRadius: '18px',
                        padding: '22px',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '10px',
                        borderTop: `3px solid ${cfg.color}`,
                        backgroundColor: cfg.bg
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontSize: '0.78rem', fontWeight: 700, textTransform: 'uppercase', color: cfg.color }}>
                          {cfg.label}
                        </span>
                        <span style={{ fontSize: '0.72rem', fontWeight: 600, color: 'var(--color-muted-slate)' }}>
                          {item.plausibility || 'Calculated'}
                        </span>
                      </div>
                      <h4 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--color-graphite)' }}>
                        {item.title}
                      </h4>
                      <p style={{ fontSize: '0.9rem', color: 'var(--color-graphite-soft)', lineHeight: 1.5, flex: 1 }}>
                        {item.text}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* KNOWN vs ASSUMPTIONS vs UNKNOWNS vs TAKEAWAY */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
              {/* Known Facts */}
              <div className="glass-evidence" style={{ borderRadius: '18px', padding: '24px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
                  <CheckCircle size={18} color="#2E7D32" />
                  <h4 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--color-graphite)' }}>
                    Known Facts (Explicitly Supplied)
                  </h4>
                </div>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {currentCase.knownFacts?.map((fact, i) => (
                    <li key={i} style={{ fontSize: '0.9rem', color: 'var(--color-graphite)', display: 'flex', gap: '8px' }}>
                      <span style={{ color: '#2E7D32', fontWeight: 700 }}>•</span>
                      <span>{fact}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Assumptions */}
              <div className="glass-evidence" style={{ borderRadius: '18px', padding: '24px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
                  <AlertCircle size={18} color="#DCA96B" />
                  <h4 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--color-graphite)' }}>
                    Assumptions (Beyond The Evidence)
                  </h4>
                </div>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {currentCase.assumptions?.map((item, i) => (
                    <li key={i} style={{ fontSize: '0.9rem', color: 'var(--color-graphite)', display: 'flex', gap: '8px' }}>
                      <span style={{ color: '#DCA96B', fontWeight: 700 }}>•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Unknowns */}
              <div className="glass-evidence" style={{ borderRadius: '18px', padding: '24px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
                  <Eye size={18} color="#5966E8" />
                  <h4 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--color-graphite)' }}>
                    Unknowns (Missing Variables)
                  </h4>
                </div>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {currentCase.unknowns?.map((item, i) => (
                    <li key={i} style={{ fontSize: '0.9rem', color: 'var(--color-graphite)', display: 'flex', gap: '8px' }}>
                      <span style={{ color: '#5966E8', fontWeight: 700 }}>•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Differentiated Response Playbook */}
            {currentCase.suggestedResponses && currentCase.suggestedResponses.length > 0 && (
              <SuggestedResponseList responses={currentCase.suggestedResponses} />
            )}

            {/* Evidence-Based Takeaway Callout */}
            <div 
              style={{
                backgroundColor: 'var(--color-porcelain-light)',
                border: '1px solid var(--color-indigo)',
                borderRadius: '20px',
                padding: '28px',
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '20px'
              }}
            >
              <div style={{ maxWidth: '780px' }}>
                <span className="chip chip-lavender" style={{ marginBottom: '8px' }}>
                  Defensible Evidence-Based Takeaway
                </span>
                <p style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--color-graphite)', lineHeight: 1.5, marginTop: '8px' }}>
                  "{currentCase.evidenceTakeaway}"
                </p>
              </div>

              <div style={{ display: 'flex', gap: '12px' }}>
                <button
                  onClick={() => navigate('/courtroom')}
                  className="btn-primary"
                  style={{ padding: '12px 24px' }}
                >
                  <Scale size={16} />
                  <span>Proceed to Courtroom</span>
                  <ArrowRight size={15} />
                </button>
              </div>
            </div>

        </div>
    </div>
  );
}
