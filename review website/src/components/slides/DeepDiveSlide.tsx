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
        padding: "4rem",
        background: "#f9fafb",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.5rem" }}>
        <Layers size={28} color="#6366f1" />
        <h2
          style={{
            fontSize: "2.5rem",
            fontWeight: "bold",
            color: "#1f2937",
          }}
        >
          {data.title}
        </h2>
      </div>

      <p style={{ fontSize: "1rem", color: "#6b7280", marginBottom: "2rem", maxWidth: "700px" }}>
        Individual findings rarely exist in isolation. Here are the cross-cutting patterns.
      </p>

      <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
        {data.sections.map((section, index) => (
          <div
            key={index}
            className="deepdive-section"
            style={{
              background: "white",
              padding: "1.5rem",
              borderRadius: "0.75rem",
              boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
              borderTop: "4px solid #6366f1",
            }}
          >
            {/* Layer 1 — Story: title + pattern insight */}
            <h3
              style={{
                fontSize: "1.5rem",
                fontWeight: "bold",
                marginBottom: "0.5rem",
                color: "#1f2937",
              }}
            >
              {section.title}
            </h3>

            {section.patternInsight && (
              <p
                style={{
                  fontSize: "0.95rem",
                  color: "#4338ca",
                  fontWeight: 500,
                  lineHeight: 1.5,
                  marginBottom: "0.75rem",
                  fontStyle: "italic",
                }}
              >
                {section.patternInsight}
              </p>
            )}

            {/* Layer 2 — Explain: full analysis + connected findings */}
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
                          background: "#f3f4f6",
                          padding: "0.2rem 0.55rem",
                          borderRadius: "0.375rem",
                          fontSize: "0.8rem",
                          color: "#4b5563",
                        }}
                      >
                        {title}
                      </span>
                    ))}
                  </div>
                </DetailBlock>
              )}
              {/* Layer 3 trigger — evidence thumbnails inside the explain panel */}
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
                          borderRadius: "0.375rem",
                          overflow: "hidden",
                          boxShadow: "0 1px 4px rgba(0,0,0,0.1)",
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

      <EvidenceLightbox
        evidence={lightboxEvidence}
        onClose={() => setLightboxEvidence(null)}
      />
    </div>
  );
}
