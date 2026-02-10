import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { CurrentUser, UserTier, UserRole } from "../types";
import { supabase } from "../lib/supabase";
import type { AuthError } from "@supabase/supabase-js";

interface UserContextType {
  currentUser: CurrentUser;
  setTier: (tier: UserTier) => void;
  setRole: (role: UserRole) => void;
  isAuthenticated: boolean;
  login: (email: string, password: string, role: UserRole) => Promise<{ error: AuthError | null }>;
  logout: () => Promise<void>;
  loading: boolean;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const [currentUser, setCurrentUser] = useState<CurrentUser | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  // Determine user role by checking admins/clients tables
  const determineUserRole = async (email: string): Promise<CurrentUser | null> => {
    const normalizedEmail = email.toLowerCase().trim();

    // Check admins table
    const { data: adminData } = await supabase
      .from("admins")
      .select("id, email")
      .eq("email", normalizedEmail)
      .maybeSingle();

    if (adminData) {
      return { id: adminData.id, role: "admin", tier: "full", email: adminData.email };
    }

    // Check clients table
    const { data: clientData } = await supabase
      .from("clients")
      .select("id, email")
      .eq("email", normalizedEmail)
      .maybeSingle();

    if (clientData) {
      return { id: clientData.id, role: "client", tier: "full", email: clientData.email };
    }

    return null;
  };

  // Session management via onAuthStateChange (Supabase recommended pattern).
  // INITIAL_SESSION fires once on startup after the client restores/refreshes
  // the session from localStorage. No manual getSession() call needed.
  useEffect(() => {
    let mounted = true;
    let initialDone = false;

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (!mounted) return;

        if (event === "INITIAL_SESSION") {
          initialDone = true;
          if (session?.user?.email) {
            try {
              const user = await determineUserRole(session.user.email);
              if (mounted && user) {
                setCurrentUser(user);
                setIsAuthenticated(true);
              }
            } catch (err) {
              console.error("Role check failed during session restore:", err);
            }
          }
          if (mounted) setLoading(false);
        } else if (event === "SIGNED_OUT" || !session) {
          setCurrentUser(null);
          setIsAuthenticated(false);
        }
        // SIGNED_IN is handled by the login() function directly,
        // so we don't duplicate the role check here.
      }
    );

    // Safety: if INITIAL_SESSION never fires (edge case), stop loading after 10s
    const safety = setTimeout(() => {
      if (mounted && !initialDone) {
        console.warn("Auth initialization timeout - proceeding to login");
        setLoading(false);
      }
    }, 10000);

    return () => {
      mounted = false;
      clearTimeout(safety);
      subscription.unsubscribe();
    };
  }, []);

  const login = async (
    email: string,
    password: string,
    _role: UserRole
  ): Promise<{ error: AuthError | null }> => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.toLowerCase().trim(),
        password,
      });

      if (error) return { error };

      // Determine role right here, synchronously in the login flow
      if (data?.user?.email) {
        const user = await determineUserRole(data.user.email);
        if (user) {
          setCurrentUser(user);
          setIsAuthenticated(true);
        } else {
          return { error: { message: "Account not found. Contact an administrator.", status: 400 } as AuthError };
        }
      }

      return { error: null };
    } catch (error) {
      return { error: error as AuthError };
    }
  };

  const logout = async () => {
    await supabase.auth.signOut();
    setCurrentUser(null);
    setIsAuthenticated(false);
  };

  const setTier = (tier: UserTier) => {
    if (!currentUser) return;
    setCurrentUser((prev) => (prev ? { ...prev, tier } : prev));
  };

  const setRole = (_role: UserRole) => {
    // Role is determined by database
  };

  return (
    <UserContext.Provider
      value={{
        currentUser: currentUser || { id: "guest", role: "client", tier: "snapshot" },
        setTier,
        setRole,
        isAuthenticated,
        login,
        logout,
        loading,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}
