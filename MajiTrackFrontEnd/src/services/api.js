// One place for the API address and the login token, so every page agrees.
// Set VITE_API_BASE_URL in .env to point at a different backend.
export const API_BASE =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5555/api";

const TOKEN_KEY = "access_token";
const USER_KEY = "user";

export const getToken = () => localStorage.getItem(TOKEN_KEY);

export function getUser() {
  try {
    return JSON.parse(localStorage.getItem(USER_KEY) || "null");
  } catch {
    return null;
  }
}

export function saveSession(token, user) {
  if (token) localStorage.setItem(TOKEN_KEY, token);
  if (user) localStorage.setItem(USER_KEY, JSON.stringify(user));
}

export function clearSession() {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
}

export async function apiRequest(path, options = {}) {
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
      "Cannot reach the server. Check that the backend is running."
    );
    error.status = 0;
    throw error;
  }

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    const error = new Error(
      data.error || data.message || data.msg || "Something went wrong."
    );
    error.status = response.status;
    throw error;
  }

  return data;
}
