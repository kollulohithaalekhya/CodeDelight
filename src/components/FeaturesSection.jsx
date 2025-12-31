import React from "react";
import "../styles/FeaturesSection.css";

const Feature = () => {
  const features = [
    {
      icon: "fa-solid fa-gamepad",
      title: "Gamified Learning",
      text: "Earn coins, badges, and unlock levels while learning to code.",
    },
    {
      icon: "fa-solid fa-laptop-code",
      title: "Interactive Practice",
      text: "Use real-time compilers to practice and submit your code live.",
    },
    {
      icon: "fa-solid fa-award",
      title: "Certified Courses",
      text: "Get certified upon completing skill-based and project-driven courses.",
    },
    {
      icon: "fa-solid fa-users",
      title: "Community Support",
      text: "Engage with peers, mentors, and participate in coding challenges.",
    },
  ];

  return (
    <section className="features-section">
      <h2 className="features-heading">Why Choose Code Delight?</h2>
      <div className="features-container">
        {features.map((feature, index) => (
          <div className="feature-box" key={index}>
            <i className={feature.icon}></i>
            <h3>{feature.title}</h3>
            <p>{feature.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Feature;
