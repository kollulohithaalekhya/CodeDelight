import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/HeaderSection";
import Footer from "../components/FooterSection";
import { get } from "../api/client";
import { useAuth } from "../context/AuthContext";
import Pagination from "../components/Pagination";
import "../styles/ProblemArena.css";

const PAGE_SIZE = 24;

const LEVEL_META = {
  Easy: { color: "easy", icon: "fa-solid fa-seedling" },
  Medium: { color: "medium", icon: "fa-solid fa-fire" },
  Hard: { color: "hard", icon: "fa-solid fa-bolt" },
};
const LEVEL_ORDER = { Easy: 0, Medium: 1, Hard: 2 };

export default function ProblemList() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [levels, setLevels] = useState([]);
  const [unlockRatio, setUnlockRatio] = useState(0.7);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Filters
  const [search, setSearch] = useState("");
  const [levelFilter, setLevelFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All"); // All | Solved | Unsolved
  const [hideLocked, setHideLocked] = useState(false);
  const [sortBy, setSortBy] = useState("default"); // default | az | reward
  const [page, setPage] = useState(1);

  useEffect(() => {
    get("/api/problems")
      .then((d) => { setLevels(d.levels); setUnlockRatio(d.unlockRatio); })
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  // Flatten all levels into a single problem list, carrying the lock state.
  const allProblems = useMemo(() => {
    const out = [];
    for (const lvl of levels) {
      for (const p of lvl.problems) {
        out.push({
          ...p,
          locked: !lvl.unlocked,
          unlockNeeded: lvl.needed,
          unlockPrev: lvl.level === "Medium" ? "Easy" : lvl.level === "Hard" ? "Medium" : null,
        });
      }
    }
    return out;
  }, [levels]);

  const totals = useMemo(() => {
    const solved = allProblems.filter((p) => p.solved).length;
    return { solved, total: allProblems.length };
  }, [allProblems]);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    let list = allProblems.filter((p) => {
      if (levelFilter !== "All" && p.level !== levelFilter) return false;
      if (statusFilter === "Solved" && !p.solved) return false;
      if (statusFilter === "Unsolved" && p.solved) return false;
      if (hideLocked && p.locked) return false;
      if (q && !p.title.toLowerCase().includes(q)) return false;
      return true;
    });
    if (sortBy === "az") list = [...list].sort((a, b) => a.title.localeCompare(b.title));
    else if (sortBy === "reward") list = [...list].sort((a, b) => (b.reward.coins - a.reward.coins) || (b.reward.stars - a.reward.stars));
    else list = [...list].sort((a, b) => (LEVEL_ORDER[a.level] - LEVEL_ORDER[b.level]));
    return list;
  }, [allProblems, search, levelFilter, statusFilter, hideLocked, sortBy]);

  // Reset to the first page whenever the filtered set changes.
  useEffect(() => { setPage(1); }, [search, levelFilter, statusFilter, hideLocked, sortBy]);

  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const pageStart = (page - 1) * PAGE_SIZE;
  const pageItems = filtered.slice(pageStart, pageStart + PAGE_SIZE);

  const open = (p) => {
    if (p.locked) return;
    navigate(`/practice/problem/${p.id}`);
  };

  const levelCount = (lv) => allProblems.filter((p) => lv === "All" || p.level === lv).length;

  return (
    <>
      <Header />
      <div className="pa">
        <div className="pa-bg" aria-hidden="true"><span className="pa-orb o1" /><span className="pa-orb o2" /></div>

        <div className="pa-hero">
          <div>
            <button className="ps-back" onClick={() => navigate("/practice")}>← Practice Arena</button>
            <h1>💻 Code Problems</h1>
            <p>Solve coding problems against real test cases and earn coins by difficulty. Harder tiers unlock as you solve {Math.round(unlockRatio * 100)}% of the previous one.</p>
          </div>
          {user && (
            <div className="pa-stats">
              <div className="pa-stat"><i className="fa-solid fa-coins" /><span>{user.coins ?? 0}</span><small>Coins</small></div>
              <div className="pa-stat"><i className="fa-solid fa-circle-check" /><span>{totals.solved}/{totals.total}</span><small>Solved</small></div>
            </div>
          )}
        </div>

        {loading ? (
          <p className="pa-loading">Loading problems…</p>
        ) : error ? (
          <div className="pa-message error">{error}</div>
        ) : allProblems.length === 0 ? (
          <div className="pa-empty">No problems available yet — check back soon!</div>
        ) : (
          <>
            {/* Toolbar: search + filters */}
            <div className="pa-toolbar">
              <div className="pa-search">
                <i className="fa-solid fa-magnifying-glass" />
                <input
                  type="text"
                  placeholder="Search problems by name…"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                {search && <button className="pa-search-clear" onClick={() => setSearch("")} aria-label="Clear search"><i className="fa-solid fa-xmark" /></button>}
              </div>

              <div className="pa-filter-group">
                {["All", "Easy", "Medium", "Hard"].map((lv) => (
                  <button
                    key={lv}
                    className={`pa-chip ${levelFilter === lv ? "active" : ""} ${lv !== "All" ? LEVEL_META[lv].color : ""}`}
                    onClick={() => setLevelFilter(lv)}
                  >
                    {lv} <span className="pa-chip-count">{levelCount(lv)}</span>
                  </button>
                ))}
              </div>

              <div className="pa-filter-group">
                {["All", "Unsolved", "Solved"].map((s) => (
                  <button key={s} className={`pa-chip ${statusFilter === s ? "active" : ""}`} onClick={() => setStatusFilter(s)}>{s}</button>
                ))}
              </div>

              <label className="pa-toggle">
                <input type="checkbox" checked={hideLocked} onChange={(e) => setHideLocked(e.target.checked)} />
                <span>Hide locked</span>
              </label>

              <select className="pa-sort" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                <option value="default">Sort: Difficulty</option>
                <option value="az">Sort: A–Z</option>
                <option value="reward">Sort: Reward</option>
              </select>
            </div>

            <p className="pa-result-count">
              {filtered.length === 0
                ? "No problems match your filters."
                : `Showing ${pageStart + 1}–${Math.min(pageStart + PAGE_SIZE, filtered.length)} of ${filtered.length} problems`}
            </p>

            {filtered.length === 0 ? (
              <div className="pa-empty">No problems match your filters.</div>
            ) : (
              <div className="pa-grid pa-grid-flat">
                {pageItems.map((p) => {
                  const meta = LEVEL_META[p.level] || LEVEL_META.Easy;
                  return (
                    <button
                      key={p.id}
                      className={`pa-card ${p.solved ? "solved" : ""} ${p.locked ? "locked" : ""}`}
                      onClick={() => open(p)}
                      disabled={p.locked}
                      title={p.locked ? `Solve ${Math.round(unlockRatio * 100)}% of ${p.unlockPrev} to unlock` : p.title}
                    >
                      <div className="pa-card-top">
                        <span className={`pa-badge ${meta.color}`}>{p.level}</span>
                        {p.solved ? <span className="pa-solved-tag"><i className="fa-solid fa-check" /> Solved</span> : null}
                        {p.locked && <i className="fa-solid fa-lock pa-card-lock" />}
                      </div>
                      <h3>{p.title}</h3>
                      {p.locked ? (
                        <div className="pa-card-lockhint"><i className="fa-solid fa-lock" /> Solve {Math.round(unlockRatio * 100)}% of {p.unlockPrev} to unlock</div>
                      ) : (
                        <div className="pa-card-reward">
                          <span><i className="fa-solid fa-coins" /> +{p.reward.coins}</span>
                          {p.reward.stars ? <span className="star"><i className="fa-solid fa-star" /> +{p.reward.stars}</span> : null}
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            )}

            <Pagination page={page} pageCount={pageCount} onChange={setPage} />
          </>
        )}
      </div>
      <Footer />
    </>
  );
}
