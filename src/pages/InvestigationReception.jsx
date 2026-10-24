import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { 
  Building2, 
  ArrowRight, 
  Sparkles, 
  ShieldAlert, 
  CheckCircle2, 
  FileText, 
  AlertCircle, 
  RefreshCw,
  HelpCircle,
  Lock
} from 'lucide-react';
import { useCase } from '../context/CaseContext';
import { EvidenceTagDoodle, MagnifyingGlassDoodle } from '../components/doodles/CourtroomDoodles';
import BuildingDirectory from '../components/common/BuildingDirectory';

const RECEPTION_PRESETS = [
  {
    title: "Dry Single-Word Text",
    message: "Okay.",
    context: "Sent a 4-sentence plan. Received one capitalized word with a period.",
    concern: "They are annoyed by my enthusiasm and pulling back emotionally."
  },
  {
    title: "Vague Workplace Summons",
    message: "Let's touch base first thing tomorrow morning.",
    context: "Sent at 4:58 PM on Thursday by my direct manager without an agenda.",
    concern: "I'm being laid off or reprimanded for a typo in the spreadsheet."
  },
  {
    title: "Left On Read",
    message: "Seen at 1:14 PM",
    context: "Asked if they were free for coffee. It has now been 6 hours.",
    concern: "They deliberately opened it to make sure I saw that they saw it."
  },
  {
    title: "Sudden Punctuation Void",
    message: "Sounds great.",
    context: "Usually uses 3 exclamation marks. Today they used a solemn full stop.",
    concern: "The temperature has dropped from tropical to arctic."
  }
];

