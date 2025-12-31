import React, { useEffect, useState } from "react";
import "../styles/levels.css";
import { renderHTMLLevels } from "../scripts/HTMLLevels";

const HTMLLevels = () => {
  const [coins, setCoins] = useState(0);

  useEffect(() => {
    renderHTMLLevels(setCoins);
  }, []);

  return (
    <div className="quiz-levels-container">
    <div className="container">
      <div className="top">
        <h1 className="title">HTML Quiz</h1>
        <div className="coins-display">
          <img
            className="react_coin"
            src="/images/react_coin.png"
            alt="coins"
          />
          <div className="coin-count-text" id="coin-count">
            {coins}
          </div>
        </div>
      </div>

      <div className="buttons">
        <button
          id="back-btn"
          className="btn"
          onClick={() => window.history.back()}
        >
          <i className="fa-solid fa-arrow-left"></i> Back
        </button>
        <button
          id="reset-btn"
          className="btn reset"
          onClick={() => {
            if (window.confirm("Are you sure you want to reset your progress?")) {
              localStorage.removeItem("stars");
              localStorage.setItem("unlockedLevel", "1");
              localStorage.setItem("coins", "0");
              window.location.reload();
            }
          }}
        >
          <i className="fa-solid fa-arrows-rotate"></i> Do Again
        </button>
      </div>

      <div className="levels-grid" id="levels-grid"></div>
    </div>
    </div>
  );
};

export default HTMLLevels;
