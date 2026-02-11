import { Report, Slide, CategoryKey, CategoryScore, Finding, UserTier } from "../types";
import { groupFindingsByPriority, calculateUrgency } from "./priority";
import { canViewCategory } from "./tier";

// Thematic relationships between categories for contrast insights
const categoryRelations: Partial<Record<CategoryKey, CategoryKey[]>> = {
  onboarding: ["retention", "uxFlow", "firstImpression"],
  uiQuality: ["accessibility", "mobileResponsiveness", "firstImpression"],
  security: ["scalability", "performance"],
  firstImpression: ["performance", "uiQuality", "onboarding"],
  uxFlow: ["onboarding", "mobileResponsiveness", "monetization"],
  accessibility: ["uiQuality", "mobileResponsiveness"],
  performance: ["scalability", "mobileResponsiveness", "firstImpression"],
  monetization: ["uxFlow", "featureCompleteness", "retention"],
  retention: ["onboarding", "featureCompleteness", "monetization"],
  mobileResponsiveness: ["uiQuality", "accessibility", "uxFlow"],
  featureCompleteness: ["monetization", "scalability"],
  scalability: ["performance", "security"],
};

/**
 * Generate slides from report data based on user tier
 */
export function generateSlides(report: Report, tier: UserTier): Slide[] {
  const slides: Slide[] = [];

  const overallScore =
    report.categoryScores.reduce((sum, cs) => sum + cs.score, 0) /
    report.categoryScores.length;
  const scoreRounded = Math.round(overallScore * 10) / 10;

  const groupedFindings = groupFindingsByPriority(report.findings);
  const sortedScores = [...report.categoryScores].sort((a, b) => b.score - a.score);
  const topCategory = sortedScores[0];
  const bottomCategory = [...report.categoryScores].sort((a, b) => a.score - b.score)[0];

  // ── Hero slide ──
  slides.push({
    type: "hero",
    visible: true,
    data: {
      productName: report.meta.productName,
      overallScore: scoreRounded,
      summary: generateSummary(report),
      keyHighlights: extractHighlights(report),
      topStrength: topCategory
        ? `${formatCategoryName(topCategory.category)} leads at ${topCategory.score}/10`
        : undefined,
      topWeakness: bottomCategory
        ? `${formatCategoryName(bottomCategory.category)} needs attention at ${bottomCategory.score}/10`
        : undefined,
      urgentCount: groupedFindings.fixNow.length,
    },
  });

  // ── All findings slide (urgent + next + nice-to-have) ──
  if (report.findings.length > 0) {
    slides.push({
      type: "urgentFixes",
      visible: true,
      data: {
        findings: groupedFindings.fixNow,
        nextFindings: groupedFindings.next,
        niceToHaveFindings: groupedFindings.niceToHave,
      },
    });
  }

  // ── Score breakdown ──
  const visibleScores = report.categoryScores.filter((cs) =>
    canViewCategory(tier, cs.category)
  );
  if (visibleScores.length > 0) {
    slides.push({
      type: "scoreBreakdown",
      visible: true,
      data: {
        scores: visibleScores,
      },
    });
  }

  // ── Evidence slides for top 3 high-priority findings ──
  groupedFindings.fixNow.slice(0, 3).forEach((finding) => {
    if (finding.evidence.length > 0) {
      slides.push({
        type: "evidence",
        visible: true,
        data: {
          finding,
        },
      });
    }
  });

  // ── Final verdict ──
  const highestImpactFinding = [...report.findings].sort((a, b) => b.impact - a.impact)[0];
  const bestCategory = sortedScores[0];
  slides.push({
    type: "finalVerdict",
    visible: true,
    data: {
      overallScore: scoreRounded,
      summary: generateVerdictSummary(report),
      strengths: extractStrengthsWithScores(report),
      weaknesses: extractWeaknessesWithScores(report),
      nextSteps: extractActionableNextSteps(report),
      topRisk: highestImpactFinding
        ? `Unresolved "${highestImpactFinding.title}" risks compounding user friction and revenue loss.`
        : undefined,
      topOpportunity: bestCategory
        ? `Leverage strong ${formatCategoryName(bestCategory.category)} (${bestCategory.score}/10) as a competitive differentiator while closing gaps in weaker areas.`
        : undefined,
    },
  });

  return slides;
}

// ─── Insight Slide Data Generation ───

