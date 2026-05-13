// Auth Screens v2 — white/pastel medical style

const { useState } = React;

/* ── Welcome / Onboarding ── */
const slides = [
  {
    emoji: '🛡️',
    tileBg: '#DFF0FA', tileFg: '#1A7EAF',
    title: 'Your Health,\nSimplified',
    sub: 'Access your insurance benefits and coverage details — anytime, anywhere.',
  },
  {
    emoji: '👨‍⚕️',
    tileBg: '#D7F5EE', tileFg: '#0E9B72',
    title: 'Doctor on\nDemand',
    sub: 'Connect with a licensed physician via video or voice call in under 2 minutes.',
  },
  {
    emoji: '💳',
    tileBg: '#EDE9FB', tileFg: '#6B4FCF',
    title: 'Instant\nE-Card Access',
    sub: 'Your digital insurance card is always with you. Share it at any clinic or hospital.',
  },
];

function WelcomeScreen({ onDone }) {
  const [idx, setIdx] = useState(0);
  const slide = slides[idx];

  return (
    <div style={{ display:'flex', flexDirection:'column', height:'100%', background:T.bg, fontFamily:T.fontSans }}>
      {/* Top illustration area */}
      <div style={{
        flex: 1, display:'flex', flexDirection:'column',
        alignItems:'center', justifyContent:'center',
        padding: '32px 32px 0',
      }}>
        {/* Big pastel icon tile */}
        <div style={{
          width: 120, height: 120, borderRadius: 32,
          background: slide.tileBg,
          display:'flex', alignItems:'center', justifyContent:'center',
          fontSize: 52, marginBottom: 40,
          boxShadow: `0 16px 48px ${slide.tileBg}`,
          transition: 'background 0.4s',
        }}>{slide.emoji}</div>

        <h1 style={{
          fontSize: 32, fontWeight: 800, color: T.textPrimary,
          textAlign:'center', lineHeight: 1.15, marginBottom: 14,
          letterSpacing: '-0.6px', whiteSpace:'pre-line',
        }}>{slide.title}</h1>
        <p style={{
          fontSize: 15, color: T.textSecondary, textAlign:'center',
          lineHeight: 1.65, maxWidth: 280,
        }}>{slide.sub}</p>
      </div>

      {/* Bottom controls */}
      <div style={{ padding:'32px 28px 40px', display:'flex', flexDirection:'column', alignItems:'center', gap:24 }}>
        {/* Dots */}
        <div style={{ display:'flex', gap:6 }}>
          {slides.map((_,i) => (
            <div key={i} onClick={() => setIdx(i)} style={{
              height: 6, borderRadius:3,
              width: i===idx ? 22 : 6,
              background: i===idx ? T.primary : T.border,
              cursor:'pointer', transition:'width 0.3s, background 0.3s',
            }}/>
          ))}
        </div>

        <button onClick={() => idx < slides.length-1 ? setIdx(idx+1) : onDone()} style={{
          width:'100%', height:54, background:T.primary,
          color:'white', border:'none', borderRadius:T.radiusPill,
          fontSize:16, fontWeight:700, cursor:'pointer', fontFamily:T.fontSans,
          boxShadow:`0 8px 24px ${T.primary}44`,
        }}>
          {idx < slides.length-1 ? 'Continue →' : 'Get Started'}
        </button>
        {idx < slides.length-1 && (
          <button onClick={onDone} style={{
            background:'none', border:'none', color:T.textTertiary,
            fontSize:14, cursor:'pointer', fontFamily:T.fontSans,
          }}>Skip</button>
        )}
      </div>
    </div>
  );
}

