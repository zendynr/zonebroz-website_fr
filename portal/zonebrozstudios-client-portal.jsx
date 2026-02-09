import { useState, useEffect, useRef } from "react";
import { supabase } from "./src/supabase.js";

// ── Icon Components ──
const Icons = {
  Projects: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/>
    </svg>
  ),
  Payments: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="5" width="20" height="14" rx="2"/><line x1="2" y1="10" x2="22" y2="10"/>
    </svg>
  ),
  Messages: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/>
    </svg>
  ),
  Files: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/>
    </svg>
  ),
  Logout: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/>
    </svg>
  ),
  Send: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
    </svg>
  ),
  Upload: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="16 16 12 12 8 16"/><line x1="12" y1="12" x2="12" y2="21"/><path d="M20.39 18.39A5 5 0 0018 9h-1.26A8 8 0 103 16.3"/>
    </svg>
  ),
  Download: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
    </svg>
  ),
  Check: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12"/>
    </svg>
  ),
  Clock: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
    </svg>
  ),
  Arrow: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
    </svg>
  ),
  Menu: () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/>
    </svg>
  ),
  Close: () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
    </svg>
  ),
  Back: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/>
    </svg>
  ),
  Attachment: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21.44 11.05l-9.19 9.19a6 6 0 01-8.49-8.49l9.19-9.19a4 4 0 015.66 5.66l-9.2 9.19a2 2 0 01-2.83-2.83l8.49-8.48"/>
    </svg>
  ),
  Star: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
    </svg>
  ),
  StarFilled: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
    </svg>
  ),
};

// ── Utility ──
const formatCurrency = (n) => "R " + n.toLocaleString("en-ZA");

const statusColors = {
  "in-progress": { bg: "#1a3a2a", text: "#4ade80", label: "In Progress" },
  review: { bg: "#3a3520", text: "#facc15", label: "In Review" },
  pending: { bg: "#1e293b", text: "#94a3b8", label: "Pending" },
  complete: { bg: "#1a3a2a", text: "#4ade80", label: "Complete" },
  paid: { bg: "#1a3a2a", text: "#4ade80", label: "Paid" },
  overdue: { bg: "#3a1a1a", text: "#f87171", label: "Overdue" },
  upcoming: { bg: "#1e293b", text: "#94a3b8", label: "Upcoming" },
};

const fileTypeColors = {
  pdf: "#f87171",
  design: "#a78bfa",
  image: "#38bdf8",
  archive: "#facc15",
  doc: "#60a5fa",
  video: "#fb923c",
};

const fileTypeFromExt = (name) => {
  const ext = (name || "").split(".").pop()?.toLowerCase();
  if (["pdf"].includes(ext)) return "pdf";
  if (["sketch", "figma", "xd", "psd", "ai"].includes(ext)) return "design";
  if (["png", "jpg", "jpeg", "gif", "webp", "svg"].includes(ext)) return "image";
  if (["mp4", "mov", "webm"].includes(ext)) return "video";
  if (["zip", "rar", "7z"].includes(ext)) return "archive";
  return "doc";
};
const formatFileSize = (bytes) => {
  if (bytes == null || bytes === 0) return "-";
  if (bytes < 1024) return bytes + " B";
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
  return (bytes / (1024 * 1024)).toFixed(1) + " MB";
};

