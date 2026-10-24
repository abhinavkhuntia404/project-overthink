import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Scale, ArrowRight, Sparkles, Filter, ExternalLink, Flame, Laugh } from 'lucide-react';
import { useCase } from '../../context/CaseContext';

export const REAL_INTERNET_MEMES = [
  {
    id: 'expanding_brain',
    title: 'The 4-Stage Mental Escalation',
    image: '/memes/expanding_brain.jpg',
    category: 'Late Night Spirals',
    badge: 'Classic 4-Panel',
    tagline: 'From 4 letters to supreme legal counsel in 90 seconds.',
    description: 'The universal journey from a simple text to drafting your formal defense for international court.',
    dialogue: [
      { level: 'Level 1 (Fact)', text: 'They said "Okay."' },
      { level: 'Level 2 (Doubt)', text: 'Wait... why no smiley face?' },
      { level: 'Level 3 (Spiral)', text: 'They hate me and are telling all our mutual friends.' },
      { level: 'Level 4 (Galaxy Brain)', text: 'Preparing my witness testimony for our imaginary breakup trial.' }
    ],
    presetMessage: 'They replied: Okay.',
    presetContext: 'Four letters with a full stop after sending detailed weekend plans.'
  },
  {
    id: 'two_buttons',
    title: 'The Daily Crossroad',
    image: '/memes/two_buttons.jpg',
    category: 'Rational vs Brain',
    badge: 'High Anxiety Choice',
    tagline: 'Sweating over which button to press at 4:15 PM.',
    description: 'The eternal dilemma between basic common sense and runaway existential panic.',
    buttonA: 'Assume they dropped phone in the sink or are driving',
    buttonB: 'Assume they are executing an emotional embargo on me',
    presetMessage: 'Left on read: "Sounds good."',
    presetContext: 'Seen 3 hours ago with zero follow-up.'
  },
  {
    id: 'waiting_skeleton',
    title: 'The Asynchronous Standoff',
    image: '/memes/waiting_skeleton.jpg',
    category: 'Texting Anxiety',
    badge: 'Delivered at 11:04 AM',
    tagline: 'Waiting for a reply while calculating your entire life trajectory.',
    description: 'Sitting on the garden bench of eternity waiting for the three typing bubbles to resurrect.',
    dialogue: [
      { level: 'Sent At', text: '11:04 AM: "Hey, are you free this weekend?"' },
      { level: 'Current State', text: 'Calcified into sedimentary rock waiting for "Seen" to turn into words.' }
    ],
    presetMessage: 'Are you free this weekend?',
    presetContext: 'Delivered 7 hours ago. Instagram activity detected 10 minutes ago.'
  },
  {
    id: 'anakin_padme',
    title: 'The Missing Punctuation',
    image: '/memes/anakin_padme.png',
    category: 'Punctuation Paranoia',
    badge: 'Tone Audit',
    tagline: 'The sudden absence of enthusiasm markers.',
    description: 'When someone who routinely deploys three exclamation marks suddenly hits you with a period.',
    dialogue: [
      { level: 'Anakin', text: 'I replied to your message.' },
      { level: 'Padmé', text: 'With an exclamation mark, right?' },
      { level: 'Anakin', text: '...' },
      { level: 'Padmé', text: 'With an exclamation mark, right?!' }
    ],
    presetMessage: 'Sounds great.',
    presetContext: 'Used to send 3 exclamation marks. Today just one solemn period.'
  },
  {
    id: 'sad_pablo',
    title: 'The Post-Send Silence',
    image: '/memes/sad_pablo.jpg',
    category: 'Late Night Spirals',
    badge: 'Deep Introspection',
    tagline: 'Contemplating every interpersonal decision made in the modern era.',
    description: 'Staring into the middle distance wondering if that joke you sent at 2 PM severed the friendship.',
    dialogue: [
      { level: 'Scene 1', text: 'Staring by the empty pool thinking about a text from 3 hours ago.' },
      { level: 'Scene 2', text: 'Sitting at the kitchen table contemplating single-letter replies.' }
    ],
    presetMessage: 'k',
    presetContext: 'Single lowercase consonant. Zero vowel support.'
  },
  {
    id: 'exit_ramp',
    title: 'The Rational Dilemma',
    image: '/memes/exit_ramp.jpg',
    category: 'Rational vs Brain',
    badge: 'Late Night Swerve',
    tagline: 'Swerving across 3 lanes of highway into pure conjecture.',
    description: 'When the clear straight path is peace of mind, but your brain takes the hard exit into chaos.',
    buttonA: 'Straight: Put phone face down and sleep like a healthy adult',
    buttonB: 'Exit Ramp: Google "psychology of single word text message" at 3:14 AM',
    presetMessage: 'Can we talk tomorrow morning?',
    presetContext: 'Manager sent at 4:58 PM on Thursday with no calendar agenda.'
  },
  {
    id: 'distracted_boyfriend',
    title: 'The Wandering Paranoia',
    image: '/memes/distracted_boyfriend.jpg',
    category: 'Rational vs Brain',
    badge: 'Cognitive Disloyalty',
    tagline: 'Ignoring cold hard facts to gawk at disaster fiction.',
    description: 'Why settle for peaceful reality when you can invent 14 different reasons someone might be furious?',
    buttonA: 'Holding Hands: The Actual Verifiable Evidence',
    buttonB: 'Distraction: Catastrophic Imaginary Scenarios',
    presetMessage: 'I will let you know.',
    presetContext: 'Asked if they wanted to get dinner next Friday.'
  },
  {
    id: 'uno_draw_25',
    title: 'The Double Text Penalty',
    image: '/memes/uno_draw_25.jpg',
    category: 'Texting Anxiety',
    badge: 'Card Holder',
    tagline: 'I would rather draw the entire deck than sit with unanswered silence.',
    description: 'The psychological torture of resisting the urge to send "Did you see this?" 4 minutes later.',
    dialogue: [
      { level: 'The Rule', text: 'Wait 20 minutes before sending another message OR Draw 25 cards.' },
      { level: 'The Reality', text: 'Holding 50 cards with sweaty trembling thumbs.' }
    ],
    presetMessage: 'Did you get my message? (Sent 4 mins later)',
    presetContext: 'Double texted after zero concrete reason to doubt them.'
  }
];

