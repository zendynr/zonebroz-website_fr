import { useState } from "react";
import { Report, CategoryKey, Finding, CategoryScore } from "../types";
import { useUser } from "../context/UserContext";
import { useReports } from "../context/ReportsContext";
import ReportViewer from "./ReportViewer";
import { Save, Eye, Edit2, Building2, Send, XCircle } from "lucide-react";

interface AdminPanelProps {
  initialReport?: Report;
  onSave?: (report: Report) => Promise<void>;
}

export default function AdminPanel({ initialReport, onSave }: AdminPanelProps) {
  const { currentUser } = useUser();
  const { getClientById } = useReports();
  const [report, setReport] = useState<Report>(
    initialReport || createEmptyReport()
  );
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [activeTab, setActiveTab] = useState<"scores" | "findings">("scores");
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState("");
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [publishing, setPublishing] = useState(false);

  const missingWhatIsHappeningCount = report.findings.filter(
    (finding) => !finding.description?.trim()
  ).length;

  const validateFindings = (): boolean => {
    if (missingWhatIsHappeningCount > 0) {
      setSaveError(
        `Please complete "What's happening" for ${missingWhatIsHappeningCount} urgent fix${missingWhatIsHappeningCount > 1 ? "es" : ""} before saving.`
      );
      setActiveTab("findings");
      return false;
    }
    return true;
  };

  if (currentUser.role !== "admin") {
    return (
      <div style={{ padding: "2rem", textAlign: "center" }}>
        Admin access required
      </div>
    );
  }

  if (isPreviewMode) {
    return (
      <div style={{ position: "relative" }}>
        <button
          onClick={() => setIsPreviewMode(false)}
          style={{
            position: "fixed",
            top: "1rem",
            right: "1rem",
            zIndex: 2000,
            padding: "0.75rem 1.5rem",
            background: "#3b82f6",
            color: "white",
            border: "none",
            borderRadius: "0.5rem",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            fontSize: "1rem",
            fontWeight: "bold",
          }}
        >
          <Edit2 size={20} />
          Edit Report
        </button>
        <ReportViewer report={report} />
      </div>
    );
  }

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
          maxWidth: "1400px",
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
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "1rem",
            }}
          >
            <h1 style={{ fontSize: "2rem", fontWeight: "bold", color: "#1f2937" }}>
              Admin: Edit Report
            </h1>
          <div style={{ display: "flex", gap: "1rem" }}>
            <button
              onClick={() => setIsPreviewMode(true)}
              style={{
                padding: "0.75rem 1.5rem",
                background: "#10b981",
                color: "white",
                border: "none",
                borderRadius: "0.5rem",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                fontSize: "1rem",
                fontWeight: "bold",
              }}
            >
              <Eye size={20} />
              Preview
            </button>
            <button
              type="button"
              disabled={saving || publishing}
              onClick={async (e) => {
                e.preventDefault();
                e.stopPropagation();

                if (!validateFindings()) {
                  return;
                }
                
                if (!onSave) {
                  console.error("onSave is not defined");
                  setSaveError("Save handler is not available");
                  return;
                }
                
                setSaving(true);
                setSaveError("");
                setSaveSuccess(false);
                
                try {
                  // Recalculate overall score before saving
                  const calculateOverallScore = (scores: CategoryScore[]): number => {
                    if (scores.length === 0) return 0;
                    const sum = scores.reduce((acc, cs) => acc + cs.score, 0);
                    return Math.round((sum / scores.length) * 10) / 10;
                  };
                  
                  const updatedReport = {
                    ...report,
                    overallScore: calculateOverallScore(report.categoryScores),
                  };
                  
                  console.log("Saving report:", updatedReport);
                  
                  await onSave(updatedReport);
                  setSaveSuccess(true);
                  setReport(updatedReport); // Update local state
                  
                  // Clear success message after 3 seconds
                  setTimeout(() => setSaveSuccess(false), 3000);
                } catch (error) {
                  console.error("Error saving report:", error);
                  setSaveError(error instanceof Error ? error.message : "Failed to save report");
                } finally {
                  setSaving(false);
                }
              }}
              style={{
                padding: "0.75rem 1.5rem",
                background: saving ? "#9ca3af" : "#3b82f6",
                color: "white",
                border: "none",
                borderRadius: "0.5rem",
                cursor: saving ? "not-allowed" : "pointer",
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                fontSize: "1rem",
                fontWeight: "bold",
              }}
            >
              <Save size={20} />
              {saving ? "Saving..." : "Save"}
            </button>
            {report.status === "draft" ? (
              <button
                type="button"
                disabled={saving || publishing}
                onClick={async (e) => {
                  e.preventDefault();
                  e.stopPropagation();

                  if (!validateFindings()) {
                    return;
                  }
                  
                  if (!onSave) {
                    setSaveError("Save handler is not available");
                    return;
                  }
                  
                  setPublishing(true);
                  setSaveError("");
                  setSaveSuccess(false);
                  
                  try {
                    // Recalculate overall score before publishing
                    const calculateOverallScore = (scores: CategoryScore[]): number => {
                      if (scores.length === 0) return 0;
                      const sum = scores.reduce((acc, cs) => acc + cs.score, 0);
                      return Math.round((sum / scores.length) * 10) / 10;
                    };
                    
                    const updatedReport = {
                      ...report,
                      status: "published" as const,
                      overallScore: calculateOverallScore(report.categoryScores),
                    };
                    
                    console.log("Publishing report:", updatedReport);
                    
                    await onSave(updatedReport);
                    setReport(updatedReport); // Update local state
                    setSaveSuccess(true);
                    setSaveError("");
                    
                    // Clear success message after 3 seconds
                    setTimeout(() => setSaveSuccess(false), 3000);
                  } catch (error) {
                    console.error("Error publishing report:", error);
                    setSaveError(error instanceof Error ? error.message : "Failed to publish report");
                  } finally {
                    setPublishing(false);
                  }
                }}
                style={{
                  padding: "0.75rem 1.5rem",
                  background: publishing ? "#9ca3af" : "#10b981",
                  color: "white",
                  border: "none",
                  borderRadius: "0.5rem",
                  cursor: publishing ? "not-allowed" : "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  fontSize: "1rem",
                  fontWeight: "bold",
                }}
              >
                <Send size={20} />
                {publishing ? "Publishing..." : "Publish"}
              </button>
            ) : (
              <button
                type="button"
                disabled={saving || publishing}
                onClick={async (e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  
                  if (!onSave) {
                    setSaveError("Save handler is not available");
                    return;
                  }
                  
                  setPublishing(true);
                  setSaveError("");
                  setSaveSuccess(false);
                  
                  try {
                    const updatedReport = {
                      ...report,
                      status: "draft" as const,
                    };
                    
                    console.log("Unpublishing report:", updatedReport);
                    
                    await onSave(updatedReport);
                    setReport(updatedReport); // Update local state
                    setSaveSuccess(true);
                    setSaveError("");
                    
                    // Clear success message after 3 seconds
                    setTimeout(() => setSaveSuccess(false), 3000);
                  } catch (error) {
                    console.error("Error unpublishing report:", error);
                    setSaveError(error instanceof Error ? error.message : "Failed to unpublish report");
                  } finally {
                    setPublishing(false);
                  }
                }}
                style={{
                  padding: "0.75rem 1.5rem",
                  background: publishing ? "#9ca3af" : "#f59e0b",
                  color: "white",
                  border: "none",
                  borderRadius: "0.5rem",
                  cursor: publishing ? "not-allowed" : "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  fontSize: "1rem",
                  fontWeight: "bold",
                }}
              >
                <XCircle size={20} />
                {publishing ? "Unpublishing..." : "Unpublish"}
              </button>
            )}
          </div>
          </div>

          {/* Save Status Messages */}
          {saveError && (
            <div
              style={{
                margin: "0 2rem",
                padding: "0.75rem",
                background: "#fee2e2",
                border: "1px solid #fecaca",
                borderRadius: "0.5rem",
                color: "#991b1b",
                fontSize: "0.875rem",
              }}
            >
              {saveError}
            </div>
          )}
          {saveSuccess && (
            <div
              style={{
                margin: "0 2rem",
                padding: "0.75rem",
                background: "#d1fae5",
                border: "1px solid #a7f3d0",
                borderRadius: "0.5rem",
                color: "#065f46",
                fontSize: "0.875rem",
              }}
            >
              Report saved successfully!
            </div>
          )}

          {/* Report Info */}
          <div
            style={{
              padding: "1rem",
              background: "#f3f4f6",
              borderRadius: "0.5rem",
              display: "flex",
              gap: "2rem",
              flexWrap: "wrap",
            }}
          >
            <div>
              <span
                style={{
                  fontSize: "0.875rem",
                  color: "#6b7280",
                  fontWeight: "bold",
                  textTransform: "uppercase",
                }}
              >
                Report ID:
              </span>
              <div
                style={{
                  fontSize: "1rem",
                  color: "#1f2937",
                  fontFamily: "monospace",
                  marginTop: "0.25rem",
                }}
              >
                {report.id}
              </div>
            </div>
            <div>
              <span
                style={{
                  fontSize: "0.875rem",
                  color: "#6b7280",
                  fontWeight: "bold",
                  textTransform: "uppercase",
                }}
              >
                Client:
              </span>
              <div
                style={{
                  fontSize: "1rem",
                  color: "#1f2937",
                  marginTop: "0.25rem",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                }}
              >
                <Building2 size={16} />
                {getClientById(report.clientId)?.name || "Unknown Client"}
              </div>
            </div>
            <div>
              <span
                style={{
                  fontSize: "0.875rem",
                  color: "#6b7280",
                  fontWeight: "bold",
                  textTransform: "uppercase",
                }}
              >
                Product:
              </span>
              <div
                style={{
                  fontSize: "1rem",
                  color: "#1f2937",
                  marginTop: "0.25rem",
                }}
              >
                {report.meta.productName}
              </div>
            </div>
            <div>
              <span
                style={{
                  fontSize: "0.875rem",
                  color: "#6b7280",
                  fontWeight: "bold",
                  textTransform: "uppercase",
                }}
              >
                Status:
              </span>
              <div
                style={{
                  fontSize: "1rem",
                  color: "#1f2937",
                  marginTop: "0.25rem",
                  textTransform: "capitalize",
                }}
              >
                {report.status}
              </div>
            </div>
            <div>
              <span
                style={{
                  fontSize: "0.875rem",
                  color: "#6b7280",
                  fontWeight: "bold",
                  textTransform: "uppercase",
                }}
              >
                Overall Score:
              </span>
              <div
                style={{
                  fontSize: "1rem",
                  color: "#1f2937",
                  marginTop: "0.25rem",
                  fontWeight: "bold",
                }}
              >
                {report.overallScore?.toFixed(1) || "N/A"} / 10
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div
          style={{
            display: "flex",
            borderBottom: "1px solid #e5e7eb",
          }}
        >
          {(["scores", "findings"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                padding: "1rem 2rem",
                background: activeTab === tab ? "#f3f4f6" : "transparent",
                border: "none",
                borderBottom:
                  activeTab === tab ? "3px solid #3b82f6" : "3px solid transparent",
                cursor: "pointer",
                fontSize: "1rem",
                fontWeight: activeTab === tab ? "bold" : "normal",
                color: "#1f2937",
                textTransform: "capitalize",
              }}
            >
              {tab === "findings" ? "Urgent Fixes" : "Scores"}
            </button>
          ))}
        </div>

        {/* Content */}
        <div style={{ padding: "2rem" }}>
          {activeTab === "scores" && (
            <ScoresEditor
              scores={report.categoryScores}
              onChange={(scores) =>
                setReport({ ...report, categoryScores: scores })
              }
            />
          )}
          {activeTab === "findings" && (
            <FindingsEditor
              findings={report.findings}
              onChange={(findings) => setReport({ ...report, findings })}
            />
          )}
        </div>
      </div>
    </div>
  );
}

