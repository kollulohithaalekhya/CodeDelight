import React from "react";
import "../styles/Badges.css";

const Badges = () => {
  return (
    <div className="badges">
      <h2>Badges</h2>
      <ul className="badge-list">
        <li>
          <i className="fa-solid fa-medal" style={{ color: "gold" }}></i> HTML
          Expert
        </li>
        <li>
          <i className="fa-solid fa-medal" style={{ color: "silver" }}></i> CSS
          Styler
        </li>
        <li>
          <i className="fa-solid fa-medal" style={{ color: "#cd7f32" }}></i>{" "}
          JavaScript Rookie
        </li>
      </ul>
    </div>
  );
};

export default Badges;
