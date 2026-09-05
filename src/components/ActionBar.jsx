import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/ActionBar.css";

const Action = () => {
  // The coin balance is shared with the quizzes and the Fun Zone.
  const [coins, setCoins] = useState(
    () => parseInt(localStorage.getItem("coins"), 10) || 0
  );

  useEffect(() => {
    const sync = () => setCoins(parseInt(localStorage.getItem("coins"), 10) || 0);
    window.addEventListener("storage", sync);
    return () => window.removeEventListener("storage", sync);
  }, []);

  return (
    <div className="action_bar">
      <div className="action_container1">
        <img src="/images/react_coin.png" alt="Coin" className="icon_coin" />
        <span className="action_name1">{coins}</span>
      </div>

      <div className="action_container">
        <i className="fa-solid fa-circle-user fa-xl" style={{ color: "white" }}></i>
        <span className="action_name">
          <Link
            to="/signin"
            style={{ color: "white", textDecoration: "none", fontWeight: 500 }}
          >
            Login
          </Link>
        </span>
      </div>
    </div>
  );
};

export default Action;
