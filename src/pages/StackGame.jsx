import React, { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/StackGame.css";

const PUZZLES = [
  [5, 3, 2],
  [4, 1, 7, 3],
  [2, 2, 1],
];

const DROP_INTERVAL_MS = 2000;
const DROP_LIFETIME_MS = 4000;

function StackGame() {
  const navigate = useNavigate();

  const [coins, setCoins] = useState(
    () => parseInt(localStorage.getItem("coins"), 10) || 100
  );
  const [puzzleIndex, setPuzzleIndex] = useState(0);
  const [falling, setFalling] = useState([]);
  const [stack, setStack] = useState([]);
  const [result, setResult] = useState([]);
  const [message, setMessage] = useState(null);

  const target = PUZZLES[puzzleIndex];
  const targetRef = useRef(target);
  targetRef.current = target;

  // Numbers rain down and expire on their own; clicking one pushes it.
  useEffect(() => {
    const spawn = setInterval(() => {
      const current = targetRef.current;
      const value = current[Math.floor(Math.random() * current.length)];
      const block = { id: `${Date.now()}-${Math.random()}`, value };
      setFalling((prev) => [...prev, block]);
      setTimeout(() => {
        setFalling((prev) => prev.filter((b) => b.id !== block.id));
      }, DROP_LIFETIME_MS);
    }, DROP_INTERVAL_MS);

    return () => clearInterval(spawn);
  }, []);

  const spendCoins = useCallback((amount) => {
    setCoins((prev) => {
      const next = prev - amount;
      localStorage.setItem("coins", String(next));
      return next;
    });
  }, []);

  const pushNumber = (block) => {
    setStack((prev) => [...prev, block.value]);
    setFalling((prev) => prev.filter((b) => b.id !== block.id));
  };

  const popStack = () => {
    if (!stack.length) return;
    const popped = stack[stack.length - 1];
    setStack(stack.slice(0, -1));
    setResult([...result, popped]);
  };

  const resetPuzzle = () => {
    setStack([]);
    setResult([]);
    setMessage(null);
  };

  const checkResult = () => {
    const correct =
      result.length === target.length && result.every((v, i) => v === target[i]);

    if (correct) {
      const next = coins + 5;
      localStorage.setItem("coins", String(next));
      setCoins(next);
      setMessage({
        type: "ok",
        text:
          puzzleIndex === PUZZLES.length - 1
            ? "You completed all puzzles! +5 coins"
            : "Correct! +5 coins",
      });
    } else {
      setMessage({ type: "error", text: "Incorrect! Back to the Fun Zone." });
    }

    setTimeout(() => navigate("/funzone"), 1200);
  };

  const useHint = () => {
    if (coins < 2) {
      setMessage({ type: "error", text: "Not enough coins for a hint (need 2)." });
      return;
    }
    spendCoins(2);
    setMessage({
      type: "ok",
      text: `Hint: the next number should be ${target[result.length]}`,
    });
  };

  const skipPuzzle = () => {
    if (coins < 5) {
      setMessage({ type: "error", text: "Need 5 coins to skip!" });
      return;
    }
    spendCoins(5);
    setPuzzleIndex((puzzleIndex + 1) % PUZZLES.length);
    setStack([]);
    setResult([]);
    setMessage({ type: "ok", text: "Skipped to the next puzzle!" });
  };

  return (
    <div className="stackgame-page">
      <div className="game-container">
        <h1>
          <i className="fa-solid fa-gamepad"></i> Stack Math Puzzle
        </h1>

        <div className="status-bar">
          <p>Target: <span>{target.join(" ")}</span></p>
          <p>Coins: <span>{coins}</span> &#129689;</p>
        </div>

        <div className="fall-area">
          {falling.map((block) => (
            <div key={block.id} className="letter" onClick={() => pushNumber(block)}>
              {block.value}
            </div>
          ))}
        </div>

        <div className="controls">
          <button onClick={popStack}>Pop</button>
          <button onClick={checkResult}>Submit</button>
          <button onClick={resetPuzzle}>Reset</button>
          <button onClick={useHint}>Hint (-2&#129689;)</button>
          <button onClick={skipPuzzle}>Skip (-5&#129689;)</button>
        </div>

        <div className="stack-box">
          {stack.map((value, index) => (
            <div className="stack-item" key={index}>
              {value}
            </div>
          ))}
        </div>

        <div className="result-box">
          <p>
            Result:{" "}
            <span>
              {result.length ? result.join(" ") : "_ ".repeat(target.length).trim()}
            </span>
          </p>
        </div>

        {message && <div className={`game-message ${message.type}`}>{message.text}</div>}

        <button className="back-to-funzone" onClick={() => navigate("/funzone")}>
          Back to Fun Zone
        </button>
      </div>
    </div>
  );
}

export default StackGame;
