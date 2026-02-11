import { UserTier, FeatureKey } from "../types";

/**
 * Check if a feature is visible for a given tier
 * Frontend-safe visibility check (not enforcement)
 */
export function canView(tier: UserTier, featureKey: FeatureKey): boolean {
  const tierFeatures: Record<UserTier, FeatureKey[]> = {
    snapshot: [
      "competitorAnalysis",
      "techReview",
      "scalabilityReview",
      "pdfExport",
      "detailedMetrics",
    ],
    full: [
      "competitorAnalysis",
      "techReview",
      "scalabilityReview",
      "pdfExport",
      "detailedMetrics",
    ],
    investor: [
      "competitorAnalysis",
      "techReview",
      "scalabilityReview",
      "pdfExport",
      "detailedMetrics",
    ],
  };

  // For now, all tiers see all features
  // This can be customized per tier later
  return tierFeatures[tier]?.includes(featureKey) ?? false;
}

/**
 * Check if a category should be visible for a tier
 */
export function canViewCategory(tier: UserTier, category: string): boolean {
  // Scalability is tier-gated
  if (category === "scalability") {
    return tier === "full" || tier === "investor";
  }
  return true;
}
