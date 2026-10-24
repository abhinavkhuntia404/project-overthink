import React, { useState } from 'react';
import { Lock, Trash2, Database, Server, Check } from 'lucide-react';

export default function Privacy() {
  const [clearedNotice, setClearedNotice] = useState(false);

  const handleClearAllData = () => {
    localStorage.removeItem('project_overthink_cases');
    localStorage.removeItem('project_overthink_current_case_id');
    setClearedNotice(true);
    setTimeout(() => {
      window.location.reload();
    }, 1200);
  };

  return (
    <div className="container-narrow" style={{ padding: '60px 24px 100px' }}>
      
      {/* Page Header */}
      <div style={{ textAlign: 'center', marginBottom: '48px' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
          <span className="chip chip-graphite">
            <Lock size={13} />
            <span>Honest Transparency Statement</span>
          </span>
        </div>
        <h1 
          style={{ 
            fontSize: 'clamp(2.4rem, 4.5vw, 3.4rem)', 
            fontWeight: 800, 
            letterSpacing: '-0.02em', 
            color: 'var(--color-graphite)', 
            marginBottom: '14px' 
          }}
        >
          Privacy & Data Handling
        </h1>
        <p style={{ fontSize: '1.1rem', color: 'var(--color-muted-slate)', lineHeight: 1.5 }}>
          No legal boilerplate. Just an accurate, plain-language breakdown of what happens when you type a message into PROJECT OVERTHINK.
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
        
        {/* 1. What You Submit */}
        <div className="glass-evidence" style={{ borderRadius: '20px', padding: '30px' }}>
          <h2 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--color-graphite)', marginBottom: '12px' }}>
            1. What Information You Submit
          </h2>
          <p style={{ fontSize: '0.98rem', color: 'var(--color-graphite-soft)', lineHeight: 1.6, marginBottom: '12px' }}>
            When you conduct an inquiry, you submit two pieces of content:
          </p>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px', paddingLeft: '4px' }}>
            <li style={{ fontSize: '0.92rem', color: 'var(--color-muted-slate)', display: 'flex', gap: '8px' }}>
              <span style={{ color: 'var(--color-indigo)', fontWeight: 700 }}>•</span>
              <span><strong>The Message:</strong> The specific text or snippet under review.</span>
            </li>
            <li style={{ fontSize: '0.92rem', color: 'var(--color-muted-slate)', display: 'flex', gap: '8px' }}>
              <span style={{ color: 'var(--color-indigo)', fontWeight: 700 }}>•</span>
              <span><strong>Optional Context:</strong> Any background history, relationship notes, or timestamps you provide.</span>
            </li>
          </ul>
        </div>

        {/* 2. Where It Is Processed */}
        <div className="glass-evidence" style={{ borderRadius: '20px', padding: '30px' }}>
          <h2 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--color-graphite)', marginBottom: '12px' }}>
            2. AI Provider & Processing Architecture
          </h2>
          <p style={{ fontSize: '0.98rem', color: 'var(--color-graphite-soft)', lineHeight: 1.6, marginBottom: '14px' }}>
            All processing logic runs server-side:
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
            <div style={{ background: '#FAF8F5', borderRadius: '12px', padding: '16px', border: '1px solid var(--color-subtle-border)' }}>
              <div style={{ fontWeight: 700, fontSize: '0.92rem', color: 'var(--color-indigo)', marginBottom: '4px' }}>
                Server-Side Gemini Integration
              </div>
              <div style={{ fontSize: '0.85rem', color: 'var(--color-muted-slate)', lineHeight: 1.45 }}>
                When configured by the host administrator, requests are sent via a secure server-side call to Google Gemini APIs using structured JSON response mode. API keys are strictly kept server-side and are never exposed to browser clients.
              </div>
            </div>

            <div style={{ background: '#FAF8F5', borderRadius: '12px', padding: '16px', border: '1px solid var(--color-subtle-border)' }}>
              <div style={{ fontWeight: 700, fontSize: '0.92rem', color: 'var(--color-graphite)', marginBottom: '4px' }}>
                Offline Semantic Heuristics Engine
              </div>
              <div style={{ fontSize: '0.85rem', color: 'var(--color-muted-slate)', lineHeight: 1.45 }}>
                If an external AI provider key is not configured or network connectivity is interrupted, the application uses our internal deterministic semantic heuristics engine without contacting external AI servers.
              </div>
            </div>
          </div>
        </div>

        {/* 3. Storage & Retention */}
        <div className="glass-evidence" style={{ borderRadius: '20px', padding: '30px' }}>
          <h2 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--color-graphite)', marginBottom: '12px' }}>
            3. Local Storage vs Server Persistence
          </h2>
          <p style={{ fontSize: '0.98rem', color: 'var(--color-graphite-soft)', lineHeight: 1.6, marginBottom: '14px' }}>
            To ensure your cases remain available across page refreshes and between the Decode, Courtroom, and Reality Check pages:
          </p>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <li style={{ fontSize: '0.92rem', color: 'var(--color-graphite-soft)', display: 'flex', gap: '8px' }}>
              <Database size={16} color="var(--color-indigo)" style={{ flexShrink: 0, marginTop: '2px' }} />
              <span><strong>Browser LocalStorage:</strong> Case records and active case pointers are mirrored in your local browser storage so your work is preserved.</span>
            </li>
            <li style={{ fontSize: '0.92rem', color: 'var(--color-graphite-soft)', display: 'flex', gap: '8px' }}>
              <Server size={16} color="var(--color-graphite)" style={{ flexShrink: 0, marginTop: '2px' }} />
              <span><strong>Local Server File:</strong> In the active server runtime, case records are saved in a local JSON storage file for session persistence. We do not sell, broadcast, or harvest this text.</span>
            </li>
          </ul>
        </div>

        {/* 4. Deleting Your Data */}
        <div 
          className="glass-evidence" 
          style={{ 
            borderRadius: '20px', 
            padding: '30px',
            border: '1px solid rgba(230, 83, 83, 0.3)',
            backgroundColor: '#FFFAFA'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
            <div>
              <h2 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#D93838', marginBottom: '6px' }}>
                4. Delete All Local Stored Cases
              </h2>
              <p style={{ fontSize: '0.92rem', color: 'var(--color-muted-slate)', maxWidth: '500px' }}>
                You can delete individual cases inside Case Files at any time, or click the button on the right to wipe all browser local storage and reset the environment immediately.
              </p>
            </div>

            <button
              onClick={handleClearAllData}
              className="btn-ghost"
              style={{
                backgroundColor: clearedNotice ? '#D93838' : '#FFF',
                border: '1px solid #E65353',
                color: clearedNotice ? '#FFF' : '#D93838',
                padding: '10px 20px',
                fontSize: '0.9rem',
                transition: 'all 0.2s ease'
              }}
            >
              {clearedNotice ? <Check size={16} /> : <Trash2 size={16} />}
              <span>{clearedNotice ? 'Cleared Local Storage!' : 'Wipe All Local Data'}</span>
            </button>
          </div>
        </div>

        {/* 5. Prototype Status */}
        <div style={{ padding: '20px 24px', background: 'rgba(243, 241, 236, 0.6)', borderRadius: '16px', border: '1px solid var(--color-subtle-border)' }}>
          <div style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--color-graphite)', marginBottom: '4px' }}>
            Prototype Status & Limitations
          </div>
          <p style={{ fontSize: '0.85rem', color: 'var(--color-muted-slate)', lineHeight: 1.5 }}>
            PROJECT OVERTHINK is an artistic, entertainment, and cognitive-clarity web tool. The verdicts, prosecution arguments, and analyses are satirical forensic exercises designed to de-escalate anxiety. It does not provide medical, psychological, or legal counsel.
          </p>
        </div>

      </div>

    </div>
  );
}
