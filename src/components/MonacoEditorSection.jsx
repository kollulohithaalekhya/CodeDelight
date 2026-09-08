// MonacoEditorSection.js
import React, { useState, useEffect } from "react";
import Editor from "@monaco-editor/react";

// Reads the user's editor/appearance preferences (set in Settings) so they take
// effect wherever an embedded editor is shown.
function readEditorPrefs() {
  const appTheme = document.documentElement.getAttribute("data-theme");
  return {
    fontSize: Number(localStorage.getItem("fontSize")) || 14,
    lineNumbers: localStorage.getItem("lineNumbers") !== "false" ? "on" : "off",
    theme: appTheme === "light" ? "vs" : "vs-dark",
  };
}

const MonacoEditorSection = ({ initialCode, onCodeChange }) => {
  const [code, setCode] = useState(initialCode);
  const [prefs, setPrefs] = useState(readEditorPrefs);

  useEffect(() => {
    onCodeChange(code); // pass editor code to parent
  }, [code]);

  // Pick up preference changes made on the Settings page.
  useEffect(() => {
    const sync = () => setPrefs(readEditorPrefs());
    window.addEventListener("storage", sync);
    return () => window.removeEventListener("storage", sync);
  }, []);

  return (
    <Editor
      height="250px"
      defaultLanguage="html"
      defaultValue={initialCode}
      theme={prefs.theme}
      onChange={(value) => setCode(value)}
      onMount={(editor) => {
        const handleResize = () => editor.layout();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
      }}
      options={{
        minimap: { enabled: false },
        fontSize: prefs.fontSize,
        lineNumbers: prefs.lineNumbers,
        scrollBeyondLastLine: false,
        wordWrap: "on",
        automaticLayout: true,
      }}
    />
  );
};

export default MonacoEditorSection;
