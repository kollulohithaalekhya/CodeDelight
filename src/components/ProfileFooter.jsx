import React from "react";
import "../styles/ProfileFooter.css";

// import '@fortawesome/fontawesome-free/css/all.min.css';

const Footer = () => {
  return (
    <footer>
      <div className="footer-container">

        {/* Brand */}
        <div className="footer-section footer-brand">
          <div className="footer-logo">Code Delight</div>

          <p>
            Learn. Play. Code. A fun way to become a coding pro!
          </p>
        </div>

        {/* Quick Links + Social */}
        <div className="footer-section footer-links-section">
          <h4>Quick Links</h4>

          <div className="quick-links">
            <a href="/homepage">Home</a>
            <a href="/courses">Courses</a>
            <a href="/compiler">Compilers</a>
            <a href="/funzone">Fun Zone</a>
          </div>

          <div className="follow-section">
            <h4>Follow Us</h4>

            <div className="linking">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
              >
                <i className="fab fa-facebook fa-lg"></i>
              </a>

              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
              >
                <i className="fab fa-instagram fa-lg"></i>
              </a>

              <a
                href="https://google.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Google"
              >
                <i className="fab fa-google fa-lg"></i>
              </a>
            </div>
          </div>
        </div>

        {/* Contact */}
        <div className="footer-section footer-contact">
          <h4>Contact</h4>

          <a href="mailto:support@codedelight.com">
            Email: support@codedelight.com
          </a>

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
