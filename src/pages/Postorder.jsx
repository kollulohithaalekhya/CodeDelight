import React, { useState } from "react";
import "../styles/Postorder.css";

const Postorder = () => {
  const correctPostorder = ["20", "40", "30", "60", "80", "70", "50"];
  const [coins, setCoins] = useState(50);
  const [dropped, setDropped] = useState(Array(correctPostorder.length).fill(""));

  const handleDragStart = (e, value) => {
    e.dataTransfer.setData("text/plain", value);
  };

  const handleDrop = (index, e) => {
    e.preventDefault();
    const val = e.dataTransfer.getData("text/plain");
    if (!dropped[index]) {
      const newDropped = [...dropped];
      newDropped[index] = val;
      setDropped(newDropped);
    }
  };

  const handleSubmit = () => {
    if (coins < 10) {
      alert("🚫 You need at least 10 coins to play.");
      return;
    }

    const isCorrect = JSON.stringify(dropped) === JSON.stringify(correctPostorder);

    if (isCorrect) {
      setCoins((prev) => prev - 5);
      alert("✅ Correct! You won. 5 coins deducted as game cost.");
      localStorage.setItem("rewardCoins", "5");
    } else {
      setCoins((prev) => prev - 10);
      alert("❌ Incorrect! You lost. 10 coins deducted.");
    }
  };

  const handleReset = () => {
    setDropped(Array(correctPostorder.length).fill(""));
  };

  const allFilled = dropped.every((val) => val !== "");

  return (
    <div className="container traversal-container">
      <h2>Drag nodes from the tree to form Postorder Traversal</h2>

      <div className="tree-display">
        <div className="level">
          <div
            className={`tree-node ${dropped.includes("50") ? "hidden" : ""}`}
            draggable
            onDragStart={(e) => handleDragStart(e, "50")}
          >
            50
          </div>
        </div>
        <div className="level">
          <div
            className={`tree-node ${dropped.includes("30") ? "hidden" : ""}`}
            draggable
            onDragStart={(e) => handleDragStart(e, "30")}
          >
            30
          </div>
          <div
            className={`tree-node ${dropped.includes("70") ? "hidden" : ""}`}
            draggable
            onDragStart={(e) => handleDragStart(e, "70")}
          >
            70
          </div>
        </div>
        <div className="level">
          {["20", "40", "60", "80"].map((val) => (
            <div
              key={val}
              className={`tree-node ${dropped.includes(val) ? "hidden" : ""}`}
              draggable
              onDragStart={(e) => handleDragStart(e, val)}
            >
              {val}
            </div>
          ))}
        </div>
      </div>

      <div id="drop-row">
        {dropped.map((val, i) => (
          <div
            key={i}
            className={`drop-zone ${val ? "filled" : ""}`}
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => handleDrop(i, e)}
          >
            {val}
          </div>
        ))}
      </div>

      <div className="buttons">
        <button
          id="submit-btn"
          onClick={handleSubmit}
          disabled={coins < 10 || !allFilled}
        >
          Submit
        </button>
        <button id="reset-btn" onClick={handleReset}>
          Reset
        </button>
      </div>

      <div className="score">
        Coins: <span id="coins">{coins}</span> 🪙
      </div>
    </div>
  );
};

export default Postorder;