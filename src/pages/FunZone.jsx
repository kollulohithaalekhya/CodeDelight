import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/HeaderSection";
import Footer from "../components/FooterSection";
import "../styles/FunZone.css";

const GAMES = [
  {
    icon: "fas fa-layer-group",
    title: "Stack Simulator",
    text: "Push, pop, and visualize how stacks work!",
    path: "/funzone/stack-simulator",
    cost: 10,
  },
  {
    icon: "fas fa-code-branch",
    title: "Preorder Builder",
    text: "Rebuild tree using preorder & inorder sequences.",
    path: "/traversals/preorder",
    cost: 10,
  },
  {
    icon: "fas fa-sitemap",
    title: "Inorder Builder",
    text: "Rebuild tree using inorder traversal logic.",
    path: "/traversals/inorder",
    cost: 10,
  },
  {
    icon: "fas fa-project-diagram",
    title: "Postorder Builder",
    text: "Use postorder traversal to recreate the tree.",
    path: "/traversals/postorder",
    cost: 10,
  },
];

function FunZone() {
  const navigate = useNavigate();
  const [coins, setCoins] = useState(
    () => parseInt(localStorage.getItem("coins"), 10) || 100
  );
  const [message, setMessage] = useState(null);

  const playGame = (game) => {
    if (coins < game.cost) {
      setMessage({ type: "error", text: "Not enough coins to play this game." });
      return;
    }
    const remaining = coins - game.cost;
    localStorage.setItem("coins", String(remaining));
    setCoins(remaining);
    setMessage({ type: "ok", text: `You spent ${game.cost} coins! Starting game...` });
    // Let the message render before leaving the page.
    setTimeout(() => navigate(game.path), 600);
  };

  return (
    <>
      <Header />

      <div className="funzone-container">
        <h1 className="funzone-title">&#127918; Welcome to FunZone</h1>
        <p className="funzone-subtitle">
          Sharpen your DSA skills through fun, interactive games!
        </p>
        <div className="coin-counter">&#128176; Coins: <span>{coins}</span></div>

        {message && (
          <div className={`funzone-message ${message.type}`}>{message.text}</div>
        )}

        <div className="game-grid">
          {GAMES.map((game) => (
            <div className="game-card" key={game.title}>
              <div>
                <div className="game-icon">
                  <i className={game.icon}></i>
                </div>
                <h2>{game.title}</h2>
                <p>{game.text}</p>
              </div>
              <button onClick={() => playGame(game)}>Play ({game.cost}&#129689;)</button>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </>
  );
}

export default FunZone;
