import React, { useState } from 'react';
import { RotateCcw, Sparkles } from 'lucide-react';

// Doodle 1: Magnifying Glass examining text with marginalia note
export function MagnifyingGlassDoodle({ text = "Okay.", note = "Interesting. Or completely normal.", className = "" }) {
  return (
    <div className={`relative inline-flex items-center gap-3 p-2 ${className}`} style={{ display: 'inline-flex', alignItems: 'center', gap: '12px' }}>
      <svg width="120" height="70" viewBox="0 0 120 70" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Hand-drawn imperfect glass lens */}
        <circle cx="36" cy="30" r="22" stroke="#20211F" strokeWidth="2.5" strokeDasharray="3 1" fill="rgba(89, 102, 232, 0.08)"/>
        {/* Glass reflection highlight */}
        <path d="M 24 20 A 14 14 0 0 1 38 16" stroke="#5966E8" strokeWidth="2" strokeLinecap="round"/>
        {/* Sketchy handle */}
        <path d="M 52 45 L 75 62" stroke="#20211F" strokeWidth="4.5" strokeLinecap="round"/>
        <path d="M 72 60 L 78 64" stroke="#DCA96B" strokeWidth="3" strokeLinecap="round"/>
        {/* Sketchy curved pointer to the text */}
        <path d="M 68 22 C 85 14, 98 25, 112 18" stroke="#DCA96B" strokeWidth="1.8" strokeLinecap="round" fill="none"/>
        <path d="M 112 18 L 105 16 M 112 18 L 108 24" stroke="#DCA96B" strokeWidth="1.8" strokeLinecap="round"/>
      </svg>
      <div style={{ lineHeight: 1.2 }}>
        <span style={{ 
          fontFamily: 'var(--font-doodle)', 
          fontSize: '1.15rem', 
          color: '#DCA96B', 
          transform: 'rotate(-2deg)', 
          display: 'inline-block' 
        }}>
          "{note}"
        </span>
      </div>
    </div>
  );
}

// Doodle 2: Stick figure detective pacing in a trenchcoat
export function DetectiveStickFigure({ className = "", note = "Potentially suspicious." }) {
  return (
    <div className={`flex items-center gap-3 ${className}`} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
      <svg width="70" height="85" viewBox="0 0 70 85" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Detective Fedora Hat */}
        <path d="M 15 22 Q 32 16 48 20" stroke="#20211F" strokeWidth="2.5" strokeLinecap="round"/>
        <path d="M 22 20 C 22 12, 40 10, 42 19" stroke="#20211F" strokeWidth="2.5" fill="#FAF8F5"/>
        {/* Stick Head */}
        <circle cx="32" cy="28" r="8" stroke="#20211F" strokeWidth="2.2" fill="#FAF8F5"/>
        {/* Suspicious Eye */}
        <circle cx="36" cy="28" r="1.5" fill="#20211F"/>
        {/* Trenchcoat Body */}
        <path d="M 32 36 L 24 64 L 42 64 Z" stroke="#20211F" strokeWidth="2" fill="rgba(32, 33, 31, 0.05)"/>
        {/* Collar details */}
        <path d="M 28 38 L 32 46 L 36 38" stroke="#20211F" strokeWidth="1.5"/>
        {/* Stick Arms holding small magnifier */}
        <path d="M 26 42 L 14 48 L 12 40" stroke="#20211F" strokeWidth="2" strokeLinecap="round"/>
        <circle cx="10" cy="38" r="4" stroke="#5966E8" strokeWidth="1.8"/>
        {/* Pacing Legs */}
        <path d="M 27 64 L 20 80 M 36 64 L 44 78" stroke="#20211F" strokeWidth="2.2" strokeLinecap="round"/>
        {/* Pacing dust dashes */}
        <path d="M 10 80 Q 15 82 18 80 M 46 80 Q 52 82 55 79" stroke="#777A78" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
      {note && (
        <span style={{ 
          fontFamily: 'var(--font-doodle)', 
          fontSize: '1.1rem', 
          color: '#5966E8', 
          transform: 'rotate(1deg)',
          display: 'inline-block'
        }}>
          "{note}"
        </span>
      )}
    </div>
  );
}

