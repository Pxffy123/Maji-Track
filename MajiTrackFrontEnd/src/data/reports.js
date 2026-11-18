const API = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

function authHeaders() {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
}

async function request(path, options = {}) {
  const res = await fetch(`${API}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...authHeaders(),
      ...options.headers,
    },
  });
  const body = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(body.error || "Request failed");
  return body;
}

export const getReports = (districtId) =>
  request(`/reports${districtId ? `?district_id=${districtId}` : ""}`);

export const getReport = (id) => request(`/reports/${id}`);

export const submitReport = (data) =>
  request("/submissions", { method: "POST", body: JSON.stringify(data) });

export const updateReport = (id, data) =>
  request(`/submissions/${id}`, { method: "PATCH", body: JSON.stringify(data) });

export const deleteReport = (id) =>
  request(`/submissions/${id}`, { method: "DELETE" });
