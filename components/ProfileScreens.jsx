// Profile, Family & family-action screens v4 — WillisApp white/pastel theme
const { useState } = React;

/* ════════════════════════════════════════
   Member Data
════════════════════════════════════════ */
const MEMBERS = {
  '1': { id:'1', initials:'SA', name:'Sarah Anderson', relation:'Principal', color:'#059669', bg:'#ECFDF5',
         benefitNetId:'456321', policyNumber:'MB3893939-9',
         company:'Al Noor Consulting', firstName:'Sarah', middleName:'', lastName:'Anderson',
         dateOfBirth:'23-Jan-1988', birthCertificateId:'', vipMember:true,
         gender:'Female', maritalStatus:'Married', nationality:'India',
         memberType:"4 = Expat who's residency is issued in Dubai",
         employeeNumber:'EN112054', establishmentType:'Establishment', establishmentId:'1313232/3',
         countryOfResidence:'United Arab Emirates', visaIssuanceLocation:'Dubai',
         workCity:'Dubai', workArea:'DUBAI (DISTRICT UNKNOWN)',
         residentialCity:'Dubai', residentialArea:'DUBAI (DISTRICT UNKNOWN)',
         fileNumber:'201/2016/7053114', uidNumber:'784198716166064',
         nationalIdNumber:'784-1987-16166064', nationalIdExpiryDate:'15-Mar-2028',
         passportNumber:'A3557808', passportExpiryDate:'20-Jun-2029',
         phoneNumber:'+971500006547', email:'sarah.anderson@email.com', alternativeEmail:'',
         commission:'No', salaryBracket:'Between AED 4,001 and 12,000 per month',
         salaryType:'Basic', salaryCurrency:'AED', annualSalary:'25,000.00', annualAllowances:'',
         employmentDate:'21-Aug-2021', jobPosition:'Employee', jobGrade:'JG12',
         department:'Operations', costCenter:'CC11' },
  '2': { id:'2', initials:'JA', name:'John Anderson', relation:'Spouse', color:'#7C3AED', bg:'#EDE9FE',
         benefitNetId:'456322', policyNumber:'MB3893939-10',
         company:'Al Noor Consulting', firstName:'John', middleName:'', lastName:'Anderson',
         dateOfBirth:'15-Mar-1985', birthCertificateId:'', vipMember:false,
         gender:'Male', maritalStatus:'Married', nationality:'India',
         memberType:"4 = Expat who's residency is issued in Dubai",
         employeeNumber:'EN112054', establishmentType:'Establishment', establishmentId:'1313232/3',
         countryOfResidence:'United Arab Emirates', visaIssuanceLocation:'Dubai',
         workCity:'Dubai', workArea:'DUBAI (DISTRICT UNKNOWN)',
         residentialCity:'Dubai', residentialArea:'DUBAI (DISTRICT UNKNOWN)',
         fileNumber:'201/2016/7053115', uidNumber:'784198516166065',
         nationalIdNumber:'784-1985-16166065', nationalIdExpiryDate:'20-Jan-2028',
         passportNumber:'B4478901', passportExpiryDate:'15-Sep-2029',
         phoneNumber:'+971500006548', email:'john.anderson@email.com', alternativeEmail:'',
         commission:'No', salaryBracket:'', salaryType:'', salaryCurrency:'', annualSalary:'', annualAllowances:'',
         employmentDate:'', jobPosition:'', jobGrade:'', department:'', costCenter:'' },
  '3': { id:'3', initials:'EA', name:'Emma Anderson', relation:'Child', color:'#EC4899', bg:'#FCE7F3',
         benefitNetId:'456323', policyNumber:'MB3893939-11',
         company:'Al Noor Consulting', firstName:'Emma', middleName:'', lastName:'Anderson',
         dateOfBirth:'10-Jul-2015', birthCertificateId:'BC-2015-78432', vipMember:false,
         gender:'Female', maritalStatus:'Single', nationality:'India',
         memberType:"4 = Expat who's residency is issued in Dubai",
         employeeNumber:'EN112054', establishmentType:'Establishment', establishmentId:'1313232/3',
         countryOfResidence:'United Arab Emirates', visaIssuanceLocation:'Dubai',
         workCity:'', workArea:'',
         residentialCity:'Dubai', residentialArea:'DUBAI (DISTRICT UNKNOWN)',
         fileNumber:'201/2016/7053116', uidNumber:'784201516166066',
         nationalIdNumber:'784-2015-16166066', nationalIdExpiryDate:'10-Jul-2030',
         passportNumber:'C5589012', passportExpiryDate:'10-Jul-2030',
         phoneNumber:'', email:'', alternativeEmail:'',
         commission:'', salaryBracket:'', salaryType:'', salaryCurrency:'', annualSalary:'', annualAllowances:'',
         employmentDate:'', jobPosition:'', jobGrade:'', department:'', costCenter:'' },
};

const EDITABLE_FIELDS = [
  { section:'Personal Information', emoji:'👤', ...T.tileBlue, fields:[
    { key:'relation',          label:'Relation' },
    { key:'company',           label:'Company' },
    { key:'firstName',         label:'First Name' },
    { key:'middleName',        label:'Middle Name' },
    { key:'lastName',          label:'Last Name' },
    { key:'dateOfBirth',       label:'Date of Birth' },
    { key:'birthCertificateId',label:'Birth Certificate ID' },
    { key:'vipMember',         label:'VIP Member', type:'checkbox' },
    { key:'gender',            label:'Gender' },
    { key:'maritalStatus',     label:'Marital Status' },
    { key:'nationality',       label:'Nationality' },
  ]},
  { section:'Employment Details', emoji:'💼', ...T.tilePurple, fields:[
    { key:'memberType',        label:'Member Type' },
    { key:'employeeNumber',    label:'Employee Number' },
    { key:'establishmentType', label:'Establishment Type' },
    { key:'establishmentId',   label:'Establishment ID' },
  ]},
  { section:'Location Details', emoji:'📍', ...T.tileTeal, fields:[
    { key:'countryOfResidence',   label:'Country of Residence' },
    { key:'visaIssuanceLocation', label:'Visa Issuance Location' },
    { key:'workCity',             label:'Work City' },
    { key:'workArea',             label:'Work Area' },
    { key:'residentialCity',      label:'Residential City' },
    { key:'residentialArea',      label:'Residential Area' },
    { key:'fileNumber',           label:'File Number' },
  ]},
  { section:'Identification', emoji:'🪪', ...T.tileYellow, fields:[
    { key:'uidNumber',            label:'UID Number' },
    { key:'nationalIdNumber',     label:'National ID Number' },
    { key:'nationalIdExpiryDate', label:'National ID Expiry Date' },
    { key:'passportNumber',       label:'Passport Number' },
    { key:'passportExpiryDate',   label:'Passport Expiry Date' },
  ]},
  { section:'Contact Information', emoji:'📞', ...T.tileGreen, fields:[
    { key:'phoneNumber',     label:'Phone Number' },
    { key:'email',           label:'Email' },
    { key:'alternativeEmail',label:'Alternative Email' },
  ]},
  { section:'Salary & Employment', emoji:'💰', ...T.tileOrange, fields:[
    { key:'commission',       label:'Commission' },
    { key:'salaryBracket',    label:'Salary Bracket' },
    { key:'salaryType',       label:'Salary Type' },
    { key:'salaryCurrency',   label:'Salary Currency' },
    { key:'annualSalary',     label:'Annual Salary' },
    { key:'annualAllowances', label:'Annual Allowances' },
    { key:'employmentDate',   label:'Employment Date' },
    { key:'jobPosition',      label:'Job Position' },
    { key:'jobGrade',         label:'Job Grade' },
    { key:'department',       label:'Department' },
    { key:'costCenter',       label:'Cost Center' },
  ]},
];

