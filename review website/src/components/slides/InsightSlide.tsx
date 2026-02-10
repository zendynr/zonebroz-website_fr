import React, { useEffect, useRef } from "react";
import { InsightSlideData } from "../../types";
import { usePrint } from "../../context/PrintContext";
import { gsap } from "gsap";
import { TrendingUp } from "lucide-react";
import DetailPanel, { DetailBlock } from "../DetailPanel";

interface InsightSlideProps {
  data: InsightSlideData;
  slideIndex: number;
}

export default function InsightSlide({
  data,
  slideIndex,
}: InsightSlideProps) {
  const slideRef = useRef<HTMLDivElement>(null);
  const { isPrintMode, prefersReducedMotion } = usePrint();

  useEffect(() => {
    if (isPrintMode || prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.from(".insight-title", {
        opacity: 0,
        x: -50,
        duration: 0.8,
        ease: "power3.out",
      });
      gsap.from(".insight-content", {
        opacity: 0,
        y: 30,
        duration: 0.8,
        delay: 0.3,
        ease: "power3.out",
      });
    }, slideRef);

    return () => ctx.revert();
  }, [slideIndex, isPrintMode, prefersReducedMotion]);

  const getScoreColor = (score: number) => {
    if (score >= 8) return "#10b981";
    if (score >= 6) return "#f59e0b";
    return "#ef4444";
  };

  const hasDepth = !!(data.contrastNote || data.relatedFinding || data.decisionFrame);

  return (
    <div
      ref={slideRef}
      className="insight-slide"
      style={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        padding: "4rem",
        background: "white",
        justifyContent: "center",
        maxWidth: "1200px",
        margin: "0 auto",
        width: "100%",
      }}
    >
      {/* Layer 1 — Story: title + score + headline note */}
      <div style={{ display: "flex", alignItems: "center", gap: "1.5rem", marginBottom: "1.5rem" }}>
        <h2
          className="insight-title"
          style={{
            fontSize: "3rem",
            fontWeight: "bold",
            color: "#1f2937",
            borderLeft: "6px solid #3b82f6",
            paddingLeft: "1.5rem",
            flex: 1,
          }}
        >
          {data.title}
        </h2>
        {data.scoreValue != null && (
          <div
            className="insight-title"
            style={{
              fontSize: "2.5rem",
              fontWeight: "bold",
              color: getScoreColor(data.scoreValue),
              flexShrink: 0,
            }}
          >
            {data.scoreValue}/10
          </div>
        )}
      </div>

      <div
        className="insight-content"
        style={{
          fontSize: "1.35rem",
          lineHeight: 1.7,
          color: "#4b5563",
          marginBottom: "1.5rem",
          display: "flex",
          alignItems: "flex-start",
          gap: "0.75rem",
        }}
      >
        <TrendingUp
          size={22}
          color="#10b981"
          style={{ flexShrink: 0, marginTop: "0.3rem" }}
        />
        <span>{data.content}</span>
      </div>

      {/* Layer 2 — Explain: contrast, finding, decision behind toggle */}
      {hasDepth && (
        <DetailPanel label="Why this matters">
          {data.contrastNote && (
            <DetailBlock title="Contrasting weakness">
              {data.contrastCategory && data.contrastScore != null && (
                <div style={{ fontSize: "0.8rem", color: "#991b1b", marginBottom: "0.2rem" }}>
                  {data.contrastCategory}: {data.contrastScore}/10
                </div>
              )}
              {data.contrastNote}
            </DetailBlock>
          )}
          {data.relatedFinding && (
            <DetailBlock title={`Related finding — Impact ${data.relatedFinding.impact}/5`}>
              <div style={{ fontWeight: 600, marginBottom: "0.15rem" }}>
                {data.relatedFinding.title}
              </div>
              {data.relatedFinding.description.length > 200
                ? data.relatedFinding.description.substring(0, 200) + "..."
                : data.relatedFinding.description}
            </DetailBlock>
          )}
          {data.decisionFrame && (
            <DetailBlock title="Strategic takeaway">
              {data.decisionFrame}
            </DetailBlock>
          )}
        </DetailPanel>
      )}
    </div>
  );
}
