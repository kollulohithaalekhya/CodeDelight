import React from "react";
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

  return (
    <section className="courses__section" id="courses">
      <div className="courses__header">
        <h2>Explore Our Courses</h2>
        <p>Focused tracks to accelerate your learning</p>
      </div>

      <TrackGroup title="Full Stack Development" courses={fsdCourses} />
      <TrackGroup title="DSA Track" courses={dsaCourses} />
      <TrackGroup title="Quizzes" courses={quizCourses} />
    </section>
  );
}
