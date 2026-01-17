// Mock data for Portal MVP v1
// This will be replaced with API calls during backend integration

export const mockCustomers = [
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

export const mockProjects = [
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

export const mockInvoices = [
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

export const mockThreads = [
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

export const mockMessages = [
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

export const mockRequests = [
  {
    id: 'req-1',
    customerId: 'cust-1',
    type: 'report',
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
    details: {
      notes: 'Can we get a quality assessment report for the dashboard performance?'
    },
    status: 'New',
    createdAt: '2024-02-23T11:20:00Z'
  }
];