// Doodle 3: Tiny Judge with Oversized Gavel
export function GavelJudgeDoodle({ className = "", note = "The court strikes speculative panic." }) {
  return (
    <div className={`flex items-center gap-3 ${className}`} style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
      <svg width="85" height="75" viewBox="0 0 85 75" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Judge Podia / Block */}
        <rect x="8" y="58" width="45" height="12" rx="2" stroke="#20211F" strokeWidth="2" fill="#FAF8F5"/>
        {/* Tiny Judge Body */}
        <path d="M 24 40 L 18 58 L 38 58 Z" stroke="#20211F" strokeWidth="2" fill="#20211F"/>
        {/* Tiny Head with powdered judicial wig */}
        <circle cx="28" cy="30" r="7" stroke="#20211F" strokeWidth="2" fill="#FAF8F5"/>
        {/* Wig curls */}
        <path d="M 21 28 C 18 32, 19 36, 22 36 M 35 28 C 38 32, 37 36, 34 36" stroke="#777A78" strokeWidth="2"/>
        {/* Oversized Gavel Handle */}
        <path d="M 28 42 L 56 22" stroke="#20211F" strokeWidth="3.5" strokeLinecap="round"/>
        {/* Massive Gavel Head */}
        <rect x="52" y="8" width="24" height="16" rx="3" transform="rotate(-30 52 8)" stroke="#DCA96B" strokeWidth="3" fill="#FBF4EB"/>
        {/* Motion impact lines */}
        <path d="M 46 62 L 40 56 M 52 64 L 56 57" stroke="#DCA96B" strokeWidth="2" strokeLinecap="round"/>
      </svg>
      {note && (
        <span style={{ 
          fontFamily: 'var(--font-doodle)', 
          fontSize: '1.15rem', 
          color: '#20211F', 
          lineHeight: 1.2
        }}>
          {note}
        </span>
      )}
    </div>
  );
}

// Doodle 4: Detective Board with Pin Strings ending at "No actual evidence"
export function DetectiveBoardDoodle({ className = "" }) {
  return (
    <div className={`p-4 glass-evidence rounded-2xl ${className}`} style={{ borderRadius: '16px', border: '1px dashed rgba(32, 33, 31, 0.25)', position: 'relative' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
        <span style={{ fontFamily: 'var(--font-doodle)', fontSize: '1.15rem', color: '#DCA96B' }}>
          PINBOARD OF WILD CONJECTURE
        </span>
        <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--color-muted-slate)', fontWeight: 600 }}>
          Case Exhibit File
        </span>
      </div>
      <svg width="100%" height="90" viewBox="0 0 340 90" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ overflow: 'visible' }}>
        {/* Pin 1 (Left) */}
        <circle cx="35" cy="25" r="5" fill="#5966E8"/>
        <rect x="15" y="36" width="60" height="26" rx="4" stroke="#20211F" strokeWidth="1.5" fill="#FAF8F5"/>
        <text x="22" y="52" fill="#20211F" fontSize="10" fontFamily="var(--font-sans)" fontWeight="600">The Text</text>
        
        {/* Pin 2 (Middle Top) */}
        <circle cx="160" cy="18" r="5" fill="#DCA96B"/>
        <rect x="130" y="28" width="85" height="26" rx="4" stroke="#20211F" strokeWidth="1.5" fill="#FAF8F5"/>
        <text x="136" y="44" fill="#20211F" fontSize="9" fontFamily="var(--font-sans)" fontWeight="600">Past History</text>

        {/* Pin 3 (Right) - Destination */}
        <circle cx="285" cy="45" r="6" fill="#20211F"/>
        <rect x="235" y="58" width="98" height="26" rx="4" stroke="#5966E8" strokeWidth="2" fill="#E9EDFF"/>
        <text x="242" y="74" fill="#5966E8" fontSize="9" fontFamily="var(--font-sans)" fontWeight="700">NO ACTUAL EVIDENCE</text>

        {/* Red detective string connections */}
        <path d="M 35 25 Q 90 8 160 18" stroke="#E65353" strokeWidth="2" strokeDasharray="4 2" fill="none"/>
        <path d="M 160 18 Q 220 22 285 45" stroke="#E65353" strokeWidth="2" strokeDasharray="4 2" fill="none"/>
        <path d="M 35 25 Q 150 70 285 45" stroke="#E65353" strokeWidth="1.5" strokeDasharray="2 2" fill="none"/>
      </svg>
      <div style={{ textAlign: 'right', marginTop: '4px' }}>
        <span style={{ fontFamily: 'var(--font-doodle)', fontSize: '1rem', color: '#777A78' }}>
          *All red strings lead to empty air.
        </span>
      </div>
    </div>
  );
}

