import React, { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { get, post } from "../api/client";
import { useAuth } from "../context/AuthContext";
import QuestionText from "../components/QuestionText";
import AnswerReview from "../components/AnswerReview";
import "../styles/QuizLevel.css";

const TRACKS = {
  html: { label: "HTML", levelsPath: "/html-levels" },
  css: { label: "CSS", levelsPath: "/css-levels" },
  js: { label: "JavaScript", levelsPath: "/js-levels" },
  dsa: { label: "DSA", levelsPath: "/dsa-levels" },
};

function QuizLevel() {
  const { track = "dsa", level = "1" } = useParams();
  const navigate = useNavigate();
  const { user, refresh } = useAuth();

  const levelNum = parseInt(level, 10) || 1;
  const trackInfo = TRACKS[track] || TRACKS.dsa;

  const [quiz, setQuiz] = useState(null);
  const [loadError, setLoadError] = useState("");
  const [loading, setLoading] = useState(true);
  // Bumped to re-request the quiz, which draws a brand-new question set.
  const [attemptKey, setAttemptKey] = useState(0);

  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [answers, setAnswers] = useState([]); // selected index per question
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  // Each load draws a fresh, randomised question set from the server, so a
  // retry never replays the same questions in the same order.
  useEffect(() => {
    let alive = true;
    setLoading(true);
    setLoadError("");
    setResult(null);
    setCurrent(0);
    setSelected(null);
    setError("");
    get(`/api/quizzes/${track}/${levelNum}`)
      .then((d) => { if (alive) { setQuiz(d.quiz); setAnswers(new Array(d.quiz.questions.length).fill(null)); } })
      .catch((e) => { if (alive) setLoadError(e.message); })
      .finally(() => { if (alive) setLoading(false); });
    return () => { alive = false; };
  }, [track, levelNum, attemptKey]);

  const questions = useMemo(() => (quiz ? quiz.questions : []), [quiz]);

  if (loading) {
    return <div className="quiz-page"><div className="quiz-container"><h2>Loading…</h2></div></div>;
  }

  // Require sign-in up front so a logged-out user never wastes a full attempt.
  if (!user) {
    return (
      <div className="quiz-page">
        <div className="quiz-container">
          <h2>{trackInfo.label} Quiz</h2>
          <p className="quiz-question">Please sign in to take this quiz and earn stars &amp; coins.</p>
          <div className="quiz-actions">
            <button className="back-btn" onClick={() => navigate(trackInfo.levelsPath)}>Back</button>
            <button
              className="submit-btn"
              onClick={() => navigate("/signin", { state: { from: `/quiz/${track}/${levelNum}` } })}
            >
              Sign In
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (loadError || !quiz) {
    return (
      <div className="quiz-page">
        <div className="quiz-container">
          <h2>Quiz not found</h2>
          <p className="quiz-question">
            There is no level {levelNum} in the {trackInfo.label} quiz.
          </p>
          <Link className="ok-btn" to={trackInfo.levelsPath}>Back to levels</Link>
        </div>
      </div>
    );
  }

  const submitFinal = async (finalAnswers) => {
    if (!user) {
      setError("Please sign in to submit the quiz.");
      return;
    }
    setSubmitting(true);
    try {
      // sessionId identifies the exact set that was served, so the server can
      // score it — the client never receives an answer key.
      const { result } = await post(`/api/quizzes/${quiz.id}/submit`, {
        answers: finalAnswers,
        sessionId: quiz.sessionId,
      });
      setResult(result);
      refresh(); // update coins/stars in the header/profile
    } catch (e) {
      setError(e.message);
    } finally {
      setSubmitting(false);
    }
  };

  const submitAnswer = () => {
    if (selected === null) {
      setError("Please select an option.");
      return;
    }
    setError("");
    const nextAnswers = [...answers];
    nextAnswers[current] = selected;
    setAnswers(nextAnswers);
    setSelected(null);

    if (current + 1 < questions.length) {
      setCurrent(current + 1);
    } else {
      submitFinal(nextAnswers);
    }
  };

  const progress = result ? 100 : (current / questions.length) * 100;

  return (
    <div className="quiz-page">
      <div className="quiz-container">
        <h2>{trackInfo.label} &mdash; Level {levelNum} Quiz</h2>

        <div className="quiz-progress-bar">
          <div className="quiz-progress-fill" style={{ width: `${progress}%` }} />
        </div>

        {result ? (
          <div className="quiz-result">
            <i
              className={`fas ${result.passed ? "fa-check-circle pass-icon" : "fa-times-circle fail-icon"}`}
              style={{ fontSize: "40px" }}
            />
            <h2 className={result.passed ? "pass-heading" : "fail-heading"}>
              {result.passed ? "Great Job!" : "Try Again!"}
            </h2>
            <p className="score-text">
              {result.passed
                ? `You passed! Score: ${result.score}/${result.total}`
                : `You scored ${result.score}/${result.total}.`}
            </p>
            {result.passed && (
              <>
                <div className="stars">
                  {[1, 2, 3].map((i) => (
                    <span key={i} className={`star${i <= result.stars ? " filled" : ""}`}>&#9733;</span>
                  ))}
                </div>
                <p className="coins-earned">
                  {result.coinsAwarded > 0
                    ? `Coins earned: ${result.coinsAwarded}`
                    : "No new coins (you'd already earned these)."}
                </p>
              </>
            )}
            <div className="quiz-actions quiz-result-actions">
              <button className="back-btn" onClick={() => navigate(trackInfo.levelsPath)}>Back to levels</button>
              <button className="ok-btn" onClick={() => setAttemptKey((k) => k + 1)}>
                Try new questions
              </button>
            </div>
            {quiz.randomized && (
              <p className="quiz-fresh-note">
                <i className="fas fa-shuffle" /> Every attempt draws a different set of questions.
              </p>
            )}

            {/* The next attempt asks different questions, so this is the only
                place a player gets to see what they actually got wrong. */}
            <AnswerReview review={result.review} />
          </div>
        ) : (
          <>
            <div className="quiz-question">
              <span className="quiz-qnum">{current + 1}.</span>
              <QuestionText text={questions[current].question} />
            </div>

            <form onSubmit={(e) => e.preventDefault()}>
              {questions[current].options.map((option, index) => (
                <label className="option" key={index}>
                  <input
                    type="radio"
                    name="option"
                    value={index}
                    checked={selected === index}
                    onChange={() => { setSelected(index); setError(""); }}
                  />
                  <QuestionText text={option} className="qt-inline" />
                </label>
              ))}
            </form>

            {error && <p className="quiz-error">{error}</p>}

            <div className="quiz-actions">
              <button className="back-btn" onClick={() => navigate(trackInfo.levelsPath)}>Back</button>
              <button className="submit-btn" onClick={submitAnswer} disabled={submitting}>
                {submitting ? "Submitting…" : current + 1 < questions.length ? "Submit" : "Finish"}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default QuizLevel;
