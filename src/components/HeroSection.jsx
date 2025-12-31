import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/HeroSection.css";
import "../styles/animations.css";

const Hero = () => {
  const navigate = useNavigate();

  return (
    <section className="hero">
      <div className="left">
        <h1 className="hero-headline">Learn to code, play to win.</h1>
        <p className="hero-subheadline">
          Master compilers, complete real coding courses, collect coins, and unlock levels in the most addictive way to learn programming.
        </p>
        <button className="hero-btn" onClick={() => navigate("/course")}>
          Start Learning
        </button>
      </div>

      <div className="right">
        <img src="/images/hero.png" alt="Hero" className="hero-image" />
      </div>
    </section>
  );
};

export default Hero;