function generateInsightSlideData(
  categoryScore: CategoryScore,
  allScores: CategoryScore[],
  findings: Finding[]
) {
  const catName = formatCategoryName(categoryScore.category);

  // Find the lowest-scoring related category for contrast
  const relatedKeys = categoryRelations[categoryScore.category] || [];
  const relatedScores = allScores
    .filter((cs) => relatedKeys.includes(cs.category) && cs.score < categoryScore.score)
    .sort((a, b) => a.score - b.score);

  // Fallback: any low-scoring category
  const contrastCat =
    relatedScores[0] ||
    allScores
      .filter((cs) => cs.category !== categoryScore.category && cs.score < 7)
      .sort((a, b) => a.score - b.score)[0];

  // Find a related finding (from contrast category, then from current category)
  const relatedFinding =
    findings.find((f) => f.category === contrastCat?.category) ||
    findings.find((f) => f.category === categoryScore.category);

  let contrastNote: string | undefined;
  let contrastCategory: string | undefined;
  let contrastScore: number | undefined;

  if (contrastCat) {
    contrastCategory = formatCategoryName(contrastCat.category);
    contrastScore = contrastCat.score;
    const gap = categoryScore.score - contrastCat.score;
    contrastNote =
      gap >= 2
        ? `While ${catName} performs strongly at ${categoryScore.score}/10, ${contrastCategory} trails significantly at ${contrastCat.score}/10 \u2014 a ${gap.toFixed(1)}-point gap that signals an imbalance worth addressing.`
        : `${catName} scores ${categoryScore.score}/10, but the closely related ${contrastCategory} area (${contrastCat.score}/10) creates friction that undermines this strength.`;
  }

  // Decision framing
  let decisionFrame: string | undefined;
  if (contrastCat && relatedFinding) {
    decisionFrame = `Bridging the gap between ${catName} and ${formatCategoryName(contrastCat.category)} would strengthen overall product coherence and directly address: "${relatedFinding.title}."`;
  } else if (contrastCat) {
    decisionFrame = `Investing in ${formatCategoryName(contrastCat.category)} improvements would amplify the value already delivered by ${catName}.`;
  }

  return {
    title: catName,
    content: getScoreExplanation(categoryScore),
    category: categoryScore.category,
    scoreValue: categoryScore.score,
    contrastCategory,
    contrastScore,
    contrastNote,
    relatedFinding: relatedFinding
      ? {
          title: relatedFinding.title,
          description: relatedFinding.description,
          impact: relatedFinding.impact,
        }
      : undefined,
    decisionFrame,
  };
}

// ─── Deep Dive Synthesis ───

