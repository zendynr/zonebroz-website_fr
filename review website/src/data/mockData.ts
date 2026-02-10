import { Report, Client } from "../types";

// Mock Clients
export const mockClient1: Client = {
  id: "client-1",
  name: "EcoShop Inc.",
  company: "EcoShop Inc.",
  email: "contact@ecoshop.com",
  createdAt: "2024-01-01T00:00:00Z",
};

export const mockClient2: Client = {
  id: "client-2",
  name: "TaskFlow Solutions",
  company: "TaskFlow Solutions",
  email: "hello@taskflow.com",
  createdAt: "2024-01-15T00:00:00Z",
};

export const mockClient3: Client = {
  id: "client-3",
  name: "HealthTech Innovations",
  company: "HealthTech Innovations",
  email: "info@healthtech.io",
  createdAt: "2024-01-20T00:00:00Z",
};

export const mockClients: Client[] = [mockClient1, mockClient2, mockClient3];

// Helper function to get a client by ID
export function getClientById(id: string): Client | undefined {
  return mockClients.find((c) => c.id === id);
}

// Helper function to calculate overall score from category scores
function calculateOverallScore(scores: Report["categoryScores"]): number {
  if (scores.length === 0) return 0;
  const sum = scores.reduce((acc, cs) => acc + cs.score, 0);
  return Math.round((sum / scores.length) * 10) / 10;
}

