// AI ChatBot Screen — WillisApp Health Assistant

const { useState, useRef, useEffect } = React;

const SYSTEM_CONTEXT = `You are Willa, a friendly AI health insurance assistant for WillisApp. You help Sarah Anderson manage her health insurance.

Sarah's policy details:
- Plan: Lifestyle Plus, Network: Gold++
- Policy: MB3893939-9, Member since Jan 2026
- Company: Al Noor Consulting
- Status: ACTIVE, valid through 31 Dec 2026
- BenefitNet ID: 456321

Coverage limits & usage:
- Inpatient: AED 12,000 used of AED 150,000 (8%)
- Outpatient: AED 3,200 used of AED 20,000 (16%)
- Dental: AED 800 used of AED 5,000 (16%)
- Optical: AED 0 used of AED 3,000 (0%)
- Maternity: AED 0 used of AED 10,000 (0%)
- Deductible: 20% max AED 50

Recent claims:
- CLM-2024-003: AED 420, Approved (3 days ago)
- CLM-2024-002: AED 180, Approved (2 weeks ago)
- CLM-2024-001: AED 1,250, Approved (1 month ago)

Family members: Sarah (Principal), John (Spouse), Emma (Child)

Be warm, concise (2-3 short paragraphs max), and use specific numbers. Use emoji sparingly (1-2 per message). If asked about something not in your data, suggest they speak to support or visit a relevant section of the app. Never make up policy details beyond what's listed.`;

const QUICK_PROMPTS = [
  { emoji: '💰', text: "What's my remaining coverage?" },
  { emoji: '📋', text: 'Show my recent claims' },
  { emoji: '🦷', text: 'Is dental covered?' },
  { emoji: '👨‍⚕️', text: 'Find a cardiologist' },
  { emoji: '💳', text: "What's my deductible?" },
  { emoji: '👨‍👩‍👧', text: 'Who is on my policy?' },
];

