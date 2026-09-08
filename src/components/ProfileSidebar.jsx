import React from "react";
import "../styles/ProfileSidebar.css";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

// Only real, working destinations — no dead/static entries.
const MAIN_MENU = [
  { icon: "fa-solid fa-chart-line", label: "Dashboard", to: "/dashboard" },
  { icon: "fa-solid fa-house", label: "Home", to: "/" },
  { icon: "fa-solid fa-book-open", label: "Courses", to: "/course" },
  { icon: "fa-solid fa-code", label: "Compilers", to: "/compiler" },
  { icon: "fa-solid fa-gamepad", label: "Fun Zone", to: "/funzone" },
];

const LEARN_TRACKS = [
  { icon: "fa-brands fa-html5", label: "HTML", to: "/html-course" },
  { icon: "fa-brands fa-css3-alt", label: "CSS", to: "/css-course" },
  { icon: "fa-brands fa-js", label: "JavaScript", to: "/js-course" },
  { icon: "fa-solid fa-folder-tree", label: "DSA", to: "/dsa-course" },
];

const ProfileSidebar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/signin", { replace: true });
  };

  const linkClass = ({ isActive }) => `sidebar-link ${isActive ? "active" : ""}`;

  return (
    <div className="rectangle">
      {/* Profile card */}
      <div className="card">
        <div className="user-wrapper">
          <img
            src={user?.profileImage || "/images/user.png"}
            className="user"
            alt="User Profile"
          />
        </div>
        <div className="card-meta">
          <h3>{user?.username || "Welcome"}</h3>
          <p>Keep Learning 🚀</p>
        </div>
      </div>

      {/* Main menu */}
      <div className="dashboard sidebar-section">
        <h5>Main Menu</h5>
        {MAIN_MENU.map((item) => (
          <NavLink key={item.to} to={item.to} end={item.to === "/"} className={linkClass}>
            <i className={item.icon}></i>
            <span>{item.label}</span>
          </NavLink>
        ))}
      </div>

      {/* Learning tracks */}
      <div className="courses-path sidebar-section">
        <h5>My Learning</h5>
        {LEARN_TRACKS.map((item) => (
          <NavLink key={item.to} to={item.to} className={linkClass}>
            <i className={item.icon}></i>
            <span>{item.label}</span>
          </NavLink>
        ))}
      </div>

      {/* Account */}
      <div className="account sidebar-section">
        <h5>Account</h5>
        <NavLink to="/settings" className={linkClass}>
          <i className="fa-solid fa-gear"></i>
          <span>Settings</span>
        </NavLink>
        <button type="button" className="sidebar-link sidebar-logout" onClick={handleLogout}>
          <i className="fa-solid fa-arrow-right-from-bracket"></i>
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default ProfileSidebar;
