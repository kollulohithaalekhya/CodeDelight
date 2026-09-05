import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import CourseSidebar from "../components/CourseSidebar";
import CourseBlock from "../components/CourseBlock";
import htmlCourse from "../data/courses/html.json";
import cssCourse from "../data/courses/css.json";
import jsCourse from "../data/courses/js.json";
import dsaCourse from "../data/courses/dsa.json";
import "../styles/Sidebar.css";
import "../styles/CourseView.css";

const COURSES = { html: htmlCourse, css: cssCourse, js: jsCourse, dsa: dsaCourse };

function CourseView({ course }) {
  const params = useParams();
  const data = COURSES[course || params.course] || htmlCourse;

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeId, setActiveId] = useState(data.sections[0].id);

  // Switching courses on the same route must reset the reader to the top.
  useEffect(() => {
    setActiveId(data.sections[0].id);
  }, [data]);

  const section = data.sections.find((s) => s.id === activeId) || data.sections[0];
  const labelFor = (id) => {
    for (const entry of data.sidebar.entries) {
      if (entry.type === "link" && entry.id === id) return entry.label;
      if (entry.type === "group") {
        const item = entry.items.find((i) => i.id === id);
        if (item) return item.label;
      }
    }
    return id;
  };

  const showContent = (id) => {
    setActiveId(id);
    setIsSidebarOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="parent course-parent">
      <CourseSidebar
        sidebar={data.sidebar}
        quizPath={data.quizPath}
        activeId={activeId}
        isOpen={isSidebarOpen}
        onSelect={showContent}
        closeSidebar={() => setIsSidebarOpen(false)}
      />

      {/* Backdrop for the off-canvas sidebar on narrow screens */}
      {isSidebarOpen && (
        <div className="sidebar-backdrop" onClick={() => setIsSidebarOpen(false)} />
      )}

      <div className="main">
        <div className="heading">
          <div className="menu" onClick={() => setIsSidebarOpen(true)} role="button" aria-label="Open course menu">
            <FaBars />
          </div>
          <h1>{data.title}</h1>
          <h2>{data.subtitle}</h2>
          <input type="button" value="Back to Home" onClick={() => window.history.back()} />
        </div>

        <div className="content-section" key={activeId}>
          {section.blocks.map((block, index) => (
            <CourseBlock key={index} block={block} />
          ))}

          {(section.prev || section.next) && (
            <div className="nav-buttons">
              {section.prev ? (
                <button onClick={() => showContent(section.prev)}>
                  &laquo; PREVIOUS
                  <span className="nav-target">{labelFor(section.prev)}</span>
                </button>
              ) : (
                <span />
              )}
              {section.next && (
                <button onClick={() => showContent(section.next)}>
                  NEXT &raquo;
                  <span className="nav-target">{labelFor(section.next)}</span>
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default CourseView;
