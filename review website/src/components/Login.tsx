import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useUser } from "../context/UserContext";
import { Shield, Mail, Lock } from "lucide-react";

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useUser();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const isClientLogin = location.pathname.startsWith("/client/login");
  const isAdminLogin = location.pathname.startsWith("/admin/login");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email.trim()) { setError("Please enter an email address"); return; }
    if (!password.trim()) { setError("Please enter a password"); return; }

    setLoading(true);

    const role = isClientLogin ? "client" : "admin";
    const { error: loginError } = await login(email.trim(), password, role);

    if (loginError) {
      setError(loginError.message || "Invalid email or password");
      setLoading(false);
      return;
    }

    if (isClientLogin) {
      navigate("/client/report", { replace: true });
    } else {
      navigate("/admin/reports", { replace: true });
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(160deg, #2d3250 0%, #3b2f5c 40%, #4a3568 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem",
      }}
    >
      <div
        style={{
          background: "var(--surface-raised)",
          borderRadius: "var(--radius-xl)",
          padding: "2.75rem 2.5rem",
          boxShadow: "var(--shadow-xl)",
          maxWidth: "420px",
          width: "100%",
          border: "1px solid var(--border-subtle)",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              width: "56px",
              height: "56px",
              background: "var(--accent-primary-soft)",
              borderRadius: "var(--radius-md)",
              marginBottom: "1rem",
            }}
          >
            <Shield size={28} style={{ color: "var(--accent-primary)" }} />
          </div>
          <h1
            style={{
              fontSize: "var(--text-2xl)",
              fontWeight: 700,
              color: "var(--text-primary)",
              marginBottom: "0.375rem",
              letterSpacing: "var(--tracking-tight)",
            }}
          >
            Product Review Platform
          </h1>
          <p style={{ color: "var(--text-muted)", fontSize: "var(--text-base)" }}>
            {isClientLogin
              ? "Sign in to view your report"
              : isAdminLogin
              ? "Sign in to admin dashboard"
              : "Sign in to access your reports"}
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "1.25rem" }}>
            <label
              style={{
                display: "block",
                marginBottom: "0.4rem",
                fontSize: "var(--text-sm)",
                fontWeight: 600,
                color: "var(--text-secondary)",
              }}
            >
              Email Address
            </label>
            <div style={{ position: "relative" }}>
              <Mail
                size={18}
                style={{
                  position: "absolute",
                  left: "0.875rem",
                  top: "50%",
                  transform: "translateY(-50%)",
                  color: "var(--text-muted)",
                }}
              />
              <input
                type="email"
                value={email}
                onChange={(e) => { setEmail(e.target.value); setError(""); }}
                placeholder="your.email@example.com"
                required
                style={{
                  width: "100%",
                  padding: "0.7rem 0.75rem 0.7rem 2.75rem",
                  border: error ? `1.5px solid var(--accent-danger)` : `1.5px solid var(--border-strong)`,
                  borderRadius: "var(--radius-sm)",
                  fontSize: "var(--text-base)",
                  outline: "none",
                  transition: "border-color var(--duration-fast) ease, box-shadow var(--duration-fast) ease",
                  background: "var(--surface-raised)",
                  color: "var(--text-primary)",
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = "var(--accent-primary)";
                  e.currentTarget.style.boxShadow = "0 0 0 3px var(--accent-primary-soft)";
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = error ? "var(--accent-danger)" : "var(--border-strong)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              />
            </div>
          </div>

          <div style={{ marginBottom: "1.5rem" }}>
            <label
              style={{
                display: "block",
                marginBottom: "0.4rem",
                fontSize: "var(--text-sm)",
                fontWeight: 600,
                color: "var(--text-secondary)",
              }}
            >
              Password
            </label>
            <div style={{ position: "relative" }}>
              <Lock
                size={18}
                style={{
                  position: "absolute",
                  left: "0.875rem",
                  top: "50%",
                  transform: "translateY(-50%)",
                  color: "var(--text-muted)",
                }}
              />
              <input
                type="password"
                value={password}
                onChange={(e) => { setPassword(e.target.value); setError(""); }}
                placeholder="Enter your password"
                required
                style={{
                  width: "100%",
                  padding: "0.7rem 0.75rem 0.7rem 2.75rem",
                  border: error ? `1.5px solid var(--accent-danger)` : `1.5px solid var(--border-strong)`,
                  borderRadius: "var(--radius-sm)",
                  fontSize: "var(--text-base)",
                  outline: "none",
                  transition: "border-color var(--duration-fast) ease, box-shadow var(--duration-fast) ease",
                  background: "var(--surface-raised)",
                  color: "var(--text-primary)",
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = "var(--accent-primary)";
                  e.currentTarget.style.boxShadow = "0 0 0 3px var(--accent-primary-soft)";
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = error ? "var(--accent-danger)" : "var(--border-strong)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              />
            </div>
            {error && (
              <p style={{ marginTop: "0.4rem", fontSize: "var(--text-sm)", color: "var(--accent-danger)" }}>
                {error}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              padding: "0.7rem",
              background: loading ? "var(--text-muted)" : "var(--accent-primary)",
              color: "white",
              border: "none",
              borderRadius: "var(--radius-sm)",
              fontSize: "var(--text-base)",
              fontWeight: 600,
              cursor: loading ? "not-allowed" : "pointer",
              transition: "background var(--duration-fast) ease, transform var(--duration-fast) ease, box-shadow var(--duration-fast) ease",
              boxShadow: "var(--shadow-sm)",
            }}
            onMouseEnter={(e) => {
              if (!loading) {
                e.currentTarget.style.background = "var(--accent-primary-hover)";
                e.currentTarget.style.boxShadow = "var(--shadow-md)";
              }
            }}
            onMouseLeave={(e) => {
              if (!loading) {
                e.currentTarget.style.background = "var(--accent-primary)";
                e.currentTarget.style.boxShadow = "var(--shadow-sm)";
              }
            }}
            onMouseDown={(e) => {
              if (!loading) e.currentTarget.style.transform = "scale(0.985)";
            }}
            onMouseUp={(e) => {
              e.currentTarget.style.transform = "scale(1)";
            }}
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <div
          style={{
            marginTop: "1.75rem",
            padding: "0.875rem 1rem",
            background: "var(--surface-sunken)",
            borderRadius: "var(--radius-sm)",
            fontSize: "var(--text-sm)",
            color: "var(--text-tertiary)",
            border: "1px solid var(--border-subtle)",
          }}
        >
          <div style={{ fontWeight: 600, marginBottom: "0.35rem", color: "var(--text-secondary)" }}>
            {isClientLogin ? "Client Login" : "Admin Login"}:
          </div>
          {isClientLogin ? (
            <div style={{ fontSize: "var(--text-xs)", color: "var(--text-muted)", lineHeight: 1.6 }}>
              • Sign in with your client email and password<br />
              • View your product audit reports
            </div>
          ) : (
            <div style={{ fontSize: "var(--text-xs)", color: "var(--text-muted)", lineHeight: 1.6 }}>
              • Sign in with your admin email and password<br />
              • Full access to create and edit reports
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