function generateDeepDiveSections(report: Report) {
  const findings = report.findings;
  const scores = report.categoryScores;
  const sections: {
    title: string;
    content: string;
    evidence?: { type: "image" | "video"; url: string; caption?: string }[];
    patternInsight?: string;
    connectedFindingTitles?: string[];
  }[] = [];

  // Theme 1: User Journey Friction
  const journeyFindings = findings.filter((f) =>
    ["performance", "uxFlow", "mobileResponsiveness"].includes(f.category)
  );
  if (journeyFindings.length >= 2) {
    const perfScore = scores.find((s) => s.category === "performance")?.score;
    const uxScore = scores.find((s) => s.category === "uxFlow")?.score;
    const mobileScore = scores.find((s) => s.category === "mobileResponsiveness")?.score;

    const parts: string[] = [];
    const perfF = journeyFindings.find((f) => f.category === "performance");
    const uxF = journeyFindings.find((f) => f.category === "uxFlow");
    const mobF = journeyFindings.find((f) => f.category === "mobileResponsiveness");

    if (perfF) parts.push(`Users face friction from the first visit: ${perfF.description.split(".")[0]}.`);
    if (uxF) parts.push(`The friction compounds through conversion: ${uxF.description.split(".")[0]}.`);
    if (mobF) parts.push(`On mobile, the experience is further compromised: ${mobF.description.split(".")[0]}.`);

    const scoreNote = [
      perfScore != null ? `Performance ${perfScore}/10` : null,
      uxScore != null ? `UX Flow ${uxScore}/10` : null,
      mobileScore != null ? `Mobile ${mobileScore}/10` : null,
    ]
      .filter(Boolean)
      .join(", ");

    parts.push(
      `Combined scores (${scoreNote}) reveal a systemic pattern of compounding friction rather than isolated issues. Fixing these in sequence would create a multiplicative improvement in conversion.`
    );

    sections.push({
      title: "User Journey Friction",
      content: parts.join(" "),
      evidence: journeyFindings.flatMap((f) => f.evidence).slice(0, 2),
      patternInsight:
        "Issues compound at each step of the user journey, creating multiplicative conversion loss rather than additive drag.",
      connectedFindingTitles: journeyFindings.map((f) => f.title),
    });
  }

  // Theme 2: Inclusivity & Compliance
  const inclusivityFindings = findings.filter((f) =>
    ["accessibility", "mobileResponsiveness"].includes(f.category)
  );
  if (inclusivityFindings.length >= 1) {
    const accScore = scores.find((s) => s.category === "accessibility")?.score;
    const mobScore = scores.find((s) => s.category === "mobileResponsiveness")?.score;

    const parts: string[] = [];
    const accF = inclusivityFindings.find((f) => f.category === "accessibility");
    const mobF = inclusivityFindings.find((f) => f.category === "mobileResponsiveness");

    if (accF && mobF) {
      parts.push(
        `Accessibility and mobile usability share a common root: interactive elements aren't designed for all users. ${accF.description.split(".")[0]}. Meanwhile, ${mobF.description.split(".")[0]}.`
      );
    } else if (accF) {
      parts.push(accF.description);
    } else if (mobF) {
      parts.push(mobF.description);
    }

    const avgEffort =
      inclusivityFindings.reduce((sum, f) => sum + f.effort, 0) / inclusivityFindings.length;
    parts.push(
      `With an average effort of ${avgEffort.toFixed(1)}/5, these are relatively low-effort fixes (Accessibility ${accScore}/10, Mobile ${mobScore}/10) with outsized impact on user reach and compliance.`
    );

    sections.push({
      title: "Inclusivity & Compliance Gap",
      content: parts.join(" "),
      evidence: inclusivityFindings.flatMap((f) => f.evidence).slice(0, 2),
      patternInsight:
        "Interactive elements aren't designed for all input methods, creating both a compliance risk and a market limitation.",
      connectedFindingTitles: inclusivityFindings.map((f) => f.title),
    });
  }

  // Theme 3: Revenue Leakage
  const revenueFindings = findings.filter((f) =>
    ["monetization", "uxFlow", "retention"].includes(f.category)
  );
  if (revenueFindings.length >= 2) {
    const monF = revenueFindings.find((f) => f.category === "monetization");
    const uxF = revenueFindings.find((f) => f.category === "uxFlow");
    const retF = revenueFindings.find((f) => f.category === "retention");

    const parts: string[] = [];
    parts.push("Revenue impact flows through three stages:");
    if (monF) parts.push(`confusion \u2014 ${monF.description.split(".")[0]}.`);
    if (uxF) parts.push(`Friction \u2014 ${uxF.description.split(".")[0]}.`);
    if (retF) parts.push(`Churn \u2014 ${retF.description.split(".")[0]}.`);
    parts.push(
      "Addressing these as a connected pipeline rather than isolated issues would yield the highest return on investment."
    );

    sections.push({
      title: "Revenue Leakage Pipeline",
      content: parts.join(" "),
      evidence: revenueFindings.flatMap((f) => f.evidence).slice(0, 2),
      patternInsight:
        "Revenue loss flows through confusion, friction, and churn \u2014 a connected pipeline, not isolated issues.",
      connectedFindingTitles: revenueFindings.map((f) => f.title),
    });
  }

  // Fallback: if no themes matched, use the old approach
  if (sections.length === 0) {
    return report.categoryScores
      .filter((cs) => Boolean(getScoreExplanation(cs)))
      .slice(0, 3)
      .map((cs) => ({
        title: formatCategoryName(cs.category),
        content: getScoreExplanation(cs),
        evidence: report.findings
          .filter((f) => f.category === cs.category)
          .flatMap((f) => f.evidence)
          .slice(0, 2),
      }));
  }

  return sections;
}

// ─── Hero & Summary Helpers ───

function generateSummary(report: Report): string {
  const avgScore =
    report.categoryScores.reduce((sum, cs) => sum + cs.score, 0) /
    report.categoryScores.length;
  const scoreRounded = Math.round(avgScore * 10) / 10;
  const strongCount = report.categoryScores.filter((cs) => cs.score >= 7).length;
  const weakCount = report.categoryScores.filter((cs) => cs.score < 6).length;

  if (scoreRounded >= 8) {
    return `Overall score: ${scoreRounded}/10. Strong fundamentals across ${strongCount} of ${report.categoryScores.length} categories. Strategic refinements can push this product into market-leading territory.`;
  } else if (scoreRounded >= 6) {
    return `Overall score: ${scoreRounded}/10. ${strongCount} categories perform well, but ${weakCount > 0 ? `${weakCount} area${weakCount > 1 ? "s" : ""} need${weakCount === 1 ? "s" : ""} focused attention` : "several areas have room for improvement"} to reach competitive parity.`;
  } else {
    return `Overall score: ${scoreRounded}/10. Significant improvements needed across multiple dimensions. ${report.findings.length} findings identified with clear remediation paths.`;
  }
}

