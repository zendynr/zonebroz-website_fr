// ==================== MOCK DATA ====================

const mockCustomers = [
  {
    id: 'cust-1',
    name: 'Jane Smith',
    company: 'Acme Corp',
    email: 'jane@acmecorp.com'
  },
  {
    id: 'cust-2',
    name: 'John Doe',
    company: 'TechStart Inc',
    email: 'john@techstart.com'
  },
  {
    id: 'cust-3',
    name: 'Sarah Johnson',
    company: 'Digital Solutions',
    email: 'sarah@digitalsolutions.com'
  },
  {
    id: 'cust-4',
    name: 'Michael Chen',
    company: 'Cloud Innovations',
    email: 'michael@cloudinnovations.com'
  },
  {
    id: 'cust-5',
    name: 'Emily Rodriguez',
    company: 'Creative Agency',
    email: 'emily@creativeagency.com'
  },
  {
    id: 'cust-6',
    name: 'David Williams',
    company: 'StartupHub',
    email: 'david@startuphub.com'
  }
];

const mockProjects = [
  {
    id: 'proj-1',
    customerId: 'cust-1',
    title: 'E-commerce Platform Redesign',
    status: 'In Progress',
    scopeSummary: 'Complete redesign of customer-facing e-commerce platform with new checkout flow and mobile optimization.'
  },
  {
    id: 'proj-2',
    customerId: 'cust-1',
    title: 'Mobile App Development',
    status: 'Needs Funding',
    scopeSummary: 'Native iOS and Android app for managing customer orders and inventory.'
  },
  {
    id: 'proj-3',
    customerId: 'cust-2',
    title: 'Brand Identity Package',
    status: 'Completed',
    scopeSummary: 'Logo design, color palette, typography guide, and brand guidelines documentation.'
  },
  {
    id: 'proj-4',
    customerId: 'cust-3',
    title: 'Dashboard Analytics Tool',
    status: 'Paused',
    scopeSummary: 'Real-time analytics dashboard with custom reporting and data visualization.'
  }
];

// Helper function to get date string N days ago
function getDateDaysAgo(days) {
  const date = new Date();
  date.setDate(date.getDate() - days);
  return date.toISOString().split('T')[0];
}

// Helper function to get date string N months ago
function getDateMonthsAgo(months) {
  const date = new Date();
  date.setMonth(date.getMonth() - months);
  return date.toISOString().split('T')[0];
}

const mockInvoices = [
  {
    id: 'inv-1',
    customerId: 'cust-1',
    projectId: 'proj-1',
    amount: 12500.00,
    status: 'Paid',
    pdfUrl: '#',
    issuedAt: '2024-01-15',
    dueAt: '2024-02-15'
  },
  {
    id: 'inv-2',
    customerId: 'cust-1',
    projectId: 'proj-1',
    amount: 8750.00,
    status: 'Pending',
    pdfUrl: '#',
    issuedAt: '2024-02-20',
    dueAt: '2024-03-20'
  },
  {
    id: 'inv-3',
    customerId: 'cust-2',
    projectId: 'proj-3',
    amount: 5000.00,
    status: 'Paid',
    pdfUrl: '#',
    issuedAt: '2024-01-10',
    dueAt: '2024-02-10'
  },
  {
    id: 'inv-4',
    customerId: 'cust-3',
    projectId: 'proj-4',
    amount: 15000.00,
    status: 'Overdue',
    pdfUrl: '#',
    issuedAt: '2024-01-01',
    dueAt: '2024-02-01'
  },
  // Recent paid invoices for Revenue Performance testing
  {
    id: 'inv-5',
    customerId: 'cust-1',
    projectId: 'proj-1',
    amount: 3200.00,
    status: 'Paid',
    pdfUrl: '#',
    issuedAt: getDateDaysAgo(1), // Yesterday
    dueAt: getDateDaysAgo(-29)
  },
  {
    id: 'inv-6',
    customerId: 'cust-2',
    projectId: 'proj-3',
    amount: 4500.00,
    status: 'Paid',
    pdfUrl: '#',
    issuedAt: getDateDaysAgo(3), // 3 days ago
    dueAt: getDateDaysAgo(-27)
  },
  {
    id: 'inv-7',
    customerId: 'cust-1',
    projectId: 'proj-2',
    amount: 6800.00,
    status: 'Paid',
    pdfUrl: '#',
    issuedAt: getDateDaysAgo(5), // 5 days ago
    dueAt: getDateDaysAgo(-25)
  },
  {
    id: 'inv-8',
    customerId: 'cust-3',
    projectId: 'proj-4',
    amount: 9200.00,
    status: 'Paid',
    pdfUrl: '#',
    issuedAt: getDateDaysAgo(7), // 7 days ago
    dueAt: getDateDaysAgo(-23)
  },
  {
    id: 'inv-9',
    customerId: 'cust-2',
    projectId: 'proj-3',
    amount: 5500.00,
    status: 'Paid',
    pdfUrl: '#',
    issuedAt: getDateDaysAgo(10), // 10 days ago
    dueAt: getDateDaysAgo(-20)
  },
  {
    id: 'inv-10',
    customerId: 'cust-1',
    projectId: 'proj-1',
    amount: 7800.00,
    status: 'Paid',
    pdfUrl: '#',
    issuedAt: getDateDaysAgo(15), // 15 days ago
    dueAt: getDateDaysAgo(-15)
  },
  {
    id: 'inv-11',
    customerId: 'cust-3',
    projectId: 'proj-4',
    amount: 11200.00,
    status: 'Paid',
    pdfUrl: '#',
    issuedAt: getDateDaysAgo(20), // 20 days ago
    dueAt: getDateDaysAgo(-10)
  },
  {
    id: 'inv-12',
    customerId: 'cust-2',
    projectId: 'proj-3',
    amount: 3400.00,
    status: 'Paid',
    pdfUrl: '#',
    issuedAt: getDateDaysAgo(25), // 25 days ago
    dueAt: getDateDaysAgo(-5)
  },
  {
    id: 'inv-13',
    customerId: 'cust-1',
    projectId: 'proj-2',
    amount: 8900.00,
    status: 'Paid',
    pdfUrl: '#',
    issuedAt: getDateMonthsAgo(2), // 2 months ago
    dueAt: getDateMonthsAgo(1)
  },
  {
    id: 'inv-14',
    customerId: 'cust-3',
    projectId: 'proj-4',
    amount: 15600.00,
    status: 'Paid',
    pdfUrl: '#',
    issuedAt: getDateMonthsAgo(3), // 3 months ago
    dueAt: getDateMonthsAgo(2)
  },
  {
    id: 'inv-15',
    customerId: 'cust-2',
    projectId: 'proj-3',
    amount: 7200.00,
    status: 'Paid',
    pdfUrl: '#',
    issuedAt: getDateMonthsAgo(5), // 5 months ago
    dueAt: getDateMonthsAgo(4)
  },
  {
    id: 'inv-16',
    customerId: 'cust-1',
    projectId: 'proj-1',
    amount: 10300.00,
    status: 'Paid',
    pdfUrl: '#',
    issuedAt: getDateMonthsAgo(8), // 8 months ago
    dueAt: getDateMonthsAgo(7)
  },
  {
    id: 'inv-17',
    customerId: 'cust-3',
    projectId: 'proj-4',
    amount: 6400.00,
    status: 'Paid',
    pdfUrl: '#',
    issuedAt: getDateMonthsAgo(10), // 10 months ago
    dueAt: getDateMonthsAgo(9)
  },
  {
    id: 'inv-18',
    customerId: 'cust-2',
    projectId: 'proj-3',
    amount: 12800.00,
    status: 'Paid',
    pdfUrl: '#',
    issuedAt: getDateMonthsAgo(11), // 11 months ago
    dueAt: getDateMonthsAgo(10)
  }
];

// Helper function to get timestamp N hours/minutes ago
function getTimestampHoursAgo(hours) {
  const date = new Date();
  date.setHours(date.getHours() - hours);
  return date.toISOString();
}

function getTimestampMinutesAgo(minutes) {
  const date = new Date();
  date.setMinutes(date.getMinutes() - minutes);
  return date.toISOString();
}

const mockThreads = [
  {
    id: 'thread-1',
    customerId: 'cust-1',
    subject: 'Question about e-commerce project timeline',
    projectId: 'proj-1'
  },
  {
    id: 'thread-2',
    customerId: 'cust-1',
    subject: 'Mobile app design feedback',
    projectId: 'proj-2'
  },
  {
    id: 'thread-3',
    customerId: 'cust-2',
    subject: 'Brand guidelines delivery',
    projectId: 'proj-3'
  },
  {
    id: 'thread-4',
    customerId: 'cust-3',
    subject: 'Dashboard feature request',
    projectId: 'proj-4'
  },
  {
    id: 'thread-5',
    customerId: 'cust-4',
    subject: 'Cloud migration consultation',
    projectId: null
  },
  {
    id: 'thread-6',
    customerId: 'cust-5',
    subject: 'Website redesign proposal',
    projectId: null
  },
  {
    id: 'thread-7',
    customerId: 'cust-6',
    subject: 'Mobile app development inquiry',
    projectId: null
  },
  {
    id: 'thread-8',
    customerId: 'cust-2',
    subject: 'Payment integration support',
    projectId: 'proj-3'
  },
  {
    id: 'thread-9',
    customerId: 'cust-4',
    subject: 'API documentation questions',
    projectId: null
  }
];

const mockMessages = [
  // Thread 1 - Recent conversation (Jane Smith)
  {
    id: 'msg-1',
    threadId: 'thread-1',
    senderRole: 'customer',
    body: 'Hi, I wanted to check on the timeline for the e-commerce redesign. When can we expect the first prototype?',
    createdAt: getTimestampHoursAgo(5)
  },
  {
    id: 'msg-2',
    threadId: 'thread-1',
    senderRole: 'admin',
    body: 'Thanks for reaching out! We\'re on track and should have the first prototype ready by next Friday. I\'ll send it over as soon as it\'s ready.',
    createdAt: getTimestampHoursAgo(4)
  },
  {
    id: 'msg-3',
    threadId: 'thread-1',
    senderRole: 'customer',
    body: 'Perfect, looking forward to it!',
    createdAt: getTimestampHoursAgo(3)
  },
  {
    id: 'msg-4',
    threadId: 'thread-1',
    senderRole: 'admin',
    body: 'Great! I\'ll keep you updated as we progress.',
    createdAt: getTimestampHoursAgo(2)
  },
  // Thread 2 - Very recent (Jane Smith)
  {
    id: 'msg-5',
    threadId: 'thread-2',
    senderRole: 'customer',
    body: 'The mobile app designs look great! Can we adjust the color scheme to match our brand guidelines a bit more closely?',
    createdAt: getTimestampMinutesAgo(30)
  },
  {
    id: 'msg-6',
    threadId: 'thread-2',
    senderRole: 'admin',
    body: 'Absolutely! I can make those adjustments. Which specific colors from your brand guidelines would you like me to use?',
    createdAt: getTimestampMinutesAgo(15)
  },
  // Thread 3 - Yesterday (John Doe)
  {
    id: 'msg-7',
    threadId: 'thread-3',
    senderRole: 'admin',
    body: 'The brand guidelines document has been finalized and is ready for download. You should receive an email with the link shortly.',
    createdAt: getTimestampHoursAgo(24)
  },
  {
    id: 'msg-8',
    threadId: 'thread-3',
    senderRole: 'customer',
    body: 'Perfect, thank you so much! The guidelines look excellent.',
    createdAt: getTimestampHoursAgo(23)
  },
  // Thread 4 - 2 days ago (Sarah Johnson)
  {
    id: 'msg-9',
    threadId: 'thread-4',
    senderRole: 'customer',
    body: 'Is it possible to add real-time notifications to the dashboard? This would be a huge value-add for our team.',
    createdAt: getTimestampHoursAgo(48)
  },
  {
    id: 'msg-10',
    threadId: 'thread-4',
    senderRole: 'admin',
    body: 'Yes, that\'s definitely possible! I can add real-time notifications using WebSockets. Let me create a proposal for you.',
    createdAt: getTimestampHoursAgo(47)
  },
  {
    id: 'msg-11',
    threadId: 'thread-4',
    senderRole: 'customer',
    body: 'That sounds perfect! Looking forward to seeing the proposal.',
    createdAt: getTimestampHoursAgo(46)
  },
  // Thread 5 - Recent (Michael Chen)
  {
    id: 'msg-12',
    threadId: 'thread-5',
    senderRole: 'customer',
    body: 'Hi! I\'m interested in migrating our infrastructure to the cloud. Can we schedule a consultation?',
    createdAt: getTimestampHoursAgo(12)
  },
  {
    id: 'msg-13',
    threadId: 'thread-5',
    senderRole: 'admin',
    body: 'Hi Michael! Absolutely, I\'d be happy to help with your cloud migration. What\'s your availability this week?',
    createdAt: getTimestampHoursAgo(11)
  },
  {
    id: 'msg-14',
    threadId: 'thread-5',
    senderRole: 'customer',
    body: 'I\'m free Tuesday or Wednesday afternoon. Does either work for you?',
    createdAt: getTimestampHoursAgo(10)
  },
  {
    id: 'msg-15',
    threadId: 'thread-5',
    senderRole: 'admin',
    body: 'Wednesday afternoon works perfectly! I\'ll send you a calendar invite.',
    createdAt: getTimestampHoursAgo(9)
  },
  // Thread 6 - Very recent (Emily Rodriguez)
  {
    id: 'msg-16',
    threadId: 'thread-6',
    senderRole: 'customer',
    body: 'Hey! I saw your portfolio and I\'m really impressed. We\'re looking to redesign our website. Are you available for new projects?',
    createdAt: getTimestampMinutesAgo(45)
  },
  {
    id: 'msg-17',
    threadId: 'thread-6',
    senderRole: 'admin',
    body: 'Hi Emily! Thank you so much! Yes, we\'re currently taking on new projects. I\'d love to learn more about what you have in mind.',
    createdAt: getTimestampMinutesAgo(30)
  },
  {
    id: 'msg-18',
    threadId: 'thread-6',
    senderRole: 'customer',
    body: 'Great! We\'re a creative agency and need a modern, portfolio-style website. Can we set up a call to discuss?',
    createdAt: getTimestampMinutesAgo(20)
  },
  // Thread 7 - 3 days ago (David Williams)
  {
    id: 'msg-19',
    threadId: 'thread-7',
    senderRole: 'customer',
    body: 'Hi there! I\'m interested in developing a mobile app for my startup. What\'s your typical timeline for app development?',
    createdAt: getTimestampHoursAgo(72)
  },
  {
    id: 'msg-20',
    threadId: 'thread-7',
    senderRole: 'admin',
    body: 'Hi David! Great question. The timeline depends on the complexity, but typically 3-6 months for a full mobile app. What kind of app are you looking to build?',
    createdAt: getTimestampHoursAgo(71)
  },
  {
    id: 'msg-21',
    threadId: 'thread-7',
    senderRole: 'customer',
    body: 'It\'s a social networking app with real-time messaging. I can share more details if you\'re interested.',
    createdAt: getTimestampHoursAgo(70)
  },
  // Thread 8 - Recent (John Doe - second thread)
  {
    id: 'msg-22',
    threadId: 'thread-8',
    senderRole: 'customer',
    body: 'I\'m having some issues with the payment integration. The transactions aren\'t processing correctly.',
    createdAt: getTimestampHoursAgo(6)
  },
  {
    id: 'msg-23',
    threadId: 'thread-8',
    senderRole: 'admin',
    body: 'I\'m sorry to hear that! Let me investigate this right away. Can you share any error messages you\'re seeing?',
    createdAt: getTimestampHoursAgo(5)
  },
  {
    id: 'msg-24',
    threadId: 'thread-8',
    senderRole: 'customer',
    body: 'The error says "Payment gateway timeout". It happens randomly, not every time.',
    createdAt: getTimestampHoursAgo(4)
  },
  {
    id: 'msg-25',
    threadId: 'thread-8',
    senderRole: 'admin',
    body: 'Thanks for the details. This sounds like a connection issue with the payment gateway. I\'ll check our API logs and get back to you within the hour.',
    createdAt: getTimestampHoursAgo(3)
  },
  // Thread 9 - 1 week ago (Michael Chen - second thread)
  {
    id: 'msg-26',
    threadId: 'thread-9',
    senderRole: 'customer',
    body: 'I have a few questions about the API documentation. Is there a way to filter results by date range?',
    createdAt: getTimestampHoursAgo(168)
  },
  {
    id: 'msg-27',
    threadId: 'thread-9',
    senderRole: 'admin',
    body: 'Yes! You can use the `startDate` and `endDate` query parameters. I\'ll send you an example in the updated docs.',
    createdAt: getTimestampHoursAgo(167)
  },
  {
    id: 'msg-28',
    threadId: 'thread-9',
    senderRole: 'customer',
    body: 'Perfect, that\'s exactly what I needed. Thanks!',
    createdAt: getTimestampHoursAgo(166)
  }
];

