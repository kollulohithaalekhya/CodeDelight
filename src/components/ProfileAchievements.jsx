import React from "react";
import { useProfile } from "../context/ProfileContext";
import "../styles/ProfileAchievements.css";

const ProfileAchievements = () => {
  const { profile } = useProfile();
  const badges = profile?.badges || [];

  return (
    <div className="achievements">
      <span>Achievements</span>

      {badges.length === 0 ? (
        <div className="achievements-empty">
          <i className="fa-solid fa-award"></i>
          <p>No badges yet — complete a course or ace quizzes to earn achievements.</p>
        </div>
      ) : (
        <div className="badges-container">
          {badges.map((b, i) => (
            <div className="achievement-badge" key={b.code || i} title={b.name}>
              <div className="achievement-medal">
                <i className={b.icon || "fa-solid fa-medal"}></i>
              </div>
              <span className="achievement-name">{b.name}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProfileAchievements;