function ChatBotScreen({ onBack }) {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: "Hi Sarah! 👋 I'm Willa, your health insurance assistant. I can help you check your coverage, claims, benefits, find providers, and more. What would you like to know?",
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, loading]);

  const send = async (text) => {
    const trimmed = (text || input).trim();
    if (!trimmed || loading) return;

    const newMessages = [...messages, { role: 'user', content: trimmed }];
    setMessages(newMessages);
    setInput('');
    setLoading(true);

    try {
      const apiMessages = [
        { role: 'user', content: SYSTEM_CONTEXT + '\n\nUser asks: ' + trimmed },
        ...newMessages.slice(1).map(m => ({ role: m.role, content: m.content })),
      ];
      const reply = await window.claude.complete({ messages: apiMessages });
      setMessages(m => [...m, { role: 'assistant', content: reply }]);
    } catch (err) {
      setMessages(m => [...m, {
        role: 'assistant',
        content: "Sorry, I couldn't reach the server right now. Please try again in a moment, or contact support at +971 4 201 1111.",
      }]);
    } finally {
      setLoading(false);
    }
  };

  const handleKey = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  };

  return (
    <div style={{ display:'flex', flexDirection:'column', height:'100%', background:T.bg, fontFamily:T.fontSans }}>
      {/* Header */}
      <div style={{
        display:'flex', alignItems:'center', gap:12,
        padding:'14px 20px 14px',
        borderBottom:`1px solid ${T.border}`, background:T.bg,
      }}>
        <BackBtn onBack={onBack}/>
        <div style={{ position:'relative', flexShrink:0 }}>
          <div style={{
            width:42, height:42, borderRadius:'50%',
            background:`linear-gradient(135deg, ${T.primary} 0%, ${T.primaryMid} 100%)`,
            display:'flex', alignItems:'center', justifyContent:'center',
            fontSize:20, color:'white',
          }}>🤖</div>
          <div style={{
            position:'absolute', bottom:0, right:0,
            width:11, height:11, borderRadius:'50%',
            background:T.success, border:'2px solid white',
          }}/>
        </div>
        <div style={{ flex:1 }}>
          <div style={{ fontSize:15, fontWeight:800, color:T.textPrimary }}>Willa</div>
          <div style={{ fontSize:11.5, color:T.success, fontWeight:600, display:'flex', alignItems:'center', gap:5 }}>
            <span style={{ width:6, height:6, borderRadius:'50%', background:T.success, display:'inline-block' }}/>
            AI Health Assistant · Online
          </div>
        </div>
        <button style={{
          width:36, height:36, borderRadius:10, background:T.bgAlt,
          border:`1.5px solid ${T.border}`, cursor:'pointer',
          display:'flex', alignItems:'center', justifyContent:'center', fontSize:15,
        }}>⋯</button>
      </div>

      {/* Messages */}
      <div ref={scrollRef} style={{
        flex:1, overflowY:'auto', padding:'16px 16px 8px',
        display:'flex', flexDirection:'column', gap:10,
      }}>
        {messages.map((msg, i) => (
          <Bubble key={i} role={msg.role} content={msg.content}/>
        ))}
        {loading && <TypingBubble/>}

        {/* Quick prompts (only show before first user message) */}
        {messages.length === 1 && !loading && (
          <div style={{ marginTop:8 }}>
            <div style={{ fontSize:11.5, fontWeight:700, color:T.textTertiary, textTransform:'uppercase', letterSpacing:'0.7px', marginBottom:10, paddingLeft:4 }}>
              Suggested
            </div>
            <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
              {QUICK_PROMPTS.map((q, i) => (
                <button key={i} onClick={()=>send(q.text)} style={{
                  background:T.bgAlt, border:`1.5px solid ${T.border}`,
                  borderRadius:14, padding:'11px 14px',
                  display:'flex', alignItems:'center', gap:10,
                  cursor:'pointer', fontFamily:T.fontSans, textAlign:'left',
                  transition:'all 0.15s',
                }}
                onMouseOver={e=>e.currentTarget.style.background=T.primaryLight}
                onMouseOut={e=>e.currentTarget.style.background=T.bgAlt}
                >
                  <span style={{ fontSize:18 }}>{q.emoji}</span>
                  <span style={{ fontSize:13.5, color:T.textPrimary, fontWeight:500, flex:1 }}>{q.text}</span>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={T.textTertiary} strokeWidth="2.5">
                    <path d="M9 18l6-6-6-6"/>
                  </svg>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Input bar */}
      <div style={{
        padding:'10px 16px 14px',
        borderTop:`1px solid ${T.border}`, background:T.bg,
      }}>
        <div style={{
          display:'flex', alignItems:'flex-end', gap:8,
          background:T.bgAlt, borderRadius:24,
          border:`1.5px solid ${T.border}`,
          padding:'6px 6px 6px 16px',
        }}>
          <textarea
            ref={inputRef}
            value={input}
            onChange={e=>setInput(e.target.value)}
            onKeyDown={handleKey}
            placeholder="Ask about your insurance..."
            rows={1}
            style={{
              flex:1, border:'none', background:'none', outline:'none',
              fontFamily:T.fontSans, fontSize:14, color:T.textPrimary,
              resize:'none', maxHeight:80, lineHeight:1.45, paddingTop:8, paddingBottom:8,
            }}
          />
          <button onClick={()=>send()} disabled={!input.trim() || loading} style={{
            width:38, height:38, borderRadius:'50%',
            background: input.trim() && !loading ? T.primary : T.border,
            color:'white', border:'none', flexShrink:0,
            cursor: input.trim() && !loading ? 'pointer':'default',
            display:'flex', alignItems:'center', justifyContent:'center',
            transition:'background 0.15s',
            boxShadow: input.trim() && !loading ? `0 4px 12px ${T.primary}55` : 'none',
          }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="22" y1="2" x2="11" y2="13"/>
              <polygon points="22 2 15 22 11 13 2 9 22 2"/>
            </svg>
          </button>
        </div>
        <div style={{ fontSize:10.5, color:T.textTertiary, textAlign:'center', marginTop:6 }}>
          Willa can make mistakes. Verify important details with support.
        </div>
      </div>
    </div>
  );
}

/* Message bubble */
function Bubble({ role, content }) {
  const isUser = role === 'user';
  return (
    <div style={{
      display:'flex', justifyContent:isUser?'flex-end':'flex-start',
      gap:8, alignItems:'flex-end',
    }}>
      {!isUser && (
        <div style={{
          width:28, height:28, borderRadius:'50%',
          background:`linear-gradient(135deg, ${T.primary} 0%, ${T.primaryMid} 100%)`,
          display:'flex', alignItems:'center', justifyContent:'center',
          fontSize:13, color:'white', flexShrink:0,
        }}>🤖</div>
      )}
      <div style={{
        maxWidth:'78%',
        background: isUser ? T.primary : T.bgAlt,
        color: isUser ? 'white' : T.textPrimary,
        borderRadius: isUser ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
        padding:'10px 14px',
        fontSize:13.5, lineHeight:1.55,
        whiteSpace:'pre-wrap', wordWrap:'break-word',
        boxShadow: isUser ? `0 2px 8px ${T.primary}33` : 'none',
      }}>{content}</div>
    </div>
  );
}

/* Typing indicator */
function TypingBubble() {
  return (
    <div style={{ display:'flex', gap:8, alignItems:'flex-end' }}>
      <div style={{
        width:28, height:28, borderRadius:'50%',
        background:`linear-gradient(135deg, ${T.primary} 0%, ${T.primaryMid} 100%)`,
        display:'flex', alignItems:'center', justifyContent:'center',
        fontSize:13, color:'white', flexShrink:0,
      }}>🤖</div>
      <div style={{
        background:T.bgAlt, borderRadius:'18px 18px 18px 4px',
        padding:'12px 16px', display:'flex', gap:4,
      }}>
        {[0,1,2].map(i=>(
          <div key={i} style={{
            width:7, height:7, borderRadius:'50%', background:T.textTertiary,
            animation:`typing 1.4s ${i*0.2}s infinite`,
          }}/>
        ))}
      </div>
      <style>{`
        @keyframes typing {
          0%, 60%, 100% { opacity: 0.3; transform: translateY(0); }
          30% { opacity: 1; transform: translateY(-4px); }
        }
      `}</style>
    </div>
  );
}

/* Floating Action Button — draggable, for use on Home screen */
function ChatFAB({ onClick }) {
  const [pos, setPos] = React.useState({ right: 18, bottom: 82 });
  const drag = React.useRef(null);

  function onPointerDown(e) {
    e.preventDefault();
    const btn = e.currentTarget.parentElement; // container div
    const parent = btn.offsetParent || btn.parentElement;
    const pW = parent.offsetWidth;
    const pH = parent.offsetHeight;
    drag.current = {
      startX: e.clientX,
      startY: e.clientY,
      origRight: pos.right,
      origBottom: pos.bottom,
      pW, pH,
      moved: false,
    };
    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);
  }

  function onPointerMove(e) {
    const d = drag.current;
    if (!d) return;
    const dx = e.clientX - d.startX;
    const dy = e.clientY - d.startY;
    if (Math.abs(dx) > 4 || Math.abs(dy) > 4) d.moved = true;
    const newRight = Math.max(8, Math.min(d.pW - 64, d.origRight - dx));
    const newBottom = Math.max(82, Math.min(d.pH - 64, d.origBottom - dy));
    setPos({ right: newRight, bottom: newBottom });
  }

  function onPointerUp(e) {
    const moved = drag.current?.moved;
    drag.current = null;
    window.removeEventListener('pointermove', onPointerMove);
    window.removeEventListener('pointerup', onPointerUp);
    if (!moved) onClick();
  }

  return (
    <div onPointerDown={onPointerDown} style={{
      position:'absolute', bottom: pos.bottom, right: pos.right,
      width:56, height:56, touchAction:'none', userSelect:'none',
      zIndex:50,
    }}>
      <button style={{
        width:'100%', height:'100%', borderRadius:'50%',
        background:`linear-gradient(135deg, ${T.primary} 0%, ${T.primaryMid} 100%)`,
        border:'none', cursor:'grab',
        display:'flex', alignItems:'center', justifyContent:'center',
        boxShadow:`0 8px 24px ${T.primary}66, 0 2px 6px rgba(0,0,0,0.12)`,
        fontFamily:T.fontSans,
        animation:'fabPulse 2.5s ease-in-out infinite',
      }}>
        <span style={{ fontSize:24, pointerEvents:'none' }}>🤖</span>
        <span style={{
          position:'absolute', top:-2, right:-2,
          width:14, height:14, borderRadius:'50%',
          background:'#34D399', border:'2px solid white',
          pointerEvents:'none',
        }}/>
      </button>
      <style>{`
        @keyframes fabPulse {
          0%, 100% { box-shadow: 0 8px 24px ${T.primary}66, 0 2px 6px rgba(0,0,0,0.12), 0 0 0 0 ${T.primary}66; }
          50% { box-shadow: 0 8px 24px ${T.primary}66, 0 2px 6px rgba(0,0,0,0.12), 0 0 0 12px ${T.primary}00; }
        }
      `}</style>
    </div>
  );
}

Object.assign(window, { ChatBotScreen, ChatFAB });
