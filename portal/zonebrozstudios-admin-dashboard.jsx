import { useState, useEffect, useRef } from "react";
import { supabase } from "./src/supabase.js";

const I = {
  Dash: () => <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="3" y="3" width="7" height="9" rx="1.5"/><rect x="14" y="3" width="7" height="5" rx="1.5"/><rect x="14" y="12" width="7" height="9" rx="1.5"/><rect x="3" y="16" width="7" height="5" rx="1.5"/></svg>,
  Proj: () => <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M22 19a2 2 0 01-2 2H4a2 2 0 01-2-2V5a2 2 0 012-2h5l2 3h9a2 2 0 012 2z"/></svg>,
  Users: () => <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/></svg>,
  Money: () => <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></svg>,
  Chat: () => <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>,
  File: () => <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>,
  Team: () => <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="12" cy="8" r="4"/><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/></svg>,
  Gear: () => <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/></svg>,
  Plus: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>,
  Edit: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>,
  Trash: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"/></svg>,
  Send: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>,
  X: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>,
  Chk: () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg>,
  Clk: () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
  Up: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>,
  Down: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="23 18 13.5 8.5 8.5 13.5 1 6"/><polyline points="17 18 23 18 23 12"/></svg>,
  Upload: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><polyline points="16 16 12 12 8 16"/><line x1="12" y1="12" x2="12" y2="21"/><path d="M20.39 18.39A5 5 0 0018 9h-1.26A8 8 0 103 16.3"/></svg>,
  Dl: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>,
  Bell: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 01-3.46 0"/></svg>,
  Menu: () => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>,
  Mail: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>,
  Link: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71"/></svg>,
  Copy: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg>,
  Search: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>,
  Out: () => <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>,
  Back: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>,
};

const ASSIGNEE_OPTIONS = [{ id: 0, name: "Unassigned" }];
const DEVELOPER_OPTIONS = ["Zendyn Reddy", "Alex Chen", "Sam Williams", "Jordan Lee", "Unassigned"];

const R = n => "R\u00A0" + n.toLocaleString("en-ZA");
const SC = {"in-progress":{bg:"#0d2818",tx:"#4ade80",l:"In Progress"},review:{bg:"#2d2305",tx:"#facc15",l:"In Review"},pending:{bg:"#15161a",tx:"#71717a",l:"Pending"},complete:{bg:"#0d2818",tx:"#4ade80",l:"Complete"},paid:{bg:"#0d2818",tx:"#4ade80",l:"Paid"},overdue:{bg:"#2a0d0d",tx:"#f87171",l:"Overdue"},upcoming:{bg:"#15161a",tx:"#71717a",l:"Upcoming"},active:{bg:"#0d2818",tx:"#4ade80",l:"Active"},lead:{bg:"#1a1535",tx:"#a78bfa",l:"Lead"}};
const PR = {high:{bg:"#2a0d0d",tx:"#f87171",l:"High"},medium:{bg:"#2d2305",tx:"#facc15",l:"Medium"},low:{bg:"#0d2818",tx:"#4ade80",l:"Low"}};
const FTC = {pdf:"#f87171",design:"#a78bfa",image:"#38bdf8",archive:"#facc15",doc:"#60a5fa",video:"#fb923c"};
const Badge = ({s}) => {const c=SC[s]||SC.pending;return <span style={{display:"inline-flex",alignItems:"center",gap:5,padding:"3px 10px",borderRadius:6,fontSize:10.5,fontWeight:600,background:c.bg,color:c.tx}}><span style={{width:5,height:5,borderRadius:"50%",background:c.tx}}/>{c.l}</span>;};
const Pri = ({p}) => {const c=PR[p]||PR.low;return <span style={{padding:"2px 8px",borderRadius:5,fontSize:10,fontWeight:600,background:c.bg,color:c.tx}}>{c.l}</span>;};
const B = t => ({padding:"9px 18px",borderRadius:9,fontSize:12,fontWeight:600,cursor:"pointer",display:"inline-flex",alignItems:"center",gap:7,border:"none",fontFamily:"Outfit,sans-serif",...(t==="p"?{background:"#c8ff00",color:"#000"}:{background:"transparent",color:"#a0a0ad",border:"1px solid #222228"})});
const ib = {background:"none",border:"none",color:"#636370",cursor:"pointer",padding:5,borderRadius:6,display:"flex",alignItems:"center"};
const fi = {width:"100%",padding:"10px 14px",background:"#060607",border:"1px solid #222228",borderRadius:9,color:"#f5f5f7",fontSize:13.5,outline:"none",fontFamily:"Outfit,sans-serif"};
const fl = {display:"block",fontSize:11.5,fontWeight:500,color:"#a0a0ad",marginBottom:7};

function Modal({title,onClose,children,footer}) {
  return <div onClick={onClose} style={{position:"fixed",inset:0,background:"rgba(0,0,0,.65)",backdropFilter:"blur(6px)",zIndex:500,display:"flex",alignItems:"center",justifyContent:"center",padding:20}}>
    <div onClick={e=>e.stopPropagation()} style={{background:"#0c0c0e",border:"1px solid #222228",borderRadius:16,width:"100%",maxWidth:560,maxHeight:"90vh",overflowY:"auto"}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"20px 22px 16px",borderBottom:"1px solid #222228"}}><h3 style={{fontSize:17,fontWeight:600}}>{title}</h3><button onClick={onClose} style={{background:"none",border:"none",color:"#636370",cursor:"pointer"}}><I.X/></button></div>
      <div style={{padding:22}}>{children}</div>
      {footer&&<div style={{padding:"14px 22px",borderTop:"1px solid #222228",display:"flex",justifyContent:"flex-end",gap:10}}>{footer}</div>}
    </div>
  </div>;
}

const CSS = `@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&family=Geist+Mono:wght@400;500;600&display=swap');
*{margin:0;padding:0;box-sizing:border-box}body{font-family:Outfit,sans-serif;background:#060607;color:#f5f5f7;-webkit-font-smoothing:antialiased}.sb-hide{transform:translateX(-100%)}::selection{background:#c8ff00;color:#000}input,textarea,select{font-family:Outfit,sans-serif}::-webkit-scrollbar{width:5px}::-webkit-scrollbar-thumb{background:#2e2e36;border-radius:3px}select{cursor:pointer;appearance:none;background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%2371717a' stroke-width='2'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E");background-repeat:no-repeat;background-position:right 12px center}`;

function formatRelative(dateStr) {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return dateStr;
  const now = new Date();
  const diffMs = now - d;
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);
  if (diffMins < 1) return "Just now";
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays === 1) return "Yesterday";
  if (diffDays < 7) return `${diffDays} days ago`;
  return d.toLocaleDateString();
}

function DashPage({projects,clients,payments,files,convos,onOpenProject}) {
  const rev=payments.filter(p=>p.status==="paid").reduce((s,p)=>s+p.amount,0);
  const pend=payments.filter(p=>["pending","overdue"].includes(p.status)).reduce((s,p)=>s+p.amount,0);
  const od=payments.filter(p=>p.status==="overdue");
  const activeProjects = projects.filter(p=>p.status!=="complete");
  const activeCount = activeProjects.length;
  const activities = [];
  (files||[]).forEach(f=>{ activities.push({ sortKey: f.date || "1970-01-01", text: `${f.by} uploaded ${f.name}`, color: "#a78bfa" }); });
  (payments||[]).filter(p=>p.status==="overdue").forEach(p=>{ activities.push({ sortKey: p.due || "", text: `Invoice overdue — ${p.client} ${R(p.amount)}`, color: "#f87171" }); });
  (payments||[]).filter(p=>p.status==="paid").forEach(p=>{ activities.push({ sortKey: p.due || "", text: `Payment from ${p.client} — ${R(p.amount)}`, color: "#4ade80" }); });
  (clients||[]).forEach(c=>{ const j = c.joined || c.created_at; if (j) activities.push({ sortKey: typeof j==="string" ? j.slice(0,10) : "", text: `New lead: ${c.name}`, color: "#60a5fa" }); });
  (convos||[]).forEach(c=>{ (c.msgs||[]).filter(m=>m.isC && m.ts).forEach(m=>{ activities.push({ sortKey: m.ts, text: `Message from ${m.from}`, color: "#c8ff00" }); }); });
  activities.sort((a,b)=>b.sortKey.localeCompare(a.sortKey));
  const recentActivities = activities.map((a,i)=>({ ...a, tm: formatRelative(a.sortKey) }));
  return <div>
    <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(195px,1fr))",gap:14,marginBottom:28}}>
      {[{l:"Total Revenue",v:R(rev),c:"#c8ff00",ch:"+23%",up:1},{l:"Outstanding",v:R(pend),c:"#facc15",ch:od.length+" overdue",up:0},{l:"Active Projects",v:activeCount,c:"#f5f5f7",ch:"+2 this qtr",up:1},{l:"Clients",v:clients.length,c:"#f5f5f7",ch:"+1 new lead",up:1}].map((s,i)=>
        <div key={i} style={{background:"#111114",border:"1px solid #222228",borderRadius:12,padding:18}}>
          <div style={{fontSize:11,fontWeight:500,letterSpacing:1.2,textTransform:"uppercase",color:"#636370",marginBottom:8}}>{s.l}</div>
          <div style={{fontFamily:"'Geist Mono',monospace",fontSize:22,fontWeight:600,color:s.c}}>{s.v}</div>
          <div style={{display:"flex",alignItems:"center",gap:4,fontSize:11,marginTop:6,fontWeight:500,color:s.up?"#4ade80":"#f87171"}}>{s.up?<I.Up/>:<I.Down/>}{s.ch}</div>
        </div>)}
    </div>
    <div style={{fontSize:11,fontWeight:600,letterSpacing:2,textTransform:"uppercase",color:"#636370",margin:"8px 0 14px"}}>Project Overview</div>
    <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(320px,1fr))",gap:16,marginBottom:28}}>
      {activeProjects.map(p=><div key={p.id} role="button" tabIndex={0} onClick={()=>onOpenProject?.(p)} onKeyDown={e=>e.key==="Enter"&&onOpenProject?.(p)} style={{background:"#111114",border:"1px solid #222228",borderRadius:13,padding:22,cursor:onOpenProject?"pointer":"default"}}>
        <div style={{display:"flex",justifyContent:"space-between",marginBottom:8}}>
          <div><span style={{fontFamily:"'Geist Mono',monospace",fontSize:10,color:"#636370"}}>{p.id}</span><div style={{fontSize:15,fontWeight:600,marginTop:4}}>{p.name}</div><div style={{fontSize:12,color:"#636370",marginTop:2}}>{p.client}</div></div>
          <div style={{display:"flex",flexDirection:"column",alignItems:"flex-end",gap:5}}><Badge s={p.status}/><Pri p={p.priority}/></div>
        </div>
        <div style={{width:"100%",height:5,background:"#1e1e23",borderRadius:3,overflow:"hidden",margin:"10px 0"}}><div style={{height:"100%",borderRadius:3,background:"linear-gradient(90deg,#c8ff00,#88cc00)",width:`${p.progress}%`,transition:"width .8s"}}/></div>
        <div style={{display:"flex",justifyContent:"space-between",fontSize:11.5}}><span style={{color:"#636370"}}>Progress</span><span style={{fontFamily:"'Geist Mono',monospace",color:"#c8ff00",fontSize:11}}>{p.progress}%</span></div>
        <div style={{display:"flex",justifyContent:"space-between",marginTop:14,paddingTop:14,borderTop:"1px solid #222228",fontSize:11.5,color:"#636370"}}><span>{R(p.paid)}/{R(p.budget)}</span><span>Due: {p.deadline}</span></div>
      </div>)}
    </div>
    {od.length>0&&<><div style={{fontSize:11,fontWeight:600,letterSpacing:2,textTransform:"uppercase",color:"#f87171",margin:"8px 0 14px"}}>Overdue Payments</div>
    <div style={{border:"1px solid #222228",borderRadius:13,background:"#111114",overflow:"auto",marginBottom:28}}><table style={{width:"100%",borderCollapse:"collapse"}}><thead><tr>{["Invoice","Client","Amount","Due"].map(h=><th key={h} style={{fontSize:10,fontWeight:600,letterSpacing:1.5,textTransform:"uppercase",color:"#636370",textAlign:"left",padding:"12px 18px",borderBottom:"1px solid #222228",background:"#0c0c0e"}}>{h}</th>)}</tr></thead><tbody>{od.map(p=><tr key={p.id}><td style={{padding:"12px 18px",fontFamily:"'Geist Mono',monospace",fontSize:12,fontWeight:500,color:"#f5f5f7"}}>{p.id}</td><td style={{padding:"12px 18px",fontSize:13,color:"#a0a0ad"}}>{p.client}</td><td style={{padding:"12px 18px",fontFamily:"'Geist Mono',monospace",fontWeight:600,color:"#f87171"}}>{R(p.amount)}</td><td style={{padding:"12px 18px",fontSize:13,color:"#f87171"}}>{p.due}</td></tr>)}</tbody></table></div></>}
    <div style={{fontSize:11,fontWeight:600,letterSpacing:2,textTransform:"uppercase",color:"#636370",margin:"8px 0 14px"}}>Recent Activity</div>
    <div style={{background:"#111114",border:"1px solid #222228",borderRadius:13,maxHeight:330,overflowY:"auto"}}>
      {recentActivities.length===0?<div style={{padding:"20px",fontSize:13,color:"#636370"}}>No recent activity yet.</div>:recentActivities.map((a,i)=>
        <div key={i} style={{display:"flex",alignItems:"center",gap:14,padding:"13px 20px",borderBottom:i<recentActivities.length-1?"1px solid #222228":"none"}}><span style={{width:8,height:8,borderRadius:"50%",background:a.color,flexShrink:0}}/><span style={{fontSize:13,color:"#a0a0ad",flex:1}}>{a.text}</span><span style={{fontSize:11,color:"#636370"}}>{a.tm}</span></div>)}
    </div>
  </div>;
}

