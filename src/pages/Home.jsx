import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowRight,
  Sparkles,
  Scale,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Eye,
  RefreshCw,
  Flame,
  Laugh,
  ChevronDown
} from 'lucide-react';
import { useCase } from '../context/CaseContext';
import {
  MagnifyingGlassDoodle,
  DetectiveStickFigure,
  GavelJudgeDoodle,
  DetectiveBoardDoodle,
  ChaoticBrainDoodle,
  EvidenceTagDoodle,
  NightOwlDoodle,
  ThoughtSpiralAnimation
} from '../components/doodles/CourtroomDoodles';
import MemeEvidenceVault from '../components/memes/MemeEvidenceVault';
import BuildingDirectory from '../components/common/BuildingDirectory';

const SAMPLE_MESSAGES = [
  {
    text: "They replied: Okay.",
    context: "Sent 3 paragraphs about dinner. They replied with one word and a period.",
    sampleCategory: "Single-Word Reply"
  },
  {
    text: "Sounds good.",
    context: "No exclamation mark. Was it genuine enthusiasm or weary resignation?",
    sampleCategory: "The Punctuation Void"
  },
  {
    text: "Read at 2:14 PM (Now 6:45 PM)",
    context: "They posted an Instagram story 12 minutes ago.",
    sampleCategory: "The Read Receipt Audit"
  },
  {
    text: "Can we talk tomorrow morning?",
    context: "Sent by manager at 5:02 PM on a Thursday without an agenda.",
    sampleCategory: "The Ambiguous Summons"
  }
];

