import { useEffect, useState } from "react";
import { X } from "lucide-react";

interface AnalysisSectionView {
  title: string;
  content: string;
}

interface AnalysisOverlayProps {
  open: boolean;
  title: string;
  sections: AnalysisSectionView[];
  onClose: () => void;
}

export default function AnalysisOverlay({
  open,
  title,
  sections,
  onClose,
}: AnalysisOverlayProps) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const media = window.matchMedia("(max-width: 900px)");
    const sync = () => setIsMobile(media.matches);
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onEscape);
    return () => window.removeEventListener("keydown", onEscape);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 3000,
        background: "rgba(17, 24, 39, 0.2)",
        display: "flex",
        alignItems: isMobile ? "flex-end" : "stretch",
        justifyContent: isMobile ? "stretch" : "flex-end",
      }}
    >
      <button
        type="button"
        aria-label="Close full analysis"
        onClick={onClose}
        style={{
          position: "absolute",
          inset: 0,
          border: "none",
          background: "transparent",
          cursor: "default",
        }}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-label={title}
        style={{
          position: "relative",
          width: isMobile ? "100%" : "38vw",
          maxWidth: isMobile ? "100%" : "640px",
          minWidth: isMobile ? "100%" : "460px",
          maxHeight: isMobile ? "92vh" : "100vh",
          height: isMobile ? "92vh" : "100vh",
          background: "#ffffff",
          borderTopLeftRadius: isMobile ? "1rem" : 0,
          borderTopRightRadius: isMobile ? "1rem" : 0,
          boxShadow: "0 8px 24px rgba(0,0,0,0.2)",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            padding: "1rem 1rem 0.85rem 1rem",
            borderBottom: "1px solid #e5e7eb",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "0.75rem",
          }}
        >
          <h3 style={{ fontSize: "1.05rem", color: "#111827", margin: 0 }}>
            {title}
          </h3>
          <button
            type="button"
            onClick={onClose}
            style={{
              border: "1px solid #d1d5db",
              borderRadius: "0.45rem",
              background: "#ffffff",
              color: "#374151",
              width: "2rem",
              height: "2rem",
              cursor: "pointer",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <X size={16} />
          </button>
        </div>
        <div
          style={{
            padding: "1rem",
            overflowY: "auto",
            display: "flex",
            flexDirection: "column",
            gap: "0.9rem",
          }}
        >
          {sections.map((section) => (
            <div
              key={`${section.title}-${section.content.slice(0, 24)}`}
              style={{
                border: "1px solid #e5e7eb",
                borderRadius: "0.5rem",
                padding: "0.75rem",
              }}
            >
              <div
                style={{
                  fontSize: "0.75rem",
                  textTransform: "uppercase",
                  letterSpacing: "0.04em",
                  color: "#6b7280",
                  fontWeight: 700,
                  marginBottom: "0.3rem",
                }}
              >
                {section.title}
              </div>
              <div style={{ color: "#374151", lineHeight: 1.55, fontSize: "0.95rem" }}>
                {section.content}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
