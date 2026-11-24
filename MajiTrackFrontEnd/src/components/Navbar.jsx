import React, { useState } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { Droplets, Menu, X } from "lucide-react";
import { getToken, getUser, clearSession } from "../services/api";

const baseLinks = [
  { to: "/dashboard", label: "Dashboard" },
  { to: "/submit-report", label: "Report shortage" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const loggedIn = Boolean(getToken());
  const isAdmin = loggedIn && getUser()?.role === "admin";
  const links = isAdmin
    ? [...baseLinks, { to: "/admin", label: "Admin" }]
    : baseLinks;
  const close = () => setOpen(false);

  function logout() {
    clearSession();
    close();
    navigate("/");
  }

  return (
    <nav className="navbar" aria-label="Main">
      <div className="navbar-inner">
        <Link to="/" className="navbar-logo" onClick={close}>
          <Droplets size={24} aria-hidden="true" />
          Maji Track
        </Link>

        <button
          type="button"
          className="navbar-toggle"
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          aria-label={open ? "Close menu" : "Open menu"}
        >
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>

        <div className={`navbar-links ${open ? "open" : ""}`}>
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              onClick={close}
              className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
            >
              {l.label}
            </NavLink>
          ))}

          {loggedIn ? (
            <button type="button" className="nav-link nav-cta" onClick={logout}>
              Log out
            </button>
          ) : (
            <>
              {/* Login and sign up live on the landing page */}
              <Link to="/login" onClick={close} className="nav-link">
                Log in
              </Link>
              <Link to="/register" onClick={close} className="nav-link nav-cta">
                Sign up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
