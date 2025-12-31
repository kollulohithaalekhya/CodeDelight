import React, { useEffect } from "react";
import "../styles/levels.css";
import { initJSLevels } from "../scripts/JSLevels";

const JSLevels = () => {
  useEffect(() => {
    initJSLevels();
  }, []);

  return (
    <div className="quiz-levels-container">
    <div className="container">
      <div className="top">
        <h1 className="title">JavaScript Quiz</h1>
        <div className="coins-display">
          <img className="react_coin" src="/images/react_coin.png" alt="coins" />
          <div className="coin-count-text" id="coin-count">0</div>
        </div>
      </div>

      <div className="buttons">
        <button id="back-btn" className="btn">
          <i className="fa-solid fa-arrow-left"></i> Back
        </button>
        <button id="reset-btn" className="btn reset">
          <i className="fa-solid fa-arrows-rotate"></i> Do Again
        </button>
      </div>

      <div className="levels-grid" id="levels-grid"></div>
    </div>
    </div>
  );
};

export default JSLevels;
