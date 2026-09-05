import { useState } from "react";

const levelNum = 1;
const coinsPerStar = 10;

const questions = [
  {
    question: "What is the index of the first element in an array?",
    options: ["-1", "0", "1", "Depends on the language"],
    answer: 1,
  },
  {
    question: "Which of the following best describes an array?",
    options: [
      "A dynamic data structure",
      "A collection of data values of different types",
      "A collection of data items of the same type stored at contiguous memory locations",
      "A type of file",
    ],
    answer: 2,
  },
  {
    question: "What is the time complexity of accessing an element in an array by index?",
    options: ["O(n)", "O(1)", "O(log n)", "O(n log n)"],
    answer: 1,
  },
  {
    question: "How do you find the length of an array in Python?",
    options: ["length(arr)", "count(arr)", "size(arr)", "len(arr)"],
    answer: 3,
  },
  {
    question: "Which of the following is a disadvantage of arrays?",
    options: [
      "Fixed size",
      "Random access",
      "Efficient indexing",
      "Storing elements of the same type",
    ],
    answer: 0,
  },
  {
    question:
      "What will be the result of this JavaScript code?\nlet arr = [1, 2, 3];\narr.push(4);\nconsole.log(arr.length);",
    options: ["3", "4", "1", "Error"],
    answer: 1,
  },
  {
    question:
      'What will be the output of this C code?\nint arr[] = {10, 20, 30, 40};\nprintf("%d", arr[2]);',
    options: ["10", "20", "30", "Error"],
    answer: 2,
  },
  {
    question:
      "What will be the output of this Python code?\narr = [5, 10, 15]\nprint(arr[-1])",
    options: ["5", "10", "15", "Error"],
    answer: 2,
  },
  {
    question: "In C, what happens if you access arr[10] when the array has only 5 elements?",
    options: [
      "Returns 0",
      "Returns garbage value or causes a crash",
      "Raises a runtime error",
      "Automatically resizes the array",
    ],
    answer: 1,
  },
  {
    question: "Which method removes the last element of an array in JavaScript?",
    options: ["remove()", "pop()", "shift()", "delete()"],
    answer: 1,
  },
];

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
  const currentUnlocked = parseInt(localStorage.getItem("unlockedLevel")) || 1;
  if (starsEarned >= 1 && levelNum + 1 > currentUnlocked) {
    localStorage.setItem("unlockedLevel", levelNum + 1);
  }
}