// Doodle 5: Doodled Brain surrounded by chaotic arrows
export function ChaoticBrainDoodle({ className = "" }) {
  return (
    <div className={`inline-flex flex-col items-center ${className}`} style={{ display: 'inline-flex', flexDirection: 'column', alignItems: 'center' }}>
      <svg width="100" height="90" viewBox="0 0 100 90" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Sketchy brain contours */}
        <path d="M 32 45 C 24 45, 18 36, 24 26 C 26 20, 36 18, 42 22 C 46 16, 56 16, 60 22 C 68 18, 76 22, 78 28 C 84 36, 78 45, 70 45 C 76 54, 70 64, 60 64 C 54 64, 50 60, 48 56 C 44 60, 38 64, 32 64 C 22 64, 18 54, 32 45 Z" 
          stroke="#20211F" strokeWidth="2.5" fill="#FAF8F5" strokeLinejoin="round"/>
        {/* Internal convoluted sulci folds */}
        <path d="M 38 32 C 44 38, 40 46, 46 50 M 52 26 C 56 34, 50 44, 58 48 M 64 34 C 68 38, 66 44, 70 48" 
          stroke="#777A78" strokeWidth="1.8" strokeLinecap="round" fill="none"/>
        {/* Chaotic question mark sparks & orbiting arrows */}
        <path d="M 14 20 Q 8 10 20 8" stroke="#5966E8" strokeWidth="1.8" strokeLinecap="round" fill="none"/>
        <path d="M 82 20 Q 94 15 88 6" stroke="#DCA96B" strokeWidth="1.8" strokeLinecap="round" fill="none"/>
        <path d="M 85 58 Q 96 68 82 76" stroke="#5966E8" strokeWidth="1.8" strokeLinecap="round" fill="none"/>
        <path d="M 12 55 Q 4 65 16 75" stroke="#DCA96B" strokeWidth="1.8" strokeLinecap="round" fill="none"/>
        <text x="44" y="80" fill="#20211F" fontSize="16" fontFamily="var(--font-doodle)">???</text>
      </svg>
      <span style={{ fontFamily: 'var(--font-doodle)', fontSize: '0.95rem', color: '#777A78', marginTop: '-4px' }}>
        Current cognitive load: 99.4%
      </span>
    </div>
  );
}

// Doodle 6: Crooked Evidence Tag marked "Exhibit A"
export function EvidenceTagDoodle({ label = "EXHIBIT A", className = "" }) {
  return (
    <div className={`inline-flex items-center gap-2 ${className}`} style={{ display: 'inline-flex', alignItems: 'center' }}>
      <svg width="110" height="42" viewBox="0 0 110 42" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M 4 4 L 88 4 L 104 21 L 88 38 L 4 38 Z" stroke="#20211F" strokeWidth="1.8" fill="#FAF8F5"/>
        {/* Ring hole */}
        <circle cx="95" cy="21" r="3.5" stroke="#20211F" strokeWidth="1.5" fill="#F3F1EC"/>
        <text x="14" y="25" fill="#20211F" fontSize="13" fontFamily="var(--font-sans)" fontWeight="800" letterSpacing="0.08em">
          {label}
        </text>
      </svg>
    </div>
  );
}

