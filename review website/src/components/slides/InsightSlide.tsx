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
    if (score >= 8) return "var(--accent-success)";
    if (score >= 6) return "var(--accent-warning)";
    return "var(--accent-danger)";
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
        background: "var(--surface-raised)",
        justifyContent: "center",
        maxWidth: "var(--canvas-max-width)",
        margin: "0 auto",
        width: "100%",
      }}
    >
      {/* Title + score */}
      <div style={{ display: "flex", alignItems: "center", gap: "1.5rem", marginBottom: "1.5rem" }}>
        <h2
          className="insight-title"
          style={{
            fontSize: "clamp(2rem, 4vw, 2.75rem)",
            fontWeight: 700,
            color: "var(--text-primary)",
            borderLeft: "4px solid var(--accent-primary)",
            paddingLeft: "1.25rem",
            flex: 1,
            lineHeight: "var(--leading-tight)",
            letterSpacing: "var(--tracking-tight)",
          }}
        >
          {data.title}
        </h2>
        {data.scoreValue != null && (
          <div
            className="insight-title"
            style={{
              fontSize: "var(--text-4xl)",
              fontWeight: 700,
              color: getScoreColor(data.scoreValue),
              flexShrink: 0,
              lineHeight: 1,
              letterSpacing: "-0.02em",
            }}
          >
            {data.scoreValue}
            <span style={{ fontSize: "0.45em", opacity: 0.5, fontWeight: 500 }}>/10</span>
          </div>
        )}
      </div>

      <div
        className="insight-content"
        style={{
          fontSize: "var(--text-xl)",
          lineHeight: "var(--leading-relaxed)",
          color: "var(--text-secondary)",
          marginBottom: "1.5rem",
          display: "flex",
          alignItems: "flex-start",
          gap: "0.75rem",
        }}
      >
        <div
          style={{
            flexShrink: 0,
            marginTop: "0.2rem",
            width: "2rem",
            height: "2rem",
            borderRadius: "var(--radius-sm)",
            background: "var(--accent-success-soft)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <TrendingUp size={16} color="var(--accent-success)" />
        </div>
        <span>{data.content}</span>
      </div>

      {/* Explain panel */}
      {hasDepth && (
        <DetailPanel label="Why this matters">
          {data.contrastNote && (
            <DetailBlock title="Contrasting weakness">
              {data.contrastCategory && data.contrastScore != null && (
                <div style={{ fontSize: "var(--text-xs)", color: "var(--accent-danger-text)", marginBottom: "0.2rem", fontWeight: 500 }}>
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