const mockRequests = [
  {
    id: 'req-1',
    customerId: 'cust-1',
    type: 'report',
    category: 'Web&App',
    details: {
      logicComplexity: 4,
      uiComplexity: 3,
      accessibilityRequired: true,
      securityRequired: false,
      ideaClarity: 5,
      notes: 'Need a detailed report on the feasibility of implementing a new payment gateway integration.'
    },
    status: 'In Review',
    createdAt: '2024-02-10T10:00:00Z'
  },
  {
    id: 'req-2',
    customerId: 'cust-1',
    type: 'change',
    category: 'Websites',
    details: {
      notes: 'Please change the checkout button color to match our brand (#FF6B35)'
    },
    status: 'Done',
    createdAt: '2024-02-05T14:30:00Z'
  },
  {
    id: 'req-3',
    customerId: 'cust-2',
    type: 'quote',
    category: 'Websites',
    details: {
      notes: 'Requesting a quote for additional brand asset creation (social media templates, business cards)'
    },
    status: 'New',
    createdAt: '2024-02-22T09:00:00Z'
  },
  {
    id: 'req-4',
    customerId: 'cust-3',
    type: 'quality',
    category: 'Apps',
    details: {
      notes: 'Can we get a quality assessment report for the dashboard performance?'
    },
    status: 'New',
    createdAt: '2024-02-23T11:20:00Z'
  },
  {
    id: 'req-5',
    customerId: 'cust-1',
    type: 'quote',
    category: 'Web Apps',
    details: {
      notes: 'Looking for a quote on a progressive web app for mobile users.'
    },
    status: 'New',
    createdAt: '2024-02-24T10:00:00Z'
  },
  {
    id: 'req-6',
    customerId: 'cust-2',
    type: 'report',
    category: 'Product Review',
    details: {
      notes: 'Need a comprehensive product review for our existing mobile application.'
    },
    status: 'New',
    createdAt: '2024-02-25T09:00:00Z'
  }
];

const mockAdminNotifications = [
  {
    id: 'notif-1',
    kind: 'request',
    title: 'New Request: Web&App project',
    customerId: 'cust-1',
    relatedId: 'req-1',
    isRead: false,
    createdAt: '2024-02-10T10:00:00Z'
  },
  {
    id: 'notif-2',
    kind: 'invoice',
    title: 'Invoice Overdue: Invoice inv-4',
    customerId: 'cust-3',
    relatedId: 'inv-4',
    isRead: false,
    createdAt: '2024-02-25T09:00:00Z'
  },
  {
    id: 'notif-3',
    kind: 'message',
    title: 'New message from Customer: Jane Smith',
    customerId: 'cust-1',
    relatedId: 'thread-1',
    isRead: true,
    createdAt: '2024-02-15T10:30:00Z'
  },
  {
    id: 'notif-4',
    kind: 'request',
    title: 'New Request: Websites quote',
    customerId: 'cust-2',
    relatedId: 'req-3',
    isRead: false,
    createdAt: '2024-02-22T09:00:00Z'
  }
];

// ==================== STATE MANAGEMENT ====================

class PortalStore {
  constructor() {
    // Supabase Integration: Enable/disable Supabase mode
    // Set to true to use Supabase, false to use mock data (for development)
    // Automatically enables if SupabaseServices is loaded
    this.useSupabase = typeof window !== 'undefined' && window.SupabaseServices && window.getSupabaseClient ? true : false;
    
    // Initialize with mock data (will be replaced by Supabase calls if useSupabase is true)
    this.customers = [...mockCustomers];
    this.projects = [...mockProjects];
    this.invoices = [...mockInvoices];
    this.threads = [...mockThreads];
    this.messages = [...mockMessages];
    this.requests = [...mockRequests];
    this.adminNotifications = [...mockAdminNotifications];
    this.listeners = [];
    // Project-first: selected project ID (null means "All Projects")
    this.selectedProjectId = null;
    
    // Data loading flags (for Supabase mode)
    this.dataLoaded = {
      customers: false,
      projects: false,
      invoices: false,
      threads: false,
      messages: false,
      requests: false,
      notifications: false
    };
    
    // Load initial data from Supabase if enabled
    if (this.useSupabase) {
      this.loadInitialData();
    }
  }
  
  // Load initial data from Supabase
  async loadInitialData() {
    if (!this.useSupabase || !window.SupabaseServices) {
      console.log('Supabase mode disabled - using mock data');
      return;
    }
    
    try {
      console.log('Supabase mode enabled - will use Supabase for data operations');
      // Data will be loaded on-demand when pages are accessed
      // This keeps initial load fast
    } catch (error) {
      console.error('Failed to initialize Supabase data:', error);
      // Fallback to mock data if Supabase initialization fails
      this.useSupabase = false;
    }
  }
  
  // Load customers (admin only)
  async loadCustomers() {
    if (!this.useSupabase || !window.SupabaseServices) {
      return this.customers;
    }
    
    if (this.dataLoaded.customers) {
      return this.customers;
    }
    
    try {
      this.customers = await window.SupabaseServices.admin.getCustomers();
      this.dataLoaded.customers = true;
      this.notify();
      return this.customers;
    } catch (error) {
      console.error('Failed to load customers:', error);
      return this.customers; // Fallback to mock data
    }
  }
  
  // Load projects for current user
  async loadProjects() {
    if (!this.useSupabase || !window.SupabaseServices) {
      return this.projects;
    }
    
    if (this.dataLoaded.projects) {
      return this.projects;
    }
    
    try {
      const session = await AuthService.getSession();
      if (session?.role === 'admin') {
        // Admin sees all projects (will be loaded via customers)
        return this.projects;
      } else {
        // Customer sees their own projects
        this.projects = await window.SupabaseServices.customer.getProjects();
        this.dataLoaded.projects = true;
        this.notify();
        return this.projects;
      }
    } catch (error) {
      console.error('Failed to load projects:', error);
      return this.projects; // Fallback to mock data
    }
  }
  
  // Load invoices for current user
  async loadInvoices() {
    if (!this.useSupabase || !window.SupabaseServices) {
      return this.invoices;
    }
    
    if (this.dataLoaded.invoices) {
      return this.invoices;
    }
    
    try {
      const session = await AuthService.getSession();
      if (session?.role === 'admin') {
        // Admin sees all invoices (will be loaded via customers)
        return this.invoices;
      } else {
        // Customer sees their own invoices
        this.invoices = await window.SupabaseServices.customer.getInvoices();
        this.dataLoaded.invoices = true;
        this.notify();
        return this.invoices;
      }
    } catch (error) {
      console.error('Failed to load invoices:', error);
      return this.invoices; // Fallback to mock data
    }
  }
  
  // Load threads for current user
  async loadThreads() {
    if (!this.useSupabase || !window.SupabaseServices) {
      return this.threads;
    }
    
    if (this.dataLoaded.threads) {
      return this.threads;
    }
    
    try {
      const session = await AuthService.getSession();
      if (session?.role === 'admin') {
        this.threads = await window.SupabaseServices.admin.getThreads();
      } else {
        this.threads = await window.SupabaseServices.customer.getThreads();
      }
      this.dataLoaded.threads = true;
      this.notify();
      return this.threads;
    } catch (error) {
      console.error('Failed to load threads:', error);
      return this.threads; // Fallback to mock data
    }
  }
  
  // Load messages for a thread
  async loadThreadMessages(threadId) {
    if (!this.useSupabase || !window.SupabaseServices) {
      return this.messages.filter(m => m.threadId === threadId);
    }
    
    try {
      const session = await AuthService.getSession();
      let threadMessages;
      
      if (session?.role === 'admin') {
        threadMessages = await window.SupabaseServices.admin.getThreadMessages(threadId);
      } else {
        threadMessages = await window.SupabaseServices.customer.getThreadMessages(threadId);
      }
      
      // Update local messages array
      // Remove old messages for this thread
      this.messages = this.messages.filter(m => m.threadId !== threadId);
      // Add new messages
      this.messages.push(...threadMessages);
      
      this.notify();
      return threadMessages;
    } catch (error) {
      console.error('Failed to load thread messages:', error);
      return this.messages.filter(m => m.threadId === threadId); // Fallback to mock data
    }
  }
  
  // Load requests for current user
  async loadRequests() {
    if (!this.useSupabase || !window.SupabaseServices) {
      return this.requests;
    }
    
    if (this.dataLoaded.requests) {
      return this.requests;
    }
    
    try {
      const session = await AuthService.getSession();
      if (session?.role === 'admin') {
        this.requests = await window.SupabaseServices.admin.getRequests();
      } else {
        this.requests = await window.SupabaseServices.customer.getRequests();
      }
      this.dataLoaded.requests = true;
      this.notify();
      return this.requests;
    } catch (error) {
      console.error('Failed to load requests:', error);
      return this.requests; // Fallback to mock data
    }
  }
  
  // Load admin notifications
  async loadNotifications(filter = 'all') {
    if (!this.useSupabase || !window.SupabaseServices) {
      return this.adminNotifications;
    }
    
    try {
      this.adminNotifications = await window.SupabaseServices.admin.getNotifications(filter);
      this.dataLoaded.notifications = true;
      this.notify();
      return this.adminNotifications;
    } catch (error) {
      console.error('Failed to load notifications:', error);
      return this.adminNotifications; // Fallback to mock data
    }
  }

  subscribe(listener) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  notify() {
    this.listeners.forEach(listener => listener(this));
  }

  // Projects
  async addProject(project) {
    if (this.useSupabase && window.SupabaseServices) {
      try {
        const newProject = await window.SupabaseServices.admin.createProject(project);
        this.projects.push(newProject);
        this.notify();
        return newProject;
      } catch (error) {
        console.error('Failed to create project:', error);
        // Fallback to mock behavior
      }
    }
    
    // Mock mode (fallback)
    const newProject = {
      ...project,
      id: `proj-${Date.now()}`
    };
    this.projects.push(newProject);
    this.notify();
    return newProject;
  }

  // Invoices
  async addInvoice(invoice, pdfFile = null) {
    if (this.useSupabase && window.SupabaseServices) {
      try {
        // Create invoice first (without PDF URL if file needs to be uploaded)
        const invoiceData = { ...invoice };
        if (pdfFile) {
          // Will set pdfUrl after upload
          delete invoiceData.pdfUrl;
        }
        
        const newInvoice = await window.SupabaseServices.admin.createInvoice(invoiceData);
        
        // If there's a PDF file, upload it and update the invoice
        if (pdfFile && newInvoice.id) {
          try {
            const updatedInvoice = await window.SupabaseServices.admin.uploadInvoicePDF(newInvoice.id, pdfFile);
            newInvoice.pdf_url = updatedInvoice.pdf_url;
            newInvoice.pdfUrl = updatedInvoice.pdf_url;
          } catch (uploadError) {
            console.error('Failed to upload invoice PDF:', uploadError);
            // Invoice was created, but PDF upload failed - continue anyway
          }
        }
        
        this.invoices.push(newInvoice);
        
        // Notification is created by SupabaseServices
        this.notify();
        return newInvoice;
      } catch (error) {
        console.error('Failed to create invoice:', error);
        // Fallback to mock behavior
      }
    }
    
    // Mock mode (fallback)
    const newInvoice = {
      ...invoice,
      id: `inv-${Date.now()}`,
      // In mock mode, just use a placeholder URL if file was provided
      pdfUrl: pdfFile ? `#pdf-${Date.now()}` : invoice.pdfUrl || '#'
    };
    this.invoices.push(newInvoice);
    
    // Create notification if invoice is overdue
    if (invoice.status === 'Overdue') {
      this.addNotification({
        kind: 'invoice',
        title: `Invoice Overdue: Invoice ${newInvoice.id}`,
        customerId: invoice.customerId,
        relatedId: newInvoice.id,
        isRead: false
      });
    }
    
    this.notify();
    return newInvoice;
  }

  // Messages
  async addMessage(message) {
    if (this.useSupabase && window.SupabaseServices) {
      try {
        const session = await AuthService.getSession();
        let newMessage;
        
        if (session?.role === 'admin') {
          newMessage = await window.SupabaseServices.admin.sendMessage(message.threadId, message.body);
        } else {
          newMessage = await window.SupabaseServices.customer.sendMessage(message.threadId, message.body);
        }
        
        this.messages.push(newMessage);
        this.notify();
        return newMessage;
      } catch (error) {
        console.error('Failed to send message:', error);
        // Fallback to mock behavior
      }
    }
    
    // Mock mode (fallback)
    const newMessage = {
      ...message,
      id: `msg-${Date.now()}`,
      createdAt: new Date().toISOString()
    };
    this.messages.push(newMessage);
    this.notify();
    return newMessage;
  }

  // Threads
  async addThread(thread) {
    if (this.useSupabase && window.SupabaseServices) {
      try {
        const newThread = await window.SupabaseServices.customer.createThread(thread.subject, thread.projectId);
        this.threads.push(newThread);
        this.notify();
        return newThread;
      } catch (error) {
        console.error('Failed to create thread:', error);
        // Fallback to mock behavior
      }
    }
    
    // Mock mode (fallback)
    const newThread = {
      ...thread,
      id: `thread-${Date.now()}`
    };
    this.threads.push(newThread);
    this.notify();
    return newThread;
  }

  // Requests
  async addRequest(request) {
    if (this.useSupabase && window.SupabaseServices) {
      try {
        const newRequest = await window.SupabaseServices.customer.createRequest(request);
        this.requests.push(newRequest);
        
        // Notification is created by SupabaseServices
        this.notify();
        return newRequest;
      } catch (error) {
        console.error('Failed to create request:', error);
        // Fallback to mock behavior
      }
    }
    
    // Mock mode (fallback)
    const newRequest = {
      ...request,
      id: `req-${Date.now()}`,
      createdAt: new Date().toISOString(),
      status: 'New',
      category: request.category || 'Special Request' // Default category
    };
    this.requests.push(newRequest);
    
    // Create notification for new request
    this.addNotification({
      kind: 'request',
      title: `New Request: ${request.category || 'Special Request'} project`,
      customerId: request.customerId,
      relatedId: newRequest.id,
      isRead: false
    });
    
    this.notify();
    return newRequest;
  }

