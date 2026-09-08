import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../styles/SettingsLogout.css";

function Logout() {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { logout } = useAuth();

  useEffect(() => {
    // Actually end the session: clears the JWT (cd_token) and resets auth state.
    logout();
    localStorage.removeItem("user");

    const loaderTimer = setTimeout(() => setLoading(false), 1200);
    const redirectTimer = setTimeout(() => navigate("/signin", { replace: true }), 2000);

    return () => {
      clearTimeout(loaderTimer);
      clearTimeout(redirectTimer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="logout-page">
      {loading ? (
        <div className="loader-container">
          <div className="loader"></div>
          <p>Logging out...</p>
        </div>
      ) : (
        <h2>You have been logged out!</h2>
      )}
    </div>
  );
}

export default Logout;