function ProjPage({projects,setProjects,clients,onAddProject,onUpdateProject,searchQuery,developerOptions,initialProjectId,onOpenProjectIdConsumed}) {
  const [modal,setModal]=useState(false);const [detail,setDetail]=useState(null);const [tab,setTab]=useState("all");const [clientFlt,setClientFlt]=useState("all");const [editMs,setEditMs]=useState(null);
  const [form,setForm]=useState({name:"",client:"",service:"Web Development",priority:"medium",budget:"",deadline:"",desc:""});
  const [submitting,setSubmitting]=useState(false);const [err,setErr]=useState("");
  useEffect(() => {
    if (!initialProjectId || !projects?.length || !onOpenProjectIdConsumed) return;
    const p = projects.find(pr => pr.id === initialProjectId);
    if (p) setDetail(p);
    onOpenProjectIdConsumed();
  }, [initialProjectId, projects, onOpenProjectIdConsumed]);
  const q=(searchQuery||"").trim().toLowerCase();
  const searchProjects=q?projects.filter(p=>(p.name||"").toLowerCase().includes(q)||(p.client||"").toLowerCase().includes(q)):projects;
  const clientList=["all",...[...new Set(searchProjects.map(p=>p.client))].filter(Boolean).sort()];
  const byStatus=tab==="all"?searchProjects:searchProjects.filter(p=>p.status===tab);
  const filtered=clientFlt==="all"?byStatus:byStatus.filter(p=>p.client===clientFlt);
  const add=async()=>{
    setErr("");
    if(onAddProject){setSubmitting(true);try{await onAddProject(form);setModal(false);}catch(e){setErr(e.body?.error||e.message);}finally{setSubmitting(false);}return;}
    setProjects([...projects,{id:`PRJ-${String(projects.length+1).padStart(3,"0")}`,name:form.name,client:form.client,status:"pending",progress:0,deadline:form.deadline,budget:Number(form.budget)||0,paid:0,assignee:"Unassigned",service:form.service,priority:form.priority,desc:form.desc,ms:[{n:"Kickoff",s:"pending",d:form.deadline}]}]);setModal(false);
  };

  if(detail){const p=detail;
    const ms=p.ms||[];
    const updateMs=(newMs,clearEdit=true)=>{
      setDetail({...p,ms:newMs});if(clearEdit)setEditMs(null);
      if(onUpdateProject) onUpdateProject(p.id,{milestones:newMs}).catch(e=>setErr(e?.message||"Failed to save"));
      else {const u=projects.map(x=>x.id===p.id?{...x,ms:newMs}:x);setProjects(u);}
    };
    const addMilestone=()=>{const newMs=[...ms,{n:"New milestone",s:"pending",d:p.deadline||""}];updateMs(newMs,false);setEditMs(newMs.length-1);};
    const deleteMilestone=(i)=>{updateMs(ms.filter((_,j)=>j!==i));};
    const setStatus=(status)=>{
      setDetail({...p,status});
      if(onUpdateProject) onUpdateProject(p.id,{status}).catch(e=>setErr(e?.message||"Failed to save"));
      else {const u=projects.map(x=>x.id===p.id?{...x,status}:x);setProjects(u);}
    };
    const setProgress=(v)=>{
      const num=Math.min(100,Math.max(0,Number(v)||0));
      setDetail({...p,progress:num});
      if(onUpdateProject) onUpdateProject(p.id,{progress:num}).catch(e=>setErr(e?.message||"Failed to save"));
      else {const u=projects.map(x=>x.id===p.id?{...x,progress:num}:x);setProjects(u);}
    };
    return <div>
    <button onClick={()=>setDetail(null)} style={{display:"inline-flex",alignItems:"center",gap:6,color:"#636370",fontSize:12.5,cursor:"pointer",marginBottom:18,background:"none",border:"none",fontFamily:"Outfit,sans-serif"}}><I.Back/> Back</button>
    <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",flexWrap:"wrap",gap:16,marginBottom:24}}>
      <div><span style={{fontFamily:"'Geist Mono',monospace",fontSize:11,color:"#636370"}}>{p.id} • {p.client}</span><h2 style={{fontSize:24,fontWeight:700,marginTop:4}}>{p.name}</h2><p style={{color:"#636370",fontSize:13.5,marginTop:6,maxWidth:600,lineHeight:1.5}}>{p.desc}</p></div>
      <div style={{display:"flex",gap:8,alignItems:"center"}}><Badge s={p.status}/><Pri p={p.priority}/>
        <select style={{...fi,width:"auto",padding:"6px 30px 6px 10px",fontSize:12}} value={p.status} onChange={e=>setStatus(e.target.value)}>
          <option value="pending">Pending</option><option value="in-progress">In Progress</option><option value="review">In Review</option><option value="complete">Complete</option></select></div>
    </div>
    <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(155px,1fr))",gap:14,marginBottom:28}}>
      {[{l:"Progress",v:p.progress+"%",c:"#c8ff00"},{l:"Budget",v:R(p.budget)},{l:"Paid",v:R(p.paid),c:"#c8ff00"},{l:"Remaining",v:R(p.budget-p.paid),c:"#facc15"}].map((s,i)=>
        <div key={i} style={{background:"#111114",border:"1px solid #222228",borderRadius:12,padding:18}}><div style={{fontSize:11,fontWeight:500,letterSpacing:1.2,textTransform:"uppercase",color:"#636370",marginBottom:8}}>{s.l}</div><div style={{fontSize:16,fontWeight:600,color:s.c||"#f5f5f7"}}>{s.v}</div></div>)}
    </div>
    <div style={{marginBottom:24}}>
      <div style={{fontSize:11,fontWeight:600,letterSpacing:1.5,textTransform:"uppercase",color:"#636370",marginBottom:10}}>Update progress</div>
      <div style={{display:"flex",alignItems:"center",gap:14,flexWrap:"wrap"}}>
        <input type="range" min={0} max={100} value={p.progress} onChange={e=>setProgress(e.target.value)} style={{flex:1,minWidth:120,accentColor:"#c8ff00"}}/>
        <input type="number" min={0} max={100} value={p.progress} onChange={e=>setProgress(e.target.value)} style={{...fi,width:64,textAlign:"center",padding:"8px 10px"}}/>
        <span style={{fontSize:13,color:"#636370"}}>%</span>
      </div>
    </div>
    <div style={{marginBottom:24}}>
      <div style={{fontSize:11,fontWeight:600,letterSpacing:1.5,textTransform:"uppercase",color:"#636370",marginBottom:10}}>Current developers</div>
      <div style={{display:"flex",flexWrap:"wrap",alignItems:"center",gap:8}}>
        {(p.developers||[]).map((dev,i)=><span key={i} style={{display:"inline-flex",alignItems:"center",gap:6,background:"#111114",border:"1px solid #222228",borderRadius:8,padding:"6px 12px",fontSize:12.5,color:"#f5f5f7"}}>{dev}<button type="button" onClick={()=>{const next=(p.developers||[]).filter((_,j)=>j!==i);setDetail({...p,developers:next});if(onUpdateProject)onUpdateProject(p.id,{developers:next}).catch(e=>setErr(e?.message));else setProjects(projects.map(x=>x.id===p.id?{...x,developers:next}:x));}} style={{...ib,padding:2,color:"#636370",marginLeft:2}}><I.X/></button></span>)}
        <select style={{...fi,width:"auto",minWidth:160,padding:"6px 28px 6px 10px",fontSize:12}} value="" onChange={e=>{const name=e.target.value;if(!name)return;const current=p.developers||[];if(current.includes(name))return;const next=[...current,name];setDetail({...p,developers:next});e.target.value="";if(onUpdateProject)onUpdateProject(p.id,{developers:next}).catch(err=>setErr(err?.message));else setProjects(projects.map(x=>x.id===p.id?{...x,developers:next}:x));}}>
          <option value="">+ Add developer</option>
          {(developerOptions||DEVELOPER_OPTIONS).filter(d=>(p.developers||[]).indexOf(d)<0).map(d=><option key={d} value={d}>{d}</option>)}
        </select>
      </div>
      {(p.developers||[]).length===0&&<span style={{fontSize:12,color:"#636370"}}>No developers assigned yet</span>}
    </div>
    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14}}>
      <div style={{fontSize:11,fontWeight:600,letterSpacing:2,textTransform:"uppercase",color:"#636370"}}>Milestones</div>
      <button type="button" style={{...B("p"),padding:"6px 12px",fontSize:11}} onClick={addMilestone}><I.Plus/> Add milestone</button>
    </div>
    <div style={{background:"#111114",border:"1px solid #222228",borderRadius:13,padding:22}}>
      {ms.map((m,i)=><div key={i} style={{display:"flex",alignItems:"center",gap:14,padding:"13px 0",borderBottom:i<ms.length-1?"1px solid rgba(34,34,40,.4)":"none",flexWrap:"wrap"}}>
        <div style={{width:28,height:28,borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,...(m.s==="complete"?{background:"rgba(74,222,128,.12)",color:"#4ade80"}:m.s==="in-progress"?{background:"rgba(200,255,0,.08)",color:"#c8ff00"}:{background:"#1e1e23",color:"#636370"})}}>{m.s==="complete"?<I.Chk/>:m.s==="in-progress"?<I.Clk/>:<span style={{width:6,height:6,borderRadius:"50%",background:"#636370",opacity:.3}}/>}</div>
        {editMs===i?(
          <>
            <input style={{...fi,flex:1,minWidth:140}} value={m.n} onChange={e=>{const nm=[...ms];nm[i]={...nm[i],n:e.target.value};updateMs(nm,false);}} placeholder="Milestone name" />
            <input style={{...fi,width:130}} type="date" value={m.d||""} onChange={e=>{const nm=[...ms];nm[i]={...nm[i],d:e.target.value};updateMs(nm,false);}} />
            <button type="button" style={{...ib,padding:"6px 10px",color:"#c8ff00"}} onClick={()=>setEditMs(null)} title="Done"><I.Chk/></button>
          </>
        ):(
          <>
            <span style={{flex:1,fontSize:13.5,fontWeight:500,opacity:m.s==="pending"?.45:1,minWidth:0}}>{m.n}</span>
            <span style={{fontFamily:"'Geist Mono',monospace",fontSize:11,color:"#636370"}}>{m.d}</span>
            <select style={{...fi,width:"auto",padding:"4px 26px 4px 8px",fontSize:11,background:"#0c0c0e"}} value={m.s} onChange={e=>{const nm=[...ms];nm[i]={...nm[i],s:e.target.value};updateMs(nm,false);}}>
              <option value="pending">Pending</option><option value="in-progress">In Progress</option><option value="complete">Complete</option></select>
            <button type="button" style={ib} onClick={()=>setEditMs(i)} title="Edit"><I.Edit/></button>
            <button type="button" style={ib} onClick={()=>deleteMilestone(i)} title="Delete"><I.Trash/></button>
          </>
        )}
      </div>)}
    </div>
  </div>;}

  return <div>
    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:20,flexWrap:"wrap",gap:10}}>
      <div style={{display:"flex",flexWrap:"wrap",alignItems:"center",gap:10}}>
        <div style={{display:"flex",gap:2}}>{["all","in-progress","review","pending","complete"].map(f=><span key={f} onClick={()=>setTab(f)} style={{padding:"10px 14px",fontSize:12.5,fontWeight:500,color:tab===f?"#c8ff00":"#636370",cursor:"pointer",borderBottom:tab===f?"2px solid #c8ff00":"2px solid transparent"}}>{f==="all"?"All":SC[f]?.l||f}</span>)}</div>
        <select style={{...fi,width:"auto",minWidth:160,padding:"8px 28px 8px 12px",fontSize:12}} value={clientFlt} onChange={e=>setClientFlt(e.target.value)} title="Filter by client">
          {clientList.map(c=><option key={c} value={c}>{c==="all"?"All clients":c}</option>)}
        </select>
      </div>
      <button style={B("p")} onClick={()=>setModal(true)}><I.Plus/> New Project</button>
    </div>
    <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(320px,1fr))",gap:16}}>
      {filtered.map(p=><div key={p.id} style={{background:"#111114",border:"1px solid #222228",borderRadius:13,padding:22,cursor:"pointer"}} onClick={()=>setDetail(p)}>
        <div style={{display:"flex",justifyContent:"space-between",marginBottom:8}}><div><span style={{fontFamily:"'Geist Mono',monospace",fontSize:10,color:"#636370"}}>{p.id}</span><div style={{fontSize:15,fontWeight:600,marginTop:4}}>{p.name}</div><div style={{fontSize:12,color:"#636370",marginTop:2}}>{p.client} • {p.service}</div><div style={{fontSize:11,color:"#71717a",marginTop:4}}>{(p.developers||[]).length?<><I.Team/> {(p.developers||[]).join(", ")}</>:<span style={{fontStyle:"italic"}}>No developers assigned</span>}</div></div><div style={{display:"flex",flexDirection:"column",alignItems:"flex-end",gap:5}}><Badge s={p.status}/><Pri p={p.priority}/></div></div>
        <div style={{width:"100%",height:5,background:"#1e1e23",borderRadius:3,overflow:"hidden",margin:"10px 0"}}><div style={{height:"100%",borderRadius:3,background:"linear-gradient(90deg,#c8ff00,#88cc00)",width:`${p.progress}%`}}/></div>
        <div style={{display:"flex",justifyContent:"space-between",fontSize:11.5}}><span style={{color:"#636370"}}>Progress</span><span style={{fontFamily:"'Geist Mono',monospace",color:"#c8ff00",fontSize:11}}>{p.progress}%</span></div>
        <div style={{display:"flex",justifyContent:"space-between",paddingTop:12,marginTop:12,borderTop:"1px solid #222228",fontSize:11.5,color:"#636370"}}><span>{R(p.paid)}/{R(p.budget)}</span><span>Due: {p.deadline}</span></div>
      </div>)}
    </div>
    {modal&&<Modal title="Create Project" onClose={()=>setModal(false)} footer={<><button style={B("g")} onClick={()=>setModal(false)} disabled={submitting}>Cancel</button><button style={B("p")} onClick={add} disabled={submitting}>{submitting?"Creating…":"Create"}</button></>}>
      {err&&<p style={{color:"#f87171",fontSize:12,marginBottom:12}}>{err}</p>}
      <div style={{marginBottom:18}}><label style={fl}>Project Name</label><input style={fi} placeholder="e.g. Website Redesign" value={form.name} onChange={e=>setForm({...form,name:e.target.value})}/></div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14}}><div style={{marginBottom:18}}><label style={fl}>Client</label><select style={fi} value={form.client} onChange={e=>setForm({...form,client:e.target.value})}><option value="">Select</option>{clients.map(c=><option key={c.id} value={c.name}>{c.name}</option>)}</select></div><div style={{marginBottom:18}}><label style={fl}>Service</label><select style={fi} value={form.service} onChange={e=>setForm({...form,service:e.target.value})}><option>Web Development</option><option>UI/UX Design</option><option>Brand Strategy</option><option>Full Package</option></select></div></div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14}}><div style={{marginBottom:18}}><label style={fl}>Budget (ZAR)</label><input style={fi} type="number" placeholder="0" value={form.budget} onChange={e=>setForm({...form,budget:e.target.value})}/></div><div style={{marginBottom:18}}><label style={fl}>Priority</label><select style={fi} value={form.priority} onChange={e=>setForm({...form,priority:e.target.value})}><option value="low">Low</option><option value="medium">Medium</option><option value="high">High</option></select></div></div>
      <div style={{marginBottom:18}}><label style={fl}>Deadline</label><input style={fi} type="date" value={form.deadline} onChange={e=>setForm({...form,deadline:e.target.value})}/></div>
      <div style={{marginBottom:18}}><label style={fl}>Description</label><textarea style={{...fi,resize:"vertical",minHeight:80}} value={form.desc} onChange={e=>setForm({...form,desc:e.target.value})}/></div>
    </Modal>}
  </div>;
}

