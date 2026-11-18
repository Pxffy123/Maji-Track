const LEVELS = {
  critical: "Critical",
  high: "High",
  medium: "Medium",
  low: "Low",
};

export default function SeverityBadge({ level = "low" }) {
  const key = String(level).toLowerCase();
  const known = key in LEVELS;

  return (
    <span className={`badge badge-${known ? key : "low"}`}>
      {known ? LEVELS[key] : level}
    </span>
  );
}