const POLICY_OPTIONS = [
  { id:'1', policyName:'25/26 Test DHA Medical Policy',     policyNumber:'POL091224', policyType:'Medical Policy', category:'Cat C' },
  { id:'2', policyName:'25/26 Test DXB DHA Medical Policy', policyNumber:'POL091224', policyType:'Medical Policy', category:'Cat C' },
];

/* ════════════════════════════════════════
   Shared UI helpers
════════════════════════════════════════ */
function MemberAvatar({ member, size = 52 }) {
  return (
    <div style={{
      width:size, height:size, borderRadius:'50%', background:member.bg,
      display:'flex', alignItems:'center', justifyContent:'center',
      color:member.color, fontSize:size * 0.28, fontWeight:800, flexShrink:0,
      border:`2px solid ${member.color}33`,
    }}>{member.initials}</div>
  );
}

function SectionLabel({ children, required }) {
  return (
    <div style={{ fontSize:12.5, fontWeight:700, color:T.textTertiary, textTransform:'uppercase', letterSpacing:'0.6px', marginBottom:10 }}>
      {children}{required && <span style={{ color:'#DC2626' }}>*</span>}
    </div>
  );
}

function WhiteCard({ children, style }) {
  return (
    <div style={{ background:T.bgAlt, borderRadius:16, overflow:'hidden', marginBottom:14, ...style }}>
      {children}
    </div>
  );
}

function SuccessOverlay({ show, title, message, btnLabel='Back to My Family', onDone }) {
  if (!show) return null;
  return (
    <div style={{
      position:'absolute', inset:0, background:'rgba(0,0,0,0.45)',
      display:'flex', alignItems:'center', justifyContent:'center',
      padding:'0 24px', zIndex:999,
    }}>
      <div style={{
        background:'white', borderRadius:20, padding:'28px 24px',
        width:'100%', textAlign:'center',
        boxShadow:'0 8px 32px rgba(0,0,0,0.18)',
      }}>
        <div style={{
          width:72, height:72, borderRadius:'50%', background:T.successLight,
          display:'flex', alignItems:'center', justifyContent:'center',
          margin:'0 auto 14px', fontSize:30,
        }}>✅</div>
        <div style={{ fontSize:17, fontWeight:800, color:T.textPrimary, marginBottom:6 }}>{title}</div>
        <div style={{ fontSize:13, color:T.textSecondary, lineHeight:1.6, marginBottom:22 }}>{message}</div>
        <button onClick={onDone} style={{
          width:'100%', height:46, borderRadius:T.radiusPill,
          background:T.primary, color:'white',
          border:'none', fontSize:14, fontWeight:700,
          cursor:'pointer', fontFamily:T.fontSans,
        }}>{btnLabel}</button>
      </div>
    </div>
  );
}

function PolicyTable({ selectedPolicies, onToggle, checkColor = T.primary }) {
  const selBg = checkColor === '#DC2626' ? '#FFF5F5' : T.primaryLight;
  return (
    <div style={{ border:`1px solid ${T.border}`, borderRadius:12, overflow:'hidden' }}>
      <div style={{
        display:'grid', gridTemplateColumns:'32px 3fr 1.5fr 1.5fr 1fr',
        background:T.bgAlt, padding:'8px 12px',
        borderBottom:`1px solid ${T.border}`,
      }}>
        {['','Policy Name','Policy No.','Type','Cat'].map((h,i)=>(
          <div key={i} style={{ fontSize:10, fontWeight:700, color:T.textTertiary, textTransform:'uppercase', letterSpacing:0.3 }}>{h}</div>
        ))}
      </div>
      {POLICY_OPTIONS.map((pol,i)=>{
        const sel = selectedPolicies.includes(pol.id);
        return (
          <div key={pol.id} onClick={()=>onToggle(pol.id)} style={{
            display:'grid', gridTemplateColumns:'32px 3fr 1.5fr 1.5fr 1fr',
            padding:'10px 12px', cursor:'pointer',
            background: sel ? selBg : 'white',
            borderBottom: i < POLICY_OPTIONS.length-1 ? `1px solid ${T.border}` : 'none',
            alignItems:'center',
          }}>
            <div style={{
              width:18, height:18, borderRadius:4,
              border:`2px solid ${sel ? checkColor : T.border}`,
              background: sel ? checkColor : 'white',
              display:'flex', alignItems:'center', justifyContent:'center',
              color:'white', fontSize:11, fontWeight:800,
            }}>{sel?'✓':''}</div>
            <div style={{ fontSize:11, color:T.textPrimary, lineHeight:1.4, paddingRight:4 }}>{pol.policyName}</div>
            <div style={{ fontSize:11, color:T.textSecondary }}>{pol.policyNumber}</div>
            <div style={{ fontSize:11, color:T.textSecondary }}>{pol.policyType}</div>
            <div style={{ fontSize:11, color:T.textSecondary }}>{pol.category}</div>
          </div>
        );
      })}
    </div>
  );
}

