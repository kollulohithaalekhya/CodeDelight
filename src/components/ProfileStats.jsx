import React from "react";
import "../styles/ProfileStats.css";
import { useProfile } from "../context/ProfileContext";

const ProfileStats = () => {
  const { profile } = useProfile();

  const cards = [
    { icon: "fa-solid fa-clipboard-question", label: "Quizzes Solved", value: profile?.quizzesSolved ?? 0, tint: "cyan" },
    { icon: "fa-solid fa-fire", label: "Streak", value: `${profile?.streak?.current ?? 0} Days`, tint: "orange" },
    { icon: "fa-solid fa-star", label: "Rating", value: profile?.rating ?? 0, tint: "violet" },
    { icon: "fa-solid fa-graduation-cap", label: "Courses Completed", value: profile?.coursesCompleted ?? 0, tint: "green" },
  ];

  return (
    <div className="dashboard1">
      {cards.map((c) => (
        <div className={`dash-card tint-${c.tint}`} key={c.label}>
          <div className="dash-icon"><i className={c.icon}></i></div>
          <div className="dash-body">
            <p className="dash-value">{c.value}</p>
            <h2 className="dash-label">{c.label}</h2>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProfileStats;
