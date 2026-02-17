import React, { useEffect, useMemo, useRef, useState } from "react";
import { UrgentFixesSlideData, Finding } from "../../types";
import { usePrint } from "../../context/PrintContext";
import { gsap } from "gsap";
import { calculateUrgency } from "../../utils/priority";
import {
  AlertTriangle,
  AlertCircle,
  Info,
  Zap,
  ChevronRight,
  Target,
  ShieldAlert,
  Compass,
  BarChart3,
} from "lucide-react";
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
        y: 24,
        duration: 0.5,
        stagger: 0.08,
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
        media: section.media || [],
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

        <div style={{ display: "flex", flexDirection: "column", gap: "2.25rem" }}>
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
    <div style={{ width: "100%", display: "block" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "0.5rem",
          marginBottom: "0.875rem",
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

      <div style={{ display: "flex", flexDirection: "column", gap: "0.875rem", minHeight: "0", width: "100%", position: "relative" }}>
        {findings.length > 0 ? (
          findings.map((finding) => {
            const urgency = calculateUrgency(finding);
            return (
              <FindingCard
                key={finding.id}
                finding={finding}
                urgency={urgency}
                accentColor={accentColor}
                badgeBg={badgeBg}
                badgeColor={badgeColor}
                getIgnoredConsequence={getIgnoredConsequence}
                onOpenAnalysis={onOpenAnalysis}
              />
            );
          })
        ) : (
          <div style={{ padding: "1rem", color: "var(--text-muted)", fontSize: "var(--text-sm)" }}>
            No findings in this category.
          </div>
        )}
      </div>
    </div>
  );
}

