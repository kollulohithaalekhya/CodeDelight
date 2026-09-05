import React from "react";
import { Link } from "react-router-dom";
import TrackGroup from "./TrackGroupSection";
import "../styles/CoursePage.css";

export default function Courses() {
  const fsdCourses = [
    { icon: "fa-brands fa-html5", title: "HTML", text: "Structure the web with semantic and accessible markup.", link: "/html-course" },
    { icon: "fa-brands fa-css3-alt", title: "CSS", text: "Style beautiful websites with powerful layouts and animations.", link: "/css-course" },
    { icon: "fa-brands fa-js", title: "JavaScript", text: "Bring engaging interactivity and vibrant life to your web projects.", link: "/js-course" },
    { comingSoon: true, text: "React, Node.js, and MongoDB modules launching soon." }
  ];

  const dsaCourses = [
    { icon: "fa-solid fa-database", title: "DSA", text: "Master Data Structures and Algorithms for coding interviews.", link: "/dsa-course" },
    { comingSoon: true, text: "More DSA topics like Graphs, and DP on the way." }
  ];

  const quizCourses = [
    { icon: "fas fa-brain", title: "DSA Quiz", text: "Test your Data Structures & Algorithms knowledge.", link: "/dsa-levels" },
    { icon: "fab fa-html5", title: "HTML Quiz", text: "Assess your understanding of HTML basics and beyond.", link: "/html-levels" },
    { icon: "fab fa-css3-alt", title: "CSS Quiz", text: "Challenge yourself with styling and layout questions.", link: "/css-levels" },
    { icon: "fa-brands fa-js", title: "JavaScript Quiz", text: "Bring interactivity and life to your web projects.", link: "/js-levels" }
  ];

  // Shown after the course lists: how the tracks fit together and where to go next.
  const nextSteps = [
    {
      icon: "fa-solid fa-route",
      title: "Follow the track order",
      text: "Start with HTML, move on to CSS and JavaScript, then take on DSA. Every lesson has Previous and Next buttons so you never lose your place.",
    },
    {
      icon: "fa-solid fa-code",
      title: "Practise what you read",
      text: "Every topic ships with a live editor. Open the compilers to build something bigger once a lesson clicks.",
      link: { to: "/compiler", label: "Open the compilers" },
    },
    {
      icon: "fa-solid fa-trophy",
      title: "Earn coins and stars",
      text: "Clear a quiz level to earn stars and coins, then spend them in the Fun Zone on DSA games.",
      link: { to: "/funzone", label: "Go to the Fun Zone" },
    },
  ];

  return (
    <section className="courses__section" id="courses">
      <div className="courses__header">
        <h2>Explore Our Courses</h2>
        <p>Focused tracks to accelerate your learning</p>
      </div>

      <TrackGroup title="Full Stack Development" courses={fsdCourses} />
      <TrackGroup title="DSA Track" courses={dsaCourses} />
      <TrackGroup title="Quizzes" courses={quizCourses} />

      <div className="courses__next">
        <h3 className="track__title">What to do next</h3>
        <div className="courses__next-grid">
          {nextSteps.map((step) => (
            <div className="courses__next-card" key={step.title}>
              <i className={`${step.icon} courses__next-icon`}></i>
              <h4>{step.title}</h4>
              <p>{step.text}</p>
              {step.link && (
                <Link to={step.link.to} className="course__button">
                  {step.link.label}
                </Link>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
