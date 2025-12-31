import React from "react";
import "../styles/ProfileContainer.css";

import ProfileHeader from "../components/ProfileHeader";
import ProfileSidebar from "../components/ProfileSidebar";
import ProfileSidebarRight from "../components/ProfileSidebarRight";
import ProfileFooter from "../components/ProfileFooter";

import ProfileMain from "./ProfileMain";

function ProfileContainer() {
  return (
    <div className="profile-page">
      <ProfileHeader />
      <div className="profile-content-wrapper">
        <ProfileSidebar />
        <ProfileMain />
        <ProfileSidebarRight />
      </div>
      <ProfileFooter />
    </div>
  );
}

export default ProfileContainer;
