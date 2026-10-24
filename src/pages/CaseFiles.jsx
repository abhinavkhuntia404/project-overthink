import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FolderArchive, 
  Search, 
  Trash2, 
  Edit3, 
  Check, 
  X, 
  ArrowRight, 
  Scale, 
  Calendar, 
  PlusCircle, 
  Sparkles,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { useCase } from '../context/CaseContext';
import { EvidenceTagDoodle } from '../components/doodles/CourtroomDoodles';

export default function CaseFiles() {
  const navigate = useNavigate();
  const { cases, currentCase, selectCase, deleteCase, renameCase, resetCase } = useCase();

  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('all'); // 'all', 'user', 'samples', 'verdict'
  const [editingCaseId, setEditingCaseId] = useState(null);
  const [editTitleText, setEditTitleText] = useState('');

  const filteredCases = cases.filter((c) => {
    // Search match
    const matchesSearch = 
      c.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.message?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.context?.toLowerCase().includes(searchQuery.toLowerCase());

    if (!matchesSearch) return false;

    if (activeFilter === 'samples') return !!c.isSample;
    if (activeFilter === 'user') return !c.isSample;
    if (activeFilter === 'verdict') return c.status === 'verdict_reached';
    return true;
  });

  const handleStartRename = (c) => {
    setEditingCaseId(c.id);
    setEditTitleText(c.title);
  };

  const handleSaveRename = (caseId) => {
    if (editTitleText.trim()) {
      renameCase(caseId, editTitleText.trim());
    }
    setEditingCaseId(null);
  };

  const handleOpenCase = (caseId, targetRoute = '/decode') => {
    selectCase(caseId);
    navigate(targetRoute);
  };

  return (
    <div className="container-wide" style={{ padding: '40px 24px 100px' }}>
      
      {/* Page Header */}
      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '20px', marginBottom: '36px' }}>
        <div>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
            <span className="chip chip-graphite">
              <FolderArchive size={13} />
              <span>Evidence Repository</span>
            </span>
            <span style={{ fontSize: '0.8rem', color: 'var(--color-muted-slate)', fontWeight: 600 }}>
              {cases.length} Total Registered Files
            </span>
          </div>
          <h1 style={{ fontSize: 'clamp(2.2rem, 4vw, 3.2rem)', fontWeight: 800, color: 'var(--color-graphite)', letterSpacing: '-0.02em' }}>
            Previously overthought.
          </h1>
          <p style={{ fontSize: '1.02rem', color: 'var(--color-muted-slate)', marginTop: '4px' }}>
            An official archive of every text, pause, and punctuation mark put on trial.
          </p>
        </div>

        <button 
          onClick={() => {
            resetCase();
            navigate('/decode');
          }}
          className="btn-primary"
          style={{ padding: '12px 24px' }}
        >
          <PlusCircle size={16} />
          <span>New Investigation</span>
        </button>
      </div>

      {/* SEARCH AND FILTER BAR */}
      <div 
        className="glass-evidence"
        style={{
          borderRadius: '18px',
          padding: '16px 20px',
          marginBottom: '32px',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '16px'
        }}
      >
        {/* Search Input */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flex: 1, minWidth: '240px' }}>
          <Search size={18} color="var(--color-muted-slate)" />
          <input 
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search cases by message, title, or keywords..."
            style={{ width: '100%', border: 'none', background: 'transparent', padding: '8px 0', fontSize: '0.95rem' }}
          />
        </div>

        {/* Filter Pills */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
          {[
            { id: 'all', label: 'All Files' },
            { id: 'user', label: 'My Investigations' },
            { id: 'samples', label: 'Sample Demonstrations' },
            { id: 'verdict', label: 'Verdicts Reached' }
          ].map((f) => (
            <button
              key={f.id}
              onClick={() => setActiveFilter(f.id)}
              style={{
                padding: '6px 14px',
                borderRadius: 'var(--radius-full)',
                fontSize: '0.8rem',
                fontWeight: 600,
                cursor: 'pointer',
                border: '1px solid',
                borderColor: activeFilter === f.id ? 'var(--color-graphite)' : 'var(--color-subtle-border)',
                backgroundColor: activeFilter === f.id ? 'var(--color-graphite)' : 'transparent',
                color: activeFilter === f.id ? '#FFFFFF' : 'var(--color-graphite)'
              }}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* CASES GRID */}
      {filteredCases.length > 0 ? (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '24px' }}>
          {filteredCases.map((c) => {
            const isEditing = editingCaseId === c.id;
            const isCurrentlySelected = currentCase?.id === c.id;

            return (
              <div
                key={c.id}
                className="glass-evidence"
                style={{
                  borderRadius: '20px',
                  padding: '24px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  gap: '16px',
                  position: 'relative',
                  backgroundColor: isCurrentlySelected ? '#FFFFFF' : 'rgba(255, 255, 255, 0.75)',
                  border: isCurrentlySelected ? '2px solid var(--color-indigo)' : '1px solid var(--color-subtle-border)',
                  boxShadow: isCurrentlySelected ? 'var(--shadow-floating)' : 'var(--shadow-subtle)'
                }}
              >
                <div>
                  {/* Top tags */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      {c.isSample ? (
                        <span className="chip chip-amber" style={{ fontSize: '0.68rem', padding: '2px 8px' }}>
                          Demonstration Case
                        </span>
                      ) : (
                        <span className="chip chip-lavender" style={{ fontSize: '0.68rem', padding: '2px 8px' }}>
                          Personal Case
                        </span>
                      )}
                      {isCurrentlySelected && (
                        <span className="chip chip-graphite" style={{ fontSize: '0.68rem', padding: '2px 8px' }}>
                          Active
                        </span>
                      )}
                    </div>
                    
                    <span style={{ fontSize: '0.75rem', color: 'var(--color-muted-slate)' }}>
                      {new Date(c.createdAt).toLocaleDateString()}
                    </span>
                  </div>

                  {/* Title (editable) */}
                  {isEditing ? (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '10px' }}>
                      <input 
                        type="text" 
                        value={editTitleText}
                        onChange={(e) => setEditTitleText(e.target.value)}
                        style={{ padding: '6px 10px', fontSize: '0.95rem', flex: 1 }}
                        autoFocus
                      />
                      <button onClick={() => handleSaveRename(c.id)} className="btn-ghost" style={{ padding: '6px' }} title="Save title">
                        <Check size={16} color="#2E7D32" />
                      </button>
                      <button onClick={() => setEditingCaseId(null)} className="btn-ghost" style={{ padding: '6px' }} title="Cancel">
                        <X size={16} color="#E65353" />
                      </button>
                    </div>
                  ) : (
                    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '8px', marginBottom: '8px' }}>
                      <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--color-graphite)', lineHeight: 1.25 }}>
                        {c.title}
                      </h3>
                      <button 
                        onClick={() => handleStartRename(c)}
                        className="btn-ghost"
                        style={{ padding: '4px', opacity: 0.6 }}
                        title="Rename case"
                      >
                        <Edit3 size={14} />
                      </button>
                    </div>
                  )}

                  {/* Message Quote */}
                  <div 
                    style={{
                      background: 'rgba(243, 241, 236, 0.7)',
                      borderRadius: '12px',
                      padding: '12px 16px',
                      fontSize: '0.95rem',
                      fontWeight: 600,
                      color: 'var(--color-graphite)',
                      marginBottom: '10px',
                      border: '1px solid var(--color-subtle-border)'
                    }}
                  >
                    "{c.message}"
                  </div>

                  {/* Verdict Stamp summary */}
                  {c.verdict?.title && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.82rem', color: 'var(--color-indigo)', fontWeight: 700 }}>
                      <Scale size={14} />
                      <span>Ruling: {c.verdict.title}</span>
                    </div>
                  )}
                </div>

                {/* Card Actions */}
                <div style={{ borderTop: '1px solid var(--color-subtle-border)', paddingTop: '14px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button
                      onClick={() => handleOpenCase(c.id, '/decode')}
                      className="btn-secondary"
                      style={{ fontSize: '0.82rem', padding: '6px 14px' }}
                    >
                      Examine
                    </button>
                    <button
                      onClick={() => handleOpenCase(c.id, '/courtroom')}
                      className="btn-ghost"
                      style={{ fontSize: '0.82rem', padding: '6px 12px', border: '1px solid var(--color-subtle-border)' }}
                    >
                      Courtroom
                    </button>
                  </div>

                  {!c.isSample && (
                    <button
                      onClick={() => deleteCase(c.id)}
                      className="btn-ghost"
                      style={{ padding: '6px', color: '#E65353', opacity: 0.8 }}
                      title="Permanently delete this case"
                    >
                      <Trash2 size={16} />
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* Well-designed empty state */
        <div 
          className="glass-evidence" 
          style={{
            borderRadius: '24px',
            padding: '60px 24px',
            textAlign: 'center',
            maxWidth: '560px',
            margin: '40px auto'
          }}
        >
          <FolderArchive size={48} color="var(--color-muted-slate)" style={{ margin: '0 auto 16px', opacity: 0.6 }} />
          <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--color-graphite)', marginBottom: '8px' }}>
            No Matching Cases Found
          </h3>
          <p style={{ color: 'var(--color-muted-slate)', fontSize: '0.95rem', marginBottom: '24px' }}>
            Try adjusting your search criteria or register a fresh situation to put on trial.
          </p>
          <button 
            onClick={() => {
              setSearchQuery('');
              setActiveFilter('all');
            }} 
            className="btn-secondary"
          >
            Clear Filters
          </button>
        </div>
      )}

    </div>
  );
}
