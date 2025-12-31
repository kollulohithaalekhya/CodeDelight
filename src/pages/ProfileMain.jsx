import React from "react";
import "../styles/ProfileMain.css";

import ProfileImage from "../components/ProfileImage";
import ProfileStats from "../components/ProfileStats";
import ProfileAchievements from "../components/ProfileAchievements";
import SubmissionsHeatMap from "../components/SubmissionsHeatMap";

function ProfileMain() {
  return (
    <div className="profile-main">
      <div className="heading">
        <h1>PROFILE</h1>
      </div>
      <ProfileImage />
      <ProfileStats />
      <SubmissionsHeatMap />
      <ProfileAchievements />
    </div>
  );
}

export default ProfileMain;