function ClientPage({clients,setClients,onAddClient,onDeleteClient,searchQuery}) {
  const [modal,setModal]=useState(false);const [form,setForm]=useState({name:"",contact:"",email:"",phone:"",size:"1-10",industry:"",status:"lead"});
  const [submitting,setSubmitting]=useState(false);const [err,setErr]=useState("");
  const q=(searchQuery||"").trim().toLowerCase();
  const list=q?clients.filter(c=>(c.name||"").toLowerCase().includes(q)||(c.email||"").toLowerCase().includes(q)||(c.contact||"").toLowerCase().includes(q)):clients;
  const add=async()=>{
    setErr("");setSubmitting(true);
    try {
      if(onAddClient){await onAddClient(form);setModal(false);}
      else {setClients([...clients,{id:`CLT-${String(clients.length+1).padStart(3,"0")}`,projects:0,spent:0,joined:new Date().toISOString().split("T")[0],...form}]);setModal(false);}
    } catch(e){setErr(e.body?.error||e.message);}
    finally {setSubmitting(false);}
  };
  const doDelete=async(c)=>{
    if(!onDeleteClient){setClients(clients.filter(x=>x.id!==c.id));return;}
    try{await onDeleteClient(c.id);}catch(_){}
  };
  return <div>
    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:20}}><span style={{fontSize:11,fontWeight:600,letterSpacing:2,textTransform:"uppercase",color:"#636370"}}>{list.length} Clients</span><button style={B("p")} onClick={()=>setModal(true)}><I.Plus/> Add Client</button></div>
    <div style={{border:"1px solid #222228",borderRadius:13,background:"#111114",overflow:"auto"}}><table style={{width:"100%",borderCollapse:"collapse"}}><thead><tr>{["ID","Company","Contact","Email","Industry","Spent","Status",""].map(h=><th key={h} style={{fontSize:10,fontWeight:600,letterSpacing:1.5,textTransform:"uppercase",color:"#636370",textAlign:"left",padding:"12px 18px",borderBottom:"1px solid #222228",background:"#0c0c0e",whiteSpace:"nowrap"}}>{h}</th>)}</tr></thead>
    <tbody>{list.map(c=><tr key={c.id}><td style={{padding:"12px 18px",fontFamily:"'Geist Mono',monospace",fontSize:12,fontWeight:500,color:"#f5f5f7",borderBottom:"1px solid rgba(34,34,40,.5)"}}>{c.id}</td><td style={{padding:"12px 18px",fontWeight:500,color:"#f5f5f7",fontSize:13,borderBottom:"1px solid rgba(34,34,40,.5)"}}>{c.name}</td><td style={{padding:"12px 18px",fontSize:13,color:"#a0a0ad",borderBottom:"1px solid rgba(34,34,40,.5)"}}>{c.contact}</td><td style={{padding:"12px 18px",fontSize:12,color:"#a0a0ad",borderBottom:"1px solid rgba(34,34,40,.5)"}}>{c.email}</td><td style={{padding:"12px 18px",fontSize:13,color:"#a0a0ad",borderBottom:"1px solid rgba(34,34,40,.5)"}}>{c.industry}</td><td style={{padding:"12px 18px",fontFamily:"'Geist Mono',monospace",fontWeight:600,color:"#f5f5f7",borderBottom:"1px solid rgba(34,34,40,.5)"}}>{R(c.spent||0)}</td><td style={{padding:"12px 18px",borderBottom:"1px solid rgba(34,34,40,.5)"}}><Badge s={c.status}/></td><td style={{padding:"12px 18px",borderBottom:"1px solid rgba(34,34,40,.5)"}}><div style={{display:"flex",gap:4}}><button style={ib} title="Magic link"><I.Link/></button><button style={ib} title="Edit"><I.Edit/></button><button style={ib} onClick={()=>doDelete(c)}><I.Trash/></button></div></td></tr>)}</tbody></table></div>
    {modal&&<Modal title="Add Client" onClose={()=>setModal(false)} footer={<><button style={B("g")} onClick={()=>setModal(false)} disabled={submitting}>Cancel</button><button style={B("p")} onClick={add} disabled={submitting}>{submitting?"Adding…":"Add"}</button></>}>
      {err&&<p style={{color:"#f87171",fontSize:12,marginBottom:12}}>{err}</p>}
      <div style={{marginBottom:18}}><label style={fl}>Company Name</label><input style={fi} placeholder="Company" value={form.name} onChange={e=>setForm({...form,name:e.target.value})}/></div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14}}><div style={{marginBottom:18}}><label style={fl}>Contact</label><input style={fi} placeholder="Name" value={form.contact} onChange={e=>setForm({...form,contact:e.target.value})}/></div><div style={{marginBottom:18}}><label style={fl}>Email</label><input style={fi} type="email" placeholder="email@co.za" value={form.email} onChange={e=>setForm({...form,email:e.target.value})}/></div></div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14}}><div style={{marginBottom:18}}><label style={fl}>Phone</label><input style={fi} placeholder="+27..." value={form.phone} onChange={e=>setForm({...form,phone:e.target.value})}/></div><div style={{marginBottom:18}}><label style={fl}>Industry</label><input style={fi} placeholder="e.g. Tech" value={form.industry} onChange={e=>setForm({...form,industry:e.target.value})}/></div></div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14}}><div style={{marginBottom:18}}><label style={fl}>Size</label><select style={fi} value={form.size} onChange={e=>setForm({...form,size:e.target.value})}><option>1-10</option><option>11-50</option><option>51-200</option><option>201-1000</option></select></div><div style={{marginBottom:18}}><label style={fl}>Status</label><select style={fi} value={form.status} onChange={e=>setForm({...form,status:e.target.value})}><option value="lead">Lead</option><option value="active">Active</option></select></div></div>
    </Modal>}
  </div>;
}

