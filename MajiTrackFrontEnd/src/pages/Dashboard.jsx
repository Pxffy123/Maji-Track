import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Droplets,
  MapPin,
  AlertTriangle,
  FileText,
  Search,
  Plus,
  LayoutDashboard,
  ClipboardList,
  ArrowUpRight,
} from "lucide-react";

import AreaCard from "../components/AreaCard";
import ReportCard from "../components/ReportCard";

const Dashboard = () => {
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSeverity, setSelectedSeverity] = useState("All");

  // Sample Nairobi district data
  const areas = [
    {
      id: "embakasi",
      name: "Embakasi",
      location: "Umoja 1, Pipeline, Donholm",
      status: "No Water",
      severity: "Critical",
      reports: 18,
      lastUpdated: "Today",
    },
    {
      id: "kibra",
      name: "Kibra",
      location: "Laini Saba, Makina",
      status: "No Water",
      severity: "Critical",
      reports: 15,
      lastUpdated: "Today",
    },
    {
      id: "westlands",
      name: "Westlands",
      location: "Kangemi, Mountain View",
      status: "Low Supply",
      severity: "High",
      reports: 12,
      lastUpdated: "Today",
    },
    {
      id: "makadara",
      name: "Makadara",
      location: "Buruburu, Maringo",
      status: "Low Supply",
      severity: "Moderate",
      reports: 9,
      lastUpdated: "Yesterday",
    },
    {
      id: "kasarani",
      name: "Kasarani",
      location: "Mwiki, Roysambu",
      status: "Available",
      severity: "Low",
      reports: 7,
      lastUpdated: "Yesterday",
    },
  ];

  // Sample verified water shortage reports
  const reports = [
    {
      id: 1,
      title: "Critical Water Shortage",
      area: "Umoja 1, Embakasi",
      description:
        "Residents have reported being without water for approximately three weeks.",
      status: "No Water",
      date: "Today",
      verified: true,
      severity: "Critical",
    },
    {
      id: 2,
      title: "Prolonged Water Interruption",
      area: "Laini Saba, Kibra",
      description:
        "Several households have experienced an extended interruption in water supply.",
      status: "No Water",
      date: "Today",
      verified: true,
      severity: "Critical",
    },
    {
      id: 3,
      title: "Irregular Water Supply",
      area: "Kangemi, Westlands",
      description:
        "Residents report inconsistent water supply over the past five days.",
      status: "Low Supply",
      date: "Yesterday",
      verified: true,
      severity: "High",
    },
    {
      id: 4,
      title: "Water Supply Disruption",
      area: "Buruburu, Makadara",
      description:
        "Water supply has been inconsistent in several neighbourhoods.",
      status: "Low Supply",
      date: "Yesterday",
      verified: true,
      severity: "Moderate",
    },
  ];

  // Sort by severity
  const severityPriority = {
    Critical: 4,
    High: 3,
    Moderate: 2,
    Low: 1,
  };

  const filteredAreas = useMemo(() => {
    return areas
      .filter((area) => {
        const matchesSearch =
          area.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          area.location.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesSeverity =
          selectedSeverity === "All" ||
          area.severity === selectedSeverity;

        return matchesSearch && matchesSeverity;
      })
      .sort(
        (a, b) =>
          severityPriority[b.severity] -
          severityPriority[a.severity]
      );
  }, [searchTerm, selectedSeverity]);

  const sortedReports = [...reports].sort(
    (a, b) => severityPriority[b.severity] - severityPriority[a.severity]
  );

  // Dashboard statistics
  const totalReports = reports.length;

  const criticalReports = reports.filter(
    (report) => report.severity === "Critical"
  ).length;

  const affectedDistricts = areas.length;

  const handleViewArea = (area) => {
    navigate(`/areas/${area.id}`, { state: { area } });
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f8fafc",
        fontFamily: "Arial, sans-serif",
        color: "#0f172a",
      }}
    >
      {/* TOP NAVIGATION */}
      <nav
        style={{
          background: "#ffffff",
          borderBottom: "1px solid #e2e8f0",
          padding: "18px 5%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "15px",
        }}
      >
        <h2
          style={{
            color: "#0284c7",
            fontSize: "25px",
            fontWeight: "800",
            margin: 0,
          }}
        >
          <Droplets
            size={25}
            style={{ verticalAlign: "middle", marginRight: "7px" }}
          />
          MajiTrack
        </h2>

        <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
          <button
            onClick={() => navigate("/submit-report")}
            style={{
              background: "#0284c7",
              color: "#ffffff",
              border: "none",
              borderRadius: "9px",
              padding: "11px 17px",
              fontWeight: "600",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "7px",
            }}
          >
            <Plus size={17} />
            Submit Report
          </button>
        </div>
      </nav>

      <main style={{ padding: "35px 5%", maxWidth: "1400px", margin: "auto" }}>
        {/* WELCOME SECTION */}
        <section style={{ marginBottom: "30px" }}>
          <p
            style={{
              color: "#0284c7",
              fontSize: "13px",
              fontWeight: "700",
              textTransform: "uppercase",
              letterSpacing: "1px",
            }}
          >
            Resident Dashboard
          </p>

          <h1 style={{ fontSize: "30px", margin: "8px 0" }}>
            Nairobi Water Monitoring
          </h1>

          <p style={{ color: "#64748b", fontSize: "15px" }}>
            Monitor water availability and stay informed about shortages
            affecting communities across Nairobi.
          </p>
        </section>

        {/* STATISTICS */}
        <section
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(210px, 1fr))",
            gap: "18px",
            marginBottom: "35px",
          }}
        >
          {[
            {
              label: "Affected Districts",
              value: affectedDistricts,
              icon: MapPin,
              color: "#0284c7",
            },
            {
              label: "Verified Reports",
              value: totalReports,
              icon: FileText,
              color: "#16a34a",
            },
            {
              label: "Critical Shortages",
              value: criticalReports,
              icon: AlertTriangle,
              color: "#dc2626",
            },
            {
              label: "Areas Monitored",
              value: areas.length,
              icon: LayoutDashboard,
              color: "#7c3aed",
            },
          ].map((stat) => {
            const Icon = stat.icon;

            return (
              <div
                key={stat.label}
                style={{
                  background: "#ffffff",
                  border: "1px solid #e2e8f0",
                  borderRadius: "14px",
                  padding: "22px",
                  boxShadow: "0 3px 12px rgba(15,23,42,0.03)",
                }}
              >
                <Icon size={24} color={stat.color} />

                <p
                  style={{
                    color: "#64748b",
                    fontSize: "13px",
                    margin: "15px 0 7px",
                  }}
                >
                  {stat.label}
                </p>

                <h2 style={{ fontSize: "29px", margin: 0 }}>
                  {stat.value}
                </h2>
              </div>
            );
          })}
        </section>

        {/* CRITICAL SHORTAGE HIGHLIGHT */}
        <section
          style={{
            background: "#fff1f2",
            border: "1px solid #fecdd3",
            borderRadius: "15px",
            padding: "25px",
            marginBottom: "35px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "9px",
              color: "#be123c",
              fontWeight: "700",
              fontSize: "13px",
            }}
          >
            <AlertTriangle size={19} />
            MOST CRITICAL WATER SHORTAGE
          </div>

          <h2 style={{ fontSize: "23px", marginBottom: "10px" }}>
            Umoja 1, Embakasi
          </h2>

          <p style={{ color: "#64748b", lineHeight: "1.7" }}>
            Residents have reported being without water for approximately
            three weeks. This shortage requires urgent attention.
          </p>

          <div
            style={{
              display: "flex",
              gap: "20px",
              flexWrap: "wrap",
              marginBottom: "18px",
              fontSize: "14px",
            }}
          >
            <span>
              <strong>Severity:</strong> Critical
            </span>

            <span>
              <strong>Duration:</strong> 3 weeks
            </span>

            <span>
              <strong>District:</strong> Embakasi
            </span>
          </div>

          <button
            onClick={() => navigate("/areas/embakasi")}
            style={{
              background: "#be123c",
              color: "#ffffff",
              border: "none",
              padding: "11px 18px",
              borderRadius: "8px",
              cursor: "pointer",
              fontWeight: "600",
            }}
          >
            Explore Shortage <ArrowUpRight size={16} />
          </button>
        </section>

        {/* DISTRICT EXPLORER */}
        <section style={{ marginBottom: "40px" }}>
          <div style={{ marginBottom: "20px" }}>
            <h2 style={{ fontSize: "22px", marginBottom: "7px" }}>
              Explore Nairobi Districts
            </h2>

            <p style={{ color: "#64748b", fontSize: "14px" }}>
              Select a district to explore its reported water shortages.
            </p>
          </div>

          {/* SEARCH AND FILTER */}
          <div
            style={{
              display: "flex",
              gap: "12px",
              flexWrap: "wrap",
              marginBottom: "22px",
            }}
          >
            <div
              style={{
                position: "relative",
                flex: "1",
                minWidth: "220px",
                maxWidth: "450px",
              }}
            >
              <Search
                size={18}
                color="#94a3b8"
                style={{
                  position: "absolute",
                  left: "13px",
                  top: "14px",
                }}
              />

              <input
                type="text"
                placeholder="Search districts or locations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                  width: "100%",
                  boxSizing: "border-box",
                  padding: "13px 13px 13px 42px",
                  border: "1px solid #e2e8f0",
                  borderRadius: "9px",
                  outline: "none",
                  fontSize: "14px",
                }}
              />
            </div>

            <select
              value={selectedSeverity}
              onChange={(e) => setSelectedSeverity(e.target.value)}
              style={{
                padding: "12px",
                border: "1px solid #e2e8f0",
                borderRadius: "9px",
                background: "#ffffff",
                fontSize: "14px",
              }}
            >
              <option value="All">All Severity Levels</option>
              <option value="Critical">Critical</option>
              <option value="High">High</option>
              <option value="Moderate">Moderate</option>
              <option value="Low">Low</option>
            </select>
          </div>

          {/* AREA CARDS */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
              gap: "20px",
            }}
          >
            {filteredAreas.length > 0 ? (
              filteredAreas.map((area) => (
                <AreaCard
                  key={area.id}
                  area={area}
                  onViewDetails={handleViewArea}
                />
              ))
            ) : (
              <p style={{ color: "#64748b" }}>
                No matching districts found.
              </p>
            )}
          </div>
        </section>

        {/* VERIFIED SHORTAGE REPORTS */}
        <section style={{ marginBottom: "40px" }}>
          <div style={{ marginBottom: "20px" }}>
            <h2 style={{ fontSize: "22px", marginBottom: "7px" }}>
              Verified Water Shortage Reports
            </h2>

            <p style={{ color: "#64748b", fontSize: "14px" }}>
              Reports reviewed and verified by MajiTrack administrators,
              ranked by severity.
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(270px, 1fr))",
              gap: "18px",
            }}
          >
            {sortedReports.map((report) => (
              <ReportCard key={report.id} report={report} />
            ))}
          </div>
        </section>

        {/* SUBMIT REPORT CTA */}
        <section
          style={{
            background: "#e0f2fe",
            borderRadius: "15px",
            padding: "25px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "15px",
          }}
        >
          <div>
            <h2 style={{ margin: "0 0 8px", fontSize: "20px" }}>
              Experiencing a Water Shortage?
            </h2>

            <p style={{ margin: 0, color: "#475569", fontSize: "14px" }}>
              Help your community by submitting a water shortage report.
            </p>
          </div>

          <button
            onClick={() => navigate("/submit-report")}
            style={{
              background: "#0284c7",
              color: "#ffffff",
              border: "none",
              padding: "13px 20px",
              borderRadius: "9px",
              fontWeight: "600",
              cursor: "pointer",
            }}
          >
            <ClipboardList
              size={17}
              style={{ verticalAlign: "middle", marginRight: "7px" }}
            />
            Submit a Report
          </button>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;