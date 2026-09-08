import React, { useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useGameSession, useGameBoard, useBoardSubmit } from "../hooks/useGameSession";
import GameResult from "../components/GameResult";
import "../styles/Traversal.css";

const LABELS = {
  preorder: "Preorder",
  inorder: "Inorder",
  postorder: "Postorder",
};

// Locally generated fallback tree, used in practice mode or if the board
// request fails. It mirrors the server generator: seven distinct values built
// into a perfect three-level BST.
function localBoard(order) {
  const vals = [];
  while (vals.length < 7) {
    const v = 10 + Math.floor(Math.random() * 90);
    if (!vals.includes(v)) vals.push(v);
  }
  vals.sort((a, b) => a - b);
  const build = (lo, hi) => {
    if (lo > hi) return null;
    const mid = Math.floor((lo + hi) / 2);
    return { v: vals[mid], l: build(lo, mid - 1), r: build(mid + 1, hi) };
  };
  const root = build(0, vals.length - 1);
  const levels = [
    [root.v],
    [root.l.v, root.r.v],
    [root.l.l.v, root.l.r.v, root.r.l.v, root.r.r.v],
  ];
  return { levels, order, nodeCount: 7 };
}

// Computes the expected answer from the drawn levels, used only to show the
// player a result in practice mode. Scored plays are verified server-side.
function localAnswer(levels, order) {
  const [[root], [l, r], [ll, lr, rl, rr]] = levels;
  const t = { v: root, l: { v: l, l: { v: ll }, r: { v: lr } }, r: { v: r, l: { v: rl }, r: { v: rr } } };
  const pre = [], ino = [], post = [];
  (function walk(n) {
    if (!n) return;
    pre.push(n.v); walk(n.l); ino.push(n.v); walk(n.r); post.push(n.v);
  })(t);
  return { preorder: pre, inorder: ino, postorder: post }[order].map(String);
}

/**
 * The shared drag-and-drop traversal game.
 *
 * The three traversal pages were identical except for one hardcoded answer
 * array and a heading, and every player saw the same tree on every play. They
 * now share this component and receive a freshly generated tree per play.
 */
export default function TraversalGame({ order }) {
  const location = useLocation();
  const { user } = useAuth();
  const sessionToken = location.state?.sessionToken || null;
  const { gameId, isPractice, result, submitting, clearResult } = useGameSession();

  const { board, boardSessionId, loading, reroll } = useGameBoard(gameId, () => localBoard(order));

  const [dropped, setDropped] = useState(Array(7).fill(""));
  const [localResult, setLocalResult] = useState(null);
  const [busy, setBusy] = useState(false);

  const submitBoard = useBoardSubmit(gameId, boardSessionId, sessionToken, setLocalResult, setBusy);

  // A new board means a clean slate.
  useEffect(() => { setDropped(Array(7).fill("")); setLocalResult(null); }, [board]);

  const nodes = useMemo(() => (board?.levels || []).flat().map(String), [board]);

  const handleDragStart = (e, value) => e.dataTransfer.setData("text/plain", value);

  const handleDrop = (index, e) => {
    e.preventDefault();
    const val = e.dataTransfer.getData("text/plain");
    if (!val || dropped[index]) return;
    // A node can only be placed once.
    if (dropped.includes(val)) return;
    const next = [...dropped];
    next[index] = val;
    setDropped(next);
  };

  // Tapping a filled slot clears it, so a mis-drop is recoverable on touch
  // devices where dragging back out is fiddly.
  const clearSlot = (index) => {
    if (!dropped[index]) return;
    const next = [...dropped];
    next[index] = "";
    setDropped(next);
  };

  const handleSubmit = () => {
    const expected = localAnswer(board.levels, order);
    const won = expected.length === dropped.length && expected.every((v, i) => v === dropped[i]);
    submitBoard({ answer: dropped }, won, won ? 100 : 0);
  };

  const handleReset = () => setDropped(Array(7).fill(""));

  const playAgain = () => {
    clearResult();
    setLocalResult(null);
    // Practice replays deal a brand-new tree. A scored replay needs a fresh
    // paid entry, so the result card sends the player back to the Fun Zone.
    if (!gameId) reroll();
  };

  const shown = localResult || result;
  const allFilled = dropped.every((v) => v !== "");

  if (loading || !board) {
    return <div className="traversal-page"><div className="container traversal-container"><h2>Dealing a new tree…</h2></div></div>;
  }

  return (
    <>
      <div className="traversal-page">
        <div className="container traversal-container">
          <a className="tv-back" href="/funzone"><i className="fa-solid fa-arrow-left" /> Fun Zone</a>
          <h2>Drag nodes from the tree to form {LABELS[order]} Traversal</h2>
          <p className="tv-note">
            <i className="fa-solid fa-shuffle" /> A new tree is generated every time you play.
          </p>

          <div className="tree-display">
            {board.levels.map((level, li) => (
              <div className="level" key={li}>
                {level.map((val) => {
                  const v = String(val);
                  return (
                    <div
                      key={v}
                      className={`tree-node ${dropped.includes(v) ? "hidden" : ""}`}
                      draggable={!dropped.includes(v)}
                      onDragStart={(e) => handleDragStart(e, v)}
                    >
                      {v}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>

          <div id="drop-row">
            {dropped.map((val, i) => (
              <div
                key={i}
                className={`drop-zone ${val ? "filled" : ""}`}
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => handleDrop(i, e)}
                onClick={() => clearSlot(i)}
                title={val ? "Click to remove" : "Drop a node here"}
              >
                {val}
              </div>
            ))}
          </div>

          <div className="buttons">
            <button id="submit-btn" onClick={handleSubmit} disabled={!allFilled || submitting || busy}>
              {busy ? "Checking…" : "Submit"}
            </button>
            <button id="reset-btn" onClick={handleReset}>Reset</button>
            {isPractice && (
              <button id="reset-btn" onClick={reroll}>New tree</button>
            )}
          </div>

          {isPractice && (
            <div className="score">Practice mode — play from the Fun Zone to earn rewards.</div>
          )}
          {!user && (
            <div className="score">Sign in and launch from the Fun Zone to earn coins and stars.</div>
          )}
        </div>
      </div>

      {shown && <GameResult result={shown} onPlayAgain={playAgain} />}
    </>
  );
}
