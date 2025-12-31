import { useState, useEffect } from "react";
import "../styles/EditorSettings.css";

const EditorSettings = () => {
  const [language, setLanguage] = useState("javascript");
  const [autoRun, setAutoRun] = useState(false);
  const [lineNumbers, setLineNumbers] = useState(true);

  useEffect(() => {
    setLanguage(localStorage.getItem("language") || "javascript");
    setAutoRun(localStorage.getItem("autoRun") === "true");
    setLineNumbers(localStorage.getItem("lineNumbers") !== "false");
  }, []);

  useEffect(() => {
    localStorage.setItem("language", language);
    localStorage.setItem("autoRun", autoRun);
    localStorage.setItem("lineNumbers", lineNumbers);
  }, [language, autoRun, lineNumbers]);

  return (
    <div className="settings-section">
      <h2>Editor Settings</h2>

      <div className="editor-item">
        <span>Default Language</span>
        <select value={language} onChange={(e) => setLanguage(e.target.value)}>
          <option value="javascript">JavaScript</option>
          <option value="python">Python</option>
          <option value="java">Java</option>
          <option value="c">C</option>
        </select>
      </div>

      <div className="editor-item">
        <span>Auto Run Code</span>
        <input
          type="checkbox"
          checked={autoRun}
          onChange={(e) => setAutoRun(e.target.checked)}
        />
      </div>

      <div className="editor-item">
        <span>Show Line Numbers</span>
        <input
          type="checkbox"
          checked={lineNumbers}
          onChange={(e) => setLineNumbers(e.target.checked)}
        />
      </div>
    </div>
  );
};

export default EditorSettings;
