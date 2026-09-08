import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/HeaderSection";
import Footer from "../components/FooterSection";
import { useAuth } from "../context/AuthContext";
import "../styles/ProblemArena.css";

const MODES = [
  {
    key: "problems",
    to: "/practice/problems",
    emoji: "💻",
    title: "Code Problems",
    desc: "Solve algorithm challenges against sample & hidden test cases in Python, JS, C, C++ or Java.",
    tags: ["Test cases", "Multi-language", "Auto-judge"],
    color: "problems",
  },
  {
    key: "build",
    to: "/practice/build",
    emoji: "🎨",
    title: "Build Tasks",
    desc: "Open a reference PDF, rebuild it with HTML, CSS & JS in the live editor, and pass the requirement checklist.",
    tags: ["HTML/CSS/JS", "Reference PDF", "Live preview"],
    color: "build",
  },
];

export default function PracticeHome() {
  const navigate = useNavigate();
  const { user } = useAuth();

  return (
    <>
      <Header />
      <div className="pa">
        <div className="pa-bg" aria-hidden="true"><span className="pa-orb o1" /><span className="pa-orb o2" /></div>

        <div className="pa-hero">
          <div>
            <h1>🏹 Practice Arena</h1>
            <p>Sharpen your skills two ways — crack coding problems or rebuild real UIs. Earn coins by difficulty and unlock the next level as you go.</p>
          </div>
          {user && (
            <div className="pa-stats">
              <div className="pa-stat"><i className="fa-solid fa-coins" /><span>{user.coins ?? 0}</span><small>Coins</small></div>
              {user.stars ? <div className="pa-stat"><i className="fa-solid fa-star" /><span>{user.stars}</span><small>Stars</small></div> : null}
            </div>
          )}
        </div>

        <div className="pa-modes">
          {MODES.map((m) => (
            <button key={m.key} className={`pa-mode ${m.color}`} onClick={() => navigate(m.to)}>
              <span className="pa-mode-emoji" aria-hidden="true">{m.emoji}</span>
              <h2>{m.title}</h2>
              <p>{m.desc}</p>
              <div className="pa-mode-tags">
                {m.tags.map((t) => <span key={t}>{t}</span>)}
              </div>
              <span className="pa-mode-go">Start <i className="fa-solid fa-arrow-right" /></span>
            </button>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
}
