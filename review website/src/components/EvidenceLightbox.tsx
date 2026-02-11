import React, { useEffect } from "react";
import { Evidence } from "../types";
import { X } from "lucide-react";

interface EvidenceLightboxProps {
  evidence: Evidence | null;
  onClose: () => void;
}

/**
 * Layer 3 — "Proof" lightbox.
 * Displays evidence media in a fullscreen overlay with minimal caption.
 * Never chains into more prose. Click backdrop or X to close.
 */
export default function EvidenceLightbox({ evidence, onClose }: EvidenceLightboxProps) {
  useEffect(() => {
    if (!evidence) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [evidence, onClose]);

  if (!evidence) return null;

  return (
    <div
      className="lightbox-enter"
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        background: "rgba(0, 0, 0, 0.85)",
        backdropFilter: "blur(4px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "zoom-out",
        padding: "2rem",
      }}
    >
      {/* Close button */}
      <button
        onClick={onClose}
        style={{
          position: "absolute",
          top: "1.25rem",
          right: "1.25rem",
          background: "rgba(255,255,255,0.1)",
          border: "1px solid rgba(255,255,255,0.15)",
          borderRadius: "50%",
          width: "2.5rem",
          height: "2.5rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          color: "white",
          transition: "background var(--duration-fast) ease",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = "rgba(255,255,255,0.2)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = "rgba(255,255,255,0.1)";
        }}
        aria-label="Close lightbox"
      >
        <X size={18} />
      </button>

      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          maxWidth: "90vw",
          maxHeight: "85vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          cursor: "default",
        }}
      >
        {evidence.type === "image" ? (
          <img
            src={evidence.url}
            alt={evidence.caption || "Evidence"}
            style={{
              maxWidth: "100%",
              maxHeight: "78vh",
              borderRadius: "var(--radius-md)",
              objectFit: "contain",
            }}
            onError={(e) => {
              (e.target as HTMLImageElement).src =
                "https://via.placeholder.com/800x600?text=Image+Not+Available";
            }}
          />
        ) : (
          <video
            src={evidence.url}
            controls
            autoPlay
            style={{
              maxWidth: "100%",
              maxHeight: "78vh",
              borderRadius: "var(--radius-md)",
            }}
          />
        )}
        {evidence.caption && (
          <p
            style={{
              color: "rgba(255,255,255,0.65)",
              textAlign: "center",
              marginTop: "0.75rem",
              fontSize: "var(--text-sm)",
              maxWidth: "600px",
              lineHeight: "var(--leading-normal)",
            }}
          >
            {evidence.caption}
          </p>
        )}
      </div>
    </div>
  );
}
