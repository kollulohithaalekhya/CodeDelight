import React from "react";
import "../styles/ProfileHeader.css";
// import logo from "../assets/logo3.png";

const ProfileHeader = () => {
  return (
    <header>
      <div className="logo_container">
        <a href="#">
          <div className="logo">
            <img src="/images/logo.png" alt="Logo" height="60px" className="Logo-demo"/>

          </div>
        </a>
      </div>

      <nav className="nav_bar">
        <a href="../html/homepage.html">Home</a>
        <a href="../html/scourses.html">Courses</a>
        <a href="../html/scompiler.html">Compilers</a>
        <a href="../html/sfunzone.html">Fun Zone</a>
      </nav>

      <div className="action_bar">
        <div className="user-name">
          <i
            className="fa-solid fa-circle-user fa-xl"
            style={{ color: "white" }}
          ></i>
          <a
            href="../html/profile.html"
            style={{
              color: "white",
              textDecoration: "none",
              fontWeight: 500,
              marginLeft: "2px",
            }}
          >
            Lakshan
          </a>
        </div>
      </div>

      <div className="menu_toggle">
        <div className="parent" style={{ position: "relative" }}>
          <span className="material-symbols-outlined">menu</span>
          <div className="mobile_nav" style={{ position: "absolute" }}>
            <div
              className="nav-item"
              onClick={() => (window.location.href = "../html/profile.html")}
            >
              Dashboard
            </div>
            <div
              className="nav-item"
              onClick={() => (window.location.href = "../html/homepage.html")}
            >
              Home
            </div>
            <div
              className="nav-item"
              onClick={() => (window.location.href = "../html/scourses.html")}
            >
              Courses
            </div>
            <div
              className="nav-item"
              onClick={() => (window.location.href = "../html/scompiler.html")}
            >
              Compilers
            </div>
            <div
              className="nav-item"
              onClick={() => (window.location.href = "../html/sfunzone.html")}
            >
              Fun Zone
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default ProfileHeader;
