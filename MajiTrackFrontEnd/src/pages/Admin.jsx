
import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CheckCircle, XCircle, RefreshCw, Droplets } from "lucide-react";

const API =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5555/api";

export default function Admin() {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [busyId, setBusyId] = useState(null);

  const loadReports = useCallback(async () => {
    setLoading(true);
    setError("");

    const token = localStorage.getItem("token");

    if (!token) {
      setError("Please log in with an administrator account.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`${API}/admin/reports/pending`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const body = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(
          body.message || body.error ||
          (response.status === 403
            ? "You do not have administrator access."
            : "Could not load pending reports.")
        );
      }

      const items = Array.isArray(body)
        ? body
        : body.data || body.reports || [];

      setReports(items);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadReports();
  }, [loadReports]);

  async function reviewReport(id, action) {
    const token = localStorage.getItem("token");
    setBusyId(id);
    setError("");
    setMessage("");

    try {
      const response = await fetch(
        `${API}/admin/reports/${id}/${action}`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const body = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(body.message || body.error || "Action failed.");
      }

      setReports((current) =>
        current.filter((report) => report.id !== id)
      );

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
    <main style={{
      minHeight: "100vh",
      background: "#f8fafc",
      padding: "30px 5%",
      fontFamily: "Arial, sans-serif",
      color: "#0f172a"
    }}>
      <header style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap",
        gap: "15px",
        marginBottom: "30px"
      }}>
        <div>
          <h1 style={{ color: "#0284c7", marginBottom: "5px" }}>
            <Droplets size={25} style={{ verticalAlign: "middle" }} /> Maji-Track
          </h1>
          <h2>Admin Dashboard</h2>
          <p style={{ color: "#64748b" }}>
            Review and manage community water shortage reports.
          </p>
        </div>

        <div style={{ display: "flex", gap: "12px" }}>
          <button onClick={loadReports} style={buttonStyle("#475569")}>
            <RefreshCw size={16} /> Refresh
          </button>
          <Link to="/dashboard" style={{
            ...buttonStyle("#0284c7"),
            textDecoration: "none"
          }}>
            Dashboard
          </Link>
        </div>
      </header>

      <section style={{
        background: "white",
        border: "1px solid #e2e8f0",
        borderRadius: "12px",
        padding: "22px"
      }}>
        <h2>Pending Reports ({reports.length})</h2>

        {message && (
          <p style={{ color: "#15803d" }}>{message}</p>
        )}

        {error && (
          <p style={{ color: "#dc2626" }}>{error}</p>
        )}

        {loading ? (
          <p>Loading reports...</p>
        ) : reports.length === 0 && !error ? (
          <p style={{ color: "#64748b" }}>
            No pending reports to review.
          </p>
        ) : (
          <div style={{
            display: "grid",
            gap: "18px",
            marginTop: "20px"
          }}>
            {reports.map((report) => (
              <article key={report.id} style={{
                border: "1px solid #e2e8f0",
                borderRadius: "10px",
                padding: "20px"
              }}>
                <div style={{
                  display: "flex",
                  justifyContent: "space-between",
                  flexWrap: "wrap",
                  gap: "10px"
                }}>
                  <h3 style={{ margin: 0 }}>
                    {report.location || "Unknown location"}
                  </h3>
                  <strong style={{ color: "#b45309" }}>
                    {report.severity || "Unspecified severity"}
                  </strong>
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

                <p style={{ lineHeight: 1.6 }}>
                  {report.description || "No description provided."}
                </p>

                {report.image_url && (
                  <img
                    src={report.image_url}
                    alt="Submitted water shortage evidence"
                    style={{
                      maxWidth: "100%",
                      maxHeight: "250px",
                      objectFit: "contain",
                      borderRadius: "8px"
                    }}
                  />
                )}

                <p style={{ color: "#64748b", fontSize: "13px" }}>
                  Submitted: {report.created_at
                    ? new Date(report.created_at).toLocaleString()
                    : "Date unavailable"}
                </p>

                <div style={{
                  display: "flex",
                  gap: "12px",
                  flexWrap: "wrap",
                  marginTop: "18px"
                }}>
                  <button
                    disabled={busyId === report.id}
                    onClick={() => reviewReport(report.id, "approve")}
                    style={buttonStyle("#15803d")}
                  >
                    <CheckCircle size={16} />
                    Approve
                  </button>

                  <button
                    disabled={busyId === report.id}
                    onClick={() => reviewReport(report.id, "reject")}
                    style={buttonStyle("#dc2626")}
                  >
                    <XCircle size={16} />
                    Reject
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}

function buttonStyle(background) {
  return {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "7px",
    padding: "10px 15px",
    background,
    color: "white",
    border: "none",
    borderRadius: "7px",
    cursor: "pointer",
    fontWeight: "600"
  };
}
