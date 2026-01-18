// Supabase Service Layer
// Provides high-level methods for database operations using Supabase

// Get Supabase client
function getSupabase() {
  const client = window.getSupabaseClient && window.getSupabaseClient();
  if (!client) {
    console.warn('Supabase client not initialized. Make sure api/supabase-config.js is loaded.');
  }
  return client;
}

// Supabase Database Services
const SupabaseServices = {
  // ==================== CUSTOMER OPERATIONS ====================
  
  customer: {
    // Get all projects for current customer
    async getProjects() {
      const supabase = getSupabase();
      if (!supabase) throw new Error('Supabase client not available');
      
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data || [];
    },
    
    // Get single project
    async getProject(id) {
      const supabase = getSupabase();
      if (!supabase) throw new Error('Supabase client not available');
      
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('id', id)
        .single();
      
      if (error) throw error;
      return data;
    },
    
    // Get all invoices for current customer
    async getInvoices() {
      const supabase = getSupabase();
      if (!supabase) throw new Error('Supabase client not available');
      
      const { data, error } = await supabase
        .from('invoices')
        .select('*')
        .order('issued_at', { ascending: false });
      
      if (error) throw error;
      return data || [];
    },
    
    // Get single invoice
    async getInvoice(id) {
      const supabase = getSupabase();
      if (!supabase) throw new Error('Supabase client not available');
      
      const { data, error } = await supabase
        .from('invoices')
        .select('*')
        .eq('id', id)
        .single();
      
      if (error) throw error;
      return data;
    },
    
    // Get all message threads for current customer
    async getThreads() {
      const supabase = getSupabase();
      if (!supabase) throw new Error('Supabase client not available');
      
      const { data, error } = await supabase
        .from('threads')
        .select('*')
        .order('updated_at', { ascending: false });
      
      if (error) throw error;
      return data || [];
    },
    
    // Get messages for a thread
    async getThreadMessages(threadId) {
      const supabase = getSupabase();
      if (!supabase) throw new Error('Supabase client not available');
      
      const { data, error } = await supabase
        .from('messages')
        .select('*')
        .eq('thread_id', threadId)
        .order('created_at', { ascending: true });
      
      if (error) throw error;
      return data || [];
    },
    
    // Send message in thread
    async sendMessage(threadId, body) {
      const supabase = getSupabase();
      if (!supabase) throw new Error('Supabase client not available');
      
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');
      
      // Determine sender role (customer)
      const senderRole = 'customer';
      
      const { data, error } = await supabase
        .from('messages')
        .insert({
          thread_id: threadId,
          sender_role: senderRole,
          body: body
        })
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    
    // Create new thread
    async createThread(subject, projectId = null) {
      const supabase = getSupabase();
      if (!supabase) throw new Error('Supabase client not available');
      
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');
      
      // Get customer ID from user email
      const { data: customer } = await supabase
        .from('customers')
        .select('id')
        .eq('email', user.email)
        .single();
      
      if (!customer) throw new Error('Customer not found');
      
      const { data, error } = await supabase
        .from('threads')
        .insert({
          customer_id: customer.id,
          project_id: projectId,
          subject: subject
        })
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    
    // Get all requests for current customer
    async getRequests() {
      const supabase = getSupabase();
      if (!supabase) throw new Error('Supabase client not available');
      
      const { data, error } = await supabase
        .from('requests')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data || [];
    },
    
    // Create new request
    async createRequest(requestData) {
      const supabase = getSupabase();
      if (!supabase) throw new Error('Supabase client not available');
      
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');
      
      // Get customer ID from user email
      const { data: customer } = await supabase
        .from('customers')
        .select('id')
        .eq('email', user.email)
        .single();
      
      if (!customer) throw new Error('Customer not found');
      
      const { data, error } = await supabase
        .from('requests')
        .insert({
          customer_id: customer.id,
          type: requestData.type,
          category: requestData.category || 'Special Request',
          details: requestData.details || {},
          status: 'New'
        })
        .select()
        .single();
      
      if (error) throw error;
      
      // Create notification for admin
      await supabase
        .from('admin_notifications')
        .insert({
          kind: 'request',
          title: `New Request: ${requestData.category || 'Special Request'} project`,
          customer_id: customer.id,
          related_id: data.id,
          is_read: false
        });
      
      return data;
    }
  },
  
  // ==================== ADMIN OPERATIONS ====================
  
  admin: {
    // Get all customers
    async getCustomers() {
      const supabase = getSupabase();
      if (!supabase) throw new Error('Supabase client not available');
      
      const { data, error } = await supabase
        .from('customers')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data || [];
    },
    
    // Get customer with all related data
    async getCustomer(id) {
      const supabase = getSupabase();
      if (!supabase) throw new Error('Supabase client not available');
      
      // Get customer
      const { data: customer, error: customerError } = await supabase
        .from('customers')
        .select('*')
        .eq('id', id)
        .single();
      
      if (customerError) throw customerError;
      
      // Get related data
      const [projects, invoices, threads, requests] = await Promise.all([
        supabase.from('projects').select('*').eq('customer_id', id),
        supabase.from('invoices').select('*').eq('customer_id', id),
        supabase.from('threads').select('*').eq('customer_id', id),
        supabase.from('requests').select('*').eq('customer_id', id)
      ]);
      
      return {
        ...customer,
        projects: projects.data || [],
        invoices: invoices.data || [],
        threads: threads.data || [],
        requests: requests.data || []
      };
    },
    
    // Create project
    async createProject(projectData) {
      const supabase = getSupabase();
      if (!supabase) throw new Error('Supabase client not available');
      
      const { data, error } = await supabase
        .from('projects')
        .insert({
          customer_id: projectData.customerId,
          title: projectData.title,
          status: projectData.status || 'In Progress',
          scope_summary: projectData.scopeSummary
        })
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    
    // Update project
    async updateProject(id, projectData) {
      const supabase = getSupabase();
      if (!supabase) throw new Error('Supabase client not available');
      
      const updateData = {};
      if (projectData.title !== undefined) updateData.title = projectData.title;
      if (projectData.status !== undefined) updateData.status = projectData.status;
      if (projectData.scope_summary !== undefined) updateData.scope_summary = projectData.scopeSummary;
      
      const { data, error } = await supabase
        .from('projects')
        .update(updateData)
        .eq('id', id)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    
    // Create invoice
    async createInvoice(invoiceData) {
      const supabase = getSupabase();
      if (!supabase) throw new Error('Supabase client not available');
      
      const { data, error } = await supabase
        .from('invoices')
        .insert({
          customer_id: invoiceData.customerId,
          project_id: invoiceData.projectId || null,
          amount: invoiceData.amount,
          status: invoiceData.status || 'Pending',
          pdf_url: invoiceData.pdfUrl || null,
          issued_at: invoiceData.issuedAt,
          due_at: invoiceData.dueAt
        })
        .select()
        .single();
      
      if (error) throw error;
      
      // Create notification if overdue
      if (invoiceData.status === 'Overdue') {
        await supabase
          .from('admin_notifications')
          .insert({
            kind: 'invoice',
            title: `Invoice Overdue: Invoice ${data.id}`,
            customer_id: invoiceData.customerId,
            related_id: data.id,
            is_read: false
          });
      }
      
      // Transform to match frontend format
      return {
        id: data.id,
        customer_id: data.customer_id,
        project_id: data.project_id,
        amount: parseFloat(data.amount),
        status: data.status,
        pdf_url: data.pdf_url,
        pdfUrl: data.pdf_url, // Also include camelCase version
        issued_at: data.issued_at,
        due_at: data.due_at,
        created_at: data.created_at,
        updated_at: data.updated_at
      };
    },
    
    // Upload invoice PDF (returns file URL)
    async uploadInvoicePDF(invoiceId, file) {
      const supabase = getSupabase();
      if (!supabase) throw new Error('Supabase client not available');
      
      const fileExt = file.name.split('.').pop();
      const fileName = `invoice-${invoiceId}-${Date.now()}.${fileExt}`;
      const filePath = `invoices/${fileName}`;
      
      // Upload file to Supabase Storage
      // Note: You'll need to create an 'invoices' bucket in Supabase Storage first
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('invoices')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false
        });
      
      if (uploadError) throw uploadError;
      
      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('invoices')
        .getPublicUrl(filePath);
      
      // Update invoice with PDF URL
      const { data, error } = await supabase
        .from('invoices')
        .update({ pdf_url: publicUrl })
        .eq('id', invoiceId)
        .select()
        .single();
      
      if (error) throw error;
      
      // Transform to match frontend format
      return {
        id: data.id,
        customer_id: data.customer_id,
        project_id: data.project_id,
        amount: parseFloat(data.amount),
        status: data.status,
        pdf_url: data.pdf_url,
        pdfUrl: data.pdf_url, // Also include camelCase version
        issued_at: data.issued_at,
        due_at: data.due_at,
        created_at: data.created_at,
        updated_at: data.updated_at
      };
    },
    
    // Get all requests
    async getRequests() {
      const supabase = getSupabase();
      if (!supabase) throw new Error('Supabase client not available');
      
      const { data, error } = await supabase
        .from('requests')
        .select(`
          *,
          customers (id, name, email, company)
        `)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data || [];
    },
    
    // Update request status
    async updateRequestStatus(requestId, status) {
      const supabase = getSupabase();
      if (!supabase) throw new Error('Supabase client not available');
      
      const { data, error } = await supabase
        .from('requests')
        .update({ status: status })
        .eq('id', requestId)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    
    // Get all message threads
    async getThreads() {
      const supabase = getSupabase();
      if (!supabase) throw new Error('Supabase client not available');
      
      const { data, error } = await supabase
        .from('threads')
        .select(`
          *,
          customers (id, name, email, company)
        `)
        .order('updated_at', { ascending: false });
      
      if (error) throw error;
      return data || [];
    },
    
    // Get thread messages
    async getThreadMessages(threadId) {
      const supabase = getSupabase();
      if (!supabase) throw new Error('Supabase client not available');
      
      const { data, error } = await supabase
        .from('messages')
        .select('*')
        .eq('thread_id', threadId)
        .order('created_at', { ascending: true });
      
      if (error) throw error;
      return data || [];
    },
    
    // Send message (admin reply)
    async sendMessage(threadId, body) {
      const supabase = getSupabase();
      if (!supabase) throw new Error('Supabase client not available');
      
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');
      
      const senderRole = 'admin';
      
      const { data, error } = await supabase
        .from('messages')
        .insert({
          thread_id: threadId,
          sender_role: senderRole,
          body: body
        })
        .select()
        .single();
      
      if (error) throw error;
      
      // Update thread updated_at
      await supabase
        .from('threads')
        .update({ updated_at: new Date().toISOString() })
        .eq('id', threadId);
      
      return data;
    },
    
    // Get admin notifications
    async getNotifications(filter = 'all') {
      const supabase = getSupabase();
      if (!supabase) throw new Error('Supabase client not available');
      
      let query = supabase
        .from('admin_notifications')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (filter === 'unread') {
        query = query.eq('is_read', false);
      } else if (filter !== 'all') {
        query = query.eq('kind', filter);
      }
      
      const { data, error } = await query;
      
      if (error) throw error;
      return data || [];
    },
    
    // Mark notification as read
    async markNotificationRead(notificationId) {
      const supabase = getSupabase();
      if (!supabase) throw new Error('Supabase client not available');
      
      const { data, error } = await supabase
        .from('admin_notifications')
        .update({ is_read: true })
        .eq('id', notificationId)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    }
  }
};

// Export for use in portal.js
window.SupabaseServices = SupabaseServices;
