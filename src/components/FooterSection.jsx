import React from "react";
import { Link } from "react-router-dom";
import "../styles/FooterSection.css";

const quickLinks = [
  { label: "Home", to: "/" },
  { label: "Courses", to: "/course" },
  { label: "Compilers", to: "/compiler" },
  { label: "Funzone", to: "/funzone" },
  { label: "Profile", to: "/profile" },
];

const socialLinks = [
  { href: "https://facebook.com", label: "Facebook", icon: "fab fa-facebook fa-lg" },
  { href: "https://instagram.com", label: "Instagram", icon: "fab fa-instagram fa-lg" },
  { href: "https://google.com", label: "Google", icon: "fab fa-google fa-lg" },
];

const Footer = () => {
  return (
    <footer>
      <div className="footer-container">
        {/* Left */}
        <div className="footer-section footer-about">
          <div className="footer-logo">Code Delight</div>
          <p>Learn. Play. Code. A fun way to become a coding pro!</p>
        </div>

        {/* Middle: Quick Links and Follow Us sit side by side */}
        <div className="footer-section footer-middle">
          <div className="footer-links">
            <h4>Quick Links</h4>
            <nav className="footer-links-list">
              {quickLinks.map((link) => (
                <Link key={link.to} to={link.to}>
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          <div className="footer-social">
            <h4>Follow Us</h4>
            <div className="footer-social-icons">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={social.label}
                >
                  <i className={social.icon}></i>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Right */}
        <div className="footer-section footer-contact">
          <h4>Contact</h4>
          <p>Email: support@codedelight.com</p>
          <p>Phone: +91 98765 43210</p>
        </div>
      </div>

      <div className="footer-bottom">
        &copy; 2025 Code Delight. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
