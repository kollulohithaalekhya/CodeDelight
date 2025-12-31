import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/SettingsLogout.css";

function Logout() {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.removeItem("user");

    const loaderTimer = setTimeout(() => setLoading(false), 2000);
    const redirectTimer = setTimeout(() => navigate("/"), 3000);

    return () => {
      clearTimeout(loaderTimer);
      clearTimeout(redirectTimer);
    };
  }, [navigate]);

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
