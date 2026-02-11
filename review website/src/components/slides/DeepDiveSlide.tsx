import React, { useEffect, useRef, useState } from "react";
import { DeepDiveSlideData, Evidence } from "../../types";
import { usePrint } from "../../context/PrintContext";
import { gsap } from "gsap";
import { Layers } from "lucide-react";
import DetailPanel, { DetailBlock } from "../DetailPanel";
import EvidenceLightbox from "../EvidenceLightbox";

interface DeepDiveSlideProps {
  data: DeepDiveSlideData;
  slideIndex: number;
}

export default function DeepDiveSlide({
  data,
  slideIndex,
}: DeepDiveSlideProps) {
  const slideRef = useRef<HTMLDivElement>(null);
  const { isPrintMode, prefersReducedMotion } = usePrint();
  const [lightboxEvidence, setLightboxEvidence] = useState<Evidence | null>(null);

  useEffect(() => {
    if (isPrintMode || prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.from(".deepdive-section", {
        opacity: 0,
        y: 30,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out",
      });
    }, slideRef);

    return () => ctx.revert();
  }, [slideIndex, isPrintMode, prefersReducedMotion]);

  return (
    <div
      ref={slideRef}
      className="deepdive-slide"
      style={{
        height: "100%",
        overflowY: "auto",
        padding: "3.5rem 4rem",
        background: "var(--surface-ground)",
      }}
    >
      <div style={{ maxWidth: "var(--canvas-max-width)", margin: "0 auto" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.5rem" }}>
          <div
            style={{
              width: "2.5rem",
              height: "2.5rem",
              borderRadius: "var(--radius-md)",
              background: "var(--accent-primary-soft)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <Layers size={20} color="var(--accent-primary)" />
          </div>
          <h2
            style={{
              fontSize: "var(--text-3xl)",
              fontWeight: 700,
              color: "var(--text-primary)",
              letterSpacing: "var(--tracking-tight)",
            }}
          >
            {data.title}
          </h2>
        </div>

        <p style={{
          fontSize: "var(--text-md)",
          color: "var(--text-tertiary)",
          marginBottom: "2rem",
          maxWidth: "640px",
          lineHeight: "var(--leading-relaxed)",
          marginLeft: "3.25rem",
        }}>
          Individual findings rarely exist in isolation. Here are the cross-cutting patterns.
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          {data.sections.map((section, index) => (
            <div
              key={index}
              className="deepdive-section"
              style={{
                background: "var(--surface-card)",
                padding: "1.5rem",
                borderRadius: "var(--radius-md)",
                boxShadow: "var(--shadow-sm)",
                borderTop: "3px solid var(--accent-primary)",
                transition: "box-shadow var(--duration-normal) var(--ease-out)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = "var(--shadow-md)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = "var(--shadow-sm)";
              }}
            >
              <h3
                style={{
                  fontSize: "var(--text-xl)",
                  fontWeight: 600,
                  marginBottom: "0.5rem",
                  color: "var(--text-primary)",
                  letterSpacing: "var(--tracking-tight)",
                }}
              >
                {section.title}
              </h3>

              {section.patternInsight && (
                <p
                  style={{
                    fontSize: "var(--text-base)",
                    color: "var(--accent-primary)",
                    fontWeight: 500,
                    lineHeight: "var(--leading-normal)",
                    marginBottom: "0.75rem",
                    fontStyle: "italic",
                    opacity: 0.85,
                  }}
                >
                  {section.patternInsight}
                </p>
              )}

              <DetailPanel label="Full analysis">
                <DetailBlock title="What's happening">
                  {section.content}
                </DetailBlock>
                {section.connectedFindingTitles && section.connectedFindingTitles.length > 0 && (
                  <DetailBlock title="Connected findings">
                    <div style={{ display: "flex", gap: "0.4rem", flexWrap: "wrap" }}>
                      {section.connectedFindingTitles.map((title, i) => (
                        <span
                          key={i}
                          style={{
                            background: "var(--surface-sunken)",
                            padding: "0.2rem 0.55rem",
                            borderRadius: "var(--radius-full)",
                            fontSize: "var(--text-xs)",
                            color: "var(--text-secondary)",
                            fontWeight: 500,
                          }}
                        >
                          {title}
                        </span>
                      ))}
                    </div>
                  </DetailBlock>
                )}
                {section.evidence && section.evidence.length > 0 && (
                  <DetailBlock title="Evidence">
                    <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
                      {section.evidence.map((ev, evIdx) => (
                        <div
                          key={evIdx}
                          className="evidence-thumb"
                          onClick={() => setLightboxEvidence(ev)}
                          style={{
                            width: "120px",
                            height: "80px",
                            borderRadius: "var(--radius-sm)",
                            overflow: "hidden",
                            boxShadow: "var(--shadow-xs)",
                            border: "1px solid var(--border-subtle)",
                          }}
                        >
                          <img
                            src={ev.url}
                            alt={ev.caption || "Evidence"}
                            style={{ width: "100%", height: "100%", objectFit: "cover" }}
                            onError={(e) => {
                              (e.target as HTMLImageElement).src =
                                "https://via.placeholder.com/120x80?text=Preview";
                            }}
                          />
                        </div>
                      ))}
                    </div>
                  </DetailBlock>
                )}
              </DetailPanel>
            </div>
          ))}
        </div>
      </div>

      <EvidenceLightbox
        evidence={lightboxEvidence}
        onClose={() => setLightboxEvidence(null)}
      />
    </div>
  );
}
