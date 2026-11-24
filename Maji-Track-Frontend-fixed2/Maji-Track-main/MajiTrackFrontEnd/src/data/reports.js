import { apiRequest } from "../services/api";

export const getReports = (districtId) =>
  apiRequest(`/reports${districtId ? `?district_id=${districtId}` : ""}`);

export const getReport = (id) => apiRequest(`/reports/${id}`);

export const submitReport = (data) =>
  apiRequest("/submissions", { method: "POST", body: JSON.stringify(data) });

export const updateReport = (id, data) =>
  apiRequest(`/submissions/${id}`, {
    method: "PATCH",
    body: JSON.stringify(data),
  });

export const deleteReport = (id) =>
  apiRequest(`/submissions/${id}`, { method: "DELETE" });
