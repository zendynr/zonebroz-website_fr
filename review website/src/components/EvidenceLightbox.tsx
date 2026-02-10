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
  // Close on Escape key
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
        background: "rgba(0, 0, 0, 0.88)",
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
          top: "1.5rem",
          right: "1.5rem",
          background: "rgba(255,255,255,0.15)",
          border: "none",
          borderRadius: "50%",
          width: "2.5rem",
          height: "2.5rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          color: "white",
        }}
        aria-label="Close lightbox"
      >
        <X size={20} />
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
              borderRadius: "0.5rem",
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
              borderRadius: "0.5rem",
            }}
          />
        )}
        {evidence.caption && (
          <p
            style={{
              color: "rgba(255,255,255,0.75)",
              textAlign: "center",
              marginTop: "0.75rem",
              fontSize: "0.9rem",
              maxWidth: "600px",
            }}
          >
            {evidence.caption}
          </p>
        )}
      </div>
    </div>
  );
}
