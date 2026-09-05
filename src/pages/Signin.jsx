import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Signin.css";

function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignin = (e) => {
    e.preventDefault();

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const validUser = users.find(
      (user) => user.email === email && user.password === password
    );

    if (validUser) {
      alert("Login successful!");
      navigate("/"); // You can create this route later
    } else {
      alert("Invalid email or password");
    }
  };

  return (
    <div className="auth-page signin-page">
      <div className="main-container">
        <div className="form-container">
          <form onSubmit={handleSignin}>
          <h2>Login</h2>

          <label>Email Address</label>
          <div className="input-icon">
            <i className="fas fa-envelope"></i>
            <input
              type="email"
              placeholder="Enter Your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <label>Password</label>
          <div className="input-icon">
            <i className="fas fa-lock"></i>
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

          <button type="submit" className="login-btn">LOGIN</button>

          <p className="signup-text">
            Doesn’t have an account yet? <a href="/signup">Sign Up</a>
          </p>

          <div className="divider">or login with</div>

          <div className="social-buttons">
            <button type="button" className="google-btn">
              <i className="fab fa-google"></i> Google
            </button>
            <button type="button" className="facebook-btn">
              <i className="fab fa-facebook-f"></i> Facebook
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