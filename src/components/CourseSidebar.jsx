import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

/**
 * Course content navigation, driven by the sidebar data extracted from the
 * original course pages. Entries keep the source order: `group` entries are
 * collapsible, `link` entries jump straight to a section.
 */
function CourseSidebar({ sidebar, quizPath, activeId, isOpen, onSelect, closeSidebar }) {
  const groupOwning = (id) =>
    sidebar.entries.findIndex(
      (entry) => entry.type === "group" && entry.items.some((item) => item.id === id)
    );

  const [openMenu, setOpenMenu] = useState(() => {
    const index = groupOwning(activeId);
    return index === -1 ? null : index;
  });

  // Keep the group containing the current section expanded after a
  // Next/Previous jump, so the sidebar always shows where you are.
  useEffect(() => {
    const index = groupOwning(activeId);
    if (index !== -1) setOpenMenu(index);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeId, sidebar]);

  const toggleSubmenu = (index) => setOpenMenu(openMenu === index ? null : index);

  return (
    <div className={`sidebar ${isOpen ? "active" : ""}`}>
      <span className="cross" onClick={closeSidebar} role="button" aria-label="Close course menu">
        &times;
      </span>
      <h2>Course Content</h2>
      <div className="line"></div>

      <ul className="nav-links">
        {sidebar.entries.map((entry, index) =>
          entry.type === "link" ? (
            <li
              key={entry.id}
              className={`diff ${activeId === entry.id ? "active" : ""}`}
              onClick={() => onSelect(entry.id)}
            >
              {entry.label}
            </li>
          ) : (
            <React.Fragment key={`${entry.label}-${index}`}>
              <li onClick={() => toggleSubmenu(index)} className="diff">
                {entry.label}
                <span className="arrow">
                  {openMenu === index ? <FaChevronUp size={10} /> : <FaChevronDown size={10} />}
                </span>
              </li>
              {openMenu === index && (
                <ul className="submenu">
                  {entry.items.map((item) => (
                    <li
                      key={item.id}
                      className={activeId === item.id ? "active" : ""}
                      onClick={() => onSelect(item.id)}
                    >
                      {item.label}
                    </li>
                  ))}
                </ul>
              )}
            </React.Fragment>
          )
        )}

        {quizPath && (
          <Link to={quizPath} className="sidebar-quiz-link">
            <li className="diff check-knowledge">Check Your Knowledge</li>
          </Link>
        )}
      </ul>
    </div>
  );
}

export default CourseSidebar;
