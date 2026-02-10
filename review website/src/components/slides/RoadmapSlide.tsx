import React, { useEffect, useRef } from "react";
import { RoadmapSlideData } from "../../types";
import { usePrint } from "../../context/PrintContext";
import { gsap } from "gsap";
import DetailPanel, { DetailBlock } from "../DetailPanel";

interface RoadmapSlideProps {
  data: RoadmapSlideData;
  slideIndex: number;
}

export default function RoadmapSlide({
  data,
  slideIndex,
}: RoadmapSlideProps) {
  const slideRef = useRef<HTMLDivElement>(null);
  const { isPrintMode, prefersReducedMotion } = usePrint();

  useEffect(() => {
    if (isPrintMode || prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.from(".roadmap-item", {
        opacity: 0,
        y: 30,
        duration: 0.6,
        stagger: 0.1,
        ease: "power3.out",
      });
    }, slideRef);

    return () => ctx.revert();
  }, [slideIndex, isPrintMode, prefersReducedMotion]);

  const getPriorityColor = (
    priority: "critical" | "high" | "medium" | "low"
  ) => {
    switch (priority) {
      case "critical":
        return "#ef4444";
      case "high":
        return "#f59e0b";
      case "medium":
        return "#3b82f6";
      case "low":
        return "#6b7280";
      default:
        return "#6b7280";
    }
  };

  const justifications = data.justifications || {};

  // Resolve dependency IDs to titles
  const itemTitleMap: Record<string, string> = {};
  data.items.forEach((item) => {
    itemTitleMap[item.id] = item.title;
  });

  return (
    <div
      ref={slideRef}
      className="roadmap-slide"
      style={{
        height: "100%",
        overflowY: "auto",
        padding: "4rem",
        background: "#f9fafb",
      }}
    >
      <h2
        style={{
          fontSize: "2.5rem",
          fontWeight: "bold",
          marginBottom: "0.5rem",
          color: "#1f2937",
        }}
      >
        Prioritized Roadmap
      </h2>
      <p
        style={{
          fontSize: "1rem",
          color: "#6b7280",
          marginBottom: "2rem",
          maxWidth: "700px",
          lineHeight: 1.5,
        }}
      >
        Each item below is prioritized by impact-to-effort ratio. Expand for justification and detail.
      </p>

      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        {data.items.map((item) => {
          const justification = justifications[item.id];
          const hasDetail = !!(
            justification?.rationale ||
            (justification?.findingTitles && justification.findingTitles.length > 0) ||
            item.timeline ||
            (item.dependencies && item.dependencies.length > 0)
          );

          return (
            <div
              key={item.id}
              className="roadmap-item"
              style={{
                background: "white",
                padding: "1.25rem 1.5rem",
                borderRadius: "0.5rem",
                borderLeft: `6px solid ${getPriorityColor(item.priority)}`,
                boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
              }}
            >
              {/* Layer 1 — Story: title + priority + first sentence */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "start",
                  marginBottom: "0.35rem",
                }}
              >
                <h3
                  style={{
                    fontSize: "1.35rem",
                    fontWeight: "bold",
                    color: "#1f2937",
                    flex: 1,
                  }}
                >
                  {item.title}
                </h3>
                <div
                  style={{
                    background: getPriorityColor(item.priority),
                    color: "white",
                    padding: "0.3rem 0.75rem",
                    borderRadius: "0.5rem",
                    fontSize: "0.75rem",
                    fontWeight: "bold",
                    textTransform: "uppercase",
                    flexShrink: 0,
                    marginLeft: "1rem",
                  }}
                >
                  {item.priority}
                </div>
              </div>

              <p
                style={{
                  fontSize: "0.95rem",
                  lineHeight: 1.5,
                  color: "#6b7280",
                  marginBottom: "0.5rem",
                }}
              >
                {item.description.split(".")[0]}.
              </p>

              {/* Layer 2 — Explain: full detail behind toggle */}
              {hasDetail && (
                <DetailPanel label="Why this priority">
                  {item.description.split(".").length > 1 && (
                    <DetailBlock title="Full description">
                      {item.description}
                    </DetailBlock>
                  )}
                  {justification && justification.findingTitles.length > 0 && (
                    <DetailBlock title="Based on these findings">
                      {justification.findingTitles.join("; ")}
                    </DetailBlock>
                  )}
                  {justification?.rationale && (
                    <DetailBlock title="Priority rationale">
                      {justification.rationale}
                    </DetailBlock>
                  )}
                  {(item.timeline || (item.dependencies && item.dependencies.length > 0)) && (
                    <DetailBlock title="Scheduling">
                      <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
                        {item.timeline && (
                          <span
                            style={{
                              background: "#f3f4f6",
                              padding: "0.2rem 0.6rem",
                              borderRadius: "0.375rem",
                              fontSize: "0.8rem",
                            }}
                          >
                            Timeline: {item.timeline}
                          </span>
                        )}
                        {item.dependencies && item.dependencies.length > 0 && (
                          <span
                            style={{
                              background: "#f3f4f6",
                              padding: "0.2rem 0.6rem",
                              borderRadius: "0.375rem",
                              fontSize: "0.8rem",
                            }}
                          >
                            Depends on:{" "}
                            {item.dependencies
                              .map((dep) => itemTitleMap[dep] || dep)
                              .join(", ")}
                          </span>
                        )}
                      </div>
                    </DetailBlock>
                  )}
                </DetailPanel>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
