import { useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate, useNavigate, useParams } from "react-router-dom";
import { UserProvider, useUser } from "./context/UserContext";
import { PrintProvider, usePrint } from "./context/PrintContext";
import { ReportsProvider, useReports } from "./context/ReportsContext";
import ReportViewer from "./components/ReportViewer";
import AdminPanel from "./components/AdminPanel";
import ReportsList from "./components/ReportsList";
import ClientsList from "./components/ClientsList";
import CreateReport from "./components/CreateReport";
import AdminHeader from "./components/AdminHeader";
import ClientHeader from "./components/ClientHeader";
import ClientReportsList from "./components/ClientReportsList";
import Login from "./components/Login";
import { Report, Client } from "./types";
import { ArrowLeft } from "lucide-react";

function AppContent() {
  const { currentUser, isAuthenticated, loading: authLoading } = useUser();
  const { isPrintMode } = usePrint();
  const navigate = useNavigate();
  const { reports, clients, addClient, addReport, updateReport, loading: reportsLoading } = useReports();

  // Show loading only during initial auth check
  if (authLoading) {
    return (
      <div style={{ 
        display: "flex", 
        alignItems: "center", 
        justifyContent: "center", 
        minHeight: "100vh",
        fontSize: "var(--text-md)",
        color: "var(--text-muted)",
        background: "var(--surface-ground)",
        fontFamily: "var(--font-sans)",
      }}>
        Loading...
      </div>
    );
  }

  return (
    <div style={{ position: "relative", minHeight: "100vh" }}>
      {/* Main Content */}
      <div style={{ marginTop: isPrintMode ? "0" : "3.5rem" }}>
        <Routes>
          {/* Admin Login Route */}
          <Route path="/admin/login" element={<Login />} />
          
          {/* Client Login Route */}
          <Route path="/client/login" element={<Login />} />

          {/* Admin Routes - All under /admin/* */}
          <Route
            path="/admin/*"
            element={
              !isAuthenticated ? (
                <Navigate to="/admin/login" replace />
              ) : currentUser.role === "admin" ? (
                <AdminLayout
                  reports={reports}
                  clients={clients}
                  addClient={addClient}
                  addReport={addReport}
                  updateReport={updateReport}
                />
              ) : (
                <Navigate to="/admin/login" replace />
              )
            }
          />

          {/* Client Routes - All under /client/* (excluding /client/login which is handled above) */}
          <Route
            path="/client/*"
            element={
              !isAuthenticated ? (
                <Navigate to="/client/login" replace />
              ) : currentUser.role === "client" ? (
                <ClientLayout />
              ) : (
                <Navigate to="/client/login" replace />
              )
            }
          />

          {/* Root redirect */}
          <Route
            path="/"
            element={
              !isAuthenticated ? (
                <Navigate to="/admin/login" replace />
              ) : currentUser.role === "admin" ? (
                <Navigate to="/admin/reports" replace />
              ) : currentUser.role === "client" ? (
                <Navigate to="/client/report" replace />
              ) : (
                <Navigate to="/admin/login" replace />
              )
            }
          />
        </Routes>
      </div>
    </div>
  );
}

// Admin Layout Component
function AdminLayout({
  reports,
  clients,
  addClient,
  addReport,
  updateReport,
}: {
  reports: Report[];
  clients: Client[];
  addClient: (client: Omit<Client, "id" | "createdAt">, password: string) => Promise<Client>;
  addReport: (report: Report) => Promise<Report>;
  updateReport: (report: Report) => Promise<void>;
}) {
  const navigate = useNavigate();
  const { isPrintMode } = usePrint();

  return (
    <>
      <AdminHeader />
      <div style={{ marginTop: isPrintMode ? "0" : "3.5rem" }}>
        <Routes>
          <Route
            path="clients"
            element={
              <ClientsList
                clients={clients}
                onCreateReportForClient={(clientId) => {
                  const client = clients.find((c) => c.id === clientId);
                  if (client?.email) {
                    navigate(`/admin/reports/new?email=${encodeURIComponent(client.email)}`);
                  } else {
                    navigate("/admin/reports/new");
                  }
                }}
                onSelectClient={(clientId) => {
                  const clientReports = reports.filter((r) => r.clientId === clientId);
                  if (clientReports.length > 0) {
                    navigate(`/admin/reports?clientId=${clientId}`);
                  } else {
                    const client = clients.find((c) => c.id === clientId);
                    if (client?.email) {
                      navigate(`/admin/reports/new?email=${encodeURIComponent(client.email)}`);
                    } else {
                      navigate("/admin/reports/new");
                    }
                  }
                }}
              />
            }
          />
          <Route
            path="reports/new"
            element={<CreateReport onSave={addReport} />}
          />
          <Route
            path="reports/:reportId"
            element={<AdminReportEditor onSave={updateReport} />}
          />
          <Route
            path="reports"
            element={
              <ReportsList
                reports={reports}
                clients={clients}
                onSelectReport={(reportId) => navigate(`/admin/reports/${reportId}`)}
                onCreateNew={() => navigate("/admin/reports/new")}
              />
            }
          />
          <Route
            path="*"
            element={<Navigate to="/admin/reports" replace />}
          />
        </Routes>
      </div>
    </>
  );
}

