import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/Forgot.css";

function Forgot() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div className="forgot-page">
      <div className="forgot-container">
        <div className="forgot-box">
          <h1>
            <i className="fas fa-unlock-alt"></i> Forgot Password
          </h1>
          <p>
            Don&apos;t worry! It happens. Please enter your email and we&rsquo;ll send you
            a reset link.
          </p>

          {sent ? (
            <p className="forgot-sent">
              If an account exists for <strong>{email}</strong>, a reset link is on its
              way.
            </p>
          ) : (
            <form onSubmit={handleSubmit}>
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button type="submit">Send Reset Link</button>
            </form>
          )}

          <div className="back-link">
            <Link to="/signin">
              <i className="fas fa-arrow-left"></i> Back to Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Forgot;
