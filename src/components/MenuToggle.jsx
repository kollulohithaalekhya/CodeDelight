import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const MENU_ITEMS = [
  { name: "Home", path: "/" },
  { name: "Courses", path: "/course" },
  { name: "Compilers", path: "/compiler" },
  { name: "Fun Zone", path: "/funzone" },
  { name: "Profile", path: "/profile" },
  { name: "Sign In", path: "/signin" },
  { name: "Sign Up", path: "/signup" },
];

const MenuToggle = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const containerRef = useRef(null);

  // Close on outside click and on Escape, so the menu never gets stuck open.
  useEffect(() => {
    if (!isOpen) return;

    const onPointerDown = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    const onKeyDown = (event) => {
      if (event.key === "Escape") setIsOpen(false);
    };

    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen]);

  const handleNavigate = (path) => {
    navigate(path);
    setIsOpen(false);
  };

  return (
    <div className="menu_toggle" ref={containerRef}>
      <div className="menu_toggle_parent">
        <span
          className="material-symbols-outlined menu_toggle_icon"
          role="button"
          tabIndex={0}
          aria-label={isOpen ? "Close menu" : "Open menu"}
          aria-expanded={isOpen}
          onClick={() => setIsOpen((open) => !open)}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              setIsOpen((open) => !open);
            }
          }}
        >
          {isOpen ? "close" : "menu"}
        </span>

        {isOpen && (
          <div className="mobile_nav">
            {MENU_ITEMS.map((item) => (
              <div
                key={item.path}
                className="nav-item"
                onClick={() => handleNavigate(item.path)}
              >
                {item.name}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MenuToggle;
