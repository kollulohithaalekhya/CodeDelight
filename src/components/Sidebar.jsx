import React, { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
// import { useNavigate } from "react-router-dom";
function Sidebar({ isOpen, closeSidebar, showContent }) {
  const [openMenu, setOpenMenu] = useState(null);
  // const navigate = useNavigate();
  const toggleSubmenu = (menu) => {
    setOpenMenu(openMenu === menu ? null : menu);
  };
  return (
    <div className={`sidebar ${isOpen ? "active" : ""}`}>
      <span className="cross" onClick={closeSidebar}>
        &times;
      </span>
      <h2>Course Content</h2>
      <div className="line"></div>
      <ul className="nav-links">
        <li onClick={() => {
          showContent("introduction");closeSidebar()}} className="diff">
          Introduction to HTML
        </li>
        {/* Item with submenu */}
        <li onClick={() => toggleSubmenu("basics")} className="diff">
          HTML Basics
          <span className="arrow">
            {openMenu === "basics" ? <FaChevronUp size={10} /> : <FaChevronDown size={10} />}
          </span>
        </li>
        {openMenu === "basics" && (
          <ul className="submenu">
            <li onClick={() => showContent("basics")}>HTML Basics</li>
            <li onClick={() => showContent("editors")}>HTML Editors</li>
          </ul>
        )}
        {/* Another item with submenu */}
        <li onClick={() => toggleSubmenu("structure")} className="diff">
          Structure and Elements
          <span className="arrow">
            {openMenu === "structure" ? <FaChevronUp size={10} /> : <FaChevronDown size={10} />}
          </span>
        </li>
        {openMenu === "structure" && (
          <ul className="submenu">
            <li onClick={() => showContent("elements")}>HTML Elements</li>
            <li onClick={() => showContent("attributes")}>HTML Attributes</li>
            <li onClick={() => showContent("block_inline")}>Block vs Inline</li>
          </ul>
        )}
        <li onClick={() => toggleSubmenu("headings")} className="diff">
          Headings and Paragraphs
          <span className="arrow">
            {openMenu === "headings" ? <FaChevronUp size={10} /> : <FaChevronDown size={10} />}
          </span>
        </li>
        {openMenu === "headings" && (
          <ul className="submenu">
            <li onClick={() => showContent("headings")}>Headings</li>
            <li onClick={() => showContent("paragraphs")}>Paragraphs</li>
            <li onClick={() => showContent("textformatting")}>Text Formatting</li>
          </ul>
        )}
       <li onClick={() => toggleSubmenu("lists")} className="diff">
          Lists
          <span className="arrow">
            {openMenu === "lists" ? <FaChevronUp size={10} /> : <FaChevronDown size={10} />}
          </span>
        </li>
        {openMenu === "lists" && (
          <ul className="submenu">
            <li onClick={() => showContent("lists")}>Lists</li>
            <li onClick={() => showContent("types")}>Type of Lists</li>
          </ul>
        )}
        <li onClick={() => toggleSubmenu("media")} className="diff">
          Visuals and Media<span className="arrow">{openMenu === "media" ? <FaChevronUp size={10} /> : <FaChevronDown size={10} />}
          </span>
        </li>
        {openMenu === "media" && (
          <ul className="submenu">
            <li onClick={() => showContent("hyper")}>Hyperlinks</li>
            <li onClick={() => showContent("au_vi")}>Video & Audio</li>
          </ul>
        )}
        <li onClick={() => toggleSubmenu("frames")} className="diff">
          Iframes and Forms<span className="arrow">{openMenu === "frames" ? <FaChevronUp size={10} /> : <FaChevronDown size={10} />}
          </span>
        </li>
        {openMenu === "frames" && (
          <ul className="submenu">
            <li onClick={() => showContent("ifram")}>Iframes</li>
            <li onClick={() => showContent("form")}>Forms</li>
          </ul>
        )}
        {/* <li onClick={()=>navigate("/html-levels")} className="diff">
          Check Your Knowledge
        </li> */}
      </ul>
    </div>
  );
}
export default Sidebar;
