import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useGameSession, useGameBoard, useBoardSubmit } from "../hooks/useGameSession";
import GameResult from "../components/GameResult";
import "../styles/StackGame.css";

// Locally generated puzzles, used in practice mode or if the board request
// fails. The puzzle set used to be a fixed array here, which is why every
// player saw the same three targets on every play; the server now generates
// them per play and verifies the result.
function localBoard() {
  const rand = (lo, hi) => lo + Math.floor(Math.random() * (hi - lo + 1));
  return {
    rounds: [3, 4, 5].map((len) => Array.from({ length: len }, () => rand(1, 9))),
    dropIntervalMs: 2000,
    dropLifetimeMs: 4000,
  };
}

function StackGame() {
  const navigate = useNavigate();
  const location = useLocation();
  const sessionToken = location.state?.sessionToken || null;
  const { gameId, result, clearResult, isPractice } = useGameSession();
  const { board, boardSessionId, loading, reroll } = useGameBoard(gameId, localBoard);

  const [puzzleIndex, setPuzzleIndex] = useState(0);
  const [falling, setFalling] = useState([]);
  const [stack, setStack] = useState([]);
  const [out, setOut] = useState([]);
  const [score, setScore] = useState(100); // in-game score → drives rewards
  const [message, setMessage] = useState(null);
  const [cleared, setCleared] = useState([]); // sequences produced so far
  const [localResult, setLocalResult] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const submitBoard = useBoardSubmit(gameId, boardSessionId, sessionToken, setLocalResult, setSubmitting);

  const puzzles = board?.rounds || [];
  const target = puzzles[puzzleIndex] || [];
  const targetRef = useRef(target);
  targetRef.current = target;

  const DROP_INTERVAL_MS = board?.dropIntervalMs || 2000;
  const DROP_LIFETIME_MS = board?.dropLifetimeMs || 4000;

  // A new board resets the run.
  useEffect(() => {
    setPuzzleIndex(0); setStack([]); setOut([]); setCleared([]);
    setScore(100); setMessage(null); setLocalResult(null);
  }, [board]);

  // Numbers rain down and expire on their own; clicking one pushes it.
  useEffect(() => {
    if (!puzzles.length) return undefined;
    const spawn = setInterval(() => {
      const current = targetRef.current;
      if (!current.length) return;
      const value = current[Math.floor(Math.random() * current.length)];
      const block = { id: `${Date.now()}-${Math.random()}`, value };
      setFalling((prev) => [...prev, block]);
      setTimeout(() => setFalling((prev) => prev.filter((b) => b.id !== block.id)), DROP_LIFETIME_MS);
    }, DROP_INTERVAL_MS);
    return () => clearInterval(spawn);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [board]);

  const pushNumber = (block) => {
    setStack((prev) => [...prev, block.value]);
    setFalling((prev) => prev.filter((b) => b.id !== block.id));
  };

  const popStack = () => {
    if (!stack.length) return;
    setOut([...out, stack[stack.length - 1]]);
    setStack(stack.slice(0, -1));
  };

  const resetPuzzle = () => { setStack([]); setOut([]); setMessage(null); };

  // Each round is checked locally for immediate feedback; the full run is sent
  // to the server, which verifies it against the board it generated.
  const checkResult = () => {
    const correct = out.length === target.length && out.every((v, i) => v === target[i]);
    if (!correct) {
      setMessage({ type: "error", text: "Not quite — the order didn't match." });
      submitBoard({ rounds: [...cleared, out] }, false, 0);
      return;
    }
    const nextCleared = [...cleared, out];
    const last = puzzleIndex === puzzles.length - 1;
    if (last) {
      setCleared(nextCleared);
      setMessage({ type: "ok", text: "All puzzles cleared! 🎉" });
      submitBoard({ rounds: nextCleared }, true, Math.max(10, score));
    } else {
      setCleared(nextCleared);
      setPuzzleIndex(puzzleIndex + 1);
      setStack([]); setOut([]);
      setMessage({ type: "ok", text: `Correct! Puzzle ${puzzleIndex + 2} of ${puzzles.length} 🎉` });
    }
  };

  const useHint = () => {
    if (out.length >= target.length) return;
    setScore((s) => Math.max(0, s - 15)); // hints lower your reward score
    setMessage({ type: "ok", text: `Hint: next number should be ${target[out.length]} (-15 score)` });
  };

  // Skipping fills the round with the answer so the run stays well-formed,
  // at a score penalty.
  const skipPuzzle = () => {
    setScore((s) => Math.max(0, s - 20));
    setCleared((c) => [...c, [...target]]);
    setPuzzleIndex((i) => Math.min(i + 1, puzzles.length - 1));
    setStack([]); setOut([]);
    setMessage({ type: "ok", text: "Skipped to the next puzzle (-20 score)" });
  };

  const playAgain = () => {
    clearResult();
    setLocalResult(null);
    // Practice replays deal new puzzles; a scored replay needs a fresh entry.
    if (!gameId) reroll();
  };

  if (loading || !board) {
    return <div className="stackgame-page"><div className="game-container"><h1>Dealing new puzzles…</h1></div></div>;
  }

  return (
    <div className="stackgame-page">
      <div className="game-container">
        <h1><i className="fa-solid fa-gamepad"></i> Stack Math Puzzle</h1>

        <div className="status-bar">
          <p>Target: <span>{target.join(" ")}</span></p>
          <p>Puzzle: <span>{puzzleIndex + 1}/{puzzles.length}</span></p>
          <p>Score: <span>{score}</span> ⭐</p>
        </div>
        <p className="practice-hint"><i className="fa-solid fa-shuffle" /> New puzzles are generated every play.</p>
        {isPractice && <p className="practice-hint">Practice mode — play from the Fun Zone to earn rewards.</p>}

        <div className="fall-area">
          {falling.map((block) => (
            <div key={block.id} className="letter" onClick={() => pushNumber(block)}>{block.value}</div>
          ))}
        </div>

        <div className="controls">
          <button onClick={popStack}>Pop</button>
          <button onClick={checkResult} disabled={submitting}>Submit</button>
          <button onClick={resetPuzzle}>Reset</button>
          <button onClick={useHint}>Hint (-15⭐)</button>
          <button onClick={skipPuzzle}>Skip (-20⭐)</button>
        </div>

        <div className="stack-box">
          {stack.map((value, index) => <div className="stack-item" key={index}>{value}</div>)}
        </div>

        <div className="result-box">
          <p>Result: <span>{out.length ? out.join(" ") : "_ ".repeat(target.length).trim()}</span></p>
        </div>

        {message && <div className={`game-message ${message.type}`}>{message.text}</div>}

        <button className="back-to-funzone" onClick={() => navigate("/funzone")}>Back to Fun Zone</button>
      </div>

      {(localResult || result) && <GameResult result={localResult || result} onPlayAgain={playAgain} />}
    </div>
  );
}

export default StackGame;
