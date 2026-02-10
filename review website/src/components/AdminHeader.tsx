import { useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";
import { useUser } from "../context/UserContext";
import { usePrint } from "../context/PrintContext";

interface AdminHeaderProps {}

export default function AdminHeader({}: AdminHeaderProps) {
  const navigate = useNavigate();
  const { logout } = useUser();
  const { isPrintMode } = usePrint();

  const handleLogout = () => {
    logout();
    navigate("/admin/login");
  };

  if (isPrintMode) return null;

  return (
    <>
      <header
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          background: "#1e40af",
          color: "white",
          padding: "1rem 2rem",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          zIndex: 1000,
          boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "1.5rem" }}>
          <h1
            style={{
              fontSize: "1.5rem",
              fontWeight: "bold",
              color: "white",
              cursor: "pointer",
            }}
            onClick={() => navigate("/admin/reports")}
          >
            Product Review Platform
          </h1>
          <div
            style={{
              background: "rgba(255,255,255,0.2)",
              padding: "0.25rem 0.75rem",
              borderRadius: "0.5rem",
              fontSize: "0.875rem",
              fontWeight: "bold",
            }}
          >
            ADMIN AREA
          </div>
          <nav style={{ display: "flex", gap: "0.5rem", marginLeft: "1rem" }}>
            <button
              onClick={() => navigate("/admin/reports")}
              style={{
                padding: "0.5rem 1rem",
                background: "rgba(255,255,255,0.1)",
                border: "none",
                borderRadius: "0.5rem",
                cursor: "pointer",
                fontSize: "0.875rem",
                color: "white",
                fontWeight: "500",
              }}
            >
              Reports
            </button>
            <button
              onClick={() => navigate("/admin/clients")}
              style={{
                padding: "0.5rem 1rem",
                background: "rgba(255,255,255,0.1)",
                border: "none",
                borderRadius: "0.5rem",
                cursor: "pointer",
                fontSize: "0.875rem",
                color: "white",
                fontWeight: "500",
              }}
            >
              Clients
            </button>
          </nav>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <button
            onClick={handleLogout}
            style={{
              padding: "0.5rem 1rem",
              background: "rgba(255,255,255,0.1)",
              border: "none",
              borderRadius: "0.5rem",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              fontSize: "0.875rem",
              color: "white",
            }}
            title="Logout"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </header>
    </>
  );
}
