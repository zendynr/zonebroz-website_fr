import { useState } from "react";
import { X, Mail, User, Building2, Lock } from "lucide-react";
import { useReports } from "../context/ReportsContext";

interface CreateClientModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export default function CreateClientModal({
  isOpen,
  onClose,
  onSuccess,
}: CreateClientModalProps) {
  const { addClient } = useReports();
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (!name.trim()) {
      setError("Please enter a client name");
      setLoading(false);
      return;
    }

    if (!email.trim()) {
      setError("Please enter an email address");
      setLoading(false);
      return;
    }

    if (!password.trim() || password.length < 6) {
      setError("Please enter a password (minimum 6 characters)");
      setLoading(false);
      return;
    }

    try {
      await addClient(
        {
          name: name.trim(),
          company: company.trim() || undefined,
          email: email.toLowerCase().trim(),
        },
        password
      );

      // Reset form
      setName("");
      setCompany("");
      setEmail("");
      setPassword("");
      setError("");

      onSuccess?.();
      onClose();
    } catch (err: any) {
      setError(err.message || "Failed to create client. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "0.7rem 0.75rem 0.7rem 2.75rem",
    border: "1px solid var(--border-default)",
    borderRadius: "var(--radius-sm)",
    fontSize: "var(--text-base)",
    color: "var(--text-primary)",
    background: "var(--surface-card)",
    transition: "border-color var(--duration-fast) ease, box-shadow var(--duration-fast) ease",
    outline: "none",
    fontFamily: "inherit",
  };

  const labelStyle: React.CSSProperties = {
    display: "block",
    marginBottom: "0.4rem",
    fontSize: "var(--text-sm)",
    fontWeight: 600,
    color: "var(--text-secondary)",
    letterSpacing: "0.01em",
  };

  const iconStyle: React.CSSProperties = {
    position: "absolute",
    left: "0.75rem",
    top: "50%",
    transform: "translateY(-50%)",
    color: "var(--text-muted)",
  };

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: "rgba(0, 0, 0, 0.4)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
        padding: "1rem",
      }}
      onClick={onClose}
    >
      <div
        style={{
          background: "var(--surface-card)",
          borderRadius: "var(--radius-lg)",
          padding: "1.75rem 2rem",
          maxWidth: "480px",
          width: "100%",
          maxHeight: "90vh",
          overflow: "auto",
          boxShadow: "var(--shadow-xl)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "1.5rem",
          }}
        >
          <h2
            style={{
              fontSize: "var(--text-xl)",
              fontWeight: 700,
              color: "var(--text-primary)",
              letterSpacing: "var(--tracking-tight)",
            }}
          >
            Create New Client
          </h2>
          <button
            onClick={onClose}
            style={{
              background: "var(--surface-sunken)",
              border: "none",
              cursor: "pointer",
              padding: "0.4rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "var(--radius-sm)",
              transition: "background var(--duration-fast) ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "var(--surface-ground)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "var(--surface-sunken)";
            }}
          >
            <X size={20} style={{ color: "var(--text-tertiary)" }} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          {error && (
            <div
              style={{
                padding: "0.7rem 0.875rem",
                background: "var(--accent-danger-soft)",
                border: "1px solid var(--accent-danger)",
                borderRadius: "var(--radius-sm)",
                marginBottom: "1rem",
                color: "var(--accent-danger-text)",
                fontSize: "var(--text-sm)",
                fontWeight: 500,
              }}
            >
              {error}
            </div>
          )}

          {/* Name */}
          <div style={{ marginBottom: "1rem" }}>
            <label style={labelStyle}>
              Client Name *
            </label>
            <div style={{ position: "relative" }}>
              <User size={18} style={iconStyle} />
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g., John Doe"
                required
                style={inputStyle}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = "var(--accent-primary)";
                  e.currentTarget.style.boxShadow = "0 0 0 3px rgba(59, 130, 246, 0.1)";
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = "var(--border-default)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              />
            </div>
          </div>

          {/* Company */}
          <div style={{ marginBottom: "1rem" }}>
            <label style={labelStyle}>
              Company (Optional)
            </label>
            <div style={{ position: "relative" }}>
              <Building2 size={18} style={iconStyle} />
              <input
                type="text"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                placeholder="e.g., Acme Inc."
                style={inputStyle}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = "var(--accent-primary)";
                  e.currentTarget.style.boxShadow = "0 0 0 3px rgba(59, 130, 246, 0.1)";
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = "var(--border-default)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              />
            </div>
          </div>

          {/* Email */}
          <div style={{ marginBottom: "1rem" }}>
            <label style={labelStyle}>
              Email Address *
            </label>
            <div style={{ position: "relative" }}>
              <Mail size={18} style={iconStyle} />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="client@example.com"
                required
                style={inputStyle}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = "var(--accent-primary)";
                  e.currentTarget.style.boxShadow = "0 0 0 3px rgba(59, 130, 246, 0.1)";
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = "var(--border-default)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              />
            </div>
          </div>

          {/* Password */}
          <div style={{ marginBottom: "1.5rem" }}>
            <label style={labelStyle}>
              Password *
            </label>
            <div style={{ position: "relative" }}>
              <Lock size={18} style={iconStyle} />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Minimum 6 characters"
                required
                minLength={6}
                style={inputStyle}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = "var(--accent-primary)";
                  e.currentTarget.style.boxShadow = "0 0 0 3px rgba(59, 130, 246, 0.1)";
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = "var(--border-default)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              />
            </div>
            <p style={{ fontSize: "var(--text-xs)", color: "var(--text-muted)", marginTop: "0.35rem" }}>
              This password will be used for client login
            </p>
          </div>

          {/* Actions */}
          <div
            style={{
              display: "flex",
              gap: "0.625rem",
              justifyContent: "flex-end",
              paddingTop: "0.5rem",
              borderTop: "1px solid var(--border-subtle)",
            }}
          >
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              style={{
                padding: "0.6rem 1.25rem",
                background: "var(--surface-sunken)",
                color: "var(--text-secondary)",
                border: "1px solid var(--border-default)",
                borderRadius: "var(--radius-sm)",
                fontSize: "var(--text-sm)",
                fontWeight: 600,
                cursor: loading ? "not-allowed" : "pointer",
                transition: "all var(--duration-fast) ease",
              }}
              onMouseEnter={(e) => {
                if (!loading) {
                  e.currentTarget.style.background = "var(--surface-ground)";
                  e.currentTarget.style.borderColor = "var(--border-strong)";
                }
              }}
              onMouseLeave={(e) => {
                if (!loading) {
                  e.currentTarget.style.background = "var(--surface-sunken)";
                  e.currentTarget.style.borderColor = "var(--border-default)";
                }
              }}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              style={{
                padding: "0.6rem 1.5rem",
                background: loading ? "var(--text-muted)" : "var(--accent-primary)",
                color: "white",
                border: "none",
                borderRadius: "var(--radius-sm)",
                fontSize: "var(--text-sm)",
                fontWeight: 600,
                cursor: loading ? "not-allowed" : "pointer",
                boxShadow: "var(--shadow-sm)",
                transition: "all var(--duration-fast) ease",
              }}
              onMouseEnter={(e) => {
                if (!loading) {
                  e.currentTarget.style.background = "var(--accent-primary-hover)";
                }
              }}
              onMouseLeave={(e) => {
                if (!loading) {
                  e.currentTarget.style.background = "var(--accent-primary)";
                }
              }}
            >
              {loading ? "Creating..." : "Create Client"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
