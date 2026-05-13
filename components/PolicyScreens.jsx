// Policy, E-Card, Provider screens v2 — white/pastel style

const { useState } = React;

/* ── Shared: Back Button ── */
function BackBtn({ onBack, light = false }) {
  return (
    <button onClick={onBack} style={{
      width:38, height:38, borderRadius:11,
      background: light ? 'rgba(255,255,255,0.2)' : T.bgAlt,
      border: light ? 'none' : `1.5px solid ${T.border}`,
      cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center',
      flexShrink:0,
    }}>
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
        stroke={light?'white':T.textPrimary} strokeWidth="2.5">
        <path d="M19 12H5M12 19l-7-7 7-7"/>
      </svg>
    </button>
  );
}

/* ── Shared: Page Header ── */
function PageHeader({ title, onBack, right }) {
  return (
    <div style={{
      display:'flex', alignItems:'center', justifyContent:'space-between',
      padding:'16px 20px 12px',
      background:T.bg,
    }}>
      <BackBtn onBack={onBack}/>
      <span style={{ fontSize:17, fontWeight:800, color:T.textPrimary }}>{title}</span>
      <div style={{ width:38 }}>{right || null}</div>
    </div>
  );
}

/* ── My Policy Screen ── */
function PolicyScreen({ onBack, onECard }) {
  const [tab, setTab] = useState('overview');
  const [viewer, setViewer] = useState(null);

  const benefits = [
    { label:'Inpatient',  limit:'AED 150,000', used:'AED 12,000',  pct:8,  ...T.tileBlue },
    { label:'Outpatient', limit:'AED 20,000',  used:'AED 3,200',   pct:16, ...T.tileTeal },
    { label:'Dental',     limit:'AED 5,000',   used:'AED 800',     pct:16, ...T.tileYellow },
    { label:'Optical',    limit:'AED 3,000',   used:'AED 0',       pct:0,  ...T.tilePurple },
    { label:'Maternity',  limit:'AED 10,000',  used:'AED 0',       pct:0,  ...T.tilePink },
  ];

  const docs = [
    { label:'Network List',       desc:'Find in-network providers',  emoji:'🏥', file:'NetworkList.pdf',                                     type:'pdf'  },
    { label:'Table of Benefits',  desc:'Full coverage details',      emoji:'📋', file:'TOB_630ade31-1579-4a64-ba82-d25e162dccf8.pdf',         type:'pdf'  },
    { label:'Policy Certificate', desc:'Official coverage document', emoji:'🏆' },
  ];

  return (
    <div style={{ display:'flex', flexDirection:'column', height:'100%', background:T.bg, fontFamily:T.fontSans, position:'relative' }}>
      <PageHeader title="My Policies" onBack={onBack}/>

      {/* Policy badge */}
      <div style={{ padding:'0 20px 16px' }}>
        <div style={{
          background:T.primaryLight, borderRadius:16, padding:'14px 16px',
          display:'flex', alignItems:'center', justifyContent:'space-between',
        }}>
          <div style={{ display:'flex', alignItems:'center', gap:12 }}>
            <div style={{
              width:42, height:42, borderRadius:12, background:T.primary,
              display:'flex', alignItems:'center', justifyContent:'center', fontSize:20,
            }}>🛡️</div>
            <div>
              <div style={{ fontSize:15, fontWeight:800, color:T.textPrimary }}>Lifestyle Plus</div>
              <div style={{ fontSize:12.5, color:T.textSecondary }}>MB3893939-9 · Gold++</div>
            </div>
          </div>
          <div style={{ background:T.success, color:'white', fontSize:11, fontWeight:700, padding:'4px 12px', borderRadius:100 }}>ACTIVE</div>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display:'flex', borderBottom:`1px solid ${T.border}`, padding:'0 20px' }}>
        {['overview','documents'].map(t=>(
          <button key={t} onClick={()=>setTab(t)} style={{
            flex:1, background:'none', border:'none', cursor:'pointer',
            padding:'10px 0', fontFamily:T.fontSans,
            fontSize:13.5, fontWeight:tab===t?800:500,
            color:tab===t?T.primary:T.textSecondary,
            borderBottom:tab===t?`2.5px solid ${T.primary}`:'2.5px solid transparent',
            textTransform:'capitalize',
          }}>{t}</button>
        ))}
      </div>

      <div style={{ flex:1, overflowY:'auto', padding:'16px 20px' }}>
        {tab==='overview' && (
          <div style={{ display:'flex', flexDirection:'column', gap:0 }}>
            <div style={{ background:T.bgAlt, borderRadius:16, overflow:'hidden', marginBottom:16 }}>
              {[
                { label:'Company',     value:'Al Noor Consulting' },
                { label:'Policy Holder', value:'Sarah Anderson' },
                { label:'Category',    value:'Principal' },
                { label:'Network',     value:'Gold++' },
                { label:'Deductible',  value:'20% max AED 50' },
                { label:'Valid',       value:'01 Jan – 31 Dec 2026' },
                { label:'BenefitNet ID', value:'456321' },
              ].map((row,i,arr)=>(
                <div key={i} style={{
                  padding:'13px 16px',
                  borderBottom:i<arr.length-1?`1px solid ${T.border}`:'none',
                  display:'flex', justifyContent:'space-between', alignItems:'center',
                }}>
                  <span style={{ fontSize:13.5, color:T.textSecondary }}>{row.label}</span>
                  <span style={{ fontSize:13.5, fontWeight:700, color:T.textPrimary }}>{row.value}</span>
                </div>
              ))}
            </div>

            <button onClick={onECard} style={{
              height:50, borderRadius:T.radiusPill, background:T.primary,
              color:'white', border:'none', fontSize:15, fontWeight:700,
              cursor:'pointer', fontFamily:T.fontSans,
              boxShadow:`0 6px 20px ${T.primary}44`,
              display:'flex', alignItems:'center', justifyContent:'center', gap:8,
            }}>💳 View Digital E-Card</button>
          </div>
        )}

        {tab==='benefits' && (
          <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
            {benefits.map((b,i)=>(
              <div key={i} style={{ background:b.bg, borderRadius:14, padding:'14px 16px' }}>
                <div style={{ display:'flex', justifyContent:'space-between', marginBottom:8 }}>
                  <span style={{ fontSize:14, fontWeight:700, color:T.textPrimary }}>{b.label}</span>
                  <span style={{ fontSize:13, color:T.textSecondary }}>{b.used} used</span>
                </div>
                <div style={{ height:6, background:'rgba(0,0,0,0.08)', borderRadius:3 }}>
                  <div style={{ height:'100%', borderRadius:3, background:b.fg, width:`${b.pct}%`, transition:'width 0.6s ease' }}/>
                </div>
                <div style={{ display:'flex', justifyContent:'space-between', marginTop:6 }}>
                  <span style={{ fontSize:11.5, color:T.textSecondary }}>Limit: {b.limit}</span>
                  <span style={{ fontSize:11.5, color:b.fg, fontWeight:700 }}>{b.pct}% used</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {tab==='documents' && (
          <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
            {docs.map((d,i)=>(
              <div key={i} style={{
                background:T.bgAlt, borderRadius:14, padding:'14px 16px',
                display:'flex', alignItems:'center', gap:14,
              }}>
                <div style={{
                  width:44, height:44, borderRadius:12, background:T.primaryLight,
                  display:'flex', alignItems:'center', justifyContent:'center', fontSize:20, flexShrink:0,
                }}>{d.emoji}</div>
                <div style={{ flex:1 }}>
                  <div style={{ fontSize:14, fontWeight:700, color:T.textPrimary }}>{d.label}</div>
                  <div style={{ fontSize:12.5, color:T.textSecondary, marginTop:1 }}>{d.desc}</div>
                </div>
                {d.file && (
                  <div style={{ display:'flex', gap:10, flexShrink:0 }}>
                    <button onClick={()=> d.type==='pdf' ? setViewer(d) : window.open(d.file,'_blank')}
                      style={{ background:'none', border:'none', cursor:'pointer', padding:4, display:'flex', alignItems:'center' }}
                      title="View">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={T.primary} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                        <circle cx="12" cy="12" r="3"/>
                      </svg>
                    </button>
                    <a href={d.file} download style={{ display:'flex', alignItems:'center', padding:4, color:'inherit' }} title="Download">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={T.textTertiary} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                        <polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
                      </svg>
                    </a>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* PDF Viewer overlay */}
      {viewer && (
        <div style={{
          position:'absolute', inset:0, zIndex:200,
          background:'rgba(0,0,0,0.85)', display:'flex', flexDirection:'column',
        }}>
          <div style={{
            display:'flex', alignItems:'center', justifyContent:'space-between',
            padding:'12px 16px', background:T.white,
          }}>
            <span style={{ fontSize:15, fontWeight:700, color:T.textPrimary }}>{viewer.label}</span>
            <button onClick={()=>setViewer(null)} style={{
              background:'none', border:'none', cursor:'pointer', fontSize:22, lineHeight:1, color:T.textPrimary,
            }}>✕</button>
          </div>
          <iframe
            src={viewer.file}
            style={{ flex:1, border:'none', width:'100%' }}
            title={viewer.label}
          />
        </div>
      )}
    </div>
  );
}

/* ── E-Card Screen ── */
function ECardScreen({ onBack }) {
  const [flipped, setFlipped] = useState(false);

  return (
    <div style={{ display:'flex', flexDirection:'column', height:'100%', background:T.bg, fontFamily:T.fontSans }}>
      <PageHeader title="Digital E-Card" onBack={onBack}/>

      <div style={{ flex:1, display:'flex', flexDirection:'column', padding:'8px 20px 24px', alignItems:'center' }}>
        <p style={{ fontSize:13.5, color:T.textSecondary, marginBottom:24, textAlign:'center' }}>
          Tap card to flip · Show at any clinic or hospital
        </p>

        {/* Card flip */}
        <div onClick={()=>setFlipped(!flipped)} style={{
          width:'100%', maxWidth:320, height:190,
          perspective:800, cursor:'pointer', marginBottom:20,
        }}>
          <div style={{
            width:'100%', height:'100%', position:'relative',
            transformStyle:'preserve-3d',
            transform:flipped?'rotateY(180deg)':'rotateY(0deg)',
            transition:'transform 0.55s cubic-bezier(0.4,0,0.2,1)',
          }}>
            {/* Front */}
            <div style={{
              position:'absolute', width:'100%', height:'100%', backfaceVisibility:'hidden',
              background:`linear-gradient(135deg, ${T.primary} 0%, ${T.primaryMid} 100%)`,
              borderRadius:22, padding:'20px', boxSizing:'border-box',
              boxShadow:`0 16px 48px ${T.primary}55`, overflow:'hidden',
            }}>
              <div style={{ position:'absolute', top:-30, right:-30, width:120, height:120, borderRadius:'50%', background:'white', opacity:0.07 }}/>
              <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:16 }}>
                <div>
                  <div style={{ fontSize:10, color:'rgba(255,255,255,0.6)', letterSpacing:'0.8px', textTransform:'uppercase' }}>Insurance Card</div>
                  <div style={{ fontSize:17, fontWeight:800, color:'white', marginTop:1 }}>WillisApp</div>
                </div>
                <div style={{ background:T.success, color:'white', fontSize:10, fontWeight:700, padding:'3px 10px', borderRadius:100 }}>ACTIVE</div>
              </div>
              <div style={{ marginBottom:10 }}>
                <div style={{ fontSize:10, color:'rgba(255,255,255,0.55)', textTransform:'uppercase', letterSpacing:'0.5px' }}>Member</div>
                <div style={{ fontSize:19, fontWeight:700, color:'white' }}>Sarah Anderson</div>
              </div>
              <div style={{ display:'flex', gap:20 }}>
                <div>
                  <div style={{ fontSize:10, color:'rgba(255,255,255,0.55)', textTransform:'uppercase' }}>Policy No.</div>
                  <div style={{ fontSize:13, fontWeight:600, color:'white' }}>MB3893939-9</div>
                </div>
                <div>
                  <div style={{ fontSize:10, color:'rgba(255,255,255,0.55)', textTransform:'uppercase' }}>Valid To</div>
                  <div style={{ fontSize:13, fontWeight:600, color:'white' }}>31 Dec 2026</div>
                </div>
                <div>
                  <div style={{ fontSize:10, color:'rgba(255,255,255,0.55)', textTransform:'uppercase' }}>Network</div>
                  <div style={{ fontSize:13, fontWeight:600, color:'white' }}>Gold++</div>
                </div>
              </div>
            </div>
            {/* Back */}
            <div style={{
              position:'absolute', width:'100%', height:'100%', backfaceVisibility:'hidden',
              transform:'rotateY(180deg)',
              background:`linear-gradient(135deg, #1a2a3a 0%, #0d1a26 100%)`,
              borderRadius:22, padding:'20px', boxSizing:'border-box',
              boxShadow:`0 16px 48px ${T.primary}55`,
            }}>
              <div style={{ height:36, background:'rgba(255,255,255,0.1)', marginBottom:14, borderRadius:4 }}/>
              {[
                { label:'BenefitNet ID', val:'456321' },
                { label:'Membership No.', val:'MEM987654' },
                { label:'Deductible', val:'20% max AED 50' },
                { label:'Emergency', val:'+971 4 201 1111' },
              ].map((row,i)=>(
                <div key={i} style={{ display:'flex', justifyContent:'space-between', marginBottom:6 }}>
                  <span style={{ fontSize:11, color:'rgba(255,255,255,0.5)' }}>{row.label}</span>
                  <span style={{ fontSize:11, color:'white', fontWeight:600 }}>{row.val}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div style={{ fontSize:12, color:T.textTertiary, marginBottom:24 }}>Tap to see back of card</div>

        <div style={{ display:'flex', gap:10, width:'100%' }}>
          <button style={{
            flex:1, height:48, borderRadius:T.radiusPill,
            background:T.primaryLight, color:T.primary,
            border:'none', fontSize:14, fontWeight:700,
            cursor:'pointer', fontFamily:T.fontSans,
          }}>🖨️ Print</button>
          <button style={{
            flex:1, height:48, borderRadius:T.radiusPill,
            background:T.primary, color:'white',
            border:'none', fontSize:14, fontWeight:700,
            cursor:'pointer', fontFamily:T.fontSans,
            boxShadow:`0 6px 20px ${T.primary}44`,
          }}>↗ Share</button>
        </div>
      </div>
    </div>
  );
}

/* ── Provider Search ── */
function ProviderSearchScreen({ onBack, onProvider }) {
  const [query, setQuery]         = useState('');
  const [filter, setFilter]       = useState('All');
  const [viewMode, setViewMode]   = useState('list');
  const [locating, setLocating]   = useState(false);
  const [userLoc, setUserLoc]     = useState(null);   // { lat, lng, label }
  const [selected, setSelected]   = useState(null);

  const filters = ['All','Hospitals','Specialists','Clinics','Dental'];
  const providers = [
    { id:1, name:'Dubai Medical Center',  type:'Hospital',   specialty:null,
      address:'123 Healthcare Road, Dubai Healthcare City', dist:'2.3 km', rating:4.8, open:true,
      phone:'+971 4 201 1111', email:'info@dubaimedical.ae', mapQ:'Dubai+Healthcare+City,Dubai' },
    { id:2, name:'Dr. Ahmed Hassan',      type:'Specialist', specialty:'Cardiology',
      address:'456 Medical Plaza, Business Bay',            dist:'3.7 km', rating:4.9, open:true,
      phone:'+971 4 202 2222', email:'ahmed.hassan@clinic.ae', mapQ:'Business+Bay,Dubai' },
    { id:3, name:'Aster Hospital',        type:'Hospital',   specialty:null,
      address:'20th Street, Al Mankhool',                   dist:'4.1 km', rating:4.7, open:false,
      phone:'+971 4 203 3333', email:'info@asterhospital.ae', mapQ:'Al+Mankhool,Dubai' },
    { id:4, name:'HealthPlus Clinic',     type:'Clinic',     specialty:'General',
      address:'Al Safa Street, Jumeirah',                   dist:'5.2 km', rating:4.6, open:true,
      phone:'+971 4 204 4444', email:'info@healthplus.ae', mapQ:'Al+Safa,Jumeirah,Dubai' },
    { id:5, name:'Dr. Sara Al Marzouqi', type:'Specialist', specialty:'Dermatology',
      address:'JLT, Cluster D',                             dist:'6.0 km', rating:4.8, open:true,
      phone:'+971 4 205 5555', email:'sara.marzouqi@clinic.ae', mapQ:'Jumeirah+Lake+Towers+Cluster+D,Dubai' },
  ];

  const tilePalette = [T.tileBlue, T.tileTeal, T.tilePink, T.tileYellow, T.tilePurple];
  const filtered = providers.filter(p =>
    (filter === 'All' || p.type === filter.slice(0,-1) || p.type === filter) &&
    (query === '' || p.name.toLowerCase().includes(query.toLowerCase()) ||
     (p.specialty||'').toLowerCase().includes(query.toLowerCase()))
  );

  const handleLocateMe = () => {
    if (locating) return;
    setLocating(true);
    const done = (label, lat, lng) => {
      setUserLoc({ lat, lng, label });
      setLocating(false);
      setViewMode('map');
      setSelected(prev => prev || filtered[0] || null);
    };
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        p => done('Your Location', p.coords.latitude, p.coords.longitude),
        () => done('Dubai Health City', 25.2285, 55.3273),
        { timeout: 6000 }
      );
    } else {
      done('Dubai Health City', 25.2285, 55.3273);
    }
  };

  const switchToMap = () => {
    if (userLoc) setViewMode('map');
    else handleLocateMe();
  };

  const mapSrc = userLoc
    ? `https://maps.google.com/maps?q=clinics+near+${userLoc.lat},${userLoc.lng}&output=embed&z=14`
    : null;

  const displayProvider = selected || filtered[0] || null;

  /* ---- PIN icon SVG ---- */
  const PinIcon = ({ size=12, color=T.textTertiary }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
      style={{ flexShrink:0, marginTop:1 }}>
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
      <circle cx="12" cy="10" r="3"/>
    </svg>
  );

  return (
    <div style={{ display:'flex', flexDirection:'column', height:'100%', background:T.bg, fontFamily:T.fontSans }}>
      <PageHeader title="Find a Provider" onBack={onBack}/>

      {/* ── Search + Filter bar ── */}
      <div style={{ padding:'0 20px 12px', borderBottom:`1px solid ${T.border}` }}>
        <div style={{
          display:'flex', alignItems:'center', gap:10,
          background:T.bgAlt, borderRadius:12, padding:'0 14px',
          border:`1.5px solid ${T.border}`, marginBottom:12,
        }}>
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke={T.textTertiary} strokeWidth="2">
            <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
          </svg>
          <input value={query} onChange={e=>setQuery(e.target.value)}
            placeholder="Search clinics, doctors..."
            style={{ flex:1, height:44, border:'none', background:'none', fontSize:14, fontFamily:T.fontSans, color:T.textPrimary, outline:'none' }}/>
        </div>

        {/* Pills row */}
        <div style={{ display:'flex', gap:7, overflowX:'auto', paddingBottom:2 }}>
          {/* ── Locate Me button ── */}
          <button onClick={handleLocateMe} disabled={locating} style={{
            height:32, padding:'0 13px', borderRadius:100, flexShrink:0,
            border:`1.5px solid ${userLoc ? T.primary : T.border}`,
            background: userLoc ? T.primaryLight : 'white',
            color: userLoc ? T.primary : T.textSecondary,
            fontSize:12.5, fontWeight:600, cursor:'pointer', fontFamily:T.fontSans,
            display:'flex', alignItems:'center', gap:5, whiteSpace:'nowrap',
            opacity: locating ? 0.7 : 1,
          }}>
            {locating ? (
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"
                style={{ animation:'spin 1s linear infinite' }}>
                <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>
              </svg>
            ) : (
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <circle cx="12" cy="12" r="3"/>
                <path d="M12 2v3M12 19v3M2 12h3M19 12h3"/>
              </svg>
            )}
            {locating ? 'Locating…' : 'Your Location'}
          </button>

          {filters.map(f=>(
            <button key={f} onClick={()=>setFilter(f)} style={{
              height:32, padding:'0 14px', borderRadius:100, flexShrink:0,
              border:`1.5px solid ${filter===f?T.primary:T.border}`,
              background:filter===f?T.primaryLight:'none',
              color:filter===f?T.primary:T.textSecondary,
              fontSize:12.5, fontWeight:filter===f?700:500,
              cursor:'pointer', fontFamily:T.fontSans, whiteSpace:'nowrap',
            }}>{f}</button>
          ))}
        </div>
      </div>

      {/* ── Count row + List/Map toggle ── */}
      <div style={{ padding:'8px 20px', display:'flex', alignItems:'center', justifyContent:'space-between' }}>
        <div style={{ fontSize:12.5, color:T.textTertiary }}>
          {filtered.length} clinic{filtered.length!==1?'s':''} found
        </div>
        <div style={{ display:'flex', gap:1, background:T.bgAlt, borderRadius:8, padding:2 }}>
          <button onClick={()=>setViewMode('list')} title="List view" style={{
            width:30, height:26, borderRadius:6, border:'none', cursor:'pointer',
            background:viewMode==='list'?T.white:'transparent',
            color:viewMode==='list'?T.primary:T.textTertiary,
            display:'flex', alignItems:'center', justifyContent:'center',
            boxShadow:viewMode==='list'?'0 1px 4px rgba(0,0,0,0.08)':'none',
          }}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
              <line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/>
              <circle cx="3" cy="6" r="1.2" fill="currentColor" stroke="none"/>
              <circle cx="3" cy="12" r="1.2" fill="currentColor" stroke="none"/>
              <circle cx="3" cy="18" r="1.2" fill="currentColor" stroke="none"/>
            </svg>
          </button>
          <button onClick={switchToMap} title="Map view" style={{
            width:30, height:26, borderRadius:6, border:'none', cursor:'pointer',
            background:viewMode==='map'?T.white:'transparent',
            color:viewMode==='map'?T.primary:T.textTertiary,
            display:'flex', alignItems:'center', justifyContent:'center',
            boxShadow:viewMode==='map'?'0 1px 4px rgba(0,0,0,0.08)':'none',
          }}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
              <polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21"/>
              <line x1="9" y1="3" x2="9" y2="18"/><line x1="15" y1="6" x2="15" y2="21"/>
            </svg>
          </button>
        </div>
      </div>

      {/* ── Location hint banner ── */}
      {viewMode === 'map' && userLoc && (
        <div style={{
          padding:'5px 20px 7px', background:'#FFFBEB',
          borderBottom:`1px solid #FEF3C7`, display:'flex', alignItems:'center', gap:6,
        }}>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#F59E0B" strokeWidth="2">
            <circle cx="12" cy="12" r="10"/><path d="M12 8v4M12 16h.01"/>
          </svg>
          <span style={{ fontSize:11.5, color:'#92400E' }}>
            Using {userLoc.label} as your location.
          </span>
        </div>
      )}

      {/* ══════════════════════════════════
          LIST VIEW
      ══════════════════════════════════ */}
      {viewMode === 'list' && (
        <div style={{ flex:1, overflowY:'auto', padding:'4px 20px 12px' }}>
          <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
            {filtered.map((p,i)=>(
              <div key={p.id} onClick={()=>onProvider(p)} style={{
                background:T.bgAlt, borderRadius:16, padding:'14px 16px',
                cursor:'pointer', display:'flex', alignItems:'flex-start', gap:12,
              }}>
                <div style={{
                  width:46, height:46, borderRadius:13, flexShrink:0,
                  background:tilePalette[i%5].bg,
                  display:'flex', alignItems:'center', justifyContent:'center', fontSize:22,
                }}>{p.type==='Specialist'?'👨‍⚕️':'🏥'}</div>
                <div style={{ flex:1 }}>
                  <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start' }}>
                    <div>
                      <div style={{ fontSize:14, fontWeight:700, color:T.textPrimary }}>{p.name}</div>
                      <div style={{ fontSize:12, color:T.textSecondary, marginTop:1 }}>{p.specialty||p.type}</div>
                    </div>
                    <div style={{
                      fontSize:10, fontWeight:700, padding:'3px 8px', borderRadius:100,
                      background:p.open?T.successLight:T.dangerLight,
                      color:p.open?T.success:T.danger,
                    }}>{p.open?'Open':'Closed'}</div>
                  </div>
                  <div style={{ fontSize:12, color:T.textTertiary, marginTop:5, display:'flex', alignItems:'center', gap:4 }}>
                    📍 {p.address}
                  </div>
                  <div style={{ display:'flex', alignItems:'center', gap:12, marginTop:6 }}>
                    <span style={{ fontSize:12, color:T.primary, fontWeight:700 }}>{p.dist}</span>
                    <span style={{ fontSize:12, color:T.textSecondary }}>⭐ {p.rating}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ══════════════════════════════════
          MAP VIEW
      ══════════════════════════════════ */}
      {viewMode === 'map' && (
        <div style={{ flex:1, display:'flex', flexDirection:'column', overflow:'hidden', minHeight:0 }}>

          {/* Map iframe */}
          <div style={{ flex:1, minHeight:0, position:'relative' }}>
            {mapSrc ? (
              <iframe
                title="Nearby clinics map"
                src={mapSrc}
                width="100%" height="100%"
                style={{ border:'none', display:'block' }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            ) : (
              <div style={{
                height:'100%', display:'flex', flexDirection:'column',
                alignItems:'center', justifyContent:'center',
                background:T.bgAlt, gap:10,
              }}>
                <div style={{ fontSize:42 }}>🗺️</div>
                <div style={{ fontSize:13.5, color:T.textSecondary, fontWeight:600 }}>Tap "Your Location" to load the map</div>
                <button onClick={handleLocateMe} style={{
                  marginTop:4, height:38, padding:'0 20px', borderRadius:100,
                  background:T.primary, color:'white', border:'none',
                  fontSize:13, fontWeight:700, cursor:'pointer', fontFamily:T.fontSans,
                }}>Locate Me</button>
              </div>
            )}
          </div>

          {/* ── Bottom sheet ── */}
          <div style={{
            background:T.white, borderRadius:'20px 20px 0 0',
            boxShadow:'0 -6px 24px rgba(0,0,0,0.10)',
          }}>
            {/* drag handle */}
            <div style={{ padding:'10px 0 6px', display:'flex', justifyContent:'center' }}>
              <div style={{ width:36, height:4, borderRadius:2, background:T.border }}/>
            </div>

            {/* Scrollable clinic cards */}
            <div style={{
              display:'flex', gap:10, overflowX:'auto',
              padding:'0 16px 14px', scrollSnapType:'x mandatory',
            }}>
              {filtered.map((p, i) => {
                const isActive = selected ? selected.id === p.id : i === 0;
                return (
                  <div key={p.id} onClick={()=>setSelected(p)} style={{
                    minWidth:230, flexShrink:0, borderRadius:16,
                    background: isActive ? T.primaryLight : T.bgAlt,
                    border:`2px solid ${isActive ? T.primary : 'transparent'}`,
                    padding:'12px 14px', cursor:'pointer', scrollSnapAlign:'start',
                    transition:'border-color 0.2s, background 0.2s',
                  }}>
                    {/* Name + distance */}
                    <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:5 }}>
                      <div style={{ fontSize:13.5, fontWeight:800, color:T.textPrimary, lineHeight:1.3, maxWidth:148 }}>
                        {p.name}
                      </div>
                      <div style={{ fontSize:12, fontWeight:700, color:T.primary, flexShrink:0, marginLeft:6 }}>
                        {p.dist}
                      </div>
                    </div>

                    {/* Type badge */}
                    <div style={{ marginBottom:6 }}>
                      <span style={{
                        fontSize:10.5, fontWeight:700, color:T.primary,
                        background:'rgba(26,155,175,0.12)', padding:'2px 9px', borderRadius:100,
                        display:'inline-flex', alignItems:'center', gap:3,
                      }}>
                        + {p.specialty||p.type}
                      </span>
                    </div>

                    {/* Address */}
                    <div style={{ fontSize:11.5, color:T.textSecondary, display:'flex', alignItems:'flex-start', gap:4 }}>
                      <PinIcon/>
                      <span style={{ lineHeight:1.4 }}>{p.address}</span>
                    </div>

                    {/* Action buttons — only for active card */}
                    {isActive && (
                      <div style={{ display:'flex', gap:8, marginTop:10 }}>
                        <button
                          onClick={e=>{ e.stopPropagation(); onProvider(p); }}
                          style={{
                            flex:1, height:34, borderRadius:T.radiusPill,
                            background:T.primary, color:'white',
                            border:'none', fontSize:12, fontWeight:700,
                            cursor:'pointer', fontFamily:T.fontSans,
                          }}>View Details</button>
                        <a
                          href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(p.address)}`}
                          target="_blank" rel="noreferrer"
                          onClick={e=>e.stopPropagation()}
                          style={{
                            flex:1, height:34, borderRadius:T.radiusPill,
                            background:T.primaryLight, color:T.primary,
                            border:`1.5px solid ${T.primary}`,
                            fontSize:12, fontWeight:700,
                            display:'flex', alignItems:'center', justifyContent:'center',
                            gap:4, textDecoration:'none',
                          }}>
                          📍 Directions
                        </a>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ── Provider Detail ── */
function ProviderDetailScreen({ provider, onBack }) {
  if (!provider) return null;
  const palette = provider.type==='Specialist' ? T.tileBlue : T.tileTeal;

  return (
    <div style={{ display:'flex', flexDirection:'column', height:'100%', background:T.bg, fontFamily:T.fontSans }}>
      <PageHeader title="Provider Details" onBack={onBack}/>

      {/* Hero */}
      <div style={{
        margin:'0 20px 16px',
        background:palette.bg, borderRadius:20,
        padding:'24px', textAlign:'center',
      }}>
        <div style={{ fontSize:52, marginBottom:8 }}>{provider.type==='Specialist'?'👨‍⚕️':'🏥'}</div>
        <div style={{ fontSize:19, fontWeight:800, color:T.textPrimary, marginBottom:4 }}>{provider.name}</div>
        <div style={{
          display:'inline-block', background:palette.bg,
          border:`1.5px solid ${palette.fg}44`,
          color:palette.fg, fontSize:12, fontWeight:700, padding:'4px 14px', borderRadius:100,
          marginBottom:12,
        }}>{provider.specialty||provider.type}</div>
        <div style={{ display:'flex', justifyContent:'center', gap:20 }}>
          {[
            { val:provider.dist, label:'Distance' },
            { val:`${provider.rating} ★`, label:'Rating' },
            { val:provider.open?'Open':'Closed', label:'Status', color:provider.open?T.success:T.danger },
          ].map((s,i)=>(
            <div key={i} style={{ textAlign:'center' }}>
              <div style={{ fontSize:15, fontWeight:800, color:s.color||T.textPrimary }}>{s.val}</div>
              <div style={{ fontSize:11, color:T.textSecondary, marginTop:1 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ flex:1, overflowY:'auto', padding:'0 20px' }}>

        {/* Map */}
        {provider.mapQ && (
          <div style={{ borderRadius:16, overflow:'hidden', marginBottom:16, height:180, background:T.bgAlt }}>
            <iframe
              title="map"
              width="100%" height="100%"
              style={{ border:'none', display:'block' }}
              src={`https://maps.google.com/maps?q=${provider.mapQ}&output=embed&z=15`}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        )}

        <div style={{ fontSize:12, fontWeight:700, color:T.textTertiary, textTransform:'uppercase', letterSpacing:'0.8px', marginBottom:10 }}>Contact</div>
        <div style={{ background:T.bgAlt, borderRadius:14, overflow:'hidden', marginBottom:16 }}>
          {[
            { emoji:'📍', label:'Address', val:provider.address },
            { emoji:'📞', label:'Phone', val:provider.phone || '+971 4 201 1111' },
            { emoji:'✉️', label:'Email', val:provider.email || 'info@provider.ae' },
          ].map((row,i)=>(
            <div key={i} style={{
              padding:'12px 16px',
              borderBottom:i<2?`1px solid ${T.border}`:'none',
              display:'flex', gap:12, alignItems:'flex-start',
            }}>
              <span style={{ fontSize:17 }}>{row.emoji}</span>
              <div>
                <div style={{ fontSize:11.5, color:T.textTertiary }}>{row.label}</div>
                <div style={{ fontSize:13.5, color:T.textPrimary, fontWeight:500, marginTop:1 }}>{row.val}</div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ display:'flex', gap:10, paddingBottom:20 }}>
          <a href={`https://www.google.com/maps/search/?api=1&query=${provider.mapQ||encodeURIComponent(provider.address)}`}
            target="_blank" rel="noreferrer"
            style={{
              flex:1, height:48, borderRadius:T.radiusPill,
              background:T.primaryLight, color:T.primary,
              border:'none', fontSize:14, fontWeight:700,
              cursor:'pointer', fontFamily:T.fontSans,
              display:'flex', alignItems:'center', justifyContent:'center', gap:6,
              textDecoration:'none',
            }}>📍 Directions</a>
          <button style={{
            flex:1, height:48, borderRadius:T.radiusPill,
            background:T.primary, color:'white',
            border:'none', fontSize:14, fontWeight:700,
            cursor:'pointer', fontFamily:T.fontSans,
            boxShadow:`0 6px 20px ${T.primary}44`,
          }}>📞 Call Now</button>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { BackBtn, PageHeader, PolicyScreen, ECardScreen, ProviderSearchScreen, ProviderDetailScreen });
