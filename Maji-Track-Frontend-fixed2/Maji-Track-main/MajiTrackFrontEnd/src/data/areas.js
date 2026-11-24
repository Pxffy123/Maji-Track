// Helpers that turn the backend's approved reports (GET /api/reports)
// into the shapes the dashboard components display.

export const severityPriority = {
  Critical: 4,
  High: 3,
  Moderate: 2,
  Low: 1,
};

// The backend stores a severity, not a water status, so derive one:
// Critical = no water at all, anything else = limited supply.
export const statusFromSeverity = (severity) =>
  severity === "Critical" ? "No Water" : "Low Supply";

export function formatRelativeDate(iso) {
  if (!iso) return "Date unavailable";
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return "Date unavailable";

  const startOfDay = (d) =>
    new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime();
  const days = Math.round(
    (startOfDay(new Date()) - startOfDay(date)) / 86400000
  );

  if (days <= 0) return "Today";
  if (days === 1) return "Yesterday";
  if (days < 7) return `${days} days ago`;
  return date.toLocaleDateString();
}

// Most severe first, newest first within the same severity.
export function sortReports(reports) {
  return [...reports].sort(
    (a, b) =>
      (severityPriority[b.severity] || 0) -
        (severityPriority[a.severity] || 0) ||
      new Date(b.created_at) - new Date(a.created_at)
  );
}

// Shape used by ReportCard
export function toReportCard(report) {
  return {
    id: report.id,
    title: `${report.severity} shortage \u2013 ${report.time_without_water} without water`,
    area: `${report.location}, ${report.district}`,
    description: report.description,
    status: statusFromSeverity(report.severity),
    date: formatRelativeDate(report.created_at),
    verified: true, // the public endpoint only returns approved reports
    severity: report.severity,
  };
}

// Group reports by district -> shape used by AreaCard / AreaDetails
export function buildAreas(reports) {
  const byDistrict = new Map();

  for (const report of reports) {
    const key = String(report.district_id);
    if (!byDistrict.has(key)) byDistrict.set(key, []);
    byDistrict.get(key).push(report);
  }

  return [...byDistrict.entries()]
    .map(([id, list]) => {
      const worst = list.reduce((a, b) =>
        (severityPriority[b.severity] || 0) > (severityPriority[a.severity] || 0)
          ? b
          : a
      );
      const latest = list.reduce((a, b) =>
        new Date(b.created_at) > new Date(a.created_at) ? b : a
      );
      const places = [...new Set(list.map((r) => r.location))].slice(0, 3);

      return {
        id,
        name: worst.district,
        location: places.join(", "),
        status: statusFromSeverity(worst.severity),
        severity: worst.severity,
        reports: list.length,
        lastUpdated: formatRelativeDate(latest.created_at),
      };
    })
    .sort(
      (a, b) =>
        (severityPriority[b.severity] || 0) -
          (severityPriority[a.severity] || 0) || b.reports - a.reports
    );
}
