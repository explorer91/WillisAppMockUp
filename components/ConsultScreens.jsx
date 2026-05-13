// Consult, Video Call, Messages, Rewards, Wellness screens v2 — white/pastel style

const { useState, useEffect } = React;

/* ── Doctor Consultation ── */
function ConsultScreen({ onBack, onConnect }) {
  const [lang, setLang] = useState('English');
  const [region, setRegion] = useState('Dubai');
  const [type, setType] = useState('Video');
  const [agreed, setAgreed] = useState(false);
  const [connecting, setConnecting] = useState(false);

  const handleConnect = () => {
    if (!agreed) return;
    setConnecting(true);
    setTimeout(() => { setConnecting(false); onConnect(type); }, 1800);
  };

  const ChipGroup = ({ label, options, value, onChange }) => (
    <div style={{ marginBottom:20 }}>
      <div style={{ fontSize:13.5, fontWeight:700, color:T.textPrimary, marginBottom:10 }}>{label}</div>
      <div style={{ display:'flex', gap:8, flexWrap:'wrap' }}>
        {options.map(opt=>(
          <button key={opt} onClick={()=>onChange(opt)} style={{
            height:36, padding:'0 18px', borderRadius:100,
            border:`1.5px solid ${value===opt?T.primary:T.border}`,
            background:value===opt?T.primaryLight:T.bgAlt,
            color:value===opt?T.primary:T.textSecondary,
            fontSize:13.5, fontWeight:value===opt?700:500,
            cursor:'pointer', fontFamily:T.fontSans, transition:'all 0.15s',
          }}>{opt}</button>
        ))}
      </div>
    </div>
  );

  return (
    <div style={{ display:'flex', flexDirection:'column', height:'100%', background:T.bg, fontFamily:T.fontSans }}>
      <PageHeader title="Call a Doctor" onBack={onBack}/>

      <div style={{ flex:1, overflowY:'auto', padding:'0 20px' }}>
        {/* Available banner */}
        <div style={{
          background:T.successLight, borderRadius:12, padding:'10px 14px',
          display:'flex', alignItems:'center', gap:10, marginBottom:22,
        }}>
          <div style={{ width:8, height:8, borderRadius:'50%', background:T.success, flexShrink:0 }}/>
          <span style={{ fontSize:13.5, color:T.success, fontWeight:700 }}>12 doctors available now</span>
          <span style={{ fontSize:12, color:'#166534', marginLeft:'auto' }}>Avg. wait ~2 min</span>
        </div>

        <ChipGroup label="Language Preference" options={['English','العربية','Hindi']} value={lang} onChange={setLang}/>
        <ChipGroup label="Consultation Region" options={['Dubai','Abu Dhabi','Others']} value={region} onChange={setRegion}/>
        <ChipGroup label="Communication Type" options={['Voice','Video']} value={type} onChange={setType}/>

        {/* Type preview card */}
        <div style={{
          background:T.bgAlt, borderRadius:14, padding:'14px',
          display:'flex', gap:12, marginBottom:22,
          border:`1.5px solid ${T.border}`,
        }}>
          <div style={{
            width:46, height:46, borderRadius:13,
            background:type==='Video'?T.primaryLight:T.accentLight,
            display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0, fontSize:22,
          }}>{type==='Video'?'📹':'🎙️'}</div>
          <div>
            <div style={{ fontSize:14, fontWeight:700, color:T.textPrimary }}>{type} Consultation</div>
            <div style={{ fontSize:12.5, color:T.textSecondary, marginTop:2 }}>
              {type==='Video'?'Face-to-face video call with your doctor':'Audio-only consultation for privacy'}
            </div>
          </div>
        </div>

        {/* Consent */}
        <label style={{ display:'flex', gap:12, alignItems:'flex-start', cursor:'pointer', marginBottom:24 }}>
          <div onClick={()=>setAgreed(!agreed)} style={{
            width:20, height:20, borderRadius:6, marginTop:1,
            border:`2px solid ${agreed?T.primary:T.border}`,
            background:agreed?T.primary:'none',
            display:'flex', alignItems:'center', justifyContent:'center',
            flexShrink:0, cursor:'pointer', transition:'all 0.15s',
          }}>
            {agreed&&<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg>}
          </div>
          <span style={{ fontSize:13, color:T.textSecondary, lineHeight:1.55 }}>
            By connecting, I agree to recording for quality assurance.{' '}
            <span style={{ color:T.primary, fontWeight:600 }}>Read more.</span>
          </span>
        </label>
      </div>

      <div style={{ padding:'12px 20px 16px', borderTop:`1px solid ${T.border}` }}>
        <button onClick={handleConnect} disabled={!agreed||connecting} style={{
          width:'100%', height:54, borderRadius:T.radiusPill,
          background:agreed?T.primary:T.border,
          color:'white', border:'none', fontSize:16, fontWeight:700,
          cursor:agreed?'pointer':'default', fontFamily:T.fontSans,
          boxShadow:agreed?`0 8px 24px ${T.primary}44`:'none',
          display:'flex', alignItems:'center', justifyContent:'center', gap:8,
          transition:'all 0.2s',
        }}>
          {connecting?(
            <>
              <div style={{ width:20, height:20, borderRadius:'50%', border:'2px solid white', borderTopColor:'transparent', animation:'spin 0.7s linear infinite' }}/>
              Connecting...
            </>
          ):`Connect via ${type}`}
        </button>
      </div>
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
    </div>
  );
}