function generateVerdictSummary(report: Report): string {
  const avgScore =
    report.categoryScores.reduce((sum, cs) => sum + cs.score, 0) /
    report.categoryScores.length;
  const scoreRounded = Math.round(avgScore * 10) / 10;
  const urgentFindings = report.findings.filter(
    (f) => calculateUrgency(f) >= 3.0
  );

  return `This audit identified ${report.findings.length} actionable findings across ${report.categoryScores.length} categories (${scoreRounded}/10 overall). ${urgentFindings.length} require immediate attention.`;
}

function extractHighlights(report: Report): string[] {
  const sorted = [...report.categoryScores].sort((a, b) => b.score - a.score);
  const highlights: string[] = [];

  // Top strength with context
  const best = sorted[0];
  if (best && best.score >= 7) {
    highlights.push(
      `${formatCategoryName(best.category)}: ${best.score}/10 \u2014 ${
        getPrimaryStrength(best) || "strong performance"
      }`
    );
  }

  // Most urgent finding
  const urgentFindings = [...report.findings].sort(
    (a, b) => calculateUrgency(b) - calculateUrgency(a)
  );
  if (urgentFindings.length > 0) {
    highlights.push(`Top priority: ${urgentFindings[0].title}`);
  }

  // Biggest gap
  const worst = sorted[sorted.length - 1];
  if (worst && worst.score < 7) {
    highlights.push(`Biggest gap: ${formatCategoryName(worst.category)} at ${worst.score}/10`);
  }

  return highlights.length > 0
    ? highlights
    : ["Comprehensive review completed", "Multiple improvement opportunities identified"];
}

function extractStrengthsWithScores(report: Report): string[] {
  return report.categoryScores
    .filter((cs) => cs.score >= 7)
    .sort((a, b) => b.score - a.score)
    .map((cs) => {
      const strengthText = getPrimaryStrength(cs);
      return `${formatCategoryName(cs.category)} (${cs.score}/10)${
        strengthText ? ` \u2014 ${strengthText}` : ""
      }`;
    })
    .slice(0, 5);
}

function extractWeaknessesWithScores(report: Report): string[] {
  return report.categoryScores
    .filter((cs) => cs.score < 7)
    .sort((a, b) => a.score - b.score)
    .map((cs) => {
      const weaknessText = getPrimaryWeakness(cs);
      const related = report.findings.find((f) => f.category === cs.category);
      const suffixParts = [
        weaknessText,
        related ? `see: "${related.title}"` : undefined,
      ].filter(Boolean);
      const suffix = suffixParts.length > 0 ? ` \u2014 ${suffixParts.join(" \u00b7 ")}` : "";
      return `${formatCategoryName(cs.category)} (${cs.score}/10)${suffix}`;
    })
    .slice(0, 5);
}

function extractActionableNextSteps(report: Report): string[] {
  const sortedFindings = [...report.findings].sort(
    (a, b) => calculateUrgency(b) - calculateUrgency(a)
  );
  const steps: string[] = [];

  // Top 2 most urgent findings as concrete next steps
  sortedFindings.slice(0, 2).forEach((f) => {
    steps.push(`Fix: ${f.title} (urgency ${calculateUrgency(f).toFixed(1)})`);
  });

  steps.push("Schedule follow-up audit after implementing critical fixes");

  return steps;
}

function formatCategoryName(category: string): string {
  return category
    .replace(/([A-Z])/g, " $1")
    .replace(/^./, (str) => str.toUpperCase())
    .trim();
}

function parseBulletLines(value?: string): string[] {
  if (!value) return [];
  return value
    .split("\n")
    .map((line) => line.replace(/^[\s\-*]+/, "").trim())
    .filter(Boolean);
}

function getPrimaryStrength(score: CategoryScore): string | undefined {
  return parseBulletLines(score.strengths)[0] || undefined;
}

function getPrimaryWeakness(score: CategoryScore): string | undefined {
  return parseBulletLines(score.weaknesses)[0] || undefined;
}

function getScoreExplanation(score: CategoryScore): string {
  if (score.scoreRationale?.trim()) {
    return score.scoreRationale.trim();
  }

  const strengths = parseBulletLines(score.strengths);
  const weaknesses = parseBulletLines(score.weaknesses);
  if (strengths.length || weaknesses.length) {
    const strengthsText = strengths.length
      ? `Strengths: ${strengths.join("; ")}.`
      : "";
    const weaknessesText = weaknesses.length
      ? `Weaknesses: ${weaknesses.join("; ")}.`
      : "";
    return `${strengthsText} ${weaknessesText}`.trim();
  }

  if (score.notes?.trim()) {
    return score.notes.trim();
  }

  return `Score: ${score.score}/10`;
}
