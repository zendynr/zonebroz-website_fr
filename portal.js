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
  }
];

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
  }
];

const mockMessages = [
  {
    id: 'msg-1',
    threadId: 'thread-1',
    senderRole: 'customer',
    body: 'Hi, I wanted to check on the timeline for the e-commerce redesign. When can we expect the first prototype?',
    createdAt: '2024-02-15T10:30:00Z'
  },
  {
    id: 'msg-2',
    threadId: 'thread-1',
    senderRole: 'admin',
    body: 'Thanks for reaching out! We\'re on track and should have the first prototype ready by next Friday. I\'ll send it over as soon as it\'s ready.',
    createdAt: '2024-02-15T14:20:00Z'
  },
  {
    id: 'msg-3',
    threadId: 'thread-1',
    senderRole: 'customer',
    body: 'Perfect, looking forward to it!',
    createdAt: '2024-02-15T15:00:00Z'
  },
  {
    id: 'msg-4',
    threadId: 'thread-2',
    senderRole: 'customer',
    body: 'The mobile app designs look great! Can we adjust the color scheme to match our brand guidelines a bit more closely?',
    createdAt: '2024-02-18T09:15:00Z'
  },
  {
    id: 'msg-5',
    threadId: 'thread-3',
    senderRole: 'admin',
    body: 'The brand guidelines document has been finalized and is ready for download. You should receive an email with the link shortly.',
    createdAt: '2024-02-20T11:00:00Z'
  },
  {
    id: 'msg-6',
    threadId: 'thread-4',
    senderRole: 'customer',
    body: 'Is it possible to add real-time notifications to the dashboard? This would be a huge value-add for our team.',
    createdAt: '2024-02-22T13:45:00Z'
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
    this.customers = [...mockCustomers];
    this.projects = [...mockProjects];
    this.invoices = [...mockInvoices];
    this.threads = [...mockThreads];
    this.messages = [...mockMessages];
    this.requests = [...mockRequests];
    this.adminNotifications = [...mockAdminNotifications];
    this.listeners = [];
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
  addProject(project) {
    const newProject = {
      ...project,
      id: `proj-${Date.now()}`
    };
    this.projects.push(newProject);
    this.notify();
    return newProject;
  }

  // Invoices
  addInvoice(invoice) {
    const newInvoice = {
      ...invoice,
      id: `inv-${Date.now()}`
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
  addMessage(message) {
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
  addThread(thread) {
    const newThread = {
      ...thread,
      id: `thread-${Date.now()}`
    };
    this.threads.push(newThread);
    this.notify();
    return newThread;
  }

  // Requests
  addRequest(request) {
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

  updateRequestStatus(requestId, status) {
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

  markNotificationRead(notificationId) {
    const notification = this.adminNotifications.find(n => n.id === notificationId);
    if (notification) {
      notification.isRead = true;
      this.notify();
    }
  }

  getUnreadNotificationsCount() {
    return this.adminNotifications.filter(n => !n.isRead).length;
  }
}

const store = new PortalStore();

// ==================== AUTH MANAGEMENT ====================

const AuthService = {
  getSession() {
    try {
      const session = localStorage.getItem('portalSession');
      return session ? JSON.parse(session) : null;
    } catch {
      return null;
    }
  },

  setSession(role, userId) {
    const session = { role, userId, timestamp: Date.now() };
    localStorage.setItem('portalSession', JSON.stringify(session));
  },

  clearSession() {
    localStorage.removeItem('portalSession');
  },

  isAuthenticated() {
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

  handleRoute() {
    const hash = window.location.hash.slice(1) || '/login';
    const route = this.routes.find(r => r.path === hash);

    if (route) {
      // Check auth
      if (route.requiresAuth && !AuthService.isAuthenticated()) {
        this.navigate('/login');
        return;
      }

      const session = AuthService.getSession();
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
      route.handler();
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

  app.querySelector('#login-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const email = app.querySelector('#email').value;
    const userId = `user-${Date.now()}`;
    AuthService.setSession(selectedRole, userId);
    
    if (selectedRole === 'customer') {
      router.navigate('/portal');
    } else {
      router.navigate('/admin');
    }
  });
}

function renderCustomerLayout(content, activeNav = '') {
  const session = AuthService.getSession();
  const customer = store.customers[0]; // Mock: use first customer
  const app = document.getElementById('portal-app');
  
  app.innerHTML = `
    <div class="page-background" aria-hidden="true"></div>
    <div class="portal-layout">
      <div class="sidebar-overlay" id="sidebar-overlay"></div>
      <aside class="portal-sidebar" id="sidebar">
        <div class="portal-sidebar-header">
          <h2>Customer Portal</h2>
          <p>${customer?.company || 'Dashboard'}</p>
        </div>
        <nav class="portal-nav">
          <a href="#/portal" class="nav-item ${activeNav === 'overview' ? 'active' : ''}">Overview</a>
          <a href="#/portal/projects" class="nav-item ${activeNav === 'projects' ? 'active' : ''}">Projects</a>
          <a href="#/portal/invoices" class="nav-item ${activeNav === 'invoices' ? 'active' : ''}">Invoices</a>
          <a href="#/portal/messages" class="nav-item ${activeNav === 'messages' ? 'active' : ''}">Messages</a>
          <a href="#/portal/requests" class="nav-item ${activeNav === 'requests' ? 'active' : ''}">Requests</a>
        </nav>
      </aside>
      <main class="portal-main">
        <header class="portal-header">
          <div>
            <button class="sidebar-toggle" id="sidebar-toggle">☰</button>
            <h1 id="page-title"></h1>
          </div>
          <div class="portal-header-actions">
            <div class="user-info">${customer?.name || 'Customer'}</div>
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

function renderCustomerOverview() {
  const session = AuthService.getSession();
  const customerId = session?.userId;
  const customerProjects = store.projects.filter(p => p.customerId === 'cust-1'); // Mock
  const customerInvoices = store.invoices.filter(i => i.customerId === 'cust-1');
  const customerRequests = store.requests.filter(r => r.customerId === 'cust-1');
  
  const content = `
    <h2 style="margin-bottom: 2rem;">Dashboard Overview</h2>
    <div class="form-grid" style="margin-bottom: 2rem;">
      <div class="card">
        <div class="card-title">Active Projects</div>
        <div style="font-size: 2.5rem; font-weight: 700; margin-top: 1rem;">${customerProjects.length}</div>
      </div>
      <div class="card">
        <div class="card-title">Pending Invoices</div>
        <div style="font-size: 2.5rem; font-weight: 700; margin-top: 1rem;">${customerInvoices.filter(i => i.status === 'Pending').length}</div>
      </div>
      <div class="card">
        <div class="card-title">Open Requests</div>
        <div style="font-size: 2.5rem; font-weight: 700; margin-top: 1rem;">${customerRequests.filter(r => r.status !== 'Done').length}</div>
      </div>
    </div>
    <div class="card">
      <div class="card-title">Recent Activity</div>
      <div style="margin-top: 1.5rem; color: var(--muted);">
        <p>Welcome to your customer portal. Use the navigation menu to access your projects, invoices, messages, and requests.</p>
      </div>
    </div>
  `;
  
  renderCustomerLayout(content, 'overview');
  document.getElementById('page-title').textContent = 'Overview';
}

function renderCustomerProjects() {
  const session = AuthService.getSession();
  const customerProjects = store.projects.filter(p => p.customerId === 'cust-1');
  const selectedProjectId = new URLSearchParams(window.location.hash.split('?')[1] || '').get('id');
  
  if (selectedProjectId) {
    const project = customerProjects.find(p => p.id === selectedProjectId);
    if (project) {
      const content = `
        <a href="#/portal/projects" class="back-link">← Back to Projects</a>
        <div class="detail-panel">
          <div class="detail-section">
            <div class="detail-label">Title</div>
            <div class="detail-value">${project.title}</div>
          </div>
          <div class="detail-section">
            <div class="detail-label">Status</div>
            <div class="detail-value">${getStatusBadge(project.status)}</div>
          </div>
          <div class="detail-section">
            <div class="detail-label">Scope Summary</div>
            <div class="detail-value">${project.scopeSummary}</div>
          </div>
        </div>
      `;
      renderCustomerLayout(content, 'projects');
      document.getElementById('page-title').textContent = project.title;
      return;
    }
  }
  
  const projectsList = customerProjects.length > 0
    ? customerProjects.map(project => `
        <div class="list-item" onclick="window.location.hash = '#/portal/projects?id=${project.id}'">
          <div class="list-item-header">
            <div>
              <div class="list-item-title">${project.title}</div>
              <div class="list-item-meta">${project.scopeSummary}</div>
            </div>
            ${getStatusBadge(project.status)}
          </div>
        </div>
      `).join('')
    : '<div class="empty-state"><div class="empty-state-icon">📁</div><div class="empty-state-title">No projects yet</div></div>';
  
  const content = `
    <h2 style="margin-bottom: 2rem;">My Projects</h2>
    <div class="list">
      ${projectsList}
    </div>
  `;
  
  renderCustomerLayout(content, 'projects');
  document.getElementById('page-title').textContent = 'Projects';
}

function renderCustomerInvoices() {
  const session = AuthService.getSession();
  const customerInvoices = store.invoices.filter(i => i.customerId === 'cust-1');
  const selectedInvoiceId = new URLSearchParams(window.location.hash.split('?')[1] || '').get('id');
  
  if (selectedInvoiceId) {
    const invoice = customerInvoices.find(i => i.id === selectedInvoiceId);
    if (invoice) {
      const project = store.projects.find(p => p.id === invoice.projectId);
      const content = `
        <a href="#/portal/invoices" class="back-link">← Back to Invoices</a>
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
      document.getElementById('page-title').textContent = 'Invoice Details';
      return;
    }
  }
  
  const invoicesList = customerInvoices.length > 0
    ? customerInvoices.map(invoice => {
        const project = store.projects.find(p => p.id === invoice.projectId);
        return `
          <div class="list-item" onclick="window.location.hash = '#/portal/invoices?id=${invoice.id}'">
            <div class="list-item-header">
              <div>
                <div class="list-item-title">${project?.title || 'Invoice'}</div>
                <div class="list-item-meta">${formatCurrency(invoice.amount)} • ${formatDate(invoice.issuedAt)}</div>
              </div>
              ${getStatusBadge(invoice.status)}
            </div>
          </div>
        `;
      }).join('')
    : '<div class="empty-state"><div class="empty-state-icon">💳</div><div class="empty-state-title">No invoices yet</div></div>';
  
  const content = `
    <h2 style="margin-bottom: 2rem;">My Invoices</h2>
    <div class="list">
      ${invoicesList}
    </div>
  `;
  
  renderCustomerLayout(content, 'invoices');
  document.getElementById('page-title').textContent = 'Invoices';
}

function renderCustomerMessages() {
  const session = AuthService.getSession();
  const customerThreads = store.threads.filter(t => t.customerId === 'cust-1');
  const selectedThreadId = new URLSearchParams(window.location.hash.split('?')[1] || '').get('thread');
  
  if (selectedThreadId) {
    const thread = customerThreads.find(t => t.id === selectedThreadId);
    if (thread) {
      const threadMessages = store.messages.filter(m => m.threadId === selectedThreadId).sort((a, b) => 
        new Date(a.createdAt) - new Date(b.createdAt)
      );
      
      const content = `
        <a href="#/portal/messages" class="back-link">← Back to Messages</a>
        <div class="card">
          <div class="card-header">
            <div class="card-title">${thread.subject}</div>
          </div>
          <div class="message-thread" id="message-thread">
            ${threadMessages.map(msg => `
              <div class="message ${msg.senderRole}">
                <div class="message-header">
                  <span>${msg.senderRole === 'customer' ? 'You' : 'ZoneBroz'}</span>
                  <span>${formatDate(msg.createdAt)}</span>
                </div>
                <div class="message-body">${msg.body}</div>
              </div>
            `).join('')}
          </div>
          <div class="message-compose">
            <textarea id="new-message" placeholder="Type your message..."></textarea>
            <button class="btn btn-primary" onclick="sendMessage('${selectedThreadId}')">Send</button>
          </div>
        </div>
      `;
      
      renderCustomerLayout(content, 'messages');
      document.getElementById('page-title').textContent = thread.subject;
      
      // Scroll to bottom
      setTimeout(() => {
        const threadEl = document.getElementById('message-thread');
        if (threadEl) threadEl.scrollTop = threadEl.scrollHeight;
      }, 100);
      
      return;
    }
  }
  
  const threadsList = customerThreads.length > 0
    ? customerThreads.map(thread => {
        const lastMessage = store.messages
          .filter(m => m.threadId === thread.id)
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))[0];
        return `
          <div class="list-item" onclick="window.location.hash = '#/portal/messages?thread=${thread.id}'">
            <div class="list-item-header">
              <div>
                <div class="list-item-title">${thread.subject}</div>
                ${lastMessage ? `<div class="list-item-meta">${lastMessage.body.substring(0, 60)}...</div>` : ''}
              </div>
            </div>
          </div>
        `;
      }).join('')
    : '<div class="empty-state"><div class="empty-state-icon">💬</div><div class="empty-state-title">No messages yet</div></div>';
  
  const content = `
    <h2 style="margin-bottom: 2rem;">Messages</h2>
    <div class="list">
      ${threadsList}
    </div>
  `;
  
  renderCustomerLayout(content, 'messages');
  document.getElementById('page-title').textContent = 'Messages';
  
  window.sendMessage = function(threadId) {
    const textarea = document.getElementById('new-message');
    const body = textarea.value.trim();
    if (!body) return;
    
    store.addMessage({
      threadId,
      senderRole: 'customer',
      body
    });
    
    textarea.value = '';
    router.handleRoute(); // Re-render
  };
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
    
    form.addEventListener('submit', (e) => {
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
      
      store.addRequest({
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

// ==================== ADMIN PAGES ====================

function renderAdminOverview() {
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
  
  const handleNotificationClick = (notification) => {
    store.markNotificationRead(notification.id);
    
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
      <div class="card">
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
    
    <div class="card inbox-panel">
      <div class="card-header">
        <div class="card-title">Inbox (Unread)</div>
        <a href="#/admin/inbox" class="btn btn-secondary btn-small">View all inbox</a>
      </div>
      <div>
        ${inboxItems}
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
    window.handleNotificationClick = function(notificationId) {
      const notification = store.adminNotifications.find(n => n.id === notificationId);
      if (notification) {
        store.markNotificationRead(notificationId);
        
        if (notification.kind === 'request') {
          router.navigate('/admin/requests');
        } else if (notification.kind === 'invoice') {
          router.navigate('/admin/invoices/new');
        } else if (notification.kind === 'message') {
          router.navigate(`/admin/messages?thread=${notification.relatedId}`);
        }
      }
    };
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
          <label for="invoice-pdf">PDF File</label>
          <input type="file" id="invoice-pdf" name="pdf" accept=".pdf">
          <div style="color: var(--muted); font-size: 0.9rem; margin-top: 0.5rem;">Note: File upload will be implemented during backend integration</div>
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
  
  document.getElementById('new-invoice-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const pdfFile = formData.get('pdf');
    
    const invoice = {
      customerId: formData.get('customerId'),
      projectId: formData.get('projectId'),
      amount: parseFloat(formData.get('amount')),
      status: formData.get('status'),
      pdfUrl: pdfFile ? `#pdf-${Date.now()}` : '#',
      issuedAt: formData.get('issuedAt'),
      dueAt: formData.get('dueAt')
    };
    
    store.addInvoice(invoice);
    alert('Invoice created successfully!');
    router.navigate('/admin');
  });
}

function renderAdminRequests() {
  const content = `
    <h2 style="margin-bottom: 2rem;">All Requests</h2>
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
          ${store.requests.map(req => {
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
                  </select>
                </td>
              </tr>
            `;
          }).join('')}
        </tbody>
      </table>
    </div>
  `;
  
  renderAdminLayout(content, 'requests');
  document.getElementById('page-title').textContent = 'Requests';
  
  window.updateRequestStatus = function(requestId, status) {
    store.updateRequestStatus(requestId, status);
    router.handleRoute();
  };
}

function renderAdminMessages() {
  const selectedThreadId = new URLSearchParams(window.location.hash.split('?')[1] || '').get('thread');
  
  if (selectedThreadId) {
    const thread = store.threads.find(t => t.id === selectedThreadId);
    if (thread) {
      const customer = store.customers.find(c => c.id === thread.customerId);
      const threadMessages = store.messages.filter(m => m.threadId === selectedThreadId).sort((a, b) => 
        new Date(a.createdAt) - new Date(b.createdAt)
      );
      
      const content = `
        <a href="#/admin/messages" class="back-link">← Back to Messages</a>
        <div class="card">
          <div class="card-header">
            <div class="card-title">${thread.subject}</div>
            <div style="color: var(--muted); font-size: 0.9rem;">${customer?.name || 'Customer'}</div>
          </div>
          <div class="message-thread" id="admin-message-thread">
            ${threadMessages.map(msg => `
              <div class="message ${msg.senderRole}">
                <div class="message-header">
                  <span>${msg.senderRole === 'customer' ? (customer?.name || 'Customer') : 'Admin'}</span>
                  <span>${formatDate(msg.createdAt)}</span>
                </div>
                <div class="message-body">${msg.body}</div>
              </div>
            `).join('')}
          </div>
          <div class="message-compose">
            <textarea id="admin-new-message" placeholder="Type your reply..."></textarea>
            <button class="btn btn-primary" onclick="sendAdminMessage('${selectedThreadId}')">Send</button>
          </div>
        </div>
      `;
      
      renderAdminLayout(content, 'messages');
      document.getElementById('page-title').textContent = thread.subject;
      
      setTimeout(() => {
        const threadEl = document.getElementById('admin-message-thread');
        if (threadEl) threadEl.scrollTop = threadEl.scrollHeight;
      }, 100);
      
      window.sendAdminMessage = function(threadId) {
        const textarea = document.getElementById('admin-new-message');
        const body = textarea.value.trim();
        if (!body) return;
        
        store.addMessage({
          threadId,
          senderRole: 'admin',
          body
        });
        
        textarea.value = '';
        router.handleRoute();
      };
      
      return;
    }
  }
  
  const threadsList = store.threads.map(thread => {
    const customer = store.customers.find(c => c.id === thread.customerId);
    const lastMessage = store.messages
      .filter(m => m.threadId === thread.id)
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))[0];
    return `
      <div class="list-item" onclick="window.location.hash = '#/admin/messages?thread=${thread.id}'">
        <div class="list-item-header">
          <div>
            <div class="list-item-title">${thread.subject}</div>
            <div class="list-item-meta">${customer?.name || 'Customer'}${lastMessage ? ` • ${lastMessage.body.substring(0, 60)}...` : ''}</div>
          </div>
        </div>
      </div>
    `;
  }).join('');
  
  const content = `
    <h2 style="margin-bottom: 2rem;">All Messages</h2>
    <div class="list">
      ${threadsList || '<div class="empty-state">No messages</div>'}
    </div>
  `;
  
  renderAdminLayout(content, 'messages');
  document.getElementById('page-title').textContent = 'Messages';
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
  
  window.navigateToNotification = function(notificationId) {
    const notification = store.adminNotifications.find(n => n.id === notificationId);
    if (notification) {
      store.markNotificationRead(notificationId);
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
