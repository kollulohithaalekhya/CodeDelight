import React from "react";
import "../styles/CompilerWeb.css";

function CompilerWebEditor({ label, icon, language, value, onChange }) {
  return (
    <div className="editor">
      <label>
        <i className={icon}></i> {label}
      </label>
      <textarea
        value={value}
        onChange={(e) => onChange(language, e.target.value)}
      ></textarea>
    </div>
  );
}

export default CompilerWebEditor;