/** A single redesigned finding card */
function FindingCard({
  finding,
  urgency,
  accentColor,
  badgeBg,
  badgeColor,
  getIgnoredConsequence,
  onOpenAnalysis,
}: {
  finding: Finding;
  urgency: number;
  accentColor: string;
  badgeBg: string;
  badgeColor: string;
  getIgnoredConsequence: (f: Finding) => string;
  onOpenAnalysis: (f: Finding) => void;
}) {
  const [isHovered, setIsHovered] = useState(false);

  const impactColor = finding.impact >= 4 ? "var(--accent-danger)" : finding.impact >= 3 ? "var(--accent-warning)" : "var(--accent-success)";
  const impactBg = finding.impact >= 4 ? "var(--accent-danger-soft)" : finding.impact >= 3 ? "var(--accent-warning-soft)" : "var(--accent-success-soft)";

  return (
    <div
      className="urgent-fix-item"
      style={{
        background: "var(--surface-card)",
        borderRadius: "var(--radius-lg)",
        border: "1px solid var(--border-default)",
        boxShadow: isHovered ? "var(--shadow-md)" : "var(--shadow-xs)",
        transition: "all var(--duration-normal) var(--ease-out)",
        transform: isHovered ? "translateY(-1px)" : "translateY(0)",
        overflow: "visible",
        minHeight: "200px",
        width: "100%",
        display: "block",
        position: "relative",
        visibility: "visible",
        opacity: 1,
        zIndex: 1,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Colored top accent bar */}
      <div style={{ height: "3px", background: accentColor, opacity: 0.8 }} />

      <div style={{ padding: "1.25rem 1.5rem" }}>
        {/* Top row: Category tag + Urgency */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.75rem" }}>
          <span
            style={{
              fontSize: "var(--text-xs)",
              fontWeight: 600,
              textTransform: "uppercase",
              letterSpacing: "0.06em",
              color: badgeColor,
              background: badgeBg,
              padding: "0.2rem 0.6rem",
              borderRadius: "var(--radius-full)",
            }}
          >
            {formatCategoryName(finding.category)}
          </span>
          <div style={{ display: "flex", alignItems: "center", gap: "0.35rem" }}>
            <Zap size={13} color={badgeColor} />
            <span
              style={{
                fontSize: "var(--text-xs)",
                fontWeight: 700,
                color: badgeColor,
                letterSpacing: "var(--tracking-wide)",
              }}
            >
              {urgency.toFixed(1)}
            </span>
          </div>
        </div>

        {/* Title */}
        <h4
          style={{
            fontSize: "var(--text-lg)",
            fontWeight: 600,
            color: "var(--text-primary)",
            lineHeight: "var(--leading-tight)",
            letterSpacing: "var(--tracking-tight)",
            marginBottom: "0.375rem",
          }}
        >
          {finding.title}
        </h4>

        {/* Lead sentence */}
        <p
          style={{
            fontSize: "var(--text-base)",
            lineHeight: "var(--leading-normal)",
            color: "var(--text-tertiary)",
            marginBottom: "1rem",
          }}
        >
          {getLeadSentence(getFindingWhatsHappening(finding))}
        </p>

        {/* Details grid — 2 columns */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "1rem",
            padding: "1rem",
            background: "var(--surface-sunken)",
            borderRadius: "var(--radius-md)",
            marginBottom: "1rem",
            width: "100%",
            boxSizing: "border-box",
          }}
        >
          {/* What's happening */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.35rem", marginBottom: "0.35rem" }}>
              <Target size={12} color="var(--text-muted)" />
              <div style={cardLabelStyle}>What's happening</div>
            </div>
            <div style={cardBodyStyle}>{getFindingWhatsHappening(finding)}</div>
          </div>

          {/* If ignored */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.35rem", marginBottom: "0.35rem" }}>
              <ShieldAlert size={12} color="var(--accent-danger)" />
              <div style={{ ...cardLabelStyle, color: "var(--accent-danger-text)" }}>If ignored</div>
            </div>
            <div style={{ ...cardBodyStyle, color: "var(--text-secondary)" }}>{getIgnoredConsequence(finding)}</div>
          </div>

          {/* Recommended direction */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.35rem", marginBottom: "0.35rem" }}>
              <Compass size={12} color="var(--text-muted)" />
              <div style={cardLabelStyle}>Recommended direction</div>
            </div>
            <div style={cardBodyStyle}>{getRecommendedDirection(finding) || "Not provided."}</div>
          </div>

          {/* Metrics */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.35rem", marginBottom: "0.5rem" }}>
              <BarChart3 size={12} color="var(--text-muted)" />
              <div style={cardLabelStyle}>Metrics</div>
            </div>
            <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
              <MetricBadge label="Impact" value={finding.impact} max={5} color={impactColor} bg={impactBg} />
              <MetricBadge
                label="Effort"
                value={finding.effort}
                max={5}
                color="var(--accent-primary)"
                bg="var(--accent-primary-soft)"
              />
              <MetricBadge
                label="Confidence"
                value={finding.confidence}
                max={5}
                color="var(--accent-success)"
                bg="var(--accent-success-soft)"
              />
            </div>
          </div>
        </div>

        {/* Footer: View analysis */}
        {finding.analysisSections?.some((section) => section.content.trim()) && (
          <button
            type="button"
            onClick={() => onOpenAnalysis(finding)}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.3rem",
              border: "none",
              background: "none",
              color: "var(--accent-primary)",
              cursor: "pointer",
              fontSize: "var(--text-sm)",
              fontWeight: 500,
              padding: 0,
              transition: "all var(--duration-fast) ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = "var(--accent-primary-hover)";
              e.currentTarget.style.gap = "0.5rem";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = "var(--accent-primary)";
              e.currentTarget.style.gap = "0.3rem";
            }}
          >
            View full analysis <ChevronRight size={14} />
          </button>
        )}
      </div>
    </div>
  );
}

/** A small metric badge with bar indicator */
function MetricBadge({
  label,
  value,
  max,
  color,
  bg,
}: {
  label: string;
  value: number;
  max: number;
  color: string;
  bg: string;
}) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "0.25rem",
        flex: "1 1 0",
        minWidth: "70px",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ fontSize: "0.65rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--text-muted)" }}>
          {label}
        </span>
        <span style={{ fontSize: "var(--text-xs)", fontWeight: 700, color }}>
          {value}/{max}
        </span>
      </div>
      <div style={{ height: "4px", borderRadius: "2px", background: "var(--border-default)", overflow: "hidden" }}>
        <div
          style={{
            height: "100%",
            width: `${(value / max) * 100}%`,
            borderRadius: "2px",
            background: color,
            transition: "width 0.3s ease",
          }}
        />
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

const cardLabelStyle: React.CSSProperties = {
  fontSize: "var(--text-xs)",
  textTransform: "uppercase",
  letterSpacing: "0.06em",
  color: "var(--text-muted)",
  fontWeight: 600,
  lineHeight: 1.4,
};

const cardBodyStyle: React.CSSProperties = {
  fontSize: "var(--text-sm)",
  color: "var(--text-secondary)",
  lineHeight: 1.6,
};
