import React, { createContext, useContext, useState, useEffect } from 'react';

const CaseContext = createContext(null);

const STORAGE_KEY = 'project_overthink_cases';
const CURRENT_CASE_KEY = 'project_overthink_current_case_id';
const EMOTION_STORAGE_KEY = 'project_overthink_emotion_state';
const WITNESS_STORAGE_KEY = 'project_overthink_witness_testimony';

const DEFAULT_EMOTION_STATE = {
  panicLevel: 75, // 0 to 100
  catastropheLevel: 80, // 0 to 100
  tonePreference: 'balanced', // 'gentle_cbt' | 'balanced' | 'satirical_tough_love'
  lastUpdatedStage: 'Home'
};

export function CaseProvider({ children }) {
  const [cases, setCases] = useState([]);
  const [currentCase, setCurrentCase] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState(null);
  const [isLiveAI, setIsLiveAI] = useState(false);

  // Global Emotion Telemetry Meter
  const [emotionState, setEmotionState] = useState(() => {
    try {
      const saved = sessionStorage.getItem(EMOTION_STORAGE_KEY);
      return saved ? JSON.parse(saved) : DEFAULT_EMOTION_STATE;
    } catch {
      return DEFAULT_EMOTION_STATE;
    }
  });

  // Courtroom Witness Testimony
  const [witnessTestimony, setWitnessTestimony] = useState(() => {
    try {
      const saved = sessionStorage.getItem(WITNESS_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Persist emotion state
  useEffect(() => {
    try {
      sessionStorage.setItem(EMOTION_STORAGE_KEY, JSON.stringify(emotionState));
    } catch (e) {
      console.warn('Session storage write error:', e);
    }
  }, [emotionState]);

  // Persist witness testimony
  useEffect(() => {
    try {
      sessionStorage.setItem(WITNESS_STORAGE_KEY, JSON.stringify(witnessTestimony));
    } catch (e) {
      console.warn('Session storage write error:', e);
    }
  }, [witnessTestimony]);

  const updateEmotion = (updater) => {
    setEmotionState(prev => {
      const next = typeof updater === 'function' ? updater(prev) : { ...prev, ...updater };
      // Clamp bounds
      if (typeof next.panicLevel === 'number') {
        next.panicLevel = Math.max(0, Math.min(100, Math.round(next.panicLevel)));
      }
      if (typeof next.catastropheLevel === 'number') {
        next.catastropheLevel = Math.max(0, Math.min(100, Math.round(next.catastropheLevel)));
      }
      return next;
    });
  };

  const recordWitnessAnswer = (questionId, questionText, chosenAnswer) => {
    setWitnessTestimony(prev => {
      const existingIdx = prev.findIndex(item => item.id === questionId);
      const entry = {
        id: questionId,
        question: questionText,
        answer: chosenAnswer,
        timestamp: new Date().toISOString()
      };
      if (existingIdx >= 0) {
        const copy = [...prev];
        copy[existingIdx] = entry;
        return copy;
      }
      return [...prev, entry];
    });

    // Answering in court relieves anxiety - drop panic level
    updateEmotion(prev => ({
      panicLevel: Math.max(10, prev.panicLevel - 20),
      catastropheLevel: Math.max(10, prev.catastropheLevel - 25),
      lastUpdatedStage: 'Courtroom Witness Stand'
    }));
  };

  const resetWitnessTestimony = () => {
    setWitnessTestimony([]);
    sessionStorage.removeItem(WITNESS_STORAGE_KEY);
  };

  // Load initial cases from API or localStorage
  useEffect(() => {
    async function loadCases() {
      try {
        const response = await fetch('/api/cases');
        if (response.ok) {
          const data = await response.json();
          if (Array.isArray(data) && data.length > 0) {
            setCases(data);
            
            // Check if there was an active case session
            const savedCurrentId = sessionStorage.getItem(CURRENT_CASE_KEY) || localStorage.getItem(CURRENT_CASE_KEY);
            if (savedCurrentId) {
              const found = data.find(c => c.id === savedCurrentId);
              if (found) {
                setCurrentCase(found);
              }
            }
            return;
          }
        }
      } catch (err) {
        console.warn('API fetch failed, reading localStorage:', err);
      }

      // LocalStorage fallback
      const local = localStorage.getItem(STORAGE_KEY);
      if (local) {
        try {
          const parsed = JSON.parse(local);
          setCases(parsed);
          const savedCurrentId = sessionStorage.getItem(CURRENT_CASE_KEY);
          if (savedCurrentId) {
            const found = parsed.find(c => c.id === savedCurrentId);
            if (found) setCurrentCase(found);
          }
        } catch (e) {
          console.error(e);
        }
      }
    }

    loadCases();
  }, []);

  // Sync to localStorage
  useEffect(() => {
    if (cases.length > 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cases));
    }
  }, [cases]);

  useEffect(() => {
    if (currentCase?.id) {
      localStorage.setItem(CURRENT_CASE_KEY, currentCase.id);
      sessionStorage.setItem(CURRENT_CASE_KEY, currentCase.id);
    } else {
      localStorage.removeItem(CURRENT_CASE_KEY);
      sessionStorage.removeItem(CURRENT_CASE_KEY);
    }
  }, [currentCase]);


  // Analyze message with Emotion Telemetry
  const analyzeMessage = async (message, context = '', mode = 'balanced') => {
    setIsAnalyzing(true);
    setError(null);

    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          message, 
          context, 
          mode,
          emotionState 
        })
      });

      if (!response.ok) {
        const errJson = await response.json().catch(() => ({}));
        throw new Error(errJson.error || `Server responded with ${response.status}`);
      }

      const data = await response.json();
      const analyzedCase = data.case;
      setIsLiveAI(!!data.isLiveAI);

      setCurrentCase(analyzedCase);
      setCases(prev => {
        const exists = prev.findIndex(c => c.id === analyzedCase.id);
        if (exists >= 0) {
          const updated = [...prev];
          updated[exists] = analyzedCase;
          return updated;
        }
        return [analyzedCase, ...prev];
      });

      // Update emotion journey stage
      updateEmotion({
        lastUpdatedStage: 'Forensic Decode Lab',
        panicLevel: Math.max(20, emotionState.panicLevel - 15) // Slight relief upon receiving 5 rational alternatives
      });

      return analyzedCase;
    } catch (err) {
      console.error('Analysis failed:', err);
      setError(err.message || 'Failed to analyze message. Please try again.');
      throw err;
    } finally {
      setIsAnalyzing(false);
    }
  };

  // Request or re-deliberate Courtroom trial with current witness testimony and emotion telemetry
  const requestCourtroomTrial = async (caseId, forceRerun = false) => {
    const targetId = caseId || currentCase?.id;
    if (!targetId) return null;

    try {
      const response = await fetch(`/api/cases/${targetId}/courtroom`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          forceRerun,
          witnessTestimony,
          emotionState
        })
      });

      if (!response.ok) {
        throw new Error(`Trial deliberation error (${response.status})`);
      }

      const data = await response.json();
      if (data.case) {
        setCurrentCase(data.case);
        setCases(prev => prev.map(c => c.id === targetId ? data.case : c));
      }
      return data;
    } catch (err) {
      console.warn('Courtroom deliberation sync failed:', err);
      return null;
    }
  };

  const selectCase = (caseId) => {
    const found = cases.find(c => c.id === caseId);
    if (found) {
      setCurrentCase(found);
    }
  };

  const renameCase = async (caseId, newTitle) => {
    if (!newTitle?.trim()) return;
    
    setCases(prev => prev.map(c => c.id === caseId ? { ...c, title: newTitle.trim(), updatedAt: new Date().toISOString() } : c));
    if (currentCase?.id === caseId) {
      setCurrentCase(prev => ({ ...prev, title: newTitle.trim(), updatedAt: new Date().toISOString() }));
    }

    try {
      await fetch(`/api/cases/${caseId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: newTitle.trim() })
      });
    } catch (err) {
      console.warn('Backend sync failed on rename:', err);
    }
  };

  const deleteCase = async (caseId) => {
    setCases(prev => {
      const remaining = prev.filter(c => c.id !== caseId);
      if (currentCase?.id === caseId) {
        setCurrentCase(remaining[0] || null);
      }
      return remaining;
    });

    try {
      await fetch(`/api/cases/${caseId}`, {
        method: 'DELETE'
      });
    } catch (err) {
      console.warn('Backend sync failed on delete:', err);
    }
  };

  const resetCase = () => {
    setCurrentCase(null);
    localStorage.removeItem(CURRENT_CASE_KEY);
    sessionStorage.removeItem(CURRENT_CASE_KEY);
    resetWitnessTestimony();
  };

  return (
    <CaseContext.Provider value={{
      cases,
      currentCase,
      isAnalyzing,
      error,
      isLiveAI,
      emotionState,
      updateEmotion,
      witnessTestimony,
      recordWitnessAnswer,
      resetWitnessTestimony,
      requestCourtroomTrial,
      analyzeMessage,
      selectCase,
      renameCase,
      deleteCase,
      resetCase,
      setCurrentCase
    }}>
      {children}
    </CaseContext.Provider>
  );
}

export function useCase() {
  const context = useContext(CaseContext);
  if (!context) {
    throw new Error('useCase must be used within a CaseProvider');
  }
  return context;
}
