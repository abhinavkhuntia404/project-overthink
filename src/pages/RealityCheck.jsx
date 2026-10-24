import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  CheckCircle2, 
  AlertTriangle, 
  EyeOff, 
  Compass, 
  ArrowRight, 
  Scale, 
  ShieldCheck,
  FileEdit,
  Clock,
  MessageSquareHeart
} from 'lucide-react';
import { useCase } from '../context/CaseContext';
import { EvidenceTagDoodle } from '../components/doodles/CourtroomDoodles';
import BuildingDirectory from '../components/common/BuildingDirectory';
import TherapyChatbotModal from '../components/therapy/TherapyChatbotModal';

export default function RealityCheck() {
  const navigate = useNavigate();
  const { currentCase, analyzeMessage, isAnalyzing, resetCase } = useCase();
  const [revisedContext, setRevisedContext] = useState('');
  const [showReviseForm, setShowReviseForm] = useState(false);
  const [reviseError, setReviseError] = useState('');
  const [therapyModalOpen, setTherapyModalOpen] = useState(false);

  useEffect(() => {
    if (!currentCase) {
      navigate('/investigate', { replace: true });
    }
  }, [currentCase, navigate]);

  if (!currentCase) {
    return null;
  }

  const activeCase = currentCase;


  const handleReevaluate = async (e) => {
    e.preventDefault();
    if (!revisedContext.trim()) return;

    try {
      setReviseError('');
      const combinedContext = activeCase.context 
        ? `${activeCase.context} | Update: ${revisedContext.trim()}`
        : revisedContext.trim();
        
      await analyzeMessage(activeCase.message, combinedContext, 'balanced');
      setShowReviseForm(false);
      setRevisedContext('');
    } catch (err) {
      setReviseError(err?.message || 'Failed to re-evaluate with new context.');
    }
  };

  return (
    <div className="container-wide" style={{ padding: '30px 24px 100px' }}>
      <BuildingDirectory currentDepartment="reality-check" />
      
      {/* Page Header */}
      <div style={{ textAlign: 'center', maxWidth: '760px', margin: '0 auto 48px' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
          <span className="chip chip-lavender">
            <ShieldCheck size={13} />
            <span>Reality Anchor Protocol</span>
          </span>
          <span style={{ fontSize: '0.8rem', color: 'var(--color-muted-slate)', fontWeight: 600 }}>
            Case #{activeCase.id.slice(-6).toUpperCase()}
          </span>
        </div>
        <h1 
          style={{ 
            fontSize: 'clamp(2.3rem, 4.2vw, 3.4rem)', 
            fontWeight: 800, 
            letterSpacing: '-0.02em', 
            color: 'var(--color-graphite)', 
            marginBottom: '14px',
            lineHeight: 1.15
          }}
        >
          Separate what happened from what your brain added.
        </h1>
        <p style={{ fontSize: '1.08rem', color: 'var(--color-muted-slate)', lineHeight: 1.5 }}>
          Overthinking thrives when facts, fears, and unknowns get melted into one solid lump. Here is the surgical deconstruction.
        </p>
      </div>

      {/* Case Exhibit Anchor */}
      <div 
        className="glass-evidence"
        style={{
          borderRadius: '20px',
          padding: '24px 30px',
          marginBottom: '36px',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '20px',
          background: 'rgba(255, 255, 255, 0.85)'
        }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
            <EvidenceTagDoodle label="ORIGINAL RECORD" />
            <span style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--color-muted-slate)' }}>
              Under Continuous Review
            </span>
          </div>
          <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--color-graphite)' }}>
            "{activeCase.message}"
          </div>
          {activeCase.context && (
            <div style={{ fontSize: '0.88rem', color: 'var(--color-muted-slate)', marginTop: '4px' }}>
              <strong>Known Context:</strong> {activeCase.context}
            </div>
          )}
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <button 
            onClick={() => setShowReviseForm(prev => !prev)}
            className="btn-secondary"
            style={{ fontSize: '0.85rem', padding: '8px 16px' }}
          >
            <FileEdit size={15} />
            <span>{showReviseForm ? 'Hide Context Form' : 'Add Context & Re-evaluate'}</span>
          </button>
          <button 
            onClick={() => navigate('/courtroom')}
            className="btn-ghost"
            style={{ fontSize: '0.85rem', padding: '8px 16px', border: '1px solid var(--color-subtle-border)' }}
          >
            <Scale size={15} />
            <span>Return to Courtroom</span>
          </button>
        </div>
      </div>

      {/* REVISE FORM ACCORDION */}
      {showReviseForm && (
        <div 
          className="glass-evidence"
          style={{
            borderRadius: '18px',
            padding: '24px',
            marginBottom: '36px',
            backgroundColor: '#FFFFFF',
            border: '1px solid var(--color-indigo)'
          }}
        >
          <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '8px', color: 'var(--color-graphite)' }}>
            Add Verifiable Context or New Developments
          </h3>
          <p style={{ fontSize: '0.88rem', color: 'var(--color-muted-slate)', marginBottom: '16px' }}>
            Did they reply again? Did you remember they were taking a certification exam today? Add the details below.
          </p>
          <form onSubmit={handleReevaluate} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <textarea
              rows={2}
              value={revisedContext}
              onChange={(e) => setRevisedContext(e.target.value)}
              placeholder="e.g. They just posted in the group chat saying their phone charger died at work..."
              style={{ width: '100%' }}
              required
            />
            {reviseError && <div style={{ color: '#D93838', fontSize: '0.85rem' }}>{reviseError}</div>}
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
              <button 
                type="button" 
                onClick={() => setShowReviseForm(false)} 
                className="btn-ghost"
              >
                Cancel
              </button>
              <button 
                type="submit" 
                disabled={isAnalyzing}
                className="btn-indigo"
              >
                {isAnalyzing ? 'Re-evaluating...' : 'Recalculate Reality Check'}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* 4 CLEARLY DISTINGUISHED SECTIONS */}
      <div 
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '24px',
          marginBottom: '48px'
        }}
      >
        
        {/* 1. FACTS */}
        <div 
          className="glass-evidence"
          style={{
            borderRadius: '22px',
            padding: '28px',
            borderTop: '4px solid #2E7D32',
            background: 'rgba(255, 255, 255, 0.85)',
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
            <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'rgba(46, 125, 50, 0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <CheckCircle2 size={18} color="#2E7D32" />
            </div>
            <div>
              <span style={{ fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', color: '#2E7D32', letterSpacing: '0.06em' }}>
                Quadrant 1
              </span>
              <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--color-graphite)' }}>
                1. The Facts
              </h3>
            </div>
          </div>
          <p style={{ fontSize: '0.86rem', color: 'var(--color-muted-slate)', marginBottom: '18px' }}>
            Only what was objectively supplied, observed, or physically sent.
          </p>

          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px', flex: 1 }}>
            {activeCase.knownFacts?.map((fact, i) => (
              <li 
                key={i}
                style={{
                  padding: '10px 14px',
                  borderRadius: '10px',
                  backgroundColor: 'rgba(243, 241, 236, 0.7)',
                  border: '1px solid var(--color-subtle-border)',
                  fontSize: '0.9rem',
                  lineHeight: 1.45,
                  display: 'flex',
                  gap: '8px'
                }}
              >
                <span style={{ color: '#2E7D32', fontWeight: 800 }}>✓</span>
                <span>{fact}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* 2. ASSUMPTIONS */}
        <div 
          className="glass-evidence"
          style={{
            borderRadius: '22px',
            padding: '28px',
            borderTop: '4px solid #DCA96B',
            background: 'rgba(255, 255, 255, 0.85)',
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
            <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'rgba(220, 169, 107, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <AlertTriangle size={18} color="#DCA96B" />
            </div>
            <div>
              <span style={{ fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', color: '#DCA96B', letterSpacing: '0.06em' }}>
                Quadrant 2
              </span>
              <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--color-graphite)' }}>
                2. Assumptions
              </h3>
            </div>
          </div>
          <p style={{ fontSize: '0.86rem', color: 'var(--color-muted-slate)', marginBottom: '18px' }}>
            What anxiety added to the story without empirical evidence.
          </p>

          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px', flex: 1 }}>
            {activeCase.assumptions?.map((item, i) => (
              <li 
                key={i}
                style={{
                  padding: '10px 14px',
                  borderRadius: '10px',
                  backgroundColor: 'rgba(251, 244, 235, 0.85)',
                  border: '1px solid rgba(220, 169, 107, 0.3)',
                  fontSize: '0.9rem',
                  lineHeight: 1.45,
                  display: 'flex',
                  gap: '8px'
                }}
              >
                <span style={{ color: '#DCA96B', fontWeight: 800 }}>⚡</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* 3. UNKNOWNS */}
        <div 
          className="glass-evidence"
          style={{
            borderRadius: '22px',
            padding: '28px',
            borderTop: '4px solid var(--color-indigo)',
            background: 'rgba(255, 255, 255, 0.85)',
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
            <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'rgba(89, 102, 232, 0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <EyeOff size={18} color="var(--color-indigo)" />
            </div>
            <div>
              <span style={{ fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--color-indigo)', letterSpacing: '0.06em' }}>
                Quadrant 3
              </span>
              <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--color-graphite)' }}>
                3. The Unknowns
              </h3>
            </div>
          </div>
          <p style={{ fontSize: '0.86rem', color: 'var(--color-muted-slate)', marginBottom: '18px' }}>
            Critical missing information you literally cannot know right now.
          </p>

          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px', flex: 1 }}>
            {activeCase.unknowns?.map((item, i) => (
              <li 
                key={i}
                style={{
                  padding: '10px 14px',
                  borderRadius: '10px',
                  backgroundColor: 'rgba(233, 237, 255, 0.55)',
                  border: '1px solid rgba(89, 102, 232, 0.2)',
                  fontSize: '0.9rem',
                  lineHeight: 1.45,
                  display: 'flex',
                  gap: '8px'
                }}
              >
                <span style={{ color: 'var(--color-indigo)', fontWeight: 800 }}>?</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* 4. NEXT STEP */}
        <div 
          className="glass-evidence"
          style={{
            borderRadius: '22px',
            padding: '28px',
            borderTop: '4px solid #20211F',
            background: 'rgba(255, 255, 255, 0.92)',
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
            <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'rgba(32, 33, 31, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Compass size={18} color="var(--color-graphite)" />
            </div>
            <div>
              <span style={{ fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--color-graphite)', letterSpacing: '0.06em' }}>
                Quadrant 4
              </span>
              <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--color-graphite)' }}>
                4. Next Step
              </h3>
            </div>
          </div>
          <p style={{ fontSize: '0.86rem', color: 'var(--color-muted-slate)', marginBottom: '18px' }}>
            Proportionate, low-friction, non-prescriptive recommendation.
          </p>

          <div style={{ 
            backgroundColor: '#FAF8F5', 
            borderRadius: '14px', 
            border: '1px solid var(--color-subtle-border)',
            padding: '18px',
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            gap: '10px'
          }}>
            <div style={{ fontWeight: 800, fontSize: '1.05rem', color: 'var(--color-indigo)' }}>
              {activeCase.nextStep?.headline || 'Pause Before Sending A Follow-up'}
            </div>
            <div style={{ fontSize: '0.9rem', color: 'var(--color-graphite)', lineHeight: 1.5 }}>
              {activeCase.nextStep?.suggestion || 'Do not demand emotional reassurance right now. Allow healthy asynchronous time to pass.'}
            </div>
            <div style={{ fontSize: '0.82rem', color: 'var(--color-muted-slate)', fontStyle: 'italic', borderTop: '1px solid var(--color-subtle-border)', paddingTop: '8px' }}>
              Proportionate move: {activeCase.nextStep?.proportionateAction || 'Wait 12 hours.'}
            </div>
          </div>
        </div>

      </div>

      {/* 5. GEMINI COGNITIVE DE-ESCALATION THERAPY LOUNGE BANNER */}
      <div 
        className="glass-evidence"
        style={{
          borderRadius: '24px',
          padding: '28px 32px',
          background: 'linear-gradient(135deg, rgba(233, 237, 255, 0.85) 0%, rgba(255, 255, 255, 0.95) 100%)',
          border: '1.5px solid rgba(89, 102, 232, 0.3)',
          boxShadow: '0 16px 40px -10px rgba(89, 102, 232, 0.15)',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '24px',
          marginBottom: '36px'
        }}
      >
        <div style={{ maxWidth: '640px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
            <span className="chip chip-lavender">
              <MessageSquareHeart size={14} />
              <span>Post-Trial Cognitive Recovery</span>
            </span>
            <span style={{ fontSize: '0.80rem', color: 'var(--color-indigo)', fontWeight: 700 }}>
              • Powered by Gemini 3.8 CBT
            </span>
          </div>
          <h3 style={{ fontSize: '1.45rem', fontWeight: 800, color: 'var(--color-graphite)', marginBottom: '8px' }}>
            Still feel like your mind is racing?
          </h3>
          <p style={{ fontSize: '0.94rem', color: 'var(--color-graphite-soft)', lineHeight: 1.55 }}>
            Step into the confidential Cognitive De-escalation Lounge. Chat directly with our Gemini therapist to unpack lingering anxiety, test what you are planning to reply, or get a custom 60-second nervous system grounding check.
          </p>
        </div>

        <button
          onClick={() => setTherapyModalOpen(true)}
          className="btn-indigo"
          style={{ padding: '14px 28px', fontSize: '1rem', display: 'flex', alignItems: 'center', gap: '10px' }}
        >
          <MessageSquareHeart size={18} />
          <span>Enter Therapy Lounge</span>
        </button>
      </div>

      {/* BOTTOM NAV / CLOSE CASE */}
      <div 
        style={{
          borderTop: '1px solid var(--color-subtle-border)',
          paddingTop: '28px',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '16px'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', color: 'var(--color-muted-slate)' }}>
          <Clock size={15} />
          <span>Case safely recorded in your local archive.</span>
        </div>

        <div style={{ display: 'flex', gap: '12px' }}>
          <button 
            onClick={() => navigate('/courtroom')}
            className="btn-secondary"
          >
            <Scale size={16} />
            <span>Re-examine Courtroom Trial</span>
          </button>
          <button 
            onClick={() => {
              resetCase();
              navigate('/investigate');
            }}
            className="btn-primary"
          >
            <span>Start Fresh Investigation</span>
            <ArrowRight size={16} />
          </button>
        </div>
      </div>

      {/* Therapy Chatbot Modal */}
      <TherapyChatbotModal 
        isOpen={therapyModalOpen} 
        onClose={() => setTherapyModalOpen(false)} 
        currentCase={activeCase} 
      />

    </div>
  );
}
