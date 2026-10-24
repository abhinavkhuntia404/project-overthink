import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Scale, 
  ArrowRight, 
  Gavel, 
  Info,
  MessageSquareHeart
} from 'lucide-react';
import { useCase } from '../context/CaseContext';
import { 
  MagnifyingGlassDoodle, 
  DetectiveStickFigure, 
  EvidenceTagDoodle,
  ThoughtSpiralAnimation 
} from '../components/doodles/CourtroomDoodles';

import BuildingDirectory from '../components/common/BuildingDirectory';
import TherapyChatbotModal from '../components/therapy/TherapyChatbotModal';
import WitnessStandCrossExamination from '../components/courtroom/WitnessStandCrossExamination';

export default function Courtroom() {
  const navigate = useNavigate();
  const { currentCase, witnessTestimony } = useCase();
  const [highlightExhibit, setHighlightExhibit] = useState(false);
  const [verdictRevealed, setVerdictRevealed] = useState(true);
  const [activeAnnotationNote, setActiveAnnotationNote] = useState(null);
  const [therapyModalOpen, setTherapyModalOpen] = useState(false);

  useEffect(() => {
    if (!currentCase) {
      navigate('/investigate?redirect=courtroom', { replace: true });
    }
  }, [currentCase, navigate]);

  if (!currentCase) {
    return null;
  }

  const activeCase = currentCase;

  const triggerGavelBang = () => {
    setVerdictRevealed(false);
    setTimeout(() => {
      setVerdictRevealed(true);
    }, 200);
  };

  return (
    <div className="container-wide" style={{ padding: '30px 24px 100px' }}>
      <BuildingDirectory currentDepartment="courtroom" />
      
      {/* COURTROOM DOCKET BANNER */}
      <div style={{ textAlign: 'center', maxWidth: '820px', margin: '0 auto 40px' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
          <span className="chip chip-amber">
            <Scale size={13} />
            <span>High Judicial Court of Speculation</span>
          </span>
          <span style={{ fontSize: '0.8rem', color: 'var(--color-muted-slate)', fontWeight: 600 }}>
            Case Docket #{activeCase.id.slice(-6).toUpperCase()}
          </span>
        </div>
        
        <h1 
          style={{ 
            fontSize: 'clamp(2.4rem, 4.5vw, 3.8rem)', 
            fontWeight: 800, 
            letterSpacing: '-0.02em',
            color: 'var(--color-graphite)', 
            marginBottom: '14px',
            lineHeight: 1.1
          }}
        >
          THE PEOPLE VS. YOUR OVERTHINKING
        </h1>
        <p style={{ fontSize: '1.1rem', color: 'var(--color-muted-slate)', lineHeight: 1.5 }}>
          The court will now hear arguments regarding whether an innocent text message constitutes a premeditated act of emotional warfare.
        </p>
      </div>

      {/* EVIDENCE EXHIBIT SURFACE */}
      <div 
        className="glass-evidence"
        style={{
          borderRadius: '24px',
          padding: '32px',
          marginBottom: '40px',
          backgroundColor: highlightExhibit ? '#FFFFFF' : 'rgba(255, 255, 255, 0.75)',
          transition: 'all 0.3s ease',
          border: highlightExhibit ? '2px solid var(--color-indigo)' : '1px solid var(--color-subtle-border)'
        }}
      >
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '16px', marginBottom: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <EvidenceTagDoodle label="EXHIBIT A" />
            <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--color-graphite)' }}>
              Primary Physical Evidence On Trial
            </span>
          </div>

          <div style={{ display: 'flex', gap: '10px' }}>
            <button 
              onClick={() => setHighlightExhibit(prev => !prev)} 
              className="btn-ghost"
              style={{ fontSize: '0.82rem', padding: '6px 14px' }}
            >
              {highlightExhibit ? 'Reset Focus' : 'Focus Magnifying Glass'}
            </button>
            <button 
              onClick={() => navigate('/decode')} 
              className="btn-ghost"
              style={{ fontSize: '0.82rem', padding: '6px 14px' }}
            >
              Switch Case Exhibit
            </button>
          </div>
        </div>

        {/* Message Callout */}
        <div 
          style={{
            backgroundColor: '#FAF8F5',
            borderRadius: '16px',
            border: '1px solid var(--color-subtle-border)',
            padding: '24px 28px',
            marginBottom: '18px'
          }}
        >
          <div style={{ fontSize: '1.9rem', fontWeight: 800, color: 'var(--color-graphite)', marginBottom: '8px' }}>
            "{activeCase.message}"
          </div>
          {activeCase.context && (
            <div style={{ fontSize: '0.92rem', color: 'var(--color-muted-slate)' }}>
              <strong>Supplied Context:</strong> {activeCase.context}
            </div>
          )}
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '16px' }}>
          <MagnifyingGlassDoodle note="Interesting. Or completely normal." />
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.82rem', color: 'var(--color-muted-slate)' }}>
            <Info size={14} />
            <span>Tap annotations below to reveal forensic reality notes</span>
          </div>
        </div>
      </div>

      {/* SIGNATURE ANIMATION WIDGET */}
      <div style={{ marginBottom: '36px' }}>
        <ThoughtSpiralAnimation steps={activeCase.thoughtSpiralSteps} />
      </div>

      {/* EXHIBIT B: ICONIC MEME EVIDENCE */}
      {activeCase.meme && (
        <div 
          className="glass-evidence scroll-reveal card-interactive"
          style={{
            borderRadius: '20px',
            padding: '20px 24px',
            marginBottom: '36px',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '20px',
            backgroundColor: 'rgba(255, 255, 255, 0.9)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <img 
              src={activeCase.meme.url || activeCase.meme.image || '/memes/expanding_brain.jpg'} 
              alt={activeCase.meme.title} 
              style={{ width: '84px', height: '84px', borderRadius: '12px', objectFit: 'cover', border: '1px solid var(--color-subtle-border)' }} 
            />
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                <EvidenceTagDoodle label="EXHIBIT B" />
                <span style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--color-indigo)' }}>
                  Psychological State Exhibit
                </span>
              </div>
              <h4 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--color-graphite)' }}>
                {activeCase.meme.title}
              </h4>
              <p style={{ fontSize: '0.88rem', color: 'var(--color-muted-slate)', fontStyle: 'italic' }}>
                "{activeCase.meme.defaultCaption || 'Entered into the judicial record as evidence of anxiety conjecture.'}"
              </p>
            </div>
          </div>
          <span className="chip chip-amber" style={{ fontSize: '0.78rem', fontWeight: 600 }}>
            Judicial Exhibit Certified
          </span>
        </div>
      )}

      {/* COURTROOM WITNESS STAND CROSS-EXAMINATION Q&A SESSION */}
      <WitnessStandCrossExamination onTestimonySubmitted={() => triggerGavelBang()} />

      {/* THREE-STAGE EDITORIAL COURTROOM COMPOSITION */}
      <div 
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '28px',
          marginBottom: '50px'
        }}
      >
        
        {/* STAGE 1: PROSECUTION */}
        <div 
          className="glass-evidence"
          style={{
            borderRadius: '24px',
            padding: '30px',
            borderTop: '4px solid #E65353',
            display: 'flex',
            flexDirection: 'column',
            gap: '18px',
            background: 'rgba(255, 255, 255, 0.8)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span className="chip" style={{ backgroundColor: 'rgba(230, 83, 83, 0.1)', color: '#D93838', border: '1px solid rgba(230, 83, 83, 0.25)' }}>
              Stage 1 • Prosecution
            </span>
            <DetectiveStickFigure note="Potentially suspicious." />
          </div>

          <div>
            <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--color-graphite)', marginBottom: '6px' }}>
              The Overthinking Indictment
            </h3>
            <p style={{ fontSize: '0.86rem', color: 'var(--color-muted-slate)' }}>
              Argues the worst-case scenario using only supplied facts and unhinged emotional conjecture.
            </p>
          </div>

          {/* Prosecution Arguments */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {activeCase.prosecution?.arguments?.map((arg, i) => (
              <div 
                key={i}
                onClick={() => setActiveAnnotationNote(`Prosecution Claim ${i+1}: This argument assumes mind-reading capabilities without physical testimony.`)}
                style={{
                  padding: '12px 16px',
                  borderRadius: '12px',
                  background: 'rgba(243, 241, 236, 0.7)',
                  border: '1px solid var(--color-subtle-border)',
                  fontSize: '0.92rem',
                  lineHeight: 1.45,
                  cursor: 'pointer',
                  transition: 'background 0.15s ease'
                }}
              >
                <div style={{ fontWeight: 700, fontSize: '0.78rem', color: '#D93838', textTransform: 'uppercase', marginBottom: '4px' }}>
                  Exhibit Claim {i + 1}
                </div>
                <div>{arg}</div>
              </div>
            ))}
          </div>

          {/* Prosecution Notes Doodle */}
          <div style={{ 
            marginTop: 'auto', 
            padding: '12px 16px', 
            borderRadius: '12px', 
            background: '#FFF0F0', 
            border: '1px dashed #E65353' 
          }}>
            <span style={{ fontFamily: 'var(--font-doodle)', fontSize: '1.1rem', color: '#D93838', display: 'block' }}>
              "{activeCase.prosecution?.notes || 'Prosecution demands immediate re-reading of the message 14 consecutive times.'}"
            </span>
          </div>
        </div>

        {/* STAGE 2: DEFENCE */}
        <div 
          className="glass-evidence"
          style={{
            borderRadius: '24px',
            padding: '30px',
            borderTop: '4px solid var(--color-indigo)',
            display: 'flex',
            flexDirection: 'column',
            gap: '18px',
            background: 'rgba(255, 255, 255, 0.8)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span className="chip chip-lavender">
              Stage 2 • Defence
            </span>
            <span style={{ fontFamily: 'var(--font-doodle)', fontSize: '1.2rem', color: 'var(--color-indigo)' }}>
              "Counterpoint: people have lives."
            </span>
          </div>

          <div>
            <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--color-graphite)', marginBottom: '6px' }}>
              Ground Reality & Alternatives
            </h3>
            <p style={{ fontSize: '0.86rem', color: 'var(--color-muted-slate)' }}>
              Presents rational human explanations and strikes down unsupported assumptions.
            </p>
          </div>

          {/* Defence Arguments */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {activeCase.defence?.arguments?.map((arg, i) => (
              <div 
                key={i}
                onClick={() => setActiveAnnotationNote(`Defence Point ${i+1}: Supported by the universal reality that people are frequently preoccupied.`)}
                style={{
                  padding: '12px 16px',
                  borderRadius: '12px',
                  background: 'rgba(243, 241, 236, 0.7)',
                  border: '1px solid var(--color-subtle-border)',
                  fontSize: '0.92rem',
                  lineHeight: 1.45,
                  cursor: 'pointer'
                }}
              >
                <div style={{ fontWeight: 700, fontSize: '0.78rem', color: 'var(--color-indigo)', textTransform: 'uppercase', marginBottom: '4px' }}>
                  Defence Motion {i + 1}
                </div>
                <div>{arg}</div>
              </div>
            ))}
          </div>

          {/* Crossed-out speculation note */}
          <div style={{ 
            marginTop: 'auto', 
            padding: '12px 16px', 
            borderRadius: '12px', 
            background: 'var(--color-pale-lavender)', 
            border: '1px dashed var(--color-indigo)' 
          }}>
            <div style={{ textDecoration: 'line-through', color: '#777A78', fontSize: '0.85rem' }}>
              Speculative Arrow: "They hate me forever."
            </div>
            <span style={{ fontFamily: 'var(--font-doodle)', fontSize: '1.15rem', color: 'var(--color-indigo)', display: 'block', marginTop: '2px' }}>
              ↳ Struck from the record. Pure fiction.
            </span>
          </div>
        </div>

        {/* STAGE 3: THE JUDGE & HIGH-CONTRAST VERDICT PANEL */}
        <div 
          className="surface-verdict"
          style={{
            borderRadius: '24px',
            padding: '32px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            gap: '20px',
            position: 'relative'
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
              <span className="verdict-stamp">
                COURT RULING
              </span>
              <button 
                onClick={triggerGavelBang}
                className="btn-ghost"
                style={{ color: '#DCA96B', padding: '6px' }}
                title="Bang the judicial gavel to re-certify verdict"
              >
                <Gavel size={22} />
              </button>
            </div>

            <span style={{ fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: '#DCA96B', fontWeight: 700 }}>
              Stage 3 • Official Verdict
            </span>

            {/* Verdict Headline & Summary */}
            <div style={{ 
              opacity: verdictRevealed ? 1 : 0.4, 
              transform: verdictRevealed ? 'scale(1)' : 'scale(0.97)', 
              transition: 'all 0.2s cubic-bezier(0.34, 1.56, 0.64, 1)' 
            }}>
              {witnessTestimony && witnessTestimony.length > 0 && (
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', backgroundColor: 'rgba(220, 169, 107, 0.22)', border: '1px solid #DCA96B', borderRadius: '8px', padding: '4px 10px', fontSize: '0.74rem', color: '#FAF8F5', fontWeight: 700, marginBottom: '8px' }}>
                  <span>⚖️ {witnessTestimony.length} Sworn Statement(s) Factored into Ruling</span>
                </div>
              )}

              <h3 
                style={{ 
                  fontSize: '1.8rem', 
                  fontWeight: 900, 
                  letterSpacing: '-0.01em', 
                  color: '#FAF8F5', 
                  margin: '8px 0 14px' 
                }}
              >
                {activeCase.verdict?.title || "NOT ENOUGH EVIDENCE"}
              </h3>

              {/* Verdict Calibrated Copy */}
              <div 
                style={{ 
                  fontSize: '1.15rem', 
                  lineHeight: 1.5, 
                  color: 'rgba(243, 241, 236, 0.95)', 
                  marginBottom: '16px',
                  borderLeft: '3px solid #DCA96B',
                  paddingLeft: '14px'
                }}
              >
                "{activeCase.verdict?.summary || 'The court recognises your imagination. It does not recognise it as a witness.'}"
              </div>

              {/* Handwritten Marginalia Annotation */}
              <div style={{ fontFamily: 'var(--font-doodle)', fontSize: '1.25rem', color: '#DCA96B', marginBottom: '20px' }}>
                "{activeCase.verdict?.annotation || 'Unfortunately, your anxiety brought no actual witnesses to the stand.'}"
              </div>
            </div>
          </div>

          {/* Action Row */}
          <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.15)', paddingTop: '18px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <button
              onClick={() => navigate('/reality-check')}
              className="btn-indigo"
              style={{ width: '100%', justifyContent: 'center' }}
            >
              <span>Review Reality Check Matrix</span>
              <ArrowRight size={16} />
            </button>
            <div style={{ textAlign: 'center', fontSize: '0.76rem', color: 'rgba(255, 255, 255, 0.55)' }}>
              Certified by Project Overthink Judiciary
            </div>
          </div>
        </div>

      </div>

      {/* ACTIVE ANNOTATION MODAL / CALLOUT (If tapped) */}
      {activeAnnotationNote && (
        <div 
          className="glass-evidence"
          style={{
            borderRadius: '16px',
            padding: '16px 22px',
            marginBottom: '30px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: '#FAF8F5',
            border: '1px solid var(--color-indigo)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Info size={18} color="var(--color-indigo)" />
            <span style={{ fontSize: '0.92rem', color: 'var(--color-graphite)', fontWeight: 600 }}>
              {activeAnnotationNote}
            </span>
          </div>
          <button 
            onClick={() => setActiveAnnotationNote(null)}
            className="btn-ghost"
            style={{ fontSize: '0.8rem', padding: '4px 10px' }}
          >
            Dismiss
          </button>
        </div>
      )}

      {/* NAVIGATION FOOTER FOR COURTROOM */}
      <div 
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '20px',
          borderTop: '1px solid var(--color-subtle-border)',
          paddingTop: '28px'
        }}
      >
        <button 
          onClick={() => navigate('/decode')}
          className="btn-ghost"
          style={{ border: '1px solid var(--color-subtle-border)' }}
        >
          ← Return to Decode It
        </button>

        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <button 
            onClick={() => setTherapyModalOpen(true)}
            className="btn-secondary"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}
          >
            <MessageSquareHeart size={16} color="var(--color-indigo)" />
            <span>Chat with Therapist</span>
          </button>
          <button 
            onClick={() => navigate('/cases')}
            className="btn-secondary"
          >
            View All Case Files
          </button>
          <button 
            onClick={() => navigate('/reality-check')}
            className="btn-primary"
          >
            Proceed to Reality Check
            <ArrowRight size={16} />
          </button>
        </div>
      </div>

      {/* Therapy Chatbot Modal */}
      <TherapyChatbotModal 
        isOpen={therapyModalOpen} 
        onClose={() => setTherapyModalOpen(false)} 
        currentCase={currentCase} 
      />

    </div>
  );
}
