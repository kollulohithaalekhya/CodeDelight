import { useEffect, useState } from "react";
import "../styles/AppearanceSettings.css";

const AppearanceSettings = () => {
  const [theme, setTheme] = useState("light");
  const [fontSize, setFontSize] = useState(14);
  const [editorTheme, setEditorTheme] = useState("default");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const savedFontSize = localStorage.getItem("fontSize");
    const savedEditorTheme = localStorage.getItem("editorTheme");

    if (savedTheme) setTheme(savedTheme);
    if (savedFontSize) setFontSize(savedFontSize);
    if (savedEditorTheme) setEditorTheme(savedEditorTheme);
  }, []);

  useEffect(() => {
    document.body.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
    localStorage.setItem("fontSize", fontSize);
    localStorage.setItem("editorTheme", editorTheme);
  }, [theme, fontSize, editorTheme]);

  return (
    <div className="settings-section">
      <h2>Appearance Settings</h2>

      <div className="appearance-item">
        <span>Theme</span>
        <select value={theme} onChange={(e) => setTheme(e.target.value)}>
          <option value="light">Light</option>
          <option value="dark">Dark</option>
        </select>
      </div>

      <div className="appearance-item">
        <span>Font Size</span>
        <input
          type="range"
          min="12"
          max="22"
          value={fontSize}
          onChange={(e) => setFontSize(e.target.value)}
        />
        <span>{fontSize}px</span>
      </div>

      <div className="appearance-item">
        <span>Editor Theme</span>
        <select
          value={editorTheme}
          onChange={(e) => setEditorTheme(e.target.value)}
        >
          <option value="default">Default</option>
          <option value="dracula">Dracula</option>
          <option value="monokai">Monokai</option>
          <option value="solarized">Solarized</option>
        </select>
      </div>
    </div>
  );
};

export default AppearanceSettings;
