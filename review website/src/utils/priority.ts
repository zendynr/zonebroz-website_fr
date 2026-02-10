import { Finding, GroupedFindings, PriorityGroup } from "../types";

/**
 * Calculate urgency score for a finding
 * urgency = (impact * confidence) / effort
 */
export function calculateUrgency(finding: Finding): number {
  return (finding.impact * finding.confidence) / finding.effort;
}

/**
 * Group findings by priority based on urgency score
 */
export function groupFindingsByPriority(findings: Finding[]): GroupedFindings {
  const grouped: GroupedFindings = {
    fixNow: [],
    next: [],
    niceToHave: [],
  };

  findings.forEach((finding) => {
    const urgency = calculateUrgency(finding);
    if (urgency >= 3.0) {
      grouped.fixNow.push(finding);
    } else if (urgency >= 1.5) {
      grouped.next.push(finding);
    } else {
      grouped.niceToHave.push(finding);
    }
  });

  // Sort each group by urgency (descending)
  Object.keys(grouped).forEach((key) => {
    grouped[key as PriorityGroup].sort(
      (a, b) => calculateUrgency(b) - calculateUrgency(a)
    );
  });

  return grouped;
}

/**
 * Get priority group for a single finding
 */
export function getPriorityGroup(finding: Finding): PriorityGroup {
  const urgency = calculateUrgency(finding);
  if (urgency >= 3.0) return "fixNow";
  if (urgency >= 1.5) return "next";
  return "niceToHave";
}