  async updateRequestStatus(requestId, status) {
    if (this.useSupabase && window.SupabaseServices) {
      try {
        await window.SupabaseServices.admin.updateRequestStatus(requestId, status);
        // Update local state
        const request = this.requests.find(r => r.id === requestId);
        if (request) {
          request.status = status;
          this.notify();
        }
        return;
      } catch (error) {
        console.error('Failed to update request status:', error);
        // Fallback to mock behavior
      }
    }
    
    // Mock mode (fallback)
    const request = this.requests.find(r => r.id === requestId);
    if (request) {
      request.status = status;
      this.notify();
    }
  }

  // Notifications
  addNotification(notification) {
    const newNotification = {
      ...notification,
      id: `notif-${Date.now()}`,
      createdAt: new Date().toISOString()
    };
    this.adminNotifications.push(newNotification);
    this.notify();
    return newNotification;
  }

  async markNotificationRead(notificationId) {
    if (this.useSupabase && window.SupabaseServices) {
      try {
        await window.SupabaseServices.admin.markNotificationRead(notificationId);
        // Update local state
        const notification = this.adminNotifications.find(n => n.id === notificationId);
        if (notification) {
          notification.isRead = true;
          this.notify();
        }
        return;
      } catch (error) {
        console.error('Failed to mark notification as read:', error);
        // Fallback to mock behavior
      }
    }
    
    // Mock mode (fallback)
    const notification = this.adminNotifications.find(n => n.id === notificationId);
    if (notification) {
      notification.isRead = true;
      this.notify();
    }
  }

  getUnreadNotificationsCount() {
    return this.adminNotifications.filter(n => !n.isRead).length;
  }

  // Project-first: selected project management
  setSelectedProject(projectId) {
    this.selectedProjectId = projectId;
    // Persist to localStorage
    try {
      if (projectId) {
        localStorage.setItem('portalSelectedProject', projectId);
      } else {
        localStorage.removeItem('portalSelectedProject');
      }
    } catch (e) {
      // Ignore storage errors
    }
    this.notify();
  }

  getSelectedProject() {
    if (this.selectedProjectId === null) {
      // Try to restore from localStorage
      try {
        const saved = localStorage.getItem('portalSelectedProject');
        if (saved) {
          const project = this.projects.find(p => p.id === saved);
          if (project) {
            this.selectedProjectId = saved;
            return project;
          }
        }
      } catch (e) {
        // Ignore storage errors
      }
      // Default to first project if available
      const firstProject = this.projects[0];
      if (firstProject) {
        this.selectedProjectId = firstProject.id;
        return firstProject;
      }
      return null;
    }
    return this.projects.find(p => p.id === this.selectedProjectId) || null;
  }
}

const store = new PortalStore();

// Initialize selected project on load
if (store.projects.length > 0) {
  const savedProjectId = localStorage.getItem('portalSelectedProject');
  if (savedProjectId && store.projects.find(p => p.id === savedProjectId)) {
    store.selectedProjectId = savedProjectId;
  } else {
    store.selectedProjectId = store.projects[0].id;
  }
}

// ==================== AUTH MANAGEMENT ====================

// AuthService with Supabase integration
// Falls back to localStorage if Supabase is not available
const AuthService = {
  // Use Supabase Auth if available, otherwise fallback to localStorage
  useSupabase: typeof window !== 'undefined' && window.SupabaseAuthService !== undefined,

  async getSession() {
    if (this.useSupabase && window.SupabaseAuthService) {
      try {
        return await window.SupabaseAuthService.getSession();
      } catch (error) {
        console.error('Error getting session from Supabase:', error);
        // Fallback to localStorage
      }
    }

    // Fallback to localStorage (mock mode)
    try {
      const session = localStorage.getItem('portalSession');
      return session ? JSON.parse(session) : null;
    } catch {
      return null;
    }
  },

  async setSession(role, userId, email = null, password = null) {
    // If password is provided, use Supabase login
    if (this.useSupabase && window.SupabaseAuthService && email && password) {
      try {
        const result = await window.SupabaseAuthService.login(email, password, role);
        return result;
      } catch (error) {
        console.error('Supabase login error:', error);
        throw error; // Re-throw to let caller handle
      }
    }

    // Fallback to localStorage (mock mode)
    const session = { role, userId, timestamp: Date.now() };
    localStorage.setItem('portalSession', JSON.stringify(session));
    return session;
  },

  async clearSession() {
    if (this.useSupabase && window.SupabaseAuthService) {
      try {
        await window.SupabaseAuthService.logout();
        return;
      } catch (error) {
        console.error('Supabase logout error:', error);
        // Continue to clear localStorage
      }
    }

    // Fallback to localStorage
    localStorage.removeItem('portalSession');
  },

  async isAuthenticated() {
    if (this.useSupabase && window.SupabaseAuthService) {
      try {
        return await window.SupabaseAuthService.isAuthenticated();
      } catch (error) {
        console.error('Error checking authentication:', error);
        // Fallback to localStorage check
      }
    }

    // Fallback to localStorage check
    return this.getSession() !== null;
  }
};

// ==================== ROUTING ====================

class Router {
  constructor() {
    this.routes = [];
    this.currentRoute = null;
    window.addEventListener('hashchange', () => this.handleRoute());
    window.addEventListener('load', () => this.handleRoute());
  }

  addRoute(path, handler, requiresAuth = true, requiredRole = null) {
    this.routes.push({ path, handler, requiresAuth, requiredRole });
  }

  async handleRoute() {
    const hash = window.location.hash.slice(1) || '/login';
    // Extract path without query string for route matching
    const path = hash.split('?')[0];
    const route = this.routes.find(r => r.path === path);

    if (route) {
      // Check auth (async)
      const isAuth = await AuthService.isAuthenticated();
      if (route.requiresAuth && !isAuth) {
        this.navigate('/login');
        return;
      }

      const session = await AuthService.getSession();
      if (route.requiredRole && session?.role !== route.requiredRole) {
        // Redirect based on role
        if (session?.role === 'customer') {
          this.navigate('/portal');
        } else if (session?.role === 'admin') {
          this.navigate('/admin');
        } else {
          this.navigate('/login');
        }
        return;
      }

      this.currentRoute = route;
      await route.handler();
    } else {
      // Default to login if route not found
      this.navigate('/login');
    }
  }

  navigate(path) {
    window.location.hash = path;
  }
}

const router = new Router();

// ==================== UTILITY FUNCTIONS ====================

function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
}

function formatCurrency(amount) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
}

function getStatusBadge(status) {
  const badges = {
    'Paid': 'badge-success',
    'Pending': 'badge-warning',
    'Overdue': 'badge-danger',
    'New': 'badge-info',
    'In Review': 'badge-warning',
    'Done': 'badge-success',
    'Abandoned': 'badge-danger',
    'In Progress': 'badge-info',
    'Completed': 'badge-success',
    'Paused': 'badge-warning',
    'Needs Funding': 'badge-danger'
  };
  const badgeClass = badges[status] || 'badge-primary';
  return `<span class="badge ${badgeClass}">${status}</span>`;
}

