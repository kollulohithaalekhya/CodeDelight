import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";
import { faGoogle, faFacebookF } from "@fortawesome/free-brands-svg-icons";
import "../styles/Signin.css";

function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  // Where to go after a successful login: back to the gated page they came from.
  const redirectTo = location.state?.from || "/";

  const handleSignin = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      // The identifier field accepts either email or username.
      await login(email, password);
      navigate(redirectTo, { replace: true });
    } catch (err) {
      alert(err.message || "Invalid email or password");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="auth-page signin-page">
      <div className="main-container">
        <div className="form-container">
          <form onSubmit={handleSignin}>
          <h2>Login</h2>

          <label>Email or Username</label>
          <div className="input-icon">
            <FontAwesomeIcon icon={faEnvelope} />
            <input
              type="text"
              placeholder="Enter Your Email or Username"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <label>Password</label>
          <div className="input-icon">
            <FontAwesomeIcon icon={faLock} />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="options-row">
            <label className="remember-me">
              <input type="checkbox" /> Remember me
            </label>
            <a href="/forgot" className="forgot-link">Forgot Password?</a>
          </div>

          <button type="submit" className="login-btn" disabled={submitting}>
            {submitting ? "LOGGING IN…" : "LOGIN"}
          </button>

          <p className="signup-text">
            Doesn’t have an account yet? <a href="/signup">Sign Up</a>
          </p>

          <div className="divider">or login with</div>

          <div className="social-buttons">
            <button type="button" className="google-btn">
              <FontAwesomeIcon icon={faGoogle} /> Google
            </button>
            <button type="button" className="facebook-btn">
              <FontAwesomeIcon icon={faFacebookF} /> Facebook
            </button>
          </div>
        </form>
      </div>

      <div className="image-container">
        <lottie-player
          src="https://assets2.lottiefiles.com/packages/lf20_jtbfg2nb.json"
          background="transparent"
          speed="1"
          style={{ width: "100%", maxWidth: "400px" }}
          loop
          autoplay
        ></lottie-player>
      </div>
      </div>
    </div>
  );
}

export default Signin;