export default function InvestigationReception() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { analyzeMessage, isAnalyzing, error } = useCase();

  const [messageInput, setMessageInput] = useState('');
  const [contextInput, setContextInput] = useState('');
  const [concernInput, setConcernInput] = useState('');
  const [mode, setMode] = useState('balanced');
  const [formError, setFormError] = useState('');
  const [isTransitioning, setIsTransitioning] = useState(false);

  const redirectReason = searchParams.get('redirect');
  const presetKey = searchParams.get('preset');

  useEffect(() => {
    if (redirectReason === 'courtroom') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    if (presetKey) {
      if (presetKey === 'period') {
        setMessageInput('Sounds great.');
        setContextInput('Usually uses 3 exclamation marks. Today they used a solemn full stop.');
        setConcernInput('The temperature has dropped from tropical to arctic.');
      } else if (presetKey === 'boss') {
        setMessageInput("Let's touch base first thing tomorrow morning.");
        setContextInput('Sent at 4:58 PM on Thursday by my direct manager without an agenda.');
        setConcernInput("I'm being laid off or reprimanded for a typo in the spreadsheet.");
      } else if (presetKey === 'emoji') {
        setMessageInput('Seen at 1:14 PM');
        setContextInput('Asked if they were free for dinner. It has now been 6 hours.');
        setConcernInput('They deliberately left it on read without sending any emoji reaction.');
      } else if (presetKey === 'dry') {
        setMessageInput('Okay.');
        setContextInput('Sent a 4-sentence plan. Received one capitalized word with a period.');
        setConcernInput('They are annoyed by my enthusiasm and pulling back emotionally.');
      }
    }
  }, [redirectReason, presetKey]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!messageInput.trim()) {
      setFormError('Please enter the message or situation you wish to have investigated.');
      return;
    }

    setFormError('');
    setIsTransitioning(true);

    try {
      // Combine context with specific concern for enriched analysis
      const enrichedContext = concernInput.trim()
        ? `${contextInput.trim() ? contextInput.trim() + ' | ' : ''}Specific User Anxiety: "${concernInput.trim()}"`
        : contextInput.trim();

      await analyzeMessage(messageInput.trim(), enrichedContext, mode);
      
      // Cinematic department elevator transition to Floor 3: Forensic Lab
      setTimeout(() => {
        navigate('/decode');
      }, 500);
    } catch (err) {
      setIsTransitioning(false);
      setFormError(err.message || 'Evidence processing failed. Please try again.');
    }
  };

  const handleApplyPreset = (preset) => {
    setMessageInput(preset.message);
    setContextInput(preset.context);
    setConcernInput(preset.concern);
    setFormError('');
  };

  return (
    <div className="container-wide" style={{ padding: '30px 24px 90px' }}>
      
      {/* Immersive Building Wayfinding HUD */}
      <BuildingDirectory currentDepartment="reception" />

      {/* Humorous Courtroom/Lab Redirect Notice if user tried to enter without evidence */}
      {redirectReason && (
        <div 
          className="glass-evidence"
          style={{
            maxWidth: '820px',
            margin: '0 auto 28px',
            borderRadius: '18px',
            padding: '20px 24px',
            backgroundColor: '#FFF4E5',
            border: '2px solid #DCA96B',
            display: 'flex',
            alignItems: 'center',
            gap: '14px',
            boxShadow: '0 8px 24px rgba(220, 169, 107, 0.15)'
          }}
        >
          <div 
            style={{ 
              width: '40px', 
              height: '40px', 
              borderRadius: '50%', 
              backgroundColor: '#DCA96B', 
              color: '#FFF',
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              flexShrink: 0
            }}
          >
            <ShieldAlert size={22} />
          </div>
          <div>
            <div style={{ fontWeight: 800, fontSize: '0.98rem', color: '#8F5818', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              Judicial Notice from The Bench
            </div>
            <div style={{ fontSize: '0.94rem', color: '#5A380E', marginTop: '2px', lineHeight: 1.45 }}>
              <strong>“Your Honour refuses to hear a case without evidence.”</strong> Please file an official submission at Reception below before entering the trial chamber.
            </div>
          </div>
        </div>
      )}

      {/* Reception Header */}
      <div style={{ textAlign: 'center', maxWidth: '740px', margin: '0 auto 36px' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
          <span className="chip chip-graphite">
            <Building2 size={13} />
            <span>Floor 2 • Official Intake Desk</span>
          </span>
          <span style={{ fontSize: '0.8rem', color: 'var(--color-muted-slate)', fontWeight: 600 }}>
            Mandatory Investigation Gateway
          </span>
        </div>
        <h1 style={{ fontSize: 'clamp(2.2rem, 4vw, 3.2rem)', fontWeight: 800, color: 'var(--color-graphite)', letterSpacing: '-0.02em', marginBottom: '12px' }}>
          Investigation Reception Desk
        </h1>
        <p style={{ fontSize: '1.05rem', color: 'var(--color-muted-slate)', lineHeight: 1.5 }}>
          File the exact communication that refuses to leave your mind. Once filed, your case file will be cleared for transfer into the Forensic Lab and Courtroom.
        </p>
      </div>

      {/* Main Intake Desk Form Card */}
      <div 
        className="glass-evidence"
        style={{
          maxWidth: '820px',
          margin: '0 auto',
          borderRadius: '24px',
          padding: '36px',
          background: 'rgba(255, 255, 255, 0.9)',
          border: '1px solid var(--color-subtle-border)',
          boxShadow: 'var(--shadow-floating)',
          position: 'relative'
        }}
      >
        {/* Quick Presets */}
        <div style={{ marginBottom: '24px' }}>
          <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--color-muted-slate)', marginBottom: '10px' }}>
            Select Common Overthinking Scenarios:
          </label>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {RECEPTION_PRESETS.map((p, i) => (
              <button
                key={i}
                type="button"
                onClick={() => handleApplyPreset(p)}
                className="btn-ghost"
                style={{
                  fontSize: '0.82rem',
                  padding: '6px 14px',
                  backgroundColor: 'rgba(243, 241, 236, 0.8)',
                  border: '1px solid var(--color-subtle-border)'
                }}
              >
                {p.title}
              </button>
            ))}
          </div>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
          
          {/* 1. The Message / Situation */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <label style={{ fontWeight: 800, fontSize: '0.95rem', color: 'var(--color-graphite)' }}>
                1. The Message or Situation <span style={{ color: '#E65353' }}>*</span>
              </label>
              <span style={{ fontSize: '0.78rem', color: 'var(--color-muted-slate)' }}>
                {messageInput.length} / 2000 chars
              </span>
            </div>
            <textarea
              rows={3}
              value={messageInput}
              onChange={(e) => setMessageInput(e.target.value)}
              placeholder="e.g. They replied: 'Okay.' with a period instead of their usual enthusiasm..."
              maxLength={2000}
              style={{ width: '100%', fontSize: '1rem', lineHeight: 1.5 }}
              required
            />
          </div>

          {/* 2. Optional Context */}
          <div>
            <label style={{ display: 'block', fontWeight: 700, fontSize: '0.92rem', color: 'var(--color-graphite)', marginBottom: '6px' }}>
              2. What Happened Beforehand? (Optional Context)
            </label>
            <input
              type="text"
              value={contextInput}
              onChange={(e) => setContextInput(e.target.value)}
              placeholder="e.g. Sent 3 paragraphs outlining weekend dinner reservations. We've been friends for 3 years."
              style={{ width: '100%', fontSize: '0.92rem' }}
            />
          </div>

          {/* 3. Specific Concern (Requested in User Prompt) */}
          <div>
            <label style={{ display: 'block', fontWeight: 700, fontSize: '0.92rem', color: 'var(--color-graphite)', marginBottom: '6px' }}>
              3. What Specifically Concerns You? (What is your brain whispering?)
            </label>
            <input
              type="text"
              value={concernInput}
              onChange={(e) => setConcernInput(e.target.value)}
              placeholder="e.g. I am convinced they are angry at my tone and seeking an exit strategy."
              style={{ width: '100%', fontSize: '0.92rem' }}
            />
          </div>

          {/* 4. Inquiry Mode Selection */}
          <div>
            <label style={{ display: 'block', fontWeight: 700, fontSize: '0.82rem', textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--color-muted-slate)', marginBottom: '8px' }}>
              Investigation Tier
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(190px, 1fr))', gap: '10px' }}>
              {[
                { id: 'balanced', title: 'Standard Investigation', desc: 'Balanced, comedic, grounded' },
                { id: 'deep_dive', title: 'Deep Forensic Audit', desc: 'Granular subtext deconstruction' },
                { id: 'emergency_sanity', title: 'Emergency De-escalation', desc: 'Rapid reality anchor' }
              ].map((m) => (
                <div
                  key={m.id}
                  onClick={() => setMode(m.id)}
                  style={{
                    padding: '12px 14px',
                    borderRadius: '12px',
                    cursor: 'pointer',
                    border: '1px solid',
                    borderColor: mode === m.id ? 'var(--color-indigo)' : 'var(--color-subtle-border)',
                    backgroundColor: mode === m.id ? 'rgba(89, 102, 232, 0.08)' : 'rgba(243, 241, 236, 0.5)',
                    transition: 'all 0.15s ease'
                  }}
                >
                  <div style={{ fontWeight: 700, fontSize: '0.88rem', color: mode === m.id ? 'var(--color-indigo)' : 'var(--color-graphite)' }}>
                    {m.title}
                  </div>
                  <div style={{ fontSize: '0.76rem', color: 'var(--color-muted-slate)', marginTop: '2px' }}>
                    {m.desc}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Form Error Message */}
          {(formError || error) && (
            <div style={{ backgroundColor: '#FFF0F0', border: '1px solid #F5C2C2', padding: '12px 16px', borderRadius: '10px', color: '#D93838', fontSize: '0.88rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <AlertCircle size={16} />
              <span>{formError || error}</span>
            </div>
          )}

          {/* Submit Action Bar */}
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '16px', paddingTop: '14px', borderTop: '1px solid var(--color-subtle-border)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.82rem', color: 'var(--color-muted-slate)' }}>
              <CheckCircle2 size={15} color="#2E7D32" />
              <span>Unlocks Floor 3 (Forensic Lab) & Floor 4 (Courtroom)</span>
            </div>

            <button
              type="submit"
              disabled={isAnalyzing || isTransitioning}
              className="btn-primary"
              style={{ padding: '14px 34px', fontSize: '1rem', letterSpacing: '0.02em' }}
            >
              {isAnalyzing || isTransitioning ? (
                <>
                  <RefreshCw size={16} className="animate-spin" />
                  <span>Processing Intake & Ascending...</span>
                </>
              ) : (
                <>
                  <span>SUBMIT EVIDENCE</span>
                  <ArrowRight size={17} />
                </>
              )}
            </button>
          </div>

        </form>
      </div>

    </div>
  );
}
