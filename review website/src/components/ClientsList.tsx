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
              Clients
            </h1>
            <p style={{ color: "var(--text-tertiary)", fontSize: "var(--text-base)", maxWidth: "560px", lineHeight: "var(--leading-normal)" }}>
              Manage clients and their reports. Create new clients or they will be created automatically when you create a report with their email.
            </p>
          </div>
          <div style={{ display: "flex", gap: "0.5rem" }}>
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
                padding: "0.6rem 1.125rem",
                background: refreshing || loading ? "var(--text-muted)" : "var(--surface-sunken)",
                color: refreshing || loading ? "white" : "var(--text-secondary)",
                border: "1px solid var(--border-default)",
                borderRadius: "var(--radius-sm)",
                cursor: refreshing || loading ? "not-allowed" : "pointer",
                fontSize: "var(--text-sm)",
                fontWeight: 600,
                display: "flex",
                alignItems: "center",
                gap: "0.4rem",
                transition: "all var(--duration-fast) ease",
              }}
              onMouseEnter={(e) => {
                if (!refreshing && !loading) {
                  e.currentTarget.style.background = "var(--surface-ground)";
                  e.currentTarget.style.borderColor = "var(--border-strong)";
                }
              }}
              onMouseLeave={(e) => {
                if (!refreshing && !loading) {
                  e.currentTarget.style.background = "var(--surface-sunken)";
                  e.currentTarget.style.borderColor = "var(--border-default)";
                }
              }}
            >
              <RefreshCw 
                size={16} 
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
              <Plus size={16} />
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
              background: "var(--surface-card)",
              padding: "3rem",
              borderRadius: "var(--radius-md)",
              textAlign: "center",
              border: "1px solid var(--border-default)",
              boxShadow: "var(--shadow-xs)",
            }}
          >
            <Building2 size={44} style={{ color: "var(--text-muted)", marginBottom: "0.875rem" }} />
            <p style={{ color: "var(--text-tertiary)", fontSize: "var(--text-lg)", marginBottom: "0.35rem" }}>
              No clients yet.
            </p>
            <p style={{ color: "var(--text-muted)", fontSize: "var(--text-sm)" }}>
              Clients are created automatically when you create a report with their email.
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
            {clients.map((client) => {
              const clientReports = getReportsByClient(client.id);
              return (
                <div
                  key={client.id}
                  style={{
                    background: "var(--surface-card)",
                    borderRadius: "var(--radius-md)",
                    border: "1px solid var(--border-default)",
                    padding: "1.375rem 1.5rem",
                    boxShadow: "var(--shadow-sm)",
                    transition: "box-shadow var(--duration-normal) var(--ease-out)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = "var(--shadow-md)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = "var(--shadow-sm)";
                  }}
                >
                  {/* Client Header */}
                  <div style={{ marginBottom: "0.875rem" }}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "start",
                        justifyContent: "space-between",
                        marginBottom: "0.35rem",
                      }}
                    >
                      <div style={{ flex: 1 }}>
                        <h3
                          style={{
                            fontSize: "var(--text-lg)",
                            fontWeight: 600,
                            color: "var(--text-primary)",
                            marginBottom: "0.2rem",
                            letterSpacing: "var(--tracking-tight)",
                          }}
                        >
                          {client.name}
                        </h3>
                        {client.company && (
                          <p
                            style={{
                              fontSize: "var(--text-sm)",
                              color: "var(--text-tertiary)",
                            }}
                          >
                            {client.company}
                          </p>
                        )}
                      </div>
                      <div
                        style={{
                          fontSize: "var(--text-xs)",
                          color: "var(--text-muted)",
                          fontFamily: "var(--font-mono)",
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
                      gap: "0.4rem",
                      marginBottom: "1rem",
                      padding: "0.875rem 1rem",
                      background: "var(--surface-sunken)",
                      borderRadius: "var(--radius-sm)",
                    }}
                  >
                    {client.email && (
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "0.45rem",
                          fontSize: "var(--text-sm)",
                          color: "var(--text-tertiary)",
                        }}
                      >
                        <Mail size={14} style={{ color: "var(--text-muted)" }} />
                        {client.email}
                      </div>
                    )}
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.45rem",
                        fontSize: "var(--text-sm)",
                        color: "var(--text-tertiary)",
                      }}
                    >
                      <Calendar size={14} style={{ color: "var(--text-muted)" }} />
                      Created: {new Date(client.createdAt).toLocaleDateString()}
                    </div>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.45rem",
                        fontSize: "var(--text-sm)",
                        color: "var(--text-tertiary)",
                      }}
                    >
                      <FileText size={14} style={{ color: "var(--text-muted)" }} />
                      {clientReports.length} {clientReports.length === 1 ? "report" : "reports"}
                    </div>
                  </div>

                  {/* Actions */}
                  <div
                    style={{
                      display: "flex",
                      gap: "0.5rem",
                      paddingTop: "0.875rem",
                      borderTop: "1px solid var(--border-subtle)",
                    }}
                  >
                    {onCreateReportForClient && (
                      <button
                        onClick={() => onCreateReportForClient(client.id)}
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
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = "var(--accent-primary)";
                        }}
                        onMouseDown={(e) => {
                          e.currentTarget.style.transform = "scale(0.97)";
                        }}
                        onMouseUp={(e) => {
                          e.currentTarget.style.transform = "scale(1)";
                        }}
                      >
                        <Plus size={14} />
                        New Report
                      </button>
                    )}
                    {onSelectClient && (
                      <button
                        onClick={() => onSelectClient(client.id)}
                        style={{
                          padding: "0.5rem 0.875rem",
                          background: "var(--surface-sunken)",
                          color: "var(--text-secondary)",
                          border: "1px solid var(--border-default)",
                          borderRadius: "var(--radius-sm)",
                          cursor: "pointer",
                          fontSize: "var(--text-sm)",
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
