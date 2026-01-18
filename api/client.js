// API Client Utility
// Handles all API communication with error handling, authentication, and loading states

// API_CONFIG is loaded via script tag before this file

class APIClient {
  constructor() {
    const API_CONFIG = window.API_CONFIG || {};
    this.baseURL = API_CONFIG.BASE_URL || 'http://localhost:3000/api';
    this.defaultHeaders = API_CONFIG.DEFAULT_HEADERS || { 'Content-Type': 'application/json' };
    this.timeout = API_CONFIG.TIMEOUT || 30000;
    
    // Get auth token from storage or session
    this.getAuthToken = () => {
      try {
        const session = JSON.parse(localStorage.getItem('portalSession') || '{}');
        return session.token || null;
      } catch {
        return null;
      }
    };
    
    // Set auth token
    this.setAuthToken = (token) => {
      try {
        const session = JSON.parse(localStorage.getItem('portalSession') || '{}');
        session.token = token;
        localStorage.setItem('portalSession', JSON.stringify(session));
      } catch {
        // Ignore storage errors
      }
    };
  }

  /**
   * Build full URL from endpoint
   */
  buildURL(endpoint) {
    // If endpoint already includes base URL, use as-is
    if (endpoint.startsWith('http://') || endpoint.startsWith('https://')) {
      return endpoint;
    }
    // Remove leading slash if present
    const cleanEndpoint = endpoint.startsWith('/') ? endpoint.slice(1) : endpoint;
    return `${this.baseURL}/${cleanEndpoint}`;
  }

  /**
   * Build request headers with authentication
   */
  buildHeaders(customHeaders = {}) {
    const headers = { ...this.defaultHeaders, ...customHeaders };
    const token = this.getAuthToken();
    
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
    
    return headers;
  }

  /**
   * Handle API response
   */
  async handleResponse(response) {
    // Handle empty responses
    const contentType = response.headers.get('content-type');
    const hasJSON = contentType && contentType.includes('application/json');
    
    if (!hasJSON) {
      if (response.ok) {
        return { success: true, data: null };
      }
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    
    const data = await response.json();
    
    if (!response.ok) {
      const error = new Error(data.message || `HTTP ${response.status}: ${response.statusText}`);
      error.status = response.status;
      error.data = data;
      throw error;
    }
    
    return { success: true, data };
  }

  /**
   * Generic request method
   */
  async request(endpoint, options = {}) {
    const {
      method = 'GET',
      body = null,
      headers = {},
      timeout = this.timeout
    } = options;

    const url = this.buildURL(endpoint);
    const requestHeaders = this.buildHeaders(headers);

    // Create abort controller for timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    try {
      const fetchOptions = {
        method,
        headers: requestHeaders,
        signal: controller.signal
      };

      if (body) {
        if (body instanceof FormData) {
          // Don't set Content-Type for FormData - browser will set it with boundary
          delete requestHeaders['Content-Type'];
          fetchOptions.body = body;
        } else if (typeof body === 'object') {
          fetchOptions.body = JSON.stringify(body);
        } else {
          fetchOptions.body = body;
        }
      }

      const response = await fetch(url, fetchOptions);
      clearTimeout(timeoutId);
      
      return await this.handleResponse(response);
    } catch (error) {
      clearTimeout(timeoutId);
      
      if (error.name === 'AbortError') {
        throw new Error('Request timeout - please check your connection');
      }
      
      if (error.status === 401) {
        // Unauthorized - clear session and redirect to login
        localStorage.removeItem('portalSession');
        if (window.router) {
          window.router.navigate('/login');
        }
        throw new Error('Session expired - please log in again');
      }
      
      // Network errors
      if (!navigator.onLine) {
        throw new Error('No internet connection - please check your network');
      }
      
      throw error;
    }
  }

  /**
   * GET request
   */
  async get(endpoint, options = {}) {
    return this.request(endpoint, { ...options, method: 'GET' });
  }

  /**
   * POST request
   */
  async post(endpoint, data, options = {}) {
    return this.request(endpoint, { ...options, method: 'POST', body: data });
  }

  /**
   * PUT request
   */
  async put(endpoint, data, options = {}) {
    return this.request(endpoint, { ...options, method: 'PUT', body: data });
  }

  /**
   * PATCH request
   */
  async patch(endpoint, data, options = {}) {
    return this.request(endpoint, { ...options, method: 'PATCH', body: data });
  }

  /**
   * DELETE request
   */
  async delete(endpoint, options = {}) {
    return this.request(endpoint, { ...options, method: 'DELETE' });
  }

  /**
   * Upload file (multipart/form-data)
   */
  async upload(endpoint, file, additionalData = {}) {
    const formData = new FormData();
    formData.append('file', file);
    
    // Add additional form fields
    Object.keys(additionalData).forEach(key => {
      formData.append(key, additionalData[key]);
    });
    
    return this.post(endpoint, formData);
  }
}

// Create singleton instance
window.apiClient = new APIClient();
