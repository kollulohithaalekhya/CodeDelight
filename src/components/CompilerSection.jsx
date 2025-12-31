import React from "react";
import "../styles/CompilerSection.css";
import { Link } from "react-router-dom";
const CompilerSection = () => {
  const features = [
    "Code, test & debug instantly in any language.",
    "Build web apps with our HTML and React compilers.",
    "Optimize your code using AI-driven debugging.",
  ];

  return (
    <section className="compiler-section">
      <div className="compiler-wrapper">
        <div className="compiler-image-box">
          <img src="/images/compiler.png" alt="Online Compiler" />
        </div>

        <div className="compiler-info-box">
          <h2 className="compiler-title">Online Compiler</h2>
          <p className="compiler-subtitle">Your Interactive Coding Playground</p>

          <ul className="compiler-features">
            {features.map((feature, index) => (
              <li key={index}>{feature}</li>
            ))}
          </ul>

          <Link to="/compiler" className="compiler-btn">
            Explore Compiler
          </Link>

        </div>
      </div>
    </section>
  );
};

export default CompilerSection;
