import React, { useEffect, useRef } from "react";
import { HeroSlideData } from "../../types";
import { usePrint } from "../../context/PrintContext";
import { gsap } from "gsap";
import { AlertTriangle, TrendingUp, TrendingDown } from "lucide-react";

interface HeroSlideProps {
  data: HeroSlideData;
  slideIndex: number;
}

export default function HeroSlide({ data, slideIndex }: HeroSlideProps) {
  const slideRef = useRef<HTMLDivElement>(null);
  const { isPrintMode, prefersReducedMotion } = usePrint();

  useEffect(() => {
    if (isPrintMode || prefersReducedMotion || slideIndex !== 0) return;

    const ctx = gsap.context(() => {
      gsap.from(".hero-title", {
        opacity: 0,
        y: 50,
        duration: 0.8,
        ease: "power3.out",
      });
      gsap.from(".hero-score", {
        opacity: 0,
        scale: 0.8,
        duration: 0.8,
        delay: 0.2,
        ease: "back.out(1.7)",
      });
      gsap.from(".hero-summary", {
        opacity: 0,
        y: 30,
        duration: 0.8,
        delay: 0.4,
        ease: "power3.out",
      });
      gsap.from(".hero-highlight", {
        opacity: 0,
        x: -30,
        duration: 0.6,
        delay: 0.6,
        stagger: 0.1,
        ease: "power3.out",
      });
      gsap.from(".hero-contrast", {
        opacity: 0,
        y: 20,
        duration: 0.6,
        delay: 0.9,
        stagger: 0.1,
        ease: "power3.out",
      });
    }, slideRef);

    return () => ctx.revert();
  }, [slideIndex, isPrintMode, prefersReducedMotion]);

  const getScoreColor = (score: number) => {
    if (score >= 8) return "#5ec7a0";
    if (score >= 6) return "#e0b45c";
    return "#e07070";
  };

  return (
    <div
      ref={slideRef}
      className="hero-slide"
      style={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "4rem 3rem",
        background: "linear-gradient(160deg, #2d3250 0%, #3b2f5c 40%, #4a3568 100%)",
        color: "white",
        textAlign: "center",
      }}
    >
      <p
        style={{
          fontSize: "var(--text-sm)",
          opacity: 0.55,
          marginBottom: "0.75rem",
          textTransform: "uppercase",
          letterSpacing: "0.18em",
          fontWeight: 500,
        }}
        className="hero-title"
      >
        Product Audit Report
      </p>

      <h1
        className="hero-title"
        style={{
          fontSize: "clamp(2.25rem, 5vw, 3.5rem)",
          fontWeight: 700,
          marginBottom: "1.25rem",
          lineHeight: 1.15,
          letterSpacing: "-0.02em",
          maxWidth: "800px",
        }}
      >
        {data.productName}
      </h1>

      <div
        className="hero-score"
        style={{
          fontSize: "clamp(3.5rem, 8vw, 5rem)",
          fontWeight: 700,
          marginBottom: "1.5rem",
          color: getScoreColor(data.overallScore),
          lineHeight: 1,
          letterSpacing: "-0.03em",
        }}
      >
        {data.overallScore}
        <span style={{ fontSize: "0.4em", opacity: 0.5, fontWeight: 500, marginLeft: "0.1em" }}>/10</span>
      </div>

      <p
        className="hero-summary"
        style={{
          fontSize: "var(--text-lg)",
          maxWidth: "680px",
          marginBottom: "2rem",
          lineHeight: "var(--leading-relaxed)",
          opacity: 0.88,
          fontWeight: 400,
        }}
      >
        {data.summary}
      </p>

      {/* Strength / Weakness contrast chips */}
      {(data.topStrength || data.topWeakness) && (
        <div
          style={{
            display: "flex",
            gap: "0.75rem",
            flexWrap: "wrap",
            justifyContent: "center",
            marginBottom: "1.5rem",
          }}
        >
          {data.topStrength && (
            <div
              className="hero-contrast"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                background: "rgba(94, 199, 160, 0.15)",
                border: "1px solid rgba(94, 199, 160, 0.3)",
                padding: "0.55rem 1.15rem",
                borderRadius: "var(--radius-full)",
                fontSize: "var(--text-sm)",
                fontWeight: 500,
              }}
            >
              <TrendingUp size={15} style={{ opacity: 0.8 }} />
              {data.topStrength}
            </div>
          )}
          {data.topWeakness && (
            <div
              className="hero-contrast"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                background: "rgba(224, 112, 112, 0.15)",
                border: "1px solid rgba(224, 112, 112, 0.3)",
                padding: "0.55rem 1.15rem",
                borderRadius: "var(--radius-full)",
                fontSize: "var(--text-sm)",
                fontWeight: 500,
              }}
            >
              <TrendingDown size={15} style={{ opacity: 0.8 }} />
              {data.topWeakness}
            </div>
          )}
        </div>
      )}

      {/* Key highlights */}
      <div
        style={{
          display: "flex",
          gap: "0.625rem",
          flexWrap: "wrap",
          justifyContent: "center",
          marginBottom: "1.5rem",
        }}
      >
        {data.keyHighlights.map((highlight, index) => (
          <div
            key={index}
            className="hero-highlight"
            style={{
              background: "rgba(255, 255, 255, 0.08)",
              backdropFilter: "blur(12px)",
              padding: "0.6rem 1.25rem",
              borderRadius: "var(--radius-full)",
              fontSize: "var(--text-sm)",
              border: "1px solid rgba(255, 255, 255, 0.12)",
              fontWeight: 450,
              letterSpacing: "0.01em",
            }}
          >
            {highlight}
          </div>
        ))}
      </div>

      {/* "What's next" cue */}
      {data.urgentCount != null && data.urgentCount > 0 && (
        <div
          className="hero-contrast"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            marginTop: "0.5rem",
            fontSize: "var(--text-sm)",
            opacity: 0.65,
            fontWeight: 450,
          }}
        >
          <AlertTriangle size={15} />
          Up next: {data.urgentCount} urgent finding{data.urgentCount > 1 ? "s" : ""} requiring
          immediate attention
        </div>
      )}
    </div>
  );
}
