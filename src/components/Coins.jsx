import React from "react";
import "../styles/Coins.css";

const Coins = () => {
  return (
    <div className="coins">
      <div className="how-many-coins">
        <img
          src="/public/images/Total_Coins.png"
          className="tot-coins"
          alt="Total Coins"
        />
        <h1 id="coin-count">310</h1>
      </div>
    </div>
  );
};

export default Coins;
