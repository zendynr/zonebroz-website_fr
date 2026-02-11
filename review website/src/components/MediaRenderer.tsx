import { Evidence } from "../types";

interface MediaRendererProps {
  evidence: Evidence;
}

export default function MediaRenderer({ evidence }: MediaRendererProps) {
  return (
    <div
      style={{
        background: "var(--surface-card)",
        borderRadius: "var(--radius-md)",
        overflow: "hidden",
        boxShadow: "var(--shadow-sm)",
        border: "1px solid var(--border-subtle)",
      }}
    >
      {evidence.type === "image" ? (
        <img
          src={evidence.url}
          alt={evidence.caption || "Evidence"}
          style={{
            width: "100%",
            height: "auto",
            display: "block",
          }}
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = `https://via.placeholder.com/400x300?text=Image+Not+Available`;
          }}
        />
      ) : (
        <video
          src={evidence.url}
          controls
          style={{
            width: "100%",
            height: "auto",
            display: "block",
          }}
          onError={(e) => {
            const target = e.target as HTMLVideoElement;
            target.style.display = "none";
            const fallback = document.createElement("div");
            fallback.textContent = "Video not available";
            fallback.style.padding = "2rem";
            fallback.style.textAlign = "center";
            fallback.style.background = "var(--surface-sunken)";
            fallback.style.color = "var(--text-muted)";
            target.parentElement?.appendChild(fallback);
          }}
        />
      )}
      {evidence.caption && (
        <div
          style={{
            padding: "0.875rem 1rem",
            fontSize: "var(--text-sm)",
            color: "var(--text-tertiary)",
            background: "var(--surface-ground)",
            borderTop: "1px solid var(--border-subtle)",
            lineHeight: "var(--leading-normal)",
          }}
        >
          {evidence.caption}
        </div>
      )}
    </div>
  );
}
