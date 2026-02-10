import { useState } from "react";
import { Client } from "../types";
import { Building2, Plus, Mail, Calendar, FileText, RefreshCw } from "lucide-react";
import { useReports } from "../context/ReportsContext";
import CreateClientModal from "./CreateClientModal";

interface ClientsListProps {
  clients: Client[];
  onSelectClient?: (clientId: string) => void;
  onCreateReportForClient?: (clientId: string) => void;
}

export default function ClientsList({
  clients,
  onSelectClient,
  onCreateReportForClient,
}: ClientsListProps) {
  const { reports, refreshData, loading } = useReports();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  
  const getReportsByClient = (clientId: string) => {
    return reports.filter((r) => r.clientId === clientId);
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
              Clients
            </h1>
            <p style={{ color: "#6b7280", fontSize: "1rem" }}>
              Manage clients and their reports. Create new clients or they will be created automatically when you create a report with their email.
            </p>
          </div>
          <div style={{ display: "flex", gap: "0.75rem" }}>
            <button
              onClick={async () => {
                setRefreshing(true);
                try {
                  await refreshData();
                } finally {
                  setRefreshing(false);
                }
              }}
              disabled={refreshing || loading}
              style={{
                padding: "0.75rem 1.5rem",
                background: refreshing || loading ? "#9ca3af" : "#10b981",
                color: "white",
                border: "none",
                borderRadius: "0.5rem",
                cursor: refreshing || loading ? "not-allowed" : "pointer",
                fontSize: "1rem",
                fontWeight: "bold",
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
              }}
            >
              <RefreshCw 
                size={20} 
                style={{ 
                  animation: refreshing ? "spin 1s linear infinite" : undefined,
                  transform: refreshing ? undefined : "rotate(0deg)"
                }} 
              />
              {refreshing ? "Refreshing..." : "Refresh"}
            </button>
            <button
              onClick={() => setIsCreateModalOpen(true)}
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
              <Plus size={20} />
              Create Client
            </button>
          </div>
        </div>

        {/* Create Client Modal */}
        <CreateClientModal
          isOpen={isCreateModalOpen}
          onClose={() => setIsCreateModalOpen(false)}
          onSuccess={() => {
            // Modal will close and data will refresh via real-time subscription
          }}
        />

        {/* Clients Grid */}
        {clients.length === 0 ? (
          <div
            style={{
              background: "white",
              padding: "3rem",
              borderRadius: "0.5rem",
              textAlign: "center",
              border: "1px solid #e5e7eb",
            }}
          >
            <Building2 size={48} style={{ color: "#9ca3af", marginBottom: "1rem" }} />
            <p style={{ color: "#6b7280", fontSize: "1.125rem", marginBottom: "0.5rem" }}>
              No clients yet.
            </p>
            <p style={{ color: "#6b7280", fontSize: "0.875rem" }}>
              Clients are created automatically when you create a report with their email.
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
            {clients.map((client) => {
              const reports = getReportsByClient(client.id);
              return (
                <div
                  key={client.id}
                  style={{
                    background: "white",
                    borderRadius: "0.5rem",
                    border: "1px solid #e5e7eb",
                    padding: "1.5rem",
                    boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                  }}
                >
                  {/* Client Header */}
                  <div style={{ marginBottom: "1rem" }}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "start",
                        justifyContent: "space-between",
                        marginBottom: "0.5rem",
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
                          {client.name}
                        </h3>
                        {client.company && (
                          <p
                            style={{
                              fontSize: "0.875rem",
                              color: "#6b7280",
                            }}
                          >
                            {client.company}
                          </p>
                        )}
                      </div>
                      <div
                        style={{
                          fontSize: "0.75rem",
                          color: "#9ca3af",
                          fontFamily: "monospace",
                        }}
                      >
                        {client.id}
                      </div>
                    </div>
                  </div>

                  {/* Client Info */}
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "0.5rem",
                      marginBottom: "1rem",
                      padding: "1rem",
                      background: "#f9fafb",
                      borderRadius: "0.5rem",
                    }}
                  >
                    {client.email && (
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "0.5rem",
                          fontSize: "0.875rem",
                          color: "#6b7280",
                        }}
                      >
                        <Mail size={16} />
                        {client.email}
                      </div>
                    )}
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.5rem",
                        fontSize: "0.875rem",
                        color: "#6b7280",
                      }}
                    >
                      <Calendar size={16} />
                      Created: {new Date(client.createdAt).toLocaleDateString()}
                    </div>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.5rem",
                        fontSize: "0.875rem",
                        color: "#6b7280",
                      }}
                    >
                      <FileText size={16} />
                      {reports.length} {reports.length === 1 ? "report" : "reports"}
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
                    {onCreateReportForClient && (
                      <button
                        onClick={() => onCreateReportForClient(client.id)}
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
                        <Plus size={16} />
                        New Report
                      </button>
                    )}
                    {onSelectClient && (
                      <button
                        onClick={() => onSelectClient(client.id)}
                        style={{
                          padding: "0.5rem 1rem",
                          background: "#f3f4f6",
                          color: "#1f2937",
                          border: "none",
                          borderRadius: "0.5rem",
                          cursor: "pointer",
                          fontSize: "0.875rem",
                        }}
                      >
                        View Reports
                      </button>
                    )}
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
