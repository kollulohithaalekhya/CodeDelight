import { useEffect, useState } from "react";
import "../styles/AppearanceSettings.css";

const AppearanceSettings = () => {
  const [theme, setTheme] = useState(() => localStorage.getItem("theme") || "dark");

  // Theme is applied to <html data-theme> and consumed app-wide via CSS variables.
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <div className="settings-section">
      <h2>Appearance Settings</h2>

      <span style={{ fontWeight: 600, marginBottom: 10, display: "block" }}>Theme</span>
      <div className="theme-picker">
        {[
          { id: "dark", label: "Dark", swatch: "linear-gradient(135deg,#0b1e34,#132743)" },
          { id: "light", label: "Light", swatch: "linear-gradient(135deg,#ffffff,#e6ecf5)" },
        ].map((opt) => (
          <button
            key={opt.id}
            type="button"
            className={`theme-card ${theme === opt.id ? "active" : ""}`}
            onClick={() => setTheme(opt.id)}
          >
            <span className="theme-swatch" style={{ background: opt.swatch }} />
            <span className="theme-name">{opt.label}</span>
            {theme === opt.id && <i className="fa-solid fa-circle-check theme-check" />}
          </button>
        ))}
      </div>
    </div>
  );
};

export default AppearanceSettings;
