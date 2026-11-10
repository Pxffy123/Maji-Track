import React from "react";
import {
  Droplets,
  MapPin,
  Clock,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  Droplet,
} from "lucide-react";

const statusStyles = {
  Available: {
    color: "#15803d",
    background: "#dcfce7",
    icon: CheckCircle2,
    message: "Water is available",
  },
  "Low Supply": {
    color: "#b45309",
    background: "#fef3c7",
    icon: AlertTriangle,
    message: "Limited water supply",
  },
  "No Water": {
    color: "#b91c1c",
    background: "#fee2e2",
    icon: Droplet,
    message: "Water shortage reported",
  },
};

function AreaCard({ area, onViewDetails }) {
  const status = statusStyles[area?.status] || {
    color: "#475569",
    background: "#f1f5f9",
    icon: Droplets,
    message: "Status unavailable",
  };

  const StatusIcon = status.icon;

  const handleViewDetails = () => {
    if (onViewDetails) {
      onViewDetails(area);
    }
  };

  return (
    <article
      style={{
        background: "#ffffff",
        border: "1px solid #e2e8f0",
        borderRadius: "16px",
        padding: "22px",
        width: "100%",
        boxSizing: "border-box",
        boxShadow: "0 4px 15px rgba(15, 23, 42, 0.04)",
        transition: "transform 0.2s ease, box-shadow 0.2s ease",
      }}
    >
      {/* Card Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          gap: "12px",
          marginBottom: "18px",
        }}
      >
        <div style={{ display: "flex", gap: "12px" }}>
          <div
            style={{
              background: "#e0f2fe",
              color: "#0284c7",
              padding: "11px",
              borderRadius: "12px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Droplets size={24} />
          </div>

          <div>
            <h3
              style={{
                fontSize: "17px",
                fontWeight: "700",
                color: "#0f172a",
                margin: "0 0 6px",
              }}
            >
              {area?.name || "Unnamed Area"}
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
              {area?.location || "Location unavailable"}
            </div>
          </div>
        </div>
      </div>

      {/* Water Availability Status */}
      <div
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "7px",
          background: status.background,
          color: status.color,
          padding: "7px 12px",
          borderRadius: "20px",
          fontSize: "12px",
          fontWeight: "600",
          marginBottom: "16px",
        }}
      >
        <StatusIcon size={15} />
        {area?.status || "Unknown"}
      </div>

      <p
        style={{
          color: "#64748b",
          fontSize: "13px",
          margin: "0 0 18px",
        }}
      >
        {status.message}
      </p>

      {/* Last Updated */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "7px",
          color: "#64748b",
          fontSize: "12px",
          marginBottom: "18px",
        }}
      >
        <Clock size={15} />
        Last updated: {area?.lastUpdated || "Not available"}
      </div>

      {/* View Details Button */}
      <button
        type="button"
        onClick={handleViewDetails}
        style={{
          width: "100%",
          padding: "12px",
          background: "#0284c7",
          color: "#ffffff",
          border: "none",
          borderRadius: "10px",
          fontSize: "14px",
          fontWeight: "600",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "8px",
        }}
      >
        View Area Details
        <ArrowRight size={17} />
      </button>
    </article>
  );
}

export default AreaCard;