/* ── Live Video Call ── */
function VideoCallScreen({ onEnd, callType='Video' }) {
  const [elapsed, setElapsed] = useState(0);
  const [muted, setMuted] = useState(false);
  const [camOff, setCamOff] = useState(false);
  const [speakerOff, setSpeakerOff] = useState(false);

  useEffect(()=>{
    const t = setInterval(()=>setElapsed(e=>e+1),1000);
    return ()=>clearInterval(t);
  },[]);

  const fmt = s=>`${String(Math.floor(s/60)).padStart(2,'0')}:${String(s%60).padStart(2,'0')}`;

  return (
    <div style={{
      height:'100%', background:'#0a1628',
      display:'flex', flexDirection:'column', fontFamily:T.fontSans,
      position:'relative', overflow:'hidden',
    }}>
      {/* Doctor area */}
      <div style={{
        flex:1, display:'flex', alignItems:'center', justifyContent:'center',
        background:'linear-gradient(160deg, #0f2040 0%, #061020 100%)',
        position:'relative',
      }}>
        <div style={{
          width:100, height:100, borderRadius:'50%',
          background:'rgba(255,255,255,0.07)',
          display:'flex', alignItems:'center', justifyContent:'center',
          border:'2px solid rgba(255,255,255,0.12)', fontSize:44,
        }}>👨‍⚕️</div>

        <div style={{ position:'absolute', bottom:130, left:0, right:0, textAlign:'center' }}>
          <div style={{ fontSize:18, fontWeight:700, color:'white' }}>Dr. Ahmed Hassan</div>
          <div style={{ fontSize:13, color:'rgba(255,255,255,0.55)', marginTop:2 }}>Cardiology Specialist</div>
        </div>

        {/* Self preview */}
        <div style={{
          position:'absolute', top:16, right:16,
          width:80, height:100, borderRadius:14,
          background:'rgba(255,255,255,0.08)',
          border:'1.5px solid rgba(255,255,255,0.15)',
          display:'flex', alignItems:'center', justifyContent:'center', fontSize:28,
        }}>{camOff?'🚫':'🙋'}</div>

        {/* Timer */}
        <div style={{
          position:'absolute', top:16, left:'50%', transform:'translateX(-50%)',
          background:'rgba(0,0,0,0.45)', borderRadius:100, padding:'5px 16px',
          backdropFilter:'blur(8px)',
        }}>
          <span style={{ fontSize:14, fontWeight:700, color:'white', letterSpacing:'1px' }}>{fmt(elapsed)}</span>
        </div>
      </div>

      {/* Controls */}
      <div style={{
        background:'#0f1e33', padding:'20px 24px 28px',
        borderRadius:'24px 24px 0 0',
      }}>
        <div style={{ display:'flex', justifyContent:'space-around', alignItems:'center' }}>
          {[
            { label:muted?'Unmute':'Mute', emoji:muted?'🔇':'🎙️', action:()=>setMuted(!muted), active:muted },
            callType==='Video'?{ label:'Camera', emoji:camOff?'📵':'📹', action:()=>setCamOff(!camOff), active:camOff }:null,
            { label:'Speaker', emoji:speakerOff?'🔕':'🔊', action:()=>setSpeakerOff(!speakerOff), active:speakerOff },
          ].filter(Boolean).map((btn,i)=>(
            <div key={i} style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:6 }}>
              <button onClick={btn.action} style={{
                width:54, height:54, borderRadius:'50%',
                background:btn.active?'rgba(220,38,38,0.2)':'rgba(255,255,255,0.1)',
                border:`1.5px solid ${btn.active?'rgba(220,38,38,0.4)':'rgba(255,255,255,0.15)'}`,
                cursor:'pointer', fontSize:22, display:'flex', alignItems:'center', justifyContent:'center',
              }}>{btn.emoji}</button>
              <span style={{ fontSize:11, color:'rgba(255,255,255,0.6)', fontFamily:T.fontSans }}>{btn.label}</span>
            </div>
          ))}

          {/* End call */}
          <div style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:6 }}>
            <button onClick={onEnd} style={{
              width:64, height:64, borderRadius:'50%',
              background:T.danger, border:'none', cursor:'pointer', fontSize:26,
              display:'flex', alignItems:'center', justifyContent:'center',
              boxShadow:`0 6px 20px ${T.danger}66`,
            }}>📵</button>
            <span style={{ fontSize:11, color:'rgba(255,255,255,0.6)', fontFamily:T.fontSans }}>End Call</span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Messages Screen ── */
