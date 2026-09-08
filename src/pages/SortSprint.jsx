import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useGameSession, useGameBoard, useBoardSubmit } from "../hooks/useGameSession";
import GameResult from "../components/GameResult";
import "../styles/SortSprint.css";

// Sort Sprint — tap two tiles to swap them and arrange the row in ascending
// order using as few moves as possible. Fewer moves → higher reward score.
//
// The rounds used to be a fixed array here, so every player sorted the same
// three rows forever. They are now generated per play by the server, which
// also verifies the finished rows.

// Locally generated rounds for practice mode, or if the board request fails.
function localBoard() {
  const rounds = [];
  for (let r = 0; r < 3; r++) {
    const len = 4 + r;
    const pool = [];
    while (pool.length < len) {
      const v = 1 + Math.floor(Math.random() * (9 + r * 3));
      if (!pool.includes(v)) pool.push(v);
    }
    rounds.push(shuffle(pool));
  }
  return { rounds };
}

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  // Re-shuffle if we accidentally handed the player an already-sorted row.
  if (a.every((v, i) => i === 0 || a[i - 1] <= v)) return shuffle(arr);
  return a;
}

// Minimum swaps to sort — used to score efficiency.
function minSwaps(arr) {
  const sorted = [...arr].sort((x, y) => x - y);
  const pos = new Map(sorted.map((v, i) => [v, i]));
  const seen = new Array(arr.length).fill(false);
  let swaps = 0;
  for (let i = 0; i < arr.length; i++) {
    if (seen[i] || pos.get(arr[i]) === i) continue;
    let cycle = 0, j = i;
    while (!seen[j]) { seen[j] = true; j = pos.get(arr[j]); cycle++; }
    swaps += cycle - 1;
  }
  return swaps;
}

function SortSprint() {
  const navigate = useNavigate();
  const location = useLocation();
  const sessionToken = location.state?.sessionToken || null;
  const { gameId, result, clearResult, isPractice } = useGameSession();
  const { board, boardSessionId, loading, reroll } = useGameBoard(gameId, localBoard);

  const [roundIndex, setRoundIndex] = useState(0);
  const [tiles, setTiles] = useState([]);
  const [par, setPar] = useState(1);
  const [picked, setPicked] = useState(null);
  const [moves, setMoves] = useState(0);
  const [score, setScore] = useState(100);
  const [message, setMessage] = useState(null);
  const [cleared, setCleared] = useState([]); // finished rows, for verification
  const [localResult, setLocalResult] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const submitBoard = useBoardSubmit(gameId, boardSessionId, sessionToken, setLocalResult, setSubmitting);

  const rounds = board?.rounds || [];

  const dealRound = (idx, src = rounds) => {
    const t = [...(src[idx] || [])];
    setTiles(t);
    setPar(minSwaps(t) || 1);
    setPicked(null);
    setMoves(0);
    setMessage(null);
  };

  // A new board starts a fresh run.
  useEffect(() => {
    if (!board?.rounds?.length) return;
    setRoundIndex(0);
    setScore(100);
    setCleared([]);
    setLocalResult(null);
    dealRound(0, board.rounds);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [board]);

  const sorted = tiles.length > 0 && tiles.every((v, i) => i === 0 || tiles[i - 1] <= v);
  const lastRound = rounds.length > 0 && roundIndex === rounds.length - 1;

  const pick = (i) => {
    if (message?.type === "ok") return;
    if (picked === null) { setPicked(i); return; }
    if (picked === i) { setPicked(null); return; }
    const next = [...tiles];
    [next[picked], next[i]] = [next[i], next[picked]];
    setTiles(next);
    setPicked(null);
    setMoves((m) => m + 1);
  };

  const submit = () => {
    if (!sorted) {
      setMessage({ type: "error", text: "Not sorted yet — arrange them smallest to largest." });
      return;
    }
    // Score: full marks at or under par swaps, then decays per extra move.
    const extra = Math.max(0, moves - par);
    const roundScore = Math.max(20, 100 - extra * 12);
    const nextCleared = [...cleared, tiles];
    setCleared(nextCleared);
    if (lastRound) {
      setMessage({ type: "ok", text: "All rounds sorted! 🎉" });
      // The server re-checks every row against the board it dealt.
      submitBoard({ rounds: nextCleared }, true, Math.round((score + roundScore) / 2));
    } else {
      setScore(Math.round((score + roundScore) / 2));
      setMessage({ type: "ok", text: `Round cleared in ${moves} move${moves === 1 ? "" : "s"}! ⚡` });
    }
  };

  const nextRound = () => {
    const ni = roundIndex + 1;
    setRoundIndex(ni);
    dealRound(ni);
  };

  // Reshuffles the SAME numbers, so the round stays the one the server dealt.
  const reshuffle = () => {
    const t = shuffle(rounds[roundIndex] || tiles);
    setTiles(t);
    setPar(minSwaps(t) || 1);
    setPicked(null);
    setMoves(0);
    setMessage(null);
  };

  const playAgain = () => {
    clearResult();
    setLocalResult(null);
    // Practice replays deal new rows; a scored replay needs a fresh entry.
    if (!gameId) reroll();
  };

  if (loading || !board) {
    return <div className="ssprint"><div className="ssprint-card"><h1>Dealing new rows…</h1></div></div>;
  }

  return (
    <div className="ssprint">
      <div className="ssprint-bg" aria-hidden="true"><span className="ssprint-orb o1" /><span className="ssprint-orb o2" /></div>

      <div className="ssprint-card">
        <div className="ssprint-emoji">⚡</div>
        <h1>Sort Sprint</h1>
        <p className="ssprint-sub">Tap two tiles to swap them. Sort the row ascending in as few moves as possible.</p>
        <p className="ssprint-practice"><i className="fa-solid fa-shuffle" /> New rows are generated every play.</p>
        {isPractice && <p className="ssprint-practice"><i className="fa-solid fa-circle-info" /> Practice mode — play from the Fun Zone to earn rewards.</p>}

        <div className="ssprint-meta">
          <span>Round <b>{roundIndex + 1}</b>/{rounds.length}</span>
          <span>Moves <b>{moves}</b></span>
          <span>Par <b>{par}</b></span>
        </div>

        <div className="ssprint-tiles">
          {tiles.map((v, i) => (
            <button
              key={i}
              className={`ssprint-tile ${picked === i ? "picked" : ""} ${sorted ? "done" : ""}`}
              onClick={() => pick(i)}
            >
              {v}
            </button>
          ))}
        </div>

        {message && <div className={`ssprint-message ${message.type}`}>{message.text}</div>}

        <div className="ssprint-actions">
          {message?.type === "ok" && !lastRound ? (
            <button className="ssprint-btn" onClick={nextRound}>Next Round <i className="fa-solid fa-arrow-right" /></button>
          ) : (
            <>
              <button className="ssprint-btn ghost" onClick={reshuffle}>Shuffle</button>
              <button className="ssprint-btn" onClick={submit} disabled={submitting || message?.type === "ok"}>
                Submit <i className="fa-solid fa-flag-checkered" />
              </button>
            </>
          )}
        </div>

        <button className="ssprint-back" onClick={() => navigate("/funzone")}>← Back to Fun Zone</button>
      </div>

      {(localResult || result) && <GameResult result={localResult || result} onPlayAgain={playAgain} />}
    </div>
  );
}

export default SortSprint;
