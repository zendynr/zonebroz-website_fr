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
  const urgencyColor =
    urgency >= 3.0 ? "#ef4444" : urgency >= 1.5 ? "#f59e0b" : "#3b82f6";

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

  // Split recommendation into high-level directions
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
        padding: "4rem",
        background: "#f9fafb",
        gap: "1.5rem",
      }}
    >
      <div className="evidence-finding">
        {/* Layer 1 — Story: badges + title + first sentence */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.75rem",
            marginBottom: "0.75rem",
            flexWrap: "wrap",
          }}
        >
          <span
            style={{
              background: urgencyColor,
              color: "white",
              padding: "0.35rem 0.75rem",
              borderRadius: "0.5rem",
              fontSize: "0.75rem",
              fontWeight: "bold",
            }}
          >
            Urgency: {urgency.toFixed(1)}
          </span>
          <span
            style={{
              background: "#e5e7eb",
              padding: "0.35rem 0.75rem",
              borderRadius: "0.5rem",
              fontSize: "0.75rem",
            }}
          >
            {formatCategoryName(data.finding.category)}
          </span>
        </div>

        <h2
          style={{
            fontSize: "2.25rem",
            fontWeight: "bold",
            marginBottom: "0.5rem",
            color: "#1f2937",
          }}
        >
          {data.finding.title}
        </h2>

        <p
          style={{
            fontSize: "1.05rem",
            lineHeight: 1.6,
            color: "#4b5563",
            marginBottom: "0.75rem",
          }}
        >
          {getLeadSentence(getFindingWhatsHappening(data.finding))}
        </p>

        {/* Layer 2 — Explain: full detail behind toggle */}
        <DetailPanel label="Why this matters">
          <DetailBlock title="Full context">
            {getFindingWhatsHappening(data.finding)}
          </DetailBlock>
          <DetailBlock title="If unaddressed">
            <span style={{ color: "#991b1b" }}>
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

      {/* Layer 3 — Proof: clickable thumbnails → lightbox */}
      {data.finding.evidence.length > 0 && (
        <div className="evidence-media">
          <h3
            style={{
              fontSize: "1.1rem",
              fontWeight: "bold",
              marginBottom: "0.5rem",
              color: "#1f2937",
            }}
          >
            Evidence
            <span style={{ fontSize: "0.8rem", fontWeight: "normal", color: "#9ca3af", marginLeft: "0.5rem" }}>
              click to enlarge
            </span>
          </h3>
          <div
            style={{
              display: "flex",
              gap: "1rem",
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
                  borderRadius: "0.5rem",
                  overflow: "hidden",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                  position: "relative",
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
                      background: "#e5e7eb",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "0.8rem",
                      color: "#6b7280",
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
