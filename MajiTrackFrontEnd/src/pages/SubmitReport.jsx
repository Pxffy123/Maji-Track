import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import { submitReport } from "../data/reports";
import { apiRequest, getToken } from "../services/api";

const SEVERITIES = ["Critical", "High", "Moderate", "Low"];
const UNITS = ["days", "weeks", "months"];

const empty = {
  district_id: "",
  location: "",
  severity: "",
  amount: "",
  unit: "weeks",
  description: "",
};

export default function SubmitReport() {
  const [districts, setDistricts] = useState([]);
  const [form, setForm] = useState(empty);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState({ type: "", message: "" });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    apiRequest("/districts")
      .then((data) =>
        setDistricts(
          Array.isArray(data) ? data : data.districts || data.data || []
        )
      )
      .catch(() =>
        setStatus({ type: "error", message: "Could not load districts." })
      );
  }, []);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function validate() {
    const e = {};
    if (!form.district_id) e.district_id = "Select a district.";
    if (!form.location.trim()) e.location = "Enter the location.";
    if (!form.severity) e.severity = "Select a severity.";
    if (!form.amount || Number(form.amount) <= 0) e.amount = "Enter how long without water.";
    if (form.description.trim().length < 10)
      e.description = "Describe the problem (at least 10 characters).";
    return e;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus({ type: "", message: "" });

    const found = validate();
    setErrors(found);
    if (Object.keys(found).length > 0) return;

    if (!getToken()) {
      setStatus({ type: "error", message: "Please log in to submit a report." });
      return;
    }

    setSubmitting(true);
    try {
      await submitReport({
        district_id: Number(form.district_id),
        location: form.location.trim(),
        severity: form.severity,
        time_without_water: `${form.amount} ${form.unit}`,
        description: form.description.trim(),
      });
      setForm(empty);
      setStatus({
        type: "success",
        message: "Report submitted. It will appear once an admin approves it.",
      });
    } catch (err) {
      setStatus({ type: "error", message: err.message });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
    <Navbar />
    <main className="submit-report">
      <h1>Report a Water Shortage</h1>

      {status.message && <p className={`message ${status.type}`}>{status.message}</p>}
      {status.message === "Please log in to submit a report." && (
        <p>
          <Link to="/login">Go to login</Link>
        </p>
      )}

      <form onSubmit={handleSubmit} noValidate>
        <label>
          District
          <select name="district_id" value={form.district_id} onChange={handleChange}>
            <option value="">Select a district</option>
            {districts.map((d) => (
              <option key={d.id} value={d.id}>{d.name}</option>
            ))}
          </select>
          {errors.district_id && <span className="error">{errors.district_id}</span>}
        </label>

        <label>
          Location
          <input
            name="location"
            value={form.location}
            onChange={handleChange}
            placeholder="e.g. Umoja 1"
          />
          {errors.location && <span className="error">{errors.location}</span>}
        </label>

        <label>
          Severity
          <select name="severity" value={form.severity} onChange={handleChange}>
            <option value="">Select severity</option>
            {SEVERITIES.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
          {errors.severity && <span className="error">{errors.severity}</span>}
        </label>

        <label>
          Time without water
          <div className="duration">
            <input
              type="number"
              min="1"
              name="amount"
              value={form.amount}
              onChange={handleChange}
            />
            <select name="unit" value={form.unit} onChange={handleChange}>
              {UNITS.map((u) => (
                <option key={u} value={u}>{u}</option>
              ))}
            </select>
          </div>
          {errors.amount && <span className="error">{errors.amount}</span>}
        </label>

        <label>
          Description
          <textarea
            name="description"
            rows="4"
            value={form.description}
            onChange={handleChange}
          />
          {errors.description && <span className="error">{errors.description}</span>}
        </label>

        <button type="submit" disabled={submitting}>
          {submitting ? "Submitting..." : "Submit Report"}
        </button>
      </form>
    </main>
    </>
  );
}