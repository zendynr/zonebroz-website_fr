// Supabase Configuration
// Set up Supabase client for backend integration

// Supabase Project Configuration
// Replace these values with your Supabase project credentials
// Find them in your Supabase project settings: https://app.supabase.com/project/_/settings/api

window.SUPABASE_CONFIG = {
  // Your Supabase project URL
  SUPABASE_URL: 'https://qblgvjtxiryuufkazvok.supabase.co', // e.g., 'https://xxxxx.supabase.co'
  
  // Your Supabase anon/public key (safe to expose in client-side code)
  SUPABASE_ANON_KEY: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFibGd2anR4aXJ5dXVma2F6dm9rIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njg2ODA2MTksImV4cCI6MjA4NDI1NjYxOX0.crR-NUgc79igyP-HhO-xtQIYNMH7bD_KyD67jqX5hT0', // e.g., 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'
  
  // Optional: Row Level Security (RLS) is enabled by default
  // Ensure RLS policies are set up in your Supabase dashboard
};

// Initialize Supabase Client
// This will be available after supabase-js is loaded
let supabaseClient = null;

// Load Supabase JS SDK from CDN
function initSupabase() {
  // Check if Supabase is already loaded
  if (typeof window.supabase !== 'undefined') {
    const config = window.SUPABASE_CONFIG || {};
    
    if (!config.SUPABASE_URL || config.SUPABASE_URL === 'YOUR_SUPABASE_PROJECT_URL') {
      console.warn('Supabase configuration not set. Please update SUPABASE_CONFIG in api/supabase-config.js');
      return null;
    }
    
    if (!config.SUPABASE_ANON_KEY || config.SUPABASE_ANON_KEY === 'YOUR_SUPABASE_ANON_KEY') {
      console.warn('Supabase anon key not set. Please update SUPABASE_CONFIG in api/supabase-config.js');
      return null;
    }
    
    // Initialize Supabase client
    supabaseClient = window.supabase.createClient(
      config.SUPABASE_URL,
      config.SUPABASE_ANON_KEY
    );
    
    console.log('Supabase client initialized');
    return supabaseClient;
  }
  
  console.warn('Supabase JS SDK not loaded. Make sure to include the script tag in portal.html');
  return null;
}

// Get Supabase client (lazy initialization)
function getSupabaseClient() {
  if (!supabaseClient) {
    supabaseClient = initSupabase();
  }
  return supabaseClient;
}

// Export for use in portal.js
window.getSupabaseClient = getSupabaseClient;
