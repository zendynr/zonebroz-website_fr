// User Model
export type UserRole = "admin" | "client";
export type UserTier = "snapshot" | "full" | "investor";

export interface CurrentUser {
  id: string;
  role: UserRole;
  tier: UserTier;
  email?: string; // For client users - their email address
  assignedReportId?: string; // Deprecated: kept for backward compatibility
}

// Client Model
export interface Client {
  id: string;
  name: string;
  company?: string;
  email?: string;
  createdAt: string; // ISO date string
}

// Report Architecture
export type ReportStatus = "draft" | "published";

export interface Report {
  id: string;
  clientId: string; // ID of the client this report belongs to
  meta: ReportMeta;
  categoryScores: CategoryScore[];
  findings: Finding[];
  competitors: Competitor[];
  version?: string;
  ownerId?: string; // User ID who owns/created this report
  status: ReportStatus; // draft or published
  overallScore?: number; // Calculated overall score (0-10)
}

export interface ReportMeta {
  productName: string;
  productUrl?: string;
  reviewDate: string;
  reviewerName?: string;
  clientName?: string;
}

// Category Scoring
export type CategoryKey =
  | "firstImpression"
  | "uiQuality"
  | "uxFlow"
  | "mobileResponsiveness"
  | "accessibility"
  | "onboarding"
  | "featureCompleteness"
  | "monetization"
  | "retention"
  | "performance"
  | "security"
  | "scalability";

export interface CategoryScore {
  category: CategoryKey;
  score: number; // 1-10
  strengths?: string;
  weaknesses?: string;
  scoreRationale?: string;
  // Legacy free-text field kept for backward compatibility.
  notes?: string;
}

// Findings System
export interface Finding {
  id: string;
  category: CategoryKey;
  title: string;
  description: string;
  ifIgnored?: string;
  impact: number; // 1-5
  effort: number; // 1-5
  confidence: number; // 1-5
  recommendation: string;
  evidence: Evidence[];
}

export interface Evidence {
  type: "image" | "video";
  url: string;
  caption?: string;
}

// Competitors
export interface Competitor {
  id: string;
  name: string;
  url?: string;
  strengths: string[];
  weaknesses: string[];
  comparison?: string;
}

// Slide System
export type SlideType =
  | "hero"
  | "scoreBreakdown"
  | "insight"
  | "evidence"
  | "deepDive"
  | "urgentFixes"
  | "finalVerdict";

export interface Slide {
  type: SlideType;
  visible: boolean;
  data: SlideData;
}

export type SlideData =
  | HeroSlideData
  | ScoreBreakdownSlideData
  | InsightSlideData
  | EvidenceSlideData
  | DeepDiveSlideData
  | UrgentFixesSlideData
  | FinalVerdictSlideData;

export interface HeroSlideData {
  productName: string;
  overallScore: number;
  summary: string;
  keyHighlights: string[];
  topStrength?: string;
  topWeakness?: string;
  urgentCount?: number;
}

export interface ScoreBreakdownSlideData {
  scores: CategoryScore[];
}

export interface InsightSlideData {
  title: string;
  content: string;
  category?: CategoryKey;
  scoreValue?: number;
  contrastCategory?: string;
  contrastScore?: number;
  contrastNote?: string;
  relatedFinding?: {
    title: string;
    description: string;
    impact: number;
  };
  decisionFrame?: string;
}

export interface EvidenceSlideData {
  finding: Finding;
}

export interface DeepDiveSlideData {
  title: string;
  sections: DeepDiveSection[];
}

export interface DeepDiveSection {
  title: string;
  content: string;
  evidence?: Evidence[];
  patternInsight?: string;
  connectedFindingTitles?: string[];
}

export interface UrgentFixesSlideData {
  findings: Finding[];
  nextFindings?: Finding[];
  niceToHaveFindings?: Finding[];
}

export interface FinalVerdictSlideData {
  overallScore: number;
  summary: string;
  strengths: string[];
  weaknesses: string[];
  nextSteps: string[];
  topRisk?: string;
  topOpportunity?: string;
}

// Priority Groups
export type PriorityGroup = "fixNow" | "next" | "niceToHave";

export interface GroupedFindings {
  fixNow: Finding[];
  next: Finding[];
  niceToHave: Finding[];
}

// Feature Visibility
export type FeatureKey =
  | "competitorAnalysis"
  | "techReview"
  | "scalabilityReview"
  | "pdfExport"
  | "detailedMetrics";