function generateId() {
  return `id-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

// ==================== COMPONENTS ====================

function renderLogin() {
  const app = document.getElementById('portal-app');
  app.innerHTML = `
    <div class="page-background" aria-hidden="true"></div>
    <div class="login-container">
      <div class="login-card">
        <a href="index.html" class="back-link">← Back to Home</a>
        <h1>ZoneBroz Portal</h1>
        <p>Sign in to access your dashboard</p>
        <form class="login-form" id="login-form">
          <div class="form-group">
            <label>Role</label>
            <div class="role-toggle" id="role-toggle">
              <button type="button" class="active" data-role="customer">Customer</button>
              <button type="button" data-role="admin">Admin</button>
            </div>
          </div>
          <div class="form-group">
            <label for="email">Email</label>
            <input type="email" id="email" name="email" required placeholder="your@email.com">
          </div>
          <div class="form-group">
            <label for="password">Password</label>
            <input type="password" id="password" name="password" required placeholder="••••••••">
          </div>
          <button type="submit" class="btn btn-primary">Sign In</button>
        </form>
      </div>
    </div>
  `;

  let selectedRole = 'customer';
  const toggleButtons = app.querySelectorAll('#role-toggle button');
  toggleButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      toggleButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      selectedRole = btn.dataset.role;
    });
  });

  app.querySelector('#login-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = app.querySelector('#email').value;
    const password = app.querySelector('#password').value;
    const submitButton = app.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    
    // Disable button and show loading
    submitButton.disabled = true;
    submitButton.textContent = 'Signing in...';
    
    try {
      // Try Supabase login first (if available)
      if (AuthService.useSupabase && window.SupabaseAuthService) {
        await AuthService.setSession(selectedRole, null, email, password);
        // Session is set by SupabaseAuthService
      } else {
        // Fallback to mock mode (no password needed)
    const userId = `user-${Date.now()}`;
        await AuthService.setSession(selectedRole, userId);
      }
    
      // Navigate based on role
    if (selectedRole === 'customer') {
      router.navigate('/portal');
    } else {
      router.navigate('/admin');
      }
    } catch (error) {
      // Show error message
      console.error('Login error:', error);
      const errorMsg = document.createElement('div');
      errorMsg.className = 'error-message';
      errorMsg.style.cssText = 'color: #f87171; margin-top: 1rem; padding: 0.75rem; background: rgba(239, 68, 68, 0.1); border-radius: 8px;';
      errorMsg.textContent = error.message || 'Login failed. Please check your credentials.';
      
      // Remove existing error message if any
      const existingError = app.querySelector('.error-message');
      if (existingError) {
        existingError.remove();
      }
      
      app.querySelector('.login-form').appendChild(errorMsg);
      
      // Re-enable button
      submitButton.disabled = false;
      submitButton.textContent = originalText;
    }
  });
}

function renderCustomerLayout(content, activeNav = '') {
  const session = AuthService.getSession();
  const customer = store.customers[0]; // Mock: use first customer
  const customerProjects = store.projects.filter(p => p.customerId === 'cust-1'); // Mock
  const selectedProject = store.getSelectedProject();
  const app = document.getElementById('portal-app');
  
  // Get unread messages count (placeholder)
  const unreadMessagesCount = 3; // Mock value
  
  // Get status badge class
  function getStatusClass(status) {
    const statusMap = {
      'In Progress': 'in-progress',
      'Completed': 'completed',
      'Paused': 'paused',
      'Needs Funding': 'needs-funding'
    };
    return statusMap[status] || 'in-progress';
  }
  
  app.innerHTML = `
    <div class="page-background" aria-hidden="true"></div>
    <div class="portal-layout">
      <!-- Top Navigation Bar -->
      <nav class="portal-top-nav">
        <div class="portal-top-nav-left">
          <div>
            <div class="portal-branding">ZoneBroz Customer Portal</div>
            ${customer?.company ? `<div class="portal-company-name">${customer.company}</div>` : ''}
          </div>
          </div>
        
        <div class="portal-top-nav-center">
          <div class="project-switcher-container">
            <div class="project-switcher" id="project-switcher">
              <div class="project-switcher-label">
                <span class="project-switcher-name">${selectedProject ? selectedProject.title : 'All Projects'}</span>
                ${selectedProject ? `<span class="project-status-pill ${getStatusClass(selectedProject.status)}">${selectedProject.status}</span>` : ''}
              </div>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </div>
            <div class="project-dropdown" id="project-dropdown">
              <div class="project-dropdown-item ${!selectedProject ? 'selected' : ''}" data-project-id="">
                <span class="project-dropdown-item-name">All Projects</span>
              </div>
              ${customerProjects.map(project => `
                <div class="project-dropdown-item ${selectedProject?.id === project.id ? 'selected' : ''}" data-project-id="${project.id}">
                  <span class="project-dropdown-item-name">${project.title}</span>
                  <span class="project-status-pill ${getStatusClass(project.status)}">${project.status}</span>
                </div>
              `).join('')}
            </div>
          </div>
        </div>
        
        <div class="portal-top-nav-right">
          <button class="messages-icon-btn" onclick="window.location.hash = '#/portal/messages'" title="Messages">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
            </svg>
            ${unreadMessagesCount > 0 ? `<span class="messages-badge">${unreadMessagesCount}</span>` : ''}
          </button>
          
          <button class="btn btn-primary" onclick="openRequestProjectModal()">Request New Project</button>
          
          <div class="user-dropdown-container">
            <button class="user-dropdown-btn" id="user-dropdown-btn">
              <span>${customer?.name || 'Customer'}</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </button>
            <div class="user-dropdown-menu" id="user-dropdown-menu">
              <div class="user-dropdown-item" onclick="localStorage.removeItem('portalSession'); window.location.hash = '/login';">Sign Out</div>
            </div>
          </div>
        </div>
      </nav>
      
      <!-- Sub-navigation -->
      <div class="portal-sub-nav">
        <button class="sub-nav-item ${activeNav === 'overview' ? 'active' : ''}" onclick="window.location.hash = '#/portal'">Overview</button>
        <button class="sub-nav-item ${activeNav === 'projects' ? 'active' : ''}" onclick="window.location.hash = '#/portal/projects'">Project Info</button>
        <button class="sub-nav-item ${activeNav === 'invoices' ? 'active' : ''}" onclick="window.location.hash = '#/portal/invoices'">Invoices</button>
        <button class="sub-nav-item ${activeNav === 'messages' ? 'active' : ''}" onclick="window.location.hash = '#/portal/messages'">Messages</button>
        <button class="sub-nav-item ${activeNav === 'requests' ? 'active' : ''}" onclick="window.location.hash = '#/portal/requests'">Requests</button>
      </div>
      
      <main class="portal-main">
        <div class="portal-content">
          ${content}
        </div>
      </main>
    </div>
  `;

  // Project switcher functionality
  const projectSwitcher = app.querySelector('#project-switcher');
  const projectDropdown = app.querySelector('#project-dropdown');
  
  if (projectSwitcher && projectDropdown) {
    projectSwitcher.addEventListener('click', (e) => {
      e.stopPropagation();
      projectSwitcher.classList.toggle('open');
      projectDropdown.classList.toggle('show');
    });
    
    // Close dropdown when clicking outside
    document.addEventListener('click', (e) => {
      if (!projectSwitcher.contains(e.target) && !projectDropdown.contains(e.target)) {
        projectSwitcher.classList.remove('open');
        projectDropdown.classList.remove('show');
      }
    });
    
    // Handle project selection
    const projectItems = projectDropdown.querySelectorAll('.project-dropdown-item');
    projectItems.forEach(item => {
      item.addEventListener('click', () => {
        const projectId = item.dataset.projectId || null;
        store.setSelectedProject(projectId);
        router.handleRoute();
      });
    });
  }
  
  // User dropdown functionality
  const userDropdownBtn = app.querySelector('#user-dropdown-btn');
  const userDropdownMenu = app.querySelector('#user-dropdown-menu');
  
  if (userDropdownBtn && userDropdownMenu) {
    userDropdownBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      userDropdownMenu.classList.toggle('show');
    });
    
    document.addEventListener('click', (e) => {
      if (!userDropdownBtn.contains(e.target) && !userDropdownMenu.contains(e.target)) {
        userDropdownMenu.classList.remove('show');
      }
    });
  }
}

// Request New Project Modal
function openRequestProjectModal() {
  const app = document.getElementById('portal-app');
  
  // Check if modal already exists
  let modalOverlay = document.getElementById('request-project-modal');
  if (modalOverlay) {
    modalOverlay.classList.add('show');
    return;
  }
  
  // Create modal
  modalOverlay = document.createElement('div');
  modalOverlay.id = 'request-project-modal';
  modalOverlay.className = 'modal-overlay';
  modalOverlay.innerHTML = `
    <div class="modal-container">
      <div class="modal-header">
        <div class="modal-title">Request New Project</div>
        <button class="modal-close-btn" onclick="closeRequestProjectModal()">&times;</button>
      </div>
      <form id="new-project-request-form">
        <div class="form-group">
          <label for="project-request-type">Request Type</label>
          <select id="project-request-type" name="type" required>
            <option value="">Select type...</option>
            <option value="quote">Quote Request</option>
            <option value="new">New Project Request</option>
          </select>
        </div>
        <div class="form-group">
          <label for="project-request-description">Description</label>
          <textarea id="project-request-description" name="description" required placeholder="Describe your project needs..." rows="5"></textarea>
        </div>
        <div class="form-grid">
          <div class="form-group">
            <label for="project-request-budget">Budget Range (Optional)</label>
            <select id="project-request-budget" name="budget">
              <option value="">Not specified</option>
              <option value="under-5k">Under $5,000</option>
              <option value="5k-10k">$5,000 - $10,000</option>
              <option value="10k-25k">$10,000 - $25,000</option>
              <option value="25k-50k">$25,000 - $50,000</option>
              <option value="50k-plus">$50,000+</option>
            </select>
          </div>
          <div class="form-group">
            <label for="project-request-timeline">Timeline (Optional)</label>
            <select id="project-request-timeline" name="timeline">
              <option value="">Not specified</option>
              <option value="asap">As soon as possible</option>
              <option value="1-3months">1-3 months</option>
              <option value="3-6months">3-6 months</option>
              <option value="6-12months">6-12 months</option>
              <option value="flexible">Flexible</option>
            </select>
          </div>
        </div>
        <div style="display: flex; gap: 1rem; margin-top: 1.5rem;">
          <button type="button" class="btn btn-secondary" onclick="closeRequestProjectModal()" style="flex: 1;">Cancel</button>
          <button type="submit" class="btn btn-primary" style="flex: 1;">Submit Request</button>
        </div>
      </form>
    </div>
  `;
  
  document.body.appendChild(modalOverlay);
  
  // Show modal with animation
  setTimeout(() => {
    modalOverlay.classList.add('show');
  }, 10);
  
  // Close on overlay click
  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) {
      closeRequestProjectModal();
    }
  });
  
  // Handle form submission
  const form = modalOverlay.querySelector('#new-project-request-form');
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    
    // Create a request (similar to existing request system)
    await store.addRequest({
      customerId: 'cust-1',
      type: formData.get('type') === 'quote' ? 'quote' : 'report',
      category: 'Websites', // Default, could be made dynamic
      details: {
        notes: formData.get('description'),
        budget: formData.get('budget'),
        timeline: formData.get('timeline')
      }
    });
    
    alert('Your project request has been submitted! We\'ll get back to you soon.');
    closeRequestProjectModal();
    router.navigate('/portal/requests');
  });
}

function closeRequestProjectModal() {
  const modalOverlay = document.getElementById('request-project-modal');
  if (modalOverlay) {
    modalOverlay.classList.remove('show');
    setTimeout(() => {
      if (modalOverlay.parentNode) {
        modalOverlay.parentNode.removeChild(modalOverlay);
      }
    }, 300);
  }
}

function renderAdminLayout(content, activeNav = '') {
  const session = AuthService.getSession();
  const app = document.getElementById('portal-app');
  
  app.innerHTML = `
    <div class="page-background" aria-hidden="true"></div>
    <div class="portal-layout">
      <div class="sidebar-overlay" id="sidebar-overlay"></div>
      <aside class="portal-sidebar" id="sidebar">
        <div class="portal-sidebar-header">
          <h2>Admin Portal</h2>
          <p>ZoneBroz Studios</p>
        </div>
        <nav class="portal-nav">
          <a href="#/admin" class="nav-item ${activeNav === 'overview' ? 'active' : ''}">Overview</a>
          <a href="#/admin/customers" class="nav-item ${activeNav === 'customers' ? 'active' : ''}">Customers</a>
          <a href="#/admin/projects/new" class="nav-item ${activeNav === 'projects' ? 'active' : ''}">New Project</a>
          <a href="#/admin/invoices/new" class="nav-item ${activeNav === 'invoices' ? 'active' : ''}">New Invoice</a>
          <a href="#/admin/requests" class="nav-item ${activeNav === 'requests' ? 'active' : ''}">Requests${store.requests.filter(r => r.status === 'New').length > 0 ? `<span class="nav-badge">${store.requests.filter(r => r.status === 'New').length}</span>` : ''}</a>
          <a href="#/admin/inbox" class="nav-item ${activeNav === 'inbox' ? 'active' : ''}">Inbox${store.getUnreadNotificationsCount() > 0 ? `<span class="nav-badge">${store.getUnreadNotificationsCount()}</span>` : ''}</a>
          <a href="#/admin/messages" class="nav-item ${activeNav === 'messages' ? 'active' : ''}">Messages</a>
        </nav>
      </aside>
      <main class="portal-main">
        <header class="portal-header">
          <div>
            <button class="sidebar-toggle" id="sidebar-toggle">☰</button>
            <h1 id="page-title"></h1>
          </div>
          <div class="portal-header-actions">
            <div class="user-info">Admin</div>
            <button class="btn btn-secondary btn-small" onclick="localStorage.removeItem('portalSession'); window.location.hash = '/login';">Sign Out</button>
          </div>
        </header>
        <div class="portal-content">
          ${content}
        </div>
      </main>
    </div>
  `;

  // Mobile sidebar toggle
  const toggle = app.querySelector('#sidebar-toggle');
  const sidebar = app.querySelector('#sidebar');
  const overlay = app.querySelector('#sidebar-overlay');
  
  if (toggle) {
    toggle.addEventListener('click', () => {
      sidebar.classList.toggle('open');
      overlay.classList.toggle('show');
    });
  }
  
  if (overlay) {
    overlay.addEventListener('click', () => {
      sidebar.classList.remove('open');
      overlay.classList.remove('show');
    });
  }
}

// ==================== CUSTOMER PAGES ====================

async function renderCustomerOverview() {
  const session = await AuthService.getSession();
  
  // Load data from Supabase if enabled
  await store.loadProjects();
  await store.loadInvoices();
  await store.loadThreads();
  
  const selectedProject = store.getSelectedProject();
  const sessionData = await AuthService.getSession();
  const customerId = sessionData?.userId || 'cust-1'; // Fallback to mock ID
  const customerProjects = store.projects.filter(p => p.customerId === customerId);
  
  // Project-scoped data
  let projectInvoices = [];
  let projectThreads = [];
  let projectMessages = [];
  
  if (selectedProject) {
    projectInvoices = store.invoices.filter(i => i.customerId === customerId && i.projectId === selectedProject.id);
    projectThreads = store.threads.filter(t => t.customerId === customerId && t.projectId === selectedProject.id);
    const threadIds = projectThreads.map(t => t.id);
    projectMessages = store.messages.filter(m => threadIds.includes(m.threadId));
  } else {
    projectInvoices = store.invoices.filter(i => i.customerId === customerId);
    projectThreads = store.threads.filter(t => t.customerId === customerId);
  }
  
  const recentMessages = projectMessages
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 3);
  
  const recentInvoices = projectInvoices
    .sort((a, b) => new Date(b.issuedAt) - new Date(a.issuedAt))
    .slice(0, 3);
  
  const content = `
    <div class="project-context-header">
      <h2>Overview${selectedProject ? ` — ${selectedProject.title}` : ' — All Projects'}</h2>
      ${selectedProject ? `<div class="project-context-subtitle">${selectedProject.scopeSummary || 'Project overview and activity'}</div>` : '<div class="project-context-subtitle">Overview across all your projects</div>'}
    </div>
    
    <div class="form-grid" style="margin-bottom: 2rem;">
      <div class="card">
        <div class="card-title">Project Status</div>
        <div style="font-size: 2rem; font-weight: 700; margin-top: 1rem;">${selectedProject ? selectedProject.status : customerProjects.length + ' Projects'}</div>
        ${selectedProject ? `<div style="color: var(--muted); margin-top: 0.5rem; font-size: 0.9rem;">${getStatusBadge(selectedProject.status)}</div>` : ''}
      </div>
      <div class="card">
        <div class="card-title">${selectedProject ? 'Outstanding Invoices' : 'Pending Invoices'}</div>
        <div style="font-size: 2rem; font-weight: 700; margin-top: 1rem;">${projectInvoices.filter(i => i.status === 'Pending' || i.status === 'Overdue').length}</div>
        <div style="color: var(--muted); margin-top: 0.5rem; font-size: 0.9rem;">${projectInvoices.filter(i => i.status === 'Overdue').length} overdue</div>
      </div>
      <div class="card">
        <div class="card-title">Current Phase</div>
        <div style="font-size: 2rem; font-weight: 700; margin-top: 1rem;">${selectedProject ? 'Active' : 'N/A'}</div>
        <div style="color: var(--muted); margin-top: 0.5rem; font-size: 0.9rem;">${selectedProject ? 'Development in progress' : 'Select a project'}</div>
      </div>
      ${selectedProject ? `
    <div class="card">
        <div class="card-title">Upcoming Milestone</div>
        <div style="font-size: 2rem; font-weight: 700; margin-top: 1rem;">Q1 2024</div>
        <div style="color: var(--muted); margin-top: 0.5rem; font-size: 0.9rem;">Estimated completion</div>
      </div>
      ` : ''}
    </div>
    
    <div class="card" style="margin-bottom: 2rem;">
      <div class="card-title">Recent Activity</div>
      <div style="margin-top: 1.5rem;">
        ${recentMessages.length > 0 || recentInvoices.length > 0 ? `
          ${recentMessages.map(msg => {
            const thread = projectThreads.find(t => t.id === msg.threadId);
            return `
              <div style="padding: 1rem; border-bottom: 1px solid var(--border); display: flex; justify-content: space-between; align-items: start;">
                <div>
                  <div style="font-weight: 600; margin-bottom: 0.25rem;">New message${thread ? `: ${thread.subject}` : ''}</div>
                  <div style="color: var(--muted); font-size: 0.9rem;">${msg.body.substring(0, 80)}${msg.body.length > 80 ? '...' : ''}</div>
                </div>
                <div style="color: var(--muted); font-size: 0.85rem; white-space: nowrap;">${getTimeAgo(new Date(msg.createdAt))}</div>
              </div>
            `;
          }).join('')}
          ${recentInvoices.map(inv => {
            const project = store.projects.find(p => p.id === inv.projectId);
            return `
              <div style="padding: 1rem; border-bottom: 1px solid var(--border); display: flex; justify-content: space-between; align-items: start;">
                <div>
                  <div style="font-weight: 600; margin-bottom: 0.25rem;">Invoice ${inv.id}${project ? ` - ${project.title}` : ''}</div>
                  <div style="color: var(--muted); font-size: 0.9rem;">${formatCurrency(inv.amount)} • ${formatDate(inv.issuedAt)}</div>
                </div>
                <div>${getStatusBadge(inv.status)}</div>
              </div>
            `;
          }).join('')}
        ` : `
          <div style="color: var(--muted); text-align: center; padding: 2rem;">
            ${selectedProject ? 'No recent activity for this project.' : 'Select a project to see recent activity.'}
          </div>
        `}
      </div>
    </div>
  `;
  
  renderCustomerLayout(content, 'overview');
}

function renderCustomerProjects() {
  const session = AuthService.getSession();
  const selectedProject = store.getSelectedProject();
  
  if (!selectedProject) {
      const content = `
      <div class="project-context-header">
        <h2>Project Info — All Projects</h2>
        <div class="project-context-subtitle">Select a project from the dropdown above to view details</div>
      </div>
      <div class="empty-state">
        <div class="empty-state-icon">📁</div>
        <div class="empty-state-title">No project selected</div>
        <div style="color: var(--muted); margin-top: 0.5rem;">Use the project switcher in the top navigation to select a project</div>
      </div>
    `;
    renderCustomerLayout(content, 'projects');
    return;
  }
  
  // Get project-related data
  const projectInvoices = store.invoices.filter(i => i.projectId === selectedProject.id);
  const projectThreads = store.threads.filter(t => t.projectId === selectedProject.id);
  
  const content = `
    <div class="project-context-header">
      <h2>Project Info — ${selectedProject.title}</h2>
      <div class="project-context-subtitle">Detailed information and project specifications</div>
    </div>
    
    <div class="detail-panel" style="margin-bottom: 2rem;">
          <div class="detail-section">
        <div class="detail-label">Project Title</div>
        <div class="detail-value">${selectedProject.title}</div>
          </div>
          <div class="detail-section">
            <div class="detail-label">Status</div>
        <div class="detail-value">${getStatusBadge(selectedProject.status)}</div>
          </div>
          <div class="detail-section">
        <div class="detail-label">Scope / Deliverables</div>
        <div class="detail-value">${selectedProject.scopeSummary || 'No scope details provided'}</div>
          </div>
        </div>
    
    <div class="form-grid" style="margin-bottom: 2rem;">
      <div class="card">
        <div class="card-title">Project Timeline</div>
        <div style="margin-top: 1rem; color: var(--muted);">
          <div style="margin-bottom: 0.75rem;">
            <div style="font-weight: 600; color: var(--text); margin-bottom: 0.25rem;">Current Phase</div>
            <div>Development in progress</div>
            </div>
          <div style="margin-bottom: 0.75rem;">
            <div style="font-weight: 600; color: var(--text); margin-bottom: 0.25rem;">Estimated Completion</div>
            <div>Q1 2024</div>
          </div>
        </div>
      </div>
      
      <div class="card">
        <div class="card-title">Team Members</div>
        <div style="margin-top: 1rem; color: var(--muted);">
          <div style="margin-bottom: 0.5rem;">• Project Manager: ZoneBroz Team</div>
          <div style="margin-bottom: 0.5rem;">• Lead Developer: ZoneBroz Team</div>
          <div>• Designer: ZoneBroz Team</div>
        </div>
      </div>
    </div>
    
    <div class="card">
      <div class="card-title">Notes / Next Steps</div>
      <div style="margin-top: 1rem; color: var(--muted); line-height: 1.6;">
        <p>This project is currently in active development. Regular updates will be shared through the Messages section.</p>
        <p style="margin-top: 1rem;">Key milestones and deliverables will be communicated as the project progresses.</p>
      </div>
    </div>
  `;
  
  renderCustomerLayout(content, 'projects');
}

function renderCustomerInvoices() {
  const session = AuthService.getSession();
  const selectedProject = store.getSelectedProject();
  const selectedInvoiceId = new URLSearchParams(window.location.hash.split('?')[1] || '').get('id');
  const invoiceFilter = new URLSearchParams(window.location.hash.split('?')[1] || '').get('filter') || (selectedProject ? 'project' : 'all');
  
  // Get invoices based on filter
  let customerInvoices = store.invoices.filter(i => i.customerId === 'cust-1');
  const showAllProjects = invoiceFilter === 'all';
  
  // Filter by project only if "This Project" is selected AND a project is selected
  if (!showAllProjects && selectedProject) {
    customerInvoices = customerInvoices.filter(i => i.projectId === selectedProject.id);
  }
  // If showAllProjects is true, show all invoices (no filtering by project)
  
  if (selectedInvoiceId) {
    const invoice = customerInvoices.find(i => i.id === selectedInvoiceId);
    if (invoice) {
      const project = store.projects.find(p => p.id === invoice.projectId);
      const content = `
        <a href="#/portal/invoices${showAllProjects ? '?filter=all' : ''}" class="back-link">← Back to Invoices</a>
        <div class="detail-panel">
          <div class="detail-section">
            <div class="detail-label">Project</div>
            <div class="detail-value">${project?.title || 'N/A'}</div>
          </div>
          <div class="detail-section">
            <div class="detail-label">Amount</div>
            <div class="detail-value">${formatCurrency(invoice.amount)}</div>
          </div>
          <div class="detail-section">
            <div class="detail-label">Status</div>
            <div class="detail-value">${getStatusBadge(invoice.status)}</div>
          </div>
          <div class="detail-section">
            <div class="detail-label">Issued</div>
            <div class="detail-value">${formatDate(invoice.issuedAt)}</div>
          </div>
          <div class="detail-section">
            <div class="detail-label">Due Date</div>
            <div class="detail-value">${formatDate(invoice.dueAt)}</div>
          </div>
          <div class="detail-actions">
            <button class="btn btn-primary" onclick="window.open('${invoice.pdfUrl}', '_blank')">View PDF</button>
          </div>
        </div>
      `;
      renderCustomerLayout(content, 'invoices');
      return;
    }
  }
  
  // Filters UI
  const statusFilter = new URLSearchParams(window.location.hash.split('?')[1] || '').get('status') || 'all';
  const searchQuery = new URLSearchParams(window.location.hash.split('?')[1] || '').get('search') || '';
  
  let filteredInvoices = customerInvoices;
  
  if (statusFilter !== 'all') {
    filteredInvoices = filteredInvoices.filter(i => i.status === statusFilter);
  }
  
  if (searchQuery) {
    const query = searchQuery.toLowerCase();
    filteredInvoices = filteredInvoices.filter(invoice => {
      const project = store.projects.find(p => p.id === invoice.projectId);
      return project?.title.toLowerCase().includes(query) ||
             invoice.id.toLowerCase().includes(query) ||
             formatCurrency(invoice.amount).toLowerCase().includes(query);
    });
  }
  
  // Sort options
  const sortBy = new URLSearchParams(window.location.hash.split('?')[1] || '').get('sort') || 'date-desc';
  if (sortBy === 'date-desc') {
    filteredInvoices.sort((a, b) => new Date(b.issuedAt) - new Date(a.issuedAt));
  } else if (sortBy === 'date-asc') {
    filteredInvoices.sort((a, b) => new Date(a.issuedAt) - new Date(b.issuedAt));
  } else if (sortBy === 'amount-desc') {
    filteredInvoices.sort((a, b) => b.amount - a.amount);
  } else if (sortBy === 'amount-asc') {
    filteredInvoices.sort((a, b) => a.amount - b.amount);
  }
  
  const invoicesList = filteredInvoices.length > 0
    ? filteredInvoices.map(invoice => {
        const project = store.projects.find(p => p.id === invoice.projectId);
        return `
          <div class="list-item" onclick="window.location.hash = '#/portal/invoices?id=${invoice.id}${showAllProjects ? '&filter=all' : ''}'">
            <div class="list-item-header">
              <div>
                <div class="list-item-title">${project?.title || 'Invoice'}</div>
                <div class="list-item-meta">
                  ${formatCurrency(invoice.amount)} • ${formatDate(invoice.issuedAt)}
                  ${showAllProjects && project ? ` • ${project.title}` : ''}
                </div>
              </div>
              ${getStatusBadge(invoice.status)}
            </div>
          </div>
        `;
      }).join('')
    : '<div class="empty-state"><div class="empty-state-icon">💳</div><div class="empty-state-title">No invoices found</div></div>';
  
  const content = `
    <div class="project-context-header">
      <h2>Invoices${selectedProject && !showAllProjects ? ` — ${selectedProject.title}` : ' — All Projects'}</h2>
      <div class="project-context-subtitle">View and manage your project invoices</div>
    </div>
    
    <div class="project-filter-toggle">
      ${selectedProject ? `
      <button class="filter-toggle-btn ${!showAllProjects ? 'active' : ''}" onclick="window.location.hash = '#/portal/invoices'">This Project</button>
      ` : ''}
      <button class="filter-toggle-btn ${showAllProjects ? 'active' : ''}" onclick="window.location.hash = '#/portal/invoices?filter=all'">All Projects</button>
    </div>
    
    <div class="search-bar">
      <input type="text" id="invoice-search" placeholder="Search invoices..." value="${searchQuery}" onkeyup="handleInvoiceSearch(event)">
      <select id="invoice-status-filter" onchange="handleInvoiceFilterChange()" style="max-width: 150px;">
        <option value="all" ${statusFilter === 'all' ? 'selected' : ''}>All Status</option>
        <option value="Paid" ${statusFilter === 'Paid' ? 'selected' : ''}>Paid</option>
        <option value="Pending" ${statusFilter === 'Pending' ? 'selected' : ''}>Pending</option>
        <option value="Overdue" ${statusFilter === 'Overdue' ? 'selected' : ''}>Overdue</option>
      </select>
      <select id="invoice-sort" onchange="handleInvoiceSortChange()" style="max-width: 180px;">
        <option value="date-desc" ${sortBy === 'date-desc' ? 'selected' : ''}>Sort: Newest First</option>
        <option value="date-asc" ${sortBy === 'date-asc' ? 'selected' : ''}>Sort: Oldest First</option>
        <option value="amount-desc" ${sortBy === 'amount-desc' ? 'selected' : ''}>Sort: Highest Amount</option>
        <option value="amount-asc" ${sortBy === 'amount-asc' ? 'selected' : ''}>Sort: Lowest Amount</option>
      </select>
    </div>
    
    <div class="list">
      ${invoicesList}
    </div>
  `;
  
  renderCustomerLayout(content, 'invoices');
  
  // Add handlers for filters
  window.handleInvoiceSearch = function(e) {
    if (e.key === 'Enter' || e.keyCode === 13) {
      const query = e.target.value;
      const params = new URLSearchParams(window.location.hash.split('?')[1] || '');
      if (query) {
        params.set('search', query);
      } else {
        params.delete('search');
      }
      window.location.hash = '#/portal/invoices' + (params.toString() ? '?' + params.toString() : '');
    }
  };
  
  window.handleInvoiceFilterChange = function() {
    const status = document.getElementById('invoice-status-filter').value;
    const params = new URLSearchParams(window.location.hash.split('?')[1] || '');
    if (status !== 'all') {
      params.set('status', status);
    } else {
      params.delete('status');
    }
    window.location.hash = '#/portal/invoices' + (params.toString() ? '?' + params.toString() : '');
  };
  
  window.handleInvoiceSortChange = function() {
    const sort = document.getElementById('invoice-sort').value;
    const params = new URLSearchParams(window.location.hash.split('?')[1] || '');
    if (sort !== 'date-desc') {
      params.set('sort', sort);
    } else {
      params.delete('sort');
    }
    window.location.hash = '#/portal/invoices' + (params.toString() ? '?' + params.toString() : '');
  };
}

function renderCustomerMessages() {
  const session = AuthService.getSession();
  const selectedProject = store.getSelectedProject();
  const selectedThreadId = new URLSearchParams(window.location.hash.split('?')[1] || '').get('thread');
  const messageFilter = new URLSearchParams(window.location.hash.split('?')[1] || '').get('filter') || (selectedProject ? 'project' : 'all');
  
  // Get threads based on filter
  let customerThreads = store.threads.filter(t => t.customerId === 'cust-1');
  const showAllProjects = messageFilter === 'all';
  
  if (!showAllProjects && selectedProject) {
    customerThreads = customerThreads.filter(t => t.projectId === selectedProject.id);
  }
  
  if (selectedThreadId) {
    const thread = customerThreads.find(t => t.id === selectedThreadId);
    if (thread) {
      const threadMessages = store.messages.filter(m => m.threadId === selectedThreadId).sort((a, b) => 
        new Date(a.createdAt) - new Date(b.createdAt)
      );
      
      const content = `
        <div class="dm-container" style="height: calc(100vh - 200px); min-height: 500px;">
          <div class="dm-chat-container" style="width: 100%;">
            <div class="dm-chat-header">
              <div class="dm-chat-header-info">
                <div class="dm-avatar dm-avatar-small">
                  <div class="dm-avatar-initial">Z</div>
          </div>
                <div>
                  <div class="dm-chat-header-name">ZoneBroz Studios</div>
                  <div class="dm-chat-header-meta">${thread.subject}</div>
                </div>
              </div>
          </div>
            <div class="dm-chat-messages" id="message-thread">
              ${threadMessages.map(msg => {
                const isCustomer = msg.senderRole === 'customer';
                return `
                  <div class="dm-message ${isCustomer ? 'dm-message-sent' : 'dm-message-received'}">
                    <div class="dm-message-bubble">
                      ${msg.body}
                    </div>
                    <div class="dm-message-time">${formatTime(new Date(msg.createdAt))}</div>
                  </div>
                `;
              }).join('')}
            </div>
            <div class="dm-chat-input-container">
              <div class="dm-chat-input-wrapper">
                <textarea id="new-message" class="dm-chat-input" placeholder="Type your message..." rows="1"></textarea>
                <button class="dm-send-btn" onclick="sendMessage('${selectedThreadId}')">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <line x1="22" y1="2" x2="11" y2="13"></line>
                    <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      `;
      
      renderCustomerLayout(content, 'messages');
      
      // Scroll to bottom
      setTimeout(() => {
        const threadEl = document.getElementById('message-thread');
        if (threadEl) threadEl.scrollTop = threadEl.scrollHeight;
      }, 100);
      
      // Auto-resize textarea
      const textarea = document.getElementById('new-message');
      if (textarea) {
        textarea.addEventListener('input', function() {
          this.style.height = 'auto';
          this.style.height = Math.min(this.scrollHeight, 120) + 'px';
        });
        
        textarea.addEventListener('keydown', function(e) {
          if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage(selectedThreadId);
          }
        });
      }
      
      window.sendMessage = async function(threadId) {
        const textarea = document.getElementById('new-message');
        const body = textarea.value.trim();
        if (!body) return;
        
        await store.addMessage({
          threadId,
          senderRole: 'customer',
          body
        });
        
        textarea.value = '';
        textarea.style.height = 'auto';
        router.handleRoute();
      };
      
      return;
    }
  }
  
  // Thread list view
  const threadsList = customerThreads.length > 0
    ? customerThreads.map(thread => {
        const lastMessage = store.messages
          .filter(m => m.threadId === thread.id)
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))[0];
        const timeAgo = lastMessage ? getTimeAgo(new Date(lastMessage.createdAt)) : '';
        const project = thread.projectId ? store.projects.find(p => p.id === thread.projectId) : null;
        return `
          <div class="dm-contact-item" onclick="window.location.hash = '#/portal/messages?thread=${thread.id}${showAllProjects ? '&filter=all' : ''}'">
            <div class="dm-avatar">
              <div class="dm-avatar-initial">Z</div>
              </div>
            <div class="dm-contact-info">
              <div class="dm-contact-name">${thread.subject}</div>
              <div class="dm-contact-preview">${lastMessage ? lastMessage.body.substring(0, 50) + (lastMessage.body.length > 50 ? '...' : '') : 'No messages yet'}</div>
              ${showAllProjects && project ? `<div style="font-size: 0.75rem; color: var(--muted); margin-top: 0.25rem;">${project.title}</div>` : ''}
            </div>
            ${timeAgo ? `<div class="dm-time">${timeAgo}</div>` : ''}
          </div>
        `;
      }).join('')
    : '<div class="empty-state"><div class="empty-state-icon">💬</div><div class="empty-state-title">No messages yet</div></div>';
  
  const content = `
    <div class="project-context-header">
      <h2>Messages${selectedProject && !showAllProjects ? ` — ${selectedProject.title}` : ' — All Projects'}</h2>
      <div class="project-context-subtitle">Communicate with the ZoneBroz team</div>
    </div>
    
    ${selectedProject ? `
    <div class="project-filter-toggle" style="margin-bottom: 1.5rem;">
      <button class="filter-toggle-btn ${!showAllProjects ? 'active' : ''}" onclick="window.location.hash = '#/portal/messages'">This Project</button>
      <button class="filter-toggle-btn ${showAllProjects ? 'active' : ''}" onclick="window.location.hash = '#/portal/messages?filter=all'">All Projects</button>
    </div>
    ` : ''}
    
    <div class="dm-contacts-list" style="background: var(--panel); border: 1px solid var(--border); border-radius: 16px; padding: 0.5rem;">
      ${threadsList}
    </div>
  `;
  
  renderCustomerLayout(content, 'messages');
}

function renderCustomerRequests() {
  const session = AuthService.getSession();
  const customerRequests = store.requests.filter(r => r.customerId === 'cust-1');
  const showForm = new URLSearchParams(window.location.hash.split('?')[1] || '').get('new') === 'true';
  
  if (showForm) {
    const content = `
      <a href="#/portal/requests" class="back-link">← Back to Requests</a>
      <div class="card">
        <div class="card-title">Submit a Request</div>
        <form id="request-form" style="margin-top: 2rem;">
          <div class="form-grid">
            <div class="form-group">
              <label for="request-type">Request Type</label>
              <select id="request-type" name="type" required>
                <option value="">Select type...</option>
                <option value="report">Report request</option>
                <option value="change">Request changes</option>
                <option value="quote">Quote</option>
                <option value="quality">Quality report</option>
              </select>
            </div>
            <div class="form-group">
              <label for="request-category">Service Category</label>
              <select id="request-category" name="category" required>
                <option value="">Select category...</option>
                <option value="Websites">Websites</option>
                <option value="Apps">Apps</option>
                <option value="Web Apps">Web Apps</option>
                <option value="Web&App">Web&App</option>
                <option value="Product Review">Product Review</option>
                <option value="Special Request">Special Request</option>
              </select>
            </div>
          </div>
          <div id="report-fields" style="display: none;">
            <div class="form-group">
              <label>Logic Complexity (1-5)</label>
              <div class="range-input">
                <input type="range" id="logic-complexity" min="1" max="5" value="3">
                <span class="range-value" id="logic-value">3</span>
              </div>
            </div>
            <div class="form-group">
              <label>UI Complexity (1-5)</label>
              <div class="range-input">
                <input type="range" id="ui-complexity" min="1" max="5" value="3">
                <span class="range-value" id="ui-value">3</span>
              </div>
            </div>
            <div class="form-group">
              <div class="checkbox-group">
                <input type="checkbox" id="accessibility" name="accessibility">
                <label for="accessibility">Accessibility required</label>
              </div>
            </div>
            <div class="form-group">
              <div class="checkbox-group">
                <input type="checkbox" id="security" name="security">
                <label for="security">Security required</label>
              </div>
            </div>
            <div class="form-group">
              <label>Idea Clarity (1-5)</label>
              <div class="range-input">
                <input type="range" id="idea-clarity" min="1" max="5" value="3">
                <span class="range-value" id="idea-value">3</span>
              </div>
            </div>
          </div>
          <div class="form-group form-full">
            <label for="request-notes">Notes</label>
            <textarea id="request-notes" name="notes" required placeholder="Provide details about your request..."></textarea>
          </div>
          <button type="submit" class="btn btn-primary">Submit Request</button>
        </form>
      </div>
    `;
    
    renderCustomerLayout(content, 'requests');
    document.getElementById('page-title').textContent = 'New Request';
    
    // Handle form submission
    const form = document.getElementById('request-form');
    const typeSelect = document.getElementById('request-type');
    const reportFields = document.getElementById('report-fields');
    
    typeSelect.addEventListener('change', (e) => {
      reportFields.style.display = e.target.value === 'report' ? 'block' : 'none';
    });
    
    // Range inputs
    ['logic-complexity', 'ui-complexity', 'idea-clarity'].forEach(id => {
      const input = document.getElementById(id);
      const valueEl = document.getElementById(id.replace('-complexity', '-value').replace('-clarity', '-value'));
      if (input && valueEl) {
        input.addEventListener('input', (e) => {
          valueEl.textContent = e.target.value;
        });
      }
    });
    
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const type = typeSelect.value;
      const category = document.getElementById('request-category').value;
      const notes = document.getElementById('request-notes').value;
      
      const details = type === 'report' ? {
        logicComplexity: parseInt(document.getElementById('logic-complexity').value),
        uiComplexity: parseInt(document.getElementById('ui-complexity').value),
        accessibilityRequired: document.getElementById('accessibility').checked,
        securityRequired: document.getElementById('security').checked,
        ideaClarity: parseInt(document.getElementById('idea-clarity').value),
        notes
      } : { notes };
      
      await store.addRequest({
        customerId: 'cust-1',
        type,
        category,
        details
      });
      
      router.navigate('/portal/requests');
    });
    
    return;
  }
  
  const requestsList = customerRequests.length > 0
    ? customerRequests.map(req => `
        <div class="list-item">
          <div class="list-item-header">
            <div>
              <div class="list-item-title">${req.type.charAt(0).toUpperCase() + req.type.slice(1)} Request</div>
              <div class="list-item-meta">${formatDate(req.createdAt)}</div>
            </div>
            ${getStatusBadge(req.status)}
          </div>
          <div style="margin-top: 0.75rem; color: var(--muted);">
            ${req.details.notes || 'No details provided'}
          </div>
        </div>
      `).join('')
    : '<div class="empty-state"><div class="empty-state-icon">📋</div><div class="empty-state-title">No requests yet</div></div>';
  
  const content = `
    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem;">
      <h2>Requests</h2>
      <a href="#/portal/requests?new=true" class="btn btn-primary">New Request</a>
    </div>
    <div class="list">
      ${requestsList}
    </div>
  `;
  
  renderCustomerLayout(content, 'requests');
  document.getElementById('page-title').textContent = 'Requests';
}

// ==================== REVENUE PERFORMANCE FUNCTIONS ====================

function calculateRevenueData(range = 'month') {
  const paidInvoices = store.invoices.filter(inv => inv.status === 'Paid');
  const now = new Date();
  let startDate, endDate, labels = [], data = [];
  
  if (range === 'week') {
    // Last 7 days
    endDate = new Date(now);
    startDate = new Date(now);
    startDate.setDate(startDate.getDate() - 6);
    
    // Create labels for each day
    for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
      labels.push(d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }));
      data.push(0);
    }
    
    // Aggregate revenue by day
    paidInvoices.forEach(inv => {
      const invDate = new Date(inv.issuedAt);
      if (invDate >= startDate && invDate <= endDate) {
        const dayIndex = Math.floor((invDate - startDate) / (1000 * 60 * 60 * 24));
        if (dayIndex >= 0 && dayIndex < data.length) {
          data[dayIndex] += inv.amount;
        }
      }
    });
    
  } else if (range === 'month') {
    // Last 30 days, aggregated by day
    endDate = new Date(now);
    startDate = new Date(now);
    startDate.setDate(startDate.getDate() - 29);
    
    for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
      labels.push(d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }));
      data.push(0);
    }
    
    paidInvoices.forEach(inv => {
      const invDate = new Date(inv.issuedAt);
      if (invDate >= startDate && invDate <= endDate) {
        const dayIndex = Math.floor((invDate - startDate) / (1000 * 60 * 60 * 24));
        if (dayIndex >= 0 && dayIndex < data.length) {
          data[dayIndex] += inv.amount;
        }
      }
    });
    
  } else if (range === 'year') {
    // Last 12 months
    endDate = new Date(now);
    startDate = new Date(now);
    startDate.setMonth(startDate.getMonth() - 11);
    startDate.setDate(1); // Start of month
    startDate.setHours(0, 0, 0, 0);
    
    // Create labels for each month
    const currentMonth = new Date(startDate);
    while (currentMonth <= endDate) {
      labels.push(currentMonth.toLocaleDateString('en-US', { month: 'short', year: 'numeric' }));
      data.push(0);
      currentMonth.setMonth(currentMonth.getMonth() + 1);
    }
    
    // Aggregate revenue by month
    paidInvoices.forEach(inv => {
      const invDate = new Date(inv.issuedAt);
      invDate.setDate(1);
      invDate.setHours(0, 0, 0, 0);
      
      if (invDate >= startDate && invDate <= endDate) {
        const monthIndex = (invDate.getFullYear() - startDate.getFullYear()) * 12 + 
                          (invDate.getMonth() - startDate.getMonth());
        if (monthIndex >= 0 && monthIndex < data.length) {
          data[monthIndex] += inv.amount;
        }
      }
    });
  }
  
  return { labels, data, startDate, endDate };
}

function calculateRevenueMetrics(range = 'month') {
  const { data, labels, startDate, endDate } = calculateRevenueData(range);
  const totalRevenue = data.reduce((sum, val) => sum + val, 0);
  
  let daysInRange;
  if (range === 'year') {
    // For year, calculate based on number of months
    daysInRange = labels.length * 30; // Approximate 30 days per month
  } else {
    daysInRange = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24)) + 1;
  }
  
  const avgRevenuePerDay = daysInRange > 0 ? totalRevenue / daysInRange : 0;
  
  const maxRevenue = data.length > 0 ? Math.max(...data, 0) : 0;
  const bestDayIndex = data.indexOf(maxRevenue);
  const bestDayLabel = bestDayIndex >= 0 ? labels[bestDayIndex] : 'N/A';
  
  const paidInvoices = store.invoices.filter(inv => inv.status === 'Paid');
  const invoicesInRange = paidInvoices.filter(inv => {
    const invDate = new Date(inv.issuedAt);
    return invDate >= startDate && invDate <= endDate;
  }).length;
  
  return {
    totalRevenue,
    avgRevenuePerDay,
    bestDay: bestDayLabel,
    bestDayRevenue: maxRevenue,
    invoicesPaid: invoicesInRange,
    daysInRange
  };
}

let revenueChartInstance = null;

function renderRevenueChart(range = 'month') {
  const { labels, data } = calculateRevenueData(range);
  const hasData = data.some(val => val > 0);
  
  const container = document.getElementById('revenue-chart-container');
  if (!container) return;
  
  // Destroy existing chart if it exists
  if (revenueChartInstance) {
    revenueChartInstance.destroy();
    revenueChartInstance = null;
  }
  
  // Show empty state if no data
  if (!hasData) {
    container.innerHTML = `
      <div class="empty-state" style="padding: 3rem 2rem;">
        <div class="empty-state-icon">📊</div>
        <div class="empty-state-title">No revenue data</div>
        <div style="color: var(--muted); margin-top: 0.5rem;">Revenue data will appear here once invoices are paid.</div>
      </div>
    `;
    return;
  }
  
  // Ensure canvas exists
  let chartCtx = container.querySelector('#revenue-chart');
  if (!chartCtx) {
    container.innerHTML = '<canvas id="revenue-chart"></canvas>';
    chartCtx = document.getElementById('revenue-chart');
  }
  
  if (!chartCtx || typeof Chart === 'undefined') return;
  
  revenueChartInstance = new Chart(chartCtx, {
    type: 'line',
    data: {
      labels: labels,
      datasets: [{
        label: 'Revenue',
        data: data,
        borderColor: 'rgba(59, 130, 246, 1)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        borderWidth: 2,
        fill: true,
        tension: 0.4,
        pointRadius: 0,
        pointHoverRadius: 6,
        pointHoverBackgroundColor: 'rgba(59, 130, 246, 1)',
        pointHoverBorderColor: '#fff',
        pointHoverBorderWidth: 2
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      animation: {
        duration: 750,
        easing: 'easeInOutQuart'
      },
      plugins: {
        legend: {
          display: false
        },
        tooltip: {
          mode: 'index',
          intersect: false,
          backgroundColor: 'rgba(16, 16, 16, 0.95)',
          titleColor: '#f5f5f5',
          bodyColor: '#f5f5f5',
          borderColor: 'rgba(255, 255, 255, 0.1)',
          borderWidth: 1,
          padding: 12,
          callbacks: {
            label: function(context) {
              return 'Revenue: ' + formatCurrency(context.parsed.y);
            }
          }
        }
      },
      scales: {
        x: {
          ticks: { 
            color: '#a0a0a5',
            maxRotation: 45,
            minRotation: 0
          },
          grid: { 
            display: false
          }
        },
        y: {
          ticks: { 
            color: '#a0a0a5',
            callback: function(value) {
              return formatCurrency(value);
            }
          },
          grid: { 
            color: 'rgba(255, 255, 255, 0.05)',
            drawBorder: false
          },
          beginAtZero: true
        }
      },
      interaction: {
        intersect: false,
        mode: 'index'
      }
    }
  });
}

function renderRevenueMetrics(range = 'month') {
  const metrics = calculateRevenueMetrics(range);
  const metricsContainer = document.getElementById('revenue-metrics');
  if (!metricsContainer) return;
  
  metricsContainer.innerHTML = `
    <div class="revenue-metric-card">
      <div style="color: var(--muted); font-size: 0.85rem; margin-bottom: 0.5rem;">Total Revenue</div>
      <div style="font-size: 1.75rem; font-weight: 700;">${formatCurrency(metrics.totalRevenue)}</div>
    </div>
    <div class="revenue-metric-card">
      <div style="color: var(--muted); font-size: 0.85rem; margin-bottom: 0.5rem;">Average ${range === 'year' ? 'per Month' : 'per Day'}</div>
      <div style="font-size: 1.75rem; font-weight: 700;">${formatCurrency(metrics.avgRevenuePerDay)}</div>
    </div>
    <div class="revenue-metric-card">
      <div style="color: var(--muted); font-size: 0.85rem; margin-bottom: 0.5rem;">Best Performing ${range === 'year' ? 'Month' : 'Day'}</div>
      <div style="font-size: 1.75rem; font-weight: 700;">${formatCurrency(metrics.bestDayRevenue)}</div>
      <div style="color: var(--muted); font-size: 0.85rem; margin-top: 0.25rem;">${metrics.bestDay}</div>
    </div>
    <div class="revenue-metric-card">
      <div style="color: var(--muted); font-size: 0.85rem; margin-bottom: 0.5rem;">Invoices Paid</div>
      <div style="font-size: 1.75rem; font-weight: 700;">${metrics.invoicesPaid}</div>
    </div>
  `;
}

function initializeRevenuePerformance() {
  let currentRange = 'month';
  
  // Set up time range selector
  const rangeButtons = document.querySelectorAll('.time-range-btn');
  rangeButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      rangeButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentRange = btn.dataset.range;
      
      // Smoothly update chart and metrics
      renderRevenueChart(currentRange);
      renderRevenueMetrics(currentRange);
    });
  });
  
  // Initial render
  renderRevenueChart(currentRange);
  renderRevenueMetrics(currentRange);
}

// ==================== ADMIN PAGES ====================

async function renderAdminOverview() {
  // Load data from Supabase if enabled
  await store.loadInvoices();
  await store.loadRequests();
  await store.loadNotifications('all');
  await store.loadCustomers();
  
  // Calculate income data for charts
  const allInvoices = store.invoices;
  
  // Group invoices by month
  const incomeByMonth = {};
  allInvoices.forEach(inv => {
    const month = new Date(inv.issuedAt).toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
    if (!incomeByMonth[month]) {
      incomeByMonth[month] = { projected: 0, actual: 0 };
    }
    
    if (inv.status === 'Paid') {
      incomeByMonth[month].actual += inv.amount;
    } else if (inv.status === 'Pending' || inv.status === 'Overdue') {
      incomeByMonth[month].projected += inv.amount;
    }
  });
  
  const sortedMonths = Object.keys(incomeByMonth).sort((a, b) => {
    return new Date(a) - new Date(b);
  });
  
  const chartData = {
    labels: sortedMonths,
    projected: sortedMonths.map(m => incomeByMonth[m].projected),
    actual: sortedMonths.map(m => incomeByMonth[m].actual)
  };
  
  // Calculate service categories
  const serviceCategories = ['Websites', 'Apps', 'Web Apps', 'Web&App', 'Product Review', 'Special Request'];
  const categoryCounts = {};
  serviceCategories.forEach(cat => categoryCounts[cat] = 0);
  
  store.requests.forEach(req => {
    // Normalize category name to handle variations
    let cat = req.category || 'Special Request';
    cat = cat.trim();
    
    // Handle variations like "Web Apps" vs "web apps" (case-insensitive check)
    const normalizedCat = serviceCategories.find(sc => 
      sc.toLowerCase() === cat.toLowerCase()
    ) || cat;
    
    if (categoryCounts.hasOwnProperty(normalizedCat)) {
      categoryCounts[normalizedCat]++;
    } else {
      // If category doesn't match exactly, add to Special Request
      categoryCounts['Special Request']++;
    }
  });
  
  // Show all categories, sorted by count (including zeros for now, but filter if preferred)
  // For better UX, showing all categories with data
  const sortedCategories = Object.entries(categoryCounts)
    .sort((a, b) => b[1] - a[1])
    .filter(([_, count]) => count > 0);
  
  // Get unread notifications
  const unreadNotifications = store.adminNotifications
    .filter(n => !n.isRead)
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 5);
  
  const getNotificationKindLabel = (kind) => {
    const labels = {
      'request': 'Request',
      'invoice': 'Invoice',
      'message': 'Message',
      'system': 'System'
    };
    return labels[kind] || kind;
  };
  
  const handleNotificationClick = async (notification) => {
    await store.markNotificationRead(notification.id);
    
    if (notification.kind === 'request') {
      router.navigate('/admin/requests');
    } else if (notification.kind === 'invoice') {
      router.navigate('/admin/invoices/new');
    } else if (notification.kind === 'message') {
      router.navigate(`/admin/messages?thread=${notification.relatedId}`);
    }
  };
  
  const inboxItems = unreadNotifications.map(notif => {
    const customer = store.customers.find(c => c.id === notif.customerId);
    return `
      <div class="inbox-item unread" onclick="handleNotificationClick('${notif.id}')">
        <div class="inbox-item-content">
          <div class="inbox-item-title">${notif.title}</div>
          <div class="inbox-item-meta">
            <span class="inbox-item-badge ${notif.kind}">${getNotificationKindLabel(notif.kind)}</span>
            <span>${customer?.name || 'Unknown'}</span>
            <span>•</span>
            <span>${formatDate(notif.createdAt)}</span>
          </div>
        </div>
        <button class="btn btn-secondary btn-small" onclick="event.stopPropagation(); handleNotificationClick('${notif.id}')">Open</button>
      </div>
    `;
  }).join('') || '<div class="empty-state"><div class="empty-state-icon">📭</div><div class="empty-state-title">No unread notifications</div></div>';
  
  const content = `
    <h2 style="margin-bottom: 2rem;">Admin Dashboard</h2>
    <div class="form-grid" style="margin-bottom: 2rem;">
      <div class="card">
        <div class="card-title">Total Customers</div>
        <div style="font-size: 2.5rem; font-weight: 700; margin-top: 1rem;">${store.customers.length}</div>
      </div>
      <div class="card">
        <div class="card-title">Active Projects</div>
        <div style="font-size: 2.5rem; font-weight: 700; margin-top: 1rem;">${store.projects.length}</div>
      </div>
      <div class="card clickable-card" onclick="window.location.hash = '#/admin/requests?filter=pending'">
        <div class="card-title">Pending Requests</div>
        <div style="font-size: 2.5rem; font-weight: 700; margin-top: 1rem;">${store.requests.filter(r => r.status === 'New' || r.status === 'In Review').length}</div>
      </div>
    </div>
    
    <div class="chart-grid">
      <div class="card">
        <div class="card-header">
          <div class="card-title">Projected vs Actual Income</div>
        </div>
        <div class="chart-container">
          <canvas id="income-chart"></canvas>
        </div>
      </div>
      <div class="card">
        <div class="card-header">
          <div class="card-title">Most Requested Services</div>
        </div>
        <div class="chart-container">
          <canvas id="services-chart"></canvas>
        </div>
      </div>
    </div>
    
    <div class="card revenue-performance-section" style="margin-top: 2rem;">
      <div class="card-header" style="margin-bottom: 1.5rem;">
        <div>
          <div class="card-title">Revenue Performance</div>
          <div style="color: var(--muted); font-size: 0.9rem; margin-top: 0.25rem; font-weight: 400;">How your income is performing over time</div>
        </div>
      </div>
      <div class="revenue-time-selector" style="margin-bottom: 1.5rem;">
        <button class="time-range-btn active" data-range="week">Week</button>
        <button class="time-range-btn" data-range="month">Month</button>
        <button class="time-range-btn" data-range="year">Year</button>
      </div>
      <div class="chart-container" id="revenue-chart-container">
        <canvas id="revenue-chart"></canvas>
      </div>
      <div class="revenue-metrics" id="revenue-metrics" style="margin-top: 2rem; display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1.5rem;">
        <!-- Metrics will be populated by JavaScript -->
      </div>
    </div>
  `;
  
  renderAdminLayout(content, 'overview');
  document.getElementById('page-title').textContent = 'Overview';
  
  // Render income chart
  setTimeout(() => {
    const incomeCtx = document.getElementById('income-chart');
    if (incomeCtx && typeof Chart !== 'undefined') {
      new Chart(incomeCtx, {
        type: 'line',
        data: {
          labels: chartData.labels,
          datasets: [
            {
              label: 'Projected Income',
              data: chartData.projected,
              borderColor: 'rgba(251, 191, 36, 1)',
              backgroundColor: 'rgba(251, 191, 36, 0.1)',
              tension: 0.4
            },
            {
              label: 'Actual Income',
              data: chartData.actual,
              borderColor: 'rgba(34, 197, 94, 1)',
              backgroundColor: 'rgba(34, 197, 94, 0.1)',
              tension: 0.4
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              labels: {
                color: '#f5f5f5'
              }
            },
            tooltip: {
              mode: 'index',
              intersect: false,
              callbacks: {
                label: function(context) {
                  return context.dataset.label + ': ' + formatCurrency(context.parsed.y);
                }
              }
            }
          },
          scales: {
            x: {
              ticks: { color: '#a0a0a5' },
              grid: { color: 'rgba(255, 255, 255, 0.08)' }
            },
            y: {
              ticks: { 
                color: '#a0a0a5',
                callback: function(value) {
                  return formatCurrency(value);
                }
              },
              grid: { color: 'rgba(255, 255, 255, 0.08)' }
            }
          }
        }
      });
    }
    
    // Render services chart
    const servicesCtx = document.getElementById('services-chart');
    if (servicesCtx && typeof Chart !== 'undefined') {
      new Chart(servicesCtx, {
        type: 'bar',
        data: {
          labels: sortedCategories.map(([cat]) => cat),
          datasets: [{
            label: 'Requests',
            data: sortedCategories.map(([_, count]) => count),
            backgroundColor: 'rgba(59, 130, 246, 0.8)',
            borderColor: 'rgba(59, 130, 246, 1)',
            borderWidth: 1
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: false
            },
            tooltip: {
              callbacks: {
                label: function(context) {
                  return context.parsed.y + ' request(s)';
                }
              }
            }
          },
          scales: {
            x: {
              ticks: { color: '#a0a0a5' },
              grid: { display: false }
            },
            y: {
              ticks: { 
                color: '#a0a0a5',
                beginAtZero: true,
                stepSize: 1
              },
              grid: { color: 'rgba(255, 255, 255, 0.08)' }
            }
          }
        }
      });
    }
    
    // Set up notification click handler
    window.handleNotificationClick = async function(notificationId) {
      const notification = store.adminNotifications.find(n => n.id === notificationId);
      if (notification) {
        await store.markNotificationRead(notificationId);
        
        if (notification.kind === 'request') {
          router.navigate('/admin/requests');
        } else if (notification.kind === 'invoice') {
          router.navigate('/admin/invoices/new');
        } else if (notification.kind === 'message') {
          router.navigate(`/admin/messages?thread=${notification.relatedId}`);
        }
      }
    };
    
    // Initialize Revenue Performance section
    initializeRevenuePerformance();
  }, 100);
}

function renderAdminCustomers() {
  const selectedCustomerId = new URLSearchParams(window.location.hash.split('?')[1] || '').get('id');
  
  if (selectedCustomerId) {
    const customer = store.customers.find(c => c.id === selectedCustomerId);
    if (customer) {
      const customerProjects = store.projects.filter(p => p.customerId === selectedCustomerId);
      const customerInvoices = store.invoices.filter(i => i.customerId === selectedCustomerId);
      const customerThreads = store.threads.filter(t => t.customerId === selectedCustomerId);
      const customerRequests = store.requests.filter(r => r.customerId === selectedCustomerId);
      
      const [activeTab, setActiveTab] = ['projects', null];
      let currentTab = 'projects';
      
      const content = `
        <a href="#/admin/customers" class="back-link">← Back to Customers</a>
        <div class="card">
          <div class="card-header">
            <div>
              <div class="card-title">${customer.name}</div>
              <div style="color: var(--muted); margin-top: 0.5rem;">${customer.company} • ${customer.email}</div>
            </div>
          </div>
          <div class="tabs" id="customer-tabs">
            <button class="tab active" data-tab="projects">Projects (${customerProjects.length})</button>
            <button class="tab" data-tab="invoices">Invoices (${customerInvoices.length})</button>
            <button class="tab" data-tab="messages">Messages (${customerThreads.length})</button>
            <button class="tab" data-tab="requests">Requests (${customerRequests.length})</button>
          </div>
          <div id="tab-content">
            <div id="tab-projects" class="tab-panel">
              ${customerProjects.length > 0 ? customerProjects.map(p => `
                <div class="list-item">
                  <div class="list-item-header">
                    <div>
                      <div class="list-item-title">${p.title}</div>
                      <div class="list-item-meta">${p.scopeSummary}</div>
                    </div>
                    ${getStatusBadge(p.status)}
                  </div>
                </div>
              `).join('') : '<div class="empty-state">No projects</div>'}
            </div>
            <div id="tab-invoices" class="tab-panel" style="display: none;">
              ${customerInvoices.length > 0 ? customerInvoices.map(i => `
                <div class="list-item">
                  <div class="list-item-header">
                    <div>
                      <div class="list-item-title">Invoice ${i.id}</div>
                      <div class="list-item-meta">${formatCurrency(i.amount)} • ${formatDate(i.issuedAt)}</div>
                    </div>
                    ${getStatusBadge(i.status)}
                  </div>
                </div>
              `).join('') : '<div class="empty-state">No invoices</div>'}
            </div>
            <div id="tab-messages" class="tab-panel" style="display: none;">
              ${customerThreads.length > 0 ? customerThreads.map(t => `
                <div class="list-item">
                  <div class="list-item-title">${t.subject}</div>
                </div>
              `).join('') : '<div class="empty-state">No messages</div>'}
            </div>
            <div id="tab-requests" class="tab-panel" style="display: none;">
              ${customerRequests.length > 0 ? customerRequests.map(r => `
                <div class="list-item">
                  <div class="list-item-header">
                    <div>
                      <div class="list-item-title">${r.type.charAt(0).toUpperCase() + r.type.slice(1)} Request</div>
                      <div class="list-item-meta">${formatDate(r.createdAt)}</div>
                    </div>
                    ${getStatusBadge(r.status)}
                  </div>
                </div>
              `).join('') : '<div class="empty-state">No requests</div>'}
            </div>
          </div>
        </div>
      `;
      
      renderAdminLayout(content, 'customers');
      document.getElementById('page-title').textContent = customer.name;
      
      // Tab switching
      setTimeout(() => {
        const tabs = document.querySelectorAll('#customer-tabs .tab');
        tabs.forEach(tab => {
          tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            const tabName = tab.dataset.tab;
            document.querySelectorAll('.tab-panel').forEach(p => p.style.display = 'none');
            document.getElementById(`tab-${tabName}`).style.display = 'block';
          });
        });
      }, 100);
      
      return;
    }
  }
  
  const customersList = store.customers.map(customer => `
    <div class="list-item" onclick="window.location.hash = '#/admin/customers?id=${customer.id}'">
      <div class="list-item-header">
        <div>
          <div class="list-item-title">${customer.name}</div>
          <div class="list-item-meta">${customer.company} • ${customer.email}</div>
        </div>
      </div>
    </div>
  `).join('');
  
  const content = `
    <h2 style="margin-bottom: 2rem;">Customers</h2>
    <div class="list">
      ${customersList}
    </div>
  `;
  
  renderAdminLayout(content, 'customers');
  document.getElementById('page-title').textContent = 'Customers';
}

function renderAdminNewProject() {
  const content = `
    <a href="#/admin" class="back-link">← Back to Admin</a>
    <div class="card">
      <div class="card-title">Create New Project</div>
      <form id="new-project-form" style="margin-top: 2rem;">
        <div class="form-group form-full">
          <label for="project-customer">Customer</label>
          <select id="project-customer" name="customerId" required>
            <option value="">Select customer...</option>
            ${store.customers.map(c => `<option value="${c.id}">${c.name} - ${c.company}</option>`).join('')}
          </select>
        </div>
        <div class="form-group form-full">
          <label for="project-title">Project Title</label>
          <input type="text" id="project-title" name="title" required placeholder="e.g., E-commerce Platform Redesign">
        </div>
        <div class="form-group form-full">
          <label for="project-scope">Scope Summary</label>
          <textarea id="project-scope" name="scopeSummary" required placeholder="Describe the project scope..."></textarea>
        </div>
        <div class="form-group">
          <label for="project-status">Status</label>
          <select id="project-status" name="status" required>
            <option value="In Progress">In Progress</option>
            <option value="Paused">Paused</option>
            <option value="Completed">Completed</option>
            <option value="Needs Funding">Needs Funding</option>
          </select>
        </div>
        <button type="submit" class="btn btn-primary">Create Project</button>
      </form>
    </div>
  `;
  
  renderAdminLayout(content, 'projects');
  document.getElementById('page-title').textContent = 'New Project';
  
  document.getElementById('new-project-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const project = {
      customerId: formData.get('customerId'),
      title: formData.get('title'),
      scopeSummary: formData.get('scopeSummary'),
      status: formData.get('status')
    };
    
    store.addProject(project);
    alert('Project created successfully!');
    router.navigate('/admin');
  });
}

function renderAdminNewInvoice() {
  const content = `
    <a href="#/admin" class="back-link">← Back to Admin</a>
    <div class="card">
      <div class="card-title">Create New Invoice</div>
      <form id="new-invoice-form" style="margin-top: 2rem;">
        <div class="form-group form-full">
          <label for="invoice-customer">Customer</label>
          <select id="invoice-customer" name="customerId" required>
            <option value="">Select customer...</option>
            ${store.customers.map(c => `<option value="${c.id}">${c.name} - ${c.company}</option>`).join('')}
          </select>
        </div>
        <div class="form-group form-full">
          <label for="invoice-project">Project</label>
          <select id="invoice-project" name="projectId" required>
            <option value="">Select project...</option>
            ${store.projects.map(p => `<option value="${p.id}" data-customer="${p.customerId}">${p.title}</option>`).join('')}
          </select>
        </div>
        <div class="form-grid">
          <div class="form-group">
            <label for="invoice-amount">Amount</label>
            <input type="number" id="invoice-amount" name="amount" step="0.01" required placeholder="0.00">
          </div>
          <div class="form-group">
            <label for="invoice-status">Status</label>
            <select id="invoice-status" name="status" required>
              <option value="Pending">Pending</option>
              <option value="Paid">Paid</option>
              <option value="Overdue">Overdue</option>
            </select>
          </div>
        </div>
        <div class="form-grid">
          <div class="form-group">
            <label for="invoice-issued">Issued Date</label>
            <input type="date" id="invoice-issued" name="issuedAt" required>
          </div>
          <div class="form-group">
            <label for="invoice-due">Due Date</label>
            <input type="date" id="invoice-due" name="dueAt" required>
          </div>
        </div>
        <div class="form-group form-full">
          <label for="invoice-pdf">PDF File (Optional)</label>
          <input type="file" id="invoice-pdf" name="pdf" accept=".pdf">
          <div style="color: var(--muted); font-size: 0.9rem; margin-top: 0.5rem;">Upload the invoice PDF file. Max size: 10MB</div>
        </div>
        <button type="submit" class="btn btn-primary">Create Invoice</button>
      </form>
    </div>
  `;
  
  renderAdminLayout(content, 'invoices');
  document.getElementById('page-title').textContent = 'New Invoice';
  
  // Filter projects by customer
  const customerSelect = document.getElementById('invoice-customer');
  const projectSelect = document.getElementById('invoice-project');
  
  customerSelect.addEventListener('change', (e) => {
    const customerId = e.target.value;
    Array.from(projectSelect.options).forEach(opt => {
      if (opt.value) {
        opt.style.display = !customerId || opt.dataset.customer === customerId ? 'block' : 'none';
      }
    });
  });
  
  // Set today as default issued date
  document.getElementById('invoice-issued').valueAsDate = new Date();
  
  document.getElementById('new-invoice-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const pdfFile = formData.get('pdf');
    
    // Validate PDF file if provided
    if (pdfFile && pdfFile.size > 0) {
      if (pdfFile.size > 10 * 1024 * 1024) { // 10MB limit
        alert('PDF file is too large. Maximum size is 10MB.');
        return;
      }
      if (pdfFile.type !== 'application/pdf') {
        alert('Please upload a valid PDF file.');
        return;
      }
    }
    
    const invoice = {
      customerId: formData.get('customerId'),
      projectId: formData.get('projectId'),
      amount: parseFloat(formData.get('amount')),
      status: formData.get('status'),
      issuedAt: formData.get('issuedAt'),
      dueAt: formData.get('dueAt')
    };
    
    // Show loading state
    const submitButton = e.target.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    submitButton.disabled = true;
    submitButton.textContent = pdfFile && pdfFile.size > 0 ? 'Creating invoice and uploading PDF...' : 'Creating invoice...';
    
    try {
      await store.addInvoice(invoice, pdfFile && pdfFile.size > 0 ? pdfFile : null);
      alert('Invoice created successfully!');
      router.navigate('/admin');
    } catch (error) {
      console.error('Error creating invoice:', error);
      alert('Failed to create invoice. Please try again.');
      submitButton.disabled = false;
      submitButton.textContent = originalText;
    }
  });
}

function renderAdminRequests() {
  const filter = new URLSearchParams(window.location.hash.split('?')[1] || '').get('filter') || 'all';
  
  // Filter requests based on status filter
  let filteredRequests = [...store.requests];
  
  if (filter === 'pending') {
    filteredRequests = filteredRequests.filter(r => r.status === 'New' || r.status === 'In Review');
  } else if (filter === 'completed') {
    filteredRequests = filteredRequests.filter(r => r.status === 'Done');
  } else if (filter === 'abandoned') {
    filteredRequests = filteredRequests.filter(r => r.status === 'Abandoned');
  }
  
  // Sort by date (newest first)
  filteredRequests.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  
  const content = `
    <h2 style="margin-bottom: 2rem;">All Requests</h2>
    <div class="tabs" style="margin-bottom: 2rem;">
      <button class="tab ${filter === 'all' ? 'active' : ''}" onclick="window.location.hash = '#/admin/requests?filter=all'">All</button>
      <button class="tab ${filter === 'pending' ? 'active' : ''}" onclick="window.location.hash = '#/admin/requests?filter=pending'">Pending</button>
      <button class="tab ${filter === 'completed' ? 'active' : ''}" onclick="window.location.hash = '#/admin/requests?filter=completed'">Completed</button>
      <button class="tab ${filter === 'abandoned' ? 'active' : ''}" onclick="window.location.hash = '#/admin/requests?filter=abandoned'">Abandoned</button>
    </div>
    <div class="table-container">
      <table>
        <thead>
          <tr>
            <th>Customer</th>
            <th>Type</th>
            <th>Details</th>
            <th>Date</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          ${filteredRequests.length > 0 ? filteredRequests.map(req => {
            const customer = store.customers.find(c => c.id === req.customerId) || store.customers[0];
            return `
              <tr>
                <td>${customer?.name || 'Unknown'}</td>
                <td>${req.type.charAt(0).toUpperCase() + req.type.slice(1)}</td>
                <td>${req.details.notes?.substring(0, 50) || 'N/A'}...</td>
                <td>${formatDate(req.createdAt)}</td>
                <td>${getStatusBadge(req.status)}</td>
                <td>
                  <select onchange="updateRequestStatus('${req.id}', this.value)" style="background: var(--panel); border: 1px solid var(--border); color: var(--text); padding: 0.35rem 0.75rem; border-radius: 8px;">
                    <option value="New" ${req.status === 'New' ? 'selected' : ''}>New</option>
                    <option value="In Review" ${req.status === 'In Review' ? 'selected' : ''}>In Review</option>
                    <option value="Done" ${req.status === 'Done' ? 'selected' : ''}>Done</option>
                    <option value="Abandoned" ${req.status === 'Abandoned' ? 'selected' : ''}>Abandoned</option>
                  </select>
                </td>
              </tr>
            `;
          }).join('') : '<tr><td colspan="6" style="text-align: center; padding: 3rem; color: var(--muted);">No requests found</td></tr>'}
        </tbody>
      </table>
    </div>
  `;
  
  renderAdminLayout(content, 'requests');
  document.getElementById('page-title').textContent = 'Requests';
  
  window.updateRequestStatus = async function(requestId, status) {
    await store.updateRequestStatus(requestId, status);
    router.handleRoute();
  };
}

function renderAdminMessages() {
  const selectedCustomerId = new URLSearchParams(window.location.hash.split('?')[1] || '').get('customer');
  
  // Group threads by customer and get last message for each customer
  const customerThreads = {};
  store.threads.forEach(thread => {
    if (!customerThreads[thread.customerId]) {
      customerThreads[thread.customerId] = [];
    }
    customerThreads[thread.customerId].push(thread);
  });
  
  // Get all customers who have messages, with their last message info
  const customersWithMessages = store.customers
    .filter(customer => customerThreads[customer.id])
    .map(customer => {
      // Get all messages for this customer across all their threads
      const allCustomerMessages = store.messages.filter(msg => {
        const thread = store.threads.find(t => t.id === msg.threadId);
        return thread && thread.customerId === customer.id;
      });
      
      const lastMessage = allCustomerMessages.sort((a, b) => 
        new Date(b.createdAt) - new Date(a.createdAt)
      )[0];
      
      return {
        customer,
        lastMessage,
        unreadCount: 0 // Could be enhanced with read/unread tracking
      };
    })
    .sort((a, b) => {
      // Sort by last message time (most recent first)
      if (!a.lastMessage && !b.lastMessage) return 0;
      if (!a.lastMessage) return 1;
      if (!b.lastMessage) return -1;
      return new Date(b.lastMessage.createdAt) - new Date(a.lastMessage.createdAt);
    });
  
  // Build customer list (left sidebar)
  const customerList = customersWithMessages.map(({ customer, lastMessage }) => {
    const isSelected = selectedCustomerId === customer.id;
    const preview = lastMessage ? lastMessage.body.substring(0, 50) + (lastMessage.body.length > 50 ? '...' : '') : 'No messages yet';
    const timeAgo = lastMessage ? getTimeAgo(new Date(lastMessage.createdAt)) : '';
    
    return `
      <div class="dm-contact-item ${isSelected ? 'active' : ''}" onclick="window.location.hash = '#/admin/messages?customer=${customer.id}'">
        <div class="dm-avatar">
          <div class="dm-avatar-initial">${customer.name.charAt(0).toUpperCase()}</div>
          </div>
        <div class="dm-contact-info">
          <div class="dm-contact-name">${customer.name}</div>
          <div class="dm-contact-preview">${preview}</div>
                </div>
        ${timeAgo ? `<div class="dm-time">${timeAgo}</div>` : ''}
              </div>
    `;
  }).join('');
  
  // Get selected customer's messages
  let chatContent = '';
  if (selectedCustomerId) {
    const selectedCustomer = store.customers.find(c => c.id === selectedCustomerId);
    if (selectedCustomer) {
      // Get all messages for this customer across all threads
      const customerThreadIds = store.threads
        .filter(t => t.customerId === selectedCustomerId)
        .map(t => t.id);
      
      const allMessages = store.messages
        .filter(m => customerThreadIds.includes(m.threadId))
        .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
      
      chatContent = `
        <div class="dm-chat-container">
          <div class="dm-chat-header">
            <div class="dm-chat-header-info">
              <div class="dm-avatar dm-avatar-small">
                <div class="dm-avatar-initial">${selectedCustomer.name.charAt(0).toUpperCase()}</div>
          </div>
              <div>
                <div class="dm-chat-header-name">${selectedCustomer.name}</div>
                <div class="dm-chat-header-meta">${selectedCustomer.company}</div>
          </div>
            </div>
          </div>
          <div class="dm-chat-messages" id="dm-chat-messages">
            ${allMessages.map(msg => {
              const isAdmin = msg.senderRole === 'admin';
              return `
                <div class="dm-message ${isAdmin ? 'dm-message-sent' : 'dm-message-received'}">
                  <div class="dm-message-bubble">
                    ${msg.body}
                  </div>
                  <div class="dm-message-time">${formatTime(new Date(msg.createdAt))}</div>
                </div>
              `;
            }).join('')}
          </div>
          <div class="dm-chat-input-container">
            <div class="dm-chat-input-wrapper">
              <textarea id="dm-message-input" class="dm-chat-input" placeholder="Message ${selectedCustomer.name}..." rows="1"></textarea>
              <button class="dm-send-btn" onclick="sendDMMessage('${selectedCustomerId}')">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <line x1="22" y1="2" x2="11" y2="13"></line>
                  <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                </svg>
              </button>
            </div>
          </div>
        </div>
      `;
    } else {
      chatContent = `
        <div class="dm-chat-container">
          <div class="dm-empty-chat">
            <div class="empty-state-icon">💬</div>
            <div class="empty-state-title">Select a customer to start messaging</div>
          </div>
        </div>
      `;
    }
  } else {
    chatContent = `
      <div class="dm-chat-container">
        <div class="dm-empty-chat">
          <div class="empty-state-icon">💬</div>
          <div class="empty-state-title">Select a customer to start messaging</div>
        </div>
      </div>
    `;
  }
  
  const content = `
    <div class="dm-container">
      <div class="dm-sidebar">
        <div class="dm-sidebar-header">
          <h2 style="font-size: 1.5rem; margin: 0;">Messages</h2>
        </div>
        <div class="dm-contacts-list">
          ${customerList || '<div class="empty-state" style="padding: 2rem;">No conversations yet</div>'}
        </div>
      </div>
      <div class="dm-chat-area">
        ${chatContent}
      </div>
        </div>
      `;
      
      renderAdminLayout(content, 'messages');
  document.getElementById('page-title').textContent = 'Messages';
      
  // Scroll to bottom of chat
      setTimeout(() => {
    const chatMessages = document.getElementById('dm-chat-messages');
    if (chatMessages) {
      chatMessages.scrollTop = chatMessages.scrollHeight;
    }
      }, 100);
      
  // Auto-resize textarea
  const textarea = document.getElementById('dm-message-input');
  if (textarea) {
    textarea.addEventListener('input', function() {
      this.style.height = 'auto';
      this.style.height = Math.min(this.scrollHeight, 120) + 'px';
    });
    
    // Send on Enter (Shift+Enter for new line)
    textarea.addEventListener('keydown', function(e) {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        if (selectedCustomerId) {
          sendDMMessage(selectedCustomerId);
        }
      }
    });
  }
  
  window.sendDMMessage = async function(customerId) {
    const textarea = document.getElementById('dm-message-input');
    if (!textarea) return;
    
        const body = textarea.value.trim();
        if (!body) return;
        
    // Find or create a thread for this customer
    let thread = store.threads.find(t => t.customerId === customerId);
    if (!thread) {
      // Create a new thread
      thread = await store.addThread({
        customerId: customerId,
        subject: `Conversation with ${store.customers.find(c => c.id === customerId)?.name || 'Customer'}`,
        projectId: null
      });
    }
    
    await store.addMessage({
      threadId: thread.id,
          senderRole: 'admin',
          body
        });
        
        textarea.value = '';
    textarea.style.height = 'auto';
        router.handleRoute();
      };
}

// Helper function to format time (e.g., "2:30 PM" or "Yesterday 2:30 PM")
function formatTime(date) {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const messageDate = new Date(date);
  const messageDay = new Date(messageDate.getFullYear(), messageDate.getMonth(), messageDate.getDate());
  
  const diffTime = today - messageDay;
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  
  const timeStr = messageDate.toLocaleTimeString('en-US', { 
    hour: 'numeric', 
    minute: '2-digit',
    hour12: true 
  });
  
  if (diffDays === 0) {
    return timeStr;
  } else if (diffDays === 1) {
    return `Yesterday ${timeStr}`;
  } else if (diffDays < 7) {
    return messageDate.toLocaleDateString('en-US', { weekday: 'short' }) + ' ' + timeStr;
  } else {
    return messageDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) + ' ' + timeStr;
  }
}

// Helper function to get time ago (e.g., "2h", "3d", "1w")
function getTimeAgo(date) {
  const now = new Date();
  const diffMs = now - date;
  const diffMins = Math.floor(diffMs / (1000 * 60));
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const diffWeeks = Math.floor(diffDays / 7);
  
  if (diffMins < 1) return 'now';
  if (diffMins < 60) return `${diffMins}m`;
  if (diffHours < 24) return `${diffHours}h`;
  if (diffDays < 7) return `${diffDays}d`;
  if (diffWeeks < 4) return `${diffWeeks}w`;
  return formatDate(date);
}

function renderAdminInbox() {
  const filter = new URLSearchParams(window.location.hash.split('?')[1] || '').get('filter') || 'all';
  
  let filteredNotifications = [...store.adminNotifications].sort((a, b) => 
    new Date(b.createdAt) - new Date(a.createdAt)
  );
  
  if (filter === 'unread') {
    filteredNotifications = filteredNotifications.filter(n => !n.isRead);
  } else if (filter !== 'all') {
    filteredNotifications = filteredNotifications.filter(n => n.kind === filter);
  }
  
  const getNotificationKindLabel = (kind) => {
    const labels = {
      'request': 'Request',
      'invoice': 'Invoice',
      'message': 'Message',
      'system': 'System'
    };
    return labels[kind] || kind;
  };
  
  const navigateToRelated = (notification) => {
    if (notification.kind === 'request') {
      router.navigate('/admin/requests');
    } else if (notification.kind === 'invoice') {
      router.navigate('/admin/invoices/new');
    } else if (notification.kind === 'message') {
      router.navigate(`/admin/messages?thread=${notification.relatedId}`);
    }
  };
  
  const notificationsList = filteredNotifications.length > 0
    ? filteredNotifications.map(notif => {
        const customer = store.customers.find(c => c.id === notif.customerId);
        return `
          <div class="inbox-item ${!notif.isRead ? 'unread' : ''}" onclick="navigateToNotification('${notif.id}')">
            <div class="inbox-item-content">
              <div class="inbox-item-title">${notif.title}</div>
              <div class="inbox-item-meta">
                <span class="inbox-item-badge ${notif.kind}">${getNotificationKindLabel(notif.kind)}</span>
                <span>${customer?.name || 'Unknown'}</span>
                <span>•</span>
                <span>${formatDate(notif.createdAt)}</span>
              </div>
            </div>
            <div style="display: flex; gap: 0.5rem; align-items: center;">
              <button class="btn btn-secondary btn-small" onclick="event.stopPropagation(); toggleNotificationRead('${notif.id}')">
                ${notif.isRead ? 'Mark Unread' : 'Mark Read'}
              </button>
              <button class="btn btn-primary btn-small" onclick="event.stopPropagation(); navigateToNotification('${notif.id}')">Open</button>
            </div>
          </div>
        `;
      }).join('')
    : '<div class="empty-state"><div class="empty-state-icon">📭</div><div class="empty-state-title">No notifications</div></div>';
  
  const content = `
    <h2 style="margin-bottom: 2rem;">Admin Inbox</h2>
    <div class="tabs" style="margin-bottom: 2rem;">
      <button class="tab ${filter === 'all' ? 'active' : ''}" onclick="window.location.hash = '#/admin/inbox?filter=all'">All</button>
      <button class="tab ${filter === 'unread' ? 'active' : ''}" onclick="window.location.hash = '#/admin/inbox?filter=unread'">Unread</button>
      <button class="tab ${filter === 'request' ? 'active' : ''}" onclick="window.location.hash = '#/admin/inbox?filter=request'">Requests</button>
      <button class="tab ${filter === 'invoice' ? 'active' : ''}" onclick="window.location.hash = '#/admin/inbox?filter=invoice'">Invoices</button>
      <button class="tab ${filter === 'message' ? 'active' : ''}" onclick="window.location.hash = '#/admin/inbox?filter=message'">Messages</button>
      <button class="tab ${filter === 'system' ? 'active' : ''}" onclick="window.location.hash = '#/admin/inbox?filter=system'">System</button>
    </div>
    <div class="card">
      ${notificationsList}
    </div>
  `;
  
  renderAdminLayout(content, 'inbox');
  document.getElementById('page-title').textContent = 'Inbox';
  
  window.toggleNotificationRead = function(notificationId) {
    const notification = store.adminNotifications.find(n => n.id === notificationId);
    if (notification) {
      notification.isRead = !notification.isRead;
      store.notify();
      router.handleRoute();
    }
  };
  
  window.navigateToNotification = async function(notificationId) {
    const notification = store.adminNotifications.find(n => n.id === notificationId);
    if (notification) {
      await store.markNotificationRead(notificationId);
      navigateToRelated(notification);
    }
  };
}

// ==================== ROUTE SETUP ====================

// Login route (no auth required)
router.addRoute('/login', renderLogin, false);

// Customer routes
router.addRoute('/portal', renderCustomerOverview, true, 'customer');
router.addRoute('/portal/projects', renderCustomerProjects, true, 'customer');
router.addRoute('/portal/invoices', renderCustomerInvoices, true, 'customer');
router.addRoute('/portal/messages', renderCustomerMessages, true, 'customer');
router.addRoute('/portal/requests', renderCustomerRequests, true, 'customer');

// Admin routes
router.addRoute('/admin', renderAdminOverview, true, 'admin');
router.addRoute('/admin/customers', renderAdminCustomers, true, 'admin');
router.addRoute('/admin/projects/new', renderAdminNewProject, true, 'admin');
router.addRoute('/admin/invoices/new', renderAdminNewInvoice, true, 'admin');
router.addRoute('/admin/requests', renderAdminRequests, true, 'admin');
router.addRoute('/admin/inbox', renderAdminInbox, true, 'admin');
router.addRoute('/admin/messages', renderAdminMessages, true, 'admin');

// Initialize router
router.handleRoute();
