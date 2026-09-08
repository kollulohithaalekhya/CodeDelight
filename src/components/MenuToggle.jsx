import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const BASE_ITEMS = [
  { name: "Home", path: "/" },
  { name: "Courses", path: "/course" },
  { name: "Compilers", path: "/compiler" },
  { name: "Fun Zone", path: "/funzone" },
];

const MenuToggle = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const containerRef = useRef(null);
  const { user, logout } = useAuth();

  // Auth-aware items: profile/logout when signed in, sign in/up when not.
  const menuItems = user
    ? [...BASE_ITEMS, { name: "Profile", path: "/profile" }, { name: "Logout", action: "logout" }]
    : [...BASE_ITEMS, { name: "Sign In", path: "/signin" }, { name: "Sign Up", path: "/signup" }];

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

  const handleItem = (item) => {
    setIsOpen(false);
    if (item.action === "logout") {
      logout();
      navigate("/");
    } else {
      navigate(item.path);
    }
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
            {menuItems.map((item) => (
              <div
                key={item.path || item.action}
                className="nav-item"
                onClick={() => handleItem(item)}
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
