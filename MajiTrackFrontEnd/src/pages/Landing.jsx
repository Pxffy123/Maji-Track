import React, { useState } from "react";
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

function Landing() {
  const [mobileMenu, setMobileMenu] = useState(false);

  function closeMenu() {
    setMobileMenu(false);
  }

  return (
    <div className="landing-page">
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
          <a href="/login" onClick={closeMenu}>Login</a>
          <a
            href="/register"
            className="nav-register"
            onClick={closeMenu}
          >
            Get Started
          </a>
        </div>
      </nav>

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
            <a href="/register" className="primary-btn">
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

      <section className="section impact-section">
        <div className="impact-content">
          <Droplets size={45} />
          <h2>Working Together for Better Water Services</h2>
          <p>
            Our goal is to make it easier for communities to report water
            problems and for administrators to respond to them.
          </p>

          <a href="/register" className="primary-btn">
            Join Maji-Track <ArrowRight size={18} />
          </a>
        </div>
      </section>

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
          <p>
            © {new Date().getFullYear()} Maji-Track. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default Landing;