/* ── Login Screen ── */
function LoginScreen({ onLogin, onForgot, onHowToAccess }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = () => {
    if (!email || !password) { setError('Please fill in all fields.'); return; }
    setError(''); setLoading(true);
    setTimeout(() => { setLoading(false); onLogin(); }, 1000);
  };

  const inp = {
    width:'100%', height:50, borderRadius:T.radiusInput,
    border:`1.5px solid ${T.border}`, background:T.bgAlt,
    padding:'0 16px', fontSize:15, fontFamily:T.fontSans,
    color:T.textPrimary, outline:'none', boxSizing:'border-box',
  };

  return (
    <div style={{ display:'flex', flexDirection:'column', height:'100%', background:T.bg, fontFamily:T.fontSans, overflowY:'auto' }}>
      <div style={{ padding:'48px 24px 24px' }}>
        {/* Logo mark */}
        <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:36 }}>
          <div style={{
            width:40, height:40, borderRadius:12, background:T.primaryLight,
            display:'flex', alignItems:'center', justifyContent:'center', fontSize:20,
          }}>🛡️</div>
          <span style={{ fontSize:20, fontWeight:800, color:T.textPrimary, letterSpacing:'-0.3px' }}>
            Willis<span style={{ color:T.primary }}>App</span>
          </span>
        </div>

        <h2 style={{ fontSize:28, fontWeight:800, color:T.textPrimary, marginBottom:4, letterSpacing:'-0.5px' }}>
          Welcome back 👋
        </h2>
        <p style={{ fontSize:14.5, color:T.textSecondary, marginBottom:28 }}>
          Sign in to access your health benefits
        </p>

        {error && (
          <div style={{ background:T.dangerLight, borderRadius:10, padding:'10px 14px', color:T.danger, fontSize:13.5, marginBottom:16 }}>
            {error}
          </div>
        )}

        <div style={{ display:'flex', flexDirection:'column', gap:14 }}>
          <div>
            <label style={{ fontSize:13, fontWeight:600, color:T.textSecondary, display:'block', marginBottom:6 }}>Email or Username</label>
            <input style={inp} type="email" placeholder="sarah@example.com"
              value={email} onChange={e=>setEmail(e.target.value)}/>
          </div>

          <div>
            <div style={{ display:'flex', justifyContent:'space-between', marginBottom:6 }}>
              <label style={{ fontSize:13, fontWeight:600, color:T.textSecondary }}>Password</label>
              <button onClick={onForgot} style={{ background:'none', border:'none', color:T.primary, fontSize:13, cursor:'pointer', fontFamily:T.fontSans, fontWeight:600 }}>
                Forgot?
              </button>
            </div>
            <div style={{ position:'relative' }}>
              <input style={{ ...inp, paddingRight:44 }}
                type={showPw?'text':'password'} placeholder="••••••••"
                value={password} onChange={e=>setPassword(e.target.value)}/>
              <button onClick={()=>setShowPw(!showPw)} style={{
                position:'absolute', right:14, top:'50%', transform:'translateY(-50%)',
                background:'none', border:'none', cursor:'pointer', color:T.textTertiary,
                display:'flex', padding:0,
              }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  {showPw
                    ? <><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></>
                    : <><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/><path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/><line x1="1" y1="1" x2="23" y2="23"/></>
                  }
                </svg>
              </button>
            </div>
          </div>

          <button onClick={handleLogin} disabled={loading} style={{
            height:52, borderRadius:T.radiusPill, background:T.primary,
            color:'white', border:'none', fontSize:16, fontWeight:700,
            cursor:loading?'default':'pointer', fontFamily:T.fontSans,
            marginTop:4, boxShadow:`0 6px 20px ${T.primary}44`,
            display:'flex', alignItems:'center', justifyContent:'center', gap:8,
            transition:'opacity 0.2s', opacity:loading?0.75:1,
          }}>
            {loading
              ? <div style={{ width:20, height:20, borderRadius:'50%', border:'2px solid white', borderTopColor:'transparent', animation:'spin 0.7s linear infinite' }}/>
              : 'Sign In →'
            }
          </button>
        </div>

        {/* How to access */}
        <button onClick={onHowToAccess} style={{
          marginTop:20, width:'100%',
          background:T.bgAlt, border:`1.5px solid ${T.border}`,
          borderRadius:14, padding:'13px 16px',
          display:'flex', alignItems:'center', gap:12,
          cursor:'pointer', fontFamily:T.fontSans, textAlign:'left',
        }}>
          <div style={{
            width:38, height:38, borderRadius:11, background:T.primaryLight,
            display:'flex', alignItems:'center', justifyContent:'center', fontSize:18, flexShrink:0,
          }}>❓</div>
          <div style={{ flex:1 }}>
            <div style={{ fontSize:14, fontWeight:700, color:T.textPrimary }}>How Do I Get Access?</div>
            <div style={{ fontSize:12.5, color:T.textSecondary, marginTop:1 }}>Learn how to register</div>
          </div>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={T.textTertiary} strokeWidth="2"><path d="M9 18l6-6-6-6"/></svg>
        </button>

        <p style={{ fontSize:12, color:T.textTertiary, textAlign:'center', marginTop:20, lineHeight:1.6 }}>
          By signing in, you agree to our <span style={{ color:T.primary, fontWeight:600 }}>Terms</span> and <span style={{ color:T.primary, fontWeight:600 }}>Privacy Policy</span>
        </p>
      </div>
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
    </div>
  );
}

