import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const MenuToggle = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const menuItems = [
    { name: "Home", path: "/" },
    { name: "Courses", path: "/course" },
    { name: "Compilers", path: "/compilers" },
    { name: "Fun Zone", path: "/funzone" },
    { name: "Sign In", path: "/signin" },
    { name: "Sign Up", path: "/signup" },
  ];

  useEffect(() => {
    let timer;
    if (isOpen) {
      timer = setTimeout(() => setIsOpen(false), 120000);
    }
    return () => clearTimeout(timer);
  }, [isOpen]);

  const handleNavigate = (path) => {
    navigate(path);
    setIsOpen(false);
  };

  return (
    <div className="menu_toggle">
      <div className="parent">
        <span
          className="material-symbols-outlined"
          style={{ fontSize: "32px", color: "white", cursor: "pointer" }}
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? "close" : "menu"}
        </span>
        {isOpen && (
          <div className="mobile_nav">
            {menuItems.map((item, index) => (
              <div
                key={index}
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