export default function Home() {
  const navigate = useNavigate();
  const { analyzeMessage, isAnalyzing, setCurrentCase } = useCase();

  const [selectedSampleIndex, setSelectedSampleIndex] = useState(0);
  const [customInput, setCustomInput] = useState('');
  const [customContext, setCustomContext] = useState('');
  const [homeError, setHomeError] = useState('');

  const activeSample = SAMPLE_MESSAGES[selectedSampleIndex];

  const handleInvestigateSample = async (sample) => {
    try {
      setHomeError('');
      const analyzed = await analyzeMessage(sample.text, sample.context, 'balanced');
      navigate('/decode');
    } catch (err) {
      setHomeError('Investigation could not be initialized. Please try again.');
    }
  };

  const handleCustomSubmit = async (e) => {
    e.preventDefault();
    if (!customInput.trim()) {
      setHomeError('Please enter a message your brain has been turning over.');
      return;
    }
    try {
      setHomeError('');
      await analyzeMessage(customInput.trim(), customContext.trim(), 'balanced');
      navigate('/decode');
    } catch (err) {
      setHomeError('Failed to analyze message. Please try again.');
    }
  };

  const scrollToMemes = () => {
    const el = document.getElementById('memes-vault-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToNarrative = () => {
    const el = document.getElementById('narrative-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '90px', paddingBottom: '90px' }}>

      {/* 1. OPENING HERO VIEWPORT */}
      <section
        style={{
          minHeight: 'calc(85vh - var(--nav-height))',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
          padding: '40px 24px 20px',
          position: 'relative'
        }}
      >
        <BuildingDirectory currentDepartment="lobby" />

        <div className="container-narrow" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

          {/* Eyebrow Chip */}
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '24px' }}>
            <span className="chip chip-lavender">
              <Sparkles size={13} />
              <span>Psychological De-escalation Engine</span>
            </span>
            <span style={{ fontSize: '0.8rem', color: 'var(--color-muted-slate)', fontWeight: 600 }}>
              Apple-grade restraint • Real viral internet memes
            </span>
          </div>

          {/* Main Headline */}
          <h1
            style={{
              fontSize: 'clamp(2.6rem, 5.5vw, 4.4rem)',
              fontWeight: 800,
              letterSpacing: '-0.03em',
              lineHeight: 1.08,
              color: 'var(--color-graphite)',
              marginBottom: '20px',
              maxWidth: '820px'
            }}
          >
            What are we overthinking today?
          </h1>

          {/* Supporting Copy */}
          <p
            style={{
              fontSize: 'clamp(1.1rem, 2vw, 1.35rem)',
              color: 'var(--color-muted-slate)',
              lineHeight: 1.5,
              maxWidth: '640px',
              marginBottom: '36px'
            }}
          >
            Bring us the message your brain refuses to leave alone. We’ll cross-examine the facts, dismiss the fan fiction, and deliver an evidence-based verdict.
          </p>

          {/* Primary & Secondary Actions */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '14px', justifyContent: 'center', marginBottom: '46px' }}>
            <button
              onClick={() => navigate('/investigate')}
              className="btn-primary"
              style={{ padding: '14px 28px', fontSize: '1.02rem' }}
            >
              <span>Start an Investigation</span>
              <ArrowRight size={17} />
            </button>
            <button
              onClick={scrollToMemes}
              className="btn-secondary"
              style={{ padding: '14px 26px', fontSize: '1.02rem' }}
            >
              <Flame size={16} color="#DCA96B" />
              <span>Explore Internet Memes</span>
            </button>
          </div>

          {/* Interactive Sample Message Card */}
          <div
            className="glass-evidence"
            style={{
              width: '100%',
              maxWidth: '740px',
              borderRadius: '24px',
              padding: '28px',
              position: 'relative',
              textAlign: 'left'
            }}
          >
            <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '12px', marginBottom: '18px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <EvidenceTagDoodle label="EXHIBIT 1" />
                <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-muted-slate)' }}>
                  Interactive Case Preset
                </span>
              </div>
              <div style={{ display: 'flex', gap: '6px' }}>
                {SAMPLE_MESSAGES.map((s, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedSampleIndex(idx)}
                    style={{
                      padding: '4px 10px',
                      borderRadius: 'var(--radius-full)',
                      border: '1px solid',
                      borderColor: selectedSampleIndex === idx ? 'var(--color-graphite)' : 'var(--color-subtle-border)',
                      backgroundColor: selectedSampleIndex === idx ? 'var(--color-graphite)' : 'transparent',
                      color: selectedSampleIndex === idx ? '#FFF' : 'var(--color-muted-slate)',
                      fontSize: '0.74rem',
                      fontWeight: 600,
                      cursor: 'pointer',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    Preset {idx + 1}
                  </button>
                ))}
              </div>
            </div>

            {/* Message Bubble & Context */}
            <div
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '16px',
                border: '1px solid var(--color-subtle-border)',
                padding: '20px 24px',
                marginBottom: '16px',
                boxShadow: 'var(--shadow-subtle)'
              }}
            >
              <div style={{ fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--color-indigo)', fontWeight: 700, marginBottom: '6px' }}>
                {activeSample.sampleCategory}
              </div>
              <div style={{ fontSize: '1.45rem', fontWeight: 700, color: 'var(--color-graphite)', marginBottom: '8px' }}>
                "{activeSample.text}"
              </div>
              <div style={{ fontSize: '0.9rem', color: 'var(--color-muted-slate)' }}>
                <strong>Reported Context:</strong> {activeSample.context}
              </div>
            </div>

            {/* Quick Action & Doodles */}
            <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '16px' }}>
              <MagnifyingGlassDoodle note="Interesting. Or completely normal." />
              <button
                onClick={() => handleInvestigateSample(activeSample)}
                disabled={isAnalyzing}
                className="btn-indigo"
                style={{ padding: '10px 22px', fontSize: '0.92rem' }}
              >
                {isAnalyzing ? (
                  <>
                    <RefreshCw size={15} className="animate-spin" />
                    <span>Cross-Examining...</span>
                  </>
                ) : (
                  <>
                    <span>Deconstruct This Message</span>
                    <ArrowRight size={15} />
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Interactive "Descend into Overthinking" Scroll Down Invitation */}
          <div
            onClick={scrollToMemes}
            className="scroll-invitation-container"
            style={{
              marginTop: '52px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '12px',
              cursor: 'pointer',
              userSelect: 'none'
            }}
            title="Descend into the Evidence Locker"
          >
            <div className="scroll-pill-badge">
              <span className="pulsing-radar-dot" />
              <span style={{ fontSize: '0.80rem', fontWeight: 700, letterSpacing: '0.04em', textTransform: 'uppercase' }}>
                Scroll down into Evidence Locker
              </span>
              <ChevronDown size={14} className="bounce-arrow" />
            </div>

            <div className="scroll-mouse-indicator">
              <div className="scroll-wheel-dot" />
            </div>
          </div>

        </div>
      </section>

      {/* 2. REAL INTERNET MEMES SECTION (NEW FEATURED EXPERIENCE) */}
      <section id="memes-vault-section" className="container-wide">
        <MemeEvidenceVault />
      </section>

      {/* 3. SCROLL NARRATIVE SECTION */}
      <div id="narrative-section" style={{ display: 'flex', flexDirection: 'column', gap: '90px' }}>

        {/* SECTION A — THE MESSAGE */}
        <section className="container-wide">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '40px', alignItems: 'center' }}>
            <div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                <span className="chip chip-graphite">Section A</span>
                <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-muted-slate)' }}>The Raw Transmission</span>
              </div>
              <h2 style={{ fontSize: 'clamp(2rem, 3.5vw, 2.8rem)', fontWeight: 800, lineHeight: 1.15, marginBottom: '18px', color: 'var(--color-graphite)' }}>
                One message. Innocent on paper, catastrophic in the mind.
              </h2>
              <p style={{ fontSize: '1.05rem', color: 'var(--color-muted-slate)', lineHeight: 1.6, marginBottom: '24px' }}>
                When someone texts "Okay.", your brain does not see four letters and a full stop. It sees a five-act tragedy involving emotional withdrawal, severed ties, and quiet resentment.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.92rem' }}>
                  <CheckCircle2 size={18} color="#5966E8" />
                  <span>We isolate exactly what was typed without emotional projection.</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.92rem' }}>
                  <CheckCircle2 size={18} color="#5966E8" />
                  <span>We verify character counts, punctuation anomalies, and verifiable facts.</span>
                </div>
              </div>
            </div>

            {/* Exhibit Card with Night Owl Doodle */}
            <div className="glass-evidence" style={{ borderRadius: '24px', padding: '32px', position: 'relative' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px' }}>
                <EvidenceTagDoodle label="EXHIBIT A" />
                <span className="chip chip-amber">Subject Under Review</span>
              </div>
              <div style={{ background: '#FFF', borderRadius: '14px', padding: '24px', border: '1px solid var(--color-subtle-border)', marginBottom: '20px' }}>
                <div style={{ fontSize: '1.8rem', fontWeight: 700, color: 'var(--color-graphite)', marginBottom: '6px' }}>
                  "Okay."
                </div>
                <div style={{ fontSize: '0.85rem', color: 'var(--color-muted-slate)' }}>
                  Sent at 4:12 PM • 4 letters • 1 period • 0 emojis
                </div>
              </div>
              <NightOwlDoodle />
            </div>
          </div>
        </section>

        {/* SECTION B — THE POSSIBILITIES */}
        <section className="container-wide">
          <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 48px' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
              <span className="chip chip-lavender">Section B</span>
              <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-muted-slate)' }}>The Interpretation Spectrum</span>
            </div>
            <h2 style={{ fontSize: 'clamp(2rem, 3.5vw, 2.8rem)', fontWeight: 800, lineHeight: 1.15, marginBottom: '16px', color: 'var(--color-graphite)' }}>
              Five plausible readings. Zero crystal balls.
            </h2>
            <p style={{ fontSize: '1.05rem', color: 'var(--color-muted-slate)', lineHeight: 1.6 }}>
              We do not pretend to know what they are thinking. Instead, we lay out the five distinct lenses through which human communication actually occurs.
            </p>
          </div>

          {/* 5 Lens Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px' }}>
            {[
              {
                type: "Optimistic",
                title: "Maximum Trust",
                desc: "They trust the plan completely and see no need for superficial exclamation marks.",
                badge: "Plausibility: High",
                color: "#5966E8"
              },
              {
                type: "Neutral",
                title: "Standard Transit",
                desc: "They typed with one thumb while waiting for a traffic light to turn green.",
                badge: "Plausibility: Very High",
                color: "#20211F"
              },
              {
                type: "Pessimistic",
                title: "The Anxiety Special",
                desc: "The period is a deliberate stone wall erected to communicate frosty displeasure.",
                badge: "Plausibility: Low",
                color: "#E65353"
              },
              {
                type: "Unexpected",
                title: "The Cat Factor",
                desc: "Their pet jumped onto their phone screen and accidentally tapped send.",
                badge: "Plausibility: Moderate",
                color: "#DCA96B"
              },
              {
                type: "Evidence-Based",
                title: "The Honest Boundary",
                desc: "The message proves only receipt. Inferring emotional hostility is unsupported.",
                badge: "Empirical Truth",
                color: "#5966E8"
              }
            ].map((lens, i) => (
              <div
                key={i}
                className="glass-evidence"
                style={{
                  borderRadius: '18px',
                  padding: '24px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px',
                  transition: 'transform 0.2s ease',
                  borderTop: `3px solid ${lens.color}`
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.78rem', fontWeight: 700, textTransform: 'uppercase', color: lens.color }}>
                    {lens.type}
                  </span>
                  <span style={{ fontSize: '0.72rem', color: 'var(--color-muted-slate)', fontWeight: 600 }}>
                    {lens.badge}
                  </span>
                </div>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--color-graphite)' }}>
                  {lens.title}
                </h3>
                <p style={{ fontSize: '0.88rem', color: 'var(--color-muted-slate)', lineHeight: 1.5 }}>
                  {lens.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION C — THE COURTROOM */}
        <section className="container-wide">
          <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 48px' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
              <span className="chip chip-amber">Section C</span>
              <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-muted-slate)' }}>Signature Forensic Arena</span>
            </div>
            <h2 style={{ fontSize: 'clamp(2rem, 3.5vw, 2.8rem)', fontWeight: 800, lineHeight: 1.15, marginBottom: '16px', color: 'var(--color-graphite)' }}>
              The People vs. Your Overthinking.
            </h2>
            <p style={{ fontSize: '1.05rem', color: 'var(--color-muted-slate)', lineHeight: 1.6 }}>
              A high-stakes courtroom trial where Prosecution represents your worst fears, Defence represents reality, and the Judge delivers an evidence-based verdict.
            </p>
          </div>

          {/* Interactive Thought Spiral Showcase */}
          <ThoughtSpiralAnimation />

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px', marginTop: '36px' }}>
            {/* Stage 1: Prosecution */}
            <div className="glass-evidence" style={{ borderRadius: '20px', padding: '24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
                <span className="chip chip-graphite">Stage 1: Prosecution</span>
                <DetectiveStickFigure note="Potentially suspicious." />
              </div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '8px' }}>Presents The Paranoia</h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--color-muted-slate)', lineHeight: 1.5 }}>
                Takes every missing vowel, period, and minute of delay and weaves it into an airtight indictment of catastrophe.
              </p>
            </div>

            {/* Stage 2: Defence */}
            <div className="glass-evidence" style={{ borderRadius: '20px', padding: '24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
                <span className="chip chip-lavender">Stage 2: Defence</span>
                <span style={{ fontFamily: 'var(--font-doodle)', fontSize: '1.15rem', color: 'var(--color-indigo)' }}>
                  "Counterpoint: people have lives."
                </span>
              </div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '8px' }}>Challenges Speculation</h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--color-muted-slate)', lineHeight: 1.5 }}>
                Points out that silence is usually laundry, traffic, or battery drainage — not a calculated emotional ambush.
              </p>
            </div>

            {/* Stage 3: Judge */}
            <div className="surface-verdict" style={{ borderRadius: '20px', padding: '24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
                <span className="verdict-stamp" style={{ fontSize: '0.75rem', padding: '4px 10px' }}>Final Verdict</span>
                <GavelJudgeDoodle note="" />
              </div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '8px', color: '#FFF' }}>NOT ENOUGH EVIDENCE</h3>
              <p style={{ fontSize: '0.9rem', color: 'rgba(243, 241, 236, 0.85)', lineHeight: 1.5 }}>
                "The court recognises your imagination. It does not recognise it as a witness."
              </p>
            </div>
          </div>
        </section>

        {/* SECTION D — REALITY CHECK */}
        <section className="container-wide">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '40px', alignItems: 'center' }}>
            <DetectiveBoardDoodle />

            <div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                <span className="chip chip-graphite">Section D</span>
                <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-muted-slate)' }}>The Reality Check</span>
              </div>
              <h2 style={{ fontSize: 'clamp(2rem, 3.5vw, 2.8rem)', fontWeight: 800, lineHeight: 1.15, marginBottom: '18px', color: 'var(--color-graphite)' }}>
                Separate what happened from what your brain added.
              </h2>
              <p style={{ fontSize: '1.05rem', color: 'var(--color-muted-slate)', lineHeight: 1.6, marginBottom: '24px' }}>
                Overthinking is merely the conflation of unknown variables with hostile intent. The Reality Check tool breaks your situation into four discrete, manageable buckets:
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div style={{ background: 'rgba(255, 255, 255, 0.75)', padding: '14px', borderRadius: '12px', border: '1px solid var(--color-subtle-border)' }}>
                  <div style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--color-indigo)' }}>1. Facts</div>
                  <div style={{ fontSize: '0.82rem', color: 'var(--color-muted-slate)' }}>Only what was provably transmitted.</div>
                </div>
                <div style={{ background: 'rgba(255, 255, 255, 0.75)', padding: '14px', borderRadius: '12px', border: '1px solid var(--color-subtle-border)' }}>
                  <div style={{ fontWeight: 700, fontSize: '0.9rem', color: '#DCA96B' }}>2. Assumptions</div>
                  <div style={{ fontSize: '0.82rem', color: 'var(--color-muted-slate)' }}>What anxiety invented on the spot.</div>
                </div>
                <div style={{ background: 'rgba(255, 255, 255, 0.75)', padding: '14px', borderRadius: '12px', border: '1px solid var(--color-subtle-border)' }}>
                  <div style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--color-graphite)' }}>3. Unknowns</div>
                  <div style={{ fontSize: '0.82rem', color: 'var(--color-muted-slate)' }}>Things you literally cannot know.</div>
                </div>
                <div style={{ background: 'rgba(255, 255, 255, 0.75)', padding: '14px', borderRadius: '12px', border: '1px solid var(--color-subtle-border)' }}>
                  <div style={{ fontWeight: 700, fontSize: '0.9rem', color: '#2E7D32' }}>4. Next Step</div>
                  <div style={{ fontSize: '0.82rem', color: 'var(--color-muted-slate)' }}>A calm, proportionate non-reaction.</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION E — TRY IT YOURSELF (LIVE WORKBENCH) */}
        <section className="container-narrow">
          <div
            className="glass-evidence"
            style={{
              borderRadius: '28px',
              padding: '40px',
              border: '1px solid var(--color-subtle-border)',
              background: 'rgba(255, 255, 255, 0.88)'
            }}
          >
            <div style={{ textAlign: 'center', marginBottom: '32px' }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                <span className="chip chip-lavender">Section E</span>
                <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-muted-slate)' }}>Live Forensic Intake</span>
              </div>
              <h2 style={{ fontSize: '2.2rem', fontWeight: 800, color: 'var(--color-graphite)', marginBottom: '10px' }}>
                Try It Yourself Right Now
              </h2>
              <p style={{ color: 'var(--color-muted-slate)', fontSize: '1rem' }}>
                Paste the exact text that is living rent-free in your mind.
              </p>
            </div>

            <form onSubmit={handleCustomSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div>
                <label style={{ display: 'block', fontWeight: 600, fontSize: '0.9rem', marginBottom: '8px', color: 'var(--color-graphite)' }}>
                  The Message Exhibit <span style={{ color: '#E65353' }}>*</span>
                </label>
                <textarea
                  rows={3}
                  value={customInput}
                  onChange={(e) => setCustomInput(e.target.value)}
                  placeholder="e.g. They replied: 'Sure, whenever' after 4 hours of silence..."
                  style={{ width: '100%', resize: 'vertical' }}
                  required
                />
              </div>

              <div>
                <label style={{ display: 'block', fontWeight: 600, fontSize: '0.9rem', marginBottom: '8px', color: 'var(--color-graphite)' }}>
                  Optional Context (What is your brain whispering?)
                </label>
                <input
                  type="text"
                  value={customContext}
                  onChange={(e) => setCustomContext(e.target.value)}
                  placeholder="e.g. We usually use emojis, and I asked if they wanted to get dinner."
                  style={{ width: '100%' }}
                />
              </div>

              {homeError && (
                <div style={{ color: '#D93838', fontSize: '0.88rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <AlertCircle size={16} />
                  <span>{homeError}</span>
                </div>
              )}

              <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '16px', paddingTop: '8px' }}>
                <span style={{ fontSize: '0.82rem', color: 'var(--color-muted-slate)' }}>
                  No account required • Instant judicial assessment
                </span>
                <button
                  type="submit"
                  disabled={isAnalyzing}
                  className="btn-primary"
                  style={{ padding: '14px 32px', fontSize: '1rem' }}
                >
                  {isAnalyzing ? 'Conducting Investigation...' : 'Commence Investigation'}
                  <ArrowRight size={16} />
                </button>
              </div>
            </form>
          </div>
        </section>

        {/* SECTION F — CLOSING STATEMENT */}
        <section
          style={{
            textAlign: 'center',
            padding: '40px 24px',
            maxWidth: '740px',
            margin: '0 auto'
          }}
        >
          <ChaoticBrainDoodle className="mb-4" />
          <h2 style={{ fontSize: 'clamp(2.4rem, 4.5vw, 3.4rem)', fontWeight: 800, letterSpacing: '-0.02em', color: 'var(--color-graphite)', marginBottom: '16px' }}>
            Your brain can clock out now.
          </h2>
          <p style={{ fontSize: '1.25rem', color: 'var(--color-muted-slate)', lineHeight: 1.5, marginBottom: '14px' }}>
            Let the AI do the overthinking. You keep your mind fresh.
          </p>
          <div style={{ fontFamily: 'var(--font-doodle)', fontSize: '1.5rem', color: '#DCA96B', marginBottom: '32px' }}>
            "Serious investigations. Silly conclusions."
          </div>
          <button
            onClick={() => navigate('/investigate')}
            className="btn-indigo"
            style={{ padding: '14px 32px', fontSize: '1.05rem' }}
          >
            Start An Investigation
            <ArrowRight size={17} />
          </button>
        </section>

      </div>
    </div>
  );
}
