import React from "react";
import { Link } from "react-router-dom"; // ✅ Import Link
import "../styles/CourseSection.css";

const CourseSection = () => {
  const courses = [
    {
      className: "html",
      icon: "fa-brands fa-html5",
      title: "HTML",
      description: "Structure the web with semantic and accessible markup.",
      link: "/html-course", 
    },
    {
      className: "css",
      icon: "fa-brands fa-css3-alt",
      title: "CSS",
      description: "Style beautiful websites with powerful layouts and animations.",
      link: "/css-course",
    },
    {
      className: "js",
      icon: "fa-brands fa-js",
      title: "JavaScript",
      description: "Bring engaging interactivity and vibrant life to your web projects.",
      link: "/js-course",
    },
    {
      className: "dsa",
      icon: "fa-solid fa-database",
      title: "DSA",
      description: "Master Data Structures and Algorithms for coding interviews.",
      link: "/dsa-course",
    },
  ];

  return (
    <section className="courses-section">
      <h2 className="courses-heading">Explore Our Courses</h2>
      <div className="courses-container">
        {courses.map((course, index) => (
          <div key={index} className={`course-card ${course.className}`}>
            <i className={course.icon}></i>
            <h3>{course.title}</h3>
            <p>{course.description}</p>
            <Link to={course.link}>Start Learning</Link>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CourseSection;
