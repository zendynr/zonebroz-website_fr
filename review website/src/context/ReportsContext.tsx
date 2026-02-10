import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from "react";
import { Report, Client } from "../types";
import { mockReports, mockClients } from "../data/mockData";
import { supabase } from "../lib/supabase";
import { useUser } from "./UserContext";
import { createAuthUser } from "../lib/authHelpers";

interface ReportsContextType {
  reports: Report[];
  clients: Client[];
  addClient: (clientData: Omit<Client, "id" | "createdAt">, password: string) => Promise<Client>;
  findOrCreateClientByEmail: (email: string, name?: string, company?: string) => Promise<Client>;
  addReport: (report: Report) => Promise<Report>;
  updateReport: (report: Report) => Promise<void>;
  getReportById: (id: string) => Report | undefined;
  getClientById: (id: string) => Client | undefined;
  getClientByEmail: (email: string) => Client | undefined;
  getReportsByClientEmail: (email: string) => Report[];
  loading: boolean;
  error: string | null;
  refreshData: () => Promise<void>;
}

const ReportsContext = createContext<ReportsContextType | undefined>(undefined);

// Helper function to transform Supabase report to Report type
function transformReportFromDB(dbReport: any): Report {
  return {
    id: dbReport.id,
    clientId: dbReport.client_id,
    ownerId: dbReport.owner_id,
    status: dbReport.status,
    version: dbReport.version,
    overallScore: dbReport.overall_score ? Number(dbReport.overall_score) : undefined,
    meta: dbReport.meta || {},
    categoryScores: dbReport.category_scores || [],
    findings: dbReport.findings || [],
    competitors: dbReport.competitors || [],
    roadmap: dbReport.roadmap || [],
  };
}

// Helper function to transform Report to Supabase format
function transformReportToDB(report: Report, includeId = true): any {
  const data: any = {
    client_id: report.clientId,
    owner_id: report.ownerId,
    status: report.status,
    version: report.version,
    overall_score: report.overallScore,
    meta: report.meta,
    category_scores: report.categoryScores,
    findings: report.findings,
    competitors: report.competitors,
    roadmap: report.roadmap,
  };
  // Only include id for updates, not inserts (let Postgres generate the UUID)
  if (includeId && report.id) {
    data.id = report.id;
  }
  return data;
}

// Helper function to transform Supabase client to Client type
function transformClientFromDB(dbClient: any): Client {
  return {
    id: dbClient.id,
    name: dbClient.name,
    company: dbClient.company,
    email: dbClient.email,
    createdAt: dbClient.created_at,
  };
}

