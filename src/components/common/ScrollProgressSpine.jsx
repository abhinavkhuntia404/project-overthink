import React, { useState, useEffect } from 'react';
import { ArrowUp, Compass } from 'lucide-react';

export default function ScrollProgressSpine() {
  const [scrollPercent, setScrollPercent] = useState(0);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [currentSection, setCurrentSection] = useState('Lobby');

  useEffect(() => {
    const handleScroll = () => {
      const winScroll = document.documentElement.scrollTop || document.body.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = height > 0 ? (winScroll / height) * 100 : 0;
      
      setScrollPercent(Math.min(100, Math.max(0, scrolled)));
      setShowBackToTop(winScroll > 600);

      // Detect current active section on the page
      if (scrolled < 15) {
        setCurrentSection('Lobby');
      } else if (scrolled < 38) {
        setCurrentSection('Evidence Vault');
      } else if (scrolled < 65) {
        setCurrentSection('Pinboard & Speculation');
      } else if (scrolled < 85) {
        setCurrentSection('Reality Matrix');
      } else {
        setCurrentSection('Intake Bureau');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* 1. Sleek Top Scroll Beam */}
      <div 
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '3px',
          zIndex: 9999,
          pointerEvents: 'none',
          background: 'rgba(32, 33, 31, 0.04)'
        }}
      >
        <div 
          style={{
            height: '100%',
            width: `${scrollPercent}%`,
            background: 'linear-gradient(90deg, var(--color-indigo) 0%, #7681F0 45%, var(--color-restrained-amber) 85%, #E9EDFF 100%)',
            boxShadow: '0 0 12px rgba(89, 102, 232, 0.65), 0 0 4px rgba(220, 169, 107, 0.4)',
            transition: 'width 0.12s cubic-bezier(0.2, 0.9, 0.3, 1)'
          }}
        />
      </div>

      {/* 2. Floating Case Depth HUD & Back to Top (Visible upon scrolling) */}
      <div 
        style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          zIndex: 900,
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          opacity: showBackToTop ? 1 : 0,
          transform: showBackToTop ? 'translateY(0) scale(1)' : 'translateY(16px) scale(0.92)',
          transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
          pointerEvents: showBackToTop ? 'auto' : 'none'
        }}
      >
        {/* Active Department Pill */}
        <div 
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '7px 14px',
            background: 'rgba(255, 255, 255, 0.90)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            border: '1px solid rgba(32, 33, 31, 0.10)',
            borderRadius: '9999px',
            boxShadow: '0 8px 24px -4px rgba(32, 33, 31, 0.08)',
            fontSize: '0.78rem',
            fontWeight: 700,
            color: 'var(--color-graphite)'
          }}
        >
          <Compass size={13} style={{ color: 'var(--color-indigo)' }} />
          <span style={{ color: 'var(--color-muted-slate)', fontWeight: 500 }}>Depth:</span>
          <span>{Math.round(scrollPercent)}%</span>
          <span style={{ color: 'rgba(32, 33, 31, 0.2)' }}>•</span>
          <span style={{ color: 'var(--color-indigo)' }}>{currentSection}</span>
        </div>

        {/* Smooth Scroll-To-Top Button */}
        <button
          onClick={scrollToTop}
          aria-label="Back to top"
          title="Return to Top of Case"
          style={{
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            backgroundColor: 'var(--color-graphite)',
            color: 'var(--color-porcelain)',
            border: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            boxShadow: '0 10px 24px -4px rgba(32, 33, 31, 0.25)',
            transition: 'transform 0.2s ease, background-color 0.2s ease'
          }}
          onMouseEnter={e => {
            e.currentTarget.style.transform = 'translateY(-3px)';
            e.currentTarget.style.backgroundColor = 'var(--color-indigo)';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.backgroundColor = 'var(--color-graphite)';
          }}
        >
          <ArrowUp size={16} />
        </button>
      </div>
    </>
  );
}
