import React from "react";
import "../styles/ProfileAchievements.css";

const ProfileAchievements = () => {
  return (
    <div className="achievements">
      <span>Achievements</span>

      <div className="badges-container">
        <img
          src="/images/Html_certified.png"
          className="html-badge"
          alt="HTML Certified Badge"
        />
        <img src="/images/Badge-certified.png" className="html-badge" alt="Certified Badge" />
        <img src="/images/Badge-certified.png" className="html-badge" alt="Certified Badge" />
        <img src="/images/Badge-certified.png" className="html-badge" alt="Certified Badge" />
        <img src="/images/Badge-certified.png" className="html-badge" alt="Certified Badge" />
      </div>
    </div>
  );
};

export default ProfileAchievements;