/* ── Forgot Password ── */
function ForgotPasswordScreen({ onBack }) {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);

  return (
    <div style={{ display:'flex', flexDirection:'column', height:'100%', background:T.bg, fontFamily:T.fontSans }}>
      <div style={{ padding:'16px 20px' }}>
        <button onClick={onBack} style={{
          width:40, height:40, borderRadius:12, background:T.bgAlt,
          border:`1.5px solid ${T.border}`, cursor:'pointer',
          display:'flex', alignItems:'center', justifyContent:'center',
        }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={T.textPrimary} strokeWidth="2.5">
            <path d="M19 12H5M12 19l-7-7 7-7"/>
          </svg>
        </button>
      </div>

      <div style={{ flex:1, padding:'8px 28px', display:'flex', flexDirection:'column' }}>
        {!sent ? (
          <>
            <div style={{ textAlign:'center', marginBottom:32 }}>
              <div style={{
                width:80, height:80, borderRadius:24, background:T.primaryLight,
                display:'flex', alignItems:'center', justifyContent:'center',
                margin:'0 auto 20px', fontSize:36,
              }}>🔐</div>
              <h2 style={{ fontSize:26, fontWeight:800, color:T.textPrimary, marginBottom:8, letterSpacing:'-0.5px' }}>Forgot Password?</h2>
              <p style={{ fontSize:14.5, color:T.textSecondary, lineHeight:1.6 }}>Enter your email and we'll send you a reset link.</p>
            </div>
            <label style={{ fontSize:13, fontWeight:600, color:T.textSecondary, marginBottom:6, display:'block' }}>Email Address</label>
            <input type="email" placeholder="sarah@example.com"
              value={email} onChange={e=>setEmail(e.target.value)}
              style={{
                width:'100%', height:50, borderRadius:T.radiusInput,
                border:`1.5px solid ${T.border}`, background:T.bgAlt,
                padding:'0 16px', fontSize:15, fontFamily:T.fontSans,
                color:T.textPrimary, outline:'none', boxSizing:'border-box', marginBottom:20,
              }}/>
            <button onClick={()=>email&&setSent(true)} style={{
              height:52, borderRadius:T.radiusPill, background:email?T.primary:T.border,
              color:'white', border:'none', fontSize:16, fontWeight:700,
              cursor:email?'pointer':'default', fontFamily:T.fontSans,
            }}>Send Reset Link</button>
          </>
        ) : (
          <div style={{ flex:1, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', textAlign:'center' }}>
            <div style={{ fontSize:64, marginBottom:20 }}>✅</div>
            <h2 style={{ fontSize:24, fontWeight:800, color:T.textPrimary, marginBottom:8 }}>Check your inbox</h2>
            <p style={{ fontSize:14.5, color:T.textSecondary, lineHeight:1.6, maxWidth:260 }}>
              We sent a reset link to <strong>{email}</strong>. Expires in 15 min.
            </p>
            <button onClick={onBack} style={{
              marginTop:32, height:52, width:'100%', borderRadius:T.radiusPill,
              background:T.primary, color:'white', border:'none',
              fontSize:16, fontWeight:700, cursor:'pointer', fontFamily:T.fontSans,
            }}>Back to Sign In</button>
          </div>
        )}
      </div>
    </div>
  );
}

/* ── How to Get Access ── */
function HowToAccessScreen({ onBack }) {
  const steps = [
    { emoji:'🏢', title:'Check with Your Employer', desc:"WillisApp is provided through your employer's benefits program. Contact HR to confirm eligibility." },
    { emoji:'📧', title:'Receive Your Welcome Email', desc:"Once enrolled, you'll receive a welcome email with your unique registration code." },
    { emoji:'👤', title:'Create Your Account', desc:"Use your registration code to create your account with your employee ID and email." },
    { emoji:'📱', title:'Download & Login', desc:"Download the app, log in with your credentials, and access all your health benefits." },
  ];

  return (
    <div style={{ display:'flex', flexDirection:'column', height:'100%', background:T.bg, fontFamily:T.fontSans }}>
      <div style={{ padding:'16px 20px 0' }}>
        <button onClick={onBack} style={{
          width:40, height:40, borderRadius:12, background:T.bgAlt,
          border:`1.5px solid ${T.border}`, cursor:'pointer',
          display:'flex', alignItems:'center', justifyContent:'center',
        }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={T.textPrimary} strokeWidth="2.5">
            <path d="M19 12H5M12 19l-7-7 7-7"/>
          </svg>
        </button>
      </div>

      <div style={{ padding:'20px 20px 0' }}>
        <h2 style={{ fontSize:24, fontWeight:800, color:T.textPrimary, marginBottom:4 }}>How Do I Get Access?</h2>
        <p style={{ fontSize:14, color:T.textSecondary, marginBottom:24 }}>Follow these steps to get started</p>
      </div>

      <div style={{ flex:1, overflowY:'auto', padding:'0 20px 24px' }}>
        {steps.map((step,i)=>(
          <div key={i} style={{ display:'flex', gap:14, marginBottom:16 }}>
            <div style={{ display:'flex', flexDirection:'column', alignItems:'center' }}>
              <div style={{
                width:44, height:44, borderRadius:'50%',
                background:T.primaryLight, color:T.primary,
                display:'flex', alignItems:'center', justifyContent:'center',
                fontSize:13, fontWeight:800, flexShrink:0,
              }}>{i+1}</div>
              {i<steps.length-1 && <div style={{ width:2, flex:1, background:T.border, minHeight:20, margin:'4px 0' }}/>}
            </div>
            <div style={{
              flex:1, background:T.bgAlt, borderRadius:14,
              padding:'14px', marginBottom:12,
            }}>
              <div style={{ fontSize:14, fontWeight:700, color:T.textPrimary, marginBottom:3 }}>{step.emoji} {step.title}</div>
              <div style={{ fontSize:13, color:T.textSecondary, lineHeight:1.55 }}>{step.desc}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

Object.assign(window, { WelcomeScreen, LoginScreen, ForgotPasswordScreen, HowToAccessScreen });