function PayPage({payments,setPayments,projects,onAddPayment,onMarkPaid,searchQuery}) {
  const [modal,setModal]=useState(false);const [tab,setTab]=useState("all");const [clientFlt,setClientFlt]=useState("all");const [form,setForm]=useState({project:"",client:"",amount:"",due:"",desc:"",method:"Ozow"});
  const [submitting,setSubmitting]=useState(false);const [err,setErr]=useState("");
  const q=(searchQuery||"").trim().toLowerCase();
  const searchPayments=q?payments.filter(p=>(p.client||"").toLowerCase().includes(q)||(p.id||"").toLowerCase().includes(q)||(p.desc||"").toLowerCase().includes(q)):payments;
  const tots={paid:0,pending:0,overdue:0};payments.forEach(p=>{if(tots[p.status]!==undefined)tots[p.status]+=p.amount;});
  const clientList=["all",...[...new Set(searchPayments.map(p=>p.client))].filter(Boolean).sort()];
  const byStatus=tab==="all"?searchPayments:searchPayments.filter(p=>p.status===tab);
  const filtered=clientFlt==="all"?byStatus:byStatus.filter(p=>p.client===clientFlt);
  const add=async()=>{
    setErr("");
    if(onAddPayment){setSubmitting(true);try{await onAddPayment(form);setModal(false);setForm({project:"",client:"",amount:"",due:"",desc:"",method:"Ozow"});}catch(e){setErr(e?.message||e?.body?.error||"Failed to add");}finally{setSubmitting(false);}return;}
    setPayments([...payments,{id:`INV-${String(payments.length+1).padStart(3,"0")}`,project:form.project,client:form.client,amount:Number(form.amount)||0,status:"pending",due:form.due,method:form.method,desc:form.desc}]);setModal(false);
  };
  const markPaid=async(id)=>{if(onMarkPaid){try{await onMarkPaid(id);}catch(e){setErr(e?.message||"Failed to update");}return;}setPayments(payments.map(p=>p.id===id?{...p,status:"paid",method:p.method==="-"?"Ozow":p.method}:p));};
  return <div>
    <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(195px,1fr))",gap:14,marginBottom:28}}>
      {[{l:"Revenue",v:R(tots.paid),c:"#c8ff00"},{l:"Pending",v:R(tots.pending),c:"#facc15"},{l:"Overdue",v:R(tots.overdue),c:"#f87171"},{l:"Invoices",v:payments.length,c:"#f5f5f7"}].map((s,i)=>
        <div key={i} style={{background:"#111114",border:"1px solid #222228",borderRadius:12,padding:18}}><div style={{fontSize:11,fontWeight:500,letterSpacing:1.2,textTransform:"uppercase",color:"#636370",marginBottom:8}}>{s.l}</div><div style={{fontFamily:"'Geist Mono',monospace",fontSize:22,fontWeight:600,color:s.c}}>{s.v}</div></div>)}
    </div>
    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16,flexWrap:"wrap",gap:10}}>
      <div style={{display:"flex",flexWrap:"wrap",alignItems:"center",gap:10}}>
        <div style={{display:"flex",gap:2}}>{["all","paid","pending","overdue","upcoming"].map(t=><span key={t} onClick={()=>setTab(t)} style={{padding:"10px 14px",fontSize:12.5,fontWeight:500,color:tab===t?"#c8ff00":"#636370",cursor:"pointer",borderBottom:tab===t?"2px solid #c8ff00":"2px solid transparent"}}>{t==="all"?"All":SC[t]?.l||t}</span>)}</div>
        <select style={{...fi,width:"auto",minWidth:160,padding:"8px 28px 8px 12px",fontSize:12}} value={clientFlt} onChange={e=>setClientFlt(e.target.value)} title="Filter by client">
          {clientList.map(c=><option key={c} value={c}>{c==="all"?"All clients":c}</option>)}
        </select>
      </div>
      <button style={B("p")} onClick={()=>setModal(true)}><I.Plus/> New Invoice</button>
    </div>
    <div style={{border:"1px solid #222228",borderRadius:13,background:"#111114",overflow:"auto"}}><table style={{width:"100%",borderCollapse:"collapse"}}><thead><tr>{["Invoice","Project","Client","Desc","Amount","Due","Method","Status",""].map(h=><th key={h} style={{fontSize:10,fontWeight:600,letterSpacing:1.5,textTransform:"uppercase",color:"#636370",textAlign:"left",padding:"12px 18px",borderBottom:"1px solid #222228",background:"#0c0c0e",whiteSpace:"nowrap"}}>{h}</th>)}</tr></thead>
    <tbody>{filtered.map(p=><tr key={p.id}><td style={{padding:"12px 18px",fontFamily:"'Geist Mono',monospace",fontSize:12,fontWeight:500,color:"#f5f5f7",borderBottom:"1px solid rgba(34,34,40,.5)"}}>{p.id}</td><td style={{padding:"12px 18px",fontSize:12.5,color:"#a0a0ad",borderBottom:"1px solid rgba(34,34,40,.5)"}}>{p.project}</td><td style={{padding:"12px 18px",fontSize:13,color:"#a0a0ad",borderBottom:"1px solid rgba(34,34,40,.5)"}}>{p.client}</td><td style={{padding:"12px 18px",fontSize:13,color:"#a0a0ad",borderBottom:"1px solid rgba(34,34,40,.5)"}}>{p.desc}</td><td style={{padding:"12px 18px",fontFamily:"'Geist Mono',monospace",fontWeight:600,color:"#f5f5f7",borderBottom:"1px solid rgba(34,34,40,.5)"}}>{R(p.amount)}</td><td style={{padding:"12px 18px",fontFamily:"'Geist Mono',monospace",fontSize:12,color:p.status==="overdue"?"#f87171":"#a0a0ad",borderBottom:"1px solid rgba(34,34,40,.5)"}}>{p.due}</td><td style={{padding:"12px 18px",fontSize:13,color:"#a0a0ad",borderBottom:"1px solid rgba(34,34,40,.5)"}}>{p.method}</td><td style={{padding:"12px 18px",borderBottom:"1px solid rgba(34,34,40,.5)"}}><Badge s={p.status}/></td><td style={{padding:"12px 18px",borderBottom:"1px solid rgba(34,34,40,.5)"}}><div style={{display:"flex",gap:4}}>{["pending","overdue"].includes(p.status)&&<button style={{...B("p"),padding:"6px 12px",fontSize:11}} onClick={()=>markPaid(p.id)}>Mark Paid</button>}</div></td></tr>)}</tbody></table></div>
    {modal&&<Modal title="Create Invoice" onClose={()=>setModal(false)} footer={<><button style={B("g")} onClick={()=>setModal(false)} disabled={submitting}>Cancel</button><button style={B("p")} onClick={add} disabled={submitting}>{submitting?"Creating…":"Create"}</button></>}>
      {err&&<p style={{color:"#f87171",fontSize:12,marginBottom:12}}>{err}</p>}
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14}}><div style={{marginBottom:18}}><label style={fl}>Project</label><select style={fi} value={form.project} onChange={e=>{const pr=projects.find(p=>p.name===e.target.value);setForm({...form,project:e.target.value,client:pr?.client||""})}}><option value="">Select</option>{projects.map(p=><option key={p.id} value={p.name}>{p.name}</option>)}</select></div><div style={{marginBottom:18}}><label style={fl}>Client</label><input style={{...fi,opacity:.6}} value={form.client} readOnly/></div></div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14}}><div style={{marginBottom:18}}><label style={fl}>Amount (ZAR)</label><input style={fi} type="number" placeholder="0" value={form.amount} onChange={e=>setForm({...form,amount:e.target.value})}/></div><div style={{marginBottom:18}}><label style={fl}>Due Date</label><input style={fi} type="date" value={form.due} onChange={e=>setForm({...form,due:e.target.value})}/></div></div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14}}><div style={{marginBottom:18}}><label style={fl}>Method</label><select style={fi} value={form.method} onChange={e=>setForm({...form,method:e.target.value})}><option>Ozow</option><option>Bank Transfer</option><option>Cash</option></select></div><div style={{marginBottom:18}}><label style={fl}>Description</label><input style={fi} placeholder="e.g. Design milestone" value={form.desc} onChange={e=>setForm({...form,desc:e.target.value})}/></div></div>
    </Modal>}
  </div>;
}

