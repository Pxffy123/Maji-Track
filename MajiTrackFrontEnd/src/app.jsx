
import { BrowserRouter, Routes, Route, Navigate, Link } from "react-router-dom";
import { Droplets, ArrowRight } from "lucide-react";
import React from "react";
import Dashboard from "./pages/Dashboard";
import AreaDetails from "./pages/AreaDetails";
import SubmitReport from "./pages/SubmitReport";
import Admin from "./pages/Admin";



function Landing() {
  return (
    <main>
      <section>
        <Droplets size={55} />
        <h1>Maji-Track</h1>
        <h2>Track water shortages. Empower communities.</h2>
        <p>
          Monitor water availability, explore affected areas, and report
          shortages in your community.
        </p>
        <Link to="/dashboard">
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
