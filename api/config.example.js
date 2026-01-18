// API Configuration Example
// Copy this file to config.js and update with your API endpoints

window.API_CONFIG = {
  // Base API URL - update this to match your backend
  BASE_URL: 'http://localhost:3000/api', // Development
  // BASE_URL: 'https://api.zonebroz.com/api', // Production
  
  // API Endpoints (auto-generated, usually don't need to change)
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
