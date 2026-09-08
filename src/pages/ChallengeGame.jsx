import React, { useEffect, useRef, useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { get, post } from "../api/client";
import { useAuth } from "../context/AuthContext";
import GameResult from "../components/GameResult";
import QuestionText from "../components/QuestionText";
import "../styles/ChallengeGame.css";

export default function ChallengeGame() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { refresh } = useAuth();
  const sessionToken = location.state?.sessionToken || null;
  const isDaily = !!location.state?.daily;

  const [game, setGame] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [sessionId, setSessionId] = useState(null);
  const [error, setError] = useState("");
  const [phase, setPhase] = useState("loading"); // loading | intro | playing | result
  const [qIndex, setQIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [selected, setSelected] = useState(null);
  const [timeLeft, setTimeLeft] = useState(0);
  const [result, setResult] = useState(null);
  const timerRef = useRef(null);

  // The game metadata and the question set are fetched separately: the set is
  // drawn fresh for this play, so replaying never repeats the same questions.
  // The daily challenge instead reuses the set already pinned for today.
  useEffect(() => {
    let alive = true;
    const dailyQuestions = location.state?.dailyQuestions;
    const dailySessionId = location.state?.dailySessionId;

    get(`/api/games/${id}`)
      .then(async (d) => {
        if (d.game.type !== "challenge") throw new Error("Not a challenge game");
        if (!alive) return;
        setGame(d.game);

        if (isDaily && Array.isArray(dailyQuestions) && dailyQuestions.length) {
          setQuestions(dailyQuestions);
          setSessionId(dailySessionId || null);
          setAnswers(new Array(dailyQuestions.length).fill(-1));
        } else {
          const q = await get(`/api/games/${id}/challenge/questions`);
          if (!alive) return;
          setQuestions(q.questions || []);
          setSessionId(q.sessionId || null);
          setAnswers(new Array((q.questions || []).length).fill(-1));
        }
        if (alive) setPhase("intro");
      })
      .catch((e) => { if (alive) { setError(e.message); setPhase("error"); } });
    return () => { alive = false; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const perQ = game?.challenge?.timePerQuestionSec || 0;

  // Per-question countdown timer.
  useEffect(() => {
    if (phase !== "playing" || !perQ) return;
    setTimeLeft(perQ);
    timerRef.current = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) { clearInterval(timerRef.current); handleNext(true); return 0; }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(timerRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [qIndex, phase]);

  const start = () => { setPhase("playing"); setQIndex(0); setSelected(null); };

  const handleNext = (timedOut = false) => {
    clearInterval(timerRef.current);
    const chosen = timedOut ? -1 : selected;
    const nextAnswers = [...answers];
    nextAnswers[qIndex] = chosen;
    setAnswers(nextAnswers);
    setSelected(null);
    if (qIndex + 1 < questions.length) {
      setQIndex(qIndex + 1);
    } else {
      submit(nextAnswers);
    }
  };

  const submit = async (finalAnswers) => {
    try {
      // sessionId identifies the exact question set that was served, so the
      // server scores against it rather than against a fixed stored list.
      const { result } = isDaily
        ? (await post(`/api/funzone/daily/submit`, { gameId: id, answers: finalAnswers, sessionId }))
        : (await post(`/api/games/${id}/challenge/submit`, { answers: finalAnswers, sessionToken, sessionId }));
      refresh();
      // Fold the daily bonus into the coin/star totals shown on the reward card.
      const coinsAwarded = (result.coinsAwarded || 0) + (result.bonusCoins || 0);
      const starsAwarded = (result.starsAwarded || 0) + (result.bonusStars || 0);
      setResult({
        ...result,
        coinsAwarded,
        starsAwarded,
        daily: isDaily,
        dailyStreak: result.dailyStreak,
        score: `${result.score}/${result.total} · ${result.percent}%`,
      });
      setPhase("result");
    } catch (e) {
      setError(e.message);
      setPhase("error");
    }
  };

  const playAgain = () => {
    // Replaying needs a fresh paid entry — send them back to Fun Zone, where
    // the next play will also draw a completely new question set.
    navigate("/funzone");
  };

  if (phase === "loading") return <div className="cgame"><div className="cgame-state">Loading challenge…</div></div>;
  if (phase === "error") {
    return (
      <div className="cgame"><div className="cgame-state">
        <h2>Couldn't load this game</h2>
        <p>{error}</p>
        <button className="cgame-btn" onClick={() => navigate("/funzone")}>Back to Fun Zone</button>
      </div></div>
    );
  }

  const theme = game.challenge.theme;
  const total = questions.length;
  const q = questions[qIndex];

  return (
    <div className="cgame">
      <div className="cgame-bg" aria-hidden="true"><span className="cgame-orb o1" /><span className="cgame-orb o2" /></div>

      {phase === "intro" && (
        <div className="cgame-intro">
          {isDaily && <div className="cgame-daily-tag">🔥 Daily Challenge · Free</div>}
          <div className="cgame-emoji">{theme.emoji}</div>
          <h1>{game.name}</h1>
          {theme.story && <p className="cgame-story">{theme.story}</p>}
          <div className="cgame-intro-meta">
            <span><i className="fa-solid fa-list-ol" /> {total} questions</span>
            <span><i className="fa-solid fa-percent" /> {game.challenge.passPercent}% to win</span>
            {perQ ? <span><i className="fa-solid fa-stopwatch" /> {perQ}s / question</span> : null}
            {game.challenge.randomized ? <span className="cgame-fresh"><i className="fa-solid fa-shuffle" /> Fresh questions every play</span> : null}
            {game.rewards?.coinsForWin ? <span className="win"><i className="fa-solid fa-trophy" /> +{game.rewards.coinsForWin} 🪙</span> : null}
          </div>
          <div className="cgame-intro-actions">
            <button className="cgame-btn ghost" onClick={() => navigate("/funzone")}>Back</button>
            <button className="cgame-btn" onClick={start}>Start Challenge <i className="fa-solid fa-play" /></button>
          </div>
          {isDaily
            ? <p className="cgame-practice"><i className="fa-solid fa-gift" /> Free daily play — win to earn a bonus. One attempt per day!</p>
            : !sessionToken && <p className="cgame-practice"><i className="fa-solid fa-circle-info" /> Practice mode — play from the Fun Zone to earn rewards.</p>}
        </div>
      )}

      {phase === "playing" && q && (
        <div className="cgame-play">
          <div className="cgame-top">
            <span className="cgame-count">{theme.emoji} Question {qIndex + 1} / {total}</span>
            {perQ ? <span className={`cgame-timer ${timeLeft <= 3 ? "low" : ""}`}><i className="fa-solid fa-stopwatch" /> {timeLeft}s</span> : null}
          </div>
          <div className="cgame-progress"><span style={{ width: `${(qIndex / total) * 100}%` }} /></div>

          <div className="cgame-question"><QuestionText text={q.prompt} /></div>

          <div className="cgame-options">
            {q.options.map((opt, oi) => (
              <button
                key={oi}
                className={`cgame-opt ${selected === oi ? "selected" : ""}`}
                onClick={() => setSelected(oi)}
              >
                <span className="cgame-opt-key">{String.fromCharCode(65 + oi)}</span>
                <QuestionText text={opt} className="qt-inline" />
              </button>
            ))}
          </div>

          <button className="cgame-btn cgame-next" onClick={() => handleNext(false)} disabled={selected === null}>
            {qIndex + 1 < total ? <>Next <i className="fa-solid fa-arrow-right" /></> : <>Finish <i className="fa-solid fa-flag-checkered" /></>}
          </button>
        </div>
      )}

      {phase === "result" && result && <GameResult result={result} onPlayAgain={playAgain} />}
    </div>
  );
}
