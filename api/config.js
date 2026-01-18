// API Configuration
// This file contains API endpoint URLs and configuration

// ============================================================================
// CONFIGURATION - UPDATE THESE VALUES FOR YOUR BACKEND
// ============================================================================

// API Base URL Configuration
// - Development: Use 'http://localhost:3000/api' (or your local backend)
// - Production: Use your production API URL (e.g., 'https://api.zonebroz.com/api')
// 
// To use environment-specific URLs, check window.location.hostname:
const getBaseURL = () => {
  const hostname = window.location.hostname;
  
  // Production domain (update with your actual domain)
  if (hostname === 'zonebroz.com' || hostname === 'www.zonebroz.com') {
    return 'https://api.zonebroz.com/api';
  }
  
  // Staging/preview environment (if applicable)
  if (hostname.includes('staging') || hostname.includes('preview')) {
    return 'https://api-staging.zonebroz.com/api';
  }
  
  // Development (localhost)
  return 'http://localhost:3000/api';
};

// Use window object for global access (since we're using script tags, not ES modules)
window.API_CONFIG = {
  // Base API URL - automatically detects environment
  BASE_URL: getBaseURL(),
  
  // MANUAL OVERRIDE: Uncomment and set this to override automatic detection
  // BASE_URL: 'http://localhost:3000/api',
  
  // API Endpoints
  ENDPOINTS: {
    // Authentication
    AUTH: {
      LOGIN: '/auth/login',
      LOGOUT: '/auth/logout',
      REFRESH: '/auth/refresh',
      ME: '/auth/me'
    },
    
    // Customer Endpoints
    CUSTOMER: {
      PROJECTS: '/customer/projects',
      PROJECT: (id) => `/customer/projects/${id}`,
      INVOICES: '/customer/invoices',
      INVOICE: (id) => `/customer/invoices/${id}`,
      MESSAGES: '/customer/messages',
      THREAD: (id) => `/customer/messages/threads/${id}`,
      THREADS: '/customer/messages/threads',
      REQUESTS: '/customer/requests',
      REQUEST: (id) => `/customer/requests/${id}`
    },
    
    // Admin Endpoints
    ADMIN: {
      CUSTOMERS: '/admin/customers',
      CUSTOMER: (id) => `/admin/customers/${id}`,
      PROJECTS: '/admin/projects',
      PROJECT: (id) => `/admin/projects/${id}`,
      INVOICES: '/admin/invoices',
      INVOICE: (id) => `/admin/invoices/${id}`,
      INVOICE_UPLOAD: (id) => `/admin/invoices/${id}/upload`,
      REQUESTS: '/admin/requests',
      REQUEST: (id) => `/admin/requests/${id}`,
      MESSAGES: '/admin/messages',
      MESSAGE_THREAD: (id) => `/admin/messages/threads/${id}`
    }
  },
  
  // Request Configuration
  DEFAULT_HEADERS: {
    'Content-Type': 'application/json'
  },
  
  // Request timeout (ms)
  TIMEOUT: 30000
};

// Environment detection
const isDevelopment = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';

// Configuration is now available as window.API_CONFIG