// Doodle 7: Night Owl 2:47 AM phone thinker
export function NightOwlDoodle({ className = "" }) {
  return (
    <div className={`flex items-center gap-3 ${className}`} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
      <svg width="70" height="70" viewBox="0 0 70 70" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Bed pillow */}
        <path d="M 8 50 Q 35 44 62 50 L 62 60 L 8 60 Z" stroke="#777A78" strokeWidth="1.8" fill="#FAF8F5"/>
        {/* Stick figure head staring upwards */}
        <circle cx="28" cy="38" r="9" stroke="#20211F" strokeWidth="2" fill="#FAF8F5"/>
        {/* Staring wide eyes */}
        <circle cx="31" cy="36" r="2" fill="#20211F"/>
        <circle cx="25" cy="36" r="2" fill="#20211F"/>
        {/* Glowing smartphone */}
        <rect x="42" y="24" width="16" height="26" rx="3" stroke="#20211F" strokeWidth="1.8" fill="#E9EDFF"/>
        <path d="M 44 26 L 56 26" stroke="#5966E8" strokeWidth="1.2"/>
        {/* Light beam to face */}
        <path d="M 42 30 L 34 38 M 42 42 L 35 44" stroke="#5966E8" strokeWidth="1" strokeDasharray="2 2"/>
      </svg>
      <div>
        <div style={{ fontFamily: 'var(--font-doodle)', fontSize: '1.1rem', color: '#5966E8', lineHeight: 1.1 }}>
          "Awake at 2:47 AM"
        </div>
        <div style={{ fontFamily: 'var(--font-doodle)', fontSize: '0.95rem', color: '#777A78' }}>
          Thinking about a message sent at 4:12 PM.
        </div>
      </div>
    </div>
  );
}

