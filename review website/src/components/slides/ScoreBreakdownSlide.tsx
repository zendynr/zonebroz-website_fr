import React, { useEffect, useRef } from "react";
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
import DetailPanel, { DetailBlock } from "../DetailPanel";

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

  const chartData = data.scores.map((score) => ({
    name: formatCategoryName(score.category),
    score: score.score,
    fullName: formatCategoryName(score.category),
  }));

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

  // Scores that have notes for the detail panel
  const scoresWithNotes = data.scores.filter((s) => s.notes);

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
            <Bar dataKey="score" radius={[0, 8, 8, 0]}>
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={getColor(entry.score)} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Layer 2 — Explain: reviewer notes per category */}
      {scoresWithNotes.length > 0 && (
        <div className="score-annotation" style={{ marginTop: "1rem" }}>
          <DetailPanel label="Reviewer notes">
            {scoresWithNotes.map((s) => (
              <DetailBlock key={s.category} title={`${formatCategoryName(s.category)} (${s.score}/10)`}>
                {s.notes}
              </DetailBlock>
            ))}
          </DetailPanel>
        </div>
      )}
    </div>
  );
}

function formatCategoryName(category: string): string {
  return category
    .replace(/([A-Z])/g, " $1")
    .replace(/^./, (str) => str.toUpperCase())
    .trim();
}
