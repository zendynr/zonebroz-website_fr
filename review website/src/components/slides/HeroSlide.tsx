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
    if (score >= 8) return "#10b981";
    if (score >= 6) return "#f59e0b";
    return "#ef4444";
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
        padding: "4rem",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        color: "white",
        textAlign: "center",
      }}
    >
      <h1
        className="hero-title"
        style={{
          fontSize: "3.5rem",
          fontWeight: "bold",
          marginBottom: "1rem",
          lineHeight: 1.2,
        }}
      >
        {data.productName}
      </h1>

      <p
        style={{
          fontSize: "1rem",
          opacity: 0.7,
          marginBottom: "1.5rem",
          textTransform: "uppercase",
          letterSpacing: "0.15em",
        }}
        className="hero-title"
      >
        Product Audit Report
      </p>

      <div
        className="hero-score"
        style={{
          fontSize: "5rem",
          fontWeight: "bold",
          marginBottom: "1.5rem",
          color: getScoreColor(data.overallScore),
          textShadow: "0 4px 20px rgba(0,0,0,0.3)",
        }}
      >
        {data.overallScore}/10
      </div>

      <p
        className="hero-summary"
        style={{
          fontSize: "1.25rem",
          maxWidth: "750px",
          marginBottom: "2rem",
          lineHeight: 1.6,
          opacity: 0.95,
        }}
      >
        {data.summary}
      </p>

      {/* Strength / Weakness contrast chips */}
      {(data.topStrength || data.topWeakness) && (
        <div
          style={{
            display: "flex",
            gap: "1rem",
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
                background: "rgba(16, 185, 129, 0.25)",
                border: "1px solid rgba(16, 185, 129, 0.5)",
                padding: "0.6rem 1.25rem",
                borderRadius: "2rem",
                fontSize: "0.95rem",
              }}
            >
              <TrendingUp size={16} />
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
                background: "rgba(239, 68, 68, 0.2)",
                border: "1px solid rgba(239, 68, 68, 0.4)",
                padding: "0.6rem 1.25rem",
                borderRadius: "2rem",
                fontSize: "0.95rem",
              }}
            >
              <TrendingDown size={16} />
              {data.topWeakness}
            </div>
          )}
        </div>
      )}

      {/* Key highlights */}
      <div
        style={{
          display: "flex",
          gap: "1rem",
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
              background: "rgba(255, 255, 255, 0.15)",
              backdropFilter: "blur(10px)",
              padding: "0.75rem 1.5rem",
              borderRadius: "2rem",
              fontSize: "0.95rem",
              border: "1px solid rgba(255, 255, 255, 0.25)",
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
            fontSize: "0.95rem",
            opacity: 0.85,
          }}
        >
          <AlertTriangle size={16} />
          Up next: {data.urgentCount} urgent finding{data.urgentCount > 1 ? "s" : ""} requiring
          immediate attention
        </div>
      )}
    </div>
  );
}
