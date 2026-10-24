import React from 'react';
import { Link } from 'react-router-dom';

export default function Logo({ size = 'default', showWordmark = true, className = '' }) {
  const isSmall = size === 'small';
  const isLarge = size === 'large';

  const iconDim = isSmall ? 28 : (isLarge ? 48 : 36);

  return (
    <Link 
      to="/" 
      className={`inline-flex items-center gap-3 text-graphite no-underline transition-transform hover:scale-[1.02] active:scale-[0.98] ${className}`}
      style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}
      aria-label="PROJECT OVERTHINK Home"
    >
      {/* Signature interrupted circular thought loop */}
      <svg 
        width={iconDim} 
        height={iconDim} 
        viewBox="0 0 64 64" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        className="flex-shrink-0"
      >
        {/* Subtle backing circle */}
        <circle cx="32" cy="32" r="30" fill="#FAF8F5" stroke="#20211F" strokeWidth="1.2" strokeOpacity="0.12"/>
        {/* Main thought loop arch that spirals around */}
        <path 
          d="M 32 10 A 22 22 0 1 1 12 36" 
          stroke="#20211F" 
          strokeWidth="4.5" 
          strokeLinecap="round"
        />
        {/* The escape tangent: breaking out of the mental loop */}
        <path 
          d="M 12 36 C 12 28 22 18 36 18" 
          stroke="#5966E8" 
          strokeWidth="4.5" 
          strokeLinecap="round"
        />
        {/* Node point */}
        <circle cx="36" cy="18" r="4.5" fill="#5966E8" />
        {/* Tension/evidence spark point */}
        <circle cx="48" cy="42" r="3.2" fill="#DCA96B" />
      </svg>

      {showWordmark && (
        <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.1 }}>
          <span style={{ 
            fontFamily: 'var(--font-sans)', 
            fontWeight: 800, 
            letterSpacing: '0.04em',
            fontSize: isSmall ? '0.9rem' : (isLarge ? '1.35rem' : '1.05rem'),
            color: 'var(--color-graphite)'
          }}>
            PROJECT OVERTHINK
          </span>
          {!isSmall && (
            <span style={{ 
              fontSize: '0.68rem', 
              color: 'var(--color-muted-slate)', 
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              fontWeight: 600,
              marginTop: '2px'
            }}>
              Official Judicial Inquiry
            </span>
          )}
        </div>
      )}
    </Link>
  );
}