export default function MemeEvidenceVault({ onSelectMeme }) {
  const navigate = useNavigate();
  const { analyzeMessage } = useCase();
  const [activeFilter, setActiveFilter] = useState('All');
  const [selectedMemeModal, setSelectedMemeModal] = useState(null);

  const categories = ['All', 'Texting Anxiety', 'Late Night Spirals', 'Punctuation Paranoia', 'Rational vs Brain'];

  const filteredMemes = activeFilter === 'All' 
    ? REAL_INTERNET_MEMES 
    : REAL_INTERNET_MEMES.filter(m => m.category === activeFilter);

  const handleTestInCourt = async (meme) => {
    try {
      await analyzeMessage(meme.presetMessage, meme.presetContext, 'balanced');
      navigate('/courtroom');
    } catch (e) {
      console.error(e);
      navigate('/decode');
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      
      {/* Vault Header */}
      <div style={{ textAlign: 'center', maxWidth: '780px', margin: '0 auto' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
          <span className="chip chip-amber">
            <Flame size={13} />
            <span>Meme Evidence Locker</span>
          </span>
          <span style={{ fontSize: '0.82rem', color: 'var(--color-muted-slate)', fontWeight: 600 }}>
            Real Internet Social Media Memes
          </span>
        </div>
        <h2 style={{ fontSize: 'clamp(2.2rem, 4vw, 3.2rem)', fontWeight: 800, color: 'var(--color-graphite)', letterSpacing: '-0.02em', marginBottom: '14px' }}>
          Hall of Overthinking: Certified Internet Memes
        </h2>
        <p style={{ fontSize: '1.08rem', color: 'var(--color-muted-slate)', lineHeight: 1.55 }}>
          Real social media meme formats documenting the collective madness of modern messaging. Click any meme to put its exact scenario on trial.
        </p>
      </div>

      {/* Filter Chips */}
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '8px' }}>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveFilter(cat)}
            style={{
              padding: '8px 18px',
              borderRadius: 'var(--radius-full)',
              fontSize: '0.85rem',
              fontWeight: 600,
              cursor: 'pointer',
              border: '1px solid',
              borderColor: activeFilter === cat ? 'var(--color-graphite)' : 'var(--color-subtle-border)',
              backgroundColor: activeFilter === cat ? 'var(--color-graphite)' : 'rgba(255, 255, 255, 0.7)',
              color: activeFilter === cat ? '#FFFFFF' : 'var(--color-graphite)',
              transition: 'all 0.15s ease'
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Meme Grid */}
      <div 
        style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fill, minmax(290px, 1fr))', 
          gap: '24px' 
        }}
      >
        {filteredMemes.map((meme) => (
          <div
            key={meme.id}
            className="glass-evidence"
            style={{
              borderRadius: '22px',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              background: 'rgba(255, 255, 255, 0.88)',
              border: '1px solid var(--color-subtle-border)',
              boxShadow: 'var(--shadow-glass)',
              transition: 'transform 0.25s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.25s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-4px)';
              e.currentTarget.style.boxShadow = 'var(--shadow-floating)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'var(--shadow-glass)';
            }}
          >
            {/* Real Meme Image Header */}
            <div 
              style={{ 
                position: 'relative', 
                backgroundColor: '#1E1E1E', 
                height: '240px', 
                overflow: 'hidden',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer'
              }}
              onClick={() => setSelectedMemeModal(meme)}
            >
              <img 
                src={meme.image} 
                alt={meme.title}
                loading="lazy"
                style={{ 
                  width: '100%', 
                  height: '100%', 
                  objectFit: 'contain',
                  transition: 'transform 0.3s ease'
                }}
              />
              <div 
                style={{ 
                  position: 'absolute', 
                  top: '12px', 
                  left: '12px', 
                  display: 'flex', 
                  gap: '6px' 
                }}
              >
                <span className="chip chip-graphite" style={{ fontSize: '0.68rem', backgroundColor: 'rgba(32, 33, 31, 0.75)', color: '#FFF' }}>
                  {meme.badge}
                </span>
              </div>
            </div>

            {/* Meme Content Body */}
            <div style={{ padding: '22px', display: 'flex', flexDirection: 'column', flex: 1, gap: '12px' }}>
              <div>
                <span style={{ fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--color-indigo)' }}>
                  {meme.category}
                </span>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--color-graphite)', marginTop: '2px' }}>
                  {meme.title}
                </h3>
              </div>

              <p style={{ fontSize: '0.88rem', color: 'var(--color-muted-slate)', lineHeight: 1.45 }}>
                {meme.description}
              </p>

              {/* Meme Dialogue / Bullets Preview */}
              {meme.dialogue && (
                <div style={{ background: '#FAF8F5', borderRadius: '12px', padding: '12px', border: '1px solid var(--color-subtle-border)', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  {meme.dialogue.slice(0, 2).map((d, i) => (
                    <div key={i} style={{ fontSize: '0.82rem', color: 'var(--color-graphite)' }}>
                      <strong style={{ color: 'var(--color-indigo)' }}>{d.level}:</strong> {d.text}
                    </div>
                  ))}
                  {meme.dialogue.length > 2 && (
                    <span style={{ fontSize: '0.75rem', color: 'var(--color-muted-slate)', fontStyle: 'italic' }}>
                      + {meme.dialogue.length - 2} more escalations...
                    </span>
                  )}
                </div>
              )}

              {/* Button A / B for Two Buttons / Exit Ramp */}
              {meme.buttonA && (
                <div style={{ background: '#FAF8F5', borderRadius: '12px', padding: '12px', border: '1px solid var(--color-subtle-border)', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <div style={{ fontSize: '0.8rem', color: '#2E7D32' }}>
                    <strong>Option A:</strong> {meme.buttonA}
                  </div>
                  <div style={{ fontSize: '0.8rem', color: '#D93838' }}>
                    <strong>Option B:</strong> {meme.buttonB}
                  </div>
                </div>
              )}

              {/* Card Footer Actions */}
              <div style={{ marginTop: 'auto', paddingTop: '14px', borderTop: '1px solid var(--color-subtle-border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '10px' }}>
                <button
                  onClick={() => setSelectedMemeModal(meme)}
                  className="btn-ghost"
                  style={{ fontSize: '0.82rem', padding: '6px 12px' }}
                >
                  Inspect Meme
                </button>
                <button
                  onClick={() => handleTestInCourt(meme)}
                  className="btn-primary"
                  style={{ fontSize: '0.82rem', padding: '8px 16px' }}
                >
                  <Scale size={14} />
                  <span>Try In Court</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* MODAL INSPECTION */}
      {selectedMemeModal && (
        <div 
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 1000,
            backgroundColor: 'rgba(32, 33, 31, 0.75)',
            backdropFilter: 'blur(8px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '24px'
          }}
          onClick={() => setSelectedMemeModal(null)}
        >
          <div 
            className="glass-evidence"
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '24px',
              maxWidth: '680px',
              width: '100%',
              maxHeight: '90vh',
              overflowY: 'auto',
              padding: '32px',
              display: 'flex',
              flexDirection: 'column',
              gap: '20px'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <span className="chip chip-amber">{selectedMemeModal.badge}</span>
                <h3 style={{ fontSize: '1.5rem', fontWeight: 800, marginTop: '6px' }}>
                  {selectedMemeModal.title}
                </h3>
              </div>
              <button 
                onClick={() => setSelectedMemeModal(null)}
                className="btn-ghost"
                style={{ fontSize: '1.2rem', padding: '6px 12px' }}
              >
                ✕
              </button>
            </div>

            {/* Meme Large View */}
            <div style={{ backgroundColor: '#111', borderRadius: '16px', overflow: 'hidden', textAlign: 'center', maxHeight: '380px' }}>
              <img 
                src={selectedMemeModal.image} 
                alt={selectedMemeModal.title} 
                style={{ maxHeight: '380px', width: '100%', objectFit: 'contain' }}
              />
            </div>

            <p style={{ fontSize: '0.98rem', color: 'var(--color-graphite)', lineHeight: 1.55 }}>
              {selectedMemeModal.description}
            </p>

            <div style={{ background: '#FAF8F5', borderRadius: '14px', padding: '16px', border: '1px solid var(--color-subtle-border)' }}>
              <span style={{ fontSize: '0.78rem', textTransform: 'uppercase', fontWeight: 700, color: 'var(--color-indigo)' }}>
                Official Project Overthink Case Preset:
              </span>
              <div style={{ fontSize: '1.15rem', fontWeight: 700, margin: '6px 0', color: 'var(--color-graphite)' }}>
                "{selectedMemeModal.presetMessage}"
              </div>
              <div style={{ fontSize: '0.88rem', color: 'var(--color-muted-slate)' }}>
                Context: {selectedMemeModal.presetContext}
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
              <button 
                onClick={() => setSelectedMemeModal(null)} 
                className="btn-ghost"
              >
                Close
              </button>
              <button 
                onClick={() => {
                  setSelectedMemeModal(null);
                  handleTestInCourt(selectedMemeModal);
                }} 
                className="btn-indigo"
              >
                <Scale size={16} />
                <span>Examine In Courtroom Now</span>
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
