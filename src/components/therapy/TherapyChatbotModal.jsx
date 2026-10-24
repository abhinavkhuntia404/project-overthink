import React, { useState, useEffect, useRef } from 'react';
import { 
  X, 
  Send, 
  Bot, 
  User, 
  Sparkles, 
  HeartHandshake, 
  Copy, 
  Check, 
  RefreshCw,
  Compass,
  MessageSquareHeart,
  Activity
} from 'lucide-react';
import { useCase } from '../../context/CaseContext';

export default function TherapyChatbotModal({ isOpen, onClose, currentCase }) {
  const { emotionState, updateEmotion } = useCase();
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState(null);
  const messagesEndRef = useRef(null);

  // Initialize counselor greeting when opened
  useEffect(() => {
    if (isOpen && currentCase && messages.length === 0) {
      const initialGreeting = {
        role: 'assistant',
        content: `Welcome to the De-escalation Lounge. I have carefully reviewed your case regarding "${currentCase.message || 'your message'}". 

Your emotion meter indicates a current panic dial of ${emotionState?.panicLevel ?? 65}%. Ambiguity is exhausting because your nervous system treats unconfirmed data like an active emergency. I'm here to help you unpack whatever is still spinning in your head, practice what you might reply, or guide you through a 60-second reality check.

What is your mind holding onto right now?`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages([initialGreeting]);
    }
  }, [isOpen, currentCase, messages.length, emotionState?.panicLevel]);

  // Auto-scroll to bottom on new message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  if (!isOpen || !currentCase) return null;

  const quickPrompts = [
    'Why does my brain assume the absolute worst?',
    'Review a draft message I am thinking of sending',
    'Give me a 60-second nervous system grounding exercise',
    'Is it okay if I do not reply at all tonight?'
  ];

  const handleSendMessage = async (textToSend) => {
    const text = (textToSend || inputValue).trim();
    if (!text || isTyping) return;

    const userMsg = {
      role: 'user',
      content: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputValue('');
    setIsTyping(true);

    try {
      const historyPayload = messages.map(m => ({
        role: m.role,
        content: m.content
      }));

      const res = await fetch(`/api/cases/${currentCase.id}/therapy-chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Access-Token': currentCase.accessToken || ''
        },
        body: JSON.stringify({
          message: text,
          history: historyPayload,
          emotionState
        })
      });

      const data = await res.json();
      
      const assistantMsg = {
        role: 'assistant',
        content: data.reply || "Take a slow breath. Your nervous system is safe right now, even if your thoughts feel loud.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isLiveAI: data.isLiveAI
      };

      setMessages(prev => [...prev, assistantMsg]);

      // Therapy dialogue progressively relieves anxiety!
      updateEmotion(prev => ({
        panicLevel: Math.max(5, prev.panicLevel - 12),
        catastropheLevel: Math.max(5, prev.catastropheLevel - 15),
        lastUpdatedStage: 'Therapy De-escalation Lounge'
      }));
    } catch {
      const fallbackMsg = {
        role: 'assistant',
        content: "Notice the urge to solve everything right this second. It's an illusion created by cortisol. What is one grounding action you can take right now that doesn't involve looking at your screen?",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, fallbackMsg]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleCopyText = (text, index) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 1800);
  };

  return (
    <div 
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(32, 33, 31, 0.45)',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
        zIndex: 2000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px'
      }}
      onClick={onClose}
    >
      <div 
        style={{
          width: '100%',
          maxWidth: '680px',
          height: '85vh',
          maxHeight: '760px',
          backgroundColor: '#FFFFFF',
          borderRadius: '24px',
          border: '1px solid rgba(89, 102, 232, 0.18)',
          boxShadow: '0 24px 64px -12px rgba(32, 33, 31, 0.22), 0 0 1px 1px rgba(89, 102, 232, 0.2)',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          animation: 'modalSlideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
        }}
        onClick={e => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div 
          style={{
            padding: '18px 24px',
            borderBottom: '1px solid var(--color-subtle-border)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            background: 'linear-gradient(135deg, rgba(233, 237, 255, 0.6) 0%, rgba(255, 255, 255, 0.95) 100%)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div 
              style={{
                width: '42px',
                height: '42px',
                borderRadius: '50%',
                backgroundColor: 'var(--color-pale-lavender)',
                border: '1.5px solid var(--color-indigo)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--color-indigo)',
                position: 'relative'
              }}
            >
              <MessageSquareHeart size={22} />
              <span 
                style={{
                  position: 'absolute',
                  bottom: '1px',
                  right: '1px',
                  width: '10px',
                  height: '10px',
                  borderRadius: '50%',
                  backgroundColor: '#2E7D32',
                  border: '2px solid #FFF'
                }} 
              />
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--color-graphite)' }}>
                  De-escalation & Therapy Lounge
                </h3>
                <span className="chip chip-lavender" style={{ fontSize: '0.68rem', padding: '2px 8px' }}>
                  <Sparkles size={11} />
                  <span>Gemini 3.8 CBT</span>
                </span>
              </div>
              <p style={{ fontSize: '0.80rem', color: 'var(--color-muted-slate)' }}>
                Case Context: "{currentCase.title || currentCase.message?.slice(0, 30)}"
              </p>
            </div>
          </div>

          <button 
            onClick={onClose}
            aria-label="Close therapy lounge"
            style={{
              background: 'none',
              border: 'none',
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              color: 'var(--color-muted-slate)',
              backgroundColor: 'rgba(32, 33, 31, 0.05)',
              transition: 'background-color 0.15s ease'
            }}
            onMouseEnter={e => e.currentTarget.style.backgroundColor = 'rgba(32, 33, 31, 0.10)'}
            onMouseLeave={e => e.currentTarget.style.backgroundColor = 'rgba(32, 33, 31, 0.05)'}
          >
            <X size={18} />
          </button>
        </div>

        {/* Message Conversation Stream */}
        <div 
          style={{
            flex: 1,
            overflowY: 'auto',
            padding: '24px',
            display: 'flex',
            flexDirection: 'column',
            gap: '18px',
            backgroundColor: '#FCFBFA'
          }}
        >
          {messages.map((m, idx) => {
            const isUser = m.role === 'user';
            return (
              <div 
                key={idx}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: isUser ? 'flex-end' : 'flex-start',
                  maxWidth: '85%',
                  alignSelf: isUser ? 'flex-end' : 'flex-start'
                }}
              >
                <div 
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    marginBottom: '4px',
                    fontSize: '0.72rem',
                    color: 'var(--color-muted-slate)'
                  }}
                >
                  {isUser ? <User size={12} /> : <HeartHandshake size={12} color="var(--color-indigo)" />}
                  <span>{isUser ? 'You' : 'Cognitive Counselor'}</span>
                  <span>•</span>
                  <span>{m.timestamp}</span>
                </div>

                <div 
                  style={{
                    padding: '14px 18px',
                    borderRadius: isUser ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
                    backgroundColor: isUser ? 'var(--color-graphite)' : '#FFFFFF',
                    color: isUser ? '#FFFFFF' : 'var(--color-graphite)',
                    border: isUser ? 'none' : '1px solid rgba(89, 102, 232, 0.14)',
                    boxShadow: isUser 
                      ? '0 4px 12px rgba(32, 33, 31, 0.15)' 
                      : '0 4px 16px rgba(89, 102, 232, 0.06)',
                    fontSize: '0.92rem',
                    lineHeight: 1.6,
                    whiteSpace: 'pre-wrap'
                  }}
                >
                  {m.content}

                  {!isUser && (
                    <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '10px', gap: '8px' }}>
                      <button
                        onClick={() => handleCopyText(m.content, idx)}
                        style={{
                          background: 'none',
                          border: 'none',
                          cursor: 'pointer',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '4px',
                          fontSize: '0.72rem',
                          color: copiedIndex === idx ? '#2E7D32' : 'var(--color-muted-slate)',
                          padding: '2px 6px',
                          borderRadius: '6px',
                          backgroundColor: copiedIndex === idx ? '#E8F5E9' : 'rgba(32, 33, 31, 0.04)'
                        }}
                      >
                        {copiedIndex === idx ? <Check size={12} /> : <Copy size={12} />}
                        <span>{copiedIndex === idx ? 'Copied' : 'Copy'}</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}

          {isTyping && (
            <div 
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '12px 18px',
                borderRadius: '18px',
                backgroundColor: '#FFFFFF',
                border: '1px solid rgba(89, 102, 232, 0.12)',
                alignSelf: 'flex-start'
              }}
            >
              <RefreshCw size={14} className="animate-spin" color="var(--color-indigo)" />
              <span style={{ fontSize: '0.84rem', color: 'var(--color-muted-slate)' }}>
                Counselor is reflecting on your thoughts...
              </span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Quick Question Chips */}
        <div 
          style={{
            padding: '10px 20px',
            backgroundColor: '#FAF8F5',
            borderTop: '1px solid var(--color-subtle-border)',
            display: 'flex',
            gap: '8px',
            overflowX: 'auto',
            whiteSpace: 'nowrap'
          }}
        >
          {quickPrompts.map((q, idx) => (
            <button
              key={idx}
              onClick={() => handleSendMessage(q)}
              disabled={isTyping}
              style={{
                padding: '6px 12px',
                borderRadius: '9999px',
                border: '1px solid rgba(89, 102, 232, 0.18)',
                backgroundColor: '#FFFFFF',
                color: 'var(--color-indigo)',
                fontSize: '0.78rem',
                fontWeight: 600,
                cursor: 'pointer',
                flexShrink: 0,
                transition: 'all 0.15s ease'
              }}
              onMouseEnter={e => {
                e.currentTarget.style.backgroundColor = 'var(--color-pale-lavender)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.backgroundColor = '#FFFFFF';
              }}
            >
              {q}
            </button>
          ))}
        </div>

        {/* Message Input Bar */}
        <div 
          style={{
            padding: '16px 20px',
            borderTop: '1px solid var(--color-subtle-border)',
            backgroundColor: '#FFFFFF',
            display: 'flex',
            alignItems: 'center',
            gap: '12px'
          }}
        >
          <input
            type="text"
            value={inputValue}
            onChange={e => setInputValue(e.target.value)}
            onKeyDown={e => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSendMessage();
              }
            }}
            placeholder="Type your thought, worry, or draft text to test..."
            style={{
              flex: 1,
              padding: '12px 18px',
              borderRadius: '9999px',
              border: '1px solid var(--color-subtle-border)',
              backgroundColor: '#FAF8F5',
              fontSize: '0.92rem',
              outline: 'none',
              color: 'var(--color-graphite)'
            }}
            onFocus={e => e.currentTarget.style.borderColor = 'var(--color-indigo)'}
            onBlur={e => e.currentTarget.style.borderColor = 'var(--color-subtle-border)'}
          />

          <button
            onClick={() => handleSendMessage()}
            disabled={!inputValue.trim() || isTyping}
            style={{
              width: '44px',
              height: '44px',
              borderRadius: '50%',
              backgroundColor: inputValue.trim() ? 'var(--color-indigo)' : 'rgba(32, 33, 31, 0.10)',
              color: '#FFFFFF',
              border: 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: inputValue.trim() && !isTyping ? 'pointer' : 'not-allowed',
              transition: 'all 0.2s ease',
              flexShrink: 0
            }}
          >
            <Send size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
