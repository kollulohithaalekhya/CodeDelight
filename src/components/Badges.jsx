import React from "react";
import { useProfile } from "../context/ProfileContext";
import "../styles/Badges.css";

const Badges = () => {
  const { profile } = useProfile();
  const badges = profile?.badges || [];

  return (
    <div className="badges">
      <h2>Badges</h2>
      {badges.length === 0 ? (
        <p style={{ opacity: 0.7, fontSize: 14 }}>
          No badges yet — complete a course or quizzes to earn them.
        </p>
      ) : (
        <ul className="badge-list">
          {badges.map((b, i) => (
            <li key={b.code || i}>
              <i className={b.icon || "fa-solid fa-medal"} style={{ color: "gold" }}></i> {b.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Badges;