export const mockReport: Report = {
  id: "report-1",
  clientId: "client-1",
  ownerId: "admin-1",
  status: "published",
  meta: {
    productName: "EcoShop Marketplace",
    productUrl: "https://example.com/ecoshop",
    reviewDate: "2024-01-15",
    reviewerName: "Product Audit Team",
    clientName: "EcoShop Inc.",
  },
  categoryScores: [
    { category: "firstImpression", score: 7.5, notes: "Clean design, but loading time is noticeable" },
    { category: "uiQuality", score: 8.0, notes: "Modern interface with consistent design language" },
    { category: "uxFlow", score: 6.5, notes: "Navigation could be more intuitive in checkout" },
    { category: "mobileResponsiveness", score: 7.0, notes: "Works well on mobile, some touch targets too small" },
    { category: "accessibility", score: 5.5, notes: "Missing ARIA labels, poor keyboard navigation" },
    { category: "onboarding", score: 8.5, notes: "Excellent first-time user experience" },
    { category: "featureCompleteness", score: 7.5, notes: "Core features present, advanced features missing" },
    { category: "monetization", score: 6.0, notes: "Pricing unclear, conversion funnel needs work" },
    { category: "retention", score: 7.0, notes: "Good email campaigns, but lacks engagement hooks" },
    { category: "performance", score: 6.5, notes: "Initial load slow, but subsequent pages fast" },
    { category: "security", score: 8.0, notes: "Strong security practices, SSL properly configured" },
    { category: "scalability", score: 7.5, notes: "Architecture supports growth, but needs optimization" },
  ],
  findings: [
    {
      id: "finding-1",
      category: "accessibility",
      title: "Missing ARIA Labels on Interactive Elements",
      description: "Multiple buttons and form inputs lack proper ARIA labels, making the site difficult to navigate for screen reader users. This violates WCAG 2.1 Level A requirements.",
      impact: 4,
      effort: 2,
      confidence: 5,
      recommendation: "Add aria-label attributes to all interactive elements without visible text labels. Use aria-describedby for complex form fields.",
      evidence: [
        {
          type: "image",
          url: "https://via.placeholder.com/800x600/ef4444/ffffff?text=Missing+ARIA+Labels",
          caption: "Button without ARIA label in checkout flow",
        },
      ],
    },
    {
      id: "finding-2",
      category: "performance",
      title: "Slow Initial Page Load Time",
      description: "First Contentful Paint (FCP) is 3.2s, which is above the recommended 1.8s threshold. Large unoptimized images and blocking JavaScript are the main culprits.",
      impact: 5,
      effort: 3,
      confidence: 5,
      recommendation: "Implement image lazy loading, code splitting, and optimize critical CSS. Consider using a CDN for static assets.",
      evidence: [
        {
          type: "image",
          url: "https://via.placeholder.com/800x600/f59e0b/ffffff?text=Performance+Metrics",
          caption: "Lighthouse performance audit showing 3.2s FCP",
        },
      ],
    },
    {
      id: "finding-3",
      category: "uxFlow",
      title: "Checkout Process Too Complex",
      description: "Users must complete 5 steps to checkout, with no option to save progress. 23% of users abandon at step 3 (payment information).",
      impact: 5,
      effort: 4,
      confidence: 4,
      recommendation: "Reduce checkout to 2-3 steps. Add guest checkout option and save progress functionality. Consider one-click checkout for returning users.",
      evidence: [
        {
          type: "image",
          url: "https://via.placeholder.com/800x600/3b82f6/ffffff?text=Checkout+Flow+Analysis",
          caption: "User flow showing high abandonment at step 3",
        },
      ],
    },
    {
      id: "finding-4",
      category: "monetization",
      title: "Unclear Pricing Structure",
      description: "Pricing information is buried in footer and uses confusing terminology. Users report difficulty understanding subscription tiers.",
      impact: 4,
      effort: 2,
      confidence: 4,
      recommendation: "Create a dedicated pricing page with clear comparison table. Use simple, benefit-focused language. Add tooltips explaining features.",
      evidence: [
        {
          type: "image",
          url: "https://via.placeholder.com/800x600/10b981/ffffff?text=Pricing+Page+Redesign",
          caption: "Proposed pricing page layout",
        },
      ],
    },
    {
      id: "finding-5",
      category: "mobileResponsiveness",
      title: "Touch Targets Too Small on Mobile",
      description: "Several buttons and links have touch targets smaller than the recommended 44x44px minimum, causing accidental taps and user frustration.",
      impact: 3,
      effort: 1,
      confidence: 5,
      recommendation: "Increase padding on all interactive elements to ensure minimum 44x44px touch targets. Test on actual devices.",
      evidence: [
        {
          type: "image",
          url: "https://via.placeholder.com/400x600/ef4444/ffffff?text=Small+Touch+Targets",
          caption: "Mobile view showing undersized buttons",
        },
      ],
    },
    {
      id: "finding-6",
      category: "retention",
      title: "Lack of Engagement Hooks",
      description: "After initial signup, users receive only transactional emails. No personalized recommendations or re-engagement campaigns.",
      impact: 3,
      effort: 3,
      confidence: 3,
      recommendation: "Implement personalized product recommendations based on browsing history. Send weekly digest emails with curated content.",
      evidence: [],
    },
  ],
  competitors: [
    {
      id: "competitor-1",
      name: "GreenMarket Pro",
      url: "https://example.com/greenmarket",
      strengths: ["Faster checkout", "Better mobile app", "Loyalty program"],
      weaknesses: ["Higher prices", "Limited product range"],
      comparison: "GreenMarket Pro has a more streamlined checkout process but lacks the product diversity of EcoShop.",
    },
    {
      id: "competitor-2",
      name: "EcoDirect",
      url: "https://example.com/ecodirect",
      strengths: ["Strong brand recognition", "Excellent customer service"],
      weaknesses: ["Outdated UI", "Poor mobile experience"],
      comparison: "EcoDirect has brand trust but falls behind in user experience and mobile optimization.",
    },
  ],
  roadmap: [
    {
      id: "roadmap-1",
      title: "Implement Accessibility Improvements",
      description: "Add ARIA labels, improve keyboard navigation, and ensure WCAG 2.1 AA compliance across all pages.",
      priority: "critical",
      timeline: "Q1 2024",
      dependencies: [],
    },
    {
      id: "roadmap-2",
      title: "Optimize Performance",
      description: "Reduce initial load time to under 2s through image optimization, code splitting, and CDN implementation.",
      priority: "high",
      timeline: "Q1 2024",
      dependencies: [],
    },
    {
      id: "roadmap-3",
      title: "Redesign Checkout Flow",
      description: "Simplify checkout to 2-3 steps, add guest checkout, and implement progress saving.",
      priority: "high",
      timeline: "Q2 2024",
      dependencies: ["roadmap-2"],
    },
    {
      id: "roadmap-4",
      title: "Create Pricing Page",
      description: "Design and implement a dedicated pricing page with clear comparison table and feature explanations.",
      priority: "medium",
      timeline: "Q2 2024",
      dependencies: [],
    },
    {
      id: "roadmap-5",
      title: "Mobile Touch Target Improvements",
      description: "Increase all interactive element sizes to meet 44x44px minimum touch target requirement.",
      priority: "medium",
      timeline: "Q1 2024",
      dependencies: [],
    },
    {
      id: "roadmap-6",
      title: "Engagement Campaign System",
      description: "Build personalized recommendation engine and automated email campaigns for user retention.",
      priority: "low",
      timeline: "Q3 2024",
      dependencies: ["roadmap-3"],
    },
  ],
  overallScore: 0, // Will be calculated below
};

// Calculate overall score
mockReport.overallScore = calculateOverallScore(mockReport.categoryScores);

