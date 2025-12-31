// MonacoEditorSection.js
import React, { useState, useEffect } from "react";
import Editor from "@monaco-editor/react";

const MonacoEditorSection = ({ initialCode, onCodeChange }) => {
  const [code, setCode] = useState(initialCode);

  useEffect(() => {
    onCodeChange(code); // pass editor code to parent
  }, [code]);

  return (
    <Editor
      height="250px"
      defaultLanguage="html"
      defaultValue={initialCode}
      theme="vs-dark"
      onChange={(value) => setCode(value)}
      onMount={(editor) => {
    // Handle window resize
    const handleResize = () => editor.layout();
    window.addEventListener("resize", handleResize);

    // Cleanup on unmount
    return () => window.removeEventListener("resize", handleResize);
  }}
      options={{
        minimap: { enabled: false},
        fontSize: 14,
        scrollBeyondLastLine: false,
        wordWrap: "on", 
        automaticLayout: true,
      }}
    />
  );
};

export default MonacoEditorSection;
