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
          color: "var(--accent-primary)",
          fontSize: "var(--text-sm)",
          cursor: "pointer",
          padding: "0.3rem 0",
          display: "inline-flex",
          alignItems: "center",
          gap: "0.35rem",
          fontWeight: 500,
          transition: "color var(--duration-fast) ease",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.color = "var(--accent-primary-hover)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.color = "var(--accent-primary)";
        }}
      >
        {label}
        <ChevronDown
          size={14}
          style={{
            transform: isOpen ? "rotate(180deg)" : "none",
            transition: "transform 0.2s var(--ease-out)",
          }}
        />
      </button>

      {isOpen && (
        <div className="detail-panel-enter" style={{ marginTop: "0.5rem" }}>
          <div
            style={{
              background: "var(--surface-ground)",
              borderRadius: "var(--radius-md)",
              border: "1px solid var(--border-default)",
              padding: "1rem 1.125rem",
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
          fontSize: "var(--text-xs)",
          fontWeight: 600,
          textTransform: "uppercase",
          letterSpacing: "0.06em",
          color: "var(--text-muted)",
          marginBottom: "0.25rem",
          lineHeight: 1.4,
        }}
      >
        {title}
      </div>
      <div style={{ fontSize: "var(--text-sm)", lineHeight: 1.6, color: "var(--text-secondary)" }}>
        {children}
      </div>
    </div>
  );
}
