// Home Screen v2 — white/pastel medical style matching reference

const { useState } = React;

/* ── Bottom Nav ── */
function BottomNav({ active, onNav, notifications = 2 }) {
  const tabs = [
    { id:'home', label:'Home', icon:(a)=>(
      <svg width="22" height="22" viewBox="0 0 24 24" fill={a?T.primary:'none'} stroke={a?T.primary:T.textTertiary} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
        <polyline points="9 22 9 12 15 12 15 22"/>
      </svg>
    )},
    { id:'policies', label:'My Policies', icon:(a)=>(
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={a?T.primary:T.textTertiary} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
        <line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
      </svg>
    )},
    { id:'consult', label:'Doctor', icon:(a)=>(
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={a?T.primary:T.textTertiary} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.62 1h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 8.62a16 16 0 0 0 6 6l.91-.91a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
      </svg>
    )},
    { id:'messages', label:'Messages', icon:(a)=>(
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={a?T.primary:T.textTertiary} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
      </svg>
    ), badge: notifications },
    { id:'profile', label:'Profile', icon:(a)=>(
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={a?T.primary:T.textTertiary} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
        <circle cx="12" cy="7" r="4"/>
      </svg>
    )},
  ];

  return (
    <div style={{
      display:'flex', background:T.white,
      borderTop:`1px solid ${T.border}`,
      padding:'8px 4px 6px',
    }}>
      {tabs.map(tab => {
        const isActive = active === tab.id;
        return (
          <button key={tab.id} onClick={()=>onNav(tab.id)} style={{
            flex:1, display:'flex', flexDirection:'column', alignItems:'center',
            gap:3, background:'none', border:'none', cursor:'pointer',
            padding:'4px 0 2px', position:'relative',
          }}>
            <div style={{ position:'relative' }}>
              {tab.icon(isActive)}
              {tab.badge>0 && (
                <div style={{
                  position:'absolute', top:-3, right:-5,
                  width:15, height:15, borderRadius:'50%',
                  background:T.danger, color:'white',
                  fontSize:8, fontWeight:700, fontFamily:T.fontSans,
                  display:'flex', alignItems:'center', justifyContent:'center',
                  border:'2px solid white',
                }}>{tab.badge}</div>
              )}
            </div>
            <span style={{
              fontSize:10.5, fontFamily:T.fontSans, fontWeight:isActive?700:400,
              color:isActive?T.primary:T.textTertiary,
            }}>{tab.label}</span>
          </button>
        );
      })}
    </div>
  );
}

