// Supabase Authentication Service
// Handles authentication using Supabase Auth

// Get Supabase client
function getSupabase() {
  const client = window.getSupabaseClient && window.getSupabaseClient();
  if (!client) {
    console.warn('Supabase client not initialized. Make sure api/supabase-config.js is loaded.');
  }
  return client;
}

// Supabase Auth Service
const SupabaseAuthService = {
  /**
   * Sign in with email and password
   * @param {string} email - User email
   * @param {string} password - User password
   * @param {string} role - User role ('customer' or 'admin')
   * @returns {Promise<{session, role, userId}>}
   */
  async login(email, password, role) {
    const supabase = getSupabase();
    if (!supabase) {
      throw new Error('Supabase client not available');
    }

    try {
      // Sign in with Supabase Auth
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) {
        throw new Error(error.message || 'Login failed');
      }

      if (!data.session || !data.user) {
        throw new Error('No session returned from authentication');
      }

      // Get user role from user metadata
      const userRole = data.user.user_metadata?.role || role || 'customer';

      // Store session in localStorage for compatibility
      const session = {
        role: userRole,
        userId: data.user.id,
        email: data.user.email,
        token: data.session.access_token,
        timestamp: Date.now()
      };

      localStorage.setItem('portalSession', JSON.stringify(session));

      return {
        session: data.session,
        role: userRole,
        userId: data.user.id,
        user: data.user
      };
    } catch (error) {
      console.error('Supabase login error:', error);
      throw error;
    }
  },

  /**
   * Sign out
   */
  async logout() {
    const supabase = getSupabase();
    if (supabase) {
      try {
        await supabase.auth.signOut();
      } catch (error) {
        console.error('Supabase logout error:', error);
      }
    }

    // Clear local session
    localStorage.removeItem('portalSession');
  },

  /**
   * Get current session
   * @returns {Promise<{role, userId, email} | null>}
   */
  async getSession() {
    const supabase = getSupabase();
    if (!supabase) {
      // Fallback to localStorage if Supabase not available
      try {
        const session = localStorage.getItem('portalSession');
        return session ? JSON.parse(session) : null;
      } catch {
        return null;
      }
    }

    try {
      // Get current session from Supabase
      const { data: { session }, error } = await supabase.auth.getSession();

      if (error) {
        console.error('Error getting session:', error);
        // Fallback to localStorage
        try {
          const localSession = localStorage.getItem('portalSession');
          return localSession ? JSON.parse(localSession) : null;
        } catch {
          return null;
        }
      }

      if (!session || !session.user) {
        return null;
      }

      // Get role from user metadata or localStorage
      let role = session.user.user_metadata?.role;
      if (!role) {
        // Try to get from localStorage
        try {
          const localSession = localStorage.getItem('portalSession');
          if (localSession) {
            const parsed = JSON.parse(localSession);
            role = parsed.role;
          }
        } catch {
          // Ignore
        }
      }

      // Update localStorage with current session
      const sessionData = {
        role: role || 'customer',
        userId: session.user.id,
        email: session.user.email,
        token: session.access_token,
        timestamp: Date.now()
      };

      localStorage.setItem('portalSession', JSON.stringify(sessionData));

      return {
        role: sessionData.role,
        userId: session.user.id,
        email: session.user.email
      };
    } catch (error) {
      console.error('Error getting session:', error);
      // Fallback to localStorage
      try {
        const session = localStorage.getItem('portalSession');
        return session ? JSON.parse(session) : null;
      } catch {
        return null;
      }
    }
  },

  /**
   * Check if user is authenticated
   * @returns {Promise<boolean>}
   */
  async isAuthenticated() {
    const session = await this.getSession();
    return session !== null;
  },

  /**
   * Get current user
   * @returns {Promise<object | null>}
   */
  async getCurrentUser() {
    const supabase = getSupabase();
    if (!supabase) {
      return null;
    }

    try {
      const { data: { user }, error } = await supabase.auth.getUser();

      if (error || !user) {
        return null;
      }

      return user;
    } catch (error) {
      console.error('Error getting current user:', error);
      return null;
    }
  },

  /**
   * Sign up new user (for admin use or customer registration)
   * @param {string} email - User email
   * @param {string} password - User password
   * @param {object} metadata - User metadata (role, name, etc.)
   * @returns {Promise<{user, session}>}
   */
  async signUp(email, password, metadata = {}) {
    const supabase = getSupabase();
    if (!supabase) {
      throw new Error('Supabase client not available');
    }

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: metadata // Store role, name, etc. in user metadata
        }
      });

      if (error) {
        throw new Error(error.message || 'Sign up failed');
      }

      return {
        user: data.user,
        session: data.session
      };
    } catch (error) {
      console.error('Supabase sign up error:', error);
      throw error;
    }
  },

  /**
   * Listen to auth state changes
   * @param {function} callback - Callback function for auth state changes
   * @returns {function} Unsubscribe function
   */
  onAuthStateChange(callback) {
    const supabase = getSupabase();
    if (!supabase) {
      return () => {}; // Return empty unsubscribe function
    }

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      callback(event, session);
    });

    return () => {
      if (subscription) {
        subscription.unsubscribe();
      }
    };
  }
};

// Export for use in portal.js
window.SupabaseAuthService = SupabaseAuthService;
