import React, { useEffect, useRef } from "react";
import { FinalVerdictSlideData } from "../../types";
import { usePrint } from "../../context/PrintContext";
import { gsap } from "gsap";
import { CheckCircle, XCircle, ArrowRight, ShieldAlert, Sparkles } from "lucide-react";

interface FinalVerdictSlideProps {
  data: FinalVerdictSlideData;
  slideIndex: number;
}

export default function FinalVerdictSlide({
  data,
  slideIndex,
}: FinalVerdictSlideProps) {
  const slideRef = useRef<HTMLDivElement>(null);
  const { isPrintMode, prefersReducedMotion } = usePrint();

  useEffect(() => {
    if (isPrintMode || prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.from(".verdict-header", {
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: "power3.out",
      });
      gsap.from(".verdict-summary", {
        opacity: 0,
        y: 30,
        duration: 0.8,
        delay: 0.2,
        ease: "power3.out",
      });
      gsap.from(".verdict-callout", {
        opacity: 0,
        y: 20,
        duration: 0.6,
        delay: 0.35,
        stagger: 0.1,
        ease: "power3.out",
      });
      gsap.from(".verdict-list-item", {
        opacity: 0,
        x: -30,
        duration: 0.6,
        delay: 0.5,
        stagger: 0.05,
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
      className="final-verdict-slide"
      style={{
        height: "100%",
        overflowY: "auto",
        display: "flex",
        flexDirection: "column",
        padding: "4rem",
        background: "linear-gradient(135deg, #1e293b 0%, #334155 100%)",
        color: "white",
      }}
    >
      {/* Header: title + score (score as secondary, not hero-sized) */}
      <div
        className="verdict-header"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "1.5rem",
        }}
      >
        <h2
          style={{
            fontSize: "2.5rem",
            fontWeight: "bold",
          }}
        >
          Final Verdict
        </h2>
        <div
          style={{
            fontSize: "2.5rem",
            fontWeight: "bold",
            color: getScoreColor(data.overallScore),
            textShadow: "0 2px 10px rgba(0,0,0,0.3)",
          }}
        >
          {data.overallScore}/10
        </div>
      </div>

      <p
        className="verdict-summary"
        style={{
          fontSize: "1.15rem",
          lineHeight: 1.7,
          maxWidth: "850px",
          marginBottom: "1.5rem",
          opacity: 0.95,
        }}
      >
        {data.summary}
      </p>

      {/* Risk / Opportunity callouts */}
      {(data.topRisk || data.topOpportunity) && (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: data.topRisk && data.topOpportunity ? "1fr 1fr" : "1fr",
            gap: "1rem",
            marginBottom: "1.5rem",
          }}
        >
          {data.topRisk && (
            <div
              className="verdict-callout"
              style={{
                background: "rgba(239, 68, 68, 0.15)",
                border: "1px solid rgba(239, 68, 68, 0.3)",
                borderRadius: "0.75rem",
                padding: "1rem 1.25rem",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  marginBottom: "0.4rem",
                  fontSize: "0.8rem",
                  fontWeight: "bold",
                  color: "#fca5a5",
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                }}
              >
                <ShieldAlert size={16} />
                Top Risk
              </div>
              <div style={{ fontSize: "0.95rem", lineHeight: 1.5, opacity: 0.9 }}>
                {data.topRisk}
              </div>
            </div>
          )}
          {data.topOpportunity && (
            <div
              className="verdict-callout"
              style={{
                background: "rgba(16, 185, 129, 0.15)",
                border: "1px solid rgba(16, 185, 129, 0.3)",
                borderRadius: "0.75rem",
                padding: "1rem 1.25rem",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  marginBottom: "0.4rem",
                  fontSize: "0.8rem",
                  fontWeight: "bold",
                  color: "#6ee7b7",
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                }}
              >
                <Sparkles size={16} />
                Top Opportunity
              </div>
              <div style={{ fontSize: "0.95rem", lineHeight: 1.5, opacity: 0.9 }}>
                {data.topOpportunity}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Strengths / Weaknesses */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "1.5rem",
          marginBottom: "1.5rem",
        }}
      >
        <div>
          <h3
            style={{
              fontSize: "1.25rem",
              fontWeight: "bold",
              marginBottom: "1rem",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
            }}
          >
            <CheckCircle size={20} color="#10b981" />
            Strengths
          </h3>
          <ul style={{ listStyle: "none", padding: 0 }}>
            {data.strengths.map((strength, index) => (
              <li
                key={index}
                className="verdict-list-item"
                style={{
                  padding: "0.5rem 0",
                  borderBottom: "1px solid rgba(255,255,255,0.08)",
                  fontSize: "0.95rem",
                  lineHeight: 1.5,
                }}
              >
                {strength}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3
            style={{
              fontSize: "1.25rem",
              fontWeight: "bold",
              marginBottom: "1rem",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
            }}
          >
            <XCircle size={20} color="#ef4444" />
            Areas for Improvement
          </h3>
          <ul style={{ listStyle: "none", padding: 0 }}>
            {data.weaknesses.map((weakness, index) => (
              <li
                key={index}
                className="verdict-list-item"
                style={{
                  padding: "0.5rem 0",
                  borderBottom: "1px solid rgba(255,255,255,0.08)",
                  fontSize: "0.95rem",
                  lineHeight: 1.5,
                }}
              >
                {weakness}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Next Steps */}
      <div
        style={{
          background: "rgba(255, 255, 255, 0.08)",
          backdropFilter: "blur(10px)",
          padding: "1.25rem 1.5rem",
          borderRadius: "0.75rem",
          border: "1px solid rgba(255, 255, 255, 0.15)",
        }}
      >
        <h3
          style={{
            fontSize: "1.25rem",
            fontWeight: "bold",
            marginBottom: "0.75rem",
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
          }}
        >
          <ArrowRight size={20} />
          Recommended Next Steps
        </h3>
        <ul style={{ listStyle: "none", padding: 0, display: "flex", flexDirection: "column", gap: "0.35rem" }}>
          {data.nextSteps.map((step, index) => (
            <li
              key={index}
              className="verdict-list-item"
              style={{
                padding: "0.35rem 0",
                fontSize: "0.95rem",
                display: "flex",
                alignItems: "baseline",
                gap: "0.5rem",
              }}
            >
              <span
                style={{
                  background: "rgba(255,255,255,0.2)",
                  borderRadius: "50%",
                  width: "1.4rem",
                  height: "1.4rem",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "0.75rem",
                  fontWeight: "bold",
                  flexShrink: 0,
                }}
              >
                {index + 1}
              </span>
              {step}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