function AttachRow({ files, onExisting, onNew, onRemove }) {
  return (
    <div>
      <div style={{ display:'flex', gap:10, alignItems:'center', flexWrap:'wrap' }}>
        <button onClick={onExisting} style={{
          display:'flex', alignItems:'center', gap:6,
          background:T.primary, color:'white', border:'none',
          borderRadius:T.radiusPill, padding:'7px 14px',
          fontSize:12, fontWeight:700, cursor:'pointer', fontFamily:T.fontSans,
        }}>📎 Attach Existing</button>
        <button onClick={onNew} style={{
          display:'flex', alignItems:'center', gap:4, background:'none',
          color:T.textSecondary, border:'none',
          fontSize:12, fontWeight:700, cursor:'pointer', fontFamily:T.fontSans,
        }}>＋ Attach New</button>
      </div>
      {files.length > 0 && (
        <div style={{ display:'flex', flexDirection:'column', gap:6, marginTop:8 }}>
          {files.map((f,i)=>(
            <div key={i} style={{
              display:'flex', alignItems:'center', gap:8,
              background:T.bgAlt, borderRadius:8, padding:'6px 10px',
            }}>
              <span style={{ fontSize:12 }}>📄</span>
              <span style={{ flex:1, fontSize:12, color:T.textSecondary }}>{f}</span>
              <button onClick={()=>onRemove(i)} style={{ background:'none', border:'none', cursor:'pointer', color:T.textTertiary, fontSize:16, lineHeight:1 }}>×</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* ════════════════════════════════════════
   Profile Screen
════════════════════════════════════════ */
function ProfileScreen({ onNav, onAction }) {
  const menuSections = [
    { section:'My Health', items:[
      { id:'family',   emoji:'👨‍👩‍👧', label:'My Family',      sub:'3 members covered',       ...T.tileBlue },
      { id:'ecard',    emoji:'💳',     label:'My E-Card',     sub:'View digital card',        ...T.tileTeal },
      { id:'rewards',  emoji:'🎁',     label:'Rewards',       sub:'1,250 points · Gold',      ...T.tileYellow },
    ]},
    { section:'Account', items:[
      { id:'settings', emoji:'⚙️',    label:'Settings',      sub:'Notifications, security',  ...T.tilePurple },
      { id:'about',    emoji:'ℹ️',    label:'About',         sub:'Version 1.0.0',             ...T.tileBlue },
      { id:'help',     emoji:'❓',    label:'Help & Support', sub:'FAQs, contact us',         ...T.tilePink },
    ]},
  ];

  return (
    <div style={{ display:'flex', flexDirection:'column', height:'100%', background:T.bg, fontFamily:T.fontSans }}>
      <div style={{ flex:1, overflowY:'auto' }}>
        <div style={{ padding:'20px 20px 0' }}>
          <div style={{ fontSize:17, fontWeight:800, color:T.textPrimary, marginBottom:16 }}>Profile</div>
          <div style={{ background:T.primaryLight, borderRadius:20, padding:'20px', display:'flex', alignItems:'center', gap:16, marginBottom:20 }}>
            <div style={{ position:'relative', flexShrink:0 }}>
              <div style={{ width:64, height:64, borderRadius:'50%', background:T.primary, display:'flex', alignItems:'center', justifyContent:'center', fontSize:22, fontWeight:800, color:'white' }}>SA</div>
              <div style={{ position:'absolute', bottom:1, right:1, width:14, height:14, borderRadius:'50%', background:T.success, border:'2px solid white' }}/>
            </div>
            <div style={{ flex:1 }}>
              <div style={{ fontSize:18, fontWeight:800, color:T.textPrimary }}>Sarah Anderson</div>
              <div style={{ fontSize:13, color:T.textSecondary, marginTop:1 }}>🏢 Al Noor Consulting</div>
              <div style={{ fontSize:12, color:T.primary, fontWeight:700, marginTop:4 }}>Lifestyle Plus · Gold++</div>
            </div>
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:10, marginBottom:24 }}>
            {[
              { val:'Active', label:'Policy', ...T.tileTeal },
              { val:'3', label:'Members', ...T.tileBlue },
              { val:'Gold++', label:'Network', ...T.tileYellow },
            ].map((s,i)=>(
              <div key={i} style={{ background:s.bg, borderRadius:14, padding:'12px 8px', textAlign:'center' }}>
                <div style={{ fontSize:16, fontWeight:800, color:s.fg }}>{s.val}</div>
                <div style={{ fontSize:11, color:T.textSecondary, marginTop:2 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
        <div style={{ padding:'0 20px' }}>
          {menuSections.map((section,si)=>(
            <div key={si} style={{ marginBottom:20 }}>
              <div style={{ fontSize:13, fontWeight:700, color:T.textTertiary, textTransform:'uppercase', letterSpacing:'0.7px', marginBottom:10, paddingLeft:2 }}>{section.section}</div>
              <div style={{ background:T.bgAlt, borderRadius:16, overflow:'hidden' }}>
                {section.items.map((item,ii)=>(
                  <button key={item.id} onClick={()=>onAction(item.id)} style={{
                    width:'100%', display:'flex', alignItems:'center', gap:12,
                    padding:'13px 16px', background:'none', border:'none', cursor:'pointer',
                    fontFamily:T.fontSans, textAlign:'left',
                    borderBottom:ii<section.items.length-1?`1px solid ${T.border}`:'none',
                  }}>
                    <div style={{ width:42, height:42, borderRadius:12, background:item.bg, display:'flex', alignItems:'center', justifyContent:'center', fontSize:20, flexShrink:0 }}>{item.emoji}</div>
                    <div style={{ flex:1 }}>
                      <div style={{ fontSize:14, fontWeight:700, color:T.textPrimary }}>{item.label}</div>
                      <div style={{ fontSize:12, color:T.textSecondary, marginTop:1 }}>{item.sub}</div>
                    </div>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={T.textTertiary} strokeWidth="2"><path d="M9 18l6-6-6-6"/></svg>
                  </button>
                ))}
              </div>
            </div>
          ))}
          <button style={{
            width:'100%', height:48, borderRadius:T.radiusPill,
            background:T.dangerLight, color:T.danger,
            border:'none', fontSize:14, fontWeight:700,
            cursor:'pointer', fontFamily:T.fontSans,
            display:'flex', alignItems:'center', justifyContent:'center', gap:8, marginBottom:20,
          }}>🚪 Sign Out</button>
        </div>
      </div>
    </div>
  );
}

/* ════════════════════════════════════════
   My Family Screen
════════════════════════════════════════ */
function FamilyScreen({ onBack, onViewMember, onEditMember, onCertificate, onReplacement, onDeleteMember }) {
  const members = Object.values(MEMBERS);

  return (
    <div style={{ display:'flex', flexDirection:'column', height:'100%', background:T.bg, fontFamily:T.fontSans }}>
      <PageHeader title="My Family" onBack={onBack}/>

      {/* Stats */}
      <div style={{ padding:'0 20px 16px' }}>
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:10 }}>
          {[
            { val:members.length, label:'Members',    ...T.tileBlue },
            { val:1,              label:'Principal',  ...T.tileTeal },
            { val:2,              label:'Dependants', ...T.tilePink },
          ].map((s,i)=>(
            <div key={i} style={{ background:s.bg, borderRadius:14, padding:'12px 8px', textAlign:'center' }}>
              <div style={{ fontSize:20, fontWeight:800, color:s.fg }}>{s.val}</div>
              <div style={{ fontSize:11, color:T.textSecondary, marginTop:2 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ flex:1, overflowY:'auto', padding:'0 20px' }}>
        {members.map(m=>(
          <div key={m.id} style={{ background:T.bgAlt, borderRadius:16, padding:'16px', marginBottom:12 }}>
            {/* Header */}
            <div style={{ display:'flex', alignItems:'center', gap:12, marginBottom:14 }}>
              <MemberAvatar member={m} size={50}/>
              <div style={{ flex:1 }}>
                <div style={{ fontSize:15, fontWeight:800, color:T.textPrimary }}>{m.name}</div>
                <div style={{ fontSize:12, color:T.textSecondary, marginTop:2 }}>{m.policyNumber}</div>
              </div>
              <div style={{ background:m.bg, color:m.color, fontSize:11, fontWeight:700, padding:'4px 12px', borderRadius:100 }}>{m.relation}</div>
            </div>

            {/* Detail rows */}
            <div style={{ background:'white', borderRadius:12, overflow:'hidden', marginBottom:12 }}>
              {[
                { label:'Policy Number', value:m.policyNumber },
                { label:'BenefitNet ID', value:m.benefitNetId },
              ].map((row,i)=>(
                <div key={i} style={{
                  display:'flex', justifyContent:'space-between', padding:'9px 14px',
                  borderBottom:i===0?`1px solid ${T.border}`:'none',
                }}>
                  <span style={{ fontSize:12.5, color:T.textSecondary }}>{row.label}</span>
                  <span style={{ fontSize:12.5, fontWeight:700, color:T.textPrimary }}>{row.value}</span>
                </div>
              ))}
            </div>

            {/* Action buttons — Row 1 */}
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:8, marginBottom:8 }}>
              <button onClick={()=>onViewMember(m)} style={{
                height:36, borderRadius:T.radiusPill,
                background:T.primaryLight, color:T.primary,
                border:`1.5px solid ${T.primary}33`,
                fontSize:12, fontWeight:700, cursor:'pointer', fontFamily:T.fontSans,
              }}>👁 View Details</button>
              <button onClick={()=>onEditMember(m)} style={{
                height:36, borderRadius:T.radiusPill,
                background:T.primary, color:'white',
                border:'none', fontSize:12, fontWeight:700,
                cursor:'pointer', fontFamily:T.fontSans,
                boxShadow:`0 4px 12px ${T.primary}44`,
              }}>✏️ Edit Details</button>
            </div>

            {/* Action buttons — Row 2 */}
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:8, marginBottom: m.relation !== 'Principal' ? 8 : 0 }}>
              <button onClick={()=>onCertificate(m)} style={{
                height:36, borderRadius:T.radiusPill,
                background:T.tileYellow.bg, color:T.tileYellow.fg,
                border:`1.5px solid ${T.tileYellow.fg}33`,
                fontSize:11.5, fontWeight:700, cursor:'pointer', fontFamily:T.fontSans,
              }}>🏆 Request Certificate</button>
              <button onClick={()=>onReplacement(m)} style={{
                height:36, borderRadius:T.radiusPill,
                background:T.tilePurple.bg, color:T.tilePurple.fg,
                border:`1.5px solid ${T.tilePurple.fg}33`,
                fontSize:11, fontWeight:700, cursor:'pointer', fontFamily:T.fontSans,
              }}>💳 Replacement Card</button>
            </div>

            {/* Delete — non-principal only */}
            {m.relation !== 'Principal' && (
              <button onClick={()=>onDeleteMember(m)} style={{
                width:'100%', height:36, borderRadius:T.radiusPill,
                background:T.dangerLight, color:T.danger,
                border:`1.5px solid ${T.danger}22`,
                fontSize:12, fontWeight:700, cursor:'pointer', fontFamily:T.fontSans,
              }}>🗑 Delete Member</button>
            )}
          </div>
        ))}
        <div style={{ height:16 }}/>
      </div>
    </div>
  );
}

/* ════════════════════════════════════════
   Member Detail Screen
════════════════════════════════════════ */
function MemberDetailScreen({ member, onBack }) {
  if (!member) return null;

  const sections = [
    { title:'Personal Information', emoji:'👤', ...T.tileBlue, items:[
      { label:'Relation',             value:member.relation },
      { label:'Company',              value:member.company },
      { label:'First Name',           value:member.firstName },
      { label:'Middle Name',          value:member.middleName },
      { label:'Last Name',            value:member.lastName },
      { label:'Date of Birth',        value:member.dateOfBirth },
      { label:'Birth Certificate ID', value:member.birthCertificateId },
      { label:'VIP Member',           value:member.vipMember ? 'Yes' : 'No', isCheckbox:true },
      { label:'Gender',               value:member.gender },
      { label:'Marital Status',       value:member.maritalStatus },
      { label:'Nationality',          value:member.nationality },
    ]},
    { title:'Employment Details', emoji:'💼', ...T.tilePurple, items:[
      { label:'Member Type',        value:member.memberType },
      { label:'Employee Number',    value:member.employeeNumber },
      { label:'Establishment Type', value:member.establishmentType },
      { label:'Establishment ID',   value:member.establishmentId },
    ]},
    { title:'Location Details', emoji:'📍', ...T.tileTeal, items:[
      { label:'Country of Residence',   value:member.countryOfResidence },
      { label:'Visa Issuance Location', value:member.visaIssuanceLocation },
      { label:'Work City',              value:member.workCity },
      { label:'Work Area',              value:member.workArea },
      { label:'Residential City',       value:member.residentialCity },
      { label:'Residential Area',       value:member.residentialArea },
      { label:'File Number',            value:member.fileNumber },
    ]},
    { title:'Identification', emoji:'🪪', ...T.tileYellow, items:[
      { label:'UID Number',             value:member.uidNumber },
      { label:'National ID Number',     value:member.nationalIdNumber },
      { label:'National ID Expiry',     value:member.nationalIdExpiryDate },
      { label:'Passport Number',        value:member.passportNumber },
      { label:'Passport Expiry',        value:member.passportExpiryDate },
    ]},
    { title:'Contact Information', emoji:'📞', ...T.tileGreen, items:[
      { label:'Phone Number',      value:member.phoneNumber },
      { label:'Email',             value:member.email },
      { label:'Alternative Email', value:member.alternativeEmail },
    ]},
    { title:'Salary & Employment', emoji:'💰', ...T.tileOrange, items:[
      { label:'Commission',        value:member.commission },
      { label:'Salary Bracket',    value:member.salaryBracket },
      { label:'Salary Type',       value:member.salaryType },
      { label:'Salary Currency',   value:member.salaryCurrency },
      { label:'Annual Salary',     value:member.annualSalary },
      { label:'Annual Allowances', value:member.annualAllowances },
      { label:'Employment Date',   value:member.employmentDate },
      { label:'Job Position',      value:member.jobPosition },
      { label:'Job Grade',         value:member.jobGrade },
      { label:'Department',        value:member.department },
      { label:'Cost Center',       value:member.costCenter },
    ]},
  ];

  return (
    <div style={{ display:'flex', flexDirection:'column', height:'100%', background:T.bg, fontFamily:T.fontSans }}>
      <PageHeader title="Member Details" onBack={onBack}/>

      {/* Hero card */}
      <div style={{ padding:'0 20px 16px' }}>
        <div style={{ background:member.bg, borderRadius:20, padding:'16px 20px', display:'flex', alignItems:'center', gap:14 }}>
          <MemberAvatar member={member} size={56}/>
          <div style={{ flex:1 }}>
            <div style={{ fontSize:18, fontWeight:800, color:T.textPrimary }}>{member.name}</div>
            <div style={{ display:'inline-block', background:'white', color:member.color, fontSize:11, fontWeight:700, padding:'3px 10px', borderRadius:100, marginTop:5 }}>{member.relation}</div>
          </div>
          <div style={{ textAlign:'right' }}>
            <div style={{ fontSize:11, color:T.textTertiary }}>BenefitNet ID</div>
            <div style={{ fontSize:14, fontWeight:800, color:T.textPrimary }}>{member.benefitNetId}</div>
            <div style={{ display:'inline-block', background:T.successLight, color:T.success, fontSize:10.5, fontWeight:700, padding:'2px 8px', borderRadius:100, marginTop:3 }}>Active</div>
          </div>
        </div>
      </div>

      <div style={{ flex:1, overflowY:'auto', padding:'0 20px' }}>
        {sections.map(section => {
          const hasValues = section.items.some(it => it.value);
          if (!hasValues) return null;
          return (
            <div key={section.title} style={{ marginBottom:14 }}>
              <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:8 }}>
                <div style={{ width:28, height:28, borderRadius:8, background:section.bg, display:'flex', alignItems:'center', justifyContent:'center', fontSize:14 }}>{section.emoji}</div>
                <div style={{ fontSize:13, fontWeight:700, color:T.textTertiary, textTransform:'uppercase', letterSpacing:'0.5px' }}>{section.title}</div>
              </div>
              <WhiteCard>
                {section.items.map((item, i) => (
                  <div key={item.label}>
                    <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', padding:'11px 16px' }}>
                      <span style={{ fontSize:13, color:T.textSecondary }}>{item.label}</span>
                      {item.isCheckbox ? (
                        <div style={{
                          width:20, height:20, borderRadius:5,
                          border:`2px solid ${item.value==='Yes' ? T.primary : T.border}`,
                          background: item.value==='Yes' ? T.primary : 'transparent',
                          display:'flex', alignItems:'center', justifyContent:'center',
                          color:'white', fontSize:12, fontWeight:800,
                        }}>{item.value==='Yes' ? '✓' : ''}</div>
                      ) : (
                        <span style={{ fontSize:13, fontWeight:700, color:T.textPrimary, textAlign:'right', maxWidth:'55%' }}>{item.value || '—'}</span>
                      )}
                    </div>
                    {i < section.items.length - 1 && <div style={{ height:1, background:T.border, marginLeft:16 }}/>}
                  </div>
                ))}
              </WhiteCard>
            </div>
          );
        })}
        <div style={{ height:20 }}/>
      </div>
    </div>
  );
}

/* ════════════════════════════════════════
   Edit Member Screen
════════════════════════════════════════ */
function EditMemberScreen({ member, onBack }) {
  if (!member) return null;

  const [formData, setFormData] = useState(() => {
    const d = {};
    EDITABLE_FIELDS.forEach(s => s.fields.forEach(f => {
      d[f.key] = f.type === 'checkbox' ? !!member[f.key] : String(member[f.key] || '');
    }));
    return d;
  });
  const [showSuccess, setShowSuccess] = useState(false);

  const update = (key, val) => setFormData(prev => ({ ...prev, [key]: val }));

  return (
    <div style={{ display:'flex', flexDirection:'column', height:'100%', background:T.bg, fontFamily:T.fontSans, position:'relative' }}>
      <PageHeader title="Edit Details" onBack={onBack}/>

      {/* Member hero */}
      <div style={{ padding:'0 20px 14px' }}>
        <div style={{ background:member.bg, borderRadius:16, padding:'14px 16px', display:'flex', alignItems:'center', gap:12 }}>
          <MemberAvatar member={member} size={48}/>
          <div>
            <div style={{ fontSize:15, fontWeight:800, color:T.textPrimary }}>{member.name}</div>
            <div style={{ display:'inline-block', background:'white', color:member.color, fontSize:11, fontWeight:700, padding:'2px 10px', borderRadius:100, marginTop:4 }}>{member.relation}</div>
          </div>
        </div>
      </div>

      <div style={{ flex:1, overflowY:'auto', padding:'0 20px' }}>
        {EDITABLE_FIELDS.map(section => (
          <div key={section.section} style={{ marginBottom:14 }}>
            <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:8 }}>
              <div style={{ width:28, height:28, borderRadius:8, background:section.bg, display:'flex', alignItems:'center', justifyContent:'center', fontSize:14 }}>{section.emoji}</div>
              <div style={{ fontSize:13, fontWeight:700, color:T.textTertiary, textTransform:'uppercase', letterSpacing:'0.5px' }}>{section.section}</div>
            </div>
            <div style={{ background:T.bgAlt, borderRadius:16, padding:'4px 16px' }}>
              {section.fields.map((field, i) => (
                <div key={field.key}>
                  {field.type === 'checkbox' ? (
                    <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'12px 0', cursor:'pointer' }} onClick={() => update(field.key, !formData[field.key])}>
                      <span style={{ fontSize:13.5, color:T.textPrimary }}>{field.label}</span>
                      <div style={{
                        width:22, height:22, borderRadius:6,
                        border:`2px solid ${formData[field.key] ? T.primary : T.border}`,
                        background: formData[field.key] ? T.primary : 'white',
                        display:'flex', alignItems:'center', justifyContent:'center',
                        color:'white', fontSize:13, fontWeight:800, cursor:'pointer',
                      }}>{formData[field.key] ? '✓' : ''}</div>
                    </div>
                  ) : (
                    <div style={{ padding:'10px 0' }}>
                      <div style={{ fontSize:12, color:T.textTertiary, marginBottom:5 }}>{field.label}</div>
                      <input
                        value={formData[field.key]}
                        onChange={e => update(field.key, e.target.value)}
                        placeholder={`Enter ${field.label.toLowerCase()}`}
                        style={{
                          width:'100%', height:40, borderRadius:T.radiusInput,
                          border:`1.5px solid ${T.border}`, background:'white',
                          padding:'0 12px', fontSize:13.5, color:T.textPrimary,
                          fontFamily:T.fontSans, outline:'none', boxSizing:'border-box',
                        }}
                      />
                    </div>
                  )}
                  {i < section.fields.length - 1 && <div style={{ height:1, background:T.border }}/>}
                </div>
              ))}
            </div>
          </div>
        ))}

        <button onClick={() => setShowSuccess(true)} style={{
          width:'100%', height:50, borderRadius:T.radiusPill,
          background:T.primary, color:'white', border:'none',
          fontSize:15, fontWeight:700, cursor:'pointer', fontFamily:T.fontSans,
          display:'flex', alignItems:'center', justifyContent:'center', gap:8,
          boxShadow:`0 4px 16px ${T.primary}44`, marginBottom:20,
        }}>Submit Changes</button>
      </div>

      <SuccessOverlay
        show={showSuccess}
        title="Changes Submitted!"
        message="Your changes have been submitted successfully and are pending approval."
        btnLabel="← Back to My Family"
        onDone={() => { setShowSuccess(false); onBack(); }}
      />
    </div>
  );
}

/* ════════════════════════════════════════
   Delete Member Screen
════════════════════════════════════════ */
function DeleteMemberScreen({ member, onBack, onDeleted }) {
  if (!member) return null;

  const [selectedPolicies, setSelectedPolicies] = useState([]);
  const [comments, setComments] = useState('');
  const [files, setFiles] = useState([]);
  const [showSuccess, setShowSuccess] = useState(false);
  const [policyError, setPolicyError] = useState('');

  const togglePolicy = id => {
    setSelectedPolicies(prev => prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]);
    setPolicyError('');
  };

  const handleConfirm = () => {
    if (selectedPolicies.length === 0) { setPolicyError('Please select at least one policy'); return; }
    setShowSuccess(true);
  };

  return (
    <div style={{ display:'flex', flexDirection:'column', height:'100%', background:T.bg, fontFamily:T.fontSans, position:'relative' }}>
      <PageHeader title="Delete Dependant" onBack={onBack}/>

      {/* Member badge */}
      <div style={{ padding:'0 20px 14px' }}>
        <div style={{ display:'flex', alignItems:'center', gap:12, background:T.dangerLight, borderRadius:14, padding:'12px 16px' }}>
          <MemberAvatar member={member} size={44}/>
          <div>
            <div style={{ fontSize:14, fontWeight:800, color:T.textPrimary }}>{member.name}</div>
            <div style={{ fontSize:12, color:T.danger, fontWeight:600, marginTop:2 }}>{member.relation}</div>
          </div>
        </div>
      </div>

      <div style={{ flex:1, overflowY:'auto', padding:'0 20px' }}>
        {/* Info banner */}
        <div style={{ display:'flex', gap:10, background:T.primaryLight, borderRadius:12, padding:'12px', marginBottom:14 }}>
          <span style={{ fontSize:16, flexShrink:0 }}>ℹ️</span>
          <div style={{ fontSize:12, color:T.primaryMid, lineHeight:1.6 }}>
            Please select the policy from which the member needs to be deleted. Based on your selections, Notifications and Pending Tasks will be created accordingly.
          </div>
        </div>

        {/* Policies */}
        <div style={{ marginBottom:14 }}>
          <SectionLabel required>Select Policies </SectionLabel>
          <PolicyTable selectedPolicies={selectedPolicies} onToggle={togglePolicy} checkColor={T.danger}/>
          {policyError && <div style={{ fontSize:12, color:T.danger, marginTop:6, fontWeight:600 }}>{policyError}</div>}
        </div>

        {/* Documents */}
        <div style={{ marginBottom:14 }}>
          <SectionLabel>Documents</SectionLabel>
          <div style={{ background:T.bgAlt, borderRadius:12, overflow:'hidden' }}>
            <div style={{ display:'grid', gridTemplateColumns:'1fr 2fr', background:T.border, padding:'8px 12px' }}>
              <div style={{ fontSize:10.5, fontWeight:700, color:T.textTertiary, textTransform:'uppercase' }}>Member</div>
              <div style={{ fontSize:10.5, fontWeight:700, color:T.textTertiary, textTransform:'uppercase' }}>Documents</div>
            </div>
            <div style={{ display:'grid', gridTemplateColumns:'1fr 2fr', padding:'12px', alignItems:'start', gap:12 }}>
              <div style={{ fontSize:13, color:T.textPrimary, fontWeight:600, paddingTop:4 }}>{member.name}</div>
              <AttachRow
                files={files}
                onExisting={() => setFiles(f => [...f, `Document_${f.length+1}.pdf`])}
                onNew={() => setFiles(f => [...f, `NewFile_${f.length+1}.pdf`])}
                onRemove={i => setFiles(f => f.filter((_,idx) => idx !== i))}
              />
            </div>
          </div>
        </div>

        {/* Comments */}
        <div style={{ marginBottom:16 }}>
          <SectionLabel>Comments</SectionLabel>
          <textarea
            value={comments} onChange={e => setComments(e.target.value)}
            placeholder="Please specify any comments"
            style={{
              width:'100%', minHeight:90, borderRadius:T.radiusInput,
              border:`1.5px solid ${T.border}`, background:'white',
              padding:'10px 12px', fontSize:13, color:T.textPrimary,
              fontFamily:T.fontSans, resize:'none', outline:'none',
              boxSizing:'border-box', lineHeight:1.6,
            }}
          />
        </div>

        {/* Actions */}
        <div style={{ display:'flex', gap:10, marginBottom:20 }}>
          <button onClick={handleConfirm} style={{
            height:44, borderRadius:T.radiusPill, padding:'0 24px',
            background:T.danger, color:'white', border:'none',
            fontSize:13, fontWeight:700, cursor:'pointer', fontFamily:T.fontSans,
          }}>Confirm Delete</button>
          <button onClick={onBack} style={{
            height:44, borderRadius:T.radiusPill, padding:'0 20px',
            background:T.bgAlt, color:T.textSecondary, border:`1.5px solid ${T.border}`,
            fontSize:13, fontWeight:700, cursor:'pointer', fontFamily:T.fontSans,
          }}>Cancel</button>
        </div>
      </div>

      <SuccessOverlay
        show={showSuccess}
        title="Member Deleted Successfully"
        message="The dependant has been removed from the selected policies. Notifications have been sent accordingly."
        onDone={() => { setShowSuccess(false); onDeleted(); }}
      />
    </div>
  );
}

