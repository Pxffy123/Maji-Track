
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
    <main>
      <header>
        <div>
          <h1>
            <Droplets size={25} /> Maji-Track
          </h1>
          <h2>Admin Dashboard</h2>
          <p>
            Review and manage community water shortage reports.
          </p>
        </div>

        <div>
          <button onClick={loadReports}>
            <RefreshCw size={16} /> Refresh
          </button>
          <Link to="/dashboard">
            Dashboard
          </Link>
        </div>
      </header>

      <section>
        <h2>Pending Reports ({reports.length})</h2>

        {message && <p>{message}</p>}

        {error && <p>{error}</p>}

        {loading ? (
          <p>Loading reports...</p>
        ) : reports.length === 0 && !error ? (
          <p>No pending reports to review.</p>
        ) : (
          <div>
            {reports.map((report) => (
              <article key={report.id}>
                <div>
                  <h3>
                    {report.location || "Unknown location"}
                  </h3>
                  <strong>
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

                <p>
                  {report.description || "No description provided."}
                </p>

                {report.image_url && (
                  <img
                    src={report.image_url}
                    alt="Submitted water shortage evidence"
                  />
                )}

                <p>
                  Submitted: {report.created_at
                    ? new Date(report.created_at).toLocaleString()
                    : "Date unavailable"}
                </p>

                <div>
                  <button
                    disabled={busyId === report.id}
                    onClick={() => reviewReport(report.id, "approve")}
                  >
                    <CheckCircle size={16} />
                    Approve
                  </button>

                  <button
                    disabled={busyId === report.id}
                    onClick={() => reviewReport(report.id, "reject")}
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
