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

    // Login succeeded and role was determined - navigate directly
    if (isClientLogin) {
      navigate("/client/report", { replace: true });
    } else {
      navigate("/admin/reports", { replace: true });
    }
    // Don't setLoading(false) - we're navigating away
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem",
      }}
    >
      <div
        style={{
          background: "white",
          borderRadius: "1rem",
          padding: "3rem",
          boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)",
          maxWidth: "450px",
          width: "100%",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              width: "64px",
              height: "64px",
              background: "#667eea",
              borderRadius: "50%",
              marginBottom: "1rem",
            }}
          >
            <Shield size={32} style={{ color: "white" }} />
          </div>
          <h1
            style={{
              fontSize: "2rem",
              fontWeight: "bold",
              color: "#1f2937",
              marginBottom: "0.5rem",
            }}
          >
            Product Review Platform
          </h1>
          <p style={{ color: "#6b7280", fontSize: "1rem" }}>
            {isClientLogin
              ? "Sign in to view your report"
              : isAdminLogin
              ? "Sign in to admin dashboard"
              : "Sign in to access your reports"}
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "1.5rem" }}>
            <label
              style={{
                display: "block",
                marginBottom: "0.5rem",
                fontSize: "0.875rem",
                fontWeight: "bold",
                color: "#374151",
              }}
            >
              Email Address
            </label>
            <div style={{ position: "relative" }}>
              <Mail
                size={20}
                style={{
                  position: "absolute",
                  left: "1rem",
                  top: "50%",
                  transform: "translateY(-50%)",
                  color: "#9ca3af",
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
                  padding: "0.75rem 0.75rem 0.75rem 3rem",
                  border: error ? "2px solid #ef4444" : "2px solid #e5e7eb",
                  borderRadius: "0.5rem",
                  fontSize: "1rem",
                  outline: "none",
                  transition: "border-color 0.2s",
                }}
                onFocus={(e) => { e.currentTarget.style.borderColor = "#667eea"; }}
                onBlur={(e) => { e.currentTarget.style.borderColor = error ? "#ef4444" : "#e5e7eb"; }}
              />
            </div>
          </div>

          <div style={{ marginBottom: "1.5rem" }}>
            <label
              style={{
                display: "block",
                marginBottom: "0.5rem",
                fontSize: "0.875rem",
                fontWeight: "bold",
                color: "#374151",
              }}
            >
              Password
            </label>
            <div style={{ position: "relative" }}>
              <Lock
                size={20}
                style={{
                  position: "absolute",
                  left: "1rem",
                  top: "50%",
                  transform: "translateY(-50%)",
                  color: "#9ca3af",
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
                  padding: "0.75rem 0.75rem 0.75rem 3rem",
                  border: error ? "2px solid #ef4444" : "2px solid #e5e7eb",
                  borderRadius: "0.5rem",
                  fontSize: "1rem",
                  outline: "none",
                  transition: "border-color 0.2s",
                }}
                onFocus={(e) => { e.currentTarget.style.borderColor = "#667eea"; }}
                onBlur={(e) => { e.currentTarget.style.borderColor = error ? "#ef4444" : "#e5e7eb"; }}
              />
            </div>
            {error && (
              <p style={{ marginTop: "0.5rem", fontSize: "0.875rem", color: "#ef4444" }}>
                {error}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              padding: "0.75rem",
              background: loading ? "#9ca3af" : "#667eea",
              color: "white",
              border: "none",
              borderRadius: "0.5rem",
              fontSize: "1rem",
              fontWeight: "bold",
              cursor: loading ? "not-allowed" : "pointer",
              transition: "background 0.2s",
            }}
            onMouseEnter={(e) => { if (!loading) e.currentTarget.style.background = "#5568d3"; }}
            onMouseLeave={(e) => { if (!loading) e.currentTarget.style.background = "#667eea"; }}
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <div
          style={{
            marginTop: "2rem",
            padding: "1rem",
            background: "#f3f4f6",
            borderRadius: "0.5rem",
            fontSize: "0.875rem",
            color: "#6b7280",
          }}
        >
          <div style={{ fontWeight: "bold", marginBottom: "0.5rem", color: "#374151" }}>
            {isClientLogin ? "Client Login" : "Admin Login"}:
          </div>
          {isClientLogin ? (
            <div style={{ marginTop: "0.5rem", fontSize: "0.75rem", color: "#9ca3af" }}>
              • Sign in with your client email and password<br />
              • View your product audit reports
            </div>
          ) : (
            <div style={{ marginTop: "0.5rem", fontSize: "0.75rem", color: "#9ca3af" }}>
              • Sign in with your admin email and password<br />
              • Full access to create and edit reports
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
