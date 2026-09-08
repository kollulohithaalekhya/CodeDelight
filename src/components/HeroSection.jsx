import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { get } from "../api/client";
import { useAuth } from "../context/AuthContext";
import "../styles/HeroSection.css";
import "../styles/animations.css";

const DEFAULTS = {
  heading: "Learn to code, play to win.",
  description:
    "Master compilers, complete real coding courses, collect coins, and unlock levels in the most addictive way to learn programming.",
  buttonText: "Start Learning",
  buttonLink: "/course",
  image: "/images/hero.png",
  enabled: true,
};

// Splits the heading so the last word gets the gradient highlight.
function renderHeading(text) {
  const words = String(text).trim().split(" ");
  if (words.length < 2) return <span className="grad">{text}</span>;
  const last = words.pop();
  return (
    <>
      {words.join(" ")} <span className="grad">{last}</span>
    </>
  );
}

const AUTH_PATHS = ["/signup", "/signin", "/login"];

const Hero = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [hero, setHero] = useState(DEFAULTS);

  useEffect(() => {
    get("/api/home", { auth: false })
      .then((d) => {
        if (d?.home?.hero && d.home.hero.enabled !== false) {
          setHero({ ...DEFAULTS, ...d.home.hero });
        }
      })
      .catch(() => {});
  }, []);

  // Logged-in users should never be sent to an auth page from the CTA.
  const resolveLink = () => {
    let link = hero.buttonLink || "/course";
    if (user && AUTH_PATHS.some((p) => link.startsWith(p))) link = "/course";
    return link;
  };

  const go = () => {
    const link = resolveLink();
    if (link.startsWith("http")) window.location.href = link;
    else navigate(link);
  };

  // Tailor the label to auth state (unless the admin set a custom one).
  const ctaLabel =
    hero.buttonText && hero.buttonText !== DEFAULTS.buttonText
      ? hero.buttonText
      : user
      ? "Continue Learning"
      : "Start Learning";

  return (
    <section className="hero">
      <div className="hero-bg" aria-hidden="true">
        <span className="hero-orb orb-1" />
        <span className="hero-orb orb-2" />
        <span className="hero-grid" />
      </div>

      <div className="left">
        <span className="hero-badge">
          <i className="fa-solid fa-bolt"></i> Gamified coding platform
        </span>

        <h1 className="hero-headline">{renderHeading(hero.heading)}</h1>

        <p className="hero-subheadline">{hero.description}</p>

        <div className="hero-actions">
          <button className="hero-btn" onClick={go}>
            {ctaLabel} <i className="fa-solid fa-arrow-right"></i>
          </button>
          <button className="hero-btn ghost" onClick={() => navigate("/compiler")}>
            <i className="fa-solid fa-code"></i> Try the Compiler
          </button>
        </div>

        <div className="hero-stats">
          <div className="hero-stat"><strong>4</strong><span>Learning tracks</span></div>
          <div className="hero-stat"><strong>20+</strong><span>Quizzes &amp; games</span></div>
          <div className="hero-stat"><strong>8</strong><span>Compilers</span></div>
        </div>
      </div>

      <div className="right">
        <img src={hero.image || "/images/hero.png"} alt="Learn to code with Code Delight" className="hero-image" />
      </div>
    </section>
  );
};

export default Hero;
