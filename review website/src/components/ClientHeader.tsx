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
        background: "#10b981",
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
        <FileText size={24} />
        <h1
          style={{
            fontSize: "1.5rem",
            fontWeight: "bold",
            color: "white",
          }}
        >
          Your Product Audit Report
        </h1>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
        <button
          onClick={() => navigate("/client/report")}
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
          My Reports
        </button>
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
  );
}
