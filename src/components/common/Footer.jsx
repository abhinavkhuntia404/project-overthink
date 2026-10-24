import React from 'react';
import { Link } from 'react-router-dom';
import Logo from './Logo';
import { Shield, Sparkles, Scale, FileText, HelpCircle } from 'lucide-react';

export default function Footer() {
  return (
    <footer 
      style={{
        marginTop: 'auto',
        borderTop: '1px solid var(--color-subtle-border)',
        backgroundColor: 'rgba(243, 241, 236, 0.75)',
        backdropFilter: 'blur(10px)',
        padding: '60px 24px 40px'
      }}
    >
      <div className="container-wide">
        <div 
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '40px',
            marginBottom: '48px'
          }}
        >
          {/* Brand Column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <Logo size="default" />
            <p style={{ fontSize: '0.95rem', color: 'var(--color-muted-slate)', lineHeight: 1.6, maxWidth: '340px' }}>
              One message. A thousand possibilities. Serious investigations. Silly conclusions.
            </p>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
              <span className="chip chip-lavender" style={{ fontSize: '0.75rem' }}>
                <Sparkles size={12} />
                <span>Mind Preservation Initiative</span>
              </span>
            </div>
          </div>

          {/* Core Experiences */}
          <div>
            <h4 style={{ fontSize: '0.82rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--color-graphite)', marginBottom: '16px' }}>
              Forensic Modes
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <li>
                <Link to="/decode" style={{ color: 'var(--color-muted-slate)', textDecoration: 'none', fontSize: '0.92rem', transition: 'color 0.2s' }} onMouseEnter={e => e.target.style.color = 'var(--color-indigo)'} onMouseLeave={e => e.target.style.color = 'var(--color-muted-slate)'}>
                  Decode It (Message Analysis)
                </Link>
              </li>
              <li>
                <Link to="/courtroom" style={{ color: 'var(--color-muted-slate)', textDecoration: 'none', fontSize: '0.92rem', transition: 'color 0.2s' }} onMouseEnter={e => e.target.style.color = 'var(--color-indigo)'} onMouseLeave={e => e.target.style.color = 'var(--color-muted-slate)'}>
                  AI Courtroom & Thought Spiral
                </Link>
              </li>
              <li>
                <Link to="/reality-check" style={{ color: 'var(--color-muted-slate)', textDecoration: 'none', fontSize: '0.92rem', transition: 'color 0.2s' }} onMouseEnter={e => e.target.style.color = 'var(--color-indigo)'} onMouseLeave={e => e.target.style.color = 'var(--color-muted-slate)'}>
                  Reality Check Matrix
                </Link>
              </li>
              <li>
                <Link to="/cases" style={{ color: 'var(--color-muted-slate)', textDecoration: 'none', fontSize: '0.92rem', transition: 'color 0.2s' }} onMouseEnter={e => e.target.style.color = 'var(--color-indigo)'} onMouseLeave={e => e.target.style.color = 'var(--color-muted-slate)'}>
                  Case Files Archive
                </Link>
              </li>
            </ul>
          </div>

          {/* Ethics & Principles */}
          <div>
            <h4 style={{ fontSize: '0.82rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--color-graphite)', marginBottom: '16px' }}>
              Philosophy & Trust
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <li>
                <Link to="/about" style={{ color: 'var(--color-muted-slate)', textDecoration: 'none', fontSize: '0.92rem', transition: 'color 0.2s' }} onMouseEnter={e => e.target.style.color = 'var(--color-indigo)'} onMouseLeave={e => e.target.style.color = 'var(--color-muted-slate)'}>
                  About The Philosophy
                </Link>
              </li>
              <li>
                <Link to="/privacy" style={{ color: 'var(--color-muted-slate)', textDecoration: 'none', fontSize: '0.92rem', transition: 'color 0.2s' }} onMouseEnter={e => e.target.style.color = 'var(--color-indigo)'} onMouseLeave={e => e.target.style.color = 'var(--color-muted-slate)'}>
                  Privacy & Data Handling
                </Link>
              </li>
              <li>
                <span style={{ color: 'var(--color-muted-slate)', fontSize: '0.85rem' }}>
                  No telepathy claimed. Only possibilities.
                </span>
              </li>
            </ul>
          </div>

          {/* Campaign Motto */}
          <div style={{ 
            background: 'rgba(255, 255, 255, 0.65)', 
            border: '1px solid var(--color-subtle-border)',
            borderRadius: '16px',
            padding: '20px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center'
          }}>
            <span style={{ fontFamily: 'var(--font-doodle)', fontSize: '1.25rem', color: '#DCA96B', marginBottom: '8px' }}>
              "Let the AI do the overthinking."
            </span>
            <p style={{ fontSize: '0.88rem', color: 'var(--color-graphite)', lineHeight: 1.5 }}>
              Your brain can clock out now. Explore possibilities without pretending to know what another person is thinking.
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div 
          style={{
            borderTop: '1px solid var(--color-subtle-border)',
            paddingTop: '24px',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '16px',
            fontSize: '0.85rem',
            color: 'var(--color-muted-slate)'
          }}
        >
          <div>
            © {new Date().getFullYear()} PROJECT OVERTHINK. Production prototype for intentional clarity.
          </div>
          <div style={{ display: 'flex', gap: '20px' }}>
            <Link to="/privacy" style={{ color: 'inherit', textDecoration: 'none' }}>Privacy Policy</Link>
            <Link to="/about" style={{ color: 'inherit', textDecoration: 'none' }}>Manifesto</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
