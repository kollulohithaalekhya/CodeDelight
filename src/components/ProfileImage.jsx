import React from "react";
import "../styles/ProfileImage.css";

const ProfileImage = () => {
  return (
    <div className="card1">
      <div className="photo">
        <div className="back-rectangle">
          <img
            src="/images/back-rectangle.jpg"
            className="back-rect-photo"
            alt="Background Banner"
          />
        </div>
      </div>
      <div>
        <img
          src="/images/Profile2.png"
          className="profile-photo"
          alt="User Profile"
        />
      </div>
    </div>
  );
};

export default ProfileImage;
