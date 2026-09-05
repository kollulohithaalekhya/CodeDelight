import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {Link} from "react-router-dom";
import "../styles/Signup.css";
// import Signin from "./Signin";

function Signup() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirm: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, email, password, confirm } = formData;

    if (password !== confirm) {
      alert("Passwords do not match.");
      return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const emailExists = users.some((user) => user.email === email);

    if (emailExists) {
      alert("An account with this email already exists.");
      return;
    }

    users.push({ name, email, password });
    localStorage.setItem("users", JSON.stringify(users));

    alert("Account created successfully!");
    navigate("/signin");
  };

  return(
    <div className="auth-page signup-page">
    <div className="main-container">
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

      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <h2>Create Account</h2>

          {["name", "email", "password", "confirm"].map((field, idx) => (
            <div className="input-icon" key={field}>
              <i className={`fas ${field === "email" ? "fa-envelope" : "fa-lock" || "fa-user"}`}></i>
              <input
                type={field.includes("password") ? "password" : field === "email" ? "email" : "text"}
                name={field}
                placeholder={
                  field === "confirm" ? "Confirm Password" :
                  field === "name" ? "User Name" :
                  field === "email" ? "Email Address" :
                  "Password"
                }
                value={formData[field]}
                onChange={handleChange}
                required
              />
            </div>
          ))}

          <button type="submit" className="login-btn">Sign Up</button>

          <div className="signup-text">
  Already have an account? <Link to="/signin">Login here</Link>
</div>

          <div className="divider">or sign up with</div>

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
    </div>
    </div>
  );
}

export default Signup;