function MessagesScreen({ onBack }) {
  const [filter, setFilter] = useState('All');

  const msgs = [
    { id:1, title:'Annual Health Screening Available', body:'Book your free comprehensive health screening at any partner clinic.', time:'2h ago', read:false, emoji:'🔔', ...T.tileBlue },
    { id:2, title:'New Wellness Program Launching', body:'Join our wellness initiative to earn rewards for healthy habits.', time:'5h ago', read:false, emoji:'🌿', ...T.tileTeal },
    { id:3, title:'Policy Renewal Reminder', body:'Your policy will expire in 30 days. Review your coverage options.', time:'1d ago', read:true, emoji:'📋', ...T.tileYellow },
    { id:4, title:'Claim Processed Successfully', body:'Your claim #CLM-2024-003 for AED 420 has been approved.', time:'3d ago', read:true, emoji:'✅', ...T.tileTeal },
    { id:5, title:'New Network Provider Added', body:'Aster Hospital Jumeirah is now in your Gold++ network.', time:'1w ago', read:true, emoji:'🏥', ...T.tileBlue },
  ];

  const visible = filter==='All' ? msgs : msgs.filter(m=>!m.read);
  const unread = msgs.filter(m=>!m.read).length;

  return (
    <div style={{ display:'flex', flexDirection:'column', height:'100%', background:T.bg, fontFamily:T.fontSans }}>
      <div style={{ borderBottom:`1px solid ${T.border}` }}>
        <div style={{ display:'flex', alignItems:'center', gap:10, padding:'16px 20px 12px' }}>
          <BackBtn onBack={onBack}/>
          <span style={{ fontSize:17, fontWeight:800, color:T.textPrimary }}>Messages</span>
          {unread>0&&(
            <div style={{
              background:T.danger, color:'white', fontSize:11, fontWeight:700,
              width:20, height:20, borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center',
            }}>{unread}</div>
          )}
        </div>
        <div style={{ display:'flex', gap:8, padding:'0 20px 12px' }}>
          {['All','Unread'].map(f=>(
            <button key={f} onClick={()=>setFilter(f)} style={{
              height:30, padding:'0 16px', borderRadius:100,
              border:`1.5px solid ${filter===f?T.primary:T.border}`,
              background:filter===f?T.primaryLight:'none',
              color:filter===f?T.primary:T.textSecondary,
              fontSize:13, fontWeight:filter===f?700:500,
              cursor:'pointer', fontFamily:T.fontSans,
            }}>{f}{f==='Unread'&&unread>0?` (${unread})`:''}</button>
          ))}
        </div>
      </div>

      <div style={{ flex:1, overflowY:'auto', padding:'12px 20px' }}>
        <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
          {visible.map(msg=>(
            <div key={msg.id} style={{
              background:T.bgAlt, borderRadius:14, padding:'14px',
              cursor:'pointer',
              borderLeft:!msg.read?`3px solid ${msg.fg}`:'3px solid transparent',
            }}>
              <div style={{ display:'flex', gap:12 }}>
                <div style={{
                  width:40, height:40, borderRadius:12, flexShrink:0,
                  background:msg.bg,
                  display:'flex', alignItems:'center', justifyContent:'center', fontSize:18,
                }}>{msg.emoji}</div>
                <div style={{ flex:1 }}>
                  <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start' }}>
                    <div style={{ fontSize:13.5, fontWeight:msg.read?500:700, color:T.textPrimary, flex:1, paddingRight:8 }}>
                      {msg.title}
                    </div>
                    {!msg.read&&<div style={{ width:8, height:8, borderRadius:'50%', background:msg.fg, marginTop:4, flexShrink:0 }}/>}
                  </div>
                  <div style={{ fontSize:12.5, color:T.textSecondary, marginTop:3, lineHeight:1.5 }}>{msg.body}</div>
                  <div style={{ fontSize:11.5, color:T.textTertiary, marginTop:5 }}>{msg.time}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── Rewards Screen ── */
function RewardsScreen({ onBack }) {
  const [tab, setTab] = useState('For you');
  const offers = [
    { title:'Fitness Coaching', cat:'Wellness', disc:'15% OFF', emoji:'🏋️', ...T.tileBlue },
    { title:'Personal Stylist', cat:'Lifestyle', disc:'20% OFF', emoji:'👗', ...T.tilePink },
    { title:'Yoga Classes', cat:'Wellness', disc:'25% OFF', emoji:'🧘', ...T.tileTeal },
    { title:'Spa & Wellness', cat:'Lifestyle', disc:'10% OFF', emoji:'💆', ...T.tilePurple },
    { title:'Nutritionist', cat:'Wellness', disc:'30% OFF', emoji:'🥗', ...T.tileYellow },
    { title:'EntertainER', cat:'Lifestyle', disc:'BOGO', emoji:'🎭', ...T.tileOrange },
  ];
  const filtered = tab==='For you' ? offers : offers.filter(o=>o.cat===tab);

  return (
    <div style={{ display:'flex', flexDirection:'column', height:'100%', background:T.bg, fontFamily:T.fontSans }}>
      <PageHeader title="Rewards" onBack={onBack}/>

      {/* Points card */}
      <div style={{ padding:'0 20px 16px' }}>
        <div style={{
          background:T.tileYellow.bg, borderRadius:18, padding:'16px',
          display:'flex', alignItems:'center', justifyContent:'space-between',
        }}>
          <div style={{ display:'flex', alignItems:'center', gap:12 }}>
            <div style={{ fontSize:40 }}>🏆</div>
            <div>
              <div style={{ fontSize:26, fontWeight:800, color:T.textPrimary }}>1,250</div>
              <div style={{ fontSize:12, color:T.textSecondary }}>Wellness Points</div>
            </div>
          </div>
          <div style={{
            background:T.tileYellow.fg, color:'white',
            fontSize:13, fontWeight:700, padding:'6px 14px', borderRadius:100,
          }}>★ Gold</div>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ padding:'0 20px 12px', display:'flex', gap:8 }}>
        {['For you','Wellness','Lifestyle'].map(t=>(
          <button key={t} onClick={()=>setTab(t)} style={{
            height:32, padding:'0 16px', borderRadius:100,
            border:`1.5px solid ${tab===t?T.primary:T.border}`,
            background:tab===t?T.primaryLight:'none',
            color:tab===t?T.primary:T.textSecondary,
            fontSize:13, fontWeight:tab===t?700:500,
            cursor:'pointer', fontFamily:T.fontSans,
          }}>{t}</button>
        ))}
      </div>

      <div style={{ flex:1, overflowY:'auto', padding:'0 20px 16px' }}>
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:10 }}>
          {filtered.map((offer,i)=>(
            <div key={i} style={{
              background:offer.bg, borderRadius:16, overflow:'hidden', cursor:'pointer',
            }}>
              <div style={{
                height:80, display:'flex', alignItems:'center', justifyContent:'center',
                fontSize:40, position:'relative',
              }}>
                {offer.emoji}
                <div style={{
                  position:'absolute', bottom:8, right:8,
                  background:offer.fg, color:'white',
                  fontSize:10, fontWeight:800, padding:'3px 8px', borderRadius:6,
                }}>{offer.disc}</div>
              </div>
              <div style={{ padding:'10px 12px 14px' }}>
                <div style={{ fontSize:13, fontWeight:700, color:T.textPrimary, marginBottom:2 }}>{offer.title}</div>
                <div style={{ fontSize:11, color:T.textSecondary, marginBottom:6 }}>{offer.cat}</div>
                <div style={{ fontSize:12, color:offer.fg, fontWeight:700 }}>View Details →</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── Wellness Screen ── */
function WellnessScreen({ onBack }) {
  const [tab, setTab] = useState('Tips');
  const tips = [
    { emoji:'💧', title:'Stay Hydrated', body:'Drink at least 3 liters daily. Avoid sugary drinks; opt for coconut water in UAE heat.' },
    { emoji:'🩺', title:'Annual Screening', body:'DHA recommends annual checks. Book your free screening at any government health center.' },
    { emoji:'☀️', title:'Vitamin D & Sun Safety', body:'Get 15 min of morning sun. Use SPF 30+ sunscreen and reapply every 2 hours outdoors.' },
    { emoji:'🧠', title:'Mental Wellbeing', body:'Practice 10 minutes of mindfulness daily. Use our partner app for guided meditation.' },
  ];

  return (
    <div style={{ display:'flex', flexDirection:'column', height:'100%', background:T.bg, fontFamily:T.fontSans }}>
      <PageHeader title="Wellness Hub" onBack={onBack}/>

      {/* Points banner */}
      <div style={{ padding:'0 20px 16px' }}>
        <div style={{
          background:T.tilePink.bg, borderRadius:16, padding:'14px 16px',
          display:'flex', justifyContent:'space-between', alignItems:'center',
        }}>
          <div style={{ display:'flex', alignItems:'center', gap:10 }}>
            <span style={{ fontSize:28 }}>🏅</span>
            <div>
              <div style={{ fontSize:18, fontWeight:800, color:T.textPrimary }}>1,250 Points</div>
              <div style={{ fontSize:12, color:T.textSecondary }}>Gold tier member</div>
            </div>
          </div>
          <button style={{
            height:32, padding:'0 14px', borderRadius:100,
            background:T.tilePink.fg, color:'white',
            border:'none', fontSize:12.5, fontWeight:700,
            cursor:'pointer', fontFamily:T.fontSans,
          }}>Redeem</button>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display:'flex', borderBottom:`1px solid ${T.border}`, padding:'0 20px' }}>
        {['Tips','Partners'].map(t=>(
          <button key={t} onClick={()=>setTab(t)} style={{
            flex:1, background:'none', border:'none', cursor:'pointer',
            padding:'10px 0', fontFamily:T.fontSans,
            fontSize:13.5, fontWeight:tab===t?800:500,
            color:tab===t?T.primary:T.textSecondary,
            borderBottom:tab===t?`2.5px solid ${T.primary}`:'2.5px solid transparent',
          }}>{t}</button>
        ))}
      </div>

      <div style={{ flex:1, overflowY:'auto', padding:'16px 20px' }}>
        {tab==='Tips' ? (
          <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
            {tips.map((tip,i)=>{
              const palettes=[T.tileBlue,T.tileTeal,T.tileYellow,T.tilePink];
              const p=palettes[i%4];
              return (
                <div key={i} style={{
                  background:p.bg, borderRadius:14, padding:'14px 16px',
                  display:'flex', gap:14, alignItems:'flex-start',
                }}>
                  <div style={{ fontSize:28, flexShrink:0, width:40, textAlign:'center' }}>{tip.emoji}</div>
                  <div>
                    <div style={{ fontSize:14, fontWeight:700, color:T.textPrimary, marginBottom:4 }}>{tip.title}</div>
                    <div style={{ fontSize:13, color:T.textSecondary, lineHeight:1.55 }}>{tip.body}</div>
                  </div>
                </div>
              );
            })}
          </div>
        ):(
          <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
            {['Fitness First','Talabat Health','Yoga House','Calm App'].map((p,i)=>{
              const palettes=[T.tileBlue,T.tileTeal,T.tileYellow,T.tilePink];
              const pal=palettes[i%4];
              return (
                <div key={i} style={{
                  background:T.bgAlt, borderRadius:14, padding:'14px 16px',
                  display:'flex', alignItems:'center', justifyContent:'space-between',
                }}>
                  <div style={{ display:'flex', alignItems:'center', gap:12 }}>
                    <div style={{
                      width:44, height:44, borderRadius:12, background:pal.bg,
                      display:'flex', alignItems:'center', justifyContent:'center',
                      fontSize:13, fontWeight:800, color:pal.fg,
                    }}>{p[0]}</div>
                    <div>
                      <div style={{ fontSize:14, fontWeight:700, color:T.textPrimary }}>{p}</div>
                      <div style={{ fontSize:12, color:T.textSecondary, marginTop:1 }}>Wellness Partner</div>
                    </div>
                  </div>
                  <button style={{
                    height:30, padding:'0 14px', borderRadius:100,
                    background:T.primaryLight, color:T.primary,
                    border:'none', fontSize:12, fontWeight:700,
                    cursor:'pointer', fontFamily:T.fontSans,
                  }}>View</button>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

Object.assign(window, { ConsultScreen, VideoCallScreen, MessagesScreen, RewardsScreen, WellnessScreen });
