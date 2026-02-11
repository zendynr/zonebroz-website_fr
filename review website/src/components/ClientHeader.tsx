import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";
import { usePrint } from "../context/PrintContext";
import { FileText, LogOut } from "lucide-react";

export default function ClientHeader() {
  const navigate = useNavigate();
  const { logout } = useUser();
  const { isPrintMode } = usePrint();

  const handleLogout = () => {
    logout();
    navigate("/client/login");
  };

  if (isPrintMode) return null;

  return (
    <header
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        background: "#1a3a2e",
        color: "white",
        padding: "0 2rem",
        height: "3.5rem",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        zIndex: 1000,
        boxShadow: "0 1px 3px rgba(0,0,0,0.15)",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
        <FileText size={20} style={{ opacity: 0.7 }} />
        <h1
          style={{
            fontSize: "var(--text-md)",
            fontWeight: 600,
            color: "white",
            letterSpacing: "var(--tracking-tight)",
          }}
        >
          Your Product Audit Report
        </h1>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
        <button
          onClick={() => navigate("/client/report")}
          style={{
            padding: "0.4rem 0.75rem",
            background: "rgba(255,255,255,0.1)",
            border: "none",
            borderRadius: "var(--radius-sm)",
            cursor: "pointer",
            fontSize: "var(--text-sm)",
            color: "rgba(255,255,255,0.85)",
            fontWeight: 500,
            transition: "background var(--duration-fast) ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "rgba(255,255,255,0.15)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "rgba(255,255,255,0.1)";
          }}
        >
          My Reports
        </button>
        <button
          onClick={handleLogout}
          style={{
            padding: "0.4rem 0.75rem",
            background: "transparent",
            border: "1px solid rgba(255,255,255,0.12)",
            borderRadius: "var(--radius-sm)",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "0.4rem",
            fontSize: "var(--text-sm)",
            color: "rgba(255,255,255,0.7)",
            transition: "all var(--duration-fast) ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "rgba(255,255,255,0.08)";
            e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "transparent";
            e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)";
          }}
          title="Logout"
        >
          <LogOut size={15} />
          Logout
        </button>
      </div>
    </header>
  );
}
