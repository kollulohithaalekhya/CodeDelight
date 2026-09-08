import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCoins } from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../context/AuthContext";
import "../styles/Coins.css";

const Coins = () => {
  const { user } = useAuth();
  return (
    <div className="coins">
      <div className="how-many-coins">
        <span className="coin-badge">
          <FontAwesomeIcon icon={faCoins} />
        </span>
        <div className="coin-meta">
          <h1 id="coin-count">{user?.coins ?? 0}</h1>
          <span className="coin-label">Total Coins</span>
        </div>
      </div>
    </div>
  );
};

export default Coins;
