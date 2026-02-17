import { useEffect, useState, type CSSProperties } from "react";
import { X } from "lucide-react";
import { AnalysisMedia } from "../types";

interface AnalysisSectionView {
  title: string;
  content: string;
  media?: AnalysisMedia[];
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
  const parseParagraphs = (content: string) =>
    content
      .split(/\n\n+|\n/)
      .map((p) => p.trim())
      .filter(Boolean);

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 3000,
        background: "rgba(26, 29, 35, 0.24)",
        backdropFilter: "blur(3px)",
        display: "flex",
        alignItems: "stretch",
        justifyContent: "flex-end",
        overflow: "hidden",
      }}
    >
      {/* Backdrop click handler */}
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

      {/* Main article container */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label={title}
        onClick={(e) => e.stopPropagation()}
        style={{
          position: "relative",
          width: isMobile ? "100%" : "calc(100% - 4rem)",
          marginLeft: isMobile ? "0" : "4rem",
          maxWidth: isMobile ? "100%" : "1400px",
          height: "100vh",
          background: "var(--surface-ground)",
          boxShadow: "var(--shadow-xl)",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
        }}
      >
        {/* Article header */}
        <div
          style={{
            padding: isMobile ? "1.5rem 1.25rem" : "2rem 3rem",
            borderBottom: "2px solid var(--border-default)",
            background: "var(--surface-card)",
            position: "sticky",
            top: 0,
            zIndex: 10,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            gap: "1.5rem",
          }}
        >
          <div style={{ flex: 1, minWidth: 0 }}>
            <div
              style={{
                fontSize: "var(--text-xs)",
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                color: "var(--text-muted)",
                fontWeight: 600,
                marginBottom: "0.5rem",
              }}
            >
              Full Analysis
            </div>
            <h1
              style={{
                fontSize: isMobile ? "var(--text-2xl)" : "var(--text-4xl)",
                fontWeight: 700,
                color: "var(--text-primary)",
                letterSpacing: "var(--tracking-tight)",
                lineHeight: "var(--leading-tight)",
                margin: 0,
              }}
            >
              {title}
            </h1>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            style={{
              border: "1px solid var(--border-default)",
              borderRadius: "var(--radius-sm)",
              background: "var(--surface-raised)",
              color: "var(--text-secondary)",
              width: "2.5rem",
              height: "2.5rem",
              cursor: "pointer",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
              transition: "all var(--duration-fast) ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "var(--surface-sunken)";
              e.currentTarget.style.borderColor = "var(--border-strong)";
              e.currentTarget.style.color = "var(--text-primary)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "var(--surface-raised)";
              e.currentTarget.style.borderColor = "var(--border-default)";
              e.currentTarget.style.color = "var(--text-secondary)";
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Article content — scrollable */}
        <div
          style={{
            flex: 1,
            overflowY: "auto",
            padding: isMobile ? "2rem 1.25rem" : "3rem 3rem",
          }}
        >
          {/* Article body container with comfortable reading width */}
          <article
            style={{
              maxWidth: "720px",
              margin: "0 auto",
              lineHeight: "var(--leading-relaxed)",
            }}
          >
            {sections.map((section, sectionIdx) => {
              const paragraphs = parseParagraphs(section.content);
              const media = section.media || [];

              return (
                <section
                  key={`${section.title}-${sectionIdx}`}
                  style={{
                    marginBottom: sectionIdx < sections.length - 1 ? "4rem" : "2rem",
                  }}
                >
                  {/* Section heading */}
                  <h2
                    style={{
                      fontSize: isMobile ? "var(--text-xl)" : "var(--text-2xl)",
                      fontWeight: 700,
                      color: "var(--text-primary)",
                      letterSpacing: "var(--tracking-tight)",
                      lineHeight: "var(--leading-tight)",
                      marginBottom: "1.5rem",
                      marginTop: sectionIdx > 0 ? "3rem" : "0",
                      paddingBottom: "0.75rem",
                      borderBottom: "1px solid var(--border-subtle)",
                    }}
                  >
                    {section.title}
                  </h2>

                  {/* Section content blocks */}
                  <div>
                    {paragraphs.map((paragraph, paragraphIndex) => (
                      <div key={`paragraph-block-${sectionIdx}-${paragraphIndex}`}>
                        {media[paragraphIndex] && (
                          <MediaBlock media={media[paragraphIndex]} isMobile={isMobile} />
                        )}
                        <p
                          style={{
                            fontSize: "var(--text-base)",
                            color: "var(--text-secondary)",
                            lineHeight: "var(--leading-relaxed)",
                            margin: "0 0 1rem 0",
                            textAlign: "justify",
                            hyphens: "auto",
                          }}
                        >
                          {paragraph}
                        </p>
                      </div>
                    ))}

                    {/* Any remaining media still renders in normal flow after text */}
                    {media.slice(paragraphs.length).map((item) => (
                      <MediaBlock key={item.id} media={item} isMobile={isMobile} />
                    ))}

                    {paragraphs.length === 0 && media.length === 0 && (
                      <p
                        style={{
                          fontSize: "var(--text-base)",
                          color: "var(--text-muted)",
                          fontStyle: "italic",
                          margin: 0,
                        }}
                      >
                        No content provided for this section.
                      </p>
                    )}
                    <div style={{ clear: "both" }} />
                  </div>
                </section>
              );
            })}

            {/* Empty state if no sections */}
            {sections.length === 0 && (
              <div
                style={{
                  textAlign: "center",
                  padding: "4rem 2rem",
                  color: "var(--text-muted)",
                }}
              >
                <p style={{ fontSize: "var(--text-base)", margin: 0 }}>
                  No analysis sections available.
                </p>
              </div>
            )}
          </article>
        </div>
      </div>
    </div>
  );
}

