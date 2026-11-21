import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  Droplets,
  MapPin,
  ArrowLeft,
  AlertTriangle,
  CheckCircle2,
  Clock,
  FileText,
} from "lucide-react";
import ReportCard from "../components/ReportCard";
import { getReports } from "../data/reports";
import { buildAreas, sortReports, toReportCard } from "../data/areas";

const AreaDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();

  // Show the area passed from the dashboard instantly, then load the real
  // approved reports for this district (works on refresh and direct links too).
  const [area, setArea] = useState(location.state?.area || null);
  const [areaReports, setAreaReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    getReports(id)
      .then((data) => {
        if (cancelled) return;
        const list = Array.isArray(data) ? data : [];
        setAreaReports(sortReports(list).map(toReportCard));
        const built = buildAreas(list)[0];
        if (built) setArea(built);
      })
      .catch((err) => !cancelled && setError(err.message))
      .finally(() => !cancelled && setLoading(false));
    return () => {
      cancelled = true;
    };
  }, [id]);

  const statusStyles = {
    "No Water": {
      color: "#b91c1c",
      background: "#fee2e2",
      icon: AlertTriangle,
      message: "Water shortage reported in this area.",
    },
    "Low Supply": {
      color: "#b45309",
      background: "#fef3c7",
      icon: AlertTriangle,
      message: "Water supply is currently limited.",
    },
    Available: {
      color: "#15803d",
      background: "#dcfce7",
      icon: CheckCircle2,
      message: "Water is currently available.",
    },
  };

  if (loading && !area) {
    return (
      <div style={{ padding: "40px", fontFamily: "Arial" }}>
        <p>Loading area details...</p>
      </div>
    );
  }

  if (!area) {
    return (
      <div style={{ padding: "40px", fontFamily: "Arial" }}>
        <h2>Area details unavailable</h2>
        <p>{error || "This district has no verified reports yet."}</p>
        <button onClick={() => navigate("/dashboard")}>
          Back to Dashboard
        </button>
      </div>
    );
  }

  const status = statusStyles[area.status] || statusStyles.Available;
  const StatusIcon = status.icon;

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f8fafc",
        padding: "30px 20px",
        fontFamily: "Arial, sans-serif",
        color: "#0f172a",
      }}
    >
      <main style={{ maxWidth: "1000px", margin: "0 auto" }}>
        <button
          onClick={() => navigate("/dashboard")}
          style={{
            border: "none",
            background: "transparent",
            color: "#0284c7",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "8px",
            marginBottom: "25px",
            fontWeight: "600",
          }}
        >
          <ArrowLeft size={18} />
          Back to Dashboard
        </button>

        <section
          style={{
            background: "#ffffff",
            padding: "28px",
            borderRadius: "16px",
            border: "1px solid #e2e8f0",
            marginBottom: "22px",
          }}
        >
          <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
            <Droplets size={32} color="#0284c7" />
            <div>
              <h1 style={{ margin: 0, fontSize: "28px" }}>
                {area.name}
              </h1>
              <p style={{ color: "#64748b", margin: "8px 0 0" }}>
                <MapPin size={14} style={{ verticalAlign: "middle" }} />{" "}
                {area.location}
              </p>
            </div>
          </div>

          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              marginTop: "25px",
              padding: "10px 15px",
              borderRadius: "20px",
              color: status.color,
              background: status.background,
              fontWeight: "600",
            }}
          >
            <StatusIcon size={18} />
            {area.status}
          </div>

          <p style={{ color: "#64748b" }}>{status.message}</p>
        </section>

        <section
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "18px",
            marginBottom: "22px",
          }}
        >
          <div style={cardStyle}>
            <FileText color="#0284c7" size={25} />
            <h2>{area.reports}</h2>
            <p>Community Reports</p>
          </div>

          <div style={cardStyle}>
            <AlertTriangle color="#dc2626" size={25} />
            <h2>{area.severity}</h2>
            <p>Severity Level</p>
          </div>

          <div style={cardStyle}>
            <Clock color="#0284c7" size={25} />
            <h2>{area.lastUpdated}</h2>
            <p>Last Updated</p>
          </div>
        </section>

        <section style={cardStyle}>
          <h2>Area Information</h2>
          <p><strong>Area:</strong> {area.name}</p>
          <p><strong>Location:</strong> {area.location}</p>
          <p><strong>Water Status:</strong> {area.status}</p>
          <p><strong>Severity:</strong> {area.severity}</p>
          <p><strong>Total Reports:</strong> {area.reports}</p>
        </section>

        {areaReports.length > 0 && (
          <section style={{ marginTop: "22px" }}>
            <h2 style={{ marginBottom: "14px" }}>Verified Reports</h2>
            <div style={{ display: "grid", gap: "14px" }}>
              {areaReports.map((report) => (
                <ReportCard key={report.id} report={report} />
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
};

const cardStyle = {
  background: "#ffffff",
  border: "1px solid #e2e8f0",
  borderRadius: "16px",
  padding: "24px",
  boxSizing: "border-box",
  boxShadow: "0 4px 15px rgba(15, 23, 42, 0.04)",
};

export default AreaDetails;