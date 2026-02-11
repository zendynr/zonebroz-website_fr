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
      return <CheckCircle size={18} style={{ color: "#10b981" }} />;
    }
    return <Clock size={18} style={{ color: "#f59e0b" }} />;
  };

  const getStatusColor = (status: ReportStatus) => {
    if (status === "published") {
      return { background: "#d1fae5", color: "#065f46" };
    }
    return { background: "#fef3c7", color: "#92400e" };
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
        minHeight: "calc(100vh - 4rem)",
        background: "#f9fafb",
        padding: "2rem",
      }}
    >
      <div
        style={{
          maxWidth: "1400px",
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
              fontSize: "2rem",
              fontWeight: "bold",
              color: "#1f2937",
              marginBottom: "0.5rem",
            }}
          >
            My Reports
          </h1>
          <p style={{ color: "#6b7280", fontSize: "1rem" }}>
            Select a report to view your product audit details
          </p>
        </div>

        {/* Reports Grid */}
        {reports.length === 0 ? (
          <div
            style={{
              background: "white",
              padding: "3rem",
              borderRadius: "0.5rem",
              textAlign: "center",
              border: "1px solid #e5e7eb",
            }}
          >
            <FileText size={48} style={{ color: "#9ca3af", marginBottom: "1rem" }} />
            <p style={{ color: "#6b7280", fontSize: "1.125rem" }}>
              No reports available. Please contact an administrator.
            </p>
          </div>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(350px, 1fr))",
              gap: "1.5rem",
            }}
          >
            {reports.map((report) => {
              const statusStyle = getStatusColor(report.status);
              return (
                <div
                  key={report.id}
                  style={{
                    background: "white",
                    borderRadius: "0.5rem",
                    border: "1px solid #e5e7eb",
                    padding: "1.5rem",
                    cursor: "pointer",
                    transition: "all 0.2s",
                    boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = "0 4px 6px rgba(0,0,0,0.1)";
                    e.currentTarget.style.transform = "translateY(-2px)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = "0 1px 3px rgba(0,0,0,0.1)";
                    e.currentTarget.style.transform = "translateY(0)";
                  }}
                  onClick={() => navigate(`/client/report/${report.id}`)}
                >
                  {/* Report Header */}
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "start",
                      marginBottom: "1rem",
                    }}
                  >
                    <div style={{ flex: 1 }}>
                      <h3
                        style={{
                          fontSize: "1.25rem",
                          fontWeight: "bold",
                          color: "#1f2937",
                          marginBottom: "0.5rem",
                        }}
                      >
                        {report.meta.productName}
                      </h3>
                      {report.meta.clientName && (
                        <p
                          style={{
                            fontSize: "0.875rem",
                            color: "#6b7280",
                            marginBottom: "0.25rem",
                          }}
                        >
                          {report.meta.clientName}
                        </p>
                      )}
                    </div>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.5rem",
                        padding: "0.25rem 0.75rem",
                        borderRadius: "0.5rem",
                        ...statusStyle,
                        fontSize: "0.75rem",
                        fontWeight: "bold",
                        textTransform: "uppercase",
                      }}
                    >
                      {getStatusIcon(report.status)}
                      {report.status}
                    </div>
                  </div>

                  {/* Review Date */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5rem",
                      fontSize: "0.875rem",
                      color: "#6b7280",
                      marginBottom: "1rem",
                    }}
                  >
                    <Calendar size={16} style={{ color: "#9ca3af" }} />
                    <span>Reviewed: {formatDate(report.meta.reviewDate)}</span>
                  </div>

                  {/* Overall Score */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5rem",
                      marginBottom: "1rem",
                      padding: "0.75rem",
                      background: "#f3f4f6",
                      borderRadius: "0.5rem",
                    }}
                  >
                    <span style={{ fontSize: "0.875rem", color: "#6b7280" }}>
                      Overall Score:
                    </span>
                    <span
                      style={{
                        fontSize: "1.5rem",
                        fontWeight: "bold",
                        color: "#1f2937",
                      }}
                    >
                      {report.overallScore?.toFixed(1) || "N/A"}
                    </span>
                    <span style={{ fontSize: "0.875rem", color: "#6b7280" }}>
                      / 10
                    </span>
                  </div>

                  {/* Metadata */}
                  <div
                    style={{
                      fontSize: "0.875rem",
                      color: "#6b7280",
                      marginBottom: "1.5rem",
                    }}
                  >
                    <div>
                      Findings: {report.findings.length}
                    </div>
                  </div>

                  {/* View Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/client/report/${report.id}`);
                    }}
                    style={{
                      width: "100%",
                      padding: "0.75rem 1rem",
                      background: "#10b981",
                      color: "white",
                      border: "none",
                      borderRadius: "0.5rem",
                      cursor: "pointer",
                      fontSize: "0.875rem",
                      fontWeight: "bold",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "0.5rem",
                      transition: "background 0.2s",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = "#059669";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "#10b981";
                    }}
                  >
                    <Eye size={16} />
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
