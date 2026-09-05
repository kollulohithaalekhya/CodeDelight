import React, { useState, useEffect, useRef } from "react";
import Editor from "@monaco-editor/react";
import "../styles/WebCompiler.css";

// automaticLayout lets Monaco re-measure when the flex track it sits in
// changes width; without it the editors keep their first measured width and
// push the page sideways at in-between breakpoints (851px, 958px).
const EDITOR_OPTIONS = {
  minimap: { enabled: false },
  automaticLayout: true,
  scrollBeyondLastLine: false,
  wordWrap: "on",
  fontSize: 14,
};

const WebCompiler = () => {
  const [htmlCode, setHtmlCode] = useState("");
  const [cssCode, setCssCode] = useState("");
  const [jsCode, setJsCode] = useState("");
  const outputRef = useRef(null);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (!outputRef.current) return;

      const outputDoc = outputRef.current.contentDocument;
      const fullHTML = `
        <html>
          <head>
            <style>
              html, body { height: 100%; margin: 0; padding: 0; overflow: auto; }
              ${cssCode}
            </style>
          </head>
          <body>
            ${htmlCode}
            <script>${jsCode}<\/script>
          </body>
        </html>
      `;

      outputDoc.open();
      outputDoc.write(fullHTML);
      outputDoc.close();
    }, 300);

    return () => clearTimeout(timeout);
  }, [htmlCode, cssCode, jsCode]);

  const editors = [
    { key: "html", label: "HTML", icon: "fa-brands fa-html5", language: "html", value: htmlCode, onChange: setHtmlCode },
    { key: "css", label: "CSS", icon: "fa-brands fa-css3-alt", language: "css", value: cssCode, onChange: setCssCode },
    { key: "js", label: "JavaScript", icon: "fa-brands fa-js", language: "javascript", value: jsCode, onChange: setJsCode },
  ];

  return (
    <div className="webcompiler-container">
      <div className="editors-section">
        {editors.map(({ key, label, icon, language, value, onChange }) => (
          <div className="editor-card" key={key}>
            <label>
              <i className={icon}></i> {label}
            </label>
            <div className="editor-body">
              <Editor
                height="100%"
                width="100%"
                defaultLanguage={language}
                theme="vs-dark"
                value={value}
                onChange={(next) => onChange(next || "")}
                options={EDITOR_OPTIONS}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="output-section">
        <label>
          <i className="fa-solid fa-play"></i> Output
        </label>
        <iframe title="output" ref={outputRef} />
      </div>
    </div>
  );
};

export default WebCompiler;
