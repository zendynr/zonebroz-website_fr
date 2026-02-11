import { useState, useEffect } from "react";
import { Report, CategoryKey } from "../types";
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
  const [existingClient, setExistingClient] = useState<ReturnType<typeof getClientByEmail>>(null);

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

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f9fafb",
        padding: "2rem",
      }}
    >
      <div
        style={{
          maxWidth: "800px",
          margin: "0 auto",
          background: "white",
          borderRadius: "0.5rem",
          boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
        }}
      >
        {/* Header */}
        <div
          style={{
            padding: "2rem",
            borderBottom: "1px solid #e5e7eb",
            display: "flex",
            alignItems: "center",
            gap: "1rem",
          }}
        >
          <button
            onClick={() => navigate("/admin/reports")}
            style={{
              padding: "0.5rem",
              background: "#f3f4f6",
              border: "none",
              borderRadius: "0.5rem",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <ArrowLeft size={20} />
          </button>
          <h1
            style={{
              fontSize: "2rem",
              fontWeight: "bold",
              color: "#1f2937",
            }}
          >
            Create New Report
          </h1>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} style={{ padding: "2rem" }}>
          {error && (
            <div
              style={{
                padding: "0.75rem",
                background: "#fee2e2",
                border: "1px solid #fecaca",
                borderRadius: "0.5rem",
                marginBottom: "1.5rem",
                color: "#991b1b",
                fontSize: "0.875rem",
              }}
            >
              {error}
            </div>
          )}
          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            {/* Client Email */}
            <div>
              <label
                style={{
                  display: "block",
                  marginBottom: "0.5rem",
                  fontSize: "0.875rem",
                  fontWeight: "bold",
                  color: "#6b7280",
                }}
              >
                Client Email <span style={{ color: "#ef4444" }}>*</span>
              </label>
              <div style={{ position: "relative" }}>
                <Mail
                  size={20}
                  style={{
                    position: "absolute",
                    left: "0.75rem",
                    top: "50%",
                    transform: "translateY(-50%)",
                    color: "#9ca3af",
                  }}
                />
                <input
                  type="email"
                  value={clientEmail}
                  onChange={(e) => setClientEmail(e.target.value)}
                  placeholder="client@example.com"
                  required
                  style={{
                    width: "100%",
                    padding: "0.75rem 0.75rem 0.75rem 2.75rem",
                    border: "1px solid #d1d5db",
                    borderRadius: "0.5rem",
                    fontSize: "1rem",
                  }}
                />
              </div>
              {existingClient && (
                <p
                  style={{
                    marginTop: "0.5rem",
                    fontSize: "0.875rem",
                    color: "#10b981",
                    fontWeight: "500",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                  }}
                >
                  <User size={16} />
                  Existing client: {existingClient.name}
                  {existingClient.company && ` (${existingClient.company})`}
                </p>
              )}
              {!existingClient && clientEmail.trim() && (
                <p
                  style={{
                    marginTop: "0.5rem",
                    fontSize: "0.875rem",
                    color: "#3b82f6",
                    fontWeight: "500",
                  }}
                >
                  New client will be created
                </p>
              )}
            </div>

            {/* Client Name */}
            <div>
              <label
                style={{
                  display: "block",
                  marginBottom: "0.5rem",
                  fontSize: "0.875rem",
                  fontWeight: "bold",
                  color: "#6b7280",
                }}
              >
                Client Name {existingClient ? "(auto-filled)" : "(optional)"}
              </label>
              <div style={{ position: "relative" }}>
                <User
                  size={20}
                  style={{
                    position: "absolute",
                    left: "0.75rem",
                    top: "50%",
                    transform: "translateY(-50%)",
                    color: "#9ca3af",
                  }}
                />
                <input
                  type="text"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  placeholder="e.g., John Doe"
                  style={{
                    width: "100%",
                    padding: "0.75rem 0.75rem 0.75rem 2.75rem",
                    border: "1px solid #d1d5db",
                    borderRadius: "0.5rem",
                    fontSize: "1rem",
                    background: existingClient ? "#f3f4f6" : "white",
                  }}
                  disabled={!!existingClient}
                />
              </div>
            </div>

            {/* Client Company */}
            <div>
              <label
                style={{
                  display: "block",
                  marginBottom: "0.5rem",
                  fontSize: "0.875rem",
                  fontWeight: "bold",
                  color: "#6b7280",
                }}
              >
                Company Name {existingClient ? "(auto-filled)" : "(optional)"}
              </label>
              <div style={{ position: "relative" }}>
                <Building2
                  size={20}
                  style={{
                    position: "absolute",
                    left: "0.75rem",
                    top: "50%",
                    transform: "translateY(-50%)",
                    color: "#9ca3af",
                  }}
                />
                <input
                  type="text"
                  value={clientCompany}
                  onChange={(e) => setClientCompany(e.target.value)}
                  placeholder="e.g., Acme Corporation"
                  style={{
                    width: "100%",
                    padding: "0.75rem 0.75rem 0.75rem 2.75rem",
                    border: "1px solid #d1d5db",
                    borderRadius: "0.5rem",
                    fontSize: "1rem",
                    background: existingClient ? "#f3f4f6" : "white",
                  }}
                  disabled={!!existingClient}
                />
              </div>
            </div>

            {/* Product Name */}
            <div>
              <label
                style={{
                  display: "block",
                  marginBottom: "0.5rem",
                  fontSize: "0.875rem",
                  fontWeight: "bold",
                  color: "#6b7280",
                }}
              >
                Product Name <span style={{ color: "#ef4444" }}>*</span>
              </label>
              <input
                type="text"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                placeholder="e.g., EcoShop Marketplace"
                required
                style={{
                  width: "100%",
                  padding: "0.75rem",
                  border: "1px solid #d1d5db",
                  borderRadius: "0.5rem",
                  fontSize: "1rem",
                }}
              />
            </div>

            {/* Product URL */}
            <div>
              <label
                style={{
                  display: "block",
                  marginBottom: "0.5rem",
                  fontSize: "0.875rem",
                  fontWeight: "bold",
                  color: "#6b7280",
                }}
              >
                Product URL (optional)
              </label>
              <input
                type="url"
                value={productUrl}
                onChange={(e) => setProductUrl(e.target.value)}
                placeholder="https://example.com/product"
                style={{
                  width: "100%",
                  padding: "0.75rem",
                  border: "1px solid #d1d5db",
                  borderRadius: "0.5rem",
                  fontSize: "1rem",
                }}
              />
            </div>

            {/* Review Date */}
            <div>
              <label
                style={{
                  display: "block",
                  marginBottom: "0.5rem",
                  fontSize: "0.875rem",
                  fontWeight: "bold",
                  color: "#6b7280",
                }}
              >
                Review Date
              </label>
              <input
                type="date"
                value={reviewDate}
                onChange={(e) => setReviewDate(e.target.value)}
                style={{
                  width: "100%",
                  padding: "0.75rem",
                  border: "1px solid #d1d5db",
                  borderRadius: "0.5rem",
                  fontSize: "1rem",
                }}
              />
            </div>

            {/* Submit Button */}
            <div
              style={{
                display: "flex",
                gap: "1rem",
                marginTop: "1rem",
                paddingTop: "1.5rem",
                borderTop: "1px solid #e5e7eb",
              }}
            >
              <button
                type="submit"
                disabled={saving}
                style={{
                  flex: 1,
                  padding: "0.75rem 1.5rem",
                  background: saving ? "#9ca3af" : "#3b82f6",
                  color: "white",
                  border: "none",
                  borderRadius: "0.5rem",
                  cursor: saving ? "not-allowed" : "pointer",
                  fontSize: "1rem",
                  fontWeight: "bold",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "0.5rem",
                }}
              >
                <Save size={20} />
                {saving ? "Creating..." : "Create Report"}
              </button>
              <button
                type="button"
                onClick={() => navigate("/admin/reports")}
                style={{
                  padding: "0.75rem 1.5rem",
                  background: "#f3f4f6",
                  color: "#1f2937",
                  border: "none",
                  borderRadius: "0.5rem",
                  cursor: "pointer",
                  fontSize: "1rem",
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
