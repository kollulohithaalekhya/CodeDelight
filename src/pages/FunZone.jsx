import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/HeaderSection";
import Footer from "../components/FooterSection";
import { get, post } from "../api/client";
import { useAuth } from "../context/AuthContext";
import "../styles/FunZone.css";

// Group games by category for the gamified catalog.
const CATEGORY_META = {
  "Fun Zone": { label: "Tree & Logic Games", icon: "fa-solid fa-puzzle-piece" },
  Tree: { label: "Tree Games", icon: "fa-solid fa-sitemap" },
  Quiz: { label: "Quiz Games", icon: "fa-solid fa-circle-question" },
  Logic: { label: "Brain Teasers", icon: "fa-solid fa-brain" },
  Theme: { label: "Theme Adventures", icon: "fa-solid fa-dragon" },
};

// Order sections consistently on the page.
const CATEGORY_ORDER = ["Fun Zone", "Quiz", "Theme", "Logic"];

function FunZone() {
  const navigate = useNavigate();
  const { user, refresh } = useAuth();

  const [games, setGames] = useState([]);
  const [daily, setDaily] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState(null);
  const [starting, setStarting] = useState(null);

  useEffect(() => {
    Promise.allSettled([
      get("/api/games"),
      get("/api/funzone/daily"),
    ]).then(([g, d]) => {
      if (g.status === "fulfilled") setGames(g.value.games);
      else setMessage({ type: "error", text: g.reason?.message });
      if (d.status === "fulfilled") setDaily(d.value.daily);
      setLoading(false);
    });
  }, []);

  const playDaily = () => {
    if (!daily || daily.doneToday) return;
    // The daily set is pinned per user per day, so it is handed straight to the
    // challenge screen rather than re-drawn there (which would reroll it).
    navigate(`/funzone/challenge/${daily.game.id}`, {
      state: {
        daily: true,
        gameId: daily.game.id,
        gameName: daily.game.name,
        dailyQuestions: daily.questions,
        dailySessionId: daily.sessionId,
      },
    });
  };

  const grouped = useMemo(() => {
    const map = {};
    games.forEach((g) => {
      const cat = g.category || "Fun Zone";
      (map[cat] = map[cat] || []).push(g);
    });
    // Known categories first (fixed order), then any others alphabetically.
    const cats = Object.keys(map).sort((a, b) => {
      const ia = CATEGORY_ORDER.indexOf(a), ib = CATEGORY_ORDER.indexOf(b);
      if (ia === -1 && ib === -1) return a.localeCompare(b);
      if (ia === -1) return 1;
      if (ib === -1) return -1;
      return ia - ib;
    });
    return cats.map((cat) => [cat, map[cat]]);
  }, [games]);

  const playGame = async (game) => {
    if (!user) {
      setMessage({ type: "error", text: "Please sign in to play." });
      setTimeout(() => navigate("/signin"), 800);
      return;
    }
    if (game.locked) {
      const h = game.unlockHint;
      setMessage({
        type: "error",
        text: h
          ? `Locked — win ${h.needed} ${h.prevDifficulty} games in this section to unlock ${h.difficulty} (you've won ${h.won}/${h.total}).`
          : "This game is locked — win more games in the previous difficulty first.",
      });
      return;
    }
    if ((user.coins ?? 0) < game.entryCost) {
      setMessage({ type: "error", text: `Not enough coins — you need ${game.entryCost} to play. Earn more with quizzes!` });
      return;
    }
    setStarting(game.id);
    setMessage(null);
    try {
      const { sessionToken } = await post(`/api/games/${game.id}/start`, {});
      await refresh(); // sync coin balance everywhere
      // Challenge games play in the data-driven engine; builders open their page.
      const target = game.type === "challenge" ? `/funzone/challenge/${game.id}` : (game.path || "/funzone");
      // sessionToken proves paid entry → unlocks server-side rewards.
      navigate(target, { state: { gameId: game.id, gameName: game.name, rewards: game.rewards, sessionToken } });
    } catch (e) {
      setMessage({ type: "error", text: e.message });
      setStarting(null);
    }
  };

  return (
    <>
      <Header />
      <div className="fz">
        <div className="fz-bg" aria-hidden="true"><span className="fz-orb o1" /><span className="fz-orb o2" /></div>

        {/* Hero + stats */}
        <div className="fz-hero">
          <div>
            <h1>🎮 Fun Zone</h1>
            <p>Spend the coins you earned and level up your DSA skills through play.</p>
          </div>
          {user && (
            <div className="fz-stats">
              <div className="fz-stat"><i className="fa-solid fa-coins" /><span>{user.coins ?? 0}</span><small>Coins</small></div>
              <div className="fz-stat"><i className="fa-solid fa-star" /><span>{user.stars ?? 0}</span><small>Stars</small></div>
              <div className="fz-stat"><i className="fa-solid fa-fire" /><span>{user.streak?.current ?? 0}</span><small>Streak</small></div>
            </div>
          )}
        </div>

        {message && <div className={`fz-message ${message.type}`}>{message.text}</div>}

        {/* Daily challenge spotlight */}
        {daily?.game && (
          <div className={`fz-daily ${daily.doneToday ? "done" : ""}`}>
            <div className="fz-daily-icon">{daily.game.challenge?.theme?.emoji || "🔥"}</div>
            <div className="fz-daily-body">
              <span className="fz-daily-kicker">🔥 Daily Challenge · Free</span>
              <strong>{daily.game.name}</strong>
              <span className="fz-daily-sub">
                Win today's free challenge for <b>+{daily.bonus.coins} 🪙</b> and <b>+{daily.bonus.stars} ⭐</b> bonus.
                {daily.streak > 0 && <> Current streak: <b>{daily.streak} day{daily.streak === 1 ? "" : "s"}</b> 🔥</>}
              </span>
            </div>
            {daily.doneToday ? (
              <span className="fz-daily-badge done">✓ Done today</span>
            ) : (
              <button className="fz-daily-btn" onClick={playDaily}>
                Play Free <i className="fa-solid fa-play" />
              </button>
            )}
          </div>
        )}

        {loading ? (
          <p className="fz-loading">Loading games…</p>
        ) : games.length === 0 ? (
          <div className="fz-empty">No games available yet — check back soon!</div>
        ) : (
          grouped.map(([cat, list]) => {
            const meta = CATEGORY_META[cat] || { label: cat, icon: "fa-solid fa-gamepad" };
            return (
              <section className="fz-section" key={cat}>
                <h2 className="fz-section-title"><i className={meta.icon} /> {meta.label}</h2>
                <div className="fz-grid">
                  {list.map((game) => {
                    const tierLocked = !!game.locked;
                    const affordable = !user || (user.coins ?? 0) >= game.entryCost;
                    const h = game.unlockHint;
                    return (
                      <div className={`fz-card ${tierLocked ? "tier-locked" : affordable ? "" : "locked"}`} key={game.id}>
                        {tierLocked && (
                          <span className="fz-lock-badge"><i className="fa-solid fa-lock" /> {game.difficulty}</span>
                        )}
                        <div className="fz-card-icon"><i className={game.icon || "fa-solid fa-gamepad"} /></div>
                        <h3>{game.name}</h3>
                        <p>{game.description}</p>
                        {tierLocked && h ? (
                          <div className="fz-unlock-hint">
                            <i className="fa-solid fa-lock" /> Win {h.needed} {h.prevDifficulty} games in this section to unlock ({h.won}/{h.total})
                          </div>
                        ) : (
                          <div className="fz-card-meta">
                            <span className="fz-cost"><i className="fa-solid fa-coins" /> {game.entryCost}</span>
                            {game.rewards?.coinsForWin ? <span className="fz-win"><i className="fa-solid fa-trophy" /> +{game.rewards.coinsForWin}</span> : null}
                            {game.rewards?.starsForWin ? <span className="fz-win star"><i className="fa-solid fa-star" /> +{game.rewards.starsForWin}</span> : null}
                          </div>
                        )}
                        <button
                          className="fz-play"
                          onClick={() => playGame(game)}
                          disabled={starting === game.id || tierLocked || !affordable}
                        >
                          {starting === game.id ? "Starting…" : tierLocked ? <>Locked <i className="fa-solid fa-lock" /></> : affordable ? <>Play <i className="fa-solid fa-play" /></> : "Not enough coins"}
                        </button>
                      </div>
                    );
                  })}
                </div>
              </section>
            );
          })
        )}
      </div>
      <Footer />
    </>
  );
}

export default FunZone;
