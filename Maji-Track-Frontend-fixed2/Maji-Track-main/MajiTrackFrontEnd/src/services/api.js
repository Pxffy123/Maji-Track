// One place for the API address and the login session, so every page agrees.
// Set VITE_API_BASE_URL in .env (must end with /api) to point at your backend,
// e.g. https://your-app.up.railway.app/api
export const API_BASE =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5555/api";

const TOKEN_KEY = "access_token";
const REFRESH_KEY = "refresh_token";
const USER_KEY = "user";

export const getToken = () => localStorage.getItem(TOKEN_KEY);

export function getUser() {
  try {
    return JSON.parse(localStorage.getItem(USER_KEY) || "null");
  } catch {
    return null;
  }
}

export function saveSession(token, user, refreshToken) {
  if (token) localStorage.setItem(TOKEN_KEY, token);
  if (refreshToken) localStorage.setItem(REFRESH_KEY, refreshToken);
  if (user) localStorage.setItem(USER_KEY, JSON.stringify(user));
}

export function clearSession() {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(REFRESH_KEY);
  localStorage.removeItem(USER_KEY);
}

// Access tokens last 1 hour on the backend; use the refresh token to get a new one.
async function refreshAccessToken() {
  const refreshToken = localStorage.getItem(REFRESH_KEY);
  if (!refreshToken) return false;

  try {
    const response = await fetch(`${API_BASE}/auth/refresh`, {
      method: "POST",
      headers: { Authorization: `Bearer ${refreshToken}` },
    });
    if (!response.ok) return false;

    const data = await response.json();
    if (!data.access_token) return false;

    localStorage.setItem(TOKEN_KEY, data.access_token);
    return true;
  } catch {
    return false;
  }
}

export async function apiRequest(path, options = {}, hasRetried = false) {
  const token = getToken();

  let response;
  try {
    response = await fetch(`${API_BASE}${path}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...options.headers,
      },
    });
  } catch {
    const error = new Error(
      "Cannot reach the server. Check your connection and try again."
    );
    error.status = 0;
    throw error;
  }

  // Expired access token: refresh once and retry the request.
  if (
    response.status === 401 &&
    token &&
    !hasRetried &&
    !path.startsWith("/auth/")
  ) {
    if (await refreshAccessToken()) {
      return apiRequest(path, options, true);
    }
    clearSession();
  }

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    // No readable message from the server (e.g. an HTML error page): say what
    // happened so it can be diagnosed instead of a vague "something went wrong".
    let fallback = `Request failed (HTTP ${response.status}).`;
    if (response.status === 404) {
      fallback += " The API address may be wrong. Check VITE_API_BASE_URL ends with /api.";
    } else if (response.status >= 500) {
      fallback += " The server hit an error. Check the backend logs.";
    }

    const error = new Error(data.error || data.message || data.msg || fallback);
    error.status = response.status;
    throw error;
  }

  return data;
}
