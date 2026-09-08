import React from "react";
import { useAuth } from "../context/AuthContext";
import { useProfile } from "../context/ProfileContext";
import "../styles/ProfileImage.css";

const ProfileImage = () => {
  const { user } = useAuth();
  const { profile } = useProfile();

  const avatar = user?.profileImage || profile?.profileImage || "/images/user.png";
  const name = user?.username || profile?.username || "Learner";
  const coins = profile?.coins ?? user?.coins ?? 0;
  const stars = profile?.stars ?? user?.stars ?? 0;
  const streak = profile?.streak?.current ?? 0;

  return (
    <div className="card1">
      {/* Gradient banner */}
      <div className="pf-banner">
        <div className="pf-banner-glow" />
      </div>

      {/* Avatar + identity */}
      <div className="pf-identity">
        <div className="pf-avatar-ring">
          <img src={avatar} className="profile-photo" alt={`${name}'s profile`} />
        </div>
        <h2 className="pf-name">{name}</h2>
        {profile?.email && <span className="pf-handle">{profile.email}</span>}

        <div className="pf-chips">
          <span className="pf-chip pf-chip-coin"><i className="fa-solid fa-coins" /> {coins}</span>
          <span className="pf-chip pf-chip-star"><i className="fa-solid fa-star" /> {stars}</span>
          <span className="pf-chip pf-chip-fire"><i className="fa-solid fa-fire" /> {streak}d</span>
        </div>
      </div>
    </div>
  );
};

export default ProfileImage;
