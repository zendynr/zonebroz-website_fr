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
                fontSize: "2rem",
                fontWeight: "bold",
                color: "#1f2937",
                marginBottom: "0.5rem",
              }}
            >
              Reports
            </h1>
            <p style={{ color: "#6b7280", fontSize: "1rem" }}>
              Manage and edit product audit reports
            </p>
          </div>
          {onCreateNew && (
            <button
              onClick={onCreateNew}
              style={{
                padding: "0.75rem 1.5rem",
                background: "#3b82f6",
                color: "white",
                border: "none",
                borderRadius: "0.5rem",
                cursor: "pointer",
                fontSize: "1rem",
                fontWeight: "bold",
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
              }}
            >
              <FileText size={20} />
              New Report
            </button>
          )}
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
              No reports yet. Create your first report to get started.
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
                  onClick={() => onSelectReport(report.id)}
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
                          marginBottom: "0.25rem",
                        }}
                      >
                        {report.meta.productName}
                      </h3>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "0.5rem",
                          marginBottom: "0.25rem",
                        }}
                      >
                        <Building2 size={16} style={{ color: "#6b7280" }} />
                        <p
                          style={{
                            fontSize: "0.875rem",
                            color: "#6b7280",
                            fontWeight: "500",
                          }}
                        >
                          Report for {getClientById(report.clientId)?.name || "Unknown Client"}
                        </p>
                      </div>
                      {getClientById(report.clientId)?.company && (
                        <p
                          style={{
                            fontSize: "0.75rem",
                            color: "#9ca3af",
                            marginLeft: "1.5rem",
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
                            gap: "0.5rem",
                            marginTop: "0.5rem",
                            marginLeft: "1.5rem",
                          }}
                        >
                          <Mail size={14} style={{ color: "#9ca3af" }} />
                          <p
                            style={{
                              fontSize: "0.75rem",
                              color: "#9ca3af",
                            }}
                          >
                            {getClientById(report.clientId)?.email}
                          </p>
                        </div>
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

                  {/* Report ID */}
                  <div
                    style={{
                      fontSize: "0.75rem",
                      color: "#9ca3af",
                      marginBottom: "1rem",
                      fontFamily: "monospace",
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
                    <div>Review Date: {report.meta.reviewDate}</div>
                    <div>
                      Findings: {report.findings.length}
                    </div>
                  </div>

                  {/* Actions */}
                  <div
                    style={{
                      display: "flex",
                      gap: "0.5rem",
                      paddingTop: "1rem",
                      borderTop: "1px solid #e5e7eb",
                    }}
                  >
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectReport(report.id);
                      }}
                      style={{
                        flex: 1,
                        padding: "0.5rem 1rem",
                        background: "#3b82f6",
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
                      }}
                    >
                      <Edit size={16} />
                      Edit
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        // Preview action could be added here
                      }}
                      style={{
                        padding: "0.5rem 1rem",
                        background: "#f3f4f6",
                        color: "#1f2937",
                        border: "none",
                        borderRadius: "0.5rem",
                        cursor: "pointer",
                        fontSize: "0.875rem",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "0.5rem",
                      }}
                    >
                      <Eye size={16} />
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
