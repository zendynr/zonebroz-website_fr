import { useState, useEffect } from "react";
import { Report, CategoryKey, Client } from "../types";
import { ArrowLeft, Save, Mail, User, Building2 } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useReports } from "../context/ReportsContext";
import { useUser } from "../context/UserContext";

interface CreateReportProps {
  onSave: (report: Report) => Promise<Report>;
}

export default function CreateReport({ onSave }: CreateReportProps) {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { findOrCreateClientByEmail, getClientByEmail } = useReports();
  const { currentUser } = useUser();
  
  const initialEmail = searchParams.get("email") || "";
  const [clientEmail, setClientEmail] = useState(initialEmail);
  const [clientName, setClientName] = useState("");
  const [clientCompany, setClientCompany] = useState("");
  const [productName, setProductName] = useState("");
  const [productUrl, setProductUrl] = useState("");
  const [reviewDate, setReviewDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [existingClient, setExistingClient] = useState<Client | null>(null);

  // Check for existing client when email changes
  useEffect(() => {
    if (clientEmail.trim()) {
      const client = getClientByEmail(clientEmail.trim());
      if (client) {
        setExistingClient(client);
        setClientName(client.name);
        setClientCompany(client.company || "");
      } else {
        setExistingClient(null);
        // Clear name/company if no existing client
        if (!clientName && !clientCompany) {
          // Extract name from email if empty
          const emailPrefix = clientEmail.split("@")[0];
          setClientName(emailPrefix.charAt(0).toUpperCase() + emailPrefix.slice(1));
        }
      }
    } else {
      setExistingClient(null);
    }
  }, [clientEmail, getClientByEmail, clientName, clientCompany]);

  // Handle initial email from URL params
  useEffect(() => {
    if (initialEmail) {
      setClientEmail(initialEmail);
    }
  }, [initialEmail]);

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    
    if (!clientEmail.trim() || !productName.trim()) {
      setError("Please enter a client email and product name");
      return;
    }

    setSaving(true);

    try {
      // Find or create client by email
      const client = await findOrCreateClientByEmail(
        clientEmail.trim(),
        clientName.trim() || undefined,
        clientCompany.trim() || undefined
      );

      // Create empty report with default category scores
      const categories: CategoryKey[] = [
        "firstImpression",
        "uiQuality",
        "uxFlow",
        "mobileResponsiveness",
        "accessibility",
        "onboarding",
        "featureCompleteness",
        "monetization",
        "retention",
        "performance",
        "security",
        "scalability",
      ];

      const newReport: Report = {
        id: `report-${Date.now()}`,
        clientId: client.id,
        ownerId: currentUser.id, // Use actual admin ID from context
        status: "draft",
        meta: {
          productName: productName.trim(),
          productUrl: productUrl.trim() || undefined,
          reviewDate: reviewDate,
          reviewerName: "Product Audit Team",
          clientName: client.name,
        },
        categoryScores: categories.map((cat) => ({
          category: cat,
          score: 5,
          strengths: "",
          weaknesses: "",
          scoreRationale: "",
          analysisSections: [],
          notes: "",
        })),
        findings: [],
        competitors: [],
        overallScore: 5.0,
      };

      // Save the report and get back the version with real UUID
      const savedReport = await onSave(newReport);
      
      // Navigate to the report editor using the real UUID from the database
      navigate(`/admin/reports/${savedReport.id}`);
    } catch (err: any) {
      setError(err.message || "Failed to create report. Please try again.");
      setSaving(false);
    }
  };

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "0.7rem 0.75rem",
    border: "1px solid var(--border-default)",
    borderRadius: "var(--radius-sm)",
    fontSize: "var(--text-base)",
    color: "var(--text-primary)",
    background: "var(--surface-card)",
    transition: "border-color var(--duration-fast) ease, box-shadow var(--duration-fast) ease",
    outline: "none",
    fontFamily: "inherit",
  };

  const inputWithIconStyle: React.CSSProperties = {
    ...inputStyle,
    paddingLeft: "2.75rem",
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

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    e.currentTarget.style.borderColor = "var(--accent-primary)";
    e.currentTarget.style.boxShadow = "0 0 0 3px rgba(91, 106, 191, 0.1)";
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    e.currentTarget.style.borderColor = "var(--border-default)";
    e.currentTarget.style.boxShadow = "none";
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "var(--surface-ground)",
        padding: "2rem",
      }}
    >
      <div
        style={{
          maxWidth: "720px",
          margin: "0 auto",
          background: "var(--surface-card)",
          borderRadius: "var(--radius-lg)",
          boxShadow: "var(--shadow-md)",
          border: "1px solid var(--border-subtle)",
        }}
      >
        {/* Header */}
        <div
          style={{
            padding: "1.5rem 2rem",
            borderBottom: "1px solid var(--border-default)",
            display: "flex",
            alignItems: "center",
            gap: "0.875rem",
          }}
        >
          <button
            onClick={() => navigate("/admin/reports")}
            style={{
              padding: "0.45rem",
              background: "var(--surface-sunken)",
              border: "1px solid var(--border-default)",
              borderRadius: "var(--radius-sm)",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "all var(--duration-fast) ease",
              color: "var(--text-secondary)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "var(--surface-ground)";
              e.currentTarget.style.borderColor = "var(--border-strong)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "var(--surface-sunken)";
              e.currentTarget.style.borderColor = "var(--border-default)";
            }}
          >
            <ArrowLeft size={18} />
          </button>
          <h1
            style={{
              fontSize: "var(--text-2xl)",
              fontWeight: 700,
              color: "var(--text-primary)",
              letterSpacing: "var(--tracking-tight)",
            }}
          >
            Create New Report
          </h1>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} style={{ padding: "1.75rem 2rem" }}>
          {error && (
            <div
              style={{
                padding: "0.7rem 0.875rem",
                background: "var(--accent-danger-soft)",
                border: "1px solid var(--accent-danger)",
                borderRadius: "var(--radius-sm)",
                marginBottom: "1.5rem",
                color: "var(--accent-danger-text)",
                fontSize: "var(--text-sm)",
                fontWeight: 500,
              }}
            >
              {error}
            </div>
          )}
          <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
            {/* Client Email */}
            <div>
              <label style={labelStyle}>
                Client Email <span style={{ color: "var(--accent-danger)" }}>*</span>
              </label>
              <div style={{ position: "relative" }}>
                <Mail size={18} style={iconStyle} />
                <input
                  type="email"
                  value={clientEmail}
                  onChange={(e) => setClientEmail(e.target.value)}
                  placeholder="client@example.com"
                  required
                  style={inputWithIconStyle}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                />
              </div>
              {existingClient && (
                <p
                  style={{
                    marginTop: "0.4rem",
                    fontSize: "var(--text-sm)",
                    color: "var(--accent-success-text)",
                    fontWeight: 500,
                    display: "flex",
                    alignItems: "center",
                    gap: "0.4rem",
                  }}
                >
                  <User size={14} />
                  Existing client: {existingClient.name}
                  {existingClient.company && ` (${existingClient.company})`}
                </p>
              )}
              {!existingClient && clientEmail.trim() && (
                <p
                  style={{
                    marginTop: "0.4rem",
                    fontSize: "var(--text-sm)",
                    color: "var(--accent-primary)",
                    fontWeight: 500,
                  }}
                >
                  New client will be created
                </p>
              )}
            </div>

            {/* Client Name */}
            <div>
              <label style={labelStyle}>
                Client Name {existingClient ? "(auto-filled)" : "(optional)"}
              </label>
              <div style={{ position: "relative" }}>
                <User size={18} style={iconStyle} />
                <input
                  type="text"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  placeholder="e.g., John Doe"
                  style={{
                    ...inputWithIconStyle,
                    background: existingClient ? "var(--surface-sunken)" : "var(--surface-card)",
                  }}
                  disabled={!!existingClient}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                />
              </div>
            </div>

            {/* Client Company */}
            <div>
              <label style={labelStyle}>
                Company Name {existingClient ? "(auto-filled)" : "(optional)"}
              </label>
              <div style={{ position: "relative" }}>
                <Building2 size={18} style={iconStyle} />
                <input
                  type="text"
                  value={clientCompany}
                  onChange={(e) => setClientCompany(e.target.value)}
                  placeholder="e.g., Acme Corporation"
                  style={{
                    ...inputWithIconStyle,
                    background: existingClient ? "var(--surface-sunken)" : "var(--surface-card)",
                  }}
                  disabled={!!existingClient}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                />
              </div>
            </div>

            {/* Product Name */}
            <div>
              <label style={labelStyle}>
                Product Name <span style={{ color: "var(--accent-danger)" }}>*</span>
              </label>
              <input
                type="text"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                placeholder="e.g., EcoShop Marketplace"
                required
                style={inputStyle}
                onFocus={handleFocus}
                onBlur={handleBlur}
              />
            </div>

            {/* Product URL */}
            <div>
              <label style={labelStyle}>
                Product URL (optional)
              </label>
              <input
                type="url"
                value={productUrl}
                onChange={(e) => setProductUrl(e.target.value)}
                placeholder="https://example.com/product"
                style={inputStyle}
                onFocus={handleFocus}
                onBlur={handleBlur}
              />
            </div>

            {/* Review Date */}
            <div>
              <label style={labelStyle}>
                Review Date
              </label>
              <input
                type="date"
                value={reviewDate}
                onChange={(e) => setReviewDate(e.target.value)}
                style={inputStyle}
                onFocus={handleFocus}
                onBlur={handleBlur}
              />
            </div>

            {/* Submit Button */}
            <div
              style={{
                display: "flex",
                gap: "0.625rem",
                marginTop: "0.5rem",
                paddingTop: "1.25rem",
                borderTop: "1px solid var(--border-subtle)",
              }}
            >
              <button
                type="submit"
                disabled={saving}
                style={{
                  flex: 1,
                  padding: "0.65rem 1.5rem",
                  background: saving ? "var(--text-muted)" : "var(--accent-primary)",
                  color: "white",
                  border: "none",
                  borderRadius: "var(--radius-sm)",
                  cursor: saving ? "not-allowed" : "pointer",
                  fontSize: "var(--text-base)",
                  fontWeight: 600,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "0.45rem",
                  boxShadow: "var(--shadow-sm)",
                  transition: "all var(--duration-fast) ease",
                }}
                onMouseEnter={(e) => {
                  if (!saving) {
                    e.currentTarget.style.background = "var(--accent-primary-hover)";
                    e.currentTarget.style.boxShadow = "var(--shadow-md)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (!saving) {
                    e.currentTarget.style.background = "var(--accent-primary)";
                    e.currentTarget.style.boxShadow = "var(--shadow-sm)";
                  }
                }}
              >
                <Save size={18} />
                {saving ? "Creating..." : "Create Report"}
              </button>
              <button
                type="button"
                onClick={() => navigate("/admin/reports")}
                style={{
                  padding: "0.65rem 1.5rem",
                  background: "var(--surface-sunken)",
                  color: "var(--text-secondary)",
                  border: "1px solid var(--border-default)",
                  borderRadius: "var(--radius-sm)",
                  cursor: "pointer",
                  fontSize: "var(--text-base)",
                  fontWeight: 500,
                  transition: "all var(--duration-fast) ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "var(--surface-ground)";
                  e.currentTarget.style.borderColor = "var(--border-strong)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "var(--surface-sunken)";
                  e.currentTarget.style.borderColor = "var(--border-default)";
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
