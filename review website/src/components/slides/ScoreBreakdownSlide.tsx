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
import { ChevronRight, TrendingUp, TrendingDown, FileText } from "lucide-react";

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
      gsap.from(".score-detail-panel", {
        opacity: 0,
        x: 30,
        duration: 0.8,
        delay: 0.3,
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
    if (score >= 8) return "var(--accent-success)";
    if (score >= 6) return "var(--accent-warning)";
    return "var(--accent-danger)";
  };

  const getScoreLabel = (score: number) => {
    if (score >= 8) return "Strong";
    if (score >= 6) return "Moderate";
    if (score >= 4) return "Needs Work";
    return "Critical";
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
        media: section.media || [],
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
        padding: "3.5rem 4rem",
        background: "var(--surface-ground)",
      }}
    >
      <div style={{ maxWidth: "var(--canvas-max-width)", margin: "0 auto", width: "100%", display: "flex", flexDirection: "column", flex: 1, minHeight: 0 }}>
        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "0.75rem" }}>
          <h2
            style={{
              fontSize: "var(--text-3xl)",
              fontWeight: 700,
              color: "var(--text-primary)",
              letterSpacing: "var(--tracking-tight)",
            }}
          >
            Score Breakdown
          </h2>
          <span style={{ fontSize: "var(--text-sm)", color: "var(--text-muted)" }}>
            {aboveAvg} of {data.scores.length} categories above average ({avgScore.toFixed(1)})
          </span>
        </div>

        <p
          className="score-annotation"
          style={{
            fontSize: "var(--text-md)",
            color: "var(--text-secondary)",
            lineHeight: "var(--leading-relaxed)",
            marginBottom: "1.25rem",
            maxWidth: "720px",
          }}
        >
          {strengths.length > 0 && concerns.length > 0
            ? `Strongest in ${strengths.map((s) => formatCategoryName(s.category)).join(", ")}. Primary gaps in ${concerns.map((s) => formatCategoryName(s.category)).join(", ")}.`
            : strengths.length > 0
            ? `Consistently strong performance led by ${strengths.map((s) => formatCategoryName(s.category)).join(", ")}.`
            : `Multiple areas need attention \u2014 see the findings for prioritized remediation.`}
        </p>

        {/* Two-column layout: Chart (left) + Detail Panel (right) */}
        <div style={{ display: "flex", gap: "1.5rem", flex: 1, minHeight: 0 }}>
          {/* Chart — left side */}
          <div className="score-chart" style={{ flex: "1 1 58%", minHeight: 0, minWidth: 0 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={chartData}
                layout="vertical"
                margin={{ top: 10, right: 30, left: 150, bottom: 10 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border-subtle)" />
                <XAxis type="number" domain={[0, 10]} tick={{ fill: "var(--text-muted)", fontSize: 12 }} />
                <YAxis
                  dataKey="name"
                  type="category"
                  width={140}
                  tick={{ fontSize: 13, fill: "var(--text-secondary)" }}
                />
                <Tooltip
                  contentStyle={{
                    background: "var(--surface-card)",
                    border: "1px solid var(--border-default)",
                    borderRadius: "var(--radius-sm)",
                    boxShadow: "var(--shadow-md)",
                    fontSize: "var(--text-sm)",
                  }}
                />
                <Bar
                  dataKey="score"
                  radius={[0, 6, 6, 0]}
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
                      stroke={selectedCategory === entry.category ? "var(--text-primary)" : "none"}
                      strokeWidth={selectedCategory === entry.category ? 2 : 0}
                      fillOpacity={selectedCategory === entry.category ? 1 : 0.55}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Detail panel — right side */}
          {selectedScore && (
            <div
              className="score-detail-panel"
              style={{
                flex: "0 0 38%",
                background: "var(--surface-card)",
                border: "1px solid var(--border-default)",
                borderRadius: "var(--radius-lg)",
                boxShadow: "var(--shadow-sm)",
                display: "flex",
                flexDirection: "column",
                overflow: "hidden",
              }}
            >
              {/* Score header with colored accent */}
              <div
                style={{
                  padding: "1.25rem 1.5rem",
                  borderBottom: "1px solid var(--border-subtle)",
                  background: "var(--surface-sunken)",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0.5rem" }}>
                  <h3 style={{ margin: 0, fontSize: "var(--text-lg)", color: "var(--text-primary)", fontWeight: 600, letterSpacing: "var(--tracking-tight)" }}>
                    {formatCategoryName(selectedScore.category)}
                  </h3>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5rem",
                    }}
                  >
                    <span
                      style={{
                        fontSize: "var(--text-xs)",
                        fontWeight: 600,
                        color: getColor(selectedScore.score).replace("var(", "").replace(")", ""),
                        textTransform: "uppercase",
                        letterSpacing: "0.06em",
                      }}
                    >
                      {/* Use inline color */}
                    </span>
                  </div>
                </div>
                {/* Score display */}
                <div style={{ display: "flex", alignItems: "baseline", gap: "0.625rem" }}>
                  <span
                    style={{
                      fontSize: "2.5rem",
                      fontWeight: 700,
                      color: "var(--text-primary)",
                      lineHeight: 1,
                      letterSpacing: "-0.02em",
                    }}
                  >
                    {selectedScore.score}
                  </span>
                  <span style={{ fontSize: "var(--text-md)", color: "var(--text-muted)", fontWeight: 400 }}>/10</span>
                  <span
                    style={{
                      marginLeft: "auto",
                      fontSize: "var(--text-xs)",
                      fontWeight: 600,
                      padding: "0.2rem 0.6rem",
                      borderRadius: "var(--radius-full)",
                      background: selectedScore.score >= 8 ? "var(--accent-success-soft)" : selectedScore.score >= 6 ? "var(--accent-warning-soft)" : "var(--accent-danger-soft)",
                      color: selectedScore.score >= 8 ? "var(--accent-success-text)" : selectedScore.score >= 6 ? "var(--accent-warning-text)" : "var(--accent-danger-text)",
                      textTransform: "uppercase",
                      letterSpacing: "0.04em",
                    }}
                  >
                    {getScoreLabel(selectedScore.score)}
                  </span>
                </div>
                {/* Score bar */}
                <div style={{ marginTop: "0.75rem", height: "4px", borderRadius: "2px", background: "var(--border-default)", overflow: "hidden" }}>
                  <div
                    style={{
                      height: "100%",
                      width: `${(selectedScore.score / 10) * 100}%`,
                      borderRadius: "2px",
                      background: getColor(selectedScore.score),
                      transition: "width 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
                    }}
                  />
                </div>
              </div>

              {/* Scrollable details area */}
              <div
                style={{
                  flex: 1,
                  overflowY: "auto",
                  padding: "1.25rem 1.5rem",
                  display: "flex",
                  flexDirection: "column",
                  gap: "1.125rem",
                }}
              >
                {/* Strengths */}
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", marginBottom: "0.5rem" }}>
                    <TrendingUp size={14} color="var(--accent-success)" />
                    <div style={panelSectionTitleStyle}>What's working well</div>
                  </div>
                  {strengthsList.length > 0 ? (
                    <ul style={panelBulletListStyle}>
                      {strengthsList.map((item) => (
                        <li key={item} style={{ marginBottom: "0.25rem" }}>{item}</li>
                      ))}
                    </ul>
                  ) : (
                    <p style={panelMutedTextStyle}>No strengths added.</p>
                  )}
                </div>

                {/* Weaknesses */}
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", marginBottom: "0.5rem" }}>
                    <TrendingDown size={14} color="var(--accent-danger)" />
                    <div style={panelSectionTitleStyle}>What's not working well</div>
                  </div>
                  {weaknessesList.length > 0 ? (
                    <ul style={panelBulletListStyle}>
                      {weaknessesList.map((item) => (
                        <li key={item} style={{ marginBottom: "0.25rem" }}>{item}</li>
                      ))}
                    </ul>
                  ) : (
                    <p style={panelMutedTextStyle}>No weaknesses added.</p>
                  )}
                </div>

                {/* Rationale */}
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", marginBottom: "0.5rem" }}>
                    <FileText size={14} color="var(--text-muted)" />
                    <div style={panelSectionTitleStyle}>Why this score</div>
                  </div>
                  <p style={{ ...panelMutedTextStyle, color: "var(--text-secondary)" }}>
                    {selectedScore.scoreRationale?.trim() ||
                      selectedScore.notes?.trim() ||
                      "No rationale added."}
                  </p>
                </div>

                {/* Analysis link */}
                {selectedAnalysisSections.length > 0 && (
                  <button
                    type="button"
                    onClick={() => setShowFullAnalysis(true)}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.35rem",
                      border: "1px solid var(--border-default)",
                      background: "var(--surface-sunken)",
                      color: "var(--accent-primary)",
                      cursor: "pointer",
                      fontSize: "var(--text-sm)",
                      fontWeight: 500,
                      padding: "0.5rem 0.875rem",
                      borderRadius: "var(--radius-sm)",
                      transition: "all var(--duration-fast) ease",
                      marginTop: "auto",
                      width: "100%",
                      justifyContent: "center",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = "var(--accent-primary-soft)";
                      e.currentTarget.style.borderColor = "var(--accent-primary)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "var(--surface-sunken)";
                      e.currentTarget.style.borderColor = "var(--border-default)";
                    }}
                  >
                    View full analysis <ChevronRight size={14} />
                  </button>
                )}
              </div>

              {/* Hint footer */}
              <div
                style={{
                  padding: "0.625rem 1.5rem",
                  borderTop: "1px solid var(--border-subtle)",
                  fontSize: "var(--text-xs)",
                  color: "var(--text-muted)",
                  textAlign: "center",
                }}
              >
                Click a bar to explore a category
              </div>
            </div>
          )}
        </div>
        <AnalysisOverlay
          open={showFullAnalysis}
          onClose={() => setShowFullAnalysis(false)}
          title={`${selectedScore ? formatCategoryName(selectedScore.category) : "Score"} Full Analysis`}
          sections={selectedAnalysisSections}
        />
      </div>
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

const panelSectionTitleStyle: React.CSSProperties = {
  fontSize: "var(--text-xs)",
  textTransform: "uppercase",
  letterSpacing: "0.06em",
  color: "var(--text-muted)",
  fontWeight: 600,
  lineHeight: 1.4,
};

const panelBulletListStyle: React.CSSProperties = {
  margin: 0,
  paddingLeft: "1.1rem",
  color: "var(--text-secondary)",
  fontSize: "var(--text-sm)",
  lineHeight: 1.6,
};

const panelMutedTextStyle: React.CSSProperties = {
  margin: 0,
  color: "var(--text-muted)",
  fontSize: "var(--text-sm)",
  lineHeight: 1.6,
};
