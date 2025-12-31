import React from "react";
import { Link } from "react-router-dom";

export default function TrackGroup({ title, courses }) {
  return (
    <div className="track__group">
      <h3 className="track__title">{title}</h3>
      <div className="track__grid">
        {courses.map((course, index) => (
          <div
            key={index}
            className={`course__card ${course.comingSoon ? "course__card--coming-soon" : ""}`}
          >
            {/* Icon */}
            {!course.comingSoon && (
              <i className={`${course.icon} course__icon`}></i>
            )}

            {/* Title */}
            <h4 className="course__title">
              {course.title || "Coming Soon"}
            </h4>

            {/* Description */}
            <p className="course__description">{course.text}</p>

            {/* Start Learning Button */}
            {!course.comingSoon && course.link && (
              <Link to={course.link} className="course__button">
                Start Learning
              </Link>
            )}

            {/* Coming Soon Tag */}
            {course.comingSoon && (
              <span className="course__coming-text">Coming Soon 🚀</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