function ScoresEditor({
  scores,
  onChange,
}: {
  scores: CategoryScore[];
  onChange: (scores: CategoryScore[]) => void;
}) {
  const updateScore = (
    category: CategoryKey,
    updates: Partial<Omit<CategoryScore, "category">>
  ) => {
    const updated = scores.map((s) =>
      s.category === category ? { ...s, ...updates } : s
    );
    onChange(updated);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      {scores.map((score) => (
        <div
          key={score.category}
          style={{
            background: "#f9fafb",
            padding: "1.5rem",
            borderRadius: "0.5rem",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "1rem",
            }}
          >
            <div>
              <label
                style={{
                  fontSize: "1.25rem",
                  fontWeight: "bold",
                  color: "#1f2937",
                  display: "block",
                }}
              >
                {formatCategoryName(score.category)}
              </label>
              <p
                style={{
                  margin: "0.35rem 0 0 0",
                  fontSize: "0.875rem",
                  color: "#6b7280",
                }}
              >
                Scores explain evaluation logic only. Put actionable fixes in Urgent Fixes.
              </p>
            </div>
            <div style={{ width: "160px" }}>
              <label
                style={{
                  display: "block",
                  marginBottom: "0.35rem",
                  fontSize: "0.875rem",
                  color: "#4b5563",
                  fontWeight: "bold",
                }}
              >
                Overall score
              </label>
              <input
                type="number"
                min="1"
                max="10"
                step="0.1"
                value={score.score}
                onChange={(e) =>
                  updateScore(score.category, {
                    score: Math.max(1, Math.min(10, parseFloat(e.target.value) || 1)),
                  })
                }
                style={{
                  width: "100%",
                  padding: "0.5rem",
                  fontSize: "1.1rem",
                  border: "1px solid #d1d5db",
                  borderRadius: "0.5rem",
                }}
              />
            </div>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "1rem",
              marginBottom: "1rem",
            }}
          >
            <div>
              <label style={{ display: "block", marginBottom: "0.35rem", fontSize: "0.875rem", color: "#4b5563", fontWeight: "bold" }}>
                What's working well
              </label>
              <p style={{ margin: "0 0 0.5rem 0", fontSize: "0.8rem", color: "#6b7280" }}>
                List the main strengths that positively influenced this score.
              </p>
              <textarea
                placeholder={"Use short bullet-style lines.\n- Strong visual hierarchy\n- Clear conversion cues"}
                value={score.strengths || ""}
                onChange={(e) => updateScore(score.category, { strengths: e.target.value })}
                style={{
                  width: "100%",
                  minHeight: "100px",
                  padding: "0.75rem",
                  fontSize: "0.95rem",
                  border: "1px solid #d1d5db",
                  borderRadius: "0.5rem",
                  fontFamily: "inherit",
                }}
              />
            </div>
            <div>
              <label style={{ display: "block", marginBottom: "0.35rem", fontSize: "0.875rem", color: "#4b5563", fontWeight: "bold" }}>
                What's not working well
              </label>
              <p style={{ margin: "0 0 0.5rem 0", fontSize: "0.8rem", color: "#6b7280" }}>
                List observed issues or inconsistencies (do not suggest fixes).
              </p>
              <textarea
                placeholder={"Use short bullet-style lines.\n- Inconsistent spacing across screens\n- Friction in checkout transitions"}
                value={score.weaknesses || ""}
                onChange={(e) => updateScore(score.category, { weaknesses: e.target.value })}
                style={{
                  width: "100%",
                  minHeight: "100px",
                  padding: "0.75rem",
                  fontSize: "0.95rem",
                  border: "1px solid #d1d5db",
                  borderRadius: "0.5rem",
                  fontFamily: "inherit",
                }}
              />
            </div>
          </div>
          <div>
            <label style={{ display: "block", marginBottom: "0.35rem", fontSize: "0.875rem", color: "#4b5563", fontWeight: "bold" }}>
              Why this score
            </label>
            <p style={{ margin: "0 0 0.5rem 0", fontSize: "0.8rem", color: "#6b7280" }}>
              Explain how the strengths and weaknesses resulted in this score.
            </p>
            <textarea
              placeholder="Summarize the evaluation logic only. Do not include recommendations or action steps."
              value={score.scoreRationale || ""}
              onChange={(e) => updateScore(score.category, { scoreRationale: e.target.value })}
              style={{
                width: "100%",
                minHeight: "100px",
                padding: "0.75rem",
                fontSize: "1rem",
                border: "1px solid #d1d5db",
                borderRadius: "0.5rem",
                fontFamily: "inherit",
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

function FindingsEditor({
  findings,
  onChange,
}: {
  findings: Finding[];
  onChange: (findings: Finding[]) => void;
}) {
  const addFinding = () => {
    const newFinding: Finding = {
      id: `finding-${Date.now()}`,
      category: "firstImpression",
      title: "New issue",
      description: "",
      ifIgnored: "",
      impact: 3,
      effort: 3,
      confidence: 3,
      recommendation: "",
      evidence: [],
    };
    onChange([...findings, newFinding]);
  };

  const updateFinding = (id: string, updates: Partial<Finding>) => {
    onChange(
      findings.map((f) => (f.id === id ? { ...f, ...updates } : f))
    );
  };

  const deleteFinding = (id: string) => {
    onChange(findings.filter((f) => f.id !== id));
  };

  return (
    <div>
      <p
        style={{
          margin: "0 0 1rem 0",
          fontSize: "0.9rem",
          color: "#6b7280",
        }}
      >
        Findings are Urgent Fixes: define what is wrong, why it matters, and the direction to fix it.
      </p>
      <button
        onClick={addFinding}
        style={{
          marginBottom: "1.5rem",
          padding: "0.75rem 1.5rem",
          background: "#10b981",
          color: "white",
          border: "none",
          borderRadius: "0.5rem",
          cursor: "pointer",
          fontSize: "1rem",
          fontWeight: "bold",
        }}
      >
        + Add Finding
      </button>

      <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
        {findings.map((finding) => (
          <div
            key={finding.id}
            style={{
              background: "#f9fafb",
              padding: "1.5rem",
              borderRadius: "0.5rem",
              border: "1px solid #e5e7eb",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "start",
                marginBottom: "1rem",
              }}
            >
              <div style={{ flex: 1, marginRight: "1rem" }}>
                <label style={{ display: "block", marginBottom: "0.35rem", fontSize: "0.875rem", color: "#4b5563", fontWeight: "bold" }}>
                  Issue title
                </label>
                <p style={{ margin: "0 0 0.5rem 0", fontSize: "0.8rem", color: "#6b7280" }}>
                  Short, problem-focused name (no solutions or "fix" wording).
                </p>
                <input
                  type="text"
                  value={finding.title}
                  onChange={(e) =>
                    updateFinding(finding.id, { title: e.target.value })
                  }
                  placeholder="e.g., Critical actions are hard to discover"
                  style={{
                    width: "100%",
                    padding: "0.75rem",
                    fontSize: "1.1rem",
                    fontWeight: "bold",
                    border: "1px solid #d1d5db",
                    borderRadius: "0.5rem",
                  }}
                />
              </div>
              <button
                onClick={() => deleteFinding(finding.id)}
                style={{
                  padding: "0.5rem 1rem",
                  background: "#ef4444",
                  color: "white",
                  border: "none",
                  borderRadius: "0.5rem",
                  cursor: "pointer",
                }}
              >
                Delete
              </button>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1rem" }}>
              <div>
                <label style={{ display: "block", marginBottom: "0.35rem", fontSize: "0.875rem", color: "#4b5563", fontWeight: "bold" }}>
                  Primary category affected
                </label>
                <p style={{ margin: "0 0 0.5rem 0", fontSize: "0.8rem", color: "#6b7280" }}>
                  Map this issue to the primary score category.
                </p>
                <select
                  value={finding.category}
                  onChange={(e) =>
                    updateFinding(finding.id, {
                      category: e.target.value as CategoryKey,
                    })
                  }
                  style={{
                    width: "100%",
                    padding: "0.5rem",
                    border: "1px solid #d1d5db",
                    borderRadius: "0.5rem",
                  }}
                >
                  {[
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
                  ].map((cat) => (
                    <option key={cat} value={cat}>
                      {formatCategoryName(cat)}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <label style={{ display: "block", marginBottom: "0.35rem", fontSize: "0.875rem", color: "#4b5563", fontWeight: "bold" }}>
              What's happening <span style={{ color: "#ef4444" }}>*</span>
            </label>
            <p style={{ margin: "0 0 0.5rem 0", fontSize: "0.8rem", color: !finding.description.trim() ? "#b91c1c" : "#6b7280" }}>
              {!finding.description.trim()
                ? "Required: describe the issue before saving or publishing."
                : "Describe the issue as it exists today. Be factual and observable."}
            </p>
            <textarea
              value={finding.description}
              onChange={(e) =>
                updateFinding(finding.id, { description: e.target.value })
              }
              placeholder="Describe the issue as it exists today. Be factual and observable."
              style={{
                width: "100%",
                minHeight: "100px",
                padding: "0.75rem",
                marginBottom: "1rem",
                border: !finding.description.trim()
                  ? "2px solid #ef4444"
                  : "1px solid #d1d5db",
                borderRadius: "0.5rem",
                fontFamily: "inherit",
              }}
            />

            <div style={{ marginBottom: "1rem" }}>
              <label style={{ display: "block", marginBottom: "0.35rem", fontSize: "0.875rem", color: "#4b5563", fontWeight: "bold" }}>
                If ignored
              </label>
              <p style={{ margin: "0 0 0.5rem 0", fontSize: "0.8rem", color: "#6b7280" }}>
                What negative outcome occurs if this is not addressed?
              </p>
              <textarea
                value={finding.ifIgnored || ""}
                onChange={(e) =>
                  updateFinding(finding.id, { ifIgnored: e.target.value })
                }
                placeholder="Describe the likely user or business impact if this issue is left unresolved."
                style={{
                  width: "100%",
                  minHeight: "80px",
                  padding: "0.75rem",
                  border: "1px solid #d1d5db",
                  borderRadius: "0.5rem",
                  fontFamily: "inherit",
                }}
              />
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1rem", marginBottom: "1rem" }}>
              <div>
                <label style={{ display: "block", marginBottom: "0.5rem", fontSize: "0.875rem", color: "#6b7280" }}>
                  Impact (1-5)
                </label>
                <input
                  type="number"
                  min="1"
                  max="5"
                  value={finding.impact}
                  onChange={(e) =>
                    updateFinding(finding.id, {
                      impact: parseInt(e.target.value) || 1,
                    })
                  }
                  style={{
                    width: "100%",
                    padding: "0.5rem",
                    border: "1px solid #d1d5db",
                    borderRadius: "0.5rem",
                  }}
                />
              </div>
              <div>
                <label style={{ display: "block", marginBottom: "0.5rem", fontSize: "0.875rem", color: "#6b7280" }}>
                  Effort (1-5)
                </label>
                <input
                  type="number"
                  min="1"
                  max="5"
                  value={finding.effort}
                  onChange={(e) =>
                    updateFinding(finding.id, {
                      effort: parseInt(e.target.value) || 1,
                    })
                  }
                  style={{
                    width: "100%",
                    padding: "0.5rem",
                    border: "1px solid #d1d5db",
                    borderRadius: "0.5rem",
                  }}
                />
              </div>
              <div>
                <label style={{ display: "block", marginBottom: "0.5rem", fontSize: "0.875rem", color: "#6b7280" }}>
                  Confidence (1-5)
                </label>
                <input
                  type="number"
                  min="1"
                  max="5"
                  value={finding.confidence}
                  onChange={(e) =>
                    updateFinding(finding.id, {
                      confidence: parseInt(e.target.value) || 1,
                    })
                  }
                  style={{
                    width: "100%",
                    padding: "0.5rem",
                    border: "1px solid #d1d5db",
                    borderRadius: "0.5rem",
                  }}
                />
              </div>
            </div>

            <label style={{ display: "block", margin: "0.5rem 0 0.35rem 0", fontSize: "0.875rem", color: "#4b5563", fontWeight: "bold" }}>
              Recommended direction
            </label>
            <p style={{ margin: "0 0 0.5rem 0", fontSize: "0.8rem", color: "#6b7280" }}>
              High-level direction for addressing the issue (not implementation steps).
            </p>
            <textarea
              value={finding.recommendation}
              onChange={(e) =>
                updateFinding(finding.id, { recommendation: e.target.value })
              }
              placeholder="High-level direction for addressing the issue (not step-by-step instructions)."
              style={{
                width: "100%",
                minHeight: "80px",
                padding: "0.75rem",
                border: "1px solid #d1d5db",
                borderRadius: "0.5rem",
                fontFamily: "inherit",
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

function formatCategoryName(category: string): string {
  return category
    .replace(/([A-Z])/g, " $1")
    .replace(/^./, (str) => str.toUpperCase())
    .trim();
}

function createEmptyReport(): Report {
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

  return {
    id: `report-${Date.now()}`,
    meta: {
      productName: "New Product",
      reviewDate: new Date().toISOString().split("T")[0],
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
  };
}
