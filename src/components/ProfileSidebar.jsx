import React from "react";
import "../styles/ProfileSidebar.css";
// import UserImage from "../assets/user.png";
import { Link } from "react-router-dom";

const ProfileSidebar = () => {
  return (
    <div className="rectangle">
      <div className="card">
        <div className="user">
          <img src="/images/user.png" className="user" alt="User Profile" />

        </div>
        <h3>Welcome</h3>
      </div>

      <div className="dashboard">
        <Link
          to="/dashboard"
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <h3>
            <i className="fa-solid fa-chart-line"></i> Dashboard
          </h3>
        </Link>

        <h3>
          <i className="fa-regular fa-user"></i> Company Profile
        </h3>
      </div>

      <div className="courses-path">
        <h5>Courses Path</h5>
        <h3>
          <i className="fa-brands fa-html5"></i> HTML
        </h3>
        <h3>
          <i className="fa-brands fa-css3"></i> CSS
        </h3>
        <h3>
          <i className="fa-brands fa-js"></i> JavaScript
        </h3>
        <h3>
          <i className="fa-brands fa-bootstrap"></i> Bootstrap
        </h3>
        <h3>
          <i className="fa-solid fa-folder-tree"></i> DSA
        </h3>
      </div>

      <div className="community">
        <h5>Community</h5>
        <h3>
          <i className="fa-solid fa-user-group"></i> Find a Mentor
        </h3>
        <h3>
          <i className="fa-solid fa-handshake-simple"></i> My Network
        </h3>
      </div>

      <div className="account">
        <h5>Account</h5>

        <h3>
          <i className="fa-solid fa-gear"></i>
          <Link to="/settings" className="settings">
            Settings
          </Link>
        </h3>

        <h3>
          <i className="fa-solid fa-arrow-right-from-bracket"></i>
          <Link to="/logout" className="logout">
            Logout
          </Link>
        </h3>
      </div>
    </div>
  );
};

export default ProfileSidebar;
