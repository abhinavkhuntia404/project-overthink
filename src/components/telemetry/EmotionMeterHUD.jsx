import React, { useState, useEffect } from 'react';
import { 
  Activity, 
  Sparkles, 
  Sliders, 
  X, 
  Wind, 
  ShieldCheck, 
  ChevronUp, 
  TrendingDown, 
  Smile, 
  Frown, 
  Flame, 
  Heart,
  Scale,
  CheckCircle2
} from 'lucide-react';
import { useCase } from '../../context/CaseContext';

export default function EmotionMeterHUD() {
  const { emotionState, updateEmotion } = useCase();
  const [isOpen, setIsOpen] = useState(false);
  const [breathActive, setBreathActive] = useState(false);
  const [breathPhase, setBreathPhase] = useState('Inhale (4s)');
  const [breathCount, setBreathCount] = useState(0);

  const panic = emotionState?.panicLevel ?? 75;
  const catastrophe = emotionState?.catastropheLevel ?? 80;
  const tone = emotionState?.tonePreference || 'balanced';

  // Dynamic color coding for panic level
  const getPanicColor = (val) => {
    if (val < 35) return '#2E7D32'; // Green
    if (val < 70) return '#D97706'; // Amber
    return '#E65353'; // Crimson Red
  };

  const getPanicLabel = (val) => {
    if (val <= 20) return 'Zen & Centered';
    if (val <= 45) return 'Grounded Realism';
    if (val <= 70) return 'Active Overthinking Spiral';
    if (val <= 85) return 'Severe Cortisol Spike';
    return 'DEFCON 1 Panic Attack';
  };

  const getCatastropheLabel = (val) => {
    if (val <= 20) return 'Strict Empirical Reality';
    if (val <= 50) return 'Mild Speculative Drift';
    if (val <= 75) return 'High Subtext Extrapolation';
    return 'Full Catastrophic Fiction';
  };

  // Breathing exercise timer
  useEffect(() => {
    let timer;
    if (breathActive) {
      setBreathPhase('Inhale slowly through nose (4s)...');
      timer = setTimeout(() => {
        setBreathPhase('Hold breath gently (7s)...');
        timer = setTimeout(() => {
          setBreathPhase('Exhale completely through mouth (8s)...');
          timer = setTimeout(() => {
            setBreathCount(prev => prev + 1);
            updateEmotion(prev => ({
              panicLevel: Math.max(10, prev.panicLevel - 8),
              catastropheLevel: Math.max(10, prev.catastropheLevel - 10)
            }));
            setBreathActive(false);
            setBreathPhase('Breath Cycle Complete (-8% Cortisol)');
          }, 4000);
        }, 4000);
      }, 4000);
    }
    return () => clearTimeout(timer);
  }, [breathActive]);

  return (
    <>
      {/* FLOATING CAPSULE BAR (VISIBLE ACROSS THE WHOLE EXPERIENCE) */}
      <div 
        style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          zIndex: 990,
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          animation: 'fadeInUp 0.4s ease'
        }}
      >
        <button
          onClick={() => setIsOpen(true)}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '10px',
            backgroundColor: 'rgba(255, 255, 255, 0.94)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            border: `1.5px solid ${getPanicColor(panic)}40`,
            padding: '10px 18px',
            borderRadius: '9999px',
            boxShadow: '0 8px 32px -4px rgba(32, 33, 31, 0.16), 0 0 1px 1px rgba(255, 255, 255, 0.8)',
            cursor: 'pointer',
            transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)'
          }}
          onMouseEnter={e => {
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 12px 36px -4px rgba(32, 33, 31, 0.22)';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 8px 32px -4px rgba(32, 33, 31, 0.16)';
          }}
          title="Open Emotion Telemetry Console to view or adjust AI tone & anxiety dial"
          aria-label="Emotion Meter: Click to open telemetry"
        >
          {/* Animated Heartbeat / Pulse Ring */}
          <div 
            style={{
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: getPanicColor(panic)
            }}
          >
            <Activity size={18} />
            <span 
              style={{
                position: 'absolute',
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                backgroundColor: getPanicColor(panic),
                top: '-2px',
                right: '-2px',
                boxShadow: `0 0 8px ${getPanicColor(panic)}`,
                animation: 'pulse 1.8s infinite'
              }}
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', textAlign: 'left' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ fontSize: '0.72rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.04em', color: 'var(--color-muted-slate)' }}>
                Emotion Meter
              </span>
              <span 
                style={{ 
                  fontSize: '0.72rem', 
                  fontWeight: 700, 
                  color: getPanicColor(panic),
                  backgroundColor: `${getPanicColor(panic)}15`,
                  padding: '1px 6px',
                  borderRadius: '6px'
                }}
              >
                {panic}%
              </span>
            </div>
            <span style={{ fontSize: '0.80rem', fontWeight: 700, color: 'var(--color-graphite)' }}>
              {getPanicLabel(panic)}
            </span>
          </div>

          <div 
            style={{ 
              height: '24px', 
              width: '1px', 
              backgroundColor: 'var(--color-subtle-border)',
              margin: '0 2px' 
            }} 
          />

          <span 
            className="chip chip-lavender" 
            style={{ 
              fontSize: '0.72rem', 
              padding: '2px 8px',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px'
            }}
          >
            <Sparkles size={11} />
            <span>{tone === 'gentle_cbt' ? 'Gentle CBT' : tone === 'satirical_tough_love' ? 'Tough Love' : 'Balanced'}</span>
          </span>

          <ChevronUp size={15} color="var(--color-muted-slate)" />
        </button>
      </div>

      {/* FULL TELEMETRY MODAL / COMMAND CONSOLE */}
      {isOpen && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(32, 33, 31, 0.55)',
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)',
            zIndex: 2500,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px'
          }}
          onClick={() => setIsOpen(false)}
        >
          <div
            style={{
              width: '100%',
              maxWidth: '680px',
              maxHeight: '90vh',
              overflowY: 'auto',
              backgroundColor: '#FFFFFF',
              borderRadius: '24px',
              border: '1px solid rgba(89, 102, 232, 0.2)',
              boxShadow: '0 28px 72px -16px rgba(32, 33, 31, 0.28)',
              padding: '32px',
              position: 'relative',
              animation: 'modalSlideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
            }}
            onClick={e => e.stopPropagation()}
          >
            {/* Header */}
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '24px' }}>
              <div>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                  <span className="chip chip-lavender">
                    <Activity size={12} />
                    <span>Real-Time Biometric Telemetry</span>
                  </span>
                  <span style={{ fontSize: '0.75rem', color: 'var(--color-muted-slate)', fontWeight: 600 }}>
                    Governs Gemini AI Stance
                  </span>
                </div>
                <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--color-graphite)' }}>
                  Emotion & Anxiety Telemetry
                </h2>
                <p style={{ fontSize: '0.90rem', color: 'var(--color-muted-slate)', marginTop: '4px' }}>
                  This meter tracks your emotional state across the <strong>whole experience</strong>. Gemini AI dynamically shapes its tone, interpretations, courtroom cross-examinations, and therapy advice to this reading.
                </p>
              </div>

              <button
                onClick={() => setIsOpen(false)}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  width: '34px',
                  height: '34px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--color-muted-slate)',
                  backgroundColor: 'rgba(32, 33, 31, 0.05)'
                }}
              >
                <X size={18} />
              </button>
            </div>

            {/* METER 1: PANIC & CORTISOL DIAL */}
            <div 
              style={{
                backgroundColor: '#FAF8F5',
                borderRadius: '18px',
                padding: '20px',
                marginBottom: '20px',
                border: '1px solid var(--color-subtle-border)'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Flame size={18} color={getPanicColor(panic)} />
                  <span style={{ fontWeight: 800, fontSize: '0.96rem', color: 'var(--color-graphite)' }}>
                    Panic & Cortisol Level
                  </span>
                </div>
                <span 
                  style={{
                    fontSize: '0.92rem',
                    fontWeight: 800,
                    color: getPanicColor(panic),
                    backgroundColor: `${getPanicColor(panic)}15`,
                    padding: '2px 10px',
                    borderRadius: '8px'
                  }}
                >
                  {panic}% — {getPanicLabel(panic)}
                </span>
              </div>

              <input 
                type="range" 
                min="0" 
                max="100" 
                value={panic}
                onChange={e => updateEmotion({ panicLevel: Number(e.target.value) })}
                style={{
                  width: '100%',
                  accentColor: getPanicColor(panic),
                  cursor: 'pointer',
                  margin: '12px 0 6px'
                }}
              />

              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.74rem', color: 'var(--color-muted-slate)' }}>
                <span>0% Zen Monk</span>
                <span>50% Heart Flutter</span>
                <span>100% 3 AM Catastrophe</span>
              </div>
            </div>

            {/* METER 2: CATASTROPHIC PROJECTION DIAL */}
            <div 
              style={{
                backgroundColor: '#FAF8F5',
                borderRadius: '18px',
                padding: '20px',
                marginBottom: '20px',
                border: '1px solid var(--color-subtle-border)'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Scale size={18} color="var(--color-indigo)" />
                  <span style={{ fontWeight: 800, fontSize: '0.96rem', color: 'var(--color-graphite)' }}>
                    Catastrophic Projection Dial
                  </span>
                </div>
                <span 
                  style={{
                    fontSize: '0.92rem',
                    fontWeight: 800,
                    color: 'var(--color-indigo)',
                    backgroundColor: 'var(--color-pale-lavender)',
                    padding: '2px 10px',
                    borderRadius: '8px'
                  }}
                >
                  {catastrophe}% — {getCatastropheLabel(catastrophe)}
                </span>
              </div>

              <input 
                type="range" 
                min="0" 
                max="100" 
                value={catastrophe}
                onChange={e => updateEmotion({ catastropheLevel: Number(e.target.value) })}
                style={{
                  width: '100%',
                  accentColor: 'var(--color-indigo)',
                  cursor: 'pointer',
                  margin: '12px 0 6px'
                }}
              />

              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.74rem', color: 'var(--color-muted-slate)' }}>
                <span>0% Observable Facts Only</span>
                <span>50% Subtext Leaps</span>
                <span>100% Fiction Hallucination</span>
              </div>
            </div>

            {/* AI COUNSELING STANCE SELECTOR */}
            <div style={{ marginBottom: '24px' }}>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 800, color: 'var(--color-graphite)', marginBottom: '10px' }}>
                Preferred AI Counseling & De-escalation Stance
              </label>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '10px' }}>
                <button
                  type="button"
                  onClick={() => updateEmotion({ tonePreference: 'gentle_cbt' })}
                  style={{
                    padding: '14px',
                    borderRadius: '14px',
                    textAlign: 'left',
                    cursor: 'pointer',
                    border: tone === 'gentle_cbt' ? '2px solid var(--color-indigo)' : '1px solid var(--color-subtle-border)',
                    backgroundColor: tone === 'gentle_cbt' ? 'var(--color-pale-lavender)' : '#FAF8F5',
                    transition: 'all 0.15s ease'
                  }}
                >
                  <div style={{ fontWeight: 800, fontSize: '0.88rem', color: 'var(--color-graphite)', marginBottom: '4px' }}>
                    🌸 Gentle CBT
                  </div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--color-muted-slate)', lineHeight: 1.35 }}>
                    Compassionate somatic validation, zero snark, calming grounding focus.
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => updateEmotion({ tonePreference: 'balanced' })}
                  style={{
                    padding: '14px',
                    borderRadius: '14px',
                    textAlign: 'left',
                    cursor: 'pointer',
                    border: tone === 'balanced' ? '2px solid var(--color-indigo)' : '1px solid var(--color-subtle-border)',
                    backgroundColor: tone === 'balanced' ? 'var(--color-pale-lavender)' : '#FAF8F5',
                    transition: 'all 0.15s ease'
                  }}
                >
                  <div style={{ fontWeight: 800, fontSize: '0.88rem', color: 'var(--color-graphite)', marginBottom: '4px' }}>
                    ⚖️ Balanced Logic
                  </div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--color-muted-slate)', lineHeight: 1.35 }}>
                    Objective rational clarity, practical perspectives, intellectual calm.
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => updateEmotion({ tonePreference: 'satirical_tough_love' })}
                  style={{
                    padding: '14px',
                    borderRadius: '14px',
                    textAlign: 'left',
                    cursor: 'pointer',
                    border: tone === 'satirical_tough_love' ? '2px solid var(--color-indigo)' : '1px solid var(--color-subtle-border)',
                    backgroundColor: tone === 'satirical_tough_love' ? 'var(--color-pale-lavender)' : '#FAF8F5',
                    transition: 'all 0.15s ease'
                  }}
                >
                  <div style={{ fontWeight: 800, fontSize: '0.88rem', color: 'var(--color-graphite)', marginBottom: '4px' }}>
                    🌶️ Satirical Tough Love
                  </div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--color-muted-slate)', lineHeight: 1.35 }}>
                    Meme-literate, funny reality roast that humorously deflates melodrama.
                  </div>
                </button>
              </div>
            </div>

            {/* TRAJECTORY ACROSS THE WHOLE EXPERIENCE */}
            <div 
              style={{
                border: '1px solid var(--color-subtle-border)',
                borderRadius: '16px',
                padding: '18px 20px',
                marginBottom: '24px',
                backgroundColor: '#FFFFFF'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                <TrendingDown size={18} color="var(--color-indigo)" />
                <span style={{ fontSize: '0.90rem', fontWeight: 800, color: 'var(--color-graphite)' }}>
                  Emotional Trajectory Across The Whole Experience
                </span>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(95px, 1fr))', gap: '8px', textAlign: 'center' }}>
                {[
                  { step: '1. Reception', defaultLevel: '85%', tag: 'Spike' },
                  { step: '2. Decode Lab', defaultLevel: '60%', tag: 'Alternatives' },
                  { step: '3. Witness Stand', defaultLevel: '35%', tag: 'Sworn Truth' },
                  { step: '4. Reality Check', defaultLevel: '18%', tag: 'Anchored' },
                  { step: '5. Therapy', defaultLevel: '8%', tag: 'Peace' }
                ].map((item, idx) => (
                  <div 
                    key={idx}
                    style={{
                      padding: '10px 6px',
                      borderRadius: '12px',
                      backgroundColor: '#FAF8F5',
                      border: '1px solid var(--color-subtle-border)'
                    }}
                  >
                    <div style={{ fontSize: '0.72rem', color: 'var(--color-muted-slate)', fontWeight: 600 }}>
                      {item.step}
                    </div>
                    <div style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--color-graphite)', margin: '4px 0' }}>
                      {item.defaultLevel}
                    </div>
                    <span className="chip" style={{ fontSize: '0.65rem', padding: '1px 6px' }}>
                      {item.tag}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* INTERACTIVE 4-7-8 SOMATIC BREATHING BUTTON */}
            <div 
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '16px 20px',
                borderRadius: '16px',
                backgroundColor: 'var(--color-pale-lavender)',
                border: '1px solid rgba(89, 102, 232, 0.25)',
                gap: '14px'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div 
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '50%',
                    backgroundColor: '#FFFFFF',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--color-indigo)'
                  }}
                >
                  <Wind size={20} className={breathActive ? 'animate-pulse' : ''} />
                </div>
                <div>
                  <div style={{ fontWeight: 800, fontSize: '0.88rem', color: 'var(--color-graphite)' }}>
                    4-7-8 Physiological De-escalation Sigh
                  </div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--color-indigo)', fontWeight: 600 }}>
                    {breathActive ? breathPhase : breathCount > 0 ? `Completed ${breathCount} breath cycle(s)` : 'Tap to immediately lower panic meter'}
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setBreathActive(true)}
                disabled={breathActive}
                className="btn-indigo"
                style={{ padding: '8px 16px', fontSize: '0.82rem' }}
              >
                {breathActive ? 'Breathing in progress...' : 'Start 1 Breath Cycle (-8% Panic)'}
              </button>
            </div>

            {/* Close Button */}
            <div style={{ textAlign: 'center', marginTop: '24px' }}>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="btn-primary"
                style={{ width: '100%', justifyContent: 'center' }}
              >
                Apply Telemetry Settings & Return
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
