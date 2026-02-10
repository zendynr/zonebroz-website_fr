import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

interface DetailPanelProps {
  /** Trigger label — e.g. "Details", "Why?", "How we know" */
  label?: string;
  children: React.ReactNode;
}

/**
 * Layer 2 — "Explain" panel.
 * Renders a subtle trigger link. When clicked, reveals bounded structured content
 * inline on the same slide. Closing returns the user to exactly where they were.
 */
export default function DetailPanel({ label = "Details", children }: DetailPanelProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          background: "none",
          border: "none",
          color: "#3b82f6",
          fontSize: "0.85rem",
          cursor: "pointer",
          padding: "0.25rem 0",
          display: "inline-flex",
          alignItems: "center",
          gap: "0.3rem",
          fontWeight: 500,
        }}
      >
        {label}
        <ChevronDown
          size={14}
          style={{
            transform: isOpen ? "rotate(180deg)" : "none",
            transition: "transform 0.2s ease",
          }}
        />
      </button>

      {isOpen && (
        <div className="detail-panel-enter" style={{ marginTop: "0.5rem" }}>
          <div
            style={{
              background: "#f8fafc",
              borderRadius: "0.5rem",
              border: "1px solid #e2e8f0",
              padding: "1rem",
              display: "flex",
              flexDirection: "column",
              gap: "0.75rem",
              maxHeight: "60vh",
              overflowY: "auto",
            }}
          >
            {children}
          </div>
        </div>
      )}
    </div>
  );
}

/** Structured block inside a DetailPanel — keeps depth content scannable */
export function DetailBlock({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div
        style={{
          fontSize: "0.7rem",
          fontWeight: "bold",
          textTransform: "uppercase",
          letterSpacing: "0.06em",
          color: "#6b7280",
          marginBottom: "0.2rem",
        }}
      >
        {title}
      </div>
      <div style={{ fontSize: "0.9rem", lineHeight: 1.55, color: "#374151" }}>
        {children}
      </div>
    </div>
  );
}
