import React, { useEffect, useRef, useState } from "react";
import { EvidenceSlideData, Evidence } from "../../types";
import { usePrint } from "../../context/PrintContext";
import { gsap } from "gsap";
import { calculateUrgency } from "../../utils/priority";
import DetailPanel, { DetailBlock } from "../DetailPanel";
import EvidenceLightbox from "../EvidenceLightbox";

interface EvidenceSlideProps {
  data: EvidenceSlideData;
  slideIndex: number;
}

export default function EvidenceSlide({
  data,
  slideIndex,
}: EvidenceSlideProps) {
  const slideRef = useRef<HTMLDivElement>(null);
  const { isPrintMode, prefersReducedMotion } = usePrint();
  const [lightboxEvidence, setLightboxEvidence] = useState<Evidence | null>(null);

  useEffect(() => {
    if (isPrintMode || prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.from(".evidence-finding", {
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: "power3.out",
      });
      gsap.from(".evidence-media", {
        opacity: 0,
        scale: 0.95,
        duration: 0.8,
        delay: 0.3,
        ease: "power3.out",
      });
    }, slideRef);

    return () => ctx.revert();
  }, [slideIndex, isPrintMode, prefersReducedMotion]);

  const urgency = calculateUrgency(data.finding);
  const urgencyLevel =
    urgency >= 3.0 ? "danger" : urgency >= 1.5 ? "warning" : "info";

  const urgencyStyles: Record<string, { bg: string; color: string }> = {
    danger: { bg: "var(--accent-danger-soft)", color: "var(--accent-danger-text)" },
    warning: { bg: "var(--accent-warning-soft)", color: "var(--accent-warning-text)" },
    info: { bg: "var(--accent-info-soft)", color: "var(--accent-info-text)" },
  };

  const getImpactWarning = (impact: number): string => {
    if (impact >= 5)
      return "Critical business impact if unaddressed \u2014 significant user drop-off and potential revenue loss.";
    if (impact >= 4)
      return "Noticeable user experience degradation \u2014 may drive users to competitors over time.";
    if (impact >= 3)
      return "Quality and satisfaction decline \u2014 compounds with other issues to erode trust.";
    return "Minor friction point \u2014 low individual impact but contributes to cumulative UX debt.";
  };

  const ignoredImpact = data.finding.ifIgnored?.trim() || getImpactWarning(data.finding.impact);

  const recSteps = getRecommendedDirection(data.finding)
    .split(/\.\s+/)
    .map((s) => s.replace(/\.$/, "").trim())
    .filter((s) => s.length > 0);

  return (
    <div
      ref={slideRef}
      className="evidence-slide"
      style={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        padding: "3.5rem 4rem",
        background: "var(--surface-ground)",
        gap: "1.5rem",
      }}
    >
      <div style={{ maxWidth: "var(--canvas-max-width)", margin: "0 auto", width: "100%" }}>
        <div className="evidence-finding">
          {/* Badges — informational, not interactive */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              marginBottom: "0.75rem",
              flexWrap: "wrap",
            }}
          >
            <span
              style={{
                background: urgencyStyles[urgencyLevel].bg,
                color: urgencyStyles[urgencyLevel].color,
                padding: "0.3rem 0.7rem",
                borderRadius: "var(--radius-full)",
                fontSize: "var(--text-xs)",
                fontWeight: 600,
                letterSpacing: "var(--tracking-wide)",
              }}
            >
              Urgency {urgency.toFixed(1)}
            </span>
            <span
              style={{
                background: "var(--surface-sunken)",
                color: "var(--text-tertiary)",
                padding: "0.3rem 0.7rem",
                borderRadius: "var(--radius-full)",
                fontSize: "var(--text-xs)",
                fontWeight: 500,
              }}
            >
              {formatCategoryName(data.finding.category)}
            </span>
          </div>

          <h2
            style={{
              fontSize: "var(--text-3xl)",
              fontWeight: 700,
              marginBottom: "0.5rem",
              color: "var(--text-primary)",
              letterSpacing: "var(--tracking-tight)",
              lineHeight: "var(--leading-tight)",
            }}
          >
            {data.finding.title}
          </h2>

          <p
            style={{
              fontSize: "var(--text-md)",
              lineHeight: "var(--leading-relaxed)",
              color: "var(--text-secondary)",
              marginBottom: "0.75rem",
              maxWidth: "720px",
            }}
          >
            {getLeadSentence(getFindingWhatsHappening(data.finding))}
          </p>

          {/* Explain panel */}
          <DetailPanel label="Why this matters">
            <DetailBlock title="Full context">
              {getFindingWhatsHappening(data.finding)}
            </DetailBlock>
            <DetailBlock title="If unaddressed">
              <span style={{ color: "var(--accent-danger-text)" }}>
                {ignoredImpact}
              </span>
            </DetailBlock>
            <DetailBlock title="Impact · Effort">
              <span>
                Impact {data.finding.impact}/5 · Effort {data.finding.effort}/5 · Confidence{" "}
                {data.finding.confidence}/5
              </span>
            </DetailBlock>
            <DetailBlock title="Recommended direction">
              {recSteps.length > 1 ? (
                <ol style={{ margin: 0, paddingLeft: "1.1rem" }}>
                  {recSteps.map((step, i) => (
                    <li key={i} style={{ marginBottom: i < recSteps.length - 1 ? "0.3rem" : 0 }}>
                      {step}
                    </li>
                  ))}
                </ol>
              ) : (
                <span>{getRecommendedDirection(data.finding)}</span>
              )}
            </DetailBlock>
          </DetailPanel>
        </div>

        {/* Evidence thumbnails */}
        {data.finding.evidence.length > 0 && (
          <div className="evidence-media" style={{ marginTop: "1rem" }}>
            <h3
              style={{
                fontSize: "var(--text-md)",
                fontWeight: 600,
                marginBottom: "0.625rem",
                color: "var(--text-primary)",
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
              }}
            >
              Evidence
              <span style={{ fontSize: "var(--text-xs)", fontWeight: 400, color: "var(--text-muted)" }}>
                click to enlarge
              </span>
            </h3>
            <div
              style={{
                display: "flex",
                gap: "0.75rem",
                flexWrap: "wrap",
              }}
            >
              {data.finding.evidence.map((ev, index) => (
                <div
                  key={index}
                  className="evidence-thumb"
                  onClick={() => setLightboxEvidence(ev)}
                  style={{
                    width: "180px",
                    height: "120px",
                    borderRadius: "var(--radius-sm)",
                    overflow: "hidden",
                    boxShadow: "var(--shadow-sm)",
                    position: "relative",
                    border: "1px solid var(--border-subtle)",
                  }}
                >
                  {ev.type === "image" ? (
                    <img
                      src={ev.url}
                      alt={ev.caption || "Evidence"}
                      style={{ width: "100%", height: "100%", objectFit: "cover" }}
                      onError={(e) => {
                        (e.target as HTMLImageElement).src =
                          "https://via.placeholder.com/180x120?text=Preview";
                      }}
                    />
                  ) : (
                    <div
                      style={{
                        width: "100%",
                        height: "100%",
                        background: "var(--surface-sunken)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "var(--text-sm)",
                        color: "var(--text-muted)",
                      }}
                    >
                      ▶ Video
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <EvidenceLightbox
        evidence={lightboxEvidence}
        onClose={() => setLightboxEvidence(null)}
      />
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

function getFindingWhatsHappening(finding: EvidenceSlideData["finding"]): string {
  return finding.whatsHappening || finding.description || "";
}

function getRecommendedDirection(finding: EvidenceSlideData["finding"]): string {
  return finding.recommendedDirection || finding.recommendation || "";
}