/* ── Policy Holder Cards ── */
function PolicyHolderCards({ onViewECard }) {
  const cards = [
    { initials:'SA', name:'Sarah Anderson', relation:'Principal', color:'#1A9BAF', color2:'#0E7A8C',
      policyNo:'MB3893939-9',  benefitNetId:'456321', expiry:'01/26' },
    { initials:'JA', name:'John Anderson',  relation:'Spouse',    color:'#2563EB', color2:'#1D4ED8',
      policyNo:'MB3893939-10', benefitNetId:'456322', expiry:'01/26' },
    { initials:'EA', name:'Emma Anderson',  relation:'Child',     color:'#6B4FCF', color2:'#5338B5',
      policyNo:'MB3893939-11', benefitNetId:'456323', expiry:'01/26' },
  ];

  const [active, setActive] = React.useState(0);
  const [dragging, setDragging] = React.useState(false);
  const dragX = React.useRef(null);

  const prev = () => setActive(a => (a - 1 + cards.length) % cards.length);
  const next = () => setActive(a => (a + 1) % cards.length);

  const onPointerDown = e => {
    dragX.current = e.clientX;
    setDragging(true);
    e.currentTarget.setPointerCapture(e.pointerId);
  };
  const onPointerUp = e => {
    if (dragX.current === null) return;
    const dx = e.clientX - dragX.current;
    if (Math.abs(dx) < 6) onViewECard();
    else if (dx >  40) prev();
    else if (dx < -40) next();
    dragX.current = null;
    setDragging(false);
  };

  return (
    <div style={{ paddingTop:22 }}>
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', padding:'0 20px', marginBottom:14 }}>
        <span style={{ fontSize:17, fontWeight:800, color:T.textPrimary }}>My Coverage</span>
        <span style={{ fontSize:13, color:T.primary, fontWeight:600, cursor:'pointer' }}>View All</span>
      </div>

      <div style={{ padding:'0 20px' }}>
        {/* Full-width slide track */}
        <div
          style={{ borderRadius:22, overflow:'hidden', cursor: dragging ? 'grabbing' : 'grab', userSelect:'none' }}
          onPointerDown={onPointerDown}
          onPointerUp={onPointerUp}
        >
          <div style={{
            display:'flex',
            transform:`translateX(-${active * 100}%)`,
            transition:'transform 0.42s cubic-bezier(0.4,0,0.2,1)',
          }}>
            {cards.map((c, i) => (
              <div key={i} style={{
                minWidth:'100%',
                background:`linear-gradient(135deg, ${c.color} 0%, ${c.color2} 100%)`,
                padding:'22px 22px 20px',
                position:'relative', overflow:'hidden',
                boxShadow:`0 12px 32px ${c.color}55`,
                height:186,
                display:'flex', flexDirection:'column', justifyContent:'space-between',
              }}>
                {/* Decorative circles */}
                <div style={{ position:'absolute', top:-44, right:-44, width:160, height:160, borderRadius:'50%', background:'rgba(255,255,255,0.10)', pointerEvents:'none' }}/>
                <div style={{ position:'absolute', bottom:-30, left:-20, width:130, height:130, borderRadius:'50%', background:'rgba(255,255,255,0.07)', pointerEvents:'none' }}/>
                <div style={{ position:'absolute', top:30, right:55, width:70, height:70, borderRadius:'50%', background:'rgba(255,255,255,0.06)', pointerEvents:'none' }}/>

                {/* Row 1: brand + status */}
                <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
                  <div style={{ display:'flex', alignItems:'center', gap:6 }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="rgba(255,255,255,0.9)" stroke="none">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                    </svg>
                    <span style={{ fontSize:11, fontWeight:800, color:'rgba(255,255,255,0.92)', letterSpacing:'1.5px' }}>BENEFITNET</span>
                  </div>
                  <div style={{ background:'rgba(255,255,255,0.18)', padding:'3px 10px', borderRadius:20, display:'flex', alignItems:'center', gap:4 }}>
                    <div style={{ width:5, height:5, borderRadius:'50%', background:'#4ade80' }}/>
                    <span style={{ fontSize:10, fontWeight:700, color:'rgba(255,255,255,0.9)' }}>Active</span>
                  </div>
                </div>

                {/* Row 2: chip + name */}
                <div style={{ display:'flex', alignItems:'center', gap:12 }}>
                  <div style={{
                    width:34, height:26, borderRadius:5,
                    background:'rgba(255,255,255,0.22)',
                    display:'grid', gridTemplateColumns:'1fr 1fr',
                    gridTemplateRows:'1fr 1fr', gap:2, padding:5,
                  }}>
                    {[0,1,2,3].map(k=>(
                      <div key={k} style={{ background:'rgba(255,255,255,0.55)', borderRadius:1 }}/>
                    ))}
                  </div>
                  <div>
                    <div style={{ fontSize:15, fontWeight:800, color:'white', letterSpacing:'0.2px' }}>{c.name}</div>
                    <div style={{ fontSize:11, color:'rgba(255,255,255,0.72)', marginTop:2 }}>{c.relation} · {c.policyNo}</div>
                  </div>
                </div>

                {/* Row 3: masked ID + expiry + shield */}
                <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-end' }}>
                  <div>
                    <div style={{ fontSize:13.5, fontWeight:600, color:'rgba(255,255,255,0.88)', letterSpacing:'3px', fontFamily:'monospace' }}>
                      •••• •••• {c.benefitNetId.slice(-4)}
                    </div>
                    <div style={{ display:'flex', gap:16, marginTop:6 }}>
                      <div>
                        <div style={{ fontSize:8.5, color:'rgba(255,255,255,0.55)', textTransform:'uppercase', letterSpacing:'0.6px' }}>Benefit ID</div>
                        <div style={{ fontSize:11, fontWeight:700, color:'rgba(255,255,255,0.88)' }}>{c.benefitNetId}</div>
                      </div>
                      <div>
                        <div style={{ fontSize:8.5, color:'rgba(255,255,255,0.55)', textTransform:'uppercase', letterSpacing:'0.6px' }}>Expiry</div>
                        <div style={{ fontSize:11, fontWeight:700, color:'rgba(255,255,255,0.88)' }}>{c.expiry}</div>
                      </div>
                    </div>
                  </div>
                  <svg width="36" height="36" viewBox="0 0 24 24" fill="rgba(255,255,255,0.25)" stroke="rgba(255,255,255,0.4)" strokeWidth="1">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                  </svg>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Dot indicators */}
        <div style={{ display:'flex', justifyContent:'center', gap:6, marginTop:12 }}>
          {cards.map((c, i) => (
            <div key={i} onClick={() => setActive(i)} style={{
              width: i === active ? 20 : 6, height:6, borderRadius:3,
              background: i === active ? cards[active].color : 'rgba(0,0,0,0.12)',
              transition:'width 0.3s ease, background 0.3s ease',
              cursor:'pointer',
            }}/>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── Banner Carousel ── */
function BannerCarousel({ onNav }) {
  const slides = [
    {
      id:'consult',  emoji:'👩‍⚕️',
      title:'Free Consultation',
      sub:'Connect with a trusted doctor from home, anytime.',
      cta:'Book Now →',
      bg:T.primaryLight,   accent:T.primary,
    },
    {
      id:'wellness', emoji:'🧘',
      title:'Wellness Program',
      sub:'Join our health initiative and earn reward points.',
      cta:'Join Now →',
      bg:T.tileGreen.bg,   accent:T.tileGreen.fg,
    },
    {
      id:'ecard',    emoji:'🩺',
      title:'Annual Health Check',
      sub:'Book your full-body screening at a nearby clinic.',
      cta:'Learn More →',
      bg:T.tileYellow.bg,  accent:T.tileYellow.fg,
    },
  ];

  const [active, setActive] = React.useState(0);
  const [dragging, setDragging] = React.useState(false);
  const dragX = React.useRef(null);

  React.useEffect(() => {
    const t = setInterval(() => setActive(a => (a + 1) % slides.length), 4000);
    return () => clearInterval(t);
  }, []);

  const prev = () => setActive(a => (a - 1 + slides.length) % slides.length);
  const next = () => setActive(a => (a + 1) % slides.length);

  const onPointerDown = e => {
    dragX.current = e.clientX;
    setDragging(true);
    e.currentTarget.setPointerCapture(e.pointerId);
  };
  const onPointerUp = e => {
    if (dragX.current === null) return;
    const dx = e.clientX - dragX.current;
    if (dx > 40) prev();
    else if (dx < -40) next();
    dragX.current = null;
    setDragging(false);
  };

  return (
    <div style={{ padding:'20px 20px 0' }}>
      <div
        style={{ borderRadius:20, overflow:'hidden', position:'relative', cursor: dragging ? 'grabbing' : 'grab', userSelect:'none' }}
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
      >
        {/* Slides track */}
        <div style={{
          display:'flex',
          transform:`translateX(-${active * 100}%)`,
          transition:'transform 0.42s cubic-bezier(0.4,0,0.2,1)',
        }}>
          {slides.map((s, i) => (
            <div key={i} style={{
              minWidth:'100%', background:s.bg,
              padding:'20px 20px 34px',
              display:'flex', justifyContent:'space-between', alignItems:'flex-end',
              position:'relative', minHeight:140, overflow:'hidden',
            }}>
              {/* Decorative blobs */}
              <div style={{ position:'absolute', top:-24, right:86, width:88, height:88, borderRadius:'50%', background:s.accent, opacity:0.07 }}/>
              <div style={{ position:'absolute', bottom:-16, right:18, width:58, height:58, borderRadius:'50%', background:s.accent, opacity:0.05 }}/>

              {/* Text + CTA */}
              <div style={{ maxWidth:'58%' }}>
                <div style={{ fontSize:16, fontWeight:800, color:T.textPrimary, lineHeight:1.25, marginBottom:6 }}>{s.title}</div>
                <div style={{ fontSize:12, color:T.textSecondary, lineHeight:1.6, marginBottom:14 }}>{s.sub}</div>
                <button onClick={() => onNav(s.id)} style={{
                  height:32, padding:'0 16px', borderRadius:T.radiusPill,
                  background:s.accent, color:'white',
                  border:'none', fontSize:12, fontWeight:700,
                  cursor:'pointer', fontFamily:T.fontSans,
                  boxShadow:`0 4px 10px ${s.accent}40`,
                }}>{s.cta}</button>
              </div>

              {/* Illustration */}
              <div style={{
                width:96, height:96,
                background:`${s.accent}1A`,
                borderRadius:'50% 50% 0 0',
                display:'flex', alignItems:'flex-end', justifyContent:'center',
                overflow:'hidden', flexShrink:0, alignSelf:'flex-end',
              }}>
                <div style={{ fontSize:58, lineHeight:1, marginBottom:-2 }}>{s.emoji}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Pill dot indicators */}
        <div style={{
          position:'absolute', bottom:11, left:0, right:0,
          display:'flex', justifyContent:'center', gap:5, pointerEvents:'none',
        }}>
          {slides.map((s, i) => (
            <div key={i}
              onClick={() => setActive(i)}
              style={{
                width: i === active ? 18 : 5,
                height:5, borderRadius:3,
                background: i === active ? s.accent : 'rgba(0,0,0,0.14)',
                transition:'width 0.3s ease, background 0.3s ease',
                pointerEvents:'auto', cursor:'pointer',
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── Home Screen ── */
function HomeScreen({ onNav, onAction }) {
  const hour = new Date().getHours();
  const greeting = hour<12 ? 'Good morning' : hour<17 ? 'Good afternoon' : 'Good evening';

  const services = [
    { id:'policies',   emoji:'📋', label:'My Policies',   ...T.tileTeal },
    { id:'calldoctor', emoji:'📞', label:'Call a Doctor', ...T.tileBlue },
    { id:'finddoctor', emoji:'🏥', label:'Find a Doctor', ...T.tilePink },
    { id:'rewards',    emoji:'🎁', label:'Rewards',       ...T.tilePurple },
    { id:'wellness',   emoji:'🧘', label:'Wellness',      ...T.tileYellow },
    { id:'messages',   emoji:'💬', label:'Messages',      ...T.tileOrange },
    { id:'ecard',      emoji:'💳', label:'E-Card',        ...T.tileGreen },
  ];

  const appointments = [
    { date:'12', day:'Tue', time:'09:30 AM', doctor:'Dr. Aisha Rahman', specialty:'Cardiology', color: T.primary },
    { date:'14', day:'Thu', time:'02:00 PM', doctor:'Dr. James Osei', specialty:'General', color:'#E06B2A' },
    { date:'18', day:'Mon', time:'11:00 AM', doctor:'Dr. Priya Nair', specialty:'Dermatology', color:'#6B4FCF' },
  ];

  return (
    <div style={{ display:'flex', flexDirection:'column', height:'100%', background:T.bg, fontFamily:T.fontSans }}>
      <div style={{ flex:1, overflowY:'auto' }}>
        {/* Header */}
        <div style={{ padding:'20px 20px 0', display:'flex', justifyContent:'space-between', alignItems:'flex-start' }}>
          <div>
            <div style={{ fontSize:13.5, color:T.textSecondary, marginBottom:2 }}>{greeting} 👋</div>
            <div style={{ fontSize:24, fontWeight:800, color:T.textPrimary, letterSpacing:'-0.4px' }}>Sarah Anderson</div>
          </div>
          {/* Avatar */}
          <div style={{ position:'relative' }}>
            <div style={{
              width:46, height:46, borderRadius:'50%',
              background:T.primaryLight,
              display:'flex', alignItems:'center', justifyContent:'center',
              fontSize:16, fontWeight:800, color:T.primary,
              border:`2px solid ${T.primary}22`,
            }}>SA</div>
            <div style={{
              position:'absolute', bottom:1, right:1,
              width:11, height:11, borderRadius:'50%',
              background:T.success, border:'2px solid white',
            }}/>
          </div>
        </div>

        {/* Search bar */}
        <div style={{ padding:'16px 20px 0' }}>
          <div style={{
            display:'flex', alignItems:'center', gap:10,
            background:T.bgAlt, borderRadius:T.radiusInput,
            padding:'0 14px', border:`1.5px solid ${T.border}`,
          }}>
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke={T.textTertiary} strokeWidth="2">
              <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
            <input placeholder="Search medical..." style={{
              flex:1, height:44, border:'none', background:'none',
              fontSize:14.5, fontFamily:T.fontSans, color:T.textPrimary,
              outline:'none',
            }}/>
            <button style={{
              width:32, height:32, borderRadius:9, background:T.white,
              border:`1.5px solid ${T.border}`, cursor:'pointer',
              display:'flex', alignItems:'center', justifyContent:'center',
              boxShadow: T.shadowSm,
            }}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={T.textSecondary} strokeWidth="2">
                <line x1="4" y1="6" x2="20" y2="6"/><line x1="8" y1="12" x2="16" y2="12"/><line x1="11" y1="18" x2="13" y2="18"/>
              </svg>
            </button>
          </div>
        </div>

        {/* Policy holder cards */}
        <PolicyHolderCards onViewECard={() => onNav('ecard')} />

        {/* Services */}
        <div style={{ padding:'22px 20px 0' }}>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:14 }}>
            <span style={{ fontSize:17, fontWeight:800, color:T.textPrimary }}>Services</span>
            <span style={{ fontSize:13, color:T.primary, fontWeight:600, cursor:'pointer' }}>See all</span>
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(4, 1fr)', gap:10 }}>
            {services.map(s=>(
              <button key={s.id} onClick={()=>onNav(s.id)} style={{
                display:'flex', flexDirection:'column', alignItems:'center', gap:7,
                background:'none', border:'none', cursor:'pointer', fontFamily:T.fontSans,
                padding:0,
              }}>
                <div style={{
                  width:56, height:56, borderRadius:16,
                  background:s.bg,
                  display:'flex', alignItems:'center', justifyContent:'center',
                  fontSize:24,
                }}>{s.emoji}</div>
                <span style={{ fontSize:11.5, fontWeight:600, color:T.textSecondary, textAlign:'center', lineHeight:1.3 }}>{s.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Promo carousel */}
        <BannerCarousel onNav={onNav} />

        {/* Upcoming Appointments */}
        <div style={{ padding:'22px 20px 0' }}>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:14 }}>
            <span style={{ fontSize:17, fontWeight:800, color:T.textPrimary }}>Upcoming Appointments</span>
            <span style={{ fontSize:13, color:T.primary, fontWeight:600, cursor:'pointer' }}>See all</span>
          </div>
          <div style={{ display:'flex', gap:12, overflowX:'auto', paddingBottom:4 }}>
            {appointments.map((apt,i)=>(
              <div key={i} style={{
                background:apt.color, borderRadius:18, padding:'14px',
                minWidth:180, flexShrink:0, cursor:'pointer',
                boxShadow:`0 6px 20px ${apt.color}44`,
              }}>
                <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:10 }}>
                  <div style={{
                    background:'rgba(255,255,255,0.2)', borderRadius:10,
                    padding:'6px 10px', textAlign:'center',
                  }}>
                    <div style={{ fontSize:20, fontWeight:800, color:'white', lineHeight:1 }}>{apt.date}</div>
                    <div style={{ fontSize:11, color:'rgba(255,255,255,0.8)', marginTop:1 }}>{apt.day}</div>
                  </div>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth="2">
                    <circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/>
                  </svg>
                </div>
                <div style={{ fontSize:11, color:'rgba(255,255,255,0.75)', marginBottom:2 }}>{apt.time}</div>
                <div style={{ fontSize:14, fontWeight:700, color:'white', marginBottom:1 }}>{apt.doctor}</div>
                <div style={{ fontSize:12, color:'rgba(255,255,255,0.8)' }}>{apt.specialty}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Coverage snapshot */}
        <div style={{ padding:'22px 20px 20px' }}>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:14 }}>
            <span style={{ fontSize:17, fontWeight:800, color:T.textPrimary }}>Coverage Overview</span>
            <span onClick={()=>onNav('policies')} style={{ fontSize:13, color:T.primary, fontWeight:600, cursor:'pointer' }}>Details</span>
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:10 }}>
            {[
              { label:'Inpatient', used:12000, total:150000, emoji:'🏥', ...T.tileBlue },
              { label:'Outpatient', used:3200, total:20000, emoji:'🩺', ...T.tileTeal },
              { label:'Dental', used:800, total:5000, emoji:'🦷', ...T.tileYellow },
            ].map((item,i)=>(
              <div key={i} style={{
                background:item.bg, borderRadius:14, padding:'12px',
              }}>
                <div style={{ fontSize:20, marginBottom:6 }}>{item.emoji}</div>
                <div style={{ fontSize:13, fontWeight:700, color:T.textPrimary }}>{item.label}</div>
                <div style={{ fontSize:12, color:T.textSecondary, marginTop:1 }}>{Math.round(item.used/1000)}k / {item.total/1000}k</div>
                <div style={{ height:4, background:'rgba(0,0,0,0.08)', borderRadius:2, marginTop:8 }}>
                  <div style={{ height:'100%', borderRadius:2, background:item.fg, width:`${Math.round(item.used/item.total*100)}%` }}/>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { BottomNav, HomeScreen, BannerCarousel, PolicyHolderCards });