// SIGNATURE ANIMATION: The Overthinking Spiral
export function ThoughtSpiralAnimation({ 
  steps = [
    { label: "Short reply", text: "They said 'Okay.'" },
    { label: "Something's wrong?", text: "Why no emoji or exclamation mark?" },
    { label: "They're upset?", text: "Was it what I said yesterday?" },
    { label: "I've ruined everything?", text: "They are quietly planning to cut all contact." }
  ],
  className = "" 
}) {
  const [animationKey, setAnimationKey] = useState(0);
  const [isRevealed, setIsRevealed] = useState(true);

  const handleReplay = () => {
    setIsRevealed(false);
    setTimeout(() => {
      setAnimationKey(prev => prev + 1);
      setIsRevealed(true);
    }, 100);
  };

  return (
    <div 
      className={`glass-evidence rounded-2xl p-6 ${className}`} 
      style={{ 
        borderRadius: '24px', 
        padding: '28px',
        position: 'relative',
        background: 'rgba(255, 255, 255, 0.85)'
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span className="chip chip-amber">Signature Forensic Exhibit</span>
          <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-muted-slate)' }}>
            The Overthinking Spiral
          </span>
        </div>
        <button 
          onClick={handleReplay}
          className="btn-ghost"
          style={{ fontSize: '0.82rem', padding: '6px 14px' }}
          title="Replay the speculative thought spiral"
        >
          <RotateCcw size={14} />
          <span>Replay Spiral</span>
        </button>
      </div>

      {/* The Spiral Path SVG and Narrative Sequence */}
      <div style={{ position: 'relative', minHeight: '260px' }} key={animationKey}>
        {/* Step-by-step speculative leaps */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
          gap: '16px',
          marginBottom: '28px'
        }}>
          {steps.map((step, idx) => {
            const isCatastrophe = idx === steps.length - 1;
            return (
              <div 
                key={idx}
                style={{
                  background: isCatastrophe ? 'rgba(230, 83, 83, 0.08)' : 'rgba(243, 241, 236, 0.7)',
                  border: isCatastrophe ? '1px dashed #E65353' : '1px solid var(--color-subtle-border)',
                  borderRadius: '14px',
                  padding: '14px 16px',
                  position: 'relative',
                  transition: 'all 0.3s ease',
                  opacity: isRevealed ? 1 : 0,
                  transform: isRevealed ? 'translateY(0)' : 'translateY(12px)',
                  transitionDelay: `${idx * 180}ms`
                }}
              >
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'space-between',
                  marginBottom: '6px'
                }}>
                  <span style={{ 
                    fontSize: '0.75rem', 
                    fontWeight: 700, 
                    textTransform: 'uppercase',
                    color: isCatastrophe ? '#D93838' : 'var(--color-indigo)' 
                  }}>
                    Level {idx + 1}: {step.label}
                  </span>
                  <span style={{ 
                    fontFamily: 'var(--font-doodle)', 
                    fontSize: '1rem',
                    color: isCatastrophe ? '#D93838' : 'var(--color-muted-slate)' 
                  }}>
                    {idx === 0 ? "Fact" : (idx === steps.length - 1 ? "Catastrophe" : "Speculation")}
                  </span>
                </div>
                <div style={{ fontSize: '0.92rem', fontWeight: 500, color: 'var(--color-graphite)' }}>
                  "{step.text}"
                </div>
              </div>
            );
          })}
        </div>

        {/* The Animated SVG Spiral Knot returning to Evidence */}
        <div style={{ 
          background: 'var(--color-porcelain-light)', 
          borderRadius: '16px', 
          padding: '18px 24px',
          border: '1px solid var(--color-subtle-border)',
          display: 'flex',
          flexDirection: 'column',
          gap: '14px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: '0.82rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--color-graphite)' }}>
              JUDICIAL DE-ESCALATION TRAJECTORY
            </span>
            <span style={{ fontFamily: 'var(--font-doodle)', fontSize: '1.15rem', color: '#5966E8' }}>
              Resetting to Ground Truth...
            </span>
          </div>

          <svg width="100%" height="80" viewBox="0 0 500 80" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ overflow: 'visible' }}>
            {/* Chaotic spiral scribbles representing overthinking */}
            <path 
              d="M 20 40 Q 60 10 100 40 Q 140 70 180 40 Q 220 10 260 40 C 280 15, 310 65, 330 35 C 345 10, 360 70, 380 40 C 390 20, 400 60, 410 40" 
              stroke="#DCA96B" 
              strokeWidth="2.2" 
              strokeDasharray="6 3"
              fill="none"
              style={{ opacity: 0.7 }}
            />
            {/* Tangled Knot in the middle */}
            <path 
              d="M 330 35 C 350 15, 360 65, 340 50 C 320 35, 355 20, 370 45 C 385 70, 350 65, 365 30" 
              stroke="#E65353" 
              strokeWidth="2.5" 
              fill="none"
            />
            {/* The Judge's clean, authoritative, straight indigo line cutting back to the original message */}
            <path 
              d="M 370 45 C 370 45, 250 45, 30 45" 
              stroke="#5966E8" 
              strokeWidth="3.5" 
              strokeLinecap="round"
              strokeDasharray="400"
              strokeDashoffset={isRevealed ? 0 : 400}
              style={{ transition: 'stroke-dashoffset 1.4s cubic-bezier(0.16, 1, 0.3, 1) 0.5s' }}
            />
            {/* Pin head on clean line start */}
            <circle cx="30" cy="45" r="5" fill="#5966E8"/>
            <circle cx="370" cy="45" r="5" fill="#E65353"/>
          </svg>

          {/* Final Authoritative Annotation */}
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'space-between',
            borderTop: '1px dashed var(--color-subtle-border)',
            paddingTop: '12px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Sparkles size={16} color="#5966E8" />
              <span style={{ 
                fontFamily: 'var(--font-doodle)', 
                fontSize: '1.35rem', 
                color: 'var(--color-graphite)', 
                fontWeight: 700 
              }}>
                "Evidence ends here. The rest is fan fiction."
              </span>
            </div>
            <span style={{ 
              fontSize: '0.78rem', 
              color: 'var(--color-muted-slate)', 
              fontWeight: 600,
              textTransform: 'uppercase'
            }}>
              Calibrated Verdict Principle
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
