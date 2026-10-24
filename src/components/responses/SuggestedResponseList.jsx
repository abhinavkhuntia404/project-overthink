import React, { useState } from 'react';
import { Copy, Check, MessageSquareCode, Shield, Zap, VolumeX, HelpCircle } from 'lucide-react';

export default function SuggestedResponseList({ responses = [] }) {
  const [copiedIdx, setCopiedIdx] = useState(null);

  if (!responses || responses.length === 0) return null;

  const handleCopy = (text, idx) => {
    navigator.clipboard.writeText(text);
    setCopiedIdx(idx);
    setTimeout(() => setCopiedIdx(null), 1800);
  };

  const getStrategyIcon = (strategy = '') => {
    const s = strategy.toLowerCase();
    if (s.includes('casual') || s.includes('cool')) return <Zap size={15} color="#5966E8" />;
    if (s.includes('direct') || s.includes('clarify') || s.includes('agenda')) return <HelpCircle size={15} color="#2E7D32" />;
    if (s.includes('boundary') || s.includes('delay')) return <Shield size={15} color="#DCA96B" />;
    if (s.includes('silence') || s.includes('do not')) return <VolumeX size={15} color="#D93838" />;
    return <MessageSquareCode size={15} color="#5966E8" />;
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px' }}>
        <h4 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--color-graphite)' }}>
          Strategically Differentiated Response Playbook
        </h4>
        <span style={{ fontSize: '0.80rem', color: 'var(--color-muted-slate)', fontWeight: 600 }}>
          Click any card to copy text
        </span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(290px, 1fr))', gap: '16px' }}>
        {responses.map((item, idx) => {
          const isObject = typeof item === 'object' && item !== null;
          const strategyTitle = isObject ? item.strategy : `Response Option ${idx + 1}`;
          const responseText = isObject ? item.text : item;
          const tone = isObject ? item.tone : null;
          const whyItWorks = isObject ? item.whyItWorks : null;
          const isRadioSilence = strategyTitle.toLowerCase().includes('silence') || strategyTitle.toLowerCase().includes('do not');

          return (
            <div 
              key={idx}
              className="glass-evidence"
              style={{
                borderRadius: '16px',
                padding: '20px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                border: isRadioSilence ? '1.5px solid rgba(217, 56, 56, 0.25)' : '1px solid var(--color-subtle-border)',
                backgroundColor: isRadioSilence ? '#FFF8F8' : 'rgba(255, 255, 255, 0.85)',
                position: 'relative',
                transition: 'transform 0.2s ease, box-shadow 0.2s ease'
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
                  <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '0.78rem', fontWeight: 800, color: isRadioSilence ? '#D93838' : 'var(--color-graphite)' }}>
                    {getStrategyIcon(strategyTitle)}
                    <span>{strategyTitle}</span>
                  </div>

                  {tone && (
                    <span 
                      style={{ 
                        fontSize: '0.68rem', 
                        fontWeight: 700, 
                        color: 'var(--color-muted-slate)', 
                        padding: '2px 8px', 
                        borderRadius: '9999px',
                        backgroundColor: 'rgba(32, 33, 31, 0.05)'
                      }}
                    >
                      {tone}
                    </span>
                  )}
                </div>

                <div 
                  style={{
                    backgroundColor: isRadioSilence ? 'rgba(217, 56, 56, 0.06)' : '#FAF8F5',
                    borderRadius: '10px',
                    padding: '12px 14px',
                    fontSize: '0.94rem',
                    fontWeight: 600,
                    color: isRadioSilence ? '#B71C1C' : 'var(--color-graphite)',
                    border: '1px solid rgba(32, 33, 31, 0.06)',
                    lineHeight: 1.5,
                    marginBottom: '12px'
                  }}
                >
                  "{responseText}"
                </div>

                {whyItWorks && (
                  <p style={{ fontSize: '0.80rem', color: 'var(--color-muted-slate)', lineHeight: 1.45, marginBottom: '14px' }}>
                    <strong style={{ color: 'var(--color-graphite)' }}>Why this works:</strong> {whyItWorks}
                  </p>
                )}
              </div>

              <button
                onClick={() => handleCopy(responseText, idx)}
                style={{
                  width: '100%',
                  padding: '8px 14px',
                  borderRadius: '8px',
                  border: '1px solid rgba(32, 33, 31, 0.10)',
                  backgroundColor: copiedIdx === idx ? '#E8F5E9' : '#FFFFFF',
                  color: copiedIdx === idx ? '#2E7D32' : 'var(--color-graphite)',
                  fontSize: '0.82rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px',
                  transition: 'all 0.15s ease'
                }}
              >
                {copiedIdx === idx ? <Check size={14} /> : <Copy size={14} />}
                <span>{copiedIdx === idx ? 'Copied to Clipboard!' : 'Copy This Response'}</span>
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
