import React, { useState } from "react";
import QuestionText from "./QuestionText";
import "../styles/AnswerReview.css";

// Post-submission answer review.
//
// Every attempt now draws a different set of questions, so a player can no
// longer learn what they got wrong by retaking and paying attention — the
// second attempt asks different things. The submit endpoints already return the
// full picture (prompt, options, the answer given, the correct one and the
// explanation); this renders it.
//
// Prompts and options carry lightweight markdown — code fences from the
// generators, `inline code` — so both go through QuestionText.
export default function AnswerReview({ review, defaultOpen, title = "Review your answers" }) {
  const rows = Array.isArray(review) ? review : [];
  const wrong = rows.filter((r) => !r.correct).length;
  // Unset → open itself only when there is actually something to learn from.
  const [open, setOpen] = useState(defaultOpen ?? wrong > 0);
  if (rows.length === 0) return null;

  return (
    <div className={`arv ${open ? "open" : ""}`}>
      <button className="arv-toggle" onClick={() => setOpen((o) => !o)} aria-expanded={open}>
        <i className={`fa-solid fa-chevron-${open ? "down" : "right"}`} />
        <span>{title}</span>
        <span className={`arv-badge ${wrong === 0 ? "ok" : ""}`}>
          {wrong === 0 ? "all correct" : `${wrong} to review`}
        </span>
      </button>

      {open && (
        <ol className="arv-list">
          {rows.map((r, i) => {
            const options = r.options || [];
            const skipped = r.selectedIndex == null || r.selectedIndex < 0;
            return (
              <li className={`arv-item ${r.correct ? "ok" : "bad"}`} key={i}>
                <div className="arv-head">
                  <span className={`arv-mark ${r.correct ? "ok" : "bad"}`}>
                    <i className={`fa-solid fa-${r.correct ? "check" : "xmark"}`} />
                  </span>
                  <div className="arv-prompt">
                    <QuestionText text={r.prompt || ""} />
                  </div>
                </div>

                {options.length > 0 ? (
                  <ul className="arv-options">
                    {options.map((opt, oi) => {
                      const isCorrect = oi === r.correctIndex;
                      const isChosen = oi === r.selectedIndex;
                      if (!isCorrect && !isChosen) {
                        return (
                          <li className="arv-opt" key={oi}>
                            <span className="arv-opt-key">{String.fromCharCode(65 + oi)}</span>
                            <QuestionText text={opt} className="qt-inline" />
                          </li>
                        );
                      }
                      return (
                        <li className={`arv-opt ${isCorrect ? "correct" : "wrong"}`} key={oi}>
                          <span className="arv-opt-key">{String.fromCharCode(65 + oi)}</span>
                          <QuestionText text={opt} className="qt-inline" />
                          <span className="arv-tag">
                            {isCorrect && isChosen ? "your answer · correct"
                              : isCorrect ? "correct answer"
                              : "your answer"}
                          </span>
                        </li>
                      );
                    })}
                  </ul>
                ) : (
                  // Older sessions stored no option text — show the verdict only.
                  <p className="arv-plain">
                    {r.correct ? "You answered correctly." : `Correct answer: option ${String.fromCharCode(65 + r.correctIndex)}.`}
                  </p>
                )}

                {skipped && !r.correct && <p className="arv-skipped">You didn't answer this one.</p>}

                {r.explanation && (
                  <p className="arv-explain">
                    <i className="fa-solid fa-circle-info" /> {r.explanation}
                  </p>
                )}
              </li>
            );
          })}
        </ol>
      )}
    </div>
  );
}
