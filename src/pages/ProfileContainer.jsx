import React, { useState } from "react";

import "../styles/ProfileContainer.css";

import ProfileHeader from "../components/ProfileHeader";
import ProfileSidebar from "../components/ProfileSidebar";
import ProfileSidebarRight from "../components/ProfileSidebarRight";
import ProfileFooter from "../components/ProfileFooter";
import ProfileMain from "./ProfileMain";
import { ProfileProvider } from "../context/ProfileContext";

function ProfileContainer() {
  const [rightSidebarOpen, setRightSidebarOpen] = useState(false);

  const toggleRightSidebar = () => {
    setRightSidebarOpen((prev) => !prev);
  };

  return (
    <ProfileProvider>
    <div className="profile-page">

      {/* Header */}
      <ProfileHeader />

      {/* Main Content */}
      <div className="profile-content-wrapper">

        {/* LEFT SIDEBAR */}
        <ProfileSidebar />

        {/* MAIN PROFILE */}
        <ProfileMain />

        {/* RIGHT SIDEBAR POPUP */}
        <aside
          className={`right-sidebar-panel ${
            rightSidebarOpen
              ? "right-sidebar-open"
              : "right-sidebar-collapsed"
          }`}
        >

          {/* Right Sidebar Toggle */}
          <button
            type="button"
            className="right-sidebar-toggle"
            onClick={toggleRightSidebar}
            aria-label={
              rightSidebarOpen
                ? "Close right sidebar"
                : "Open right sidebar"
            }
            aria-expanded={rightSidebarOpen}
          >
            <span className="material-symbols-outlined">
              {rightSidebarOpen
                ? "chevron_right"
                : "chevron_left"}
            </span>
          </button>

          {/* Right Sidebar Content */}
          <div className="right-sidebar-content">
            <ProfileSidebarRight />
          </div>

        </aside>

      </div>

      {/* Footer */}
      <ProfileFooter />

    </div>
    </ProfileProvider>
  );
}

export default ProfileContainer;