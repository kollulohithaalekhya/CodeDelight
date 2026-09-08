import React, { useEffect, useState } from "react";
import { get } from "../api/client";
import "../styles/FeaturesSection.css";

// Shown when the admin hasn't configured any features yet.
const DEFAULT_FEATURES = [
  { icon: "fa-solid fa-gamepad", title: "Gamified Learning", description: "Earn coins, badges, and unlock levels while learning to code." },
  { icon: "fa-solid fa-laptop-code", title: "Interactive Practice", description: "Use real-time compilers to practice and submit your code live." },
  { icon: "fa-solid fa-award", title: "Certified Courses", description: "Get certified upon completing skill-based and project-driven courses." },
  { icon: "fa-solid fa-users", title: "Community Support", description: "Engage with peers, mentors, and participate in coding challenges." },
];

const Feature = () => {
  const [features, setFeatures] = useState(DEFAULT_FEATURES);

  useEffect(() => {
    get("/api/home", { auth: false })
      .then((d) => {
        const list = d?.home?.features;
        if (Array.isArray(list) && list.length > 0) {
          setFeatures([...list].sort((a, b) => (a.order || 0) - (b.order || 0)));
        }
      })
      .catch(() => {});
  }, []);

  return (
    <section className="features-section">
      <h2 className="features-heading">Why Choose Code Delight?</h2>
      <div className="features-container">
        {features.map((feature, index) => (
          <div className="feature-box" key={index}>
            <i className={feature.icon}></i>
            <h3>{feature.title}</h3>
            <p>{feature.description || feature.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Feature;
