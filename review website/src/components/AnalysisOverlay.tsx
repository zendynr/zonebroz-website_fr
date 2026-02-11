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
        background: "rgba(26, 29, 35, 0.18)",
        backdropFilter: "blur(2px)",
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
          background: "var(--surface-raised)",
          borderTopLeftRadius: isMobile ? "var(--radius-lg)" : 0,
          borderTopRightRadius: isMobile ? "var(--radius-lg)" : 0,
          boxShadow: "var(--shadow-xl)",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
        }}
      >
        {/* Header */}
        <div
          style={{
            padding: "1.125rem 1.25rem 1rem 1.25rem",
            borderBottom: "1px solid var(--border-default)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "0.75rem",
          }}
        >
          <h3 style={{ fontSize: "var(--text-md)", color: "var(--text-primary)", margin: 0, fontWeight: 600 }}>
            {title}
          </h3>
          <button
            type="button"
            onClick={onClose}
            style={{
              border: "1px solid var(--border-default)",
              borderRadius: "var(--radius-sm)",
              background: "var(--surface-raised)",
              color: "var(--text-secondary)",
              width: "2rem",
              height: "2rem",
              cursor: "pointer",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "background var(--duration-fast) ease, border-color var(--duration-fast) ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "var(--surface-sunken)";
              e.currentTarget.style.borderColor = "var(--border-strong)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "var(--surface-raised)";
              e.currentTarget.style.borderColor = "var(--border-default)";
            }}
          >
            <X size={15} />
          </button>
        </div>

        {/* Content */}
        <div
          style={{
            padding: "1.125rem 1.25rem",
            overflowY: "auto",
            display: "flex",
            flexDirection: "column",
            gap: "0.75rem",
          }}
        >
          {sections.map((section) => (
            <div
              key={`${section.title}-${section.content.slice(0, 24)}`}
              style={{
                border: "1px solid var(--border-default)",
                borderRadius: "var(--radius-sm)",
                padding: "0.875rem 1rem",
                background: "var(--surface-ground)",
              }}
            >
              <div
                style={{
                  fontSize: "var(--text-xs)",
                  textTransform: "uppercase",
                  letterSpacing: "0.06em",
                  color: "var(--text-muted)",
                  fontWeight: 600,
                  marginBottom: "0.35rem",
                  lineHeight: 1.4,
                }}
              >
                {section.title}
              </div>
              <div style={{ color: "var(--text-secondary)", lineHeight: 1.6, fontSize: "var(--text-base)" }}>
                {section.content}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
