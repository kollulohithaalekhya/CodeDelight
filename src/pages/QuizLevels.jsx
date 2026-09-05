import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LEVEL_TRACKS, readProgress, resetProgress } from "../data/levels";
import "../styles/levels.css";

/**
 * Level picker shared by the HTML, CSS, JavaScript and DSA quizzes.
 * Selecting an unlocked level opens /quiz/<track>/<level>.
 */
function QuizLevels({ track }) {
  const navigate = useNavigate();
  const trackInfo = LEVEL_TRACKS[track];

  const [coins, setCoins] = useState(0);
  const [levels, setLevels] = useState([]);
  const [notice, setNotice] = useState("");

  useEffect(() => {
    const progress = readProgress(track);
    setCoins(progress.coins);
    setLevels(progress.levels);
  }, [track]);

  const handleReset = () => {
    if (!window.confirm("Are you sure you want to reset your progress?")) return;
    const progress = resetProgress(track);
    setCoins(progress.coins);
    setLevels(progress.levels);
    setNotice("");
  };

  const openLevel = (level) => {
    if (!level.unlocked) {
      setNotice("This level is locked — clear the previous level to unlock it.");
      return;
    }
    navigate(`/quiz/${track}/${level.id}`);
  };

  return (
    <div className="quiz-levels-container">
      <div className="container">
        <div className="top">
          <h1 className="title">{trackInfo.title}</h1>
          <div className="coins-display">
            <img className="react_coin" src="/images/react_coin.png" alt="coins" />
            <div className="coin-count-text">{coins}</div>
          </div>
        </div>

        <div className="buttons">
          <button className="btn" onClick={() => navigate("/course")}>
            <i className="fa-solid fa-arrow-left"></i> Back
          </button>
          <button className="btn reset" onClick={handleReset}>
            <i className="fa-solid fa-arrows-rotate"></i> Do Again
          </button>
        </div>

        {notice && <p className="levels-notice">{notice}</p>}

        <div className="levels-grid">
          {levels.map((level) => (
            <div
              key={level.id}
              className={`level-card ${level.unlocked ? "" : "locked"}`}
              onClick={() => openLevel(level)}
              style={{ cursor: level.unlocked ? "pointer" : "default" }}
            >
              <img src={level.image} alt={level.name} className="level-img" />
              <div className="level-title">
                Level {level.id}: {level.name}
              </div>
              <div className="star-container">
                {Array.from({ length: 3 }).map((_, i) => (
                  <span key={i} className={`star ${i < level.stars ? "filled" : "empty"}`}>
                    {i < level.stars ? "★" : "☆"}
                  </span>
                ))}
              </div>
              {!level.unlocked && <div className="lock-icon">&#128274;</div>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default QuizLevels;
