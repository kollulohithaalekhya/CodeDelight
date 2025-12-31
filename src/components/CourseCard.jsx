import React from "react";

export default function CourseCard({ icon, title, text, link, comingSoon }) {
  return (
    <div className={`course__card ${comingSoon ? "course__card--coming-soon" : ""}`}>
      {!comingSoon ? (
        <>
          <i className={`course__icon ${icon}`}></i>
          <h3 className="course__title">{title}</h3>
          <p className="course__description">{text}</p>
          <a href={link} className="course__button">Start Learning</a>
        </>
      ) : (
        <>
          <h3 className="course__coming-title">Coming Soon...</h3>
          <p className="course__coming-text">{text}</p>
        </>
      )}
    </div>
  );
}
