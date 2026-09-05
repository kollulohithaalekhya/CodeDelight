import React from "react";
import "../styles/ProfileSidebar.css";
import { Link } from "react-router-dom";

const ProfileSidebar = () => {
  return (
    <div className="rectangle">

      {/* ================= PROFILE CARD ================= */}
      <div className="card">
        <div className="user-wrapper">
          <img
            src="/images/user.png"
            className="user"
            alt="User Profile"
          />
        </div>
        <h3>Welcome</h3>
        <p>Keep Learning 🚀</p>
      </div>


      {/* ================= MAIN MENU ================= */}
      <div className="dashboard sidebar-section">
        <h5>Main Menu</h5>

        <Link to="/dashboard" className="sidebar-link">
          <h3>
            <i className="fa-solid fa-chart-line"></i>
            <span>Dashboard</span>
          </h3>
        </Link>

        <h3>
          <i className="fa-regular fa-user"></i>
          <span>Company Profile</span>
        </h3>

        <h3>
          <i className="fa-solid fa-house"></i>
          <span>Home</span>
        </h3>

        <h3>
          <i className="fa-solid fa-bell"></i>
          <span>Notifications</span>
        </h3>
      </div>


      {/* ================= COURSES ================= */}
      <div className="courses-path sidebar-section">
        <h5>Courses Path</h5>

        <h3>
          <i className="fa-brands fa-html5"></i>
          <span>HTML</span>
        </h3>

        <h3>
          <i className="fa-brands fa-css3-alt"></i>
          <span>CSS</span>
        </h3>

        <h3>
          <i className="fa-brands fa-js"></i>
          <span>JavaScript</span>
        </h3>

        <h3>
          <i className="fa-brands fa-bootstrap"></i>
          <span>Bootstrap</span>
        </h3>

        <h3>
          <i className="fa-brands fa-react"></i>
          <span>React JS</span>
        </h3>

        <h3>
          <i className="fa-brands fa-node-js"></i>
          <span>Node JS</span>
        </h3>

        <h3>
          <i className="fa-solid fa-server"></i>
          <span>Express JS</span>
        </h3>

        <h3>
          <i className="fa-solid fa-database"></i>
          <span>MongoDB</span>
        </h3>

        <h3>
          <i className="fa-solid fa-folder-tree"></i>
          <span>DSA</span>
        </h3>

        <h3>
          <i className="fa-solid fa-code"></i>
          <span>TypeScript</span>
        </h3>

        <h3>
          <i className="fa-solid fa-code"></i>
          <span>SQL</span>
        </h3>

        <h3>
          <i className="fa-solid fa-code"></i>
          <span>Dart</span>
        </h3>
      </div>


      {/* ================= PRACTICE ================= */}


      {/* ================= PROJECTS ================= */}
      {/* <div className="projects sidebar-section">
        <h5>Projects</h5>

        <h3>
          <i className="fa-solid fa-folder-open"></i>
          <span>My Projects</span>
        </h3>

        <h3>
          <i className="fa-solid fa-plus"></i>
          <span>Create Project</span>
        </h3>

        <h3>
          <i className="fa-brands fa-github"></i>
          <span>GitHub Projects</span>
        </h3>

        <h3>
          <i className="fa-solid fa-rocket"></i>
          <span>Project Showcase</span>
        </h3>
      </div> */}


      {/* ================= COMMUNITY ================= */}
      <div className="community sidebar-section">
        <h5>Community</h5>

        <h3>
          <i className="fa-solid fa-user-group"></i>
          <span>Find a Mentor</span>
        </h3>

        <h3>
          <i className="fa-solid fa-handshake-simple"></i>
          <span>My Network</span>
        </h3>

        <h3>
          <i className="fa-solid fa-comments"></i>
          <span>Discussions</span>
        </h3>

        <h3>
          <i className="fa-solid fa-users"></i>
          <span>Study Groups</span>
        </h3>

        <h3>
          <i className="fa-solid fa-trophy"></i>
          <span>Leaderboard</span>
        </h3>
      </div>


      {/* ================= RESOURCES ================= */}
      {/* <div className="resources sidebar-section">
        <h5>Resources</h5>

        <h3>
          <i className="fa-solid fa-book"></i>
          <span>Documentation</span>
        </h3>

        <h3>
          <i className="fa-solid fa-link"></i>
          <span>Useful Links</span>
        </h3>

        <h3>
          <i className="fa-solid fa-code"></i>
          <span>Code Snippets</span>
        </h3>

        <h3>
          <i className="fa-solid fa-terminal"></i>
          <span>Developer Tools</span>
        </h3>
      </div> */}


      {/* ================= ACCOUNT ================= */}
      <div className="account sidebar-section">
        <h5>Account</h5>

        <h3>
          <i className="fa-solid fa-gear"></i>
          <Link
            to="/settings"
            className="settings"
          >
            Settings
          </Link>
        </h3>

        <h3>
          <i className="fa-solid fa-shield-halved"></i>
          <span>Privacy</span>
        </h3>

        <h3>
          <i className="fa-solid fa-circle-question"></i>
          <span>Help & Support</span>
        </h3>

        <h3>
          <i className="fa-solid fa-arrow-right-from-bracket"></i>
          <Link
            to="/logout"
            className="logout"
          >
            Logout
          </Link>
        </h3>
      </div>

    </div>
  );
};

export default ProfileSidebar;