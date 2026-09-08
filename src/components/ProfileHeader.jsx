import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../styles/ProfileHeader.css";

const NAV_LINKS = [
  { label: "Home", to: "/" },
  { label: "Courses", to: "/course" },
  { label: "Compilers", to: "/compiler" },
  { label: "Fun Zone", to: "/funzone" },
];

const MOBILE_LINKS = [{ label: "Dashboard", to: "/profile" }, ...NAV_LINKS];

const ProfileHeader = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return;
    const onPointerDown = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    const onKeyDown = (event) => {
      if (event.key === "Escape") setIsOpen(false);
    };
    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen]);

  return (
    <header>
      <div className="logo_container">
        <Link to="/">
          <div className="logo">
            <img src="/images/logo.png" alt="Logo" height="60px" className="Logo-demo" />
          </div>
        </Link>
      </div>

      <nav className="nav_bar">
        {NAV_LINKS.map((link) => (
          <Link key={link.to} to={link.to}>
            {link.label}
          </Link>
        ))}
      </nav>

      <div className="action_bar">
        <div className="user-name">
          <i className="fa-solid fa-circle-user fa-xl" style={{ color: "white" }}></i>
          <Link
            to="/profile"
            style={{
              color: "white",
              textDecoration: "none",
              fontWeight: 500,
              marginLeft: "2px",
            }}
          >
            {user?.username || "Profile"}
          </Link>
        </div>
      </div>

      <div className="menu_toggle" ref={containerRef}>
        <div className="menu_toggle_parent">
          <span
            className="material-symbols-outlined menu_toggle_icon"
            role="button"
            tabIndex={0}
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
            onClick={() => setIsOpen((open) => !open)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                setIsOpen((open) => !open);
              }
            }}
          >
            {isOpen ? "close" : "menu"}
          </span>

          {isOpen && (
            <div className="mobile_nav">
              {MOBILE_LINKS.map((link) => (
                <div
                  key={link.to}
                  className="nav-item"
                  onClick={() => {
                    navigate(link.to);
                    setIsOpen(false);
                  }}
                >
                  {link.label}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default ProfileHeader;
