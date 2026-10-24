import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Building2, Shield, Lock, CheckCircle2, ArrowRight } from 'lucide-react';
import { useCase } from '../../context/CaseContext';

export default function BuildingDirectory({ currentDepartment = 'lobby' }) {
  const location = useLocation();
  const { currentCase } = useCase();

  const departments = [
    {
      floor: 'Floor 1',
      id: 'lobby',
      name: 'Entrance Lobby & Memes',
      path: '/',
      isPublic: true,
      badge: 'Public Concourse'
    },
    {
      floor: 'Floor 2',
      id: 'reception',
      name: 'Investigation Reception',
      path: '/investigate',
      isPublic: true,
      badge: 'Intake Desk'
    },
    {
      floor: 'Floor 3',
      id: 'lab',
      name: 'Forensic Interpretation Lab',
      path: currentCase ? '/decode' : '/investigate',
      isPublic: false,
      badge: currentCase ? 'Evidence In Session' : 'Requires Case File'
    },
    {
      floor: 'Floor 4',
      id: 'courtroom',
      name: 'The Trial Courtroom',
      path: currentCase ? '/courtroom' : '/investigate',
      isPublic: false,
      badge: currentCase ? 'Docket Active' : 'Evidence Required'
    },
    {
      floor: 'Floor 5',
      id: 'reality-check',
      name: 'Reality Check & Sanity Chamber',
      path: currentCase ? '/reality-check' : '/investigate',
      isPublic: false,
      badge: currentCase ? 'De-escalation Ready' : 'Requires Case File'
    }
  ];

  const activeDept = departments.find(d => {
    if (location.pathname === '/') return d.id === 'lobby';
    if (location.pathname === '/investigate') return d.id === 'reception';
    if (location.pathname === '/decode') return d.id === 'lab';
    if (location.pathname === '/courtroom') return d.id === 'courtroom';
    if (location.pathname === '/reality-check') return d.id === 'reality-check';
    return false;
  }) || departments[0];

  return (
    <div 
      className="glass-evidence"
      style={{
        borderRadius: '16px',
        padding: '12px 20px',
        margin: '0 auto 28px',
        maxWidth: '920px',
        width: '100%',
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '12px',
        backgroundColor: 'rgba(255, 255, 255, 0.72)',
        border: '1px solid var(--color-subtle-border)'
      }}
    >
      {/* Current Floor Indicator */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <div 
          style={{ 
            width: '32px', 
            height: '32px', 
            borderRadius: '8px', 
            backgroundColor: 'var(--color-graphite)', 
            color: 'var(--color-porcelain)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '0.85rem',
            fontWeight: 800 
          }}
        >
          {activeDept.floor.replace('Floor ', 'F')}
        </div>
        <div>
          <div style={{ fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--color-muted-slate)', fontWeight: 700 }}>
            Bureau Department • {activeDept.floor}
          </div>
          <div style={{ fontSize: '0.92rem', fontWeight: 800, color: 'var(--color-graphite)' }}>
            {activeDept.name}
          </div>
        </div>
      </div>

      {/* Building Floor Pills */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', alignItems: 'center' }}>
        {departments.map((dept) => {
          const isCurrent = dept.id === activeDept.id;
          const isLocked = !dept.isPublic && !currentCase;

          return (
            <Link
              key={dept.id}
              to={dept.path}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '5px',
                padding: '5px 12px',
                borderRadius: 'var(--radius-full)',
                fontSize: '0.76rem',
                fontWeight: isCurrent ? 700 : 500,
                textDecoration: 'none',
                backgroundColor: isCurrent ? 'var(--color-graphite)' : 'rgba(243, 241, 236, 0.7)',
                color: isCurrent ? '#FFF' : 'var(--color-graphite)',
                border: '1px solid',
                borderColor: isCurrent ? 'var(--color-graphite)' : 'var(--color-subtle-border)',
                opacity: isLocked ? 0.65 : 1,
                cursor: isLocked ? 'not-allowed' : 'pointer'
              }}
              title={isLocked ? 'Submit evidence at Reception to unlock this department' : dept.name}
            >
              <span>{dept.floor.replace('Floor ', 'F')}: {dept.id.toUpperCase()}</span>
              {isLocked && <Lock size={11} />}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
