import React from "react";
import "../styles/footerSection.css";

const Footer = () => {
  const quickLinks = ["Home", "Courses", "Compilers", "Funzone", "Profile"];

  const socialLinks = [
    {
      href: "https://facebook.com",
      label: "Facebook",
      icon: "fab fa-facebook fa-lg",
    },
    {
      href: "https://instagram.com",
      label: "Instagram",
      icon: "fab fa-instagram fa-lg",
    },
    {
      href: "https://google.com",
      label: "Google",
      icon: "fab fa-google fa-lg",
    },
  ];

  return (
    <footer>
      <div className="footer-container">
        {/* Left Section */}
        <div className="footer-section">
          <div className="footer-logo">Code Delight</div>
          <p>Learn. Play. Code. A fun way to become a coding pro!</p>
        </div>

        {/* Middle Section */}
        <div className="footer-section">
          <h4>Quick Links</h4>
          <div style={{ display: "flex", flexDirection: "row", gap: "1rem" }}>
            {quickLinks.map((link, index) => (
              <a href="#" key={index}>{link}</a>
            ))}
          </div>

          <div style={{ marginTop: "1rem" }}>
            <h4>Follow Us</h4>
            <div
              style={{
                display: "flex",
                gap: "1rem",
                marginTop: "0.5rem",
                alignContent: "center",
                justifyContent: "center",
              }}
            >
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  aria-label={social.label}
                  style={{ color: "#ccc" }}
                >
                  <i className={social.icon}></i>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="footer-section">
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
