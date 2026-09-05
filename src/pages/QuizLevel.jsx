import React, { useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import quizzes from "../data/quizzes.json";
import "../styles/QuizLevel.css";

const TRACKS = {
  html: { label: "HTML", levelsPath: "/html-levels" },
  css: { label: "CSS", levelsPath: "/css-levels" },
  js: { label: "JavaScript", levelsPath: "/js-levels" },
  dsa: { label: "DSA", levelsPath: "/dsa-levels" },
};

const COINS_PER_STAR = 10;

// The original quizzes used different pass marks per track: the 20-question
// HTML/CSS/JS levels needed 18/14/7, the 10-question DSA levels 8/5/3.
function starsFor(score, total) {
  const thresholds = total >= 20 ? [18, 14, 7] : [8, 5, 3];
  if (score >= thresholds[0]) return 3;
  if (score >= thresholds[1]) return 2;
  if (score >= thresholds[2]) return 1;
  return 0;
}

function completeLevel(levelNum, starsEarned) {
  localStorage.setItem(
    `level${levelNum}`,
    JSON.stringify({ unlocked: true, stars: starsEarned })
  );

  const starData = JSON.parse(localStorage.getItem("stars") || "{}");
  if (!starData[levelNum] || starData[levelNum] < starsEarned) {
    starData[levelNum] = starsEarned;
    localStorage.setItem("stars", JSON.stringify(starData));
  }

  const currentUnlocked = parseInt(localStorage.getItem("unlockedLevel"), 10) || 1;
  if (starsEarned >= 1 && levelNum + 1 > currentUnlocked) {
    localStorage.setItem("unlockedLevel", String(levelNum + 1));
  }
}

function QuizLevel() {
  const { track = "dsa", level = "1" } = useParams();
  const navigate = useNavigate();

  const levelNum = parseInt(level, 10) || 1;
  const trackInfo = TRACKS[track] || TRACKS.dsa;
  const quiz = quizzes[track] ? quizzes[track][levelNum] : null;

  const questions = useMemo(() => (quiz ? quiz.questions : []), [quiz]);

  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  if (!quiz) {
    return (
      <div className="quiz-page">
        <div className="quiz-container">
          <h2>Quiz not found</h2>
          <p className="quiz-question">
            There is no level {levelNum} in the {trackInfo.label} quiz.
          </p>
          <Link className="ok-btn" to={trackInfo.levelsPath}>
            Back to levels
          </Link>
        </div>
      </div>
    );
  }

  const finish = (finalScore) => {
    const starsEarned = starsFor(finalScore, questions.length);
    if (starsEarned > 0) {
      const coinsEarned = starsEarned * COINS_PER_STAR;
      const totalCoins =
        (parseInt(localStorage.getItem("coins"), 10) || 0) + coinsEarned;
      localStorage.setItem("coins", String(totalCoins));
      completeLevel(levelNum, starsEarned);
      setResult({ passed: true, score: finalScore, starsEarned, coinsEarned });
    } else {
      setResult({ passed: false, score: finalScore, starsEarned: 0, coinsEarned: 0 });
    }
  };

  const submitAnswer = () => {
    if (selected === null) {
      setError("Please select an option.");
      return;
    }
    setError("");
    const nextScore = selected === questions[current].answer ? score + 1 : score;
    setScore(nextScore);
    setSelected(null);

    if (current + 1 < questions.length) {
      setCurrent(current + 1);
    } else {
      finish(nextScore);
    }
  };

  const progress = result ? 100 : (current / questions.length) * 100;

  return (
    <div className="quiz-page">
      <div className="quiz-container">
        <h2>
          {trackInfo.label} &mdash; Level {levelNum} Quiz
        </h2>

        <div className="quiz-progress-bar">
          <div className="quiz-progress-fill" style={{ width: `${progress}%` }} />
        </div>

        {result ? (
          <div className="quiz-result">
            <i
              className={`fas ${
                result.passed ? "fa-check-circle pass-icon" : "fa-times-circle fail-icon"
              }`}
              style={{ fontSize: "40px" }}
            />
            <h2 className={result.passed ? "pass-heading" : "fail-heading"}>
              {result.passed ? "Great Job!" : "Try Again!"}
            </h2>
            <p className="score-text">
              {result.passed
                ? `You passed! Score: ${result.score}/${questions.length}`
                : `You scored ${result.score}/${questions.length}.`}
            </p>
            {result.passed && (
              <>
                <div className="stars">
                  {[1, 2, 3].map((i) => (
                    <span
                      key={i}
                      className={`star${i <= result.starsEarned ? " filled" : ""}`}
                    >
                      &#9733;
                    </span>
                  ))}
                </div>
                <p className="coins-earned">Coins earned: {result.coinsEarned}</p>
              </>
            )}
            <button className="ok-btn" onClick={() => navigate(trackInfo.levelsPath)}>
              OK
            </button>
          </div>
        ) : (
          <>
            <div className="quiz-question">
              {current + 1}. {questions[current].question}
            </div>

            <form onSubmit={(e) => e.preventDefault()}>
              {questions[current].options.map((option, index) => (
                <label className="option" key={index}>
                  <input
                    type="radio"
                    name="option"
                    value={index}
                    checked={selected === index}
                    onChange={() => {
                      setSelected(index);
                      setError("");
                    }}
                  />
                  {option}
                </label>
              ))}
            </form>

            {error && <p className="quiz-error">{error}</p>}

            <div className="quiz-actions">
              <button className="back-btn" onClick={() => navigate(trackInfo.levelsPath)}>
                Back
              </button>
              <button className="submit-btn" onClick={submitAnswer}>
                Submit
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default QuizLevel;