function MsgPage({convos,setConvos,onSendMessage,files,projects,onDownloadFile,searchQuery}) {
  const [ai,setAi]=useState(0);const [inp,setInp]=useState("");const [who,setWho]=useState("Zendyn Reddy");const [sending,setSending]=useState(false);const [attachedFile,setAttachedFile]=useState(null);const [attachOpen,setAttachOpen]=useState(false);const ref=useRef(null);
  const q=(searchQuery||"").trim().toLowerCase();
  const list=q?convos.filter(c=>(c.client||"").toLowerCase().includes(q)||(c.contact||"").toLowerCase().includes(q)):convos;
  useEffect(()=>{ref.current?.scrollIntoView({behavior:"smooth"});},[ai,convos]);
  const t=convos[ai]??convos[0];
  const clientFiles=(files||[]).filter(f=>{const p=(projects||[]).find(pr=>pr.name===f.project);return p&&p.client===t?.client;});
  const send=async()=>{
    if(!inp.trim())return;
    if(onSendMessage){setSending(true);try{await onSendMessage(ai,who,inp,attachedFile?.id);setInp("");setAttachedFile(null);}catch(_){}finally{setSending(false);}return;}
    const u=[...convos];u[ai]={...t,msgs:[...t.msgs,{from:who,t:new Date().toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"}),d:"Now",text:inp.trim(),isC:false}]};setConvos(u);setInp("");
  };
  return <div style={{display:"flex",height:"calc(100vh - 130px)",border:"1px solid #222228",borderRadius:13,overflow:"hidden",background:"#0c0c0e"}}>
    <div style={{width:280,borderRight:"1px solid #222228",overflowY:"auto",flexShrink:0}}>
      <div style={{padding:"14px 16px",borderBottom:"1px solid #222228",fontSize:12,fontWeight:600,letterSpacing:1.5,textTransform:"uppercase",color:"#636370"}}>Conversations</div>
      {list.map((c)=><div key={c.id} onClick={()=>setAi(convos.findIndex(x=>x.id===c.id))} style={{padding:"14px 16px",borderBottom:"1px solid #222228",cursor:"pointer",background:convos[ai]?.id===c.id?"rgba(200,255,0,.06)":"transparent",borderLeft:convos[ai]?.id===c.id?"2px solid #c8ff00":"2px solid transparent"}}><div style={{display:"flex",justifyContent:"space-between"}}><span style={{fontSize:13.5,fontWeight:500}}>{c.client}</span><span style={{fontSize:10,color:"#636370"}}>{c.msgs[c.msgs.length-1]?.d}</span></div><div style={{fontSize:12,color:"#636370",marginTop:3,whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>{c.msgs[c.msgs.length-1]?.text}</div></div>)}
    </div>
    <div style={{flex:1,display:"flex",flexDirection:"column"}}>
      <div style={{padding:"14px 24px",borderBottom:"1px solid #222228",display:"flex",justifyContent:"space-between",alignItems:"center"}}><div><div style={{fontWeight:600,fontSize:14}}>{t?.client}</div><div style={{fontSize:11,color:"#636370"}}>{t?.contact}</div></div><select style={{...fi,width:"auto",padding:"6px 30px 6px 10px",fontSize:11}} value={who} onChange={e=>setWho(e.target.value)}>{ASSIGNEE_OPTIONS.map(m=><option key={m.id} value={m.name}>{m.name}</option>)}</select></div>
      <div style={{flex:1,overflowY:"auto",padding:24,display:"flex",flexDirection:"column",gap:16}}>
        {(t?.msgs||[]).map((m,i)=><div key={i} style={{display:"flex",gap:12,maxWidth:"70%",alignSelf:m.isC?"flex-start":"flex-end",flexDirection:m.isC?"row":"row-reverse"}}>
          <div style={{width:32,height:32,borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",fontSize:10,fontWeight:700,flexShrink:0,...(m.isC?{background:"#1e1e23",color:"#a0a0ad",border:"1px solid #222228"}:{background:"linear-gradient(135deg,#c8ff00,#88cc00)",color:"#000"})}}>{m.from.split(" ").map(w=>w[0]).join("").slice(0,2)}</div>
          <div><div style={{borderRadius:14,padding:"12px 16px",fontSize:13.5,lineHeight:1.55,...(m.isC?{background:"#111114",border:"1px solid #222228",color:"#a0a0ad"}:{background:"rgba(200,255,0,.06)",border:"1px solid rgba(200,255,0,.12)",color:"#f5f5f7"})}}><div style={{fontSize:11,fontWeight:600,marginBottom:3,color:m.isC?"#f5f5f7":"#c8ff00"}}>{m.from}</div>{m.text}{(m.fileId&&m.fileName)&&<div style={{marginTop:8,fontSize:12,display:"flex",alignItems:"center",gap:8,flexWrap:"wrap"}}><span style={{opacity:.8}}>📎</span><span style={{color:"#c8ff00",fontWeight:500}}>{m.fileName}</span>{onDownloadFile&&<button type="button" onClick={()=>onDownloadFile(m.fileId)} style={{...ib,padding:"4px 8px",fontSize:11,color:"#c8ff00",display:"inline-flex",alignItems:"center",gap:4}}><I.Dl/> Download</button>}</div>}</div><div style={{fontSize:10,color:"#636370",marginTop:5}}>{m.d} • {m.t}</div></div>
        </div>)}<div ref={ref}/>
      </div>
      <div style={{padding:"14px 24px",borderTop:"1px solid #222228",display:"flex",gap:10,alignItems:"flex-end",flexWrap:"wrap"}}>
        <div style={{position:"relative"}}>
          <button type="button" onClick={()=>setAttachOpen(!attachOpen)} style={{...ib,padding:10}} title="Attach file"><I.Link/></button>
          {attachOpen&&<div style={{position:"absolute",bottom:"100%",left:0,marginBottom:4,background:"#111114",border:"1px solid #222228",borderRadius:10,padding:8,maxHeight:220,overflowY:"auto",minWidth:200,zIndex:10}}>
            <div style={{fontSize:10,fontWeight:600,color:"#636370",marginBottom:6}}>Link to file</div>
            {clientFiles.length===0?<div style={{fontSize:12,color:"#71717a"}}>No files for this client</div>:clientFiles.map(f=><button key={f.id} type="button" onClick={()=>{setAttachedFile({id:f.id,name:f.name});setAttachOpen(false);}} style={{display:"block",width:"100%",textAlign:"left",padding:"8px 10px",fontSize:12,borderRadius:6,border:"none",background:attachedFile?.id===f.id?"rgba(200,255,0,.15)":"transparent",color:"#f5f5f7",cursor:"pointer",fontFamily:"Outfit,sans-serif"}}>{f.name}</button>)}
          </div>}
        </div>
        {attachedFile&&<span style={{fontSize:11,color:"#c8ff00",display:"flex",alignItems:"center",gap:4}}>📎 {attachedFile.name} <button type="button" onClick={()=>setAttachedFile(null)} style={{...ib,padding:2}}>×</button></span>}
        <textarea rows="1" placeholder={`Reply as ${who}...`} value={inp} onChange={e=>setInp(e.target.value)} onKeyDown={e=>{if(e.key==="Enter"&&!e.shiftKey){e.preventDefault();send();}}} style={{flex:1,minWidth:120,background:"#111114",border:"1px solid #222228",borderRadius:10,padding:"10px 14px",color:"#f5f5f7",fontSize:13,outline:"none",resize:"none",maxHeight:100,fontFamily:"Outfit,sans-serif",lineHeight:1.5}}/>
        <button onClick={send} disabled={!inp.trim()||sending} style={{background:"#c8ff00",color:"#000",border:"none",borderRadius:9,padding:10,cursor:"pointer",display:"flex",opacity:inp.trim()&&!sending?1:.3}}>{sending?"…":"Send"}</button>
      </div>
    </div>
  </div>;
}

const fileTypeFromExt=(name)=>{
  const ext=(name||"").split(".").pop()?.toLowerCase();
  if(["pdf"].includes(ext))return "pdf";if(["sketch","figma","xd","psd","ai"].includes(ext))return "design";
  if(["png","jpg","jpeg","gif","webp","svg"].includes(ext))return "image";if(["mp4","mov","webm"].includes(ext))return "video";
  if(["zip","rar","7z"].includes(ext))return "archive";return "doc";
};
const formatFileSize=(bytes)=>{if(bytes==null||bytes===0)return"-";if(bytes<1024)return bytes+" B";if(bytes<1024*1024)return (bytes/1024).toFixed(1)+" KB";return (bytes/(1024*1024)).toFixed(1)+" MB";};

function FilePage({files,setFiles,projects,onAddFile,onDeleteFile,onDownloadFile,searchQuery}) {
  const [flt,setFlt]=useState("all");const [clientFlt,setClientFlt]=useState("all");const [addModal,setAddModal]=useState(false);
  const [addForm,setAddForm]=useState({project:"",name:"",type:"doc",size:"",by:""});const [submitting,setSubmitting]=useState(false);const [err,setErr]=useState("");
  const [dragOver,setDragOver]=useState(false);const [uploadProject,setUploadProject]=useState("");const fileInputRef=useRef(null);
  const q=(searchQuery||"").trim().toLowerCase();
  const searchFiles=q?files.filter(f=>(f.name||"").toLowerCase().includes(q)):files;
  const projs=["all",...new Set(searchFiles.map(f=>f.project))].filter(Boolean);
  const clientList=["all",...[...new Set(searchFiles.map(f=>{const p=(projects||[]).find(pr=>pr.name===f.project);return p?.client;}).filter(Boolean))].sort()];
  const byProject=flt==="all"?searchFiles:searchFiles.filter(f=>f.project===flt);
  const filtered=clientFlt==="all"?byProject:byProject.filter(f=>{const p=(projects||[]).find(pr=>pr.name===f.project);return p?.client===clientFlt;});
  const doAdd=async()=>{setErr("");if(!onAddFile){setFiles([...files,{id:`file-${Date.now()}`,project:addForm.project,name:addForm.name||"File",type:addForm.type,size:addForm.size||"-",by:addForm.by||"-",date:new Date().toISOString().slice(0,10)}]);setAddModal(false);return;}setSubmitting(true);try{await onAddFile(addForm.project,addForm.name,addForm.type,addForm.size||undefined,addForm.by||undefined);setAddModal(false);setAddForm({project:"",name:"",type:"doc",size:"",by:""});}catch(e){setErr(e?.message||"Failed");}finally{setSubmitting(false);}};
  const doDelete=(id)=>{if(onDeleteFile){try{onDeleteFile(id);}catch(_){}}else setFiles(files.filter(x=>x.id!==id));};
  const processFiles=async(fileList,projectName)=>{
    const projName=projectName||uploadProject;if(!projName){setErr("Select a project first");return;}
    if(!fileList?.length)return;setErr("");setSubmitting(true);
    for(let i=0;i<fileList.length;i++){
      const file=fileList[i];const name=file.name||"Unnamed";const type=fileTypeFromExt(name);const sizeText=formatFileSize(file.size);
      try{if(onAddFile)await onAddFile(projName,name,type,sizeText,"Admin",file);}catch(e){setErr(e?.message||"Upload failed");break;}
    }
    setSubmitting(false);
  };
  const onDrop=(e)=>{e.preventDefault();setDragOver(false);const list=e.dataTransfer?.files;if(list?.length)processFiles(Array.from(list),uploadProject);};
  const onDragOver=(e)=>{e.preventDefault();e.stopPropagation();setDragOver(true);};
  const onDragLeave=(e)=>{e.preventDefault();e.stopPropagation();setDragOver(false);};
  const onBrowseClick=()=>{if(!uploadProject){setErr("Select a project first");return;}fileInputRef.current?.click();};
  const onFileInputChange=(e)=>{const list=e.target?.files;if(list?.length)processFiles(Array.from(list));e.target.value="";};
  return <div>
    <div style={{marginBottom:20}}>
      <label style={{...fl,marginBottom:8}}>Add to project</label>
      <select style={{...fi,width:"auto",minWidth:200,marginBottom:12}} value={uploadProject} onChange={e=>setUploadProject(e.target.value)}>
        <option value="">Select project for uploads</option>
        {(projects||[]).map(p=><option key={p.id} value={p.name}>{p.name}</option>)}
      </select>
      <div
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
        onClick={()=>uploadProject?fileInputRef.current?.click():setErr("Select a project first")}
        style={{
          border:"2px dashed "+(dragOver?"#c8ff00":"#222228"),
          borderRadius:13,
          padding:32,
          textAlign:"center",
          cursor:"pointer",
          background:dragOver?"rgba(200,255,0,.06)":"transparent",
          transition:"all .2s",
        }}
      >
        <input ref={fileInputRef} type="file" multiple style={{display:"none"}} onChange={onFileInputChange} />
        <I.Upload/>
        <p style={{color:"#636370",fontSize:13.5,marginTop:8}}>Drag & drop files here, or <span style={{color:"#c8ff00",fontWeight:500}}>browse</span></p>
        <p style={{fontSize:11,color:"#71717a",marginTop:4}}>PDF, images, docs, ZIP — metadata will be saved</p>
        {submitting&&<p style={{fontSize:12,color:"#c8ff00",marginTop:8}}>Adding…</p>}
      </div>
      {err&&<p style={{color:"#f87171",fontSize:12,marginTop:8}}>{err}</p>}
    </div>
    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16}}>
      <span style={{fontSize:11,fontWeight:600,letterSpacing:1.5,textTransform:"uppercase",color:"#636370"}}>Or add manually</span>
      <button style={B("p")} onClick={()=>setAddModal(true)}><I.Plus/> Add file (metadata only)</button>
    </div>
    <div style={{fontSize:11,fontWeight:600,letterSpacing:1.5,textTransform:"uppercase",color:"#636370",marginBottom:8}}>Project</div>
    <div style={{display:"flex",gap:6,marginBottom:14,flexWrap:"wrap"}}>{projs.map(p=><button key={p} onClick={()=>setFlt(p)} style={{...B(flt===p?"p":"g"),padding:"6px 12px",fontSize:11}}>{p==="all"?"All":p}</button>)}</div>
    <div style={{fontSize:11,fontWeight:600,letterSpacing:1.5,textTransform:"uppercase",color:"#636370",marginBottom:8}}>Client</div>
    <div style={{display:"flex",gap:6,marginBottom:18,flexWrap:"wrap",alignItems:"center"}}>
      <select style={{...fi,width:"auto",minWidth:160,padding:"8px 28px 8px 12px",fontSize:12}} value={clientFlt} onChange={e=>setClientFlt(e.target.value)} title="Filter by client">
        {clientList.map(c=><option key={c} value={c}>{c==="all"?"All clients":c}</option>)}
      </select>
    </div>
    <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(270px,1fr))",gap:12}}>
      {filtered.map(f=><div key={f.id} style={{background:"#111114",border:"1px solid #222228",borderRadius:11,padding:16,display:"flex",alignItems:"flex-start",gap:12}}>
        <div style={{width:38,height:38,borderRadius:9,display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"'Geist Mono',monospace",fontSize:9,fontWeight:600,textTransform:"uppercase",flexShrink:0,background:`${FTC[f.type]}12`,color:FTC[f.type]}}>{f.type.slice(0,3).toUpperCase()}</div>
        <div style={{flex:1,minWidth:0}}><div style={{fontSize:13,fontWeight:500,whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>{f.name}</div><div style={{fontSize:11,color:"#636370",marginTop:3}}>{f.size} • {f.by} • {f.date}</div></div>
        <div style={{display:"flex",gap:4}}>{onDownloadFile&&<button style={ib} onClick={()=>onDownloadFile(f.id)} title="Download"><I.Dl/></button>}<button style={ib} onClick={()=>doDelete(f.id)}><I.Trash/></button></div>
      </div>)}
    </div>
    {addModal&&<Modal title="Add file" onClose={()=>setAddModal(false)} footer={<><button style={B("g")} onClick={()=>setAddModal(false)} disabled={submitting}>Cancel</button><button style={B("p")} onClick={doAdd} disabled={submitting||!addForm.project}>{submitting?"Adding…":"Add"}</button></>}>
      {err&&<p style={{color:"#f87171",fontSize:12,marginBottom:12}}>{err}</p>}
      <div style={{marginBottom:18}}><label style={fl}>Project</label><select style={fi} value={addForm.project} onChange={e=>setAddForm({...addForm,project:e.target.value})}><option value="">Select</option>{projects.map(p=><option key={p.id} value={p.name}>{p.name}</option>)}</select></div>
      <div style={{marginBottom:18}}><label style={fl}>File name</label><input style={fi} placeholder="e.g. Design_v2.pdf" value={addForm.name} onChange={e=>setAddForm({...addForm,name:e.target.value})}/></div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14}}><div style={{marginBottom:18}}><label style={fl}>Type</label><select style={fi} value={addForm.type} onChange={e=>setAddForm({...addForm,type:e.target.value})}><option value="pdf">PDF</option><option value="design">Design</option><option value="image">Image</option><option value="doc">Doc</option><option value="video">Video</option><option value="archive">Archive</option></select></div><div style={{marginBottom:18}}><label style={fl}>Size (e.g. 2.4 MB)</label><input style={fi} placeholder="Optional" value={addForm.size} onChange={e=>setAddForm({...addForm,size:e.target.value})}/></div></div>
      <div style={{marginBottom:18}}><label style={fl}>Uploaded by</label><input style={fi} placeholder="Optional" value={addForm.by} onChange={e=>setAddForm({...addForm,by:e.target.value})}/></div>
    </Modal>}
  </div>;
}

function TeamPage({developers,onAddDeveloper,onDeleteDeveloper,setPage,clients,payments,projects}) {
  const [devModal,setDevModal]=useState(false);
  const [devForm,setDevForm]=useState({name:"",email:"",role:"Developer",avatar_url:""});
  const [devSubmitting,setDevSubmitting]=useState(false);
  const [devErr,setDevErr]=useState("");
  const addDev=async()=>{
    setDevErr("");
    if(!devForm.name.trim()){setDevErr("Name is required");return;}
    setDevSubmitting(true);
    try{
      await onAddDeveloper?.(devForm);
      setDevModal(false);
      setDevForm({name:"",email:"",role:"Developer",avatar_url:""});
    }catch(e){setDevErr(e?.message||"Failed to add developer");}
    finally{setDevSubmitting(false);}
  };
  const devList=developers||[];
  const exportReports=()=>{
    const headers=["Type","ID","Name","Client","Amount","Status","Due"];
    const paymentRows=(payments||[]).map(p=>["Payment",p.id,p.desc||"-",p.client,String(p.amount),p.status,p.due||"-"]);
    const csv=[headers.join(","),...paymentRows.map(r=>r.map(c=>`"${String(c).replace(/"/g,'""')}"`).join(","))].join("\n");
    const blob=new Blob([csv],{type:"text/csv;charset=utf-8"});
    const a=document.createElement("a");a.href=URL.createObjectURL(blob);a.download="zbs-reports.csv";a.click();URL.revokeObjectURL(a.href);
  };
  const quickActions=[
    {l:"Generate Invoice",d:"Create & send invoice",i:<I.Money/>,onClick:()=>setPage?.("pay")},
    {l:"Export Reports",d:"Download CSV reports",i:<I.Dl/>,onClick:exportReports},
    {l:"Manage Services",d:"Edit offerings & pricing",i:<I.Gear/>,onClick:()=>setPage?.("settings")},
  ];
  return <div>
    <div style={{fontSize:11,fontWeight:600,letterSpacing:2,textTransform:"uppercase",color:"#636370",marginBottom:14}}>Developer profiles</div>
    <div style={{background:"#111114",border:"1px solid #222228",borderRadius:13,padding:22,marginBottom:28}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16}}>
        <span style={{fontSize:13,color:"#a0a0ad"}}>Team members you can assign to projects</span>
        <button type="button" style={{...B("p"),padding:"8px 14px",fontSize:12}} onClick={()=>{setDevModal(true);setDevErr("");}}><I.Plus/> Create developer profile</button>
      </div>
      {devList.length===0?<p style={{fontSize:13,color:"#636370"}}>No developers yet. Create one to assign to projects.</p>:<ul style={{listStyle:"none"}}>{devList.map(d=><li key={d.id} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"12px 0",borderBottom:"1px solid #222228",gap:12}}><div style={{display:"flex",alignItems:"center",gap:10}}>{d.avatar_url?<img src={d.avatar_url} alt="" style={{width:36,height:36,borderRadius:"50%",objectFit:"cover",flexShrink:0}}/>:<div style={{width:36,height:36,borderRadius:"50%",background:"linear-gradient(135deg,#c8ff00,#88cc00)",color:"#000",display:"flex",alignItems:"center",justifyContent:"center",fontSize:12,fontWeight:700,flexShrink:0}}>{(d.name||"").split(" ").map(w=>w[0]).join("").slice(0,2)||"?"}</div>}<div><div style={{fontWeight:600,fontSize:13.5}}>{d.name}</div><div style={{fontSize:12,color:"#636370"}}>{d.role}{d.email?` • ${d.email}`:""}</div></div></div><button type="button" style={ib} onClick={()=>onDeleteDeveloper?.(d.id)} title="Remove"><I.Trash/></button></li>)}</ul>}
    </div>
    {devModal&&<Modal title="Create developer profile" onClose={()=>setDevModal(false)} footer={<><button style={B("g")} onClick={()=>setDevModal(false)} disabled={devSubmitting}>Cancel</button><button style={B("p")} onClick={addDev} disabled={devSubmitting||!devForm.name.trim()}>{devSubmitting?"Adding…":"Add developer"}</button></>}>
      {devErr&&<p style={{color:"#f87171",fontSize:12,marginBottom:12}}>{devErr}</p>}
      <div style={{marginBottom:18}}><label style={fl}>Name</label><input style={fi} placeholder="e.g. Alex Chen" value={devForm.name} onChange={e=>setDevForm({...devForm,name:e.target.value})}/></div>
      <div style={{marginBottom:18}}><label style={fl}>Email</label><input style={fi} type="email" placeholder="alex@zonebrozstudios.com" value={devForm.email} onChange={e=>setDevForm({...devForm,email:e.target.value})}/></div>
      <div style={{marginBottom:18}}><label style={fl}>Role</label><select style={fi} value={devForm.role} onChange={e=>setDevForm({...devForm,role:e.target.value})}><option>Developer</option><option>Designer</option><option>Lead</option><option>Project Manager</option></select></div>
      <div style={{marginBottom:18}}><label style={fl}>Photo URL</label><input style={fi} placeholder="https://… (optional)" value={devForm.avatar_url||""} onChange={e=>setDevForm({...devForm,avatar_url:e.target.value})}/></div>
    </Modal>}
    <div style={{fontSize:11,fontWeight:600,letterSpacing:2,textTransform:"uppercase",color:"#636370",marginBottom:14}}>Team Members</div>
    <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(260px,1fr))",gap:16,marginBottom:32}}>
      {devList.map(d=><div key={d.id} style={{background:"#111114",border:"1px solid #222228",borderRadius:13,padding:24,textAlign:"center"}}>
        {d.avatar_url?<img src={d.avatar_url} alt="" style={{width:56,height:56,borderRadius:"50%",objectFit:"cover",margin:"0 auto 14px",display:"block"}}/>:<div style={{width:56,height:56,borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",fontSize:18,fontWeight:700,margin:"0 auto 14px",background:"linear-gradient(135deg,#c8ff00,#88cc00)",color:"#000"}}>{(d.name||"").split(" ").map(w=>w[0]).join("").slice(0,2)||"?"}</div>}
        <div style={{fontSize:15,fontWeight:600,marginBottom:3}}>{d.name}</div>
        <div style={{fontSize:12,color:"#636370"}}>{d.role}</div>
        {d.email&&<div style={{fontSize:11.5,color:"#a0a0ad",marginTop:8,display:"flex",alignItems:"center",gap:5,justifyContent:"center"}}><I.Mail/> {d.email}</div>}
      </div>)}
      {devList.length===0&&<p style={{fontSize:13,color:"#636370",gridColumn:"1/-1"}}>Create a developer profile above to see team cards here.</p>}
    </div>
    <div style={{fontSize:11,fontWeight:600,letterSpacing:2,textTransform:"uppercase",color:"#636370",marginBottom:14}}>Quick Actions</div>
    <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(240px,1fr))",gap:14}}>
      {quickActions.map((a,i)=>
        <div key={i} role="button" tabIndex={0} onClick={a.onClick} onKeyDown={e=>e.key==="Enter"&&a.onClick?.()} style={{background:"#111114",border:"1px solid #222228",borderRadius:13,padding:22,cursor:"pointer",display:"flex",alignItems:"flex-start",gap:14}}>
          <div style={{padding:10,background:"rgba(200,255,0,.06)",borderRadius:10,color:"#c8ff00",flexShrink:0}}>{a.i}</div>
          <div><div style={{fontSize:13.5,fontWeight:600}}>{a.l}</div><div style={{fontSize:12,color:"#636370",marginTop:3}}>{a.d}</div></div>
        </div>)}
    </div>
  </div>;
}

const COMPANY_STORAGE_KEY = "zbs_admin_company_info";
const defaultCompany = { name: "ZoneBroz Studios", email: "hello@zonebrozstudios.com", website: "https://zonebrozstudios.com" };

function SettingsPage() {
  const [saved,setSaved]=useState(false);
  const [company,setCompany]=useState(()=>{
    try {
      const raw = localStorage.getItem(COMPANY_STORAGE_KEY);
      if (raw) { const p = JSON.parse(raw); return { name: p.name ?? defaultCompany.name, email: p.email ?? defaultCompany.email, website: p.website ?? defaultCompany.website }; }
    } catch (_) {}
    return defaultCompany;
  });
  const saveCompany = () => {
    try { localStorage.setItem(COMPANY_STORAGE_KEY, JSON.stringify(company)); setSaved(true); setTimeout(()=>setSaved(false), 2000); } catch (_) {}
  };
  return <div style={{maxWidth:680}}>
    <div style={{fontSize:11,fontWeight:600,letterSpacing:2,textTransform:"uppercase",color:"#636370",marginBottom:14}}>Company Info</div>
    <div style={{background:"#111114",border:"1px solid #222228",borderRadius:13,padding:22,marginBottom:24}}>
      <div style={{marginBottom:18}}><label style={fl}>Company Name</label><input style={fi} value={company.name} onChange={e=>setCompany(c=>({...c,name:e.target.value}))}/></div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14}}><div style={{marginBottom:18}}><label style={fl}>Email</label><input style={fi} type="email" value={company.email} onChange={e=>setCompany(c=>({...c,email:e.target.value}))}/></div><div style={{marginBottom:18}}><label style={fl}>Website</label><input style={fi} value={company.website} onChange={e=>setCompany(c=>({...c,website:e.target.value}))}/></div></div>
      <button type="button" style={{...B("p"),marginTop:8}} onClick={saveCompany}>{saved?"✓ Saved!":"Save Company Info"}</button>
    </div>
    <div style={{fontSize:11,fontWeight:600,letterSpacing:2,textTransform:"uppercase",color:"#636370",marginBottom:14}}>Payments</div>
    <div style={{background:"#111114",border:"1px solid #222228",borderRadius:13,padding:22,marginBottom:24}}>
      <div style={{marginBottom:18}}><label style={fl}>Ozow API Key</label><input style={fi} type="password" placeholder="••••••••"/></div>
      <div style={{marginBottom:18}}><label style={fl}>Bank Details</label><textarea style={{...fi,resize:"vertical",minHeight:70}} placeholder="Account name, bank, branch code..."/></div>
    </div>
    <div style={{fontSize:11,fontWeight:600,letterSpacing:2,textTransform:"uppercase",color:"#636370",marginBottom:14}}>Notifications</div>
    <div style={{background:"#111114",border:"1px solid #222228",borderRadius:13,padding:22,marginBottom:24}}>
      {["New inquiry","Payment received","Payment overdue","Client message","Milestone complete"].map((n,i)=>
        <div key={i} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"12px 0",borderBottom:i<4?"1px solid #222228":"none"}}><span style={{fontSize:13.5}}>{n}</span><div style={{width:44,height:24,borderRadius:12,background:"#c8ff00",position:"relative",cursor:"pointer"}}><div style={{position:"absolute",top:3,right:3,width:18,height:18,borderRadius:"50%",background:"#000"}}/></div></div>)}
    </div>
    <button style={{...B("p"),width:"100%",justifyContent:"center"}} onClick={()=>{setSaved(true);setTimeout(()=>setSaved(false),2000);}}>{saved?"✓ Saved!":"Save Settings"}</button>
  </div>;
}

