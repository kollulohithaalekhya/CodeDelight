import React from "react";
import "../styles/ActionBar.css";

const Action = () => {
  const actions = [
    {
      type: "coin",
      icon: "/images/react_coin.png",
      value: 0,
      alt: "Coin",
    },
    {
      type: "user",
      iconClass: "fa-solid fa-circle-user fa-xl",
      link: "../html/signin.html",
      label: "Login",
    },
  ];

  return (
    <div className="action_bar">
      {actions.map((action, index) => (
        <div
          key={index}
          className={action.type === "coin" ? "action_container1" : "action_container"}
        >
          {action.type === "coin" ? (
            <>
              <img src={action.icon} alt={action.alt} className="icon_coin" />
              <span className="action_name1">{action.value}</span>
            </>
          ) : (
            <>
              <i className={action.iconClass} style={{ color: "white" }}></i>
              <span className="action_name">
                <a
                  href={action.link}
                  style={{
                    color: "white",
                    textDecoration: "none",
                    fontWeight: 500,
                  }}
                >
                  {action.label}
                </a>
              </span>
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default Action;
