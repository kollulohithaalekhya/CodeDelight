import React from "react";
import "../styles/ProfileStats.css";

const ProfileStats = () => {
  return (
    <div className="dashboard1">
      <div className="dash-card">
        <h2>Quizzes Solved</h2>
        <p>14</p>
      </div>
      <div className="dash-card">
        <h2>Streak</h2>
        <p>32 Days</p>
      </div>
      <div className="dash-card">
        <h2>Rating</h2>
        <p>4.7 ⭐</p>
      </div>
      <div className="dash-card">
        <h2>Courses Completed</h2>
        <p>2</p>
      </div>
    </div>
  );
};

export default ProfileStats;
