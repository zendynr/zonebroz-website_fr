// API Service Layer
// Provides high-level methods for each resource type

// apiClient and API_CONFIG are loaded via script tags before this file
(function() {
  const apiClient = window.apiClient;
  const API_CONFIG = window.API_CONFIG || { ENDPOINTS: {} };
  
  window.API = {
  // ==================== AUTHENTICATION ====================
  
  auth: {
    async login(email, password, role) {
      const response = await apiClient.post(API_CONFIG.ENDPOINTS.AUTH.LOGIN, {
        email,
        password,
        role
      });
      return response.data;
    },
    
    async logout() {
      try {
        await apiClient.post(API_CONFIG.ENDPOINTS.AUTH.LOGOUT);
      } catch (error) {
        // Continue with logout even if API call fails
        console.warn('Logout API call failed:', error);
      }
    },
    
    async getCurrentUser() {
      const response = await apiClient.get(API_CONFIG.ENDPOINTS.AUTH.ME);
      return response.data;
    },
    
    async refreshToken() {
      const response = await apiClient.post(API_CONFIG.ENDPOINTS.AUTH.REFRESH);
      return response.data;
    }
  },
  
  // ==================== CUSTOMER ENDPOINTS ====================
  
  customer: {
    // Projects
    async getProjects() {
      const response = await apiClient.get(API_CONFIG.ENDPOINTS.CUSTOMER.PROJECTS);
      return response.data;
    },
    
    async getProject(id) {
      const response = await apiClient.get(API_CONFIG.ENDPOINTS.CUSTOMER.PROJECT(id));
      return response.data;
    },
    
    // Invoices
    async getInvoices() {
      const response = await apiClient.get(API_CONFIG.ENDPOINTS.CUSTOMER.INVOICES);
      return response.data;
    },
    
    async getInvoice(id) {
      const response = await apiClient.get(API_CONFIG.ENDPOINTS.CUSTOMER.INVOICE(id));
      return response.data;
    },
    
    // Messages
    async getThreads() {
      const response = await apiClient.get(API_CONFIG.ENDPOINTS.CUSTOMER.THREADS);
      return response.data;
    },
    
    async getThreadMessages(threadId) {
      const response = await apiClient.get(API_CONFIG.ENDPOINTS.CUSTOMER.THREAD(threadId));
      return response.data;
    },
    
    async sendMessage(threadId, body) {
      const response = await apiClient.post(API_CONFIG.ENDPOINTS.CUSTOMER.THREAD(threadId), { body });
      return response.data;
    },
    
    async createThread(subject, projectId = null) {
      const response = await apiClient.post(API_CONFIG.ENDPOINTS.CUSTOMER.THREADS, {
        subject,
        projectId
      });
      return response.data;
    },
    
    // Requests
    async getRequests() {
      const response = await apiClient.get(API_CONFIG.ENDPOINTS.CUSTOMER.REQUESTS);
      return response.data;
    },
    
    async createRequest(requestData) {
      const response = await apiClient.post(API_CONFIG.ENDPOINTS.CUSTOMER.REQUESTS, requestData);
      return response.data;
    }
  },
  
  // ==================== ADMIN ENDPOINTS ====================
  
  admin: {
    // Customers
    async getCustomers() {
      const response = await apiClient.get(API_CONFIG.ENDPOINTS.ADMIN.CUSTOMERS);
      return response.data;
    },
    
    async getCustomer(id) {
      const response = await apiClient.get(API_CONFIG.ENDPOINTS.ADMIN.CUSTOMER(id));
      return response.data;
    },
    
    // Projects
    async createProject(projectData) {
      const response = await apiClient.post(API_CONFIG.ENDPOINTS.ADMIN.PROJECTS, projectData);
      return response.data;
    },
    
    async updateProject(id, projectData) {
      const response = await apiClient.patch(API_CONFIG.ENDPOINTS.ADMIN.PROJECT(id), projectData);
      return response.data;
    },
    
    // Invoices
    async createInvoice(invoiceData) {
      const response = await apiClient.post(API_CONFIG.ENDPOINTS.ADMIN.INVOICES, invoiceData);
      return response.data;
    },
    
    async uploadInvoicePDF(invoiceId, file) {
      const response = await apiClient.upload(
        API_CONFIG.ENDPOINTS.ADMIN.INVOICE_UPLOAD(invoiceId),
        file
      );
      return response.data;
    },
    
    // Requests
    async getRequests() {
      const response = await apiClient.get(API_CONFIG.ENDPOINTS.ADMIN.REQUESTS);
      return response.data;
    },
    
    async updateRequestStatus(requestId, status) {
      const response = await apiClient.patch(
        API_CONFIG.ENDPOINTS.ADMIN.REQUEST(requestId),
        { status }
      );
      return response.data;
    },
    
    // Messages
    async getThreads() {
      const response = await apiClient.get(API_CONFIG.ENDPOINTS.ADMIN.MESSAGES);
      return response.data;
    },
    
    async getThreadMessages(threadId) {
      const response = await apiClient.get(API_CONFIG.ENDPOINTS.ADMIN.MESSAGE_THREAD(threadId));
      return response.data;
    },
    
    async sendMessage(threadId, body) {
      const response = await apiClient.post(
        API_CONFIG.ENDPOINTS.ADMIN.MESSAGE_THREAD(threadId),
        { body }
      );
      return response.data;
    }
  };
})();
