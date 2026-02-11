import { useNavigate, useLocation } from "react-router-dom";
import { LogOut } from "lucide-react";
import { useUser } from "../context/UserContext";
import { usePrint } from "../context/PrintContext";

interface AdminHeaderProps {}

export default function AdminHeader({}: AdminHeaderProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useUser();
  const { isPrintMode } = usePrint();

  const handleLogout = () => {
    logout();
    navigate("/admin/login");
  };

  if (isPrintMode) return null;

  const isActive = (path: string) => location.pathname.startsWith(path);

  const navButtonStyle = (active: boolean): React.CSSProperties => ({
    padding: "0.45rem 0.875rem",
    background: active ? "rgba(255,255,255,0.15)" : "transparent",
    border: "none",
    borderRadius: "var(--radius-sm)",
    cursor: "pointer",
    fontSize: "var(--text-sm)",
    color: active ? "white" : "rgba(255,255,255,0.7)",
    fontWeight: active ? 600 : 450,
    transition: "all var(--duration-fast) ease",
  });

  return (
    <>
      <header
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          background: "#2d3250",
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
        <div style={{ display: "flex", alignItems: "center", gap: "1.25rem" }}>
          <h1
            style={{
              fontSize: "var(--text-md)",
              fontWeight: 600,
              color: "white",
              cursor: "pointer",
              letterSpacing: "var(--tracking-tight)",
            }}
            onClick={() => navigate("/admin/reports")}
          >
            Product Review Platform
          </h1>
          <span
            style={{
              background: "rgba(255,255,255,0.1)",
              padding: "0.15rem 0.55rem",
              borderRadius: "var(--radius-full)",
              fontSize: "var(--text-xs)",
              fontWeight: 600,
              letterSpacing: "var(--tracking-wider)",
              color: "rgba(255,255,255,0.6)",
              textTransform: "uppercase",
            }}
          >
            Admin
          </span>
          <nav style={{ display: "flex", gap: "0.25rem", marginLeft: "0.5rem" }}>
            <button
              onClick={() => navigate("/admin/reports")}
              style={navButtonStyle(isActive("/admin/reports"))}
              onMouseEnter={(e) => {
                if (!isActive("/admin/reports")) e.currentTarget.style.background = "rgba(255,255,255,0.08)";
              }}
              onMouseLeave={(e) => {
                if (!isActive("/admin/reports")) e.currentTarget.style.background = "transparent";
              }}
            >
              Reports
            </button>
            <button
              onClick={() => navigate("/admin/clients")}
              style={navButtonStyle(isActive("/admin/clients"))}
              onMouseEnter={(e) => {
                if (!isActive("/admin/clients")) e.currentTarget.style.background = "rgba(255,255,255,0.08)";
              }}
              onMouseLeave={(e) => {
                if (!isActive("/admin/clients")) e.currentTarget.style.background = "transparent";
              }}
            >
              Clients
            </button>
          </nav>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
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
    </>
  );
}
