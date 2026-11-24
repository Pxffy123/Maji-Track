import React from "react";
// Accepts the labels used across the app (Critical, High, Moderate, Low).
// "medium" is kept as an alias of "moderate".
const LEVELS = {
  critical: { label: "Critical", css: "critical" },
  high: { label: "High", css: "high" },
  moderate: { label: "Moderate", css: "medium" },
  medium: { label: "Moderate", css: "medium" },
  low: { label: "Low", css: "low" },
};

export default function SeverityBadge({ level = "low" }) {
  const entry = LEVELS[String(level).toLowerCase()];

  return (
    <span className={`badge badge-${entry ? entry.css : "low"}`}>
      {entry ? entry.label : level}
    </span>
  );
}
