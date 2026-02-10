import { Evidence } from "../types";

interface MediaRendererProps {
  evidence: Evidence;
}

export default function MediaRenderer({ evidence }: MediaRendererProps) {
  return (
    <div
      style={{
        background: "white",
        borderRadius: "0.5rem",
        overflow: "hidden",
        boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
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
            // Fallback for missing images
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
            // Fallback for missing videos
            const target = e.target as HTMLVideoElement;
            target.style.display = "none";
            const fallback = document.createElement("div");
            fallback.textContent = "Video not available";
            fallback.style.padding = "2rem";
            fallback.style.textAlign = "center";
            fallback.style.background = "#f3f4f6";
            target.parentElement?.appendChild(fallback);
          }}
        />
      )}
      {evidence.caption && (
        <div
          style={{
            padding: "1rem",
            fontSize: "0.875rem",
            color: "#6b7280",
            background: "#f9fafb",
          }}
        >
          {evidence.caption}
        </div>
      )}
    </div>
  );
}
