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
        padding: "4rem",
        background: "#fef2f2",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "1rem",
          marginBottom: "0.75rem",
        }}
      >
        <AlertTriangle size={40} color="#ef4444" />
        <h2
          style={{
            fontSize: "2.5rem",
            fontWeight: "bold",
            color: "#1f2937",
          }}
        >
          {data.findings.length > 0 ? "Urgent Fixes Required" : "All Findings"}
        </h2>
      </div>

      {/* Layer 1 — Story: brief context */}
      <p
        style={{
          fontSize: "1.05rem",
          color: "#4b5563",
          lineHeight: 1.6,
          marginBottom: "2rem",
          maxWidth: "800px",
        }}
      >
        {allFindings.length} finding{allFindings.length !== 1 ? "s" : ""} identified
        {data.findings.length > 0 && (
          <>, <strong>{data.findings.length} urgent</strong></>
        )}
        , with a combined impact score of {totalCombinedImpact}.
      </p>

      <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
        {/* ── Fix Now (urgent) ── */}
        {data.findings.length > 0 && (
          <FindingsGroup
            label="Fix Now"
            icon={<AlertTriangle size={20} color="#ef4444" />}
            borderColor="#ef4444"
            badgeBg="#fee2e2"
            badgeColor="#991b1b"
            findings={data.findings}
            getIgnoredConsequence={getIgnoredConsequence}
            onOpenAnalysis={(finding) => setAnalysisTarget(finding)}
          />
        )}

        {/* ── Up Next ── */}
        {nextFindings.length > 0 && (
          <FindingsGroup
            label="Up Next"
            icon={<AlertCircle size={20} color="#f59e0b" />}
            borderColor="#f59e0b"
            badgeBg="#fef3c7"
            badgeColor="#92400e"
            findings={nextFindings}
            getIgnoredConsequence={getIgnoredConsequence}
            onOpenAnalysis={(finding) => setAnalysisTarget(finding)}
          />
        )}

        {/* ── Nice to Have ── */}
        {niceToHaveFindings.length > 0 && (
          <FindingsGroup
            label="Nice to Have"
            icon={<Info size={20} color="#3b82f6" />}
            borderColor="#3b82f6"
            badgeBg="#dbeafe"
            badgeColor="#1e40af"
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
  );
}

/** Renders a group of findings under a priority heading */
function FindingsGroup({
  label,
  icon,
  borderColor,
  badgeBg,
  badgeColor,
  findings,
  getIgnoredConsequence,
  onOpenAnalysis,
}: {
  label: string;
  icon: React.ReactNode;
  borderColor: string;
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
            fontSize: "1.15rem",
            fontWeight: "bold",
            color: "#374151",
          }}
        >
          {label}{" "}
          <span style={{ fontWeight: "normal", color: "#6b7280", fontSize: "0.95rem" }}>
            ({findings.length})
          </span>
        </h3>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
        {findings.map((finding) => {
          const urgency = calculateUrgency(finding);
          return (
            <div
              key={finding.id}
              className="urgent-fix-item"
              style={{
                background: "white",
                padding: "1.25rem 1.5rem",
                borderRadius: "0.5rem",
                borderLeft: `6px solid ${borderColor}`,
                boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
              }}
            >
              {/* Title + urgency badge */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "start",
                  marginBottom: "0.35rem",
                }}
              >
                <h3
                  style={{
                    fontSize: "1.25rem",
                    fontWeight: "bold",
                    color: "#1f2937",
                    flex: 1,
                  }}
                >
                  {finding.title}
                </h3>
                <div
                  style={{
                    background: badgeBg,
                    color: badgeColor,
                    padding: "0.3rem 0.65rem",
                    borderRadius: "0.5rem",
                    fontSize: "0.75rem",
                    fontWeight: "bold",
                    flexShrink: 0,
                    marginLeft: "1rem",
                  }}
                >
                  Urgency: {urgency.toFixed(1)}
                </div>
              </div>

              <p
                style={{
                  fontSize: "0.95rem",
                  lineHeight: 1.5,
                  color: "#6b7280",
                  marginBottom: "0.75rem",
                }}
              >
                {getLeadSentence(getFindingWhatsHappening(finding))}
              </p>
              <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1.2fr 1fr 1fr", gap: "0.75rem" }}>
                <div>
                  <div style={detailLabelStyle}>What's happening</div>
                  <div style={detailBodyStyle}>{getFindingWhatsHappening(finding)}</div>
                </div>
                <div>
                  <div style={detailLabelStyle}>If ignored</div>
                  <div style={{ ...detailBodyStyle, color: "#b91c1c" }}>{getIgnoredConsequence(finding)}</div>
                </div>
                <div>
                  <div style={detailLabelStyle}>Recommended direction</div>
                  <div style={detailBodyStyle}>{getRecommendedDirection(finding) || "Not provided."}</div>
                </div>
                <div>
                  <div style={detailLabelStyle}>Impact / Effort / Confidence</div>
                  <div style={{ display: "flex", gap: "0.35rem", flexWrap: "wrap" }}>
                    <span style={metricPillStyle}>I {finding.impact}/5</span>
                    <span style={metricPillStyle}>E {finding.effort}/5</span>
                    <span style={metricPillStyle}>C {finding.confidence}/5</span>
                  </div>
                </div>
              </div>
              {finding.analysisSections?.some((section) => section.content.trim()) && (
                <>
                  <div style={{ borderTop: "1px solid #e5e7eb", margin: "0.8rem 0 0.6rem 0" }} />
                  <button
                    type="button"
                    onClick={() => onOpenAnalysis(finding)}
                    style={{
                      border: "none",
                      background: "none",
                      color: "#6b7280",
                      cursor: "pointer",
                      fontSize: "0.88rem",
                      padding: 0,
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
  fontSize: "0.72rem",
  textTransform: "uppercase",
  letterSpacing: "0.04em",
  color: "#6b7280",
  fontWeight: 700,
  marginBottom: "0.25rem",
};

const detailBodyStyle: React.CSSProperties = {
  fontSize: "0.88rem",
  color: "#374151",
  lineHeight: 1.45,
};

const metricPillStyle: React.CSSProperties = {
  background: "#f3f4f6",
  padding: "0.25rem 0.45rem",
  borderRadius: "0.35rem",
  fontSize: "0.74rem",
  color: "#374151",
};
