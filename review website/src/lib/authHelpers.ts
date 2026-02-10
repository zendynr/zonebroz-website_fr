import { supabase } from "./supabase";

/**
 * Creates an Auth user for a client
 * Note: This uses the client-side API which may have limitations.
 * For production, consider using an Edge Function with service role key.
 */
export async function createAuthUser(
  email: string,
  password: string
): Promise<{ success: boolean; error?: string }> {
  try {
    // Attempt to sign up the user (this creates the auth user)
    const { data, error } = await supabase.auth.signUp({
      email: email.toLowerCase().trim(),
      password,
      options: {
        emailRedirectTo: window.location.origin + "/client/login",
      },
    });

    if (error) {
      // If user already exists, that's okay - they can reset password
      if (error.message.includes("already registered")) {
        return { success: true }; // User exists, can login
      }
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message || "Failed to create auth user" };
  }
}