// ═══════ ADMIN LOGIN ═══════
function AdminLoginScreen({ onSuccess }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const { data: authData, error: authError } = await supabase.auth.signInWithPassword({ email, password });
      if (authError) throw authError;
      const { data: adminRow } = await supabase.from("admins").select("email").eq("email", email).maybeSingle();
      if (!adminRow) {
        await supabase.auth.signOut();
        throw new Error("Not authorized as admin");
      }
      onSuccess();
    } catch (err) {
      setError(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: "100vh", background: "#060607", display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}>
      <style>{CSS}</style>
      <div style={{ background: "#0c0c0e", border: "1px solid #222228", borderRadius: 16, padding: 32, width: "100%", maxWidth: 400 }}>
        <div style={{ fontSize: 12, fontWeight: 800, letterSpacing: 4.5, textTransform: "uppercase", marginBottom: 4 }}>ZONEBROZ</div>
        <div style={{ fontSize: 9, fontWeight: 500, letterSpacing: 3, textTransform: "uppercase", color: "#c8ff00", marginBottom: 24 }}>ADMIN PANEL</div>
        <h2 style={{ fontSize: 18, fontWeight: 600, marginBottom: 8 }}>Sign in</h2>
        <p style={{ fontSize: 13, color: "#636370", marginBottom: 20 }}>Use your admin email and password.</p>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: 16 }}>
            <label style={fl}>Email</label>
            <input style={fi} type="email" value={email} onChange={e => setEmail(e.target.value)} required placeholder="admin@zonebrozstudios.com" />
          </div>
          <div style={{ marginBottom: 20 }}>
            <label style={fl}>Password</label>
            <input style={fi} type="password" value={password} onChange={e => setPassword(e.target.value)} required placeholder="••••••••" />
          </div>
          {error && <p style={{ color: "#f87171", fontSize: 12, marginBottom: 12 }}>{error}</p>}
          <button type="submit" style={B("p")} disabled={loading}>{loading ? "Signing in…" : "Sign in"}</button>
        </form>
      </div>
    </div>
  );
}

