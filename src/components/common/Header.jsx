import React, { useState, useEffect } from 'react';
import { NavLink, useLocation, useNavigate, Link } from 'react-router-dom';
import { Menu, X, ArrowRight, Scale } from 'lucide-react';
import { useCase } from '../../context/CaseContext';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { currentCase } = useCase();

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { to: '/', label: 'Lobby' },
    { to: '/investigate', label: 'Reception' },
    { to: '/cases', label: 'Archives' },
    { to: '/about', label: 'About' },
  ];

  return (
    <div 
      style={{
        position: 'relative',
        zIndex: 100,
        width: '100%',
        padding: '16px 16px 0'
      }}
    >
      <header 
        style={{ 
          maxWidth: '1040px',
          margin: '0 auto',
          height: '54px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 10px 0 16px',
          borderRadius: '9999px',
          background: 'rgba(255, 255, 255, 0.90)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: '1px solid rgba(32, 33, 31, 0.08)',
          boxShadow: '0 4px 20px -2px rgba(32, 33, 31, 0.05)',
          transition: 'all 0.25s ease'
        }}
      >
        {/* Left: Minimal Elegant Logo */}
        <Link 
          to="/" 
          style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '10px', 
            textDecoration: 'none',
            color: 'var(--color-graphite)'
          }}
          aria-label="PROJECT OVERTHINK"
        >
          {/* Compact spiral mark */}
          <svg 
            width={24} 
            height={24} 
            viewBox="0 0 64 64" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
            style={{ flexShrink: 0 }}
          >
            <circle cx="32" cy="32" r="30" fill="#FAF8F5" stroke="#20211F" strokeWidth="1.2" strokeOpacity="0.12"/>
            <path 
              d="M 32 10 A 22 22 0 1 1 12 36" 
              stroke="#20211F" 
              strokeWidth="4.5" 
              strokeLinecap="round"
            />
            <path 
              d="M 12 36 C 12 28 22 18 36 18" 
              stroke="#5966E8" 
              strokeWidth="4.5" 
              strokeLinecap="round"
            />
            <circle cx="36" cy="18" r="4.5" fill="#5966E8" />
            <circle cx="48" cy="42" r="3.2" fill="#DCA96B" />
          </svg>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ 
              fontWeight: 800, 
              fontSize: '0.90rem', 
              letterSpacing: '-0.01em',
              color: 'var(--color-graphite)',
              whiteSpace: 'nowrap'
            }}>
              PROJECT OVERTHINK
            </span>
            <span 
              className="badge-dept"
              style={{
                fontSize: '0.65rem',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.06em',
                padding: '2px 7px',
                borderRadius: '9999px',
                backgroundColor: 'rgba(32, 33, 31, 0.05)',
                color: 'var(--color-muted-slate)'
              }}
            >
              Dept.
            </span>
          </div>
        </Link>

        {/* Center: Clean & Understated Navigation */}
        <nav 
          className="desktop-nav"
          style={{ 
            display: 'none', 
            alignItems: 'center', 
            gap: '2px'
          }}
        >
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              style={({ isActive }) => ({
                display: 'inline-flex',
                alignItems: 'center',
                padding: '6px 14px',
                borderRadius: '9999px',
                fontSize: '0.84rem',
                fontWeight: isActive ? 700 : 500,
                color: isActive ? 'var(--color-graphite)' : 'var(--color-muted-slate)',
                backgroundColor: isActive ? 'rgba(32, 33, 31, 0.06)' : 'transparent',
                textDecoration: 'none',
                transition: 'all 0.16s ease'
              })}
            >
              {link.label}
            </NavLink>
          ))}

          {/* Active Case indicator link if case exists */}
          {currentCase && (
            <NavLink
              to="/courtroom"
              style={({ isActive }) => ({
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '5px 12px',
                marginLeft: '6px',
                borderRadius: '9999px',
                fontSize: '0.8rem',
                fontWeight: 600,
                color: 'var(--color-indigo)',
                backgroundColor: isActive ? 'rgba(89, 102, 232, 0.14)' : 'rgba(89, 102, 232, 0.08)',
                border: '1px solid rgba(89, 102, 232, 0.22)',
                textDecoration: 'none'
              })}
              title="Return to Trial in session"
            >
              <span 
                style={{ 
                  width: '6px', 
                  height: '6px', 
                  borderRadius: '50%', 
                  backgroundColor: 'var(--color-indigo)', 
                  display: 'inline-block',
                  animation: 'pulse 2s infinite' 
                }} 
              />
              <span>Trial Active</span>
            </NavLink>
          )}
        </nav>

        {/* Right Action */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <button
            onClick={() => navigate('/investigate')}
            style={{ 
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '7px 15px',
              fontSize: '0.82rem',
              fontWeight: 600,
              borderRadius: '9999px',
              backgroundColor: 'var(--color-graphite)',
              color: 'var(--color-porcelain)',
              border: 'none',
              cursor: 'pointer',
              transition: 'transform 0.15s ease, opacity 0.15s ease'
            }}
            onMouseEnter={e => e.currentTarget.style.opacity = '0.92'}
            onMouseLeave={e => e.currentTarget.style.opacity = '1'}
          >
            <span>Investigate</span>
            <ArrowRight size={13} />
          </button>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(prev => !prev)}
            aria-label="Toggle navigation menu"
            className="mobile-burger-btn"
            style={{ 
              display: 'none', 
              padding: '6px', 
              borderRadius: '8px',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: 'var(--color-graphite)'
            }}
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer Navigation Card */}
      {mobileMenuOpen && (
        <div 
          style={{
            maxWidth: '1040px',
            margin: '8px auto 0',
            background: 'rgba(255, 255, 255, 0.96)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: '1px solid rgba(32, 33, 31, 0.08)',
            borderRadius: '20px',
            padding: '14px',
            boxShadow: '0 16px 36px -8px rgba(32, 33, 31, 0.12)',
            display: 'flex',
            flexDirection: 'column',
            gap: '6px',
            pointerEvents: 'auto'
          }}
        >
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              onClick={() => setMobileMenuOpen(false)}
              style={({ isActive }) => ({
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '10px 14px',
                borderRadius: '12px',
                fontSize: '0.92rem',
                fontWeight: isActive ? 700 : 500,
                color: 'var(--color-graphite)',
                backgroundColor: isActive ? 'rgba(32, 33, 31, 0.06)' : 'transparent',
                textDecoration: 'none'
              })}
            >
              <span>{link.label}</span>
              <ArrowRight size={14} style={{ opacity: 0.4 }} />
            </NavLink>
          ))}

          {currentCase && (
            <NavLink
              to="/courtroom"
              onClick={() => setMobileMenuOpen(false)}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '10px 14px',
                borderRadius: '12px',
                fontSize: '0.92rem',
                fontWeight: 600,
                color: 'var(--color-indigo)',
                backgroundColor: 'rgba(89, 102, 232, 0.08)',
                textDecoration: 'none'
              }}
            >
              <span>Trial in Session</span>
              <Scale size={16} />
            </NavLink>
          )}

          <div style={{ marginTop: '8px', paddingTop: '8px', borderTop: '1px solid rgba(32, 33, 31, 0.06)' }}>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                navigate('/investigate');
              }}
              style={{ 
                width: '100%', 
                justifyContent: 'center',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '10px',
                borderRadius: '9999px',
                backgroundColor: 'var(--color-graphite)',
                color: 'var(--color-porcelain)',
                fontWeight: 600,
                border: 'none',
                cursor: 'pointer'
              }}
            >
              <span>Start an Investigation</span>
              <ArrowRight size={14} />
            </button>
          </div>
        </div>
      )}

      {/* Media query helper styling */}
      <style>{`
        @media (min-width: 768px) {
          .desktop-nav { display: flex !important; }
          .mobile-burger-btn { display: none !important; }
        }
        @media (max-width: 767px) {
          .desktop-nav { display: none !important; }
          .mobile-burger-btn { display: inline-flex !important; }
          .badge-dept { display: none !important; }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.4; transform: scale(0.85); }
        }
      `}</style>
    </div>
  );
}
