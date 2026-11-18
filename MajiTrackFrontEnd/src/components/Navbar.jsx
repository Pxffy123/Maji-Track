import { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { Droplets, Menu, X } from "lucide-react";

const links = [
  { to: "/dashboard", label: "Dashboard" },
  { to: "/report", label: "Report shortage" },
  { to: "/admin", label: "Admin" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <nav className="navbar" aria-label="Main">
      <div className="navbar-inner">
        <Link to="/" className="navbar-logo" onClick={close}>
          <Droplets size={24} aria-hidden="true" />
          Maji Track
        </Link>

        <button
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
          <NavLink to="/login" onClick={close} className="nav-link">
            Log in
          </NavLink>
          <NavLink to="/signup" onClick={close} className="nav-link nav-cta">
            Sign up
          </NavLink>
        </div>
      </div>
    </nav>
  );
}