function MediaBlock({
  media,
  isMobile,
}: {
  media: AnalysisMedia;
  isMobile: boolean;
}) {
  const showPlaceholder = !media.url;
  const placement = media.placement || "right";
  const isSideFloat = !isMobile && placement !== "full";
  const mediaContainerStyle: CSSProperties = {
    margin: isSideFloat
      ? placement === "left"
        ? "0.2rem 1.2rem 0.9rem 0"
        : "0.2rem 0 0.9rem 1.2rem"
      : "1rem 0",
    width: isSideFloat ? "min(44%, 340px)" : "100%",
    float: isSideFloat ? placement : "none",
    clear: isSideFloat ? "none" : "both",
    display: "block",
  };

  if (showPlaceholder) {
    return (
      <figure style={mediaContainerStyle}>
        <div
          style={{
            width: "100%",
            aspectRatio: "16 / 9",
            background: "var(--surface-sunken)",
            border: "2px dashed var(--border-default)",
            borderRadius: "var(--radius-md)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "var(--text-muted)",
            fontSize: "var(--text-sm)",
          }}
        >
          Media placeholder
        </div>
      </figure>
    );
  }

  return (
    <figure style={mediaContainerStyle}>
      {media.type === "video" ? (
        <video
          src={media.url}
          controls
          style={{
            width: "100%",
            height: "auto",
            borderRadius: "var(--radius-md)",
            border: "1px solid var(--border-default)",
            background: "#000",
          }}
        />
      ) : (
        <img
          src={media.url}
          alt={media.caption || "Analysis media"}
          style={{
            width: "100%",
            height: "auto",
            borderRadius: "var(--radius-md)",
            border: "1px solid var(--border-default)",
          }}
        />
      )}
      {media.caption && (
        <figcaption
          style={{
            marginTop: "0.65rem",
            fontSize: "var(--text-sm)",
            color: "var(--text-muted)",
            fontStyle: "italic",
            textAlign: "center",
            lineHeight: "var(--leading-normal)",
          }}
        >
          {media.caption}
        </figcaption>
      )}
    </figure>
  );
}
