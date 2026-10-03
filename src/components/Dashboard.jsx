import React, { useEffect, useMemo, useState } from "react";
import ReactApexChart from "react-apexcharts";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCoins, faStar, faClipboardQuestion, faGamepad, faFire, faGraduationCap, faTrophy,
} from "@fortawesome/free-solid-svg-icons";
import ProfileSidebar from "./ProfileSidebar";
import ProfileHeader from "./ProfileHeader";
import { get } from "../api/client";
import { useAuth } from "../context/AuthContext";
import { avatarUrl, onAvatarError } from "../utils/avatar";
import "../styles/Dashboard.css";

const TYPE_LABEL = {
  quiz_reward: "Quizzes",
  game_reward: "Games",
  game_entry: "Game entry",
  signup_bonus: "Signup",
  course_reward: "Courses",
  quest_reward: "Quest",
  admin_adjustment: "Admin",
};

function Dashboard() {
  const { user } = useAuth();
  const [profile, setProfile] = useState(null);
  const [coins, setCoins] = useState(null);
  const [leaders, setLeaders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.allSettled([
      get("/api/profile/me"),
      get("/api/coins/me"),
      get("/api/leaderboard?limit=8"),
    ])
      .then(([p, c, l]) => {
        if (p.status === "fulfilled") setProfile(p.value.profile);
        if (c.status === "fulfilled") setCoins(c.value);
        if (l.status === "fulfilled") setLeaders(l.value.leaders);
      })
      .finally(() => setLoading(false));
  }, []);

  // ---- Stat cards (all real) ----
  const stats = [
    { title: "Coins", value: profile?.coins ?? 0, icon: faCoins, tint: "gold" },
    { title: "Stars", value: profile?.stars ?? 0, icon: faStar, tint: "cyan" },
    { title: "Quizzes Solved", value: profile?.quizzesSolved ?? 0, icon: faClipboardQuestion, tint: "violet" },
    { title: "Games Played", value: profile?.gamesPlayed ?? 0, icon: faGamepad, tint: "green" },
  ];

  // ---- Activity area chart from the real heatmap data (last 30 days) ----
  const activityChart = useMemo(() => {
    const map = {};
    (profile?.activity || []).forEach((a) => { map[a.date.replace(/\//g, "-")] = a.count; });
    const days = [];
    for (let i = 29; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const key = d.toISOString().slice(0, 10);
      days.push({ label: d.toLocaleDateString(undefined, { month: "short", day: "numeric" }), value: map[key] || 0 });
    }
    return {
      series: [{ name: "Activity", data: days.map((d) => d.value) }],
      options: {
        chart: { type: "area", background: "transparent", toolbar: { show: false }, sparkline: { enabled: false } },
        theme: { mode: "dark" },
        colors: ["#00f2fe"],
        dataLabels: { enabled: false },
        stroke: { curve: "smooth", width: 3 },
        fill: { type: "gradient", gradient: { shadeIntensity: 1, opacityFrom: 0.5, opacityTo: 0.05, stops: [0, 90] } },
        grid: { borderColor: "rgba(255,255,255,0.06)" },
        xaxis: {
          categories: days.map((d) => d.label),
          labels: { style: { colors: "#7f92b3" }, rotate: 0, hideOverlappingLabels: true },
          axisBorder: { show: false }, axisTicks: { show: false },
          tickAmount: 6,
        },
        yaxis: { labels: { style: { colors: "#7f92b3" } } },
        tooltip: { theme: "dark" },
      },
    };
  }, [profile]);

  // ---- Coins earned by source (real, from ledger) ----
  const coinsDonut = useMemo(() => {
    const byType = {};
    (coins?.transactions || []).forEach((t) => {
      if (t.amount > 0) byType[t.type] = (byType[t.type] || 0) + t.amount;
    });
    const labels = Object.keys(byType).map((k) => TYPE_LABEL[k] || k);
    const series = Object.values(byType);
    return {
      hasData: series.length > 0,
      series,
      options: {
        chart: { type: "donut", background: "transparent" },
        theme: { mode: "dark" },
        labels,
        colors: ["#00f2fe", "#7c3aed", "#34d399", "#fbbf24", "#f472b6", "#60a5fa"],
        stroke: { width: 0 },
        legend: { position: "bottom", labels: { colors: "#c3d0e6" } },
        dataLabels: { enabled: true, style: { fontSize: "11px" } },
        plotOptions: { pie: { donut: { size: "62%", labels: { show: true, total: { show: true, label: "Earned", color: "#c3d0e6" } } } } },
        tooltip: { theme: "dark" },
      },
    };
  }, [coins]);

  const name = user?.username || profile?.username || "Learner";

  if (loading) {
    return (
      <div className="dashboard-wrapper">
        <div className="profile-page"><ProfileHeader /></div>
        <div className="dashboard-container">
          <ProfileSidebar />
          <div className="dashboard-dark"><p className="dash-loading">Loading your dashboard…</p></div>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-wrapper">
      {/* Header styles live under .profile-page */}
      <div className="profile-page"><ProfileHeader /></div>

      <div className="dashboard-container">
        <ProfileSidebar />

        <div className="dashboard-dark">
          {/* Hero */}
          <div className="dash-hero">
            <div>
              <h1>Welcome back, <span>{name}</span> 👋</h1>
              <p>Here's your learning snapshot.</p>
            </div>
            <div className="dash-streak">
              <FontAwesomeIcon icon={faFire} />
              <div>
                <strong>{profile?.streak?.current ?? 0}-day</strong>
                <span>streak</span>
              </div>
            </div>
          </div>

          {/* Stat cards */}
          <div className="dash-stats">
            {stats.map((s) => (
              <div className={`dash-stat tint-${s.tint}`} key={s.title}>
                <div className="dash-stat-icon"><FontAwesomeIcon icon={s.icon} /></div>
                <div>
                  <div className="dash-stat-value">{s.value}</div>
                  <div className="dash-stat-title">{s.title}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Charts */}
          <div className="dash-grid">
            <div className="dash-card dash-col-2">
              <div className="dash-card-head"><h3>Activity — last 30 days</h3></div>
              <ReactApexChart options={activityChart.options} series={activityChart.series} type="area" height={260} />
            </div>

            <div className="dash-card">
              <div className="dash-card-head"><h3>Coins earned by source</h3></div>
              {coinsDonut.hasData ? (
                <ReactApexChart options={coinsDonut.options} series={coinsDonut.series} type="donut" height={260} />
              ) : (
                <div className="dash-empty">No coins earned yet — take a quiz to start!</div>
              )}
            </div>
          </div>

          {/* Bottom row */}
          <div className="dash-grid">
            {/* Leaderboard */}
            <div className="dash-card dash-col-2">
              <div className="dash-card-head"><h3><FontAwesomeIcon icon={faTrophy} /> Leaderboard</h3></div>
              <div className="dash-leaders">
                {leaders.length === 0 && <div className="dash-empty">No learners yet.</div>}
                {leaders.map((l) => (
                  <div className={`dash-leader ${l.isMe ? "me" : ""}`} key={l.rank}>
                    <span className={`dash-rank rank-${l.rank}`}>{l.rank}</span>
                    <img src={avatarUrl(l.profileImage)} onError={onAvatarError} alt={l.username} className="dash-leader-avatar" />
                    <span className="dash-leader-name">{l.username}{l.isMe && <em> (you)</em>}</span>
                    <span className="dash-leader-stat"><FontAwesomeIcon icon={faStar} /> {l.stars}</span>
                    <span className="dash-leader-stat gold"><FontAwesomeIcon icon={faCoins} /> {l.coins}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Snapshot */}
            <div className="dash-card">
              <div className="dash-card-head"><h3>Snapshot</h3></div>
              <ul className="dash-snapshot">
                <li><span><FontAwesomeIcon icon={faGraduationCap} /> Courses completed</span><strong>{profile?.coursesCompleted ?? 0}</strong></li>
                <li><span><FontAwesomeIcon icon={faClipboardQuestion} /> Quizzes solved</span><strong>{profile?.quizzesSolved ?? 0}</strong></li>
                <li><span><FontAwesomeIcon icon={faGamepad} /> Games played</span><strong>{profile?.gamesPlayed ?? 0}</strong></li>
                <li><span><FontAwesomeIcon icon={faStar} /> Total stars</span><strong>{profile?.stars ?? 0}</strong></li>
                <li><span><FontAwesomeIcon icon={faTrophy} /> Badges</span><strong>{profile?.badges?.length ?? 0}</strong></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
