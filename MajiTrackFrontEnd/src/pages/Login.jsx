import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ShieldCheck } from "lucide-react";
import { apiRequest } from "../services/api";
import { apiRequest, saveSession } from "../services/api";



async function apiRequest(endpoint, options = {}) {
  const token = localStorage.getItem("access_token");

  const response = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(
      data.error ||
      data.message ||
      data.msg ||
      `Request failed (${response.status}).`
    );
  }

  return data;
}

function Login() {
  const navigate = useNavigate();

  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });

  const [loginMessage, setLoginMessage] = useState("");
  const [loading, setLoading] = useState(false);

  function handleLoginChange(e) {
    setLoginForm({
      ...loginForm,
      [e.target.name]: e.target.value,
    });
  }

  async function handleLogin(e) {
    e.preventDefault();

    setLoginMessage("");
    setLoading(true);

    try {
      const data = await apiRequest("/auth/login", {
        method: "POST",
        body: JSON.stringify({
          email: loginForm.email.trim(),
          password: loginForm.password,
        }),
      });

      const token = data.access_token || data.token;

      if (!token) {
        throw new Error(
          "The backend did not return an access token. Check your login API response."
        );
      }

      saveSession(token, data.user, data.refresh_token);


      setLoginForm({
        email: "",
        password: "",
      });

      navigate("/dashboard");
    } catch (error) {
      setLoginMessage(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="section account-section" id="login">
      <div className="account-card">
        <div className="account-icon">
          <ShieldCheck size={35} />
        </div>

        <h2>Welcome Back</h2>
        <p>Log in to your Maji-Track account.</p>

        <form onSubmit={handleLogin}>
          <input
            type="email"
            name="email"
            placeholder="Email address"
            value={loginForm.email}
            onChange={handleLoginChange}
            autoComplete="email"
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={loginForm.password}
            onChange={handleLoginChange}
            autoComplete="current-password"
            required
          />

          {loginMessage && (
            <p className="form-message error" role="alert">
              {loginMessage}
            </p>
          )}

          <button
            type="submit"
            className="primary-btn full-btn"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="account-switch">
          Don't have an account?{" "}
          <a href="/register" onClick={(e) => {
            e.preventDefault();
            navigate("/register");
          }}>
            Register here
          </a>
        </p>

        <p className="account-switch">
          <a href="/" onClick={(e) => {
            e.preventDefault();
            navigate("/");
          }}>
            Back to Home
          </a>
        </p>
      </div>
    </section>
  );
}

export default Login;
