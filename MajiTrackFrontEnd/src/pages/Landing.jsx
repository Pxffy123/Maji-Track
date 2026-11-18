import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Droplets,
  MapPin,
  ShieldCheck,
  Activity,
  Waves,
  AlertTriangle,
  Users,
  CheckCircle,
  ArrowRight,
  Menu,
  X,
} from "lucide-react";
import "./style.css";

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
      data.error || data.message || data.msg || "Something went wrong."
    );
  }

  return data;
}

function Landing() {
  const navigate = useNavigate();

  const [mobileMenu, setMobileMenu] = useState(false);
  const [loading, setLoading] = useState(false);

  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });

  const [registerForm, setRegisterForm] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [loginMessage, setLoginMessage] = useState("");
  const [registerMessage, setRegisterMessage] = useState("");

  const [loginMessageType, setLoginMessageType] = useState("");
  const [registerMessageType, setRegisterMessageType] = useState("");

  function handleLoginChange(e) {
    setLoginForm({
      ...loginForm,
      [e.target.name]: e.target.value,
    });
  }

  function handleRegisterChange(e) {
    setRegisterForm({
      ...registerForm,
      [e.target.name]: e.target.value,
    });
  }

  async function handleRegister(e) {
    e.preventDefault();

    setRegisterMessage("");
    setRegisterMessageType("");

    if (registerForm.password !== registerForm.confirmPassword) {
      setRegisterMessage("Passwords do not match.");
      setRegisterMessageType("error");
      return;
    }

    setLoading(true);

    try {
      const data = await apiRequest("/auth/register", {
        method: "POST",
        body: JSON.stringify({
          username: registerForm.username,
          email: registerForm.email,
          password: registerForm.password,
        }),
      });

      setRegisterMessage(
        data.message || "Registration successful. You can now log in."
      );
      setRegisterMessageType("success");

      setRegisterForm({
        username: "",
        email: registerForm.email,
        password: "",
        confirmPassword: "",
      });
    } catch (error) {
      setRegisterMessage(error.message);
      setRegisterMessageType("error");
    } finally {
      setLoading(false);
    }
  }

  async function handleLogin(e) {
    e.preventDefault();

    setLoginMessage("");
    setLoginMessageType("");
    setLoading(true);

    try {
      const data = await apiRequest("/auth/login", {
        method: "POST",
        body: JSON.stringify(loginForm),
      });

      if (data.access_token) {
        localStorage.setItem("access_token", data.access_token);
      }

      if (data.user) {
        localStorage.setItem("user", JSON.stringify(data.user));
      }

      if (!data.access_token) {
        throw new Error(
          "Login response did not include an access token. Please check the backend login response."
        );
      }

      navigate("/dashboard");
    } catch (error) {
      setLoginMessage(error.message);
      setLoginMessageType("error");
    } finally {
      setLoading(false);
    }
  }

  function closeMenu() {
    setMobileMenu(false);
  }

  return (
    <div className="landing-page">
      {/* NAVBAR */}
      <nav className="navbar">
        <a href="#home" className="logo" onClick={closeMenu}>
          <Droplets size={28} />
          <span>Maji-Track</span>
        </a>

        <button
          className="menu-toggle"
          onClick={() => setMobileMenu(!mobileMenu)}
          aria-label="Toggle navigation menu"
          aria-expanded={mobileMenu}
        >
          {mobileMenu ? <X size={25} /> : <Menu size={25} />}
        </button>

        <div className={`nav-links ${mobileMenu ? "active" : ""}`}>
          <a href="#home" onClick={closeMenu}>Home</a>
          <a href="#about" onClick={closeMenu}>About</a>
          <a href="#services" onClick={closeMenu}>Services</a>
          <a href="#how-it-works" onClick={closeMenu}>How It Works</a>
          <a href="#login" onClick={closeMenu}>Login</a>
          <a href="#register" className="nav-register" onClick={closeMenu}>
            Get Started
          </a>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section className="hero" id="home">
        <div className="hero-content">
          <p className="eyebrow">Water Management Made Easier</p>

          <h1>
            Every Drop Matters.
            <br />
            Every Community Counts.
          </h1>

          <p>
            Maji-Track helps communities report water problems, follow up on
            reports and stay informed about water services.
          </p>

          <div className="hero-buttons">
            <a href="#register" className="primary-btn">
              Get Started <ArrowRight size={18} />
            </a>

            <a href="#about" className="secondary-btn">
              Learn More
            </a>
          </div>

          <div className="hero-trust">
            <span><CheckCircle size={17} /> Easy Reporting</span>
            <span><CheckCircle size={17} /> Community Support</span>
          </div>
        </div>

        <div className="hero-icon">
          <Droplets size={100} />
        </div>
      </section>

      {/* ABOUT / PROBLEM SECTION */}
      <section className="section problem-section" id="about">
        <p className="section-label">THE PROBLEM</p>
        <h2>Why Maji-Track?</h2>

        <p className="section-description">
          Water problems affect many communities. Reporting these issues and
          getting updates can sometimes be difficult.
        </p>

        <div className="card-grid">
          <div className="feature-card">
            <AlertTriangle size={35} />
            <h3>Water Challenges</h3>
            <p>
              Communities experience water shortages, leaks and other water
              supply problems.
            </p>
          </div>

          <div className="feature-card">
            <Activity size={35} />
            <h3>Slow Follow-ups</h3>
            <p>
              People may struggle to know whether their reported issues are
              being handled.
            </p>
          </div>

          <div className="feature-card">
            <Users size={35} />
            <h3>Community Needs</h3>
            <p>
              Communities need a simple way to share concerns and stay
              connected with water service providers.
            </p>
          </div>
        </div>
      </section>

      {/* SOLUTION SECTION */}
      <section className="section solution-section">
        <div className="solution-content">
          <p className="section-label">OUR SOLUTION</p>
          <h2>A Better Way to Manage Water Reports</h2>

          <p>
            Maji-Track provides a platform where users can report water-related
            issues and follow their progress.
          </p>

          <div className="solution-list">
            <div>
              <CheckCircle size={21} />
              <span>Report water problems easily.</span>
            </div>

            <div>
              <CheckCircle size={21} />
              <span>Track submitted reports.</span>
            </div>

            <div>
              <CheckCircle size={21} />
              <span>Receive updates on report progress.</span>
            </div>

            <div>
              <CheckCircle size={21} />
              <span>Help administrators manage reports.</span>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES SECTION */}
      <section className="section features" id="services">
        <p className="section-label">WHAT WE OFFER</p>
        <h2>Our Services</h2>

        <p className="section-description">
          Simple tools to make water issue reporting and management easier.
        </p>

        <div className="card-grid">
          <div className="feature-card">
            <Waves size={35} />
            <h3>Water Reporting</h3>
            <p>Submit reports about water shortages, leaks and other issues.</p>
          </div>

          <div className="feature-card">
            <Activity size={35} />
            <h3>Report Tracking</h3>
            <p>Follow the progress of your submitted water reports.</p>
          </div>

          <div className="feature-card">
            <ShieldCheck size={35} />
            <h3>Admin Management</h3>
            <p>Administrators can review and manage community reports.</p>
          </div>

          <div className="feature-card">
            <MapPin size={35} />
            <h3>Community Awareness</h3>
            <p>Help communities stay informed about water-related issues.</p>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="section how-section" id="how-it-works">
        <p className="section-label">GETTING STARTED</p>
        <h2>How Maji-Track Works</h2>

        <div className="steps-grid">
          <div className="step-card">
            <span className="step-number">01</span>
            <h3>Create an Account</h3>
            <p>Register to access the Maji-Track platform.</p>
          </div>

          <div className="step-card">
            <span className="step-number">02</span>
            <h3>Submit a Report</h3>
            <p>Tell us about a water problem in your community.</p>
          </div>

          <div className="step-card">
            <span className="step-number">03</span>
            <h3>Admin Review</h3>
            <p>Administrators review and respond to submitted reports.</p>
          </div>

          <div className="step-card">
            <span className="step-number">04</span>
            <h3>Track Progress</h3>
            <p>Check the status of your report.</p>
          </div>
        </div>
      </section>

      {/* IMPACT SECTION */}
      <section className="section impact-section">
        <div className="impact-content">
          <Droplets size={45} />
          <h2>Working Together for Better Water Services</h2>
          <p>
            Our goal is to make it easier for communities to report water
            problems and for administrators to respond to them.
          </p>
          <a href="#register" className="primary-btn">
            Join Maji-Track <ArrowRight size={18} />
          </a>
        </div>
      </section>

      {/* LOGIN AND REGISTER */}
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
              required
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              value={loginForm.password}
              onChange={handleLoginChange}
              required
            />

            {loginMessage && (
              <p className={`form-message ${loginMessageType}`}>
                {loginMessage}
              </p>
            )}

            <button type="submit" className="primary-btn full-btn" disabled={loading}>
              {loading ? "Please wait..." : "Login"}
            </button>
          </form>

          <p className="account-switch">
            Don't have an account? <a href="#register">Register here</a>
          </p>
        </div>
      </section>

      <section className="section account-section register-section" id="register">
        <div className="account-card">
          <div className="account-icon">
            <Droplets size={35} />
          </div>

          <h2>Create Your Account</h2>
          <p>Join Maji-Track and help improve water services.</p>

          <form onSubmit={handleRegister}>
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={registerForm.username}
              onChange={handleRegisterChange}
              required
            />

            <input
              type="email"
              name="email"
              placeholder="Email address"
              value={registerForm.email}
              onChange={handleRegisterChange}
              required
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              value={registerForm.password}
              onChange={handleRegisterChange}
              required
              minLength="8"
            />

            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm password"
              value={registerForm.confirmPassword}
              onChange={handleRegisterChange}
              required
              minLength="8"
            />

            {registerMessage && (
              <p className={`form-message ${registerMessageType}`}>
                {registerMessage}
              </p>
            )}

            <button type="submit" className="primary-btn full-btn" disabled={loading}>
              {loading ? "Please wait..." : "Create Account"}
            </button>
          </form>

          <p className="account-switch">
            Already have an account? <a href="#login">Login here</a>
          </p>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-brand">
            <h3><Droplets size={22} /> Maji-Track</h3>
            <p>Making water reporting easier for every community.</p>
          </div>

          <div className="footer-links">
            <h4>Quick Links</h4>
            <a href="#home">Home</a>
            <a href="#about">About</a>
            <a href="#services">Services</a>
            <a href="#how-it-works">How It Works</a>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} Maji-Track. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default Landing;
