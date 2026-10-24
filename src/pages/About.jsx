import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Sparkles, Scale, Heart, ShieldAlert, CheckCircle2 } from 'lucide-react';
import { ChaoticBrainDoodle, GavelJudgeDoodle } from '../components/doodles/CourtroomDoodles';

export default function About() {
  const navigate = useNavigate();

  return (
    <div className="container-narrow" style={{ padding: '60px 24px 100px' }}>
      
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '56px' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
          <span className="chip chip-lavender">
            <Sparkles size={13} />
            <span>The Project Overthink Manifesto</span>
          </span>
        </div>
        <h1 
          style={{ 
            fontSize: 'clamp(2.5rem, 5vw, 3.8rem)', 
            fontWeight: 800, 
            letterSpacing: '-0.02em', 
            color: 'var(--color-graphite)', 
            marginBottom: '16px',
            lineHeight: 1.12
          }}
        >
          Your thoughts deserve a second opinion.
        </h1>
        <p style={{ fontSize: '1.2rem', color: 'var(--color-muted-slate)', lineHeight: 1.6, maxWidth: '640px', margin: '0 auto' }}>
          PROJECT OVERTHINK exists for anyone who has ever stared at a screen at 1:42 AM dissecting the exact cadence of a four-letter text message.
        </p>
      </div>

      {/* Purpose Description */}
      <div 
        className="glass-evidence" 
        style={{ 
          borderRadius: '24px', 
          padding: '36px', 
          marginBottom: '48px',
          background: 'rgba(255, 255, 255, 0.85)'
        }}
      >
        <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--color-graphite)', marginBottom: '14px' }}>
          Serious investigations. Silly conclusions.
        </h2>
        <p style={{ fontSize: '1.05rem', color: 'var(--color-graphite-soft)', lineHeight: 1.6, marginBottom: '18px' }}>
          Human communication in the digital era is profoundly fragmented. We have stripped away tone of voice, posture, micro-expressions, and breathing room, leaving only raw text bubbles on glass rectangles.
        </p>
        <p style={{ fontSize: '1.05rem', color: 'var(--color-graphite-soft)', lineHeight: 1.6 }}>
          When the signal is minimal, the human brain fills the void with its deepest insecurities. PROJECT OVERTHINK intervenes by externalising that cognitive spiral, turning private paranoia into an objective courtroom trial where facts are separated from fiction.
        </p>
      </div>

      {/* THREE CORE PRINCIPLES */}
      <div style={{ marginBottom: '56px' }}>
        <h2 style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--color-graphite)', marginBottom: '24px', textAlign: 'center' }}>
          Our Three Guiding Principles
        </h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Principle 1 */}
          <div 
            className="glass-evidence"
            style={{
              borderRadius: '20px',
              padding: '28px',
              borderLeft: '4px solid var(--color-indigo)',
              background: 'rgba(255, 255, 255, 0.8)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
              <span className="chip chip-lavender">Principle 1</span>
              <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--color-graphite)' }}>
                Possibilities are not facts.
              </h3>
            </div>
            <p style={{ fontSize: '1rem', color: 'var(--color-muted-slate)', lineHeight: 1.55 }}>
              Just because your mind can vividly imagine a scenario where someone is quietly plotting against you does not mean it exists in physical reality. We treat every negative projection as an unverified hypothesis rather than an established truth.
            </p>
          </div>

          {/* Principle 2 */}
          <div 
            className="glass-evidence"
            style={{
              borderRadius: '20px',
              padding: '28px',
              borderLeft: '4px solid #DCA96B',
              background: 'rgba(255, 255, 255, 0.8)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
              <span className="chip chip-amber">Principle 2</span>
              <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--color-graphite)' }}>
                Humour should challenge overthinking, not shame people.
              </h3>
            </div>
            <p style={{ fontSize: '1rem', color: 'var(--color-muted-slate)', lineHeight: 1.55 }}>
              Everyone overthinks. It is an evolutionary mechanism designed to keep us safe that occasionally misfires on punctuation marks. The comedy here targets the runaway machinery of the mind, never the person holding the phone.
            </p>
          </div>

          {/* Principle 3 */}
          <div 
            className="glass-evidence"
            style={{
              borderRadius: '20px',
              padding: '28px',
              borderLeft: '4px solid #20211F',
              background: 'rgba(255, 255, 255, 0.8)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
              <span className="chip chip-graphite">Principle 3</span>
              <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--color-graphite)' }}>
                Sometimes the most useful answer is that there isn't enough information.
              </h3>
            </div>
            <p style={{ fontSize: '1rem', color: 'var(--color-muted-slate)', lineHeight: 1.55 }}>
              Most AI tools pretend to be omniscient, hallucinating deep emotional motives out of thin air. We refuse to do that. If four letters cannot determine someone's emotional state, we will say so plainly: "NOT ENOUGH EVIDENCE."
            </p>
          </div>
        </div>
      </div>

      {/* CALL TO ACTION */}
      <div 
        style={{
          textAlign: 'center',
          backgroundColor: 'var(--color-graphite)',
          color: 'var(--color-porcelain)',
          borderRadius: '28px',
          padding: '48px 32px',
          boxShadow: 'var(--shadow-floating)'
        }}
      >
        <span style={{ fontFamily: 'var(--font-doodle)', fontSize: '1.4rem', color: '#DCA96B', display: 'block', marginBottom: '10px' }}>
          "Let the AI do the overthinking. You keep your mind fresh."
        </span>
        <h3 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '14px', color: '#FFF' }}>
          Have a situation on your mind?
        </h3>
        <p style={{ fontSize: '1rem', color: 'rgba(243, 241, 236, 0.85)', maxWidth: '520px', margin: '0 auto 28px', lineHeight: 1.5 }}>
          Bring the evidence forward. Let our comedic legal system handle the cognitive load.
        </p>
        <button 
          onClick={() => navigate('/decode')}
          className="btn-indigo"
          style={{ padding: '14px 32px', fontSize: '1.02rem' }}
        >
          <span>Start An Investigation</span>
          <ArrowRight size={17} />
        </button>
      </div>

    </div>
  );
}
