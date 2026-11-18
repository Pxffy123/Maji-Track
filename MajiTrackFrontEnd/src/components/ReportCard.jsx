import React from "react";
import {
  MapPin,
  Clock,
  Droplets,
  AlertTriangle,
  CheckCircle2,
  CircleAlert,
} from "lucide-react";

const statusConfig = {
  Available: {
    color: "#15803d",
    background: "#dcfce7",
    icon: CheckCircle2,
  },
  "Low Supply": {
    color: "#b45309",
    background: "#fef3c7",
    icon: CircleAlert,
  },
  "No Water": {
    color: "#b91c1c",
    background: "#fee2e2",
    icon: AlertTriangle,
  },
};

function ReportCard({ report }) {
  const status = statusConfig[report?.status] || {
    color: "#475569",
    background: "#f1f5f9",
    icon: Droplets,
  };

  const StatusIcon = status.icon;

  return (
    <article
      style={{
        background: "#ffffff",
        border: "1px solid #e2e8f0",
        borderRadius: "14px",
        padding: "20px",
        width: "100%",
        boxSizing: "border-box",
        boxShadow: "0 3px 12px rgba(15, 23, 42, 0.04)",
      }}
    >
      {/* Report Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          gap: "12px",
          marginBottom: "14px",
        }}
      >
        <div>
          <h3
            style={{
              fontSize: "16px",
              color: "#0f172a",
              margin: "0 0 7px",
              fontWeight: "700",
            }}
          >
            {report?.title || "Water Supply Report"}
          </h3>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "5px",
              color: "#64748b",
              fontSize: "13px",
            }}
          >
            <MapPin size={14} />
            {report?.area || "Nairobi"}
          </div>
        </div>

        <span
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "5px",
            background: status.background,
            color: status.color,
            padding: "6px 10px",
            borderRadius: "20px",
            fontSize: "11px",
            fontWeight: "600",
            whiteSpace: "nowrap",
          }}
        >
          <StatusIcon size={13} />
          {report?.status || "Unknown"}
        </span>
      </div>

      {/* Report Description */}
      <p
        style={{
          fontSize: "14px",
          color: "#475569",
          lineHeight: "1.6",
          margin: "0 0 16px",
        }}
      >
        {report?.description || "No additional details provided."}
      </p>

      {/* Report Footer */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "10px",
          borderTop: "1px solid #f1f5f9",
          paddingTop: "13px",
        }}
      >
        <span
          style={{
            display: "flex",
            alignItems: "center",
            gap: "6px",
            color: "#64748b",
            fontSize: "12px",
          }}
        >
          <Clock size={14} />
          {report?.date || "Date unavailable"}
        </span>

        <span
          style={{
            color: report?.verified ? "#15803d" : "#b45309",
            background: report?.verified ? "#dcfce7" : "#fef3c7",
            padding: "5px 9px",
            borderRadius: "6px",
            fontSize: "11px",
            fontWeight: "600",
          }}
        >
          {report?.verified ? "Verified" : "Pending verification"}
        </span>
      </div>
    </article>
  );
}

export default ReportCard;