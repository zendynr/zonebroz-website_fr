import React, { useEffect, useMemo, useRef, useState } from "react";
import { ScoreBreakdownSlideData } from "../../types";
import { usePrint } from "../../context/PrintContext";
import { gsap } from "gsap";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import AnalysisOverlay from "../AnalysisOverlay";

interface ScoreBreakdownSlideProps {
  data: ScoreBreakdownSlideData;
  slideIndex: number;
}

export default function ScoreBreakdownSlide({
  data,
  slideIndex,
}: ScoreBreakdownSlideProps) {
  const slideRef = useRef<HTMLDivElement>(null);
  const { isPrintMode, prefersReducedMotion } = usePrint();
  const [selectedCategory, setSelectedCategory] = useState(
    data.scores[0]?.category || ""
  );
  const [showFullAnalysis, setShowFullAnalysis] = useState(false);

  useEffect(() => {
    if (isPrintMode || prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.from(".score-chart", {
        opacity: 0,
        y: 50,
        duration: 1,
        ease: "power3.out",
      });
      gsap.from(".score-annotation", {
        opacity: 0,
        y: 20,
        duration: 0.6,
        delay: 0.5,
        stagger: 0.1,
        ease: "power3.out",
      });
    }, slideRef);

    return () => ctx.revert();
  }, [slideIndex, isPrintMode, prefersReducedMotion]);

  const chartData = useMemo(
    () =>
      data.scores.map((score) => ({
        name: formatCategoryName(score.category),
        score: score.score,
        category: score.category,
      })),
    [data.scores]
  );

  useEffect(() => {
    if (!data.scores.find((score) => score.category === selectedCategory)) {
      setSelectedCategory(data.scores[0]?.category || "");
    }
  }, [data.scores, selectedCategory]);

  const getColor = (score: number) => {
    if (score >= 8) return "#10b981";
    if (score >= 6) return "#f59e0b";
    return "#ef4444";
  };

  const strengths = data.scores
    .filter((s) => s.score >= 7.5)
    .sort((a, b) => b.score - a.score)
    .slice(0, 3);
  const concerns = data.scores
    .filter((s) => s.score < 6.5)
    .sort((a, b) => a.score - b.score)
    .slice(0, 3);

  const avgScore =
    data.scores.reduce((sum, s) => sum + s.score, 0) / data.scores.length;
  const aboveAvg = data.scores.filter((s) => s.score >= avgScore).length;

  const selectedScore = data.scores.find(
    (score) => score.category === selectedCategory
  );
  const selectedAnalysisSections =
    selectedScore?.analysisSections
      ?.filter((section) => section.content.trim())
      .map((section) => ({
        title: getScoreSectionLabel(section.type),
        content: section.content.trim(),
      })) || [];
  const strengthsList = parseBulletLines(selectedScore?.strengths || "");
  const weaknessesList = parseBulletLines(selectedScore?.weaknesses || "");

  return (
    <div
      ref={slideRef}
      className="score-breakdown-slide"
      style={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        padding: "4rem",
        background: "#f9fafb",
      }}
    >
      {/* Layer 1 — Story: headline + annotation + chart */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "1rem" }}>
        <h2
          style={{
            fontSize: "2.5rem",
            fontWeight: "bold",
            color: "#1f2937",
          }}
        >
          Score Breakdown
        </h2>
        <span style={{ fontSize: "0.95rem", color: "#6b7280" }}>
          {aboveAvg} of {data.scores.length} categories above average ({avgScore.toFixed(1)})
        </span>
      </div>

      <p
        className="score-annotation"
        style={{
          fontSize: "1.05rem",
          color: "#4b5563",
          lineHeight: 1.6,
          marginBottom: "1rem",
        }}
      >
        {strengths.length > 0 && concerns.length > 0
          ? `Strongest in ${strengths.map((s) => formatCategoryName(s.category)).join(", ")}. Primary gaps in ${concerns.map((s) => formatCategoryName(s.category)).join(", ")}.`
          : strengths.length > 0
          ? `Consistently strong performance led by ${strengths.map((s) => formatCategoryName(s.category)).join(", ")}.`
          : `Multiple areas need attention \u2014 see the findings for prioritized remediation.`}
      </p>

      <div className="score-chart" style={{ flex: 1, minHeight: 0 }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            layout="vertical"
            margin={{ top: 10, right: 30, left: 150, bottom: 10 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis type="number" domain={[0, 10]} />
            <YAxis
              dataKey="name"
              type="category"
              width={140}
              tick={{ fontSize: 13 }}
            />
            <Tooltip />
            <Bar
              dataKey="score"
              radius={[0, 8, 8, 0]}
              onClick={(_, index) => {
                const selected = chartData[index];
                if (selected) setSelectedCategory(selected.category);
              }}
              style={{ cursor: "pointer" }}
            >
              {chartData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={getColor(entry.score)}
                  stroke={selectedCategory === entry.category ? "#111827" : "none"}
                  strokeWidth={selectedCategory === entry.category ? 2 : 0}
                  fillOpacity={selectedCategory === entry.category ? 1 : 0.6}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {selectedScore && (
        <div
          style={{
            marginTop: "1rem",
            background: "#ffffff",
            border: "1px solid #e5e7eb",
            borderRadius: "0.65rem",
            padding: "1rem 1.1rem",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              gap: "1rem",
              marginBottom: "0.75rem",
              alignItems: "center",
            }}
          >
            <h3 style={{ margin: 0, fontSize: "1.05rem", color: "#1f2937" }}>
              {formatCategoryName(selectedScore.category)} ({selectedScore.score}/10)
            </h3>
            <span style={{ fontSize: "0.8rem", color: "#6b7280" }}>
              Select a bar to compare categories
            </span>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "0.8rem" }}>
            <div>
              <div style={sectionTitleStyle}>What's working well</div>
              {strengthsList.length > 0 ? (
                <ul style={bulletListStyle}>
                  {strengthsList.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              ) : (
                <p style={mutedTextStyle}>No strengths added.</p>
              )}
            </div>
            <div>
              <div style={sectionTitleStyle}>What's not working well</div>
              {weaknessesList.length > 0 ? (
                <ul style={bulletListStyle}>
                  {weaknessesList.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              ) : (
                <p style={mutedTextStyle}>No weaknesses added.</p>
              )}
            </div>
            <div>
              <div style={sectionTitleStyle}>Why this score</div>
              <p style={{ ...mutedTextStyle, color: "#374151" }}>
                {selectedScore.scoreRationale?.trim() ||
                  selectedScore.notes?.trim() ||
                  "No rationale added."}
              </p>
            </div>
          </div>
          {selectedAnalysisSections.length > 0 && (
            <>
              <div style={{ borderTop: "1px solid #e5e7eb", margin: "0.85rem 0 0.65rem 0" }} />
              <button
                type="button"
                onClick={() => setShowFullAnalysis(true)}
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
      )}
      <AnalysisOverlay
        open={showFullAnalysis}
        onClose={() => setShowFullAnalysis(false)}
        title={`${selectedScore ? formatCategoryName(selectedScore.category) : "Score"} Full Analysis`}
        sections={selectedAnalysisSections}
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

function parseBulletLines(value: string): string[] {
  return value
    .split("\n")
    .map((line) => line.replace(/^[\s\-*]+/, "").trim())
    .filter(Boolean);
}

function getScoreSectionLabel(type: string): string {
  const labels: Record<string, string> = {
    contextSummary: "Context / Summary",
    observedPatterns: "Observed Patterns",
    evidenceExamples: "Evidence / Examples",
    whyItMatters: "Why It Matters",
    edgeCasesNuance: "Edge Cases / Nuance",
    additionalNotes: "Additional Notes",
  };
  return labels[type] || "Additional Notes";
}

const sectionTitleStyle: React.CSSProperties = {
  fontSize: "0.76rem",
  textTransform: "uppercase",
  letterSpacing: "0.04em",
  color: "#6b7280",
  fontWeight: 700,
  marginBottom: "0.35rem",
};

const bulletListStyle: React.CSSProperties = {
  margin: 0,
  paddingLeft: "1.15rem",
  color: "#374151",
  fontSize: "0.92rem",
  lineHeight: 1.5,
};

const mutedTextStyle: React.CSSProperties = {
  margin: 0,
  color: "#6b7280",
  fontSize: "0.92rem",
  lineHeight: 1.5,
};