export function ReportsProvider({ children }: { children: ReactNode }) {
  const { currentUser, isAuthenticated } = useUser();
  const [reports, setReports] = useState<Report[]>(mockReports);
  const [clients, setClients] = useState<Client[]>(mockClients);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [useSupabase, setUseSupabase] = useState(true);

  // Fetch data from Supabase - simple await, no timeouts
  const fetchData = useCallback(async () => {
    if (!isAuthenticated) {
      setLoading(false);
      return;
    }

    if (!useSupabase) {
      setLoading(false);
      return;
    }

    try {
      setError(null);

      // Fetch clients
      const { data: clientsData, error: clientsError } = await supabase
        .from("clients")
        .select("*")
        .order("created_at", { ascending: false });

      if (clientsError) {
        console.warn("Clients fetch error:", clientsError.message);
      }

      // Fetch reports
      const { data: reportsData, error: reportsError } = await supabase
        .from("reports")
        .select("*")
        .order("created_at", { ascending: false });

      if (reportsError) {
        console.warn("Reports fetch error:", reportsError.message);
      }

      // If both fail, fall back to mock data
      if (clientsError && reportsError) {
        console.warn("Both fetches failed, using mock data only");
        setUseSupabase(false);
        setLoading(false);
        return;
      }

      // Transform Supabase data
      const transformedClients = clientsError
        ? []
        : (clientsData || []).map(transformClientFromDB);
      const transformedReports = reportsError
        ? []
        : (reportsData || []).map(transformReportFromDB);

      // Merge: Supabase data first, then non-conflicting mock data
      const supabaseClientEmails = new Set(transformedClients.map(c => c.email?.toLowerCase()));
      const supabaseClientIds = new Set(transformedClients.map(c => c.id));
      const additionalMockClients = mockClients.filter(c =>
        !supabaseClientIds.has(c.id) &&
        !(c.email && supabaseClientEmails.has(c.email.toLowerCase()))
      );

      const supabaseReportIds = new Set(transformedReports.map(r => r.id));
      const additionalMockReports = mockReports.filter(r =>
        !supabaseReportIds.has(r.id)
      );

      setClients([...transformedClients, ...additionalMockClients]);
      setReports([...transformedReports, ...additionalMockReports]);
      setLoading(false);
    } catch (err: any) {
      console.error("Error fetching data:", err);
      setError("Failed to load data. Using mock data as fallback.");
      setUseSupabase(false);
      setLoading(false);
    }
  }, [useSupabase, isAuthenticated]);

  // Fetch when authentication state changes
  useEffect(() => {
    if (!isAuthenticated) {
      setLoading(false);
      return;
    }
    fetchData();
  }, [fetchData, isAuthenticated]);

  // Set up real-time subscriptions
  useEffect(() => {
    if (!useSupabase) return;

    let reportsSubscription: any = null;
    let clientsSubscription: any = null;

    try {
      // Subscribe to reports changes
      reportsSubscription = supabase
        .channel("reports-changes")
        .on(
          "postgres_changes",
          {
            event: "*",
            schema: "public",
            table: "reports",
          },
          (payload) => {
            console.log("Reports change:", payload);
            if (payload.eventType === "INSERT" || payload.eventType === "UPDATE") {
              const transformed = transformReportFromDB(payload.new);
              setReports((prev) => {
                const existing = prev.findIndex((r) => r.id === transformed.id);
                if (existing >= 0) {
                  return prev.map((r) => (r.id === transformed.id ? transformed : r));
                }
                return [...prev, transformed];
              });
            } else if (payload.eventType === "DELETE") {
              setReports((prev) => prev.filter((r) => r.id !== payload.old.id));
            }
          }
        )
        .subscribe((status) => {
          if (status === "SUBSCRIBED") {
            console.log("Reports subscription active");
          } else if (status === "CHANNEL_ERROR") {
            console.warn("Reports subscription error - continuing without real-time updates");
          }
        });

      // Subscribe to clients changes
      clientsSubscription = supabase
        .channel("clients-changes")
        .on(
          "postgres_changes",
          {
            event: "*",
            schema: "public",
            table: "clients",
          },
          (payload) => {
            console.log("Clients change:", payload);
            if (payload.eventType === "INSERT" || payload.eventType === "UPDATE") {
              const transformed = transformClientFromDB(payload.new);
              setClients((prev) => {
                const existing = prev.findIndex((c) => c.id === transformed.id);
                if (existing >= 0) {
                  return prev.map((c) => (c.id === transformed.id ? transformed : c));
                }
                return [...prev, transformed];
              });
            } else if (payload.eventType === "DELETE") {
              setClients((prev) => prev.filter((c) => c.id !== payload.old.id));
            }
          }
        )
        .subscribe((status) => {
          if (status === "SUBSCRIBED") {
            console.log("Clients subscription active");
          } else if (status === "CHANNEL_ERROR") {
            console.warn("Clients subscription error - continuing without real-time updates");
          }
        });
    } catch (err) {
      console.warn("Error setting up real-time subscriptions:", err);
      // Continue without real-time - app will still work with manual refreshes
    }

    return () => {
      if (reportsSubscription) {
        supabase.removeChannel(reportsSubscription);
      }
      if (clientsSubscription) {
        supabase.removeChannel(clientsSubscription);
      }
    };
  }, [useSupabase]);

  const addClient = async (
    clientData: Omit<Client, "id" | "createdAt">,
    password: string
  ): Promise<Client> => {
    if (!useSupabase) {
      // Fallback to mock behavior
      const newClient: Client = {
        ...clientData,
        id: `client-${Date.now()}`,
        createdAt: new Date().toISOString(),
      };
      setClients((prev) => [...prev, newClient]);
      return newClient;
    }

    try {
      // First, attempt to create Auth user
      const authResult = await createAuthUser(
        clientData.email || "",
        password
      );

      if (!authResult.success && !authResult.error?.includes("already registered")) {
        console.warn("Could not create auth user:", authResult.error);
        // Continue anyway - admin can create auth user manually if needed
      }

      // Insert client into database
      const { data, error } = await supabase
        .from("clients")
        .insert({
          name: clientData.name,
          company: clientData.company,
          email: clientData.email?.toLowerCase().trim(),
        })
        .select()
        .single();

      if (error) {
        // If client already exists, try to fetch it
        if (error.code === "23505") {
          const { data: existing } = await supabase
            .from("clients")
            .select("*")
            .eq("email", clientData.email?.toLowerCase().trim())
            .single();

          if (existing) {
            return transformClientFromDB(existing);
          }
        }
        throw error;
      }

      const newClient = transformClientFromDB(data);
      setClients((prev) => [...prev, newClient]);
      return newClient;
    } catch (err: any) {
      console.error("Error adding client:", err);
      throw err;
    }
  };

  const findOrCreateClientByEmail = async (
    email: string,
    name?: string,
    company?: string
  ): Promise<Client> => {
    const normalizedEmail = email.toLowerCase().trim();

    if (useSupabase) {
      try {
        // Try to find existing client
        const { data: existing, error: findError } = await supabase
          .from("clients")
          .select("*")
          .eq("email", normalizedEmail)
          .maybeSingle();

        if (!findError && existing) {
          return transformClientFromDB(existing);
        }

        // Create new client if not found
        const { data: newClient, error: createError } = await supabase
          .from("clients")
          .insert({
            name: name || normalizedEmail.split("@")[0],
            company: company,
            email: normalizedEmail,
          })
          .select()
          .single();

        if (createError) throw createError;
        return transformClientFromDB(newClient);
      } catch (err) {
        console.error("Error in findOrCreateClientByEmail:", err);
        // Fall through to mock behavior
      }
    }

    // Fallback to mock behavior
    const existingClient = clients.find(
      (c) => c.email?.toLowerCase().trim() === normalizedEmail
    );

    if (existingClient) {
      return existingClient;
    }

    const newClient: Client = {
      id: `client-${Date.now()}`,
      name: name || normalizedEmail.split("@")[0],
      company: company,
      email: normalizedEmail,
      createdAt: new Date().toISOString(),
    };
    setClients((prev) => [...prev, newClient]);
    return newClient;
  };

  const getClientByEmail = (email: string): Client | undefined => {
    const normalizedEmail = email.toLowerCase().trim();
    return clients.find((c) => c.email?.toLowerCase().trim() === normalizedEmail);
  };

  const addReport = async (report: Report): Promise<Report> => {
    if (!useSupabase) {
      setReports((prev) => [...prev, report]);
      return report;
    }

    try {
      // Don't include the client-generated id - let Postgres generate a real UUID
      const reportData = transformReportToDB(report, false);
      const { data, error } = await supabase
        .from("reports")
        .insert(reportData)
        .select()
        .single();

      if (error) throw error;

      const transformed = transformReportFromDB(data);
      setReports((prev) => [...prev, transformed]);
      return transformed; // Return with real UUID
    } catch (err: any) {
      console.error("Error adding report:", err);
      throw err;
    }
  };

  const updateReport = async (report: Report): Promise<void> => {
    if (!useSupabase) {
      setReports((prev) => {
        const existingIndex = prev.findIndex((r) => r.id === report.id);
        if (existingIndex >= 0) {
          return prev.map((r) => (r.id === report.id ? report : r));
        }
        return [...prev, report];
      });
      return;
    }

    try {
      const reportData = transformReportToDB(report);
      const { data, error } = await supabase
        .from("reports")
        .update(reportData)
        .eq("id", report.id)
        .select()
        .single();

      if (error) throw error;

      const transformed = transformReportFromDB(data);
      setReports((prev) => {
        const existingIndex = prev.findIndex((r) => r.id === transformed.id);
        if (existingIndex >= 0) {
          return prev.map((r) => (r.id === transformed.id ? transformed : r));
        }
        return [...prev, transformed];
      });
    } catch (err: any) {
      console.error("Error updating report:", err);
      // Fallback to local state
      setReports((prev) => {
        const existingIndex = prev.findIndex((r) => r.id === report.id);
        if (existingIndex >= 0) {
          return prev.map((r) => (r.id === report.id ? report : r));
        }
        return [...prev, report];
      });
      throw err;
    }
  };

  const getReportById = (id: string): Report | undefined => {
    return reports.find((r) => r.id === id);
  };

  const getClientById = (id: string): Client | undefined => {
    return clients.find((c) => c.id === id);
  };

  const getReportsByClientEmail = (email: string): Report[] => {
    const normalizedEmail = email.toLowerCase().trim();
    const client = clients.find(
      (c) => c.email?.toLowerCase().trim() === normalizedEmail
    );
    if (!client) return [];
    return reports.filter((r) => r.clientId === client.id);
  };

  const refreshData = async () => {
    setUseSupabase(true); // Re-enable Supabase if it was disabled
    setLoading(true);
    await fetchData();
  };

  return (
    <ReportsContext.Provider
      value={{
        reports,
        clients,
        addClient,
        findOrCreateClientByEmail,
        addReport,
        updateReport,
        getReportById,
        getClientById,
        getClientByEmail,
        getReportsByClientEmail,
        loading,
        error,
        refreshData,
      }}
    >
      {children}
    </ReportsContext.Provider>
  );
}

export function useReports() {
  const context = useContext(ReportsContext);
  if (context === undefined) {
    throw new Error("useReports must be used within a ReportsProvider");
  }
  return context;
}
