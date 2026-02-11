import { Report, ReportStatus } from "../types";
import { FileText, Eye, CheckCircle, Clock, Calendar } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface ClientReportsListProps {
  reports: Report[];
}

export default function ClientReportsList({ reports }: ClientReportsListProps) {
  const navigate = useNavigate();

  const getStatusIcon = (status: ReportStatus) => {
    if (status === "published") {
      return <CheckCircle size={15} style={{ color: "var(--accent-success)" }} />;
    }
    return <Clock size={15} style={{ color: "var(--accent-warning)" }} />;
  };

  const getStatusStyle = (status: ReportStatus): React.CSSProperties => {
    if (status === "published") {
      return { background: "var(--accent-success-soft)", color: "var(--accent-success-text)" };
    }
    return { background: "var(--accent-warning-soft)", color: "var(--accent-warning-text)" };
  };

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    } catch {
      return dateString;
    }
  };

  return (
    <div
      style={{
        minHeight: "calc(100vh - 3.5rem)",
        background: "var(--surface-ground)",
        padding: "2rem",
      }}
    >
      <div
        style={{
          maxWidth: "var(--canvas-max-width)",
          margin: "0 auto",
        }}
      >
        {/* Header */}
        <div
          style={{
            marginBottom: "2rem",
          }}
        >
          <h1
            style={{
              fontSize: "var(--text-3xl)",
              fontWeight: 700,
              color: "var(--text-primary)",
              marginBottom: "0.375rem",
              letterSpacing: "var(--tracking-tight)",
            }}
          >
            My Reports
          </h1>
          <p style={{ color: "var(--text-tertiary)", fontSize: "var(--text-base)" }}>
            Select a report to view your product audit details
          </p>
        </div>

        {/* Reports Grid */}
        {reports.length === 0 ? (
          <div
            style={{
              background: "var(--surface-card)",
              padding: "3rem",
              borderRadius: "var(--radius-md)",
              textAlign: "center",
              border: "1px solid var(--border-default)",
              boxShadow: "var(--shadow-xs)",
            }}
          >
            <FileText size={44} style={{ color: "var(--text-muted)", marginBottom: "0.875rem" }} />
            <p style={{ color: "var(--text-tertiary)", fontSize: "var(--text-lg)" }}>
              No reports available. Please contact an administrator.
            </p>
          </div>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))",
              gap: "1rem",
            }}
          >
            {reports.map((report) => {
              const statusStyle = getStatusStyle(report.status);
              return (
                <div
                  key={report.id}
                  style={{
                    background: "var(--surface-card)",
                    borderRadius: "var(--radius-md)",
                    border: "1px solid var(--border-default)",
                    padding: "1.375rem 1.5rem",
                    cursor: "pointer",
                    transition: "all var(--duration-normal) var(--ease-out)",
                    boxShadow: "var(--shadow-sm)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = "var(--shadow-md)";
                    e.currentTarget.style.transform = "translateY(-1px)";
                    e.currentTarget.style.borderColor = "var(--border-strong)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = "var(--shadow-sm)";
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.borderColor = "var(--border-default)";
                  }}
                  onClick={() => navigate(`/client/report/${report.id}`)}
                >
                  {/* Report Header */}
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "start",
                      marginBottom: "0.875rem",
                    }}
                  >
                    <div style={{ flex: 1 }}>
                      <h3
                        style={{
                          fontSize: "var(--text-lg)",
                          fontWeight: 600,
                          color: "var(--text-primary)",
                          marginBottom: "0.35rem",
                          letterSpacing: "var(--tracking-tight)",
                        }}
                      >
                        {report.meta.productName}
                      </h3>
                      {report.meta.clientName && (
                        <p
                          style={{
                            fontSize: "var(--text-sm)",
                            color: "var(--text-tertiary)",
                          }}
                        >
                          {report.meta.clientName}
                        </p>
                      )}
                    </div>
                    {/* Status badge — informational */}
                    <span
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "0.35rem",
                        padding: "0.2rem 0.6rem",
                        borderRadius: "var(--radius-full)",
                        ...statusStyle,
                        fontSize: "var(--text-xs)",
                        fontWeight: 600,
                        textTransform: "uppercase",
                        letterSpacing: "var(--tracking-wide)",
                      }}
                    >
                      {getStatusIcon(report.status)}
                      {report.status}
                    </span>
                  </div>

                  {/* Review Date */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.4rem",
                      fontSize: "var(--text-sm)",
                      color: "var(--text-tertiary)",
                      marginBottom: "0.875rem",
                    }}
                  >
                    <Calendar size={14} style={{ color: "var(--text-muted)" }} />
                    <span>Reviewed: {formatDate(report.meta.reviewDate)}</span>
                  </div>

                  {/* Overall Score */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5rem",
                      marginBottom: "0.875rem",
                      padding: "0.625rem 0.875rem",
                      background: "var(--surface-sunken)",
                      borderRadius: "var(--radius-sm)",
                    }}
                  >
                    <span style={{ fontSize: "var(--text-sm)", color: "var(--text-muted)" }}>
                      Overall Score:
                    </span>
                    <span
                      style={{
                        fontSize: "var(--text-xl)",
                        fontWeight: 700,
                        color: "var(--text-primary)",
                        letterSpacing: "-0.02em",
                      }}
                    >
                      {report.overallScore?.toFixed(1) || "N/A"}
                    </span>
                    <span style={{ fontSize: "var(--text-sm)", color: "var(--text-muted)" }}>
                      / 10
                    </span>
                  </div>

                  {/* Metadata */}
                  <div
                    style={{
                      fontSize: "var(--text-sm)",
                      color: "var(--text-tertiary)",
                      marginBottom: "1.25rem",
                    }}
                  >
                    <div>
                      Findings: {report.findings.length}
                    </div>
                  </div>

                  {/* View Button — feels pressable */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/client/report/${report.id}`);
                    }}
                    style={{
                      width: "100%",
                      padding: "0.6rem 1rem",
                      background: "var(--accent-success)",
                      color: "white",
                      border: "none",
                      borderRadius: "var(--radius-sm)",
                      cursor: "pointer",
                      fontSize: "var(--text-sm)",
                      fontWeight: 600,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "0.4rem",
                      transition: "all var(--duration-fast) ease",
                      boxShadow: "var(--shadow-xs)",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = "#258a66";
                      e.currentTarget.style.boxShadow = "var(--shadow-sm)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "var(--accent-success)";
                      e.currentTarget.style.boxShadow = "var(--shadow-xs)";
                    }}
                    onMouseDown={(e) => {
                      e.currentTarget.style.transform = "scale(0.97)";
                    }}
                    onMouseUp={(e) => {
                      e.currentTarget.style.transform = "scale(1)";
                    }}
                  >
                    <Eye size={15} />
                    View Report
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
