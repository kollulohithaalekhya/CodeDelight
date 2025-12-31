import React from "react";
import "../styles/ProfileSidebarRight.css";

import Bio from "./Bio";
import Coins from "./Coins";
import Badges from "./Badges";
import Interests from "./Interests";

function ProfileSidebarRight() {
  return (
    <div className="profile-sidebar-right">
      <Bio />
      <Coins />
      <Badges />
      <Interests />
    </div>
  );
}

export default ProfileSidebarRight;
