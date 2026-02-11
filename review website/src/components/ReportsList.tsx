import { Report, ReportStatus, Client } from "../types";
import { FileText, Edit, Eye, CheckCircle, Clock, Building2, Mail } from "lucide-react";
import { useReports } from "../context/ReportsContext";

interface ReportsListProps {
  reports: Report[];
  clients: Client[];
  onSelectReport: (reportId: string) => void;
  onCreateNew?: () => void;
}

export default function ReportsList({
  reports,
  clients,
  onSelectReport,
  onCreateNew,
}: ReportsListProps) {
  const { getClientById } = useReports();

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
          maxWidth: "var(--canvas-max-width)",
          margin: "0 auto",
        }}
      >
        {/* Header */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "2rem",
          }}
        >
          <div>
            <h1
              style={{
                fontSize: "var(--text-3xl)",
                fontWeight: 700,
                color: "var(--text-primary)",
                marginBottom: "0.375rem",
                letterSpacing: "var(--tracking-tight)",
              }}
            >
              Reports
            </h1>
            <p style={{ color: "var(--text-tertiary)", fontSize: "var(--text-base)" }}>
              Manage and edit product audit reports
            </p>
          </div>
          {onCreateNew && (
            <button
              onClick={onCreateNew}
              style={{
                padding: "0.6rem 1.25rem",
                background: "var(--accent-primary)",
                color: "white",
                border: "none",
                borderRadius: "var(--radius-sm)",
                cursor: "pointer",
                fontSize: "var(--text-sm)",
                fontWeight: 600,
                display: "flex",
                alignItems: "center",
                gap: "0.4rem",
                boxShadow: "var(--shadow-sm)",
                transition: "all var(--duration-fast) ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "var(--accent-primary-hover)";
                e.currentTarget.style.boxShadow = "var(--shadow-md)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "var(--accent-primary)";
                e.currentTarget.style.boxShadow = "var(--shadow-sm)";
              }}
              onMouseDown={(e) => {
                e.currentTarget.style.transform = "scale(0.97)";
              }}
              onMouseUp={(e) => {
                e.currentTarget.style.transform = "scale(1)";
              }}
            >
              <FileText size={16} />
              New Report
            </button>
          )}
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
              No reports yet. Create your first report to get started.
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
                  onClick={() => onSelectReport(report.id)}
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
                          marginBottom: "0.25rem",
                          letterSpacing: "var(--tracking-tight)",
                        }}
                      >
                        {report.meta.productName}
                      </h3>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "0.4rem",
                          marginBottom: "0.2rem",
                        }}
                      >
                        <Building2 size={14} style={{ color: "var(--text-muted)" }} />
                        <p
                          style={{
                            fontSize: "var(--text-sm)",
                            color: "var(--text-tertiary)",
                            fontWeight: 500,
                          }}
                        >
                          Report for {getClientById(report.clientId)?.name || "Unknown Client"}
                        </p>
                      </div>
                      {getClientById(report.clientId)?.company && (
                        <p
                          style={{
                            fontSize: "var(--text-xs)",
                            color: "var(--text-muted)",
                            marginLeft: "1.35rem",
                          }}
                        >
                          {getClientById(report.clientId)?.company}
                        </p>
                      )}
                      {getClientById(report.clientId)?.email && (
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "0.4rem",
                            marginTop: "0.35rem",
                            marginLeft: "1.35rem",
                          }}
                        >
                          <Mail size={12} style={{ color: "var(--text-muted)" }} />
                          <p
                            style={{
                              fontSize: "var(--text-xs)",
                              color: "var(--text-muted)",
                            }}
                          >
                            {getClientById(report.clientId)?.email}
                          </p>
                        </div>
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

                  {/* Report ID */}
                  <div
                    style={{
                      fontSize: "var(--text-xs)",
                      color: "var(--text-muted)",
                      marginBottom: "0.875rem",
                      fontFamily: "var(--font-mono)",
                    }}
                  >
                    ID: {report.id}
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
                      lineHeight: "var(--leading-relaxed)",
                    }}
                  >
                    <div>Review Date: {report.meta.reviewDate}</div>
                    <div>
                      Findings: {report.findings.length}
                    </div>
                  </div>

                  {/* Actions — buttons feel pressable */}
                  <div
                    style={{
                      display: "flex",
                      gap: "0.5rem",
                      paddingTop: "0.875rem",
                      borderTop: "1px solid var(--border-subtle)",
                    }}
                  >
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectReport(report.id);
                      }}
                      style={{
                        flex: 1,
                        padding: "0.5rem 0.875rem",
                        background: "var(--accent-primary)",
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
                        e.currentTarget.style.background = "var(--accent-primary-hover)";
                        e.currentTarget.style.boxShadow = "var(--shadow-sm)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = "var(--accent-primary)";
                        e.currentTarget.style.boxShadow = "var(--shadow-xs)";
                      }}
                      onMouseDown={(e) => {
                        e.currentTarget.style.transform = "scale(0.97)";
                      }}
                      onMouseUp={(e) => {
                        e.currentTarget.style.transform = "scale(1)";
                      }}
                    >
                      <Edit size={14} />
                      Edit
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                      }}
                      style={{
                        padding: "0.5rem 0.75rem",
                        background: "var(--surface-sunken)",
                        color: "var(--text-secondary)",
                        border: "1px solid var(--border-default)",
                        borderRadius: "var(--radius-sm)",
                        cursor: "pointer",
                        fontSize: "var(--text-sm)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "0.35rem",
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
                      <Eye size={14} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