// Additional mock reports
export const mockReport2: Report = {
  id: "report-2",
  clientId: "client-2",
  ownerId: "admin-1",
  status: "draft",
  meta: {
    productName: "TaskFlow Pro",
    productUrl: "https://example.com/taskflow",
    reviewDate: "2024-02-10",
    reviewerName: "Product Audit Team",
    clientName: "TaskFlow Solutions",
  },
  categoryScores: [
    { category: "firstImpression", score: 8.5, notes: "Strong visual appeal and clear value proposition" },
    { category: "uiQuality", score: 9.0, notes: "Exceptional design system with consistent patterns" },
    { category: "uxFlow", score: 8.0, notes: "Intuitive navigation, minor friction in task creation" },
    { category: "mobileResponsiveness", score: 7.5, notes: "Good mobile experience, some layout issues on tablets" },
    { category: "accessibility", score: 6.0, notes: "Basic accessibility, needs ARIA improvements" },
    { category: "onboarding", score: 8.5, notes: "Excellent guided tour and first-time experience" },
    { category: "featureCompleteness", score: 8.0, notes: "Comprehensive feature set, advanced features well implemented" },
    { category: "monetization", score: 7.5, notes: "Clear pricing tiers, good upgrade prompts" },
    { category: "retention", score: 8.0, notes: "Strong engagement features and email campaigns" },
    { category: "performance", score: 7.0, notes: "Fast overall, some slow queries on dashboard" },
    { category: "security", score: 8.5, notes: "Robust security measures, 2FA available" },
    { category: "scalability", score: 8.0, notes: "Well-architected for growth" },
  ],
  findings: [
    {
      id: "finding-2-1",
      category: "accessibility",
      title: "Missing Keyboard Navigation Support",
      description: "Several interactive elements cannot be accessed via keyboard, creating barriers for users who rely on keyboard navigation.",
      impact: 3,
      effort: 2,
      confidence: 4,
      recommendation: "Add tabindex and keyboard event handlers to all interactive elements. Ensure focus indicators are visible.",
      evidence: [],
    },
  ],
  competitors: [],
  roadmap: [
    {
      id: "roadmap-2-1",
      title: "Enhance Accessibility",
      description: "Implement full keyboard navigation and ARIA labels across all components.",
      priority: "high",
      timeline: "Q2 2024",
      dependencies: [],
    },
  ],
  overallScore: 0,
};

mockReport2.overallScore = calculateOverallScore(mockReport2.categoryScores);

export const mockReport3: Report = {
  id: "report-3",
  clientId: "client-3",
  ownerId: "admin-1",
  status: "published",
  meta: {
    productName: "HealthTracker App",
    productUrl: "https://example.com/healthtracker",
    reviewDate: "2024-01-28",
    reviewerName: "Product Audit Team",
    clientName: "HealthTech Innovations",
  },
  categoryScores: [
    { category: "firstImpression", score: 6.5, notes: "Clean but generic design, unclear value proposition" },
    { category: "uiQuality", score: 7.0, notes: "Functional design, lacks visual polish" },
    { category: "uxFlow", score: 6.0, notes: "Confusing navigation, too many steps to complete basic tasks" },
    { category: "mobileResponsiveness", score: 8.0, notes: "Excellent mobile-first design" },
    { category: "accessibility", score: 5.0, notes: "Poor contrast ratios, missing labels" },
    { category: "onboarding", score: 5.5, notes: "Overwhelming initial setup, too much information at once" },
    { category: "featureCompleteness", score: 6.5, notes: "Core features work, advanced features incomplete" },
    { category: "monetization", score: 5.5, notes: "Unclear monetization strategy, confusing subscription model" },
    { category: "retention", score: 6.0, notes: "Limited engagement features, basic notifications only" },
    { category: "performance", score: 7.5, notes: "Good performance on mobile devices" },
    { category: "security", score: 7.0, notes: "Basic security, needs HIPAA compliance improvements" },
    { category: "scalability", score: 6.0, notes: "Some performance concerns at scale" },
  ],
  findings: [
    {
      id: "finding-3-1",
      category: "uxFlow",
      title: "Complex Data Entry Process",
      description: "Users must complete 7 steps to log a single health entry, causing frustration and abandonment.",
      impact: 5,
      effort: 4,
      confidence: 5,
      recommendation: "Simplify to 2-3 steps with smart defaults and bulk entry options.",
      evidence: [],
    },
    {
      id: "finding-3-2",
      category: "accessibility",
      title: "Poor Color Contrast",
      description: "Text contrast ratios fall below WCAG AA standards in multiple areas, making content difficult to read.",
      impact: 4,
      effort: 2,
      confidence: 5,
      recommendation: "Update color palette to meet WCAG AA contrast requirements (4.5:1 for normal text).",
      evidence: [],
    },
  ],
  competitors: [],
  roadmap: [
    {
      id: "roadmap-3-1",
      title: "Simplify Data Entry",
      description: "Redesign entry flow to reduce steps and improve user experience.",
      priority: "critical",
      timeline: "Q1 2024",
      dependencies: [],
    },
  ],
  overallScore: 0,
};

