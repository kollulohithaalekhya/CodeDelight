import React from "react";
import { Link } from "react-router-dom";
import "../styles/navSection.css";

const NavBar = () => {
  const links = [
    { name: "Home", path: "/" },
    { name: "Courses", path: "/course" },
    { name: "Compilers", path: "/compiler" },
    { name: "Fun Zone", path: "/funzone" },
  ];
  

  return (
    <nav className="nav_bar">
      {links.map((link, index) => (
        <Link key={index} to={link.path} className="nav__link">
          {link.name}
        </Link>
      ))}
    </nav>
  );
};

export default NavBar;