// ═══════ MAIN APP ═══════
export default function AdminDashboard() {
  const [session, setSession] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [page, setPage] = useState("dash");
  const [projectIdToOpen, setProjectIdToOpen] = useState(null);
  const [sbOpen, setSbOpen] = useState(false);
  const [projects, setProjects] = useState([]);
  const [clients, setClients] = useState([]);
  const [payments, setPayments] = useState([]);
  const [convos, setConvos] = useState([]);
  const [files, setFiles] = useState([]);
  const [developers, setDevelopers] = useState([]);
  const [loadError, setLoadError] = useState(null);
  const [readMsgIds, setReadMsgIds] = useState(() => {
    try { return new Set(JSON.parse(localStorage.getItem("zbs_admin_read_msg_ids") || "[]")); } catch { return new Set(); }
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [bellOpen, setBellOpen] = useState(false);
  const bellRef = useRef(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session: s } }) => {
      setSession(s);
      if (s?.user?.email) {
        supabase.from("admins").select("email").eq("email", s.user.email).maybeSingle().then(({ data }) => {
          setIsAdmin(!!data);
        });
      } else setIsAdmin(false);
    });
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, s) => {
      setSession(s);
      if (s?.user?.email) {
        supabase.from("admins").select("email").eq("email", s.user.email).maybeSingle().then(({ data }) => {
          setIsAdmin(!!data);
        });
      } else setIsAdmin(false);
    });
    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (!session || !isAdmin) return;
    let cancelled = false;
    setLoadError(null);
    Promise.all([
      supabase.from("clients").select("*").order("created_at", { ascending: false }),
      supabase.from("projects").select("*, clients(name)").order("created_at", { ascending: false }),
      supabase.from("payments").select("*, projects(name, clients(name))").order("created_at", { ascending: false }),
      supabase.from("files").select("*, projects(name)").order("created_at", { ascending: false }),
      supabase.from("conversations").select("*, clients(name, contact)").order("created_at", { ascending: false }),
      supabase.from("developers").select("*").order("created_at", { ascending: false }),
    ]).then(async ([clientsRes, projectsRes, paymentsRes, filesRes, convosRes, developersRes]) => {
      if (cancelled) return;
      if (clientsRes.error) throw clientsRes.error;
      if (projectsRes.error) throw projectsRes.error;
      if (paymentsRes.error) throw paymentsRes.error;
      if (developersRes.error) setDevelopers([]);
      else setDevelopers(developersRes.data || []);
      const clientsData = (clientsRes.data || []).map(c => ({
        ...c,
        projects: 0,
        spent: 0,
        joined: c.created_at ? c.created_at.slice(0, 10) : "",
      }));
      setClients(clientsData);
      setProjects((projectsRes.data || []).map(p => ({
        ...p,
        desc: p.description,
        client: p.clients?.name ?? p.client,
        ms: Array.isArray(p.milestones) ? p.milestones : (p.milestones ? JSON.parse(p.milestones) : []),
        developers: Array.isArray(p.developers) ? p.developers : (p.assignee ? [p.assignee] : []),
      })));
      setPayments((paymentsRes.data || []).map(pay => ({
        id: pay.id,
        project: pay.projects?.name ?? "",
        client: pay.projects?.clients?.name ?? "",
        amount: Number(pay.amount) || 0,
        status: pay.status || "pending",
        due: pay.due_date ? pay.due_date.slice(0, 10) : "",
        method: pay.method || "-",
        desc: pay.description || "",
      })));
      if (!filesRes.error && filesRes.data) {
        setFiles((filesRes.data || []).map(f => ({
          id: f.id,
          project: f.projects?.name ?? "",
          name: f.name,
          type: (f.type || "doc").toLowerCase(),
          size: f.size_text || "-",
          by: f.uploaded_by || "-",
          date: f.created_at ? f.created_at.slice(0, 10) : "",
          storage_path: f.storage_path || null,
        })));
      }
      if (!convosRes.error && convosRes.data && convosRes.data.length > 0) {
        const convoIds = convosRes.data.map(c => c.id);
        const { data: msgsData } = await supabase.from("messages").select("*, files(name)").in("conversation_id", convoIds).order("created_at", { ascending: true });
        const msgsByConvo = {};
        (msgsData || []).forEach(m => {
          if (!msgsByConvo[m.conversation_id]) msgsByConvo[m.conversation_id] = [];
          const d = m.created_at ? new Date(m.created_at) : new Date();
          msgsByConvo[m.conversation_id].push({
            id: m.id,
            from: m.sender_name || "-",
            t: d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
            d: d.toLocaleDateString() || "Now",
            ts: m.created_at || d.toISOString(),
            text: m.text || "",
            isC: !!m.is_from_client,
            fileId: m.file_id || null,
            fileName: m.files?.name || null,
          });
        });
        const convoByClient = {};
        convosRes.data.forEach(c => { convoByClient[c.client_id] = { id: c.id, client_id: c.client_id, client: c.clients?.name ?? "", contact: c.clients?.contact ?? "", msgs: msgsByConvo[c.id] || [] }; });
        const convosList = clientsData.map(c => convoByClient[c.id] || { id: null, client_id: c.id, client: c.name, contact: c.contact || "", msgs: [] });
        setConvos(convosList);
      } else {
        setConvos(clientsData.map(c => ({ id: null, client_id: c.id, client: c.name, contact: c.contact || "", msgs: [] })));
      }
      // #region agent log
      fetch('http://127.0.0.1:7242/ingest/3b23f6c4-91e4-41e3-9f69-29c338b6fa41',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'zonebrozstudios-admin-dashboard.jsx:dataLoad',message:'Admin data load success',data:{projects:(projectsRes.data||[]).length,clients:clientsData.length,payments:(paymentsRes.data||[]).length,files:(filesRes.data||[]).length,convos:(convosRes.data||[]).length},hypothesisId:'H1',timestamp:Date.now()})}).catch(()=>{});
      // #endregion
    }).catch(err => {
      // #region agent log
      fetch('http://127.0.0.1:7242/ingest/3b23f6c4-91e4-41e3-9f69-29c338b6fa41',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'zonebrozstudios-admin-dashboard.jsx:dataLoadCatch',message:'Admin data load error',data:{error:String(err?.message||err)},hypothesisId:'H1',timestamp:Date.now()})}).catch(()=>{});
      // #endregion
      if (!cancelled) setLoadError(err.message);
    });
    return () => { cancelled = true; };
  }, [session, isAdmin]);

  const logout = () => {
    supabase.auth.signOut();
    setSession(null);
    setIsAdmin(false);
  };

  const addClient = async (form) => {
    const { data, error } = await supabase.from("clients").insert({
      name: form.name,
      contact: form.contact || null,
      email: form.email,
      phone: form.phone || null,
      size: form.size || null,
      industry: form.industry || null,
      status: form.status || "lead",
    }).select().single();
    if (error) throw error;
    setClients(prev => [...prev, { ...data, projects: 0, spent: 0, joined: data.created_at ? data.created_at.slice(0, 10) : "" }]);
  };
  const deleteClient = async (id) => {
    const { error } = await supabase.from("clients").delete().eq("id", id);
    if (error) throw error;
    setClients(prev => prev.filter(c => c.id !== id));
  };
  const PORTAL_FILES_BUCKET = "portal-files";
  const ensurePortalFilesBucket = async () => {
    const { error } = await supabase.storage.createBucket(PORTAL_FILES_BUCKET, { public: false });
    if (error && error.message && !error.message.includes("already exists")) return error.message;
    return null;
  };
  const addDeveloper = async (profile) => {
    // #region agent log
    fetch('http://127.0.0.1:7242/ingest/3b23f6c4-91e4-41e3-9f69-29c338b6fa41',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'zonebrozstudios-admin-dashboard.jsx:addDeveloper',message:'addDeveloper entry',data:{name:profile?.name},hypothesisId:'H3',timestamp:Date.now()})}).catch(()=>{});
    // #endregion
    const { data, error } = await supabase.from("developers").insert({
      name: profile.name || "",
      email: profile.email || null,
      role: profile.role || "Developer",
      avatar_url: profile.avatar_url || null,
    }).select().single();
    if (error) throw error;
    // #region agent log
    fetch('http://127.0.0.1:7242/ingest/3b23f6c4-91e4-41e3-9f69-29c338b6fa41',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'zonebrozstudios-admin-dashboard.jsx:addDeveloper',message:'addDeveloper success',data:{id:data?.id},hypothesisId:'H3',timestamp:Date.now()})}).catch(()=>{});
    // #endregion
    setDevelopers(prev => [...prev, { ...data, avatar_url: profile.avatar_url || null }]);
  };
  const updateDeveloper = async (developerId, updates) => {
    const { error } = await supabase.from("developers").update(updates).eq("id", developerId);
    if (error) throw error;
    setDevelopers(prev => prev.map(d => d.id === developerId ? { ...d, ...updates } : d));
  };
  const deleteDeveloper = async (id) => {
    const { error } = await supabase.from("developers").delete().eq("id", id);
    if (error) throw error;
    setDevelopers(prev => prev.filter(d => d.id !== id));
  };
  const updateProject = async (projectId, updates) => {
    // #region agent log
    fetch('http://127.0.0.1:7242/ingest/3b23f6c4-91e4-41e3-9f69-29c338b6fa41',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'zonebrozstudios-admin-dashboard.jsx:updateProject',message:'updateProject entry',data:{projectId,keys:Object.keys(updates||{})},hypothesisId:'H3',timestamp:Date.now()})}).catch(()=>{});
    // #endregion
    const payload = { ...updates };
    if (payload.developers !== undefined && !Array.isArray(payload.developers)) payload.developers = [];
    const { error } = await supabase.from("projects").update(payload).eq("id", projectId);
    if (error) {
      // #region agent log
      fetch('http://127.0.0.1:7242/ingest/3b23f6c4-91e4-41e3-9f69-29c338b6fa41',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'zonebrozstudios-admin-dashboard.jsx:updateProject',message:'updateProject error',data:{error:error?.message},hypothesisId:'H3',timestamp:Date.now()})}).catch(()=>{});
      // #endregion
      const isDevelopersUpdate = updates.developers !== undefined;
      if (isDevelopersUpdate) {
        const hint = " If the list doesn't save, run in Supabase SQL Editor: ALTER TABLE projects ADD COLUMN IF NOT EXISTS developers JSONB DEFAULT '[]';";
        throw new Error((error.message || "Update failed") + hint);
      }
      throw error;
    }
    // #region agent log
    fetch('http://127.0.0.1:7242/ingest/3b23f6c4-91e4-41e3-9f69-29c338b6fa41',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'zonebrozstudios-admin-dashboard.jsx:updateProject',message:'updateProject success',data:{projectId},hypothesisId:'H3',timestamp:Date.now()})}).catch(()=>{});
    // #endregion
    setProjects(prev => prev.map(p => {
      if (p.id !== projectId) return p;
      const next = { ...p, ...updates };
      if (updates.milestones !== undefined) next.ms = updates.milestones;
      if (updates.developers !== undefined) next.developers = updates.developers;
      return next;
    }));
  };

  const downloadMessageFile = async (fileId) => {
    const file = files.find(f => f.id === fileId);
    if (!file) return;
    if (file.storage_path) {
      try {
        let { data: blob, error } = await supabase.storage.from(PORTAL_FILES_BUCKET).download(file.storage_path);
        if (error) {
          await ensurePortalFilesBucket();
          const retry = await supabase.storage.from(PORTAL_FILES_BUCKET).download(file.storage_path);
          blob = retry.data; error = retry.error;
        }
        if (error) throw error;
        if (blob) {
          const blobUrl = URL.createObjectURL(blob);
          const a = document.createElement("a");
          a.href = blobUrl;
          a.download = file.name || "file";
          a.rel = "noopener";
          a.click();
          setTimeout(() => URL.revokeObjectURL(blobUrl), 5000);
        }
      } catch (e) {
        alert((e?.message || "Download failed.") + " Ensure Storage bucket 'portal-files' exists (Private) and you have run the portal-files policy SQL in sql-editor-commands.sql.");
      }
    } else {
      alert("This file is metadata only and was not uploaded to storage. New uploads from the client portal will be downloadable.");
    }
  };

  const addProject = async (form) => {
    const clientId = clients.find(c => c.name === form.client)?.id;
    if (!clientId) throw new Error("Please select a client");
    const milestones = [{ n: "Kickoff", s: "pending", d: form.deadline || "" }];
    const { data, error } = await supabase.from("projects").insert({
      client_id: clientId,
      name: form.name,
      status: "pending",
      progress: 0,
      deadline: form.deadline || null,
      budget: Number(form.budget) || 0,
      paid: 0,
      assignee: "Unassigned",
      service: form.service || null,
      priority: form.priority || "medium",
      description: form.desc || null,
      milestones,
    }).select("*, clients(name)").single();
    if (error) throw error;
    setProjects(prev => [...prev, {
      ...data,
      desc: data.description,
      client: data.clients?.name ?? form.client,
      ms: data.milestones || [],
    }]);
  };

  const addPayment = async (form) => {
    const proj = projects.find(p => p.name === form.project);
    if (!proj?.id) throw new Error("Please select a project");
    const { data, error } = await supabase.from("payments").insert({
      project_id: proj.id,
      amount: Number(form.amount) || 0,
      status: "pending",
      due_date: form.due || null,
      method: form.method || null,
      description: form.desc || null,
    }).select("*, projects(name, clients(name))").single();
    if (error) throw error;
    setPayments(prev => [...prev, {
      id: data.id,
      project: data.projects?.name ?? "",
      client: data.projects?.clients?.name ?? "",
      amount: Number(data.amount) || 0,
      status: data.status || "pending",
      due: data.due_date ? data.due_date.slice(0, 10) : "",
      method: data.method || "-",
      desc: data.description || "",
    }]);
  };

  const markPaymentPaid = async (paymentId) => {
    const pay = payments.find(p => p.id === paymentId);
    if (!pay) return;
    const proj = projects.find(p => p.name === pay.project);
    const { error: payError } = await supabase.from("payments").update({ status: "paid" }).eq("id", paymentId);
    if (payError) throw payError;
    if (proj?.id) {
      const newPaid = (Number(proj.paid) || 0) + (Number(pay.amount) || 0);
      await supabase.from("projects").update({ paid: newPaid }).eq("id", proj.id);
      setProjects(prev => prev.map(p => p.id === proj.id ? { ...p, paid: newPaid } : p));
    }
    setPayments(prev => prev.map(p => p.id === paymentId ? { ...p, status: "paid", method: p.method === "-" ? "Ozow" : p.method } : p));
  };

  const sendMessage = async (convoIndex, senderName, text, fileId = null) => {
    const t = convos[convoIndex];
    if (!t || !text.trim()) return;
    let conversationId = t.id;
    if (!conversationId) {
      const { data: newConvo, error: ec } = await supabase.from("conversations").insert({ client_id: t.client_id }).select("id").single();
      if (ec) throw ec;
      conversationId = newConvo.id;
      setConvos(prev => prev.map((c, i) => i === convoIndex ? { ...c, id: conversationId } : c));
    }
    const payload = { conversation_id: conversationId, sender_name: senderName, text: text.trim(), is_from_client: false };
    if (fileId) payload.file_id = fileId;
    const { data: newMsg, error: em } = await supabase.from("messages").insert(payload).select("*, files(name)").single();
    if (em) throw em;
    const d = new Date();
    const newMsgRow = { from: senderName, t: d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }), d: d.toLocaleDateString(), text: text.trim(), isC: false };
    if (newMsg?.file_id) newMsgRow.fileId = newMsg.file_id; newMsgRow.fileName = newMsg.files?.name || null;
    setConvos(prev => prev.map((c, i) => i === convoIndex ? { ...c, msgs: [...c.msgs, newMsgRow] } : c));
  };

  const addFile = async (projectName, name, type, sizeText, uploadedBy, fileBlob) => {
    const proj = projects.find(p => p.name === projectName);
    if (!proj?.id) throw new Error("Select a project");
    let storagePath = null;
    if (fileBlob && typeof fileBlob === "object" && fileBlob.name) {
      const safeName = (fileBlob.name || "file").replace(/[/\\]/g, "_");
      storagePath = `${proj.id}/${crypto.randomUUID()}_${safeName}`;
      let upErr = await supabase.storage.from(PORTAL_FILES_BUCKET).upload(storagePath, fileBlob, { upsert: false });
      if (upErr.error) {
        await ensurePortalFilesBucket();
        upErr = await supabase.storage.from(PORTAL_FILES_BUCKET).upload(storagePath, fileBlob, { upsert: false });
        if (upErr.error) throw new Error(upErr.error.message || "File upload failed. Create bucket 'portal-files' in Supabase Storage and run the portal-files policy SQL.");
      }
    }
    const { data, error } = await supabase.from("files").insert({
      project_id: proj.id,
      name: name || "Unnamed",
      type: (type || "doc").toLowerCase(),
      size_text: sizeText || "-",
      uploaded_by: uploadedBy || null,
      storage_path: storagePath || null,
    }).select("*, projects(name)").single();
    if (error) throw error;
    setFiles(prev => [...prev, { id: data.id, project: data.projects?.name ?? projectName, name: data.name, type: (data.type || "doc").toLowerCase(), size: data.size_text || "-", by: data.uploaded_by || "-", date: data.created_at ? data.created_at.slice(0, 10) : "", storage_path: data.storage_path || null }]);
  };

  const deleteFile = async (fileId) => {
    const { error } = await supabase.from("files").delete().eq("id", fileId);
    if (error) throw error;
    setFiles(prev => prev.filter(f => f.id !== fileId));
  };

  const unreadMsgCount = convos.reduce((s,c)=>s+c.msgs.filter(m=>m.isC&&m.id&&!readMsgIds.has(m.id)).length,0);

  useEffect(() => {
    if (page !== "msg" || !convos.length) return;
    setReadMsgIds((prev) => {
      const ids = new Set(prev);
      convos.forEach(c=>c.msgs.forEach(m=>{if(m.isC&&m.id)ids.add(m.id);}));
      try { localStorage.setItem("zbs_admin_read_msg_ids",JSON.stringify([...ids])); } catch (_) {}
      return ids;
    });
  }, [page, convos]);

  useEffect(() => {
    if (!bellOpen) return;
    const onDocClick = (e) => { if (bellRef.current && !bellRef.current.contains(e.target)) setBellOpen(false); };
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, [bellOpen]);

  const q = (searchQuery || "").trim().toLowerCase();
  const searchProjects = q ? projects.filter(p => (p.name||"").toLowerCase().includes(q) || (p.client||"").toLowerCase().includes(q)) : projects;
  const searchClients = q ? clients.filter(c => (c.name||"").toLowerCase().includes(q) || (c.email||"").toLowerCase().includes(q) || (c.contact||"").toLowerCase().includes(q)) : clients;
  const searchPayments = q ? payments.filter(p => (p.client||"").toLowerCase().includes(q) || (p.id||"").toLowerCase().includes(q) || (p.desc||"").toLowerCase().includes(q)) : payments;
  const overdueCount = payments.filter(p=>p.status==="overdue").length;

  if (!session || !isAdmin) {
    return <AdminLoginScreen onSuccess={() => {}} />;
  }

  const nav=[
    {id:"dash",label:"Dashboard",icon:<I.Dash/>},
    {id:"proj",label:"Projects",icon:<I.Proj/>,badge:projects.length},
    {id:"clients",label:"Clients",icon:<I.Users/>},
    {id:"pay",label:"Payments",icon:<I.Money/>,badgeR:payments.filter(p=>p.status==="overdue").length||null},
    {id:"msg",label:"Messages",icon:<I.Chat/>,badge:unreadMsgCount||null},
    {id:"files",label:"Files",icon:<I.File/>},
    {id:"team",label:"Team",icon:<I.Team/>},
    {id:"settings",label:"Settings",icon:<I.Gear/>},
  ];
  const titles={dash:"Dashboard",proj:"Projects",clients:"Clients",pay:"Payments & Invoices",msg:"Messages",files:"Files & Deliverables",team:"Team",settings:"Settings"};

  return <>
    <style>{CSS}</style>
    <div style={{display:"flex",minHeight:"100vh",background:"#060607"}}>
      {sbOpen&&<div onClick={()=>setSbOpen(false)} style={{position:"fixed",inset:0,background:"rgba(0,0,0,.6)",zIndex:199,backdropFilter:"blur(4px)"}}/>}
      <aside style={{width:250,background:"#0c0c0e",borderRight:"1px solid #222228",display:"flex",flexDirection:"column",position:"fixed",top:0,left:0,height:"100vh",zIndex:200,transition:"transform .25s",transform:sbOpen?"translateX(0)":undefined}} className={typeof window!=="undefined"&&window.innerWidth<=768&&!sbOpen?"sb-hide":""}>
        <div style={{padding:"24px 20px 18px",borderBottom:"1px solid #222228"}}>
          <div style={{fontSize:12,fontWeight:800,letterSpacing:4.5,textTransform:"uppercase"}}>ZONEBROZ</div>
          <div style={{fontSize:9,fontWeight:500,letterSpacing:3,textTransform:"uppercase",color:"#c8ff00",marginTop:3}}>ADMIN PANEL</div>
        </div>
        <div style={{fontSize:9,fontWeight:600,letterSpacing:2.5,textTransform:"uppercase",color:"#636370",padding:"22px 20px 8px"}}>Management</div>
        <nav style={{flex:1,padding:"4px 10px",overflowY:"auto"}}>
          {nav.map(n=><div key={n.id} onClick={()=>{
      // #region agent log
      fetch('http://127.0.0.1:7242/ingest/3b23f6c4-91e4-41e3-9f69-29c338b6fa41',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'zonebrozstudios-admin-dashboard.jsx:nav',message:'Admin page change',data:{page:n.id},hypothesisId:'H4',timestamp:Date.now()})}).catch(()=>{});
      // #endregion
      setPage(n.id);setSbOpen(false);}} style={{display:"flex",alignItems:"center",gap:11,padding:"10px 12px",borderRadius:9,cursor:"pointer",marginBottom:1,border:"1px solid transparent",transition:"all .15s",color:page===n.id?"#c8ff00":"#a0a0ad",background:page===n.id?"rgba(200,255,0,.06)":"transparent",borderColor:page===n.id?"rgba(200,255,0,.12)":"transparent",fontWeight:page===n.id?500:400,fontSize:13.5}}>
            {n.icon}{n.label}
            {n.badge!=null&&n.badge>0&&<span style={{marginLeft:"auto",background:"#c8ff00",color:"#000",fontSize:9,fontWeight:700,padding:"1px 6px",borderRadius:8,minWidth:18,textAlign:"center"}}>{n.badge}</span>}
            {n.badgeR&&<span style={{marginLeft:"auto",background:"#f87171",color:"#fff",fontSize:9,fontWeight:700,padding:"1px 6px",borderRadius:8,minWidth:18,textAlign:"center"}}>{n.badgeR}</span>}
          </div>)}
        </nav>
        <div style={{padding:"14px 10px",borderTop:"1px solid #222228"}}>
          <button onClick={logout} style={{...ib,width:"100%",justifyContent:"center",padding:10,marginBottom:8}}><I.Out/> Sign out</button>
          <div style={{display:"flex",alignItems:"center",gap:10,padding:"10px 12px"}}>
            <div style={{width:34,height:34,borderRadius:"50%",background:"linear-gradient(135deg,#c8ff00,#88cc00)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,fontWeight:700,color:"#000",flexShrink:0}}>ZR</div>
            <div><div style={{fontSize:12.5,fontWeight:500}}>Zendyn Reddy</div><div style={{fontSize:10.5,color:"#636370",marginTop:1}}>CEO</div></div>
          </div>
        </div>
      </aside>

      <main style={{flex:1,marginLeft:250,minHeight:"100vh"}}>
        <header style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"16px 32px",borderBottom:"1px solid #222228",background:"rgba(6,6,7,.85)",backdropFilter:"blur(16px)",position:"sticky",top:0,zIndex:100}}>
          <div style={{display:"flex",alignItems:"center",gap:14}}>
            <button onClick={()=>setSbOpen(!sbOpen)} style={{display:"none",background:"none",border:"none",color:"#f5f5f7",cursor:"pointer"}}><I.Menu/></button>
            <h2 style={{fontSize:18,fontWeight:600}}>{titles[page]}</h2>
          </div>
          <div style={{display:"flex",alignItems:"center",gap:8}}>
            <div style={{display:"flex",alignItems:"center",gap:8,background:"#111114",border:"1px solid #222228",borderRadius:9,padding:"8px 14px",minWidth:200}}>
              <I.Search/><input value={searchQuery} onChange={e=>setSearchQuery(e.target.value)} placeholder={page==="dash"?"Search projects, clients…":page==="proj"?"Search projects…":page==="clients"?"Search clients…":page==="pay"?"Search invoices…":page==="msg"?"Search conversations…":page==="files"?"Search files…":"Search…"} style={{background:"none",border:"none",color:"#f5f5f7",fontSize:13,outline:"none",width:"100%",fontFamily:"Outfit,sans-serif"}}/>
            </div>
            <div ref={bellRef} style={{position:"relative"}}>
              <div onClick={()=>setBellOpen(!bellOpen)} style={{background:"#111114",border:"1px solid #222228",borderRadius:9,padding:8,cursor:"pointer",position:"relative",display:"flex",alignItems:"center",justifyContent:"center",color:"#a0a0ad"}} title={unreadMsgCount||overdueCount?"Notifications":"No new notifications"}><I.Bell/>{((unreadMsgCount||0)+(overdueCount||0))>0&&<span style={{position:"absolute",top:6,right:6,width:6,height:6,borderRadius:"50%",background:"#f87171"}}/>}</div>
              {bellOpen&&<div style={{position:"absolute",top:"100%",right:0,marginTop:6,minWidth:240,background:"#111114",border:"1px solid #222228",borderRadius:12,boxShadow:"0 12px 32px rgba(0,0,0,.5)",zIndex:150,overflow:"hidden"}}>
                <div style={{padding:"12px 14px",fontSize:10,fontWeight:700,letterSpacing:1.5,textTransform:"uppercase",color:"#636370",borderBottom:"1px solid #222228"}}>Notifications</div>
                {unreadMsgCount>0&&<button type="button" onClick={()=>{setPage("msg");setBellOpen(false);}} style={{width:"100%",display:"flex",alignItems:"center",gap:10,padding:"12px 14px",border:"none",background:"transparent",color:"#f5f5f7",fontSize:13,cursor:"pointer",fontFamily:"Outfit,sans-serif",textAlign:"left",borderBottom:"1px solid #222228"}}><I.Chat/><span>{unreadMsgCount} unread message{unreadMsgCount!==1?"s":""}</span></button>}
                {overdueCount>0&&<button type="button" onClick={()=>{setPage("pay");setBellOpen(false);}} style={{width:"100%",display:"flex",alignItems:"center",gap:10,padding:"12px 14px",border:"none",background:"transparent",color:"#f5f5f7",fontSize:13,cursor:"pointer",fontFamily:"Outfit,sans-serif",textAlign:"left",borderBottom:"1px solid #222228"}}><I.Money/><span>{overdueCount} overdue payment{overdueCount!==1?"s":""}</span></button>}
                {unreadMsgCount===0&&overdueCount===0&&<div style={{padding:"16px 14px",fontSize:13,color:"#636370"}}>No new notifications</div>}
              </div>}
            </div>
          </div>
        </header>
        <div style={{padding:"28px 32px"}}>
          {loadError && <p style={{color:"#f87171",marginBottom:16}}>{loadError}</p>}
          {page==="dash"&&<DashPage projects={searchProjects} clients={searchClients} payments={searchPayments} files={files} convos={convos} onOpenProject={(p)=>{setProjectIdToOpen(p?.id);setPage("proj");setSbOpen(false);}}/>}
          {page==="proj"&&<ProjPage projects={projects} setProjects={setProjects} clients={clients} onAddProject={addProject} onUpdateProject={updateProject} searchQuery={searchQuery} developerOptions={developers.length?developers.map(d=>d.name):DEVELOPER_OPTIONS} initialProjectId={projectIdToOpen} onOpenProjectIdConsumed={()=>setProjectIdToOpen(null)}/>}
          {page==="clients"&&<ClientPage clients={clients} setClients={setClients} onAddClient={addClient} onDeleteClient={deleteClient} searchQuery={searchQuery}/>}
          {page==="pay"&&<PayPage payments={payments} setPayments={setPayments} projects={projects} onAddPayment={addPayment} onMarkPaid={markPaymentPaid} searchQuery={searchQuery}/>}
          {page==="msg"&&<MsgPage convos={convos} setConvos={setConvos} onSendMessage={sendMessage} files={files} projects={projects} onDownloadFile={downloadMessageFile} searchQuery={searchQuery}/>}
          {page==="files"&&<FilePage files={files} setFiles={setFiles} projects={projects} onAddFile={addFile} onDeleteFile={deleteFile} onDownloadFile={downloadMessageFile} searchQuery={searchQuery}/>}
          {page==="team"&&<TeamPage developers={developers} onAddDeveloper={addDeveloper} onDeleteDeveloper={deleteDeveloper} setPage={setPage} clients={clients} payments={payments} projects={projects}/>}
          {page==="settings"&&<SettingsPage/>}
        </div>
      </main>
    </div>
  </>;
}