// ── Style Constants ──
const STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700&family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;1,400&display=swap');

  :root {
    --bg-primary: #0a0a0b;
    --bg-secondary: #111113;
    --bg-tertiary: #18181b;
    --bg-card: #141416;
    --bg-hover: #1c1c20;
    --border: #27272a;
    --border-light: #333338;
    --text-primary: #fafafa;
    --text-secondary: #a1a1aa;
    --text-muted: #71717a;
    --accent: #c8ff00;
    --accent-dim: #a3cc00;
    --accent-bg: rgba(200, 255, 0, 0.08);
    --danger: #f87171;
    --success: #4ade80;
    --warning: #facc15;
  }

  * { margin: 0; padding: 0; box-sizing: border-box; }

  body {
    font-family: 'DM Sans', sans-serif;
    background: var(--bg-primary);
    color: var(--text-primary);
    -webkit-font-smoothing: antialiased;
  }

  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(12px); }
    to { opacity: 1; transform: translateY(0); }
  }
  @keyframes slideIn {
    from { opacity: 0; transform: translateX(-20px); }
    to { opacity: 1; transform: translateX(0); }
  }
  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.5; }
  }
  @keyframes shimmer {
    0% { background-position: -200% 0; }
    100% { background-position: 200% 0; }
  }

  .portal-container {
    display: flex;
    min-height: 100vh;
    background: var(--bg-primary);
  }

  /* ── Sidebar ── */
  .sidebar {
    width: 260px;
    background: var(--bg-secondary);
    border-right: 1px solid var(--border);
    display: flex;
    flex-direction: column;
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    z-index: 100;
    transition: transform 0.3s ease;
  }
  .sidebar-logo {
    padding: 28px 24px 20px;
    border-bottom: 1px solid var(--border);
  }
  .sidebar-logo h1 {
    font-family: 'Sora', sans-serif;
    font-size: 13px;
    font-weight: 700;
    letter-spacing: 4px;
    text-transform: uppercase;
    color: var(--text-primary);
    line-height: 1.4;
  }
  .sidebar-logo span {
    display: block;
    font-family: 'Sora', sans-serif;
    font-size: 10px;
    font-weight: 400;
    letter-spacing: 3px;
    text-transform: uppercase;
    color: var(--text-muted);
    margin-top: 2px;
  }
  .sidebar-label {
    font-family: 'Sora', sans-serif;
    font-size: 9px;
    font-weight: 600;
    letter-spacing: 2.5px;
    text-transform: uppercase;
    color: var(--text-muted);
    padding: 24px 24px 10px;
  }
  .sidebar-nav {
    flex: 1;
    padding: 8px 12px;
  }
  .nav-item {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 11px 14px;
    border-radius: 10px;
    cursor: pointer;
    color: var(--text-secondary);
    font-size: 14px;
    font-weight: 400;
    transition: all 0.2s ease;
    margin-bottom: 2px;
    border: 1px solid transparent;
    position: relative;
  }
  .nav-item:hover {
    background: var(--bg-hover);
    color: var(--text-primary);
  }
  .nav-item.active {
    background: var(--accent-bg);
    color: var(--accent);
    border-color: rgba(200, 255, 0, 0.12);
    font-weight: 500;
  }
  .nav-badge {
    margin-left: auto;
    background: var(--accent);
    color: #000;
    font-size: 10px;
    font-weight: 700;
    padding: 2px 7px;
    border-radius: 10px;
    font-family: 'Sora', sans-serif;
  }
  .sidebar-footer {
    padding: 16px 12px;
    border-top: 1px solid var(--border);
  }
  .user-info {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 10px 14px;
    border-radius: 10px;
  }
  .user-avatar {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    background: linear-gradient(135deg, var(--accent), #88cc00);
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: 'Sora', sans-serif;
    font-size: 12px;
    font-weight: 700;
    color: #000;
    flex-shrink: 0;
  }
  .user-name {
    font-size: 13px;
    font-weight: 500;
    color: var(--text-primary);
  }
  .user-email {
    font-size: 11px;
    color: var(--text-muted);
    margin-top: 1px;
  }

  /* ── Main Content ── */
  .main-content {
    flex: 1;
    margin-left: 260px;
    min-height: 100vh;
  }
  .topbar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20px 36px;
    border-bottom: 1px solid var(--border);
    background: var(--bg-primary);
    position: sticky;
    top: 0;
    z-index: 50;
    backdrop-filter: blur(12px);
  }
  .topbar h2 {
    font-family: 'Sora', sans-serif;
    font-size: 20px;
    font-weight: 600;
    letter-spacing: -0.3px;
  }
  .topbar-right {
    display: flex;
    align-items: center;
    gap: 12px;
  }
  .mobile-menu-btn {
    display: none;
    background: none;
    border: none;
    color: var(--text-primary);
    cursor: pointer;
    padding: 4px;
  }
  .page-content {
    padding: 32px 36px;
    animation: fadeIn 0.4s ease;
  }

  /* ── Cards ── */
  .card {
    background: var(--bg-card);
    border: 1px solid var(--border);
    border-radius: 14px;
    padding: 24px;
    transition: border-color 0.2s ease;
  }
  .card:hover {
    border-color: var(--border-light);
  }
  .card-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
    gap: 20px;
    margin-bottom: 32px;
  }
  .detail-overview-grid {
    display: grid;
    grid-template-columns: 1fr minmax(260px, 300px);
    gap: 20px;
    align-items: start;
    margin-bottom: 20px;
  }
  .stat-row {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 16px;
    margin-bottom: 0;
  }
  .stat-card {
    background: var(--bg-card);
    border: 1px solid var(--border);
    border-radius: 12px;
    padding: 20px;
  }
  .stat-label {
    font-size: 11px;
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 1.5px;
    color: var(--text-muted);
    font-family: 'Sora', sans-serif;
    margin-bottom: 8px;
  }
  .stat-value {
    font-family: 'Sora', sans-serif;
    font-size: 24px;
    font-weight: 700;
    color: var(--text-primary);
  }
  .stat-value.accent { color: var(--accent); }
  .stat-value.danger { color: var(--danger); }

  /* ── Status Badge ── */
  .status-badge {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 4px 12px;
    border-radius: 20px;
    font-size: 11px;
    font-weight: 600;
    font-family: 'Sora', sans-serif;
    letter-spacing: 0.3px;
  }
  .status-dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
  }

  /* ── Progress Bar ── */
  .progress-bar-container {
    width: 100%;
    height: 6px;
    background: var(--bg-hover);
    border-radius: 3px;
    overflow: hidden;
    margin: 12px 0;
  }
  .progress-bar-fill {
    height: 100%;
    border-radius: 3px;
    background: linear-gradient(90deg, var(--accent), #88cc00);
    transition: width 1s ease;
  }

  /* ── Section Headers ── */
  .section-header {
    font-family: 'Sora', sans-serif;
    font-size: 13px;
    font-weight: 600;
    letter-spacing: 1.5px;
    text-transform: uppercase;
    color: var(--text-muted);
    margin-bottom: 16px;
    margin-top: 8px;
  }

  /* ── Table ── */
  .table-wrapper {
    overflow-x: auto;
    border: 1px solid var(--border);
    border-radius: 14px;
    background: var(--bg-card);
  }
  table {
    width: 100%;
    border-collapse: collapse;
  }
  th {
    font-family: 'Sora', sans-serif;
    font-size: 10px;
    font-weight: 600;
    letter-spacing: 1.5px;
    text-transform: uppercase;
    color: var(--text-muted);
    text-align: left;
    padding: 14px 20px;
    border-bottom: 1px solid var(--border);
    white-space: nowrap;
  }
  td {
    padding: 14px 20px;
    font-size: 13.5px;
    border-bottom: 1px solid rgba(39, 39, 42, 0.5);
    color: var(--text-secondary);
    white-space: nowrap;
  }
  tr:last-child td { border-bottom: none; }
  tr:hover td { background: rgba(255,255,255,0.01); }
  .amount { font-family: 'Sora', sans-serif; font-weight: 600; color: var(--text-primary); }

  /* ── Messages ── */
  .chat-container {
    display: flex;
    flex-direction: column;
    height: calc(100vh - 140px);
  }
  .chat-messages {
    flex: 1;
    overflow-y: auto;
    padding: 24px 0;
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
  .message {
    display: flex;
    gap: 14px;
    max-width: 75%;
    animation: fadeIn 0.3s ease;
  }
  .message.own {
    margin-left: auto;
    flex-direction: row-reverse;
  }
  .message-avatar {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: 'Sora', sans-serif;
    font-size: 11px;
    font-weight: 700;
    flex-shrink: 0;
    background: var(--bg-hover);
    color: var(--text-secondary);
    border: 1px solid var(--border);
  }
  .message.own .message-avatar {
    background: linear-gradient(135deg, var(--accent), #88cc00);
    color: #000;
    border: none;
  }
  .message-body {
    background: var(--bg-card);
    border: 1px solid var(--border);
    border-radius: 16px;
    padding: 14px 18px;
  }
  .message.own .message-body {
    background: var(--accent-bg);
    border-color: rgba(200, 255, 0, 0.15);
  }
  .message-sender {
    font-size: 12px;
    font-weight: 600;
    color: var(--text-primary);
    margin-bottom: 4px;
    font-family: 'Sora', sans-serif;
  }
  .message-sender span {
    font-weight: 400;
    color: var(--text-muted);
    font-family: 'DM Sans', sans-serif;
    margin-left: 8px;
    font-size: 11px;
  }
  .message-text {
    font-size: 14px;
    line-height: 1.6;
    color: var(--text-secondary);
  }
  .message.own .message-text { color: var(--text-primary); }
  .message-time {
    font-size: 10px;
    color: var(--text-muted);
    margin-top: 6px;
  }
  .chat-input-area {
    padding: 16px 0 8px;
    border-top: 1px solid var(--border);
  }
  .chat-input-wrapper {
    display: flex;
    align-items: flex-end;
    gap: 10px;
    background: var(--bg-card);
    border: 1px solid var(--border);
    border-radius: 14px;
    padding: 10px 12px 10px 18px;
    transition: border-color 0.2s ease;
  }
  .chat-input-wrapper:focus-within {
    border-color: var(--accent);
    box-shadow: 0 0 0 3px rgba(200, 255, 0, 0.06);
  }
  .chat-input {
    flex: 1;
    background: none;
    border: none;
    color: var(--text-primary);
    font-size: 14px;
    font-family: 'DM Sans', sans-serif;
    padding: 4px 0;
    resize: none;
    max-height: 120px;
    line-height: 1.5;
    outline: none;
  }
  .chat-input::placeholder { color: var(--text-muted); }
  .send-btn {
    background: var(--accent);
    color: #000;
    border: none;
    border-radius: 10px;
    padding: 10px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s ease;
    flex-shrink: 0;
  }
  .send-btn:hover { background: var(--accent-dim); transform: scale(1.05); }
  .send-btn:disabled { opacity: 0.3; cursor: not-allowed; transform: none; }

  /* ── Files ── */
  .file-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 14px;
  }
  .file-card {
    background: var(--bg-card);
    border: 1px solid var(--border);
    border-radius: 12px;
    padding: 18px;
    display: flex;
    align-items: flex-start;
    gap: 14px;
    cursor: pointer;
    transition: all 0.2s ease;
  }
  .file-card:hover {
    border-color: var(--border-light);
    background: var(--bg-hover);
  }
  .file-icon {
    width: 42px;
    height: 42px;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: 'Sora', sans-serif;
    font-size: 10px;
    font-weight: 700;
    text-transform: uppercase;
    flex-shrink: 0;
    letter-spacing: 0.5px;
  }
  .file-info { flex: 1; min-width: 0; }
  .file-name {
    font-size: 13.5px;
    font-weight: 500;
    color: var(--text-primary);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .file-meta {
    font-size: 11.5px;
    color: var(--text-muted);
    margin-top: 4px;
  }
  .file-download {
    color: var(--text-muted);
    padding: 6px;
    border-radius: 8px;
    transition: all 0.2s ease;
    flex-shrink: 0;
    margin-top: 4px;
  }
  .file-download:hover { color: var(--accent); background: var(--accent-bg); }

  .upload-zone {
    border: 2px dashed var(--border);
    border-radius: 14px;
    padding: 40px;
    text-align: center;
    cursor: pointer;
    transition: all 0.25s ease;
    margin-bottom: 24px;
  }
  .upload-zone:hover {
    border-color: var(--accent);
    background: var(--accent-bg);
  }
  .upload-zone p {
    color: var(--text-muted);
    font-size: 14px;
    margin-top: 10px;
  }
  .upload-zone span { color: var(--accent); font-weight: 500; }

  /* ── Project Detail ── */
  .detail-back {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    color: var(--text-muted);
    font-size: 13px;
    cursor: pointer;
    padding: 6px 0;
    margin-bottom: 20px;
    transition: color 0.2s;
    background: none;
    border: none;
    font-family: 'DM Sans', sans-serif;
  }
  .detail-back:hover { color: var(--accent); }
  .detail-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 20px;
    margin-bottom: 28px;
    flex-wrap: wrap;
  }
  .detail-title {
    font-family: 'Sora', sans-serif;
    font-size: 26px;
    font-weight: 700;
    letter-spacing: -0.5px;
    margin-bottom: 6px;
  }
  .detail-sub {
    color: var(--text-muted);
    font-size: 14px;
  }
  .milestone-list { display: flex; flex-direction: column; gap: 0; }
  .milestone-item {
    display: flex;
    align-items: center;
    gap: 16px;
    padding: 16px 0;
    border-bottom: 1px solid rgba(39,39,42,0.4);
    position: relative;
  }
  .milestone-item:last-child { border-bottom: none; }
  .milestone-icon {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }
  .milestone-icon.complete { background: rgba(74,222,128,0.15); color: var(--success); }
  .milestone-icon.in-progress { background: rgba(200,255,0,0.12); color: var(--accent); }
  .milestone-icon.pending { background: var(--bg-hover); color: var(--text-muted); }
  .milestone-name { font-size: 14px; font-weight: 500; color: var(--text-primary); flex: 1; }
  .milestone-date { font-size: 12px; color: var(--text-muted); font-family: 'Sora', sans-serif; }

  /* ── Login Page ── */
  .login-page {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--bg-primary);
    padding: 20px;
    position: relative;
    overflow: hidden;
  }
  .login-bg-pattern {
    position: absolute;
    inset: 0;
    background-image:
      radial-gradient(circle at 20% 50%, rgba(200,255,0,0.03) 0%, transparent 50%),
      radial-gradient(circle at 80% 20%, rgba(200,255,0,0.02) 0%, transparent 40%);
  }
  .login-card {
    background: var(--bg-secondary);
    border: 1px solid var(--border);
    border-radius: 20px;
    padding: 44px 40px;
    width: 100%;
    max-width: 420px;
    position: relative;
    animation: fadeIn 0.5s ease;
  }
  .login-logo {
    font-family: 'Sora', sans-serif;
    font-size: 14px;
    font-weight: 700;
    letter-spacing: 4px;
    text-transform: uppercase;
    color: var(--text-primary);
    text-align: center;
    margin-bottom: 4px;
  }
  .login-logo-sub {
    font-family: 'Sora', sans-serif;
    font-size: 10px;
    letter-spacing: 3px;
    text-transform: uppercase;
    color: var(--text-muted);
    text-align: center;
    margin-bottom: 36px;
  }
  .login-title {
    font-family: 'Sora', sans-serif;
    font-size: 22px;
    font-weight: 600;
    text-align: center;
    margin-bottom: 8px;
    letter-spacing: -0.3px;
  }
  .login-subtitle {
    text-align: center;
    color: var(--text-muted);
    font-size: 14px;
    margin-bottom: 32px;
    line-height: 1.5;
  }
  .input-group { margin-bottom: 20px; }
  .input-label {
    display: block;
    font-size: 12px;
    font-weight: 500;
    color: var(--text-secondary);
    margin-bottom: 8px;
    font-family: 'Sora', sans-serif;
    letter-spacing: 0.5px;
  }
  .input-field {
    width: 100%;
    padding: 13px 16px;
    background: var(--bg-primary);
    border: 1px solid var(--border);
    border-radius: 10px;
    color: var(--text-primary);
    font-size: 14px;
    font-family: 'DM Sans', sans-serif;
    outline: none;
    transition: all 0.2s ease;
  }
  .input-field:focus {
    border-color: var(--accent);
    box-shadow: 0 0 0 3px rgba(200,255,0,0.06);
  }
  .input-field::placeholder { color: var(--text-muted); }
  .login-btn {
    width: 100%;
    padding: 14px;
    background: var(--accent);
    color: #000;
    border: none;
    border-radius: 10px;
    font-family: 'Sora', sans-serif;
    font-size: 14px;
    font-weight: 600;
    letter-spacing: 0.5px;
    cursor: pointer;
    transition: all 0.2s ease;
    margin-top: 8px;
  }
  .login-btn:hover { background: var(--accent-dim); }
  .login-btn:disabled { opacity: 0.5; cursor: not-allowed; }
  .login-success {
    text-align: center;
    padding: 20px 0;
    animation: fadeIn 0.4s ease;
  }
  .login-success-icon {
    width: 56px;
    height: 56px;
    border-radius: 50%;
    background: rgba(200,255,0,0.1);
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 20px;
  }
  .login-check {
    width: 28px;
    height: 28px;
    color: var(--accent);
  }

  /* ── Buttons ── */
  .btn-primary {
    padding: 10px 20px;
    background: var(--accent);
    color: #000;
    border: none;
    border-radius: 10px;
    font-family: 'Sora', sans-serif;
    font-size: 12px;
    font-weight: 600;
    letter-spacing: 0.5px;
    cursor: pointer;
    transition: all 0.2s ease;
    display: inline-flex;
    align-items: center;
    gap: 8px;
  }
  .btn-primary:hover { background: var(--accent-dim); }
  .btn-ghost {
    padding: 10px 20px;
    background: transparent;
    color: var(--text-secondary);
    border: 1px solid var(--border);
    border-radius: 10px;
    font-family: 'Sora', sans-serif;
    font-size: 12px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s ease;
  }
  .btn-ghost:hover { border-color: var(--border-light); color: var(--text-primary); }

  /* ── Responsive ── */
  @media (max-width: 768px) {
    .sidebar {
      transform: translateX(-100%);
    }
    .sidebar.open {
      transform: translateX(0);
    }
    .sidebar-overlay {
      position: fixed;
      inset: 0;
      background: rgba(0,0,0,0.6);
      z-index: 99;
      backdrop-filter: blur(4px);
    }
    .main-content {
      margin-left: 0;
    }
    .mobile-menu-btn {
      display: block;
    }
    .topbar {
      padding: 16px 20px;
    }
    .page-content {
      padding: 24px 20px;
    }
    .card-grid {
      grid-template-columns: 1fr;
    }
    .detail-overview-grid {
      grid-template-columns: 1fr;
    }
    .stat-row {
      grid-template-columns: 1fr 1fr;
      margin-bottom: 32px;
    }
    .file-grid {
      grid-template-columns: 1fr;
    }
    .message {
      max-width: 90%;
    }
    .detail-header {
      flex-direction: column;
    }
    .login-card {
      padding: 32px 24px;
    }
  }

  /* ── Payment modal ── */
  .modal-overlay {
    position: fixed;
    inset: 0;
    background: rgba(0,0,0,0.6);
    backdrop-filter: blur(6px);
    z-index: 200;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px;
  }
  .modal-card {
    background: var(--bg-secondary);
    border: 1px solid var(--border);
    border-radius: 16px;
    width: 100%;
    max-width: 420px;
    max-height: 90vh;
    overflow: auto;
  }
  .modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 18px 20px;
    border-bottom: 1px solid var(--border);
  }
  .modal-header h3 {
    font-size: 17px;
    font-weight: 600;
    margin: 0;
  }
  .modal-close {
    background: none;
    border: none;
    color: var(--text-muted);
    cursor: pointer;
    padding: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .modal-close:hover { color: var(--text-primary); }
  .modal-body { padding: 20px; }
  .payment-summary {
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-bottom: 20px;
  }
  .payment-row {
    display: flex;
    justify-content: space-between;
    font-size: 13px;
    color: var(--text-secondary);
  }
  .payment-row.amount-row {
    margin-top: 8px;
    padding-top: 12px;
    border-top: 1px solid var(--border);
    font-weight: 600;
    color: var(--text-primary);
  }
  .payment-row.amount-row .amount { font-size: 18px; color: var(--accent); }
  .modal-actions {
    display: flex;
    justify-content: flex-end;
    gap: 10px;
    margin-top: 16px;
  }
  .payment-success {
    text-align: center;
    padding: 24px 0;
  }
  .payment-success-icon {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    background: rgba(74, 222, 128, 0.15);
    color: var(--success);
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 16px;
  }
  .payment-success p { margin: 0; font-size: 14px; }
`;

// ── Login Screen ──
function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e?.preventDefault?.();
    if (!email || !password) return;
    setError("");
    setLoading(true);
    try {
      const { error: signInError } = await supabase.auth.signInWithPassword({ email, password });
      if (signInError) throw signInError;
    } catch (err) {
      setError(err.message || "Sign in failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-bg-pattern" />
      <div className="login-card">
        <div className="login-logo">ZONEBROZ</div>
        <div className="login-logo-sub">CLIENT PORTAL</div>

        <h2 className="login-title">Welcome back</h2>
        <p className="login-subtitle">
          Sign in with your email and password.
        </p>
        <form onSubmit={handleSubmit}>
          {error && <p style={{ color: "var(--danger)", fontSize: 12, marginBottom: 12 }}>{error}</p>}
          <div className="input-group">
            <label className="input-label">Email</label>
            <input
              className="input-field"
              type="email"
              placeholder="you@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
              required
            />
          </div>
          <div className="input-group" style={{ marginTop: 16 }}>
            <label className="input-label">Password</label>
            <input
              className="input-field"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="login-btn"
            disabled={!email || !password || loading}
            style={{ marginTop: 24, width: "100%" }}
          >
            {loading ? "Signing in…" : "Sign in"}
          </button>
        </form>
      </div>
    </div>
  );
}

// ── Projects Page ──
function ProjectsPage({ onSelectProject, projects, favoriteProjectId, onSetFavorite }) {
  const list = Array.isArray(projects) ? projects : [];
  const totalBudget = list.reduce((s, p) => s + p.budget, 0);
  const totalPaid = list.reduce((s, p) => s + p.paid, 0);
  const activeCount = list.filter((p) => p.status !== "complete").length;

  return (
    <div>
      <div className="stat-row">
        <div className="stat-card">
          <div className="stat-label">Active Projects</div>
          <div className="stat-value">{activeCount}</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Total Budget</div>
          <div className="stat-value">{formatCurrency(totalBudget)}</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Total Paid</div>
          <div className="stat-value accent">{formatCurrency(totalPaid)}</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Outstanding</div>
          <div className="stat-value danger">{formatCurrency(totalBudget - totalPaid)}</div>
        </div>
      </div>

      <div className="section-header">Your Projects</div>
      <div className="card-grid">
        {list.map((project, i) => {
          const sc = statusColors[project.status];
          const isFavorite = project.id === favoriteProjectId;
          return (
            <div
              className="card"
              key={project.id}
              style={{ cursor: "pointer", animationDelay: `${i * 0.08}s` }}
              onClick={() => onSelectProject(project)}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
                <div>
                  <div style={{ fontFamily: "'Sora', sans-serif", fontSize: 11, color: "var(--text-muted)", letterSpacing: 1, marginBottom: 6 }}>
                    {project.id}
                  </div>
                  <div style={{ fontFamily: "'Sora', sans-serif", fontSize: 16, fontWeight: 600, letterSpacing: -0.2 }}>
                    {project.name}
                  </div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <button
                    type="button"
                    onClick={(e) => { e.stopPropagation(); onSetFavorite?.(isFavorite ? null : project.id); }}
                    style={{
                      padding: 4,
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      color: isFavorite ? "var(--accent)" : "var(--text-muted)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                    title={isFavorite ? "Unfavorite" : "Favorite this project"}
                  >
                    {isFavorite ? <Icons.StarFilled /> : <Icons.Star />}
                  </button>
                  <span className="status-badge" style={{ background: sc.bg, color: sc.text }}>
                    <span className="status-dot" style={{ background: sc.text }} />
                    {sc.label}
                  </span>
                </div>
              </div>

              <p style={{ fontSize: 13, color: "var(--text-muted)", lineHeight: 1.5, marginBottom: 16 }}>
                {(project.description || "").slice(0, 100)}{(project.description || "").length > 100 ? "…" : ""}
              </p>

              <div className="progress-bar-container">
                <div className="progress-bar-fill" style={{ width: `${project.progress}%` }} />
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12 }}>
                <span style={{ color: "var(--text-muted)" }}>Progress</span>
                <span style={{ color: "var(--accent)", fontFamily: "'Sora', sans-serif", fontWeight: 600 }}>{project.progress}%</span>
              </div>

              <div style={{ display: "flex", justifyContent: "space-between", marginTop: 16, paddingTop: 16, borderTop: "1px solid var(--border)", fontSize: 12, color: "var(--text-muted)" }}>
                <span>Budget: <strong style={{ color: "var(--text-primary)" }}>{formatCurrency(project.budget)}</strong></span>
                <span>Due: <strong style={{ color: "var(--text-primary)" }}>{project.deadline}</strong></span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ── Project Detail ──
function ProjectDetail({ project, onBack, payments, setPayments, projectFiles = [], messages = [], onSendMessage, developers = [] }) {
  const sc = statusColors[project.status];
  const allPayments = payments ?? [];
  const projectPayments = allPayments.filter((p) => p.project === project.name);
  const [paymentModal, setPaymentModal] = useState(null);
  const [messageInput, setMessageInput] = useState("");
  const messagesEndRef = useRef(null);
  const outstandingStatuses = ["pending", "overdue", "upcoming"];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const markPaid = (invoiceId) => {
    if (!setPayments) return;
    setPayments((prev) =>
      prev.map((p) => (p.id === invoiceId ? { ...p, status: "paid", method: "Ozow" } : p))
    );
  };

  const [attachedFile, setAttachedFile] = useState(null);
  const [attachOpen, setAttachOpen] = useState(false);

  const sendMessage = () => {
    if (!messageInput.trim()) return;
    if (onSendMessage) {
      onSendMessage(messageInput.trim(), attachedFile?.id);
      setMessageInput("");
      setAttachedFile(null);
      return;
    }
    setMessageInput("");
  };

  return (
    <div style={{ animation: "fadeIn 0.4s ease" }}>
      <button className="detail-back" onClick={onBack}>
        <Icons.Back /> Back to Projects
      </button>

      <div className="detail-header">
        <div>
          <div style={{ fontSize: 12, color: "var(--text-muted)", fontFamily: "'Sora', sans-serif", letterSpacing: 1, marginBottom: 6 }}>
            {project.id} • {project.client}
          </div>
          <h1 className="detail-title">{project.name}</h1>
          <p className="detail-sub">{project.description || ""}</p>
        </div>
        <span className="status-badge" style={{ background: sc.bg, color: sc.text, fontSize: 12, padding: "6px 16px" }}>
          <span className="status-dot" style={{ background: sc.text }} />
          {sc.label}
        </span>
      </div>

      <div className="detail-overview-grid">
        <div className="stat-row">
          <div className="stat-card">
            <div className="stat-label">Progress</div>
            <div className="stat-value accent">{project.progress}%</div>
          </div>
          <div className="stat-card">
            <div className="stat-label">Budget</div>
            <div className="stat-value">{formatCurrency(project.budget)}</div>
          </div>
          <div className="stat-card">
            <div className="stat-label">Paid</div>
            <div className="stat-value accent">{formatCurrency(project.paid)}</div>
          </div>
          <div className="stat-card">
            <div className="stat-label">Remaining</div>
            <div className="stat-value" style={{ color: "var(--warning)" }}>{formatCurrency(project.budget - project.paid)}</div>
          </div>
        </div>
        <div className="card" style={{ marginTop: 0 }}>
          <div className="section-header" style={{ marginTop: 0 }}>Working on this project</div>
          {(project.developers || []).length > 0 && developers.length > 0 ? (
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {(project.developers || []).map((devName, i) => {
                const dev = developers.find((d) => (d.name || "").trim() === (devName || "").trim());
                if (!dev) return <span key={i} style={{ display: "inline-flex", alignItems: "center", gap: 8, fontSize: 13, color: "var(--text-muted)" }}>{devName}</span>;
                return (
                  <div key={dev.id} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    {dev.avatar_url ? (
                      <img src={dev.avatar_url} alt="" style={{ width: 40, height: 40, borderRadius: "50%", objectFit: "cover", flexShrink: 0 }} />
                    ) : (
                      <div style={{ width: 40, height: 40, borderRadius: "50%", background: "var(--accent)", color: "#000", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700, flexShrink: 0 }}>
                        {(dev.name || "").split(" ").map((w) => w[0]).join("").slice(0, 2) || "?"}
                      </div>
                    )}
                    <div style={{ minWidth: 0 }}>
                      <div style={{ fontSize: 13, fontWeight: 600 }}>{dev.name}</div>
                      <div style={{ fontSize: 11, color: "var(--text-muted)" }}>{dev.role || "Developer"}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <p style={{ fontSize: 12, color: "var(--text-muted)", margin: 0 }}>No developers assigned yet.</p>
          )}
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
        <div className="card" style={{ gridColumn: window.innerWidth < 768 ? "1 / -1" : undefined }}>
          <div className="section-header" style={{ marginTop: 0 }}>Milestones</div>
          <div className="milestone-list">
            {project.milestones.map((m, i) => (
              <div className="milestone-item" key={i}>
                <div className={`milestone-icon ${m.status}`}>
                  {m.status === "complete" ? <Icons.Check /> : m.status === "in-progress" ? <Icons.Clock /> : <span style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--text-muted)", opacity: 0.4 }} />}
                </div>
                <span className="milestone-name" style={{ opacity: m.status === "pending" ? 0.5 : 1 }}>{m.name}</span>
                <span className="milestone-date">{m.date}</span>
              </div>
            ))}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 20, gridColumn: window.innerWidth < 768 ? "1 / -1" : undefined }}>
          <div className="card">
            <div className="section-header" style={{ marginTop: 0 }}>Payments</div>
            {projectPayments.length > 0 ? projectPayments.map((p, i) => {
              const pc = statusColors[p.status];
              const canPay = outstandingStatuses.includes(p.status);
              return (
                <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 0", borderBottom: i < projectPayments.length - 1 ? "1px solid rgba(39,39,42,0.4)" : "none", gap: 12, flexWrap: "wrap" }}>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 13, fontWeight: 500 }}>{p.description}</div>
                    <div style={{ fontSize: 11, color: "var(--text-muted)", marginTop: 2 }}>{p.date}</div>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <div style={{ textAlign: "right" }}>
                      <div className="amount" style={{ fontSize: 14 }}>{formatCurrency(p.amount)}</div>
                      <span className="status-badge" style={{ background: pc.bg, color: pc.text, fontSize: 10, padding: "2px 8px", marginTop: 4 }}>
                        {pc.label}
                      </span>
                    </div>
                    {canPay && (
                      <button
                        type="button"
                        className="btn-primary"
                        style={{ fontSize: 11, padding: "6px 12px", flexShrink: 0 }}
                        onClick={() => setPaymentModal(p)}
                      >
                        Pay
                      </button>
                    )}
                  </div>
                </div>
              );
            }) : <p style={{ color: "var(--text-muted)", fontSize: 13 }}>No payments yet.</p>}
            {paymentModal && (
              <PaymentModal
                invoice={paymentModal}
                onClose={() => setPaymentModal(null)}
                onSuccess={() => { markPaid(paymentModal.id); setPaymentModal(null); }}
              />
            )}
          </div>

          <div className="card">
            <div className="section-header" style={{ marginTop: 0 }}>Files</div>
            {(projectFiles || []).length > 0 ? (projectFiles || []).map((f, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 0", borderBottom: i < projectFiles.length - 1 ? "1px solid rgba(39,39,42,0.4)" : "none" }}>
                <div className="file-icon" style={{ background: `${fileTypeColors[f.type]}15`, color: fileTypeColors[f.type], width: 34, height: 34, fontSize: 9 }}>
                  {f.type.toUpperCase().slice(0, 3)}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 13, fontWeight: 500, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{f.name}</div>
                  <div style={{ fontSize: 11, color: "var(--text-muted)" }}>{f.size}</div>
                </div>
                <div className="file-download"><Icons.Download /></div>
              </div>
            )) : <p style={{ color: "var(--text-muted)", fontSize: 13 }}>No files yet.</p>}
          </div>
        </div>
      </div>

      <div className="card" style={{ marginTop: 20, gridColumn: "1 / -1" }}>
        <div className="section-header" style={{ marginTop: 0 }}>Messages</div>
        <p style={{ fontSize: 12, color: "var(--text-muted)", marginBottom: 12 }}>Conversation for this project</p>
        <div className="chat-messages" style={{ maxHeight: 320, minHeight: 200, marginBottom: 12 }}>
          {messages.map((msg) => (
            <div className={`message ${msg.isOwn ? "own" : ""}`} key={msg.id}>
              <div className="message-avatar">{msg.avatar}</div>
              <div>
                {!msg.isOwn && (
                  <div className="message-sender">
                    {msg.sender} <span>{msg.role}</span>
                  </div>
                )}
                <div className="message-body">
                  <div className="message-text">{msg.content}</div>
                  {(msg.fileId || msg.attachmentName) && (
                    <div style={{ marginTop: 6, fontSize: 12, display: "flex", alignItems: "center", gap: 6 }}>
                      <span style={{ opacity: 0.8 }}>📎</span>
                      <span style={{ color: "var(--accent)", fontWeight: 500 }}>{msg.attachmentName || "File"}</span>
                    </div>
                  )}
                </div>
                <div className="message-time">{msg.date} • {msg.time}</div>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        <div className="chat-input-area" style={{ marginBottom: 0 }}>
          <div className="chat-input-wrapper">
            <div style={{ position: "relative" }}>
              <button
                type="button"
                onClick={() => setAttachOpen(!attachOpen)}
                style={{ background: "none", border: "none", color: "var(--text-muted)", cursor: "pointer", padding: 4 }}
                title="Attach file"
              >
                <Icons.Attachment />
              </button>
              {attachOpen && (
                <div
                  style={{
                    position: "absolute",
                    bottom: "100%",
                    left: 0,
                    marginBottom: 6,
                    background: "var(--bg-card)",
                    border: "1px solid var(--border)",
                    borderRadius: 10,
                    padding: 8,
                    maxHeight: 180,
                    overflowY: "auto",
                    minWidth: 200,
                    zIndex: 20,
                  }}
                >
                  <div style={{ fontSize: 10, fontWeight: 600, color: "var(--text-muted)", marginBottom: 6 }}>Link to file</div>
                  {(projectFiles || []).length === 0 ? (
                    <div style={{ fontSize: 12, color: "var(--text-muted)" }}>No files in this project</div>
                  ) : (
                    (projectFiles || []).map((f) => (
                      <button
                        key={f.id}
                        type="button"
                        onClick={() => {
                          setAttachedFile({ id: f.id, name: f.name });
                          setAttachOpen(false);
                        }}
                        style={{
                          display: "block",
                          width: "100%",
                          textAlign: "left",
                          padding: "8px 10px",
                          fontSize: 12,
                          borderRadius: 8,
                          border: "none",
                          background: attachedFile?.id === f.id ? "var(--accent-bg)" : "transparent",
                          color: "var(--text-primary)",
                          cursor: "pointer",
                          fontFamily: "inherit",
                        }}
                      >
                        {f.name}
                      </button>
                    ))
                  )}
                </div>
              )}
            </div>
            {attachedFile && (
              <span style={{ fontSize: 11, color: "var(--accent)", display: "flex", alignItems: "center", gap: 4 }}>
                📎 {attachedFile.name}{" "}
                <button type="button" onClick={() => setAttachedFile(null)} style={{ background: "none", border: "none", color: "var(--text-muted)", cursor: "pointer", padding: "0 2px" }}>×</button>
              </span>
            )}
            <textarea
              className="chat-input"
              rows={1}
              placeholder="Type a message..."
              value={messageInput}
              onChange={(e) => setMessageInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  sendMessage();
                }
              }}
            />
            <button className="send-btn" onClick={sendMessage} disabled={!messageInput.trim()}>
              <Icons.Send />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Payment Modal (pay outstanding invoice) ──
function PaymentModal({ invoice, onClose, onSuccess }) {
  const [paying, setPaying] = useState(false);
  const [done, setDone] = useState(false);

  const handlePay = () => {
    setPaying(true);
    // Simulate redirect to Ozow / payment gateway; in production would redirect or open payment URL
    setTimeout(() => {
      onSuccess?.();
      setDone(true);
      setPaying(false);
      setTimeout(() => {
        onClose?.();
      }, 1400);
    }, 800);
  };

  if (!invoice) return null;
  const pc = statusColors[invoice.status];

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card payment-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>Pay Invoice</h3>
          <button type="button" className="modal-close" onClick={onClose} aria-label="Close">
            <Icons.Close />
          </button>
        </div>
        <div className="modal-body">
          {done ? (
            <div className="payment-success">
              <div className="payment-success-icon"><Icons.Check /></div>
              <p>Payment successful</p>
              <p style={{ fontSize: 12, color: "var(--text-muted)", marginTop: 4 }}>This invoice has been marked as paid.</p>
            </div>
          ) : (
            <>
              <div className="payment-summary">
                <div className="payment-row">
                  <span>Invoice</span>
                  <span style={{ fontFamily: "'Sora', sans-serif", fontWeight: 600 }}>{invoice.id}</span>
                </div>
                <div className="payment-row">
                  <span>Project</span>
                  <span>{invoice.project}</span>
                </div>
                <div className="payment-row">
                  <span>Description</span>
                  <span>{invoice.description}</span>
                </div>
                <div className="payment-row">
                  <span>Due</span>
                  <span>{invoice.date}</span>
                </div>
                <div className="payment-row amount-row">
                  <span>Amount</span>
                  <span className="amount">{formatCurrency(invoice.amount)}</span>
                </div>
              </div>
              <div className="modal-actions">
                <button type="button" className="btn-ghost" onClick={onClose} disabled={paying}>Cancel</button>
                <button type="button" className="btn-primary" onClick={handlePay} disabled={paying}>
                  {paying ? "Processing…" : "Pay with Ozow"}
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

// ── Payments Page ──
function PaymentsPage({ payments, setPayments }) {
  const [paymentModal, setPaymentModal] = useState(null);
  const list = payments ?? [];
  const totalPaid = list.filter((p) => p.status === "paid").reduce((s, p) => s + p.amount, 0);
  const totalPending = list.filter((p) => p.status === "pending").reduce((s, p) => s + p.amount, 0);
  const totalOverdue = list.filter((p) => p.status === "overdue").reduce((s, p) => s + p.amount, 0);

  const outstandingStatuses = ["pending", "overdue", "upcoming"];
  const markPaid = (invoiceId) => {
    if (!setPayments) return;
    setPayments((prev) =>
      prev.map((p) => (p.id === invoiceId ? { ...p, status: "paid", method: "Ozow" } : p))
    );
  };

  return (
    <div>
      <div className="stat-row">
        <div className="stat-card">
          <div className="stat-label">Total Paid</div>
          <div className="stat-value accent">{formatCurrency(totalPaid)}</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Pending</div>
          <div className="stat-value" style={{ color: "var(--warning)" }}>{formatCurrency(totalPending)}</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Overdue</div>
          <div className="stat-value danger">{formatCurrency(totalOverdue)}</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Total Invoices</div>
          <div className="stat-value">{list.length}</div>
        </div>
      </div>

      <div className="section-header">All Invoices</div>
      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>Invoice</th>
              <th>Project</th>
              <th>Description</th>
              <th>Amount</th>
              <th>Date</th>
              <th>Method</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {list.map((p, i) => {
              const pc = statusColors[p.status];
              const canPay = outstandingStatuses.includes(p.status);
              return (
                <tr key={i}>
                  <td style={{ fontFamily: "'Sora', sans-serif", fontWeight: 600, fontSize: 12, color: "var(--text-primary)" }}>{p.id}</td>
                  <td style={{ fontSize: 13 }}>{p.project}</td>
                  <td>{p.description}</td>
                  <td className="amount">{formatCurrency(p.amount)}</td>
                  <td>{p.date}</td>
                  <td>{p.method}</td>
                  <td>
                    <span className="status-badge" style={{ background: pc.bg, color: pc.text }}>
                      <span className="status-dot" style={{ background: pc.text }} />
                      {pc.label}
                    </span>
                  </td>
                  <td>
                    {canPay ? (
                      <button
                        type="button"
                        className="btn-primary"
                        style={{ fontSize: 11, padding: "6px 12px" }}
                        onClick={() => setPaymentModal(p)}
                      >
                        Pay
                      </button>
                    ) : (
                      <span style={{ fontSize: 11, color: "var(--text-muted)" }}>—</span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {paymentModal && (
        <PaymentModal
          invoice={paymentModal}
          onClose={() => setPaymentModal(null)}
          onSuccess={() => markPaid(paymentModal.id)}
        />
      )}
    </div>
  );
}

// ── Messages Page ──
function MessagesPage({ projects, messages = [], onSendMessage, files = [] }) {
  const clientProjectList = Array.isArray(projects) ? projects : [];
  const clientFiles = Array.isArray(files) ? files : [];
  const [input, setInput] = useState("");
  const [selectedProject, setSelectedProject] = useState(clientProjectList[0]?.id ?? "");
  const [attachedFile, setAttachedFile] = useState(null);
  const [attachOpen, setAttachOpen] = useState(false);
  const messagesEnd = useRef(null);

  useEffect(() => {
    messagesEnd.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = () => {
    if (!input.trim()) return;
    if (onSendMessage) {
      onSendMessage(input.trim(), attachedFile?.id);
      setInput("");
      setAttachedFile(null);
      return;
    }
    setInput("");
  };

  return (
    <div className="chat-container">
      <div style={{ display: "flex", gap: 10, marginBottom: 16, flexWrap: "wrap" }}>
        {clientProjectList.map((p) => (
          <button
            key={p.id}
            className={selectedProject === p.id ? "btn-primary" : "btn-ghost"}
            onClick={() => setSelectedProject(p.id)}
            style={{ fontSize: 11, padding: "8px 14px" }}
          >
            {p.id}: {p.name.split(" ").slice(0, 2).join(" ")}
          </button>
        ))}
      </div>

      <div className="chat-messages">
        {(messages || []).map((msg) => (
          <div className={`message ${msg.isOwn ? "own" : ""}`} key={msg.id || msg.date + msg.time}>
            <div className="message-avatar">{msg.avatar}</div>
            <div>
              <div className="message-body">
                {!msg.isOwn && (
                  <div className="message-sender">
                    {msg.sender} <span>{msg.role || ""}</span>
                  </div>
                )}
                <div className="message-text">{msg.content}</div>
                {(msg.fileId || msg.attachmentName) && (
                  <div style={{ marginTop: 6, fontSize: 12, display: "flex", alignItems: "center", gap: 6 }}>
                    <span style={{ opacity: 0.8 }}>📎</span>
                    <span style={{ color: "var(--accent)", fontWeight: 500 }}>{msg.attachmentName || "File"}</span>
                  </div>
                )}
              </div>
              <div className="message-time">{msg.date} • {msg.time}</div>
            </div>
          </div>
        ))}
        <div ref={messagesEnd} />
      </div>

      <div className="chat-input-area">
        <div className="chat-input-wrapper">
          <div style={{ position: "relative" }}>
            <button
              type="button"
              onClick={() => setAttachOpen(!attachOpen)}
              style={{ background: "none", border: "none", color: "var(--text-muted)", cursor: "pointer", padding: 4 }}
              title="Attach file"
            >
              <Icons.Attachment />
            </button>
            {attachOpen && (
              <div
                style={{
                  position: "absolute",
                  bottom: "100%",
                  left: 0,
                  marginBottom: 6,
                  background: "var(--bg-card)",
                  border: "1px solid var(--border)",
                  borderRadius: 10,
                  padding: 8,
                  maxHeight: 200,
                  overflowY: "auto",
                  minWidth: 200,
                  zIndex: 20,
                }}
              >
                <div style={{ fontSize: 10, fontWeight: 600, color: "var(--text-muted)", marginBottom: 6 }}>Link to file</div>
                {clientFiles.length === 0 ? (
                  <div style={{ fontSize: 12, color: "var(--text-muted)" }}>No files in your projects</div>
                ) : (
                  clientFiles.map((f) => (
                    <button
                      key={f.id}
                      type="button"
                      onClick={() => {
                        setAttachedFile({ id: f.id, name: f.name });
                        setAttachOpen(false);
                      }}
                      style={{
                        display: "block",
                        width: "100%",
                        textAlign: "left",
                        padding: "8px 10px",
                        fontSize: 12,
                        borderRadius: 8,
                        border: "none",
                        background: attachedFile?.id === f.id ? "var(--accent-bg)" : "transparent",
                        color: "var(--text-primary)",
                        cursor: "pointer",
                        fontFamily: "inherit",
                      }}
                    >
                      {f.name}
                    </button>
                  ))
                )}
              </div>
            )}
          </div>
          {attachedFile && (
            <span style={{ fontSize: 11, color: "var(--accent)", display: "flex", alignItems: "center", gap: 4 }}>
              📎 {attachedFile.name}{" "}
              <button type="button" onClick={() => setAttachedFile(null)} style={{ background: "none", border: "none", color: "var(--text-muted)", cursor: "pointer", padding: "0 2px" }}>
                ×
              </button>
            </span>
          )}
          <textarea
            className="chat-input"
            rows="1"
            placeholder="Type a message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                sendMessage();
              }
            }}
          />
          <button className="send-btn" onClick={sendMessage} disabled={!input.trim()}>
            <Icons.Send />
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Files Page ──
function FilesPage({ clientProjectNames, files = [], clientProjects = [], onUploadFiles }) {
  const [filter, setFilter] = useState("all");
  const [dragOver, setDragOver] = useState(false);
  const [uploadProjectId, setUploadProjectId] = useState("");
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const fileInputRef = useRef(null);
  const projectNames = Array.isArray(clientProjectNames) ? clientProjectNames : [];
  const projectsList = Array.isArray(clientProjects) ? clientProjects : [];
  const clientFiles = Array.isArray(files) ? files : [];
  const projects = ["all", ...projectNames];
  const filtered = filter === "all" ? clientFiles : clientFiles.filter((f) => f.project === filter);

  const processFiles = async (fileList) => {
    const proj = projectsList.find((p) => p.id === uploadProjectId);
    if (!proj || !fileList?.length) {
      if (!uploadProjectId) setUploadError("Select a project first");
      return;
    }
    setUploadError("");
    setUploading(true);
    try {
      if (onUploadFiles) await onUploadFiles(proj.id, proj.name, fileList);
    } catch (e) {
      setUploadError(e?.message || "Upload failed");
    } finally {
      setUploading(false);
    }
  };

  const onDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragOver(false);
    const list = e.dataTransfer?.files;
    if (list?.length) processFiles(Array.from(list));
  };
  const onDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragOver(true);
  };
  const onDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragOver(false);
  };
  const onBrowseClick = () => {
    if (!uploadProjectId) {
      setUploadError("Select a project first");
      return;
    }
    fileInputRef.current?.click();
  };
  const onFileInputChange = (e) => {
    const list = e.target?.files;
    if (list?.length) processFiles(Array.from(list));
    e.target.value = "";
  };

  return (
    <div>
      {projectsList.length > 0 && (
        <div style={{ marginBottom: 16 }}>
          <label style={{ display: "block", fontSize: 11, fontWeight: 600, color: "var(--text-muted)", marginBottom: 6 }}>
            Upload to project
          </label>
          <select
            value={uploadProjectId}
            onChange={(e) => { setUploadProjectId(e.target.value); setUploadError(""); }}
            style={{
              width: "100%",
              maxWidth: 280,
              padding: "10px 14px",
              background: "var(--bg-secondary)",
              border: "1px solid var(--border)",
              borderRadius: 10,
              color: "var(--text-primary)",
              fontSize: 13,
              fontFamily: "inherit",
            }}
          >
            <option value="">Select project</option>
            {projectsList.map((p) => (
              <option key={p.id} value={p.id}>{p.name}</option>
            ))}
          </select>
          <div
            className="upload-zone"
            onDragOver={onDragOver}
            onDragLeave={onDragLeave}
            onDrop={onDrop}
            onClick={onBrowseClick}
            style={{
              marginTop: 12,
              borderColor: dragOver ? "var(--accent)" : undefined,
              background: dragOver ? "var(--accent-bg)" : undefined,
            }}
          >
            <input ref={fileInputRef} type="file" multiple style={{ display: "none" }} onChange={onFileInputChange} />
            <Icons.Upload />
            <p>
              Drag & drop files here, or <span>browse</span>
            </p>
            <p style={{ fontSize: 11, marginTop: 4 }}>PDF, PNG, JPG, ZIP, DOCX — metadata saved to project</p>
            {uploading && <p style={{ fontSize: 12, color: "var(--accent)", marginTop: 8 }}>Adding…</p>}
          </div>
          {uploadError && <p style={{ color: "var(--danger)", fontSize: 12, marginTop: 8 }}>{uploadError}</p>}
        </div>
      )}

      <div style={{ display: "flex", gap: 8, marginBottom: 20, flexWrap: "wrap" }}>
        {projects.map((p) => (
          <button
            key={p}
            className={filter === p ? "btn-primary" : "btn-ghost"}
            onClick={() => setFilter(p)}
            style={{ fontSize: 11, padding: "7px 14px", textTransform: p === "all" ? "capitalize" : "none" }}
          >
            {p === "all" ? "All Files" : p}
          </button>
        ))}
      </div>

      <div className="file-grid">
        {filtered.map((f) => (
          <div className="file-card" key={f.id}>
            <div className="file-icon" style={{ background: `${fileTypeColors[f.type]}15`, color: fileTypeColors[f.type] }}>
              {f.type.toUpperCase().slice(0, 3)}
            </div>
            <div className="file-info">
              <div className="file-name">{f.name}</div>
              <div className="file-meta">
                {f.size} • {f.uploadedBy} • {f.date}
              </div>
            </div>
            <div className="file-download">
              <Icons.Download />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Normalize API project to portal shape (milestones: { name, status, date })
function normalizeProject(p) {
  const raw = p.milestones || p.ms || [];
  const milestones = raw.map((m) => ({
    name: m.n ?? m.name,
    status: m.s ?? m.status,
    date: m.d ?? m.date,
  }));
  return {
    ...p,
    startDate: p.startDate || p.deadline,
    milestones,
  };
}

// ── Main App ──
export default function ZoneBrozPortal() {
  const [session, setSession] = useState(null);
  const [currentClient, setCurrentClient] = useState(null);
  const [clientProjects, setClientProjects] = useState([]);
  const [projectsLoadError, setProjectsLoadError] = useState(null);
  const [activePage, setActivePage] = useState("projects");
  const [selectedProject, setSelectedProject] = useState(null);
  const [favoriteProjectId, setFavoriteProjectId] = useState(null);
  const hasAutoSelectedFavorite = useRef(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [payments, setPayments] = useState([]);
  const [files, setFiles] = useState([]);
  const [conversationMessages, setConversationMessages] = useState([]);
  const [conversationId, setConversationId] = useState(null);
  const [developers, setDevelopers] = useState([]);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session: s } }) => setSession(s));
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, s) => setSession(s));
    return () => subscription.unsubscribe();
  }, []);

  // When session exists, fetch client (by email) and projects
  useEffect(() => {
    if (!session?.user?.email) {
      setCurrentClient(null);
      setClientProjects([]);
      setProjectsLoadError(session ? "No email on account." : null);
      return;
    }
    setProjectsLoadError(null);
    supabase
      .from("clients")
      .select("*")
      .eq("email", session.user.email)
      .maybeSingle()
      .then(({ data: clientRow, error: clientErr }) => {
        if (clientErr) {
          setProjectsLoadError(clientErr.message);
          return;
        }
        if (!clientRow) {
          // #region agent log
          fetch('http://127.0.0.1:7242/ingest/3b23f6c4-91e4-41e3-9f69-29c338b6fa41',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'zonebrozstudios-client-portal.jsx:clientResolve',message:'Client resolve failed',data:{error:'No client account'},hypothesisId:'H2',timestamp:Date.now()})}).catch(()=>{});
          // #endregion
          setCurrentClient(null);
          setClientProjects([]);
          setProjectsLoadError("No client account found for this email.");
          return;
        }
        setCurrentClient({
          id: clientRow.id,
          name: clientRow.name,
          contactName: clientRow.contact,
          email: clientRow.email,
          avatar_url: clientRow.avatar_url || null,
        });
        return supabase
          .from("projects")
          .select("*")
          .eq("client_id", clientRow.id)
          .order("created_at", { ascending: false });
      })
      .then(async (projectsRes) => {
        if (!projectsRes) return;
        const { data: list, error } = projectsRes;
        if (error) {
          // #region agent log
          fetch('http://127.0.0.1:7242/ingest/3b23f6c4-91e4-41e3-9f69-29c338b6fa41',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'zonebrozstudios-client-portal.jsx:clientResolve',message:'Projects load error',data:{error:error?.message},hypothesisId:'H2',timestamp:Date.now()})}).catch(()=>{});
          // #endregion
          setProjectsLoadError(error.message);
          return;
        }
        const projectsList = (list || []).map(normalizeProject);
        setClientProjects(projectsList);
        // #region agent log
        fetch('http://127.0.0.1:7242/ingest/3b23f6c4-91e4-41e3-9f69-29c338b6fa41',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'zonebrozstudios-client-portal.jsx:clientResolve',message:'Client and projects loaded',data:{projectsCount:projectsList.length},hypothesisId:'H2',timestamp:Date.now()})}).catch(()=>{});
        // #endregion
        const clientRow = await supabase.from("clients").select("id").eq("email", session.user.email).maybeSingle().then((r) => r.data);
        if (!clientRow?.id) return;
        const projectIds = projectsList.map((p) => p.id);
        const [payRes, filesRes, convoRes, devRes] = await Promise.all([
          projectIds.length ? supabase.from("payments").select("*, projects(name)").in("project_id", projectIds).order("created_at", { ascending: false }) : { data: [], error: null },
          projectIds.length ? supabase.from("files").select("*, projects(name)").in("project_id", projectIds).order("created_at", { ascending: false }) : { data: [], error: null },
          supabase.from("conversations").select("id").eq("client_id", clientRow.id).maybeSingle(),
          supabase.from("developers").select("id,name,role,avatar_url").order("created_at", { ascending: false }),
        ]);
        if (!devRes.error && devRes.data) setDevelopers(devRes.data);
        else setDevelopers([]);
        if (!payRes.error && payRes.data) {
          setPayments(
            payRes.data.map((p) => ({
              id: p.id,
              project: p.projects?.name ?? "",
              amount: Number(p.amount) || 0,
              status: p.status || "pending",
              due: p.due_date ? p.due_date.slice(0, 10) : "",
              description: p.description || "",
              date: p.due_date ? p.due_date.slice(0, 10) : "",
            }))
          );
        }
        if (!filesRes.error && filesRes.data) {
          setFiles(
            filesRes.data.map((f) => ({
              id: f.id,
              project: f.projects?.name ?? "",
              name: f.name,
              type: (f.type || "doc").toLowerCase(),
              size: f.size_text || "-",
              uploadedBy: f.uploaded_by || "-",
              date: f.created_at ? f.created_at.slice(0, 10) : "",
            }))
          );
        }
        if (!convoRes.error && convoRes.data?.id) {
          setConversationId(convoRes.data.id);
          const { data: msgs } = await supabase.from("messages").select("*, files(name)").eq("conversation_id", convoRes.data.id).order("created_at", { ascending: true });
          setConversationMessages(
            (msgs || []).map((m) => {
              const d = m.created_at ? new Date(m.created_at) : new Date();
              return {
                id: m.id,
                sender: m.sender_name || "-",
                avatar: (m.sender_name || "?").split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase(),
                time: d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
                date: d.toLocaleDateString(),
                content: m.text || "",
                isOwn: !!m.is_from_client,
                fileId: m.file_id || null,
                attachmentName: m.files?.name || null,
              };
            })
          );
        } else {
          setConversationId(null);
          setConversationMessages([]);
        }
      });
  }, [session]);

  const FAVORITE_STORAGE_KEY = "zbs_client_favorite_project";
  const setFavorite = (projectId) => {
    if (!currentClient?.id) return;
    const next = projectId || null;
    setFavoriteProjectId(next);
    try {
      if (next) localStorage.setItem(`${FAVORITE_STORAGE_KEY}_${currentClient.id}`, next);
      else localStorage.removeItem(`${FAVORITE_STORAGE_KEY}_${currentClient.id}`);
    } catch (_) {}
  };

  useEffect(() => {
    if (!currentClient?.id || !clientProjects.length) return;
    try {
      const stored = localStorage.getItem(`${FAVORITE_STORAGE_KEY}_${currentClient.id}`);
      const id = stored || null;
      setFavoriteProjectId(id);
      const proj = id ? clientProjects.find((p) => p.id === id) : null;
      if (proj && !hasAutoSelectedFavorite.current) {
        setSelectedProject(proj);
        hasAutoSelectedFavorite.current = true;
      }
    } catch (_) {}
  }, [currentClient?.id, clientProjects]);

  const loggedIn = !!session && !!currentClient;

  const clientProjectNames = clientProjects.map((p) => p.name);
  const clientPayments = payments.filter((p) => clientProjectNames.includes(p.project));

  const [viewedTabs, setViewedTabs] = useState(() => {
    try { return new Set(JSON.parse(localStorage.getItem("zbs_client_viewed_tabs") || "[]")); } catch { return new Set(); }
  });
  const overdueCount = clientPayments.filter((p) => p.status === "overdue").length;
  const unreadMessagesCount = conversationMessages.filter((m) => !m.isOwn).length;
  const navItems = [
    { id: "projects", label: "Projects", icon: Icons.Projects },
    { id: "payments", label: "Payments", icon: Icons.Payments, badge: viewedTabs.has("payments") ? 0 : overdueCount },
    { id: "messages", label: "Messages", icon: Icons.Messages, badge: viewedTabs.has("messages") ? 0 : unreadMessagesCount },
    { id: "files", label: "Files", icon: Icons.Files },
  ];

  const pageTitle = {
    projects: selectedProject ? selectedProject.name : "Projects",
    payments: "Payments & Invoices",
    messages: "Messages",
    files: "Files & Deliverables",
  };

  const navigate = (page) => {
    // #region agent log
    fetch('http://127.0.0.1:7242/ingest/3b23f6c4-91e4-41e3-9f69-29c338b6fa41',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'zonebrozstudios-client-portal.jsx:navigate',message:'Client page change',data:{page},hypothesisId:'H4',timestamp:Date.now()})}).catch(()=>{});
    // #endregion
    setActivePage(page);
    setSelectedProject(null);
    setSidebarOpen(false);
    setViewedTabs((prev) => {
      const next = new Set(prev);
      next.add(page);
      try { localStorage.setItem("zbs_client_viewed_tabs", JSON.stringify([...next])); } catch (_) {}
      return next;
    });
  };

  const handleLogout = () => {
    supabase.auth.signOut();
    setCurrentClient(null);
    setClientProjects([]);
    setPayments([]);
    setFiles([]);
    setConversationMessages([]);
    setConversationId(null);
    setDevelopers([]);
    hasAutoSelectedFavorite.current = false;
  };

  const handleSendMessage = async (text, fileId = null) => {
    if (!currentClient || !text.trim()) return;
    // #region agent log
    fetch('http://127.0.0.1:7242/ingest/3b23f6c4-91e4-41e3-9f69-29c338b6fa41',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'zonebrozstudios-client-portal.jsx:handleSendMessage',message:'Send message entry',data:{hasConvoId:!!conversationId},hypothesisId:'H5',timestamp:Date.now()})}).catch(()=>{});
    // #endregion
    try {
    let cid = conversationId;
    if (!cid) {
      const { data: newConvo, error: ec } = await supabase.from("conversations").insert({ client_id: currentClient.id }).select("id").single();
      if (ec) throw ec;
      cid = newConvo.id;
      setConversationId(cid);
    }
    const payload = {
      conversation_id: cid,
      sender_name: currentClient.contactName || currentClient.name || "Client",
      text: text.trim(),
      is_from_client: true,
    };
    if (fileId) payload.file_id = fileId;
    const { data: newMsg, error: em } = await supabase.from("messages").insert(payload).select("*, files(name)").single();
    if (em) throw em;
    const d = new Date();
    const senderName = currentClient.contactName || currentClient.name || "You";
    const newRow = {
      id: newMsg?.id || d.getTime(),
      sender: senderName,
      avatar: senderName.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase(),
      time: d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      date: d.toLocaleDateString(),
      content: text.trim(),
      isOwn: true,
    };
    if (newMsg?.file_id) newRow.fileId = newMsg.file_id; newRow.attachmentName = newMsg.files?.name || null;
    setConversationMessages((prev) => [...prev, newRow]);
    // #region agent log
    fetch('http://127.0.0.1:7242/ingest/3b23f6c4-91e4-41e3-9f69-29c338b6fa41',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'zonebrozstudios-client-portal.jsx:handleSendMessage',message:'Send message success',data:{msgId:newMsg?.id},hypothesisId:'H5',timestamp:Date.now()})}).catch(()=>{});
    // #endregion
    } catch (e) {
      // #region agent log
      fetch('http://127.0.0.1:7242/ingest/3b23f6c4-91e4-41e3-9f69-29c338b6fa41',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'zonebrozstudios-client-portal.jsx:handleSendMessage',message:'Send message error',data:{error:String(e?.message||e)},hypothesisId:'H5',timestamp:Date.now()})}).catch(()=>{});
      // #endregion
      throw e;
    }
  };

  const PORTAL_FILES_BUCKET = "portal-files";
  const handleClientUpload = async (projectId, projectName, fileList) => {
    if (!currentClient || !fileList?.length) return;
    // #region agent log
    fetch('http://127.0.0.1:7242/ingest/3b23f6c4-91e4-41e3-9f69-29c338b6fa41',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'zonebrozstudios-client-portal.jsx:handleClientUpload',message:'Client upload entry',data:{projectId,fileCount:fileList?.length},hypothesisId:'H5',timestamp:Date.now()})}).catch(()=>{});
    // #endregion
    const uploadedBy = currentClient.contactName || currentClient.name || "Client";
    try {
    for (let i = 0; i < fileList.length; i++) {
      const file = fileList[i];
      const name = file.name || "Unnamed";
      const type = fileTypeFromExt(name);
      const sizeText = formatFileSize(file.size);
      const safeName = name.replace(/[/\\]/g, "_");
      const storagePath = `${projectId}/${crypto.randomUUID()}_${safeName}`;
      const { error: uploadErr } = await supabase.storage.from(PORTAL_FILES_BUCKET).upload(storagePath, file, { upsert: false });
      if (uploadErr) throw uploadErr;
      const { data, error } = await supabase
        .from("files")
        .insert({
          project_id: projectId,
          name,
          type,
          size_text: sizeText,
          uploaded_by: uploadedBy,
          storage_path: storagePath,
        })
        .select("*, projects(name)")
        .single();
      if (error) throw error;
      setFiles((prev) => [
        ...prev,
        {
          id: data.id,
          project: data.projects?.name ?? projectName,
          name: data.name,
          type: (data.type || "doc").toLowerCase(),
          size: data.size_text || "-",
          uploadedBy: data.uploaded_by || "-",
          date: data.created_at ? data.created_at.slice(0, 10) : "",
        },
      ]);
    }
    // #region agent log
    fetch('http://127.0.0.1:7242/ingest/3b23f6c4-91e4-41e3-9f69-29c338b6fa41',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'zonebrozstudios-client-portal.jsx:handleClientUpload',message:'Client upload success',data:{count:fileList.length},hypothesisId:'H5',timestamp:Date.now()})}).catch(()=>{});
    // #endregion
    } catch (e) {
      // #region agent log
      fetch('http://127.0.0.1:7242/ingest/3b23f6c4-91e4-41e3-9f69-29c338b6fa41',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'zonebrozstudios-client-portal.jsx:handleClientUpload',message:'Client upload error',data:{error:String(e?.message||e)},hypothesisId:'H5',timestamp:Date.now()})}).catch(()=>{});
      // #endregion
      throw e;
    }
  };

  if (!session) {
    return (
      <>
        <style>{STYLES}</style>
        <LoginScreen />
      </>
    );
  }
  if (session && !currentClient && !projectsLoadError) {
    return (
      <>
        <style>{STYLES}</style>
        <div className="login-page">
          <div className="login-bg-pattern" />
          <div className="login-card">
            <div className="login-logo">ZONEBROZ</div>
            <div className="login-logo-sub">CLIENT PORTAL</div>
            <p className="login-subtitle">Loading your account…</p>
          </div>
        </div>
      </>
    );
  }
  if (session && !currentClient) {
    return (
      <>
        <style>{STYLES}</style>
        <div className="login-page">
          <div className="login-bg-pattern" />
          <div className="login-card">
            <div className="login-logo">ZONEBROZ</div>
            <div className="login-logo-sub">CLIENT PORTAL</div>
            <p className="login-subtitle">No client account found for this email. Please sign out and use the email linked to your client account.</p>
            <button className="login-btn" onClick={handleLogout} style={{ marginTop: 16 }}>Sign out</button>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <style>{STYLES}</style>
      <div className="portal-container">
        {sidebarOpen && <div className="sidebar-overlay" onClick={() => setSidebarOpen(false)} />}

        <aside className={`sidebar ${sidebarOpen ? "open" : ""}`}>
          <div className="sidebar-logo">
            <h1>ZONEBROZ</h1>
            <span>CLIENT PORTAL</span>
          </div>

          <div className="sidebar-label">Navigation</div>
          <nav className="sidebar-nav">
            {navItems.map((item) => (
              <div
                key={item.id}
                className={`nav-item ${activePage === item.id ? "active" : ""}`}
                onClick={() => navigate(item.id)}
              >
                <item.icon />
                {item.label}
                {item.badge != null && item.badge > 0 && <span className="nav-badge">{item.badge}</span>}
              </div>
            ))}
          </nav>

          <div className="sidebar-footer">
            <div
              className="nav-item"
              onClick={handleLogout}
              style={{ color: "var(--text-muted)" }}
            >
              <Icons.Logout /> Sign Out
            </div>
            <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: 1.2, textTransform: "uppercase", color: "var(--text-muted)", marginBottom: 6 }}>
              Account
            </div>
            <div style={{ fontSize: 11, color: "var(--text-muted)", marginBottom: 4 }}>
              Logged in as
            </div>
            <div style={{ fontSize: 13, fontWeight: 600, color: "var(--text-primary)", marginBottom: 10 }}>
              {currentClient && currentClient.name}
            </div>
            <div className="user-info" style={{ position: "relative" }}>
              <div style={{ flexShrink: 0 }}>
                {currentClient?.avatar_url ? (
                  <img src={currentClient.avatar_url} alt="" className="user-avatar" style={{ width: 44, height: 44, borderRadius: "50%", objectFit: "cover" }} />
                ) : (
                  <div className="user-avatar" style={{ width: 44, height: 44, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 700 }}>
                    {currentClient && (currentClient.contactName || "?").split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase()}
                  </div>
                )}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div className="user-name">{currentClient && currentClient.contactName}</div>
                <div className="user-email">{currentClient && currentClient.email}</div>
              </div>
            </div>
          </div>
        </aside>

        <main className="main-content">
          <header className="topbar">
            <div style={{ display: "flex", alignItems: "center", gap: 14, flexWrap: "wrap" }}>
              <button className="mobile-menu-btn" onClick={() => setSidebarOpen(!sidebarOpen)}>
                {sidebarOpen ? <Icons.Close /> : <Icons.Menu />}
              </button>
              <h2>{pageTitle[activePage]}</h2>
              {activePage === "projects" && clientProjects.length > 0 && (
                <>
                  <select
                    className="project-switcher"
                    value={selectedProject?.id ?? ""}
                    onChange={(e) => {
                      const id = e.target.value;
                      if (!id) setSelectedProject(null);
                      else setSelectedProject(clientProjects.find((p) => p.id === id) || null);
                    }}
                    style={{
                      marginLeft: 8,
                      padding: "8px 28px 8px 12px",
                      fontSize: 13,
                      background: "var(--bg-secondary)",
                      border: "1px solid var(--border)",
                      borderRadius: 10,
                      color: "var(--text-primary)",
                      cursor: "pointer",
                      fontFamily: "inherit",
                      minWidth: 200,
                    }}
                  >
                    <option value="">Select project...</option>
                    {clientProjects.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.name}
                      </option>
                    ))}
                  </select>
                  {selectedProject && (
                    <button
                      type="button"
                      onClick={() => setFavorite(selectedProject.id === favoriteProjectId ? null : selectedProject.id)}
                      style={{
                        marginLeft: 6,
                        padding: 8,
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        color: selectedProject.id === favoriteProjectId ? "var(--accent)" : "var(--text-muted)",
                      }}
                      title={selectedProject.id === favoriteProjectId ? "Unfavorite project" : "Favorite this project"}
                    >
                      {selectedProject.id === favoriteProjectId ? <Icons.StarFilled /> : <Icons.Star />}
                    </button>
                  )}
                </>
              )}
            </div>
            <div className="topbar-right">
              <a href="https://zonebrozstudios.com" target="_blank" rel="noopener noreferrer" className="btn-ghost" style={{ fontSize: 11, padding: "8px 14px" }}>
                Visit Website ↗
              </a>
            </div>
          </header>

          <div className="page-content">
            {projectsLoadError && <p style={{ color: "var(--danger)", marginBottom: 16 }}>{projectsLoadError}</p>}
            {activePage === "projects" && !selectedProject && (
              <ProjectsPage
                onSelectProject={(p) => setSelectedProject(p)}
                projects={clientProjects}
                favoriteProjectId={favoriteProjectId}
                onSetFavorite={setFavorite}
              />
            )}
            {activePage === "projects" && selectedProject && (
              <ProjectDetail
                project={selectedProject}
                onBack={() => setSelectedProject(null)}
                payments={clientPayments}
                setPayments={setPayments}
                projectFiles={files.filter((f) => f.project === selectedProject.name)}
                messages={conversationMessages}
                onSendMessage={handleSendMessage}
                developers={developers}
              />
            )}
            {activePage === "payments" && <PaymentsPage payments={clientPayments} setPayments={setPayments} />}
            {activePage === "messages" && (
              <MessagesPage
                projects={clientProjects}
                messages={conversationMessages}
                onSendMessage={handleSendMessage}
                files={files}
              />
            )}
            {activePage === "files" && (
              <FilesPage
                clientProjectNames={clientProjectNames}
                files={files}
                clientProjects={clientProjects}
                onUploadFiles={handleClientUpload}
              />
            )}
          </div>
        </main>
      </div>
    </>
  );
}
