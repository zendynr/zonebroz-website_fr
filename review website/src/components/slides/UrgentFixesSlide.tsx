import React, { useEffect, useMemo, useRef, useState } from "react";
import { UrgentFixesSlideData, Finding } from "../../types";
import { usePrint } from "../../context/PrintContext";
import { gsap } from "gsap";
import { calculateUrgency } from "../../utils/priority";
import { AlertTriangle, AlertCircle, Info } from "lucide-react";
import AnalysisOverlay from "../AnalysisOverlay";

interface UrgentFixesSlideProps {
  data: UrgentFixesSlideData;
  slideIndex: number;
}

export default function UrgentFixesSlide({
  data,
  slideIndex,
}: UrgentFixesSlideProps) {
  const slideRef = useRef<HTMLDivElement>(null);
  const { isPrintMode, prefersReducedMotion } = usePrint();
  const [analysisTarget, setAnalysisTarget] = useState<Finding | null>(null);

  const nextFindings = data.nextFindings || [];
  const niceToHaveFindings = data.niceToHaveFindings || [];
  const allFindings = [...data.findings, ...nextFindings, ...niceToHaveFindings];

  useEffect(() => {
    if (isPrintMode || prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.from(".urgent-fix-item", {
        opacity: 0,
        x: -50,
        duration: 0.6,
        stagger: 0.1,
        ease: "power3.out",
      });
    }, slideRef);

    return () => ctx.revert();
  }, [slideIndex, isPrintMode, prefersReducedMotion]);

  const getIgnoredConsequence = (finding: Finding): string => {
    if (finding.ifIgnored?.trim()) return finding.ifIgnored.trim();
    const cat = formatCategoryName(finding.category);
    if (finding.impact >= 5) return `Delays here risk cascading failures across ${cat} and adjacent areas.`;
    if (finding.impact >= 4) return `Users will increasingly work around this, eroding trust in ${cat}.`;
    if (finding.impact >= 3) return `Compounds with other ${cat} issues to create cumulative friction.`;
    return `Low individual risk, but contributes to overall UX debt.`;
  };

  const totalCombinedImpact = allFindings.reduce((sum, f) => sum + f.impact, 0);
  const targetSections = useMemo(() => {
    if (!analysisTarget?.analysisSections) return [];
    return analysisTarget.analysisSections
      .filter((section) => section.content.trim())
      .map((section) => ({
        title: getFindingSectionLabel(section.type),
        content: section.content.trim(),
      }));
  }, [analysisTarget]);

  return (
    <div
      ref={slideRef}
      className="urgent-fixes-slide"
      style={{
        height: "100%",
        overflowY: "auto",
        padding: "3.5rem 4rem",
        background: "var(--surface-ground)",
      }}
    >
      <div style={{ maxWidth: "var(--canvas-max-width)", margin: "0 auto" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.75rem",
            marginBottom: "0.5rem",
          }}
        >
          <div
            style={{
              width: "2.75rem",
              height: "2.75rem",
              borderRadius: "var(--radius-md)",
              background: "var(--accent-danger-soft)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <AlertTriangle size={22} color="var(--accent-danger)" />
          </div>
          <h2
            style={{
              fontSize: "var(--text-3xl)",
              fontWeight: 700,
              color: "var(--text-primary)",
              letterSpacing: "var(--tracking-tight)",
              lineHeight: "var(--leading-tight)",
            }}
          >
            {data.findings.length > 0 ? "Urgent Fixes Required" : "All Findings"}
          </h2>
        </div>

        {/* Story context */}
        <p
          style={{
            fontSize: "var(--text-md)",
            color: "var(--text-secondary)",
            lineHeight: "var(--leading-relaxed)",
            marginBottom: "2rem",
            maxWidth: "720px",
            marginLeft: "3.5rem",
          }}
        >
          {allFindings.length} finding{allFindings.length !== 1 ? "s" : ""} identified
          {data.findings.length > 0 && (
            <>, <strong style={{ color: "var(--text-primary)", fontWeight: 600 }}>{data.findings.length} urgent</strong></>
          )}
          , with a combined impact score of {totalCombinedImpact}.
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
          {/* ── Fix Now (urgent) ── */}
          {data.findings.length > 0 && (
            <FindingsGroup
              label="Fix Now"
              icon={<AlertTriangle size={18} color="var(--accent-danger)" />}
              accentColor="var(--accent-danger)"
              badgeBg="var(--accent-danger-soft)"
              badgeColor="var(--accent-danger-text)"
              findings={data.findings}
              getIgnoredConsequence={getIgnoredConsequence}
              onOpenAnalysis={(finding) => setAnalysisTarget(finding)}
            />
          )}

          {/* ── Up Next ── */}
          {nextFindings.length > 0 && (
            <FindingsGroup
              label="Up Next"
              icon={<AlertCircle size={18} color="var(--accent-warning)" />}
              accentColor="var(--accent-warning)"
              badgeBg="var(--accent-warning-soft)"
              badgeColor="var(--accent-warning-text)"
              findings={nextFindings}
              getIgnoredConsequence={getIgnoredConsequence}
              onOpenAnalysis={(finding) => setAnalysisTarget(finding)}
            />
          )}

          {/* ── Nice to Have ── */}
          {niceToHaveFindings.length > 0 && (
            <FindingsGroup
              label="Nice to Have"
              icon={<Info size={18} color="var(--accent-info)" />}
              accentColor="var(--accent-info)"
              badgeBg="var(--accent-info-soft)"
              badgeColor="var(--accent-info-text)"
              findings={niceToHaveFindings}
              getIgnoredConsequence={getIgnoredConsequence}
              onOpenAnalysis={(finding) => setAnalysisTarget(finding)}
            />
          )}
        </div>
        <AnalysisOverlay
          open={Boolean(analysisTarget && targetSections.length > 0)}
          onClose={() => setAnalysisTarget(null)}
          title={`${analysisTarget?.title || "Finding"} Full Analysis`}
          sections={targetSections}
        />
      </div>
    </div>
  );
}

/** Renders a group of findings under a priority heading */
function FindingsGroup({
  label,
  icon,
  accentColor,
  badgeBg,
  badgeColor,
  findings,
  getIgnoredConsequence,
  onOpenAnalysis,
}: {
  label: string;
  icon: React.ReactNode;
  accentColor: string;
  badgeBg: string;
  badgeColor: string;
  findings: Finding[];
  getIgnoredConsequence: (f: Finding) => string;
  onOpenAnalysis: (f: Finding) => void;
}) {
  return (
    <div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "0.5rem",
          marginBottom: "0.75rem",
        }}
      >
        {icon}
        <h3
          style={{
            fontSize: "var(--text-lg)",
            fontWeight: 600,
            color: "var(--text-primary)",
            letterSpacing: "var(--tracking-tight)",
          }}
        >
          {label}{" "}
          <span style={{ fontWeight: 400, color: "var(--text-muted)", fontSize: "var(--text-base)" }}>
            ({findings.length})
          </span>
        </h3>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "0.625rem" }}>
        {findings.map((finding) => {
          const urgency = calculateUrgency(finding);
          return (
            <div
              key={finding.id}
              className="urgent-fix-item"
              style={{
                background: "var(--surface-card)",
                padding: "1.25rem 1.5rem",
                borderRadius: "var(--radius-md)",
                borderLeft: `3px solid ${accentColor}`,
                boxShadow: "var(--shadow-sm)",
                transition: "box-shadow var(--duration-normal) var(--ease-out)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = "var(--shadow-md)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = "var(--shadow-sm)";
              }}
            >
              {/* Title + urgency badge */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "start",
                  marginBottom: "0.5rem",
                }}
              >
                <h3
                  style={{
                    fontSize: "var(--text-lg)",
                    fontWeight: 600,
                    color: "var(--text-primary)",
                    flex: 1,
                    lineHeight: "var(--leading-tight)",
                    letterSpacing: "var(--tracking-tight)",
                  }}
                >
                  {finding.title}
                </h3>
                {/* Urgency badge — informational, not interactive */}
                <span
                  style={{
                    background: badgeBg,
                    color: badgeColor,
                    padding: "0.25rem 0.6rem",
                    borderRadius: "var(--radius-full)",
                    fontSize: "var(--text-xs)",
                    fontWeight: 600,
                    flexShrink: 0,
                    marginLeft: "1rem",
                    letterSpacing: "var(--tracking-wide)",
                    lineHeight: 1.4,
                  }}
                >
                  Urgency {urgency.toFixed(1)}
                </span>
              </div>

              <p
                style={{
                  fontSize: "var(--text-base)",
                  lineHeight: "var(--leading-normal)",
                  color: "var(--text-tertiary)",
                  marginBottom: "0.875rem",
                }}
              >
                {getLeadSentence(getFindingWhatsHappening(finding))}
              </p>

              <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1.2fr 1fr 1fr", gap: "0.875rem" }}>
                <div>
                  <div style={detailLabelStyle}>What's happening</div>
                  <div style={detailBodyStyle}>{getFindingWhatsHappening(finding)}</div>
                </div>
                <div>
                  <div style={detailLabelStyle}>If ignored</div>
                  <div style={{ ...detailBodyStyle, color: "var(--accent-danger-text)" }}>{getIgnoredConsequence(finding)}</div>
                </div>
                <div>
                  <div style={detailLabelStyle}>Recommended direction</div>
                  <div style={detailBodyStyle}>{getRecommendedDirection(finding) || "Not provided."}</div>
                </div>
                <div>
                  <div style={detailLabelStyle}>Impact / Effort / Confidence</div>
                  <div style={{ display: "flex", gap: "0.35rem", flexWrap: "wrap", marginTop: "0.15rem" }}>
                    <span style={metricPillStyle}>I {finding.impact}/5</span>
                    <span style={metricPillStyle}>E {finding.effort}/5</span>
                    <span style={metricPillStyle}>C {finding.confidence}/5</span>
                  </div>
                </div>
              </div>

              {finding.analysisSections?.some((section) => section.content.trim()) && (
                <>
                  <div style={{ borderTop: "1px solid var(--border-subtle)", margin: "0.875rem 0 0.625rem 0" }} />
                  <button
                    type="button"
                    onClick={() => onOpenAnalysis(finding)}
                    style={{
                      border: "none",
                      background: "none",
                      color: "var(--accent-primary)",
                      cursor: "pointer",
                      fontSize: "var(--text-sm)",
                      fontWeight: 500,
                      padding: 0,
                      transition: "color var(--duration-fast) ease",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = "var(--accent-primary-hover)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = "var(--accent-primary)";
                    }}
                  >
                    View full analysis →
                  </button>
                </>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function formatCategoryName(category: string): string {
  return category
    .replace(/([A-Z])/g, " $1")
    .replace(/^./, (str) => str.toUpperCase())
    .trim();
}

function getLeadSentence(text: string): string {
  const cleaned = text.trim();
  if (!cleaned) return "";
  const lead = cleaned.split(".")[0].trim();
  return lead.endsWith(".") ? lead : `${lead}.`;
}

function getFindingWhatsHappening(finding: Finding): string {
  return finding.whatsHappening?.trim() || finding.description?.trim() || "";
}

function getRecommendedDirection(finding: Finding): string {
  return finding.recommendedDirection?.trim() || finding.recommendation?.trim() || "";
}

function getFindingSectionLabel(type: string): string {
  const labels: Record<string, string> = {
    contextBackground: "Context / Background",
    whereThisAppears: "Where This Appears",
    whyItsSystemic: "Why It's Systemic",
    risksTradeoffs: "Risks & Tradeoffs",
    edgeCases: "Edge Cases",
    additionalNotes: "Additional Notes",
  };
  return labels[type] || "Additional Notes";
}

const detailLabelStyle: React.CSSProperties = {
  fontSize: "var(--text-xs)",
  textTransform: "uppercase",
  letterSpacing: "0.06em",
  color: "var(--text-muted)",
  fontWeight: 600,
  marginBottom: "0.3rem",
  lineHeight: 1.4,
};

const detailBodyStyle: React.CSSProperties = {
  fontSize: "var(--text-sm)",
  color: "var(--text-secondary)",
  lineHeight: 1.55,
};

const metricPillStyle: React.CSSProperties = {
  background: "var(--surface-sunken)",
  padding: "0.2rem 0.5rem",
  borderRadius: "var(--radius-full)",
  fontSize: "var(--text-xs)",
  color: "var(--text-secondary)",
  fontWeight: 500,
  letterSpacing: "0.02em",
};
