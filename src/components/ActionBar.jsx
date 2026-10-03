import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { avatarUrl, onAvatarError } from "../utils/avatar";
import "../styles/ActionBar.css";

const Action = () => {
  const { user } = useAuth();

  return (
    <div className="action_bar">
      {/* Show the live coin balance only when signed in. */}
      {user && (
        <div className="action_container1">
          <img src="/images/react_coin.png" alt="Coin" className="icon_coin" />
          <span className="action_name1">{user.coins ?? 0}</span>
        </div>
      )}

      <div className="action_container">
        {user ? (
          <Link
            to="/profile"
            style={{ color: "white", textDecoration: "none", fontWeight: 500, display: "flex", alignItems: "center", gap: 6 }}
          >
            {user.profileImage ? (
              <img
                src={avatarUrl(user.profileImage)}
                onError={onAvatarError}
                alt="Profile"
                style={{ width: 28, height: 28, borderRadius: "50%", objectFit: "cover" }}
              />
            ) : (
              <i className="fa-solid fa-circle-user fa-xl" style={{ color: "white" }}></i>
            )}
            <span className="action_name">{user.username}</span>
          </Link>
        ) : (
          <>
            <i className="fa-solid fa-circle-user fa-xl" style={{ color: "white" }}></i>
            <span className="action_name">
              <Link
                to="/signin"
                style={{ color: "white", textDecoration: "none", fontWeight: 500 }}
              >
                Login
              </Link>
            </span>
          </>
        )}
      </div>
    </div>
  );
};

export default Action;
