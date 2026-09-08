import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/GameResult.css";

// Reward/result overlay shown when a FunZone game ends.
export default function GameResult({ result, onPlayAgain }) {
  const navigate = useNavigate();
  if (!result) return null;

  const { won, coinsAwarded = 0, starsAwarded = 0, entryRefunded = 0, newBalance, practice, error, score, daily, dailyStreak, alreadyDone } = result;

  return (
    <div className="gr-overlay">
      <div className={`gr-card ${won ? "win" : "lose"}`}>
        <div className="gr-emoji">{won ? "🎉" : "💪"}</div>
        <h2>{won ? "You Win!" : "Nice try!"}</h2>

        {score != null && <p className="gr-score">Score: <strong>{score}</strong></p>}

        {practice ? (
          <p className="gr-note">
            <i className="fa-solid fa-circle-info" /> Practice mode — play from the Fun Zone to earn real rewards.
          </p>
        ) : error ? (
          <p className="gr-note gr-err">Couldn't save your result. Please try again.</p>
        ) : won ? (
          <>
            <div className="gr-rewards">
              {entryRefunded > 0 && <span className="gr-reward refund"><i className="fa-solid fa-rotate-left" /> +{entryRefunded} entry back</span>}
              {coinsAwarded > 0 && <span className="gr-reward coin"><i className="fa-solid fa-coins" /> +{coinsAwarded} reward</span>}
              {starsAwarded > 0 && <span className="gr-reward star"><i className="fa-solid fa-star" /> +{starsAwarded}</span>}
              {coinsAwarded === 0 && starsAwarded === 0 && entryRefunded === 0 && <span className="gr-reward">No rewards this time</span>}
            </div>
            {(entryRefunded > 0 || coinsAwarded > 0) && (
              <p className="gr-note gr-total">You got your <strong>{entryRefunded}</strong> entry back plus <strong>{coinsAwarded}</strong> reward = <strong>+{entryRefunded + coinsAwarded}</strong> 🪙</p>
            )}
          </>
        ) : (
          <p className="gr-note">No rewards — give it another go!</p>
        )}

        {daily && alreadyDone && <p className="gr-note">You already played today's challenge — come back tomorrow!</p>}
        {daily && !alreadyDone && dailyStreak > 0 && (
          <p className="gr-balance">🔥 Daily streak: <strong>{dailyStreak}</strong> day{dailyStreak === 1 ? "" : "s"}</p>
        )}

        {!practice && !error && newBalance != null && (
          <p className="gr-balance">Balance: <strong>{newBalance}</strong> 🪙</p>
        )}

        <div className="gr-actions">
          {onPlayAgain && <button className="gr-btn ghost" onClick={onPlayAgain}>Play Again</button>}
          <button className="gr-btn" onClick={() => navigate("/funzone")}>Back to Fun Zone</button>
        </div>
      </div>
    </div>
  );
}