mockReport3.overallScore = calculateOverallScore(mockReport3.categoryScores);

// Additional report for client-1 to demonstrate multiple reports per client
export const mockReport4: Report = {
  id: "report-4",
  clientId: "client-1",
  ownerId: "admin-1",
  status: "published",
  meta: {
    productName: "EcoShop Mobile App",
    productUrl: "https://example.com/ecoshop-app",
    reviewDate: "2024-02-05",
    reviewerName: "Product Audit Team",
    clientName: "EcoShop Inc.",
  },
  categoryScores: [
    { category: "firstImpression", score: 8.0, notes: "Polished app store presence" },
    { category: "uiQuality", score: 8.5, notes: "Native feel with smooth animations" },
    { category: "uxFlow", score: 7.5, notes: "Intuitive navigation, some edge cases" },
    { category: "mobileResponsiveness", score: 9.0, notes: "Excellent mobile optimization" },
    { category: "accessibility", score: 7.0, notes: "Good VoiceOver support" },
    { category: "onboarding", score: 8.0, notes: "Clear tutorial flow" },
    { category: "featureCompleteness", score: 7.5, notes: "Most features available, some web-only" },
    { category: "monetization", score: 7.0, notes: "In-app purchases well integrated" },
    { category: "retention", score: 8.0, notes: "Push notifications effective" },
    { category: "performance", score: 8.5, notes: "Fast and responsive" },
    { category: "security", score: 8.0, notes: "Biometric auth available" },
    { category: "scalability", score: 7.5, notes: "Good architecture" },
  ],
  findings: [
    {
      id: "finding-4-1",
      category: "uxFlow",
      title: "Search Functionality Limited",
      description: "App search only searches product names, not descriptions or categories. Users report difficulty finding specific items.",
      impact: 3,
      effort: 3,
      confidence: 4,
      recommendation: "Expand search to include descriptions, categories, and tags. Add filters and sorting options.",
      evidence: [],
    },
  ],
  competitors: [],
  roadmap: [
    {
      id: "roadmap-4-1",
      title: "Enhance Search Capabilities",
      description: "Implement full-text search with filters and advanced sorting options.",
      priority: "medium",
      timeline: "Q2 2024",
      dependencies: [],
    },
  ],
  overallScore: 0,
};

mockReport4.overallScore = calculateOverallScore(mockReport4.categoryScores);

// Additional report for client-2
export const mockReport5: Report = {
  id: "report-5",
  clientId: "client-2",
  ownerId: "admin-1",
  status: "published",
  meta: {
    productName: "TaskFlow API",
    productUrl: "https://api.taskflow.com",
    reviewDate: "2024-01-25",
    reviewerName: "Product Audit Team",
    clientName: "TaskFlow Solutions",
  },
  categoryScores: [
    { category: "firstImpression", score: 7.0, notes: "Clear API documentation" },
    { category: "uiQuality", score: 6.5, notes: "Functional but basic docs UI" },
    { category: "uxFlow", score: 7.5, notes: "Easy to navigate API endpoints" },
    { category: "mobileResponsiveness", score: 6.0, notes: "Docs work on mobile but not optimized" },
    { category: "accessibility", score: 7.0, notes: "Good keyboard navigation" },
    { category: "onboarding", score: 8.0, notes: "Excellent getting started guide" },
    { category: "featureCompleteness", score: 8.5, notes: "Comprehensive API coverage" },
    { category: "monetization", score: 7.5, notes: "Clear tiered pricing" },
    { category: "retention", score: 7.0, notes: "Good developer resources" },
    { category: "performance", score: 8.0, notes: "Fast API responses" },
    { category: "security", score: 8.5, notes: "Strong authentication and rate limiting" },
    { category: "scalability", score: 8.0, notes: "Well-designed for scale" },
  ],
  findings: [],
  competitors: [],
  roadmap: [],
  overallScore: 0,
};

mockReport5.overallScore = calculateOverallScore(mockReport5.categoryScores);

// All mock reports
export const mockReports: Report[] = [mockReport, mockReport2, mockReport3, mockReport4, mockReport5];

// Helper function to get a report by ID
export function getReportById(id: string): Report | undefined {
  return mockReports.find((r) => r.id === id);
}

// Helper function to get reports by owner
export function getReportsByOwner(ownerId: string): Report[] {
  return mockReports.filter((r) => r.ownerId === ownerId);
}

// Helper function to get reports by client
export function getReportsByClient(clientId: string): Report[] {
  return mockReports.filter((r) => r.clientId === clientId);
}
