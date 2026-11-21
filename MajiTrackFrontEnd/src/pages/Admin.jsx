import React, { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CheckCircle, XCircle, RefreshCw, Droplets } from "lucide-react";
import Navbar from "../components/Navbar";
import SeverityBadge from "../components/SeverityBadge";
import { apiRequest, getToken } from "../services/api";

export default function Admin() {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [busyId, setBusyId] = useState(null);

  const loadReports = useCallback(async () => {
    setLoading(true);
    setError("");

    if (!getToken()) {
      setError("Please log in with an administrator account.");
      setLoading(false);
      return;
    }

    try {
      const body = await apiRequest("/admin/reports/pending");
      const items = Array.isArray(body)
        ? body
        : body.data || body.reports || [];
      setReports(items);
    } catch (err) {
      setError(
        err.status === 403
          ? "You do not have administrator access."
          : err.status === 401
          ? "Your session expired. Please log in again."
          : err.message
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadReports();
  }, [loadReports]);

  async function reviewReport(id, action) {
    setBusyId(id);
    setError("");
    setMessage("");

    try {
      await apiRequest(`/admin/reports/${id}/${action}`, { method: "PATCH" });

      setReports((current) => current.filter((report) => report.id !== id));
      setMessage(
        action === "approve"
          ? "Report approved successfully."
          : "Report rejected successfully."
      );
    } catch (err) {
      setError(err.message);
    } finally {
      setBusyId(null);
    }
  }

  return (
    <>
      <Navbar />
      <main style={{ maxWidth: "900px", margin: "0 auto", padding: "30px 20px" }}>
        <header>
          <div>
            <h1>
              <Droplets size={25} /> Maji-Track
            </h1>
            <h2>Admin Dashboard</h2>
            <p>Review and manage community water shortage reports.</p>
          </div>

          <div style={{ display: "flex", gap: "12px", margin: "14px 0" }}>
            <button type="button" onClick={loadReports}>
              <RefreshCw size={16} /> Refresh
            </button>
            <Link to="/dashboard">Dashboard</Link>
          </div>
        </header>

        <section>
          <h2>Pending Reports ({reports.length})</h2>

          {message && <p>{message}</p>}
          {error && <p style={{ color: "#b91c1c" }}>{error}</p>}

          {loading ? (
            <p>Loading reports...</p>
          ) : reports.length === 0 && !error ? (
            <p>No pending reports to review.</p>
          ) : (
            <div>
              {reports.map((report) => (
                <article
                  key={report.id}
                  style={{
                    border: "1px solid #e2e8f0",
                    borderRadius: "12px",
                    padding: "18px",
                    margin: "14px 0",
                    background: "#fff",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      gap: "10px",
                    }}
                  >
                    <h3>{report.location || "Unknown location"}</h3>
                    {report.severity ? (
                      <SeverityBadge level={report.severity} />
                    ) : (
                      <strong>Unspecified severity</strong>
                    )}
                  </div>

                  <p>
                    <strong>District:</strong>{" "}
                    {typeof report.district === "object"
                      ? report.district?.name
                      : report.district || report.district_name || "Not specified"}
                  </p>

                  <p>
                    <strong>Duration without water:</strong>{" "}
                    {report.time_without_water || "Not specified"}
                  </p>

                  <p>{report.description || "No description provided."}</p>

                  {report.image_url && (
                    <img
                      src={report.image_url}
                      alt="Submitted water shortage evidence"
                      style={{ maxWidth: "100%", borderRadius: "8px" }}
                    />
                  )}

                  <p>
                    Submitted:{" "}
                    {report.created_at
                      ? new Date(report.created_at).toLocaleString()
                      : "Date unavailable"}
                  </p>

                  <div style={{ display: "flex", gap: "10px" }}>
                    <button
                      type="button"
                      disabled={busyId === report.id}
                      onClick={() => reviewReport(report.id, "approve")}
                    >
                      <CheckCircle size={16} /> Approve
                    </button>
                    <button
                      type="button"
                      disabled={busyId === report.id}
                      onClick={() => reviewReport(report.id, "reject")}
                    >
                      <XCircle size={16} /> Reject
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </main>
    </>
  );
}
