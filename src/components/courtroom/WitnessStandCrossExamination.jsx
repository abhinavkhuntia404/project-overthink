import React, { useState } from 'react';
import { 
  Scale, 
  Gavel, 
  CheckCircle2, 
  HelpCircle, 
  AlertCircle, 
  FileText, 
  Sparkles, 
  ArrowRight, 
  RotateCcw,
  UserCheck,
  Send
} from 'lucide-react';
import { useCase } from '../../context/CaseContext';

const QUESTIONS = [
  {
    id: 'q1_prosecution',
    role: 'Prosecution Cross-Examination',
    interrogator: 'Prosecutor Vance (The Catastrophe Advocate)',
    badgeColor: '#E65353',
    question: 'Witness, isn\'t it true that within 8 seconds of reading this text, your brain had already drafted a worst-case scenario where you are completely alienated or discarded?',
    options: [
      'Guilty as charged, Your Honour. I had already planned my apology speech and mutual exit.',
      'I did not plan a funeral, but I did search whether they deleted my contact.',
      'I merely stared at the screen for 20 minutes analyzing the lack of exclamation marks.'
    ]
  },
  {
    id: 'q2_defence',
    role: 'Defence Re-Direct Examination',
    interrogator: 'Defence Counsel Sterling (The Voice of Sanity)',
    badgeColor: 'var(--color-indigo)',
    question: 'Witness, let us examine Exhibit A strictly as physical pixels. Did the sender explicitly use any hostile words, grievances, or formal termination notices?',
    options: [
      'No, Your Honour. The text contains zero insults or complaints.',
      'None. All hostility was created exclusively by my own nervous system.',
      'Zero physical evidence. Just imaginary emotional telepathy.'
    ]
  },
  {
    id: 'q3_judge',
    role: 'The Judge\'s Direct Inquiry',
    interrogator: 'The Supreme Judge of Overthinking',
    badgeColor: '#DCA96B',
    question: 'Witness, on a scale of objective physical reality to catastrophic imagination, what percentage of this crisis was manufactured purely in your own skull?',
    options: [
      'At least 90%, Your Honour. My skull is an unaccredited drama studio.',
      '100%. The sender was almost certainly just busy, tired, or eating lunch.',
      'The vast majority. I hereby formally withdraw all imaginary allegations.'
    ]
  }
];

