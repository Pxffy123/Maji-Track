
import { BrowserRouter, Routes, Route, Navigate, Link } from "react-router-dom";
import { Droplets, ArrowRight } from "lucide-react";
import React from "react";
import Dashboard from "./pages/Dashboard";
import AreaDetails from "./pages/AreaDetails";
import SubmitReport from "./pages/SubmitReport";
import Admin from "./pages/Admin";
import Landing from "./pages/Landing";
function Landing() {
  return (
    <main style={{
      minHeight: "100vh",
      display: "grid",
      placeItems: "center",
      padding: "30px",
      background: "#f0f9ff",
      fontFamily: "Arial, sans-serif",
      textAlign: "center"
    }}>
      <section style={{ maxWidth: "700px" }}>
        <Droplets size={55} color="#0284c7" />
        <h1 style={{ fontSize: "48px", color: "#0f172a" }}>
          Maji-Track
        </h1>
        <h2 style={{ color: "#0284c7" }}>
          Track water shortages. Empower communities.
        </h2>
        <p style={{ color: "#475569", lineHeight: 1.8 }}>
          Monitor water availability, explore affected areas, and report
          shortages in your community.
        </p>
        <Link to="/dashboard" style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "10px",
          padding: "14px 22px",
          marginTop: "20px",
          background: "#0284c7",
          color: "white",
          borderRadius: "9px",
          textDecoration: "none",
          fontWeight: "bold"
        }}>
          Explore Dashboard <ArrowRight size={18} />
        </Link>
      </section>
    </main>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/areas/:id" element={<AreaDetails />} />
        <Route path="/submit-report" element={<SubmitReport />} />
        <Route path="/report" element={<Navigate to="/submit-report" replace />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
