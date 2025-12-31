import React, { useEffect, useState } from "react";
import "../styles/levels.css";
import { getLevels, resetProgress } from "../scripts/CSSLevels";

function CSSLevels() {
  const [coins, setCoins] = useState(0);
  const [levels, setLevels] = useState([]);

  // Load levels on mount
  useEffect(() => {
    const { coins, levels } = getLevels();
    setCoins(coins);
    setLevels(levels);
  }, []);

  const handleReset = () => {
    if (window.confirm("Are you sure you want to reset your progress?")) {
      const { coins, levels } = resetProgress();
      setCoins(coins);
      setLevels(levels);
    }
  };

  return (
    <div className="quiz-levels-container">
    <div className="container">
      {/* Top section */}
      <div className="top">
        <h1 className="title">CSS Quiz</h1>
        <div className="coins-display">
          <img className="react_coin" src="/images/react_coin.png" alt="coins" />
          <div className="coin-count-text">{coins}</div>
        </div>
      </div>

      {/* Buttons */}
      <div className="buttons">
        <button className="btn" onClick={() => window.history.back()}>
          <i className="fa-solid fa-arrow-left"></i> Back
        </button>
        <button className="btn reset" onClick={handleReset}>
          <i className="fa-solid fa-arrows-rotate"></i> Do Again
        </button>
      </div>

      {/* Levels Grid */}
      <div className="levels-grid">
        {levels.map((level, index) => (
          <div
            key={index}
            className={`level-card ${level.unlocked ? "" : "locked"}`}
            onClick={() => {
              if (level.unlocked) {
                window.location.href = `/css-quiz-level${level.id}.html`; // keep same redirect
              } else {
                alert("This level is locked!");
              }
            }}
            style={{ cursor: level.unlocked ? "pointer" : "default" }}
          >
            <img src={level.image} alt={level.name} className="level-img" />
            <div className="level-title">
              Level {level.id}: {level.name}
            </div>
            <div className="star-container">
              {Array.from({ length: 3 }).map((_, i) => (
                <span
                  key={i}
                  className={`star ${i < level.stars ? "filled" : "empty"}`}
                >
                  {i < level.stars ? "★" : "☆"}
                </span>
              ))}
            </div>
            {!level.unlocked && <div className="lock-icon">🔒</div>}
          </div>
        ))}
      </div>
    </div>
    </div>
  );
}

export default CSSLevels;