export default function Level1Quiz() {
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [quizFinished, setQuizFinished] = useState(false);
  const [starsEarned, setStarsEarned] = useState(0);
  const [coinsEarned, setCoinsEarned] = useState(0);

  const progressPercent = quizFinished
    ? 100
    : (current / questions.length) * 100;

  const handleSubmit = () => {
    if (selectedOption === null) {
      alert("Please select an option.");
      return;
    }
    const isCorrect = selectedOption === questions[current].answer;
    const newScore = isCorrect ? score + 1 : score;
    if (isCorrect) setScore(newScore);

    const nextIndex = current + 1;
    if (nextIndex < questions.length) {
      setCurrent(nextIndex);
      setSelectedOption(null);
    } else {
      let stars = 0;
      if (newScore >= 8) stars = 3;
      else if (newScore >= 5) stars = 2;
      else if (newScore >= 3) stars = 1;

      setStarsEarned(stars);

      if (stars > 0) {
        const coins = stars * coinsPerStar;
        setCoinsEarned(coins);
        const totalCoins = parseInt(localStorage.getItem("coins") || "0");
        localStorage.setItem("coins", (totalCoins + coins).toString());
        completeLevel(levelNum, stars);
      }
      setQuizFinished(true);
    }
  };

  const q = questions[current];

  return (
    <div style={s.page}>
      <div style={s.container}>
        <h2 style={s.title}>Arrays</h2>

        {/* Progress Bar */}
        <div style={s.progressTrack}>
          <div style={{ ...s.progressFill, width: `${progressPercent}%` }} />
        </div>

        {!quizFinished ? (
          <>
            <p style={s.question}>{`${current + 1}. ${q.question}`}</p>

            <div style={s.optionsList}>
              {q.options.map((opt, index) => (
                <label
                  key={index}
                  style={{
                    ...s.option,
                    ...(selectedOption === index ? s.optionActive : {}),
                  }}
                >
                  <input
                    type="radio"
                    name="option"
                    value={index}
                    checked={selectedOption === index}
                    onChange={() => setSelectedOption(index)}
                    style={s.radio}
                  />
                  <span>{opt}</span>
                </label>
              ))}
            </div>

            <button style={s.submitBtn} onClick={handleSubmit}>
              Submit
            </button>
          </>
        ) : (
          <div style={s.result}>
            {starsEarned > 0 ? (
              <>
                <div style={s.resultIcon}>✔</div>
                <h2 style={{ ...s.resultHeading, color: "#00f2fe" }}>Great Job!</h2>
                <p style={s.scoreText}>
                  You passed! Score: {score}/{questions.length}
                </p>
                <div style={s.starsRow}>
                  {[1, 2, 3].map((i) => (
                    <span
                      key={i}
                      style={i <= starsEarned ? s.starOn : s.starOff}
                    >
                      ★
                    </span>
                  ))}
                </div>
                <p style={s.coinsText}>Coins earned: {coinsEarned}</p>
              </>
            ) : (
              <>
                <div style={{ ...s.resultIcon, color: "#ff6b6b" }}>✘</div>
                <h2 style={{ ...s.resultHeading, color: "#ff6b6b" }}>Try Again!</h2>
                <p style={s.scoreText}>
                  You scored {score}/{questions.length}.
                </p>
              </>
            )}
            <button
              style={s.okBtn}
              onClick={() => (window.location.href = "DSA-levels.html")}
            >
              OK
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

const s = {
  page: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "linear-gradient(145deg, #0a1d3a, #102944)",
    fontFamily: "'Segoe UI', sans-serif",
    padding: "20px",
    boxSizing: "border-box",
  },
  container: {
    width: "100%",
    maxWidth: "700px",
    border: "2px solid #00f2fe",
    borderRadius: "16px",
    padding: "30px 40px",
    boxSizing: "border-box",
    color: "#ffffff",
  },
  title: {
    textAlign: "center",
    color: "#00f2fe",
    marginBottom: "20px",
    fontSize: "2rem",
  },
  progressTrack: {
    height: "12px",
    width: "100%",
    background: "rgba(255,255,255,0.3)",
    borderRadius: "8px",
    overflow: "hidden",
    marginBottom: "20px",
  },
  progressFill: {
    height: "100%",
    background: "linear-gradient(to right, #00f2fe, #4facfe)",
    transition: "width 0.3s ease",
  },
  question: {
    fontSize: "1.2rem",
    marginBottom: "24px",
    color: "#ffffff",
    whiteSpace: "pre-wrap",
    lineHeight: 1.6,
  },
  optionsList: {
    display: "flex",
    flexDirection: "column",
    gap: "0px",
    marginBottom: "20px",
  },
  option: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    border: "1px solid #ffffff",
    borderRadius: "12px",
    padding: "12px 16px",
    margin: "8px 0",
    background: "rgba(255,255,255,0.1)",
    color: "#ffffff",
    cursor: "pointer",
    fontSize: "1rem",
    lineHeight: 1.5,
    transition: "background 0.2s",
    boxSizing: "border-box",
  },
  optionActive: {
    background: "rgba(0, 242, 254, 0.2)",
    borderColor: "#00f2fe",
  },
  radio: {
    accentColor: "#ffffff",
    transform: "scale(1.2)",
    flexShrink: 0,
  },
  submitBtn: {
    marginTop: "10px",
    padding: "10px 25px",
    fontSize: "16px",
    background: "#ffffff",
    color: "#142042",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: 600,
  },
  result: {
    textAlign: "center",
    padding: "16px 0",
    animation: "fadeIn 0.5s ease-in-out",
  },
  resultIcon: {
    fontSize: "48px",
    color: "#00f2fe",
    marginBottom: "8px",
  },
  resultHeading: {
    fontSize: "1.6rem",
    fontWeight: 700,
    marginBottom: "8px",
  },
  scoreText: {
    fontSize: "1rem",
    color: "#cccccc",
    marginBottom: "16px",
  },
  starsRow: {
    display: "flex",
    justifyContent: "center",
    gap: "5px",
    fontSize: "2rem",
    marginBottom: "12px",
    userSelect: "none",
  },
  starOn: {
    color: "#ffd93b",
  },
  starOff: {
    color: "#444444",
  },
  coinsText: {
    fontWeight: 600,
    color: "#00f2fe",
    fontSize: "1rem",
    marginBottom: "24px",
    marginTop: "15px",
  },
  okBtn: {
    padding: "10px 48px",
    fontSize: "16px",
    background: "#ffffff",
    color: "#142042",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: 600,
    marginTop: "8px",
  },
};