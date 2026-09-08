import React, { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/SearchBar.css";

// Searchable index of the app's real destinations. `keywords` widen matches.
const INDEX = [
  { label: "Home", desc: "Landing page", to: "/", icon: "home", keywords: "start main" },
  { label: "Dashboard", desc: "Your learning stats", to: "/dashboard", icon: "dashboard", keywords: "stats overview" },
  { label: "Profile", desc: "Your profile & badges", to: "/profile", icon: "person", keywords: "account me badges streak" },
  { label: "Settings", desc: "Account & preferences", to: "/settings", icon: "settings", keywords: "privacy password appearance theme" },

  { label: "All Courses", desc: "Browse the catalog", to: "/course", icon: "menu_book", keywords: "learn catalog tracks" },
  { label: "HTML Course", desc: "Learn HTML", to: "/html-course", icon: "html", keywords: "web markup tags" },
  { label: "CSS Course", desc: "Learn CSS", to: "/css-course", icon: "css", keywords: "web styling design" },
  { label: "JavaScript Course", desc: "Learn JavaScript", to: "/js-course", icon: "javascript", keywords: "js web programming" },
  { label: "DSA Course", desc: "Data Structures & Algorithms", to: "/dsa-course", icon: "account_tree", keywords: "data structures algorithms" },

  { label: "HTML Quiz", desc: "Test your HTML", to: "/html-levels", icon: "quiz", keywords: "test levels" },
  { label: "CSS Quiz", desc: "Test your CSS", to: "/css-levels", icon: "quiz", keywords: "test levels" },
  { label: "JavaScript Quiz", desc: "Test your JavaScript", to: "/js-levels", icon: "quiz", keywords: "js test levels" },
  { label: "DSA Quiz", desc: "Test your DSA", to: "/dsa-levels", icon: "quiz", keywords: "test levels" },

  { label: "Compilers", desc: "All compilers", to: "/compiler", icon: "code", keywords: "run code editor" },
  { label: "Code Compiler", desc: "Run C, Python, Java…", to: "/compiler/code-compiler", icon: "terminal", keywords: "python c java cpp run editor" },
  { label: "Web Compiler", desc: "HTML/CSS/JS live preview", to: "/compiler/web-compiler", icon: "web", keywords: "html css js preview" },

  { label: "Fun Zone", desc: "Games & rewards", to: "/funzone", icon: "sports_esports", keywords: "games play coins" },
  { label: "Stack Simulator", desc: "Visualize a stack", to: "/funzone/stack-simulator", icon: "layers", keywords: "game dsa stack" },
];

function score(item, q) {
  const label = item.label.toLowerCase();
  const hay = `${label} ${item.desc.toLowerCase()} ${item.keywords}`;
  if (label.startsWith(q)) return 3;
  if (label.includes(q)) return 2;
  if (hay.includes(q)) return 1;
  return 0;
}

const Searchs = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const wrapRef = useRef(null);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return INDEX
      .map((item) => ({ item, s: score(item, q) }))
      .filter((r) => r.s > 0)
      .sort((a, b) => b.s - a.s)
      .slice(0, 8)
      .map((r) => r.item);
  }, [query]);

  // Close on outside click.
  useEffect(() => {
    const onDown = (e) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, []);

  useEffect(() => setActive(0), [query]);

  const goTo = (item) => {
    if (!item) return;
    setQuery("");
    setOpen(false);
    navigate(item.to);
  };

  const onKeyDown = (e) => {
    if (!open || results.length === 0) return;
    if (e.key === "ArrowDown") { e.preventDefault(); setActive((a) => (a + 1) % results.length); }
    else if (e.key === "ArrowUp") { e.preventDefault(); setActive((a) => (a - 1 + results.length) % results.length); }
    else if (e.key === "Enter") { e.preventDefault(); goTo(results[active]); }
    else if (e.key === "Escape") { setOpen(false); }
  };

  return (
    <div className="search_bar_wrap" ref={wrapRef}>
      <div className="search_bar">
        <span className="material-symbols-outlined search_icon">search</span>
        <input
          id="searchInput"
          className="search_input"
          placeholder="Search courses, quizzes, compilers…"
          value={query}
          onChange={(e) => { setQuery(e.target.value); setOpen(true); }}
          onFocus={() => setOpen(true)}
          onKeyDown={onKeyDown}
          autoComplete="off"
          role="combobox"
          aria-expanded={open}
          aria-controls="search-results"
        />
        {query && (
          <span className="material-symbols-outlined search_clear" onClick={() => setQuery("")} role="button" aria-label="Clear">
            close
          </span>
        )}
      </div>

      {open && query.trim() && (
        <div className="search_results" id="search-results" role="listbox">
          {results.length === 0 ? (
            <div className="search_empty">No matches for “{query}”.</div>
          ) : (
            results.map((item, i) => (
              <button
                key={item.to}
                className={`search_result ${i === active ? "active" : ""}`}
                onMouseEnter={() => setActive(i)}
                onMouseDown={(e) => { e.preventDefault(); goTo(item); }}
                role="option"
                aria-selected={i === active}
              >
                <span className="material-symbols-outlined search_result_icon">{item.icon}</span>
                <span className="search_result_text">
                  <strong>{item.label}</strong>
                  <span>{item.desc}</span>
                </span>
                <span className="material-symbols-outlined search_result_go">arrow_forward</span>
              </button>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default Searchs;