export default function WitnessStandCrossExamination({ onTestimonySubmitted }) {
  const { currentCase, witnessTestimony, recordWitnessAnswer, resetWitnessTestimony, requestCourtroomTrial } = useCase();
  const [isSwornIn, setIsSwornIn] = useState(() => witnessTestimony && witnessTestimony.length > 0);
  const [activeQuestionIdx, setActiveQuestionIdx] = useState(0);
  const [customText, setCustomText] = useState('');
  const [isSubmittingToJudge, setIsSubmittingToJudge] = useState(false);
  const [successBanner, setSuccessBanner] = useState(null);

  const currentQ = QUESTIONS[activeQuestionIdx];
  const answeredCount = witnessTestimony.length;
  const allAnswered = answeredCount >= QUESTIONS.length;

  const handleSelectAnswer = (ans) => {
    recordWitnessAnswer(currentQ.id, currentQ.question, ans);
    setSuccessBanner(`Testimony for Question ${activeQuestionIdx + 1} sealed under oath (-20% Panic).`);
    setTimeout(() => setSuccessBanner(null), 2500);

    if (activeQuestionIdx < QUESTIONS.length - 1) {
      setActiveQuestionIdx(prev => prev + 1);
    }
  };

  const handleCustomSubmit = (e) => {
    e.preventDefault();
    if (!customText.trim()) return;
    handleSelectAnswer(customText.trim());
    setCustomText('');
  };

  const handleSubmitToJudge = async () => {
    setIsSubmittingToJudge(true);
    try {
      await requestCourtroomTrial(currentCase.id, true);
      if (onTestimonySubmitted) {
        onTestimonySubmitted();
      }
    } finally {
      setIsSubmittingToJudge(false);
    }
  };

  return (
    <div 
      className="glass-evidence"
      style={{
        borderRadius: '24px',
        padding: '32px',
        marginBottom: '40px',
        backgroundColor: '#FFFFFF',
        border: '2px solid var(--color-indigo)',
        boxShadow: '0 16px 40px -12px rgba(89, 102, 232, 0.12)'
      }}
    >
      {/* SECTION HEADER */}
      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '16px', marginBottom: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span className="chip chip-lavender" style={{ fontSize: '0.82rem', padding: '4px 12px' }}>
            <Scale size={14} />
            <span>Interactive Witness Stand</span>
          </span>
          <span style={{ fontSize: '0.84rem', fontWeight: 700, color: 'var(--color-graphite)' }}>
            Sworn Cross-Examination Session
          </span>
        </div>

        {isSwornIn && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ fontSize: '0.78rem', color: 'var(--color-muted-slate)', fontWeight: 600 }}>
              Testimony Progress: {answeredCount} / {QUESTIONS.length}
            </span>
            <button 
              onClick={() => {
                resetWitnessTestimony();
                setActiveQuestionIdx(0);
                setIsSwornIn(false);
              }}
              className="btn-ghost"
              style={{ fontSize: '0.76rem', padding: '4px 10px' }}
              title="Retake the witness stand"
            >
              <RotateCcw size={12} />
              <span>Reset Stand</span>
            </button>
          </div>
        )}
      </div>

      {/* STAGE 1: NOT YET SWORN IN */}
      {!isSwornIn && (
        <div 
          style={{
            textAlign: 'center',
            padding: '40px 20px',
            backgroundColor: '#FAF8F5',
            borderRadius: '18px',
            border: '1px dashed var(--color-indigo)'
          }}
        >
          <div 
            style={{
              width: '56px',
              height: '56px',
              borderRadius: '50%',
              backgroundColor: 'var(--color-pale-lavender)',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--color-indigo)',
              marginBottom: '16px'
            }}
          >
            <UserCheck size={28} />
          </div>

          <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--color-graphite)', marginBottom: '8px' }}>
            The Court Calls The Overthinker To The Stand
          </h3>
          <p style={{ fontSize: '0.94rem', color: 'var(--color-muted-slate)', maxWidth: '540px', margin: '0 auto 24px', lineHeight: 1.5 }}>
            Before the Judge can render a fair verdict, you must testify under oath regarding what actually happened versus what your anxiety imagined.
          </p>

          <button
            onClick={() => setIsSwornIn(true)}
            className="btn-primary"
            style={{ padding: '14px 28px', fontSize: '0.96rem' }}
          >
            <Gavel size={18} />
            <span>I Swear to Tell the Truth, Not What My Anxiety Hallucinated</span>
          </button>
        </div>
      )}

      {/* STAGE 2: SWORN IN & ACTIVE CROSS-EXAMINATION */}
      {isSwornIn && (
        <div>
          {/* SUCCESS BANNER UPON RECORDING */}
          {successBanner && (
            <div 
              style={{
                padding: '10px 16px',
                borderRadius: '10px',
                backgroundColor: '#E8F5E9',
                color: '#2E7D32',
                fontSize: '0.84rem',
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                marginBottom: '16px',
                animation: 'fadeIn 0.2s ease'
              }}
            >
              <CheckCircle2 size={16} />
              <span>{successBanner}</span>
            </div>
          )}

          {/* QUESTION TABS */}
          <div style={{ display: 'flex', gap: '8px', marginBottom: '20px', overflowX: 'auto' }}>
            {QUESTIONS.map((q, idx) => {
              const answered = witnessTestimony.some(item => item.id === q.id);
              const isCurrent = idx === activeQuestionIdx;
              return (
                <button
                  key={q.id}
                  onClick={() => setActiveQuestionIdx(idx)}
                  style={{
                    padding: '8px 14px',
                    borderRadius: '10px',
                    border: isCurrent ? '2px solid var(--color-indigo)' : '1px solid var(--color-subtle-border)',
                    backgroundColor: isCurrent ? 'var(--color-pale-lavender)' : '#FAF8F5',
                    color: isCurrent ? 'var(--color-indigo)' : 'var(--color-graphite)',
                    fontWeight: 700,
                    fontSize: '0.80rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}
                >
                  {answered ? <CheckCircle2 size={14} color="#2E7D32" /> : <span>#{idx + 1}</span>}
                  <span>{q.role.split(' ')[0]}</span>
                </button>
              );
            })}
          </div>

          {/* ACTIVE QUESTION BOX */}
          <div 
            style={{
              padding: '24px',
              borderRadius: '18px',
              backgroundColor: '#FAF8F5',
              border: '1px solid var(--color-subtle-border)',
              marginBottom: '24px'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
              <span 
                className="chip" 
                style={{ 
                  backgroundColor: `${currentQ.badgeColor}18`, 
                  color: currentQ.badgeColor,
                  fontWeight: 800,
                  fontSize: '0.74rem'
                }}
              >
                {currentQ.role}
              </span>
              <span style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--color-muted-slate)' }}>
                {currentQ.interrogator}
              </span>
            </div>

            <h4 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--color-graphite)', lineHeight: 1.4, marginBottom: '20px' }}>
              "{currentQ.question}"
            </h4>

            {/* ANSWER OPTIONS */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '18px' }}>
              {currentQ.options.map((opt, optIdx) => {
                const isSelected = witnessTestimony.find(item => item.id === currentQ.id)?.answer === opt;
                return (
                  <button
                    key={optIdx}
                    onClick={() => handleSelectAnswer(opt)}
                    style={{
                      padding: '14px 18px',
                      borderRadius: '12px',
                      textAlign: 'left',
                      border: isSelected ? '2px solid var(--color-indigo)' : '1px solid var(--color-subtle-border)',
                      backgroundColor: isSelected ? 'var(--color-pale-lavender)' : '#FFFFFF',
                      color: 'var(--color-graphite)',
                      fontSize: '0.92rem',
                      fontWeight: isSelected ? 700 : 500,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      transition: 'all 0.15s ease'
                    }}
                    onMouseEnter={e => {
                      if (!isSelected) e.currentTarget.style.backgroundColor = 'rgba(243, 241, 236, 0.6)';
                    }}
                    onMouseLeave={e => {
                      if (!isSelected) e.currentTarget.style.backgroundColor = '#FFFFFF';
                    }}
                  >
                    <span>{opt}</span>
                    {isSelected && <CheckCircle2 size={18} color="var(--color-indigo)" />}
                  </button>
                );
              })}
            </div>

            {/* CUSTOM TESTIMONY INPUT */}
            <form onSubmit={handleCustomSubmit} style={{ display: 'flex', gap: '10px' }}>
              <input
                type="text"
                value={customText}
                onChange={e => setCustomText(e.target.value)}
                placeholder="Or type your own sworn answer under oath..."
                style={{
                  flex: 1,
                  padding: '10px 16px',
                  borderRadius: '10px',
                  border: '1px solid var(--color-subtle-border)',
                  backgroundColor: '#FFFFFF',
                  fontSize: '0.88rem',
                  outline: 'none'
                }}
              />
              <button
                type="submit"
                disabled={!customText.trim()}
                className="btn-indigo"
                style={{ padding: '10px 16px', fontSize: '0.84rem' }}
              >
                <span>Record</span>
                <Send size={14} />
              </button>
            </form>
          </div>

          {/* DOCKET OF SWORN STATEMENTS & SUBMIT TO JUDGE */}
          {witnessTestimony.length > 0 && (
            <div 
              style={{
                borderTop: '1px solid var(--color-subtle-border)',
                paddingTop: '20px',
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '16px'
              }}
            >
              <div>
                <div style={{ fontSize: '0.84rem', fontWeight: 800, color: 'var(--color-graphite)' }}>
                  Official Witness Stand Docket Sealed
                </div>
                <div style={{ fontSize: '0.78rem', color: 'var(--color-muted-slate)' }}>
                  Your testimony has been entered into the case record. Submit to let the Judge factor it into the verdict.
                </div>
              </div>

              <button
                onClick={handleSubmitToJudge}
                disabled={isSubmittingToJudge}
                className="btn-primary"
                style={{ padding: '12px 24px', fontSize: '0.90rem' }}
              >
                <Gavel size={16} />
                <span>{isSubmittingToJudge ? 'Judge Deliberating with Testimony...' : 'Submit Testimony & Update Courtroom Verdict'}</span>
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
