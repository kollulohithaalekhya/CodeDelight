import React, { useEffect, useState } from "react";
import { get } from "../api/client";
import "../styles/CoinsHistory.css";

// Friendly icon + label per ledger `type`. Falls back to the raw reason text.
const TYPE_META = {
  problem_reward: { icon: "fa-solid fa-code", label: "Problem" },
  build_task_reward: { icon: "fa-solid fa-paintbrush", label: "Build task" },
  game_reward: { icon: "fa-solid fa-trophy", label: "Game win" },
  game_entry: { icon: "fa-solid fa-gamepad", label: "Game entry" },
  game_entry_refund: { icon: "fa-solid fa-rotate-left", label: "Entry returned" },
  kc_reward: { icon: "fa-solid fa-brain", label: "Knowledge check" },
  quiz_reward: { icon: "fa-solid fa-list-check", label: "Quiz" },
  daily_bonus: { icon: "fa-solid fa-fire", label: "Daily bonus" },
  manual: { icon: "fa-solid fa-user-gear", label: "Adjustment" },
};

const fmtDate = (d) => {
  try {
    return new Date(d).toLocaleString(undefined, { month: "short", day: "numeric", hour: "numeric", minute: "2-digit" });
  } catch {
    return "";
  }
};

export default function CoinsHistory() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    get("/api/coins/me")
      .then(setData)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  const txns = data?.transactions || [];

  return (
    <div className="coins-history">
      <div className="ch-head">
        <h2><i className="fa-solid fa-coins" /> Coins History</h2>
        {data && (
          <div className="ch-balances">
            <span className="ch-bal"><i className="fa-solid fa-coins" /> {data.balance ?? 0}</span>
            <span className="ch-bal star"><i className="fa-solid fa-star" /> {data.stars ?? 0}</span>
          </div>
        )}
      </div>

      {loading ? (
        <p className="ch-msg">Loading…</p>
      ) : error ? (
        <p className="ch-msg error">{error}</p>
      ) : txns.length === 0 ? (
        <p className="ch-msg">No coin activity yet. Solve problems, take quizzes, or play games to earn coins!</p>
      ) : (
        <ul className="ch-list">
          {txns.map((t) => {
            const meta = TYPE_META[t.type] || { icon: "fa-solid fa-coins", label: t.type || "Coins" };
            const positive = t.amount >= 0;
            return (
              <li className="ch-item" key={t.id}>
                <span className={`ch-icon ${positive ? "pos" : "neg"}`}><i className={meta.icon} /></span>
                <div className="ch-body">
                  <span className="ch-reason">{t.reason || meta.label}</span>
                  <span className="ch-meta">{meta.label} · {fmtDate(t.createdAt)}</span>
                </div>
                <div className="ch-amount-wrap">
                  <span className={`ch-amount ${positive ? "pos" : "neg"}`}>{positive ? "+" : ""}{t.amount} 🪙</span>
                  {typeof t.balanceAfter === "number" && <span className="ch-after">→ {t.balanceAfter}</span>}
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
