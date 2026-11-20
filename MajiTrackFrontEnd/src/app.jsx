
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import React from "react";
import Landing from "./pages/Landing";
import Dashboard from "./pages/Dashboard";
import AreaDetails from "./pages/AreaDetails";
import SubmitReport from "./pages/SubmitReport";
import Admin from "./pages/Admin";

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
