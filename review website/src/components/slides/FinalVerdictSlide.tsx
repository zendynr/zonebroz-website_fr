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
    if (score >= 8) return "#5ec7a0";
    if (score >= 6) return "#e0b45c";
    return "#e07070";
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
        padding: "3.5rem 4rem",
        background: "linear-gradient(160deg, #1a1d28 0%, #252a3a 60%, #2c3044 100%)",
        color: "var(--text-on-dark)",
      }}
    >
      <div style={{ maxWidth: "var(--canvas-max-width)", margin: "0 auto", width: "100%" }}>
        {/* Header */}
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
              fontSize: "var(--text-3xl)",
              fontWeight: 700,
              letterSpacing: "var(--tracking-tight)",
            }}
          >
            Final Verdict
          </h2>
          <div
            style={{
              fontSize: "var(--text-3xl)",
              fontWeight: 700,
              color: getScoreColor(data.overallScore),
              lineHeight: 1,
              letterSpacing: "-0.02em",
            }}
          >
            {data.overallScore}
            <span style={{ fontSize: "0.45em", opacity: 0.5, fontWeight: 500 }}>/10</span>
          </div>
        </div>

        <p
          className="verdict-summary"
          style={{
            fontSize: "var(--text-lg)",
            lineHeight: "var(--leading-relaxed)",
            maxWidth: "780px",
            marginBottom: "1.75rem",
            color: "var(--text-on-dark-secondary)",
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
              gap: "0.875rem",
              marginBottom: "1.75rem",
            }}
          >
            {data.topRisk && (
              <div
                className="verdict-callout"
                style={{
                  background: "rgba(201, 65, 59, 0.1)",
                  border: "1px solid rgba(201, 65, 59, 0.2)",
                  borderRadius: "var(--radius-md)",
                  padding: "1rem 1.25rem",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    marginBottom: "0.4rem",
                    fontSize: "var(--text-xs)",
                    fontWeight: 600,
                    color: "#e07070",
                    textTransform: "uppercase",
                    letterSpacing: "var(--tracking-wider)",
                  }}
                >
                  <ShieldAlert size={15} />
                  Top Risk
                </div>
                <div style={{ fontSize: "var(--text-base)", lineHeight: "var(--leading-normal)", color: "var(--text-on-dark-secondary)" }}>
                  {data.topRisk}
                </div>
              </div>
            )}
            {data.topOpportunity && (
              <div
                className="verdict-callout"
                style={{
                  background: "rgba(94, 199, 160, 0.1)",
                  border: "1px solid rgba(94, 199, 160, 0.2)",
                  borderRadius: "var(--radius-md)",
                  padding: "1rem 1.25rem",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    marginBottom: "0.4rem",
                    fontSize: "var(--text-xs)",
                    fontWeight: 600,
                    color: "#5ec7a0",
                    textTransform: "uppercase",
                    letterSpacing: "var(--tracking-wider)",
                  }}
                >
                  <Sparkles size={15} />
                  Top Opportunity
                </div>
                <div style={{ fontSize: "var(--text-base)", lineHeight: "var(--leading-normal)", color: "var(--text-on-dark-secondary)" }}>
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
            marginBottom: "1.75rem",
          }}
        >
          <div>
            <h3
              style={{
                fontSize: "var(--text-lg)",
                fontWeight: 600,
                marginBottom: "0.875rem",
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
              }}
            >
              <CheckCircle size={18} color="#5ec7a0" />
              Strengths
            </h3>
            <ul style={{ listStyle: "none", padding: 0 }}>
              {data.strengths.map((strength, index) => (
                <li
                  key={index}
                  className="verdict-list-item"
                  style={{
                    padding: "0.5rem 0",
                    borderBottom: "1px solid rgba(255,255,255,0.06)",
                    fontSize: "var(--text-base)",
                    lineHeight: "var(--leading-normal)",
                    color: "var(--text-on-dark-secondary)",
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
                fontSize: "var(--text-lg)",
                fontWeight: 600,
                marginBottom: "0.875rem",
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
              }}
            >
              <XCircle size={18} color="#e07070" />
              Areas for Improvement
            </h3>
            <ul style={{ listStyle: "none", padding: 0 }}>
              {data.weaknesses.map((weakness, index) => (
                <li
                  key={index}
                  className="verdict-list-item"
                  style={{
                    padding: "0.5rem 0",
                    borderBottom: "1px solid rgba(255,255,255,0.06)",
                    fontSize: "var(--text-base)",
                    lineHeight: "var(--leading-normal)",
                    color: "var(--text-on-dark-secondary)",
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
            background: "rgba(255, 255, 255, 0.05)",
            backdropFilter: "blur(12px)",
            padding: "1.25rem 1.5rem",
            borderRadius: "var(--radius-md)",
            border: "1px solid rgba(255, 255, 255, 0.08)",
          }}
        >
          <h3
            style={{
              fontSize: "var(--text-lg)",
              fontWeight: 600,
              marginBottom: "0.75rem",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
            }}
          >
            <ArrowRight size={18} />
            Recommended Next Steps
          </h3>
          <ul style={{ listStyle: "none", padding: 0, display: "flex", flexDirection: "column", gap: "0.25rem" }}>
            {data.nextSteps.map((step, index) => (
              <li
                key={index}
                className="verdict-list-item"
                style={{
                  padding: "0.4rem 0",
                  fontSize: "var(--text-base)",
                  display: "flex",
                  alignItems: "baseline",
                  gap: "0.625rem",
                  color: "var(--text-on-dark-secondary)",
                }}
              >
                <span
                  style={{
                    background: "rgba(255,255,255,0.12)",
                    borderRadius: "50%",
                    width: "1.35rem",
                    height: "1.35rem",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "var(--text-xs)",
                    fontWeight: 600,
                    flexShrink: 0,
                    color: "var(--text-on-dark)",
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
    </div>
  );
}