/* ════════════════════════════════════════
   Request Certificate Screen
════════════════════════════════════════ */
function RequestCertificateScreen({ member, onBack }) {
  if (!member) return null;

  const CERT_TYPES = ['Travel Certificate', 'Medical Insurance Certificate'];

  const [certType, setCertType] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedPolicies, setSelectedPolicies] = useState([]);
  const [files, setFiles] = useState([]);
  const [comments, setComments] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const [errors, setErrors] = useState({});

  const togglePolicy = id => {
    setSelectedPolicies(prev => prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]);
    setErrors(e => ({ ...e, policy: undefined }));
  };

  const handleSubmit = () => {
    const errs = {};
    if (!certType) errs.certType = 'Please select a certificate type';
    else if (selectedPolicies.length === 0) errs.policy = 'Please select at least one policy';
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setShowSuccess(true);
  };

  return (
    <div style={{ display:'flex', flexDirection:'column', height:'100%', background:T.bg, fontFamily:T.fontSans, position:'relative' }}>
      <PageHeader title="Request Certificate" onBack={onBack}/>

      {/* Member badge */}
      <div style={{ padding:'0 20px 14px' }}>
        <div style={{ display:'flex', alignItems:'center', gap:12, background:T.tileYellow.bg, borderRadius:14, padding:'12px 16px' }}>
          <MemberAvatar member={member} size={44}/>
          <div>
            <div style={{ fontSize:14, fontWeight:800, color:T.textPrimary }}>{member.name}</div>
            <div style={{ fontSize:12, color:T.tileYellow.fg, fontWeight:600, marginTop:2 }}>{member.relation}</div>
          </div>
        </div>
      </div>

      <div style={{ flex:1, overflowY:'auto', padding:'0 20px' }}>
        {/* Certificate type */}
        <div style={{ marginBottom:14, position:'relative' }}>
          <SectionLabel required>Choose Type of Certificate </SectionLabel>
          <div onClick={() => setShowDropdown(!showDropdown)} style={{
            display:'flex', alignItems:'center', justifyContent:'space-between',
            height:44, borderRadius:T.radiusInput,
            border:`1.5px solid ${errors.certType ? T.danger : T.border}`,
            padding:'0 14px', cursor:'pointer', background:T.bgAlt,
          }}>
            <span style={{ fontSize:13.5, color: certType ? T.textPrimary : T.textTertiary, fontWeight: certType ? 600 : 400 }}>
              {certType || 'Please select...'}
            </span>
            <span style={{ fontSize:11, color:T.textTertiary }}>{showDropdown ? '▲' : '▼'}</span>
          </div>
          {errors.certType && <div style={{ fontSize:12, color:T.danger, marginTop:4, fontWeight:600 }}>{errors.certType}</div>}
          {showDropdown && (
            <div style={{
              position:'absolute', top:'100%', left:0, right:0, background:'white',
              border:`1.5px solid ${T.border}`, borderRadius:T.radiusInput,
              zIndex:100, boxShadow:T.shadowMd, overflow:'hidden', marginTop:2,
            }}>
              {CERT_TYPES.map((t, i) => (
                <div key={t} onClick={() => { setCertType(t); setShowDropdown(false); setErrors(e => ({...e, certType:undefined})); }} style={{
                  display:'flex', alignItems:'center', justifyContent:'space-between',
                  padding:'12px 14px', cursor:'pointer',
                  background: certType === t ? T.primaryLight : 'white',
                  borderBottom: i < CERT_TYPES.length-1 ? `1px solid ${T.border}` : 'none',
                }}>
                  <span style={{ fontSize:13.5, color: certType === t ? T.primary : T.textPrimary, fontWeight: certType === t ? 700 : 400 }}>{t}</span>
                  {certType === t && <span style={{ color:T.primary, fontWeight:800 }}>✓</span>}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Policies */}
        <div style={{ marginBottom:14 }}>
          <SectionLabel required>Policies </SectionLabel>
          {!certType ? (
            <div style={{ background:T.primaryLight, borderRadius:T.radiusInput, padding:'10px 14px', fontSize:13, color:T.primary, fontStyle:'italic' }}>
              Please select a certificate type to view available policies.
            </div>
          ) : (
            <>
              <PolicyTable selectedPolicies={selectedPolicies} onToggle={togglePolicy}/>
              {errors.policy && <div style={{ fontSize:12, color:T.danger, marginTop:6, fontWeight:600 }}>{errors.policy}</div>}
            </>
          )}
        </div>

        {/* Attached Files */}
        <div style={{ marginBottom:14 }}>
          <SectionLabel>Attached Files</SectionLabel>
          <AttachRow
            files={files}
            onExisting={() => setFiles(f => [...f, `Document_${f.length+1}.pdf`])}
            onNew={() => setFiles(f => [...f, `NewFile_${f.length+1}.pdf`])}
            onRemove={i => setFiles(f => f.filter((_,idx) => idx !== i))}
          />
        </div>

        {/* Comments */}
        <div style={{ marginBottom:16 }}>
          <SectionLabel>Comments</SectionLabel>
          <textarea
            value={comments} onChange={e => setComments(e.target.value)}
            placeholder="Please specify any comments"
            style={{
              width:'100%', minHeight:90, borderRadius:T.radiusInput,
              border:`1.5px solid ${T.border}`, background:T.bgAlt,
              padding:'10px 12px', fontSize:13, color:T.textPrimary,
              fontFamily:T.fontSans, resize:'none', outline:'none',
              boxSizing:'border-box', lineHeight:1.6,
            }}
          />
        </div>

        {/* Buttons */}
        <div style={{ display:'flex', gap:10, marginBottom:20 }}>
          <button onClick={handleSubmit} style={{
            height:44, borderRadius:T.radiusPill, padding:'0 28px',
            background:T.primary, color:'white', border:'none',
            fontSize:14, fontWeight:700, cursor:'pointer', fontFamily:T.fontSans,
          }}>Submit</button>
          <button onClick={onBack} style={{
            height:44, borderRadius:T.radiusPill, padding:'0 20px',
            background:T.bgAlt, color:T.textSecondary, border:`1.5px solid ${T.border}`,
            fontSize:14, fontWeight:700, cursor:'pointer', fontFamily:T.fontSans,
          }}>Cancel</button>
        </div>
      </div>

      <SuccessOverlay
        show={showSuccess}
        title="Certificate Requested!"
        message="Please note that this request has been submitted directly to your insurer."
        onDone={() => { setShowSuccess(false); onBack(); }}
      />
    </div>
  );
}

/* ════════════════════════════════════════
   Request Replacement Card Screen
════════════════════════════════════════ */
function RequestReplacementCardScreen({ member, onBack }) {
  if (!member) return null;

  const [selectedPolicies, setSelectedPolicies] = useState([]);
  const [files, setFiles] = useState([]);
  const [comments, setComments] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const [policyError, setPolicyError] = useState('');

  const togglePolicy = id => {
    setSelectedPolicies(prev => prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]);
    setPolicyError('');
  };

  const handleSubmit = () => {
    if (selectedPolicies.length === 0) { setPolicyError('Please select at least one policy'); return; }
    setShowSuccess(true);
  };

  return (
    <div style={{ display:'flex', flexDirection:'column', height:'100%', background:T.bg, fontFamily:T.fontSans, position:'relative' }}>
      <PageHeader title="Request Replacement Card" onBack={onBack}/>

      {/* Member badge */}
      <div style={{ padding:'0 20px 14px' }}>
        <div style={{ display:'flex', alignItems:'center', gap:12, background:T.tilePurple.bg, borderRadius:14, padding:'12px 16px' }}>
          <MemberAvatar member={member} size={44}/>
          <div>
            <div style={{ fontSize:14, fontWeight:800, color:T.textPrimary }}>{member.name}</div>
            <div style={{ fontSize:12, color:T.tilePurple.fg, fontWeight:600, marginTop:2 }}>{member.relation}</div>
          </div>
        </div>
      </div>

      <div style={{ flex:1, overflowY:'auto', padding:'0 20px' }}>
        {/* Policies */}
        <div style={{ marginBottom:14 }}>
          <SectionLabel required>Policies </SectionLabel>
          <PolicyTable selectedPolicies={selectedPolicies} onToggle={togglePolicy} checkColor={T.tilePurple.fg}/>
          {policyError && <div style={{ fontSize:12, color:T.danger, marginTop:6, fontWeight:600 }}>{policyError}</div>}
        </div>

        {/* Attached Files */}
        <div style={{ marginBottom:14 }}>
          <SectionLabel>Attached Files</SectionLabel>
          <AttachRow
            files={files}
            onExisting={() => setFiles(f => [...f, `Document_${f.length+1}.pdf`])}
            onNew={() => setFiles(f => [...f, `NewFile_${f.length+1}.pdf`])}
            onRemove={i => setFiles(f => f.filter((_,idx) => idx !== i))}
          />
        </div>

        {/* Comments */}
        <div style={{ marginBottom:16 }}>
          <SectionLabel>Comments</SectionLabel>
          <textarea
            value={comments} onChange={e => setComments(e.target.value)}
            placeholder="Please specify any comments"
            style={{
              width:'100%', minHeight:90, borderRadius:T.radiusInput,
              border:`1.5px solid ${T.border}`, background:T.bgAlt,
              padding:'10px 12px', fontSize:13, color:T.textPrimary,
              fontFamily:T.fontSans, resize:'none', outline:'none',
              boxSizing:'border-box', lineHeight:1.6,
            }}
          />
        </div>

        {/* Buttons */}
        <div style={{ display:'flex', gap:10, marginBottom:20 }}>
          <button onClick={handleSubmit} style={{
            height:44, borderRadius:T.radiusPill, padding:'0 28px',
            background:T.primary, color:'white', border:'none',
            fontSize:14, fontWeight:700, cursor:'pointer', fontFamily:T.fontSans,
          }}>Submit</button>
          <button onClick={onBack} style={{
            height:44, borderRadius:T.radiusPill, padding:'0 20px',
            background:T.bgAlt, color:T.textSecondary, border:`1.5px solid ${T.border}`,
            fontSize:14, fontWeight:700, cursor:'pointer', fontFamily:T.fontSans,
          }}>Cancel</button>
        </div>
      </div>

      <SuccessOverlay
        show={showSuccess}
        title="Replacement Card Requested!"
        message="Please note that this request has been submitted directly to your insurer."
        onDone={() => { setShowSuccess(false); onBack(); }}
      />
    </div>
  );
}

/* ════════════════════════════════════════
   Settings Screen
════════════════════════════════════════ */
function SettingsScreen({ onBack }) {
  const [notifs, setNotifs] = useState(true);
  const [biometric, setBiometric] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const Toggle = ({ value, onChange }) => (
    <div onClick={() => onChange(!value)} style={{
      width:44, height:26, borderRadius:13,
      background: value ? T.primary : T.border,
      position:'relative', cursor:'pointer', transition:'background 0.25s',
    }}>
      <div style={{
        position:'absolute', top:3, left: value ? 21 : 3,
        width:20, height:20, borderRadius:'50%', background:'white',
        boxShadow:'0 1px 4px rgba(0,0,0,0.2)', transition:'left 0.25s',
      }}/>
    </div>
  );

  return (
    <div style={{ display:'flex', flexDirection:'column', height:'100%', background:T.bg, fontFamily:T.fontSans }}>
      <PageHeader title="Settings" onBack={onBack}/>
      <div style={{ flex:1, overflowY:'auto', padding:'0 20px' }}>
        {[
          { title:'Account', rows:[
            { label:'Edit Profile',    sub:'Update your personal information', emoji:'✏️', arrow:true },
            { label:'Change Password', sub:'Update your login credentials',    emoji:'🔐', arrow:true },
            { label:'Email',           sub:'sarah.anderson@email.com',          emoji:'✉️' },
          ]},
          { title:'Preferences', rows:[
            { label:'Push Notifications', sub:'Alerts for claims and updates', emoji:'🔔', toggle:true, val:notifs,    set:setNotifs },
            { label:'Biometric Login',    sub:'Face ID or fingerprint',        emoji:'👆', toggle:true, val:biometric, set:setBiometric },
            { label:'Dark Mode',          sub:'Switch to dark theme',          emoji:'🌙', toggle:true, val:darkMode,  set:setDarkMode },
          ]},
          { title:'Support', rows:[
            { label:'Help Center',      sub:'FAQs and guides',      emoji:'❓', arrow:true },
            { label:'Contact Us',       sub:'Chat or call support',  emoji:'💬', arrow:true },
            { label:'Terms of Service', sub:'',                      emoji:'📄', arrow:true },
            { label:'Privacy Policy',   sub:'',                      emoji:'🔒', arrow:true },
          ]},
        ].map((section, si) => (
          <div key={si} style={{ marginBottom:20 }}>
            <div style={{ fontSize:12, fontWeight:700, color:T.textTertiary, textTransform:'uppercase', letterSpacing:'0.8px', marginBottom:8, paddingLeft:2 }}>
              {section.title}
            </div>
            <div style={{ background:T.bgAlt, borderRadius:16, overflow:'hidden' }}>
              {section.rows.map((row, i) => (
                <div key={i} style={{ padding:'13px 16px', borderBottom: i < section.rows.length-1 ? `1px solid ${T.border}` : 'none', display:'flex', alignItems:'center', gap:12 }}>
                  <div style={{ width:36, height:36, borderRadius:10, background:T.primaryLight, display:'flex', alignItems:'center', justifyContent:'center', fontSize:17, flexShrink:0 }}>{row.emoji}</div>
                  <div style={{ flex:1 }}>
                    <div style={{ fontSize:14, fontWeight:600, color:T.textPrimary }}>{row.label}</div>
                    {row.sub && <div style={{ fontSize:12, color:T.textSecondary, marginTop:1 }}>{row.sub}</div>}
                  </div>
                  {row.toggle
                    ? <Toggle value={row.val} onChange={row.set}/>
                    : row.arrow && (
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={T.textTertiary} strokeWidth="2"><path d="M9 18l6-6-6-6"/></svg>
                    )
                  }
                </div>
              ))}
            </div>
          </div>
        ))}
        <div style={{ height:8 }}/>
      </div>
    </div>
  );
}

/* ════════════════════════════════════════
   Help & Support Screen
════════════════════════════════════════ */
function HelpSupportScreen({ onBack }) {
  const [open, setOpen] = React.useState(null);
  const faqs = [
    { q:'How do I submit a claim?',          a:'Go to Claims and tap "Submit New Claim". Upload your documents and submit. Most claims are reviewed within 3-5 business days.' },
    { q:'How long does claim processing take?', a:'Standard claims are processed within 3-5 business days. Complex or surgical claims may take up to 10 business days.' },
    { q:'How do I add a family member?',     a:'Go to Profile → My Family and tap "Add Member". Fill in their details and submit for approval.' },
    { q:'Can I change my network provider?', a:'Network changes are subject to your policy terms. Contact support@wtwo.co for assistance.' },
    { q:'What should I do in a medical emergency?', a:'Call the emergency number on the back of your insurance card immediately. Pre-authorisation may be required for planned hospital admissions.' },
  ];
  const contacts = [
    { emoji:'📞', label:'Customer Support',   href:'tel:+97144000000',  sub:'+971 4 400 0000' },
    { emoji:'📧', label:'General Support',    href:'mailto:support@wtwo.co',  sub:'support@wtwo.co' },
    { emoji:'📋', label:'Claims Assistance',  href:'mailto:claims@wtwo.co',   sub:'claims@wtwo.co' },
    { emoji:'💼', label:'Corporate Enquiries',href:'mailto:corporate@wtwo.co',sub:'corporate@wtwo.co' },
  ];

  return (
    <div style={{ display:'flex', flexDirection:'column', height:'100%', background:T.bg, fontFamily:T.fontSans }}>
      <PageHeader title="Help & Support" onBack={onBack}/>
      <div style={{ flex:1, overflowY:'auto', padding:'0 20px' }}>

        <div style={{ marginBottom:20, marginTop:8 }}>
          <div style={{ fontSize:12, fontWeight:700, color:T.textTertiary, textTransform:'uppercase', letterSpacing:'0.8px', marginBottom:8, paddingLeft:2 }}>Frequently Asked Questions</div>
          <div style={{ background:T.bgAlt, borderRadius:16, overflow:'hidden' }}>
            {faqs.map((faq,i)=>(
              <div key={i} style={{ borderBottom:i<faqs.length-1?`1px solid ${T.border}`:'none' }}>
                <button onClick={()=>setOpen(open===i?null:i)} style={{
                  width:'100%', display:'flex', alignItems:'center', gap:12,
                  padding:'13px 16px', background:'none', border:'none', cursor:'pointer',
                  fontFamily:T.fontSans, textAlign:'left',
                }}>
                  <div style={{ flex:1, fontSize:14, fontWeight:600, color:T.textPrimary }}>{faq.q}</div>
                  <svg style={{ flexShrink:0, transition:'transform 0.2s', transform:open===i?'rotate(180deg)':'rotate(0deg)' }}
                    width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={T.textTertiary} strokeWidth="2">
                    <path d="M6 9l6 6 6-6"/>
                  </svg>
                </button>
                {open===i && (
                  <div style={{ padding:'0 16px 14px', fontSize:13, color:T.textSecondary, lineHeight:1.65 }}>{faq.a}</div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div style={{ marginBottom:20 }}>
          <div style={{ fontSize:12, fontWeight:700, color:T.textTertiary, textTransform:'uppercase', letterSpacing:'0.8px', marginBottom:8, paddingLeft:2 }}>Contact Us</div>
          <div style={{ background:T.bgAlt, borderRadius:16, overflow:'hidden' }}>
            {contacts.map((c,i,arr)=>(
              <a key={i} href={c.href} style={{
                display:'flex', alignItems:'center', gap:12,
                padding:'13px 16px', textDecoration:'none',
                borderBottom:i<arr.length-1?`1px solid ${T.border}`:'none',
              }}>
                <div style={{ width:42, height:42, borderRadius:12, background:T.primaryLight, display:'flex', alignItems:'center', justifyContent:'center', fontSize:20, flexShrink:0 }}>{c.emoji}</div>
                <div style={{ flex:1 }}>
                  <div style={{ fontSize:14, fontWeight:700, color:T.textPrimary }}>{c.label}</div>
                  <div style={{ fontSize:12, color:T.primary, marginTop:1 }}>{c.sub}</div>
                </div>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={T.textTertiary} strokeWidth="2"><path d="M9 18l6-6-6-6"/></svg>
              </a>
            ))}
          </div>
        </div>

        <div style={{ height:8 }}/>
      </div>
    </div>
  );
}

Object.assign(window, {
  ProfileScreen,
  FamilyScreen,
  MemberDetailScreen,
  EditMemberScreen,
  DeleteMemberScreen,
  RequestCertificateScreen,
  RequestReplacementCardScreen,
  SettingsScreen,
  HelpSupportScreen,
});
