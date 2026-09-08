import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { get } from "../api/client";
import "../styles/CoursePage.css";
import "../styles/CourseCatalog.css";

const TRACK_ICON = {
  html: "fa-brands fa-html5",
  css: "fa-brands fa-css3-alt",
  js: "fa-brands fa-js",
  dsa: "fa-solid fa-diagram-project",
  other: "fa-solid fa-book",
};

const DIFF_TINT = { Beginner: "beg", Intermediate: "int", Advanced: "adv" };

export default function Courses() {
  const [courses, setCourses] = useState([]);
  const [progress, setProgress] = useState({}); // courseId -> {percent, completed}
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    Promise.allSettled([get("/api/courses"), get("/api/courses/mine")])
      .then(([all, mine]) => {
        if (all.status === "fulfilled") setCourses(all.value.courses);
        else setError(all.reason?.message || "Could not load courses");
        if (mine.status === "fulfilled") {
          const map = {};
          mine.value.courses.forEach((c) => { map[c.id] = c; });
          setProgress(map);
        }
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="courses__section" id="courses">
      <div className="courses__header">
        <h2>Explore Our Courses</h2>
        <p>Structured, gamified tracks to accelerate your learning</p>
      </div>

      {error && <div className="catalog-error">{error}</div>}

      {loading ? (
        <div className="catalog-grid">
          {Array.from({ length: 4 }).map((_, i) => <div className="catalog-card skeleton" key={i} />)}
        </div>
      ) : courses.length === 0 ? (
        <p className="catalog-empty">No published courses yet. Check back soon!</p>
      ) : (
        <div className="catalog-grid">
          {courses.map((c) => {
            const p = progress[c.id];
            const pct = p?.percent ?? 0;
            return (
              <Link to={`/learn/${c.slug}`} className="catalog-card" key={c.id}>
                <div className={`catalog-thumb tint-${c.track}`}>
                  {c.thumbnail
                    ? <img src={c.thumbnail} alt={c.title} />
                    : <i className={TRACK_ICON[c.track] || TRACK_ICON.other}></i>}
                  <span className={`catalog-diff diff-${DIFF_TINT[c.difficulty] || "beg"}`}>{c.difficulty}</span>
                </div>

                <div className="catalog-body">
                  <h3>{c.title}</h3>
                  <p>{c.subtitle || c.description || "Start learning today."}</p>

                  <div className="catalog-meta">
                    <span><i className="fa-solid fa-layer-group"></i> {c.modules} modules</span>
                    <span><i className="fa-solid fa-book-open"></i> {c.lessons} lessons</span>
                    {c.isFree ? <span className="free">Free</span> : <span className="paid">{c.priceCoins} 🪙</span>}
                  </div>

                  {p && (
                    <div className="catalog-progress">
                      <div className="catalog-bar"><span style={{ width: `${pct}%` }} /></div>
                      <small>{p.completed ? "Completed 🎉" : `${pct}% complete`}</small>
                    </div>
                  )}

                  <span className="catalog-cta">
                    {p ? (p.completed ? "Review course" : "Continue") : "Start course"} <i className="fa-solid fa-arrow-right"></i>
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </section>
  );
}
