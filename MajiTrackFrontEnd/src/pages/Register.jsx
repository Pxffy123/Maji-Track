 import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Droplets } from "lucide-react";

const API_URL =
  import.meta.env.VITE_API_URL || "http://127.0.0.1:5555/api";

async function apiRequest(endpoint, options = {}) {
  const token = localStorage.getItem("access_token");

  const response = await fetch(`${API_URL}${endpoint}`, {
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

function Register() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [registerForm, setRegisterForm] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [registerMessage, setRegisterMessage] = useState("");
  const [verificationMessage, setVerificationMessage] = useState("");
  const [verificationError, setVerificationError] = useState("");

  const [showVerification, setShowVerification] = useState(false);
  const [verificationEmail, setVerificationEmail] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [verificationComplete, setVerificationComplete] = useState(false);

  function handleRegisterChange(e) {
    setRegisterForm({
      ...registerForm,
      [e.target.name]: e.target.value,
    });
  }

  async function handleRegister(e) {
    e.preventDefault();

    setRegisterMessage("");
    setVerificationMessage("");
    setVerificationError("");

    if (registerForm.password !== registerForm.confirmPassword) {
      setRegisterMessage("Passwords do not match.");
      return;
    }

    if (registerForm.password.length < 8) {
      setRegisterMessage("Password must be at least 8 characters.");
      return;
    }

    setLoading(true);

    try {
      const data = await apiRequest("/auth/register", {
        method: "POST",
        body: JSON.stringify({
          username: registerForm.username.trim(),
          email: registerForm.email.trim(),
          password: registerForm.password,
        }),
      });

      setVerificationEmail(registerForm.email.trim());
      setVerificationCode("");
      setShowVerification(true);
      setVerificationComplete(false);

      setVerificationMessage(
        data.message ||
        "Your account has been created. Check your email for your verification code."
      );

      setRegisterForm({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
    } catch (error) {
      setRegisterMessage(error.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleVerifyEmail(e) {
    e.preventDefault();

    setVerificationError("");

    if (!/^\d{6}$/.test(verificationCode)) {
      setVerificationError("Please enter a valid 6-digit code.");
      return;
    }

    setLoading(true);

    try {
      const data = await apiRequest("/auth/verify-email", {
        method: "POST",
        body: JSON.stringify({
          email: verificationEmail,
          code: verificationCode,
        }),
      });

      setShowVerification(false);
      setVerificationComplete(true);
      setVerificationCode("");

      setVerificationMessage(
        data.message ||
        "Email verified successfully. You can now log in."
      );
    } catch (error) {
      setVerificationError(error.message);
    } finally {
      setLoading(false);
    }
  }

  function goToLogin() {
    navigate("/login");
  }

  return (
    <section
      className="section account-section register-section"
      id="register"
    >
      <div className="account-card">
        <div className="account-icon">
          <Droplets size={35} />
        </div>

        <h2>Create Your Account</h2>
        <p>Join Maji-Track and help improve water services.</p>

        {verificationComplete ? (
          <div>
            <p className="form-message success" role="status">
              {verificationMessage}
            </p>

            <button
              type="button"
              className="primary-btn full-btn"
              onClick={goToLogin}
            >
              Go to Login
            </button>
          </div>
        ) : showVerification ? (
          <div>
            <p>{verificationMessage}</p>

            <p>
              Verification email: <strong>{verificationEmail}</strong>
            </p>

            <form onSubmit={handleVerifyEmail}>
              <input
                type="text"
                placeholder="Enter your 6-digit verification code"
                value={verificationCode}
                onChange={(e) =>
                  setVerificationCode(
                    e.target.value.replace(/\D/g, "").slice(0, 6)
                  )
                }
                inputMode="numeric"
                autoComplete="one-time-code"
                maxLength={6}
                required
              />

              {verificationError && (
                <p className="form-message error" role="alert">
                  {verificationError}
                </p>
              )}

              <button
                type="submit"
                className="primary-btn full-btn"
                disabled={loading || verificationCode.length !== 6}
              >
                {loading ? "Verifying..." : "Verify Email"}
              </button>
            </form>
          </div>
        ) : (
          <>
            <form onSubmit={handleRegister}>
              <input
                type="text"
                name="username"
                placeholder="Username"
                value={registerForm.username}
                onChange={handleRegisterChange}
                autoComplete="username"
                minLength={3}
                required
              />

              <input
                type="email"
                name="email"
                placeholder="Email address"
                value={registerForm.email}
                onChange={handleRegisterChange}
                autoComplete="email"
                required
              />

              <input
                type="password"
                name="password"
                placeholder="Create password (minimum 8 characters)"
                value={registerForm.password}
                onChange={handleRegisterChange}
                autoComplete="new-password"
                minLength={8}
                required
              />

              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm password"
                value={registerForm.confirmPassword}
                onChange={handleRegisterChange}
                autoComplete="new-password"
                minLength={8}
                required
              />

              {registerMessage && (
                <p className="form-message error" role="alert">
                  {registerMessage}
                </p>
              )}

              <button
                type="submit"
                className="primary-btn full-btn"
                disabled={loading}
              >
                {loading ? "Creating account..." : "Create Account"}
              </button>
            </form>

            <p className="account-switch">
              Already have an account?{" "}
              <a href="/login" onClick={(e) => {
                e.preventDefault();
                navigate("/login");
              }}>
                Login here
              </a>
            </p>
          </>
        )}

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

export default Register;