// Client Layout Component - View Only
function ClientLayout() {
  const { currentUser } = useUser();
  const { getReportById, getReportsByClientEmail } = useReports();
  const { isPrintMode } = usePrint();

  // Get all reports for the client based on their email
  const clientReports = currentUser.email
    ? getReportsByClientEmail(currentUser.email)
    : [];

  return (
    <>
      <ClientHeader />
      <div style={{ marginTop: isPrintMode ? "0" : "3.5rem" }}>
        <Routes>
          <Route
            path="report/:reportId"
            element={<ClientReportViewer />}
          />
          <Route
            path="report"
            element={
              clientReports.length > 0 ? (
                <ClientReportsList reports={clientReports} />
              ) : (
                <div style={{ padding: "2rem", textAlign: "center" }}>
                  <p>No reports available. Please contact an administrator.</p>
                </div>
              )
            }
          />
          <Route
            path="*"
            element={
              clientReports.length > 0 ? (
                <Navigate to="/client/report" replace />
              ) : (
                <div style={{ padding: "2rem", textAlign: "center" }}>
                  <p>No reports available. Please contact an administrator.</p>
                </div>
              )
            }
          />
        </Routes>
      </div>
    </>
  );
}

// Client Report Viewer Component - handles report viewing with access control
function ClientReportViewer() {
  const { reportId } = useParams<{ reportId: string }>();
  const { currentUser } = useUser();
  const { getReportById, getReportsByClientEmail } = useReports();
  const navigate = useNavigate();

  // Get all reports for the client to verify access
  const clientReports = currentUser.email
    ? getReportsByClientEmail(currentUser.email)
    : [];
  
  const report = reportId ? getReportById(reportId) : null;

  // Check if the client has access to this report
  const hasAccess = report && clientReports.some((r) => r.id === reportId);

  if (!report) {
    return (
      <div style={{ padding: "2rem", textAlign: "center" }}>
        <p>Report not found.</p>
        <button
          onClick={() => navigate("/client/report")}
          style={{
            marginTop: "1rem",
            padding: "0.6rem 1.25rem",
            background: "var(--accent-success)",
            color: "white",
            border: "none",
            borderRadius: "var(--radius-sm)",
            cursor: "pointer",
            fontSize: "var(--text-sm)",
            fontWeight: 600,
          }}
        >
          Back to My Reports
        </button>
      </div>
    );
  }

  if (!hasAccess) {
    return (
      <div style={{ padding: "2rem", textAlign: "center", color: "var(--text-secondary)" }}>
        <p>You don't have access to this report.</p>
        <button
          onClick={() => navigate("/client/report")}
          style={{
            marginTop: "1rem",
            padding: "0.6rem 1.25rem",
            background: "var(--accent-success)",
            color: "white",
            border: "none",
            borderRadius: "var(--radius-sm)",
            cursor: "pointer",
            fontSize: "var(--text-sm)",
            fontWeight: 600,
          }}
        >
          Back to My Reports
        </button>
      </div>
    );
  }

  return <ReportViewer report={report} />;
}

// Admin component for editing a specific report
function AdminReportEditor({ onSave }: { onSave: (report: Report) => void }) {
  const { reportId } = useParams<{ reportId: string }>();
  const navigate = useNavigate();
  const { getReportById, reports } = useReports();
  const report = reportId ? getReportById(reportId) : null;
  
  // Debug: Log if report is not found
  useEffect(() => {
    if (reportId && !report) {
      console.warn(`Report ${reportId} not found in reports array. Available reports:`, reports.map(r => r.id));
    }
  }, [reportId, report, reports]);

  if (!report) {
    return (
      <div style={{ padding: "2rem", textAlign: "center", color: "var(--text-secondary)" }}>
        <p>Report not found.</p>
        <button
          onClick={() => navigate("/admin/reports")}
          style={{
            marginTop: "1rem",
            padding: "0.6rem 1.25rem",
            background: "var(--accent-primary)",
            color: "white",
            border: "none",
            borderRadius: "var(--radius-sm)",
            cursor: "pointer",
            fontSize: "var(--text-sm)",
            fontWeight: 600,
          }}
        >
          Back to Reports
        </button>
      </div>
    );
  }

  return (
    <div>
      {/* Back button */}
      <div
        style={{
          padding: "0.75rem 2rem",
          background: "var(--surface-raised)",
          borderBottom: "1px solid var(--border-default)",
        }}
      >
        <button
          onClick={() => navigate("/admin/reports")}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.4rem",
            padding: "0.45rem 0.875rem",
            background: "var(--surface-sunken)",
            border: "1px solid var(--border-default)",
            borderRadius: "var(--radius-sm)",
            cursor: "pointer",
            fontSize: "var(--text-sm)",
            color: "var(--text-secondary)",
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
          <ArrowLeft size={16} />
          Back to Reports List
        </button>
      </div>
      <AdminPanel
        initialReport={report}
        onSave={onSave}
      />
    </div>
  );
}


function App() {
  return (
    <UserProvider>
      <PrintProvider>
        <ReportsProvider>
          <BrowserRouter>
            <AppContent />
          </BrowserRouter>
        </ReportsProvider>
      </PrintProvider>
    </UserProvider>
  );
}

export default App;
