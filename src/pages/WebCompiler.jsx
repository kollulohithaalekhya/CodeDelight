import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Editor from "@monaco-editor/react";
import "../styles/WebCompiler.css";

const STARTER = {
  html: `<h1>Hello, Code Delight! 👋</h1>\n<p>Edit HTML, CSS & JS — the preview updates live.</p>\n<button id="btn">Click me</button>`,
  css: `body {\n  font-family: system-ui, sans-serif;\n  text-align: center;\n  padding: 40px;\n  color: #0f2038;\n}\nbutton {\n  padding: 10px 20px;\n  border: none;\n  border-radius: 8px;\n  background: #4facfe;\n  color: #fff;\n  cursor: pointer;\n}`,
  js: `document.getElementById("btn").addEventListener("click", () => {\n  alert("You clicked the button!");\n});`,
};

const EDITOR_OPTIONS = {
  minimap: { enabled: false },
  automaticLayout: true,
  scrollBeyondLastLine: false,
  wordWrap: "on",
  padding: { top: 12 },
  fontSize: Number(localStorage.getItem("fontSize")) || 14,
};

const TABS = [
  { key: "html", label: "HTML", icon: "fa-brands fa-html5", color: "#e34f26" },
  { key: "css", label: "CSS", icon: "fa-brands fa-css3-alt", color: "#2965f1" },
  { key: "js", label: "JS", icon: "fa-brands fa-js", color: "#e0c810" },
];

const WebCompiler = () => {
  const [code, setCode] = useState({ html: STARTER.html, css: STARTER.css, js: STARTER.js });
  const [activeTab, setActiveTab] = useState("html");
  const [autoRun, setAutoRun] = useState(true);
  const [view, setView] = useState("split"); // split | editor | preview (mobile)
  const outputRef = useRef(null);

  const render = () => {
    if (!outputRef.current) return;
    const doc = outputRef.current.contentDocument;
    const full = `<!DOCTYPE html><html><head><style>html,body{height:100%;margin:0;padding:0;overflow:auto;}${code.css}</style></head><body>${code.html}<script>${code.js}<\/script></body></html>`;
    doc.open();
    doc.write(full);
    doc.close();
  };

  // Live auto-run (debounced).
  useEffect(() => {
    if (!autoRun) return;
    const t = setTimeout(render, 300);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [code, autoRun]);

  // Render once on mount even if autoRun is toggled off later.
  useEffect(() => { render(); /* eslint-disable-next-line */ }, []);

  const update = (key, val) => setCode((c) => ({ ...c, [key]: val ?? "" }));
  const reset = () => setCode({ html: STARTER.html, css: STARTER.css, js: STARTER.js });

  const active = TABS.find((t) => t.key === activeTab);

  return (
    <div className="wc">
      {/* Toolbar */}
      <header className="wc-toolbar">
        <div className="wc-tb-left">
          <Link to="/compiler" className="wc-back" title="Back to compilers"><i className="fa-solid fa-arrow-left" /></Link>
          <span className="wc-brand"><i className="fa-solid fa-laptop-code" /> Web Compiler</span>
        </div>

        <div className="wc-tb-right">
          <label className="wc-toggle">
            <input type="checkbox" checked={autoRun} onChange={(e) => setAutoRun(e.target.checked)} />
            <span>Auto-run</span>
          </label>
          {!autoRun && (
            <button className="wc-run" onClick={render}><i className="fa-solid fa-play" /> Run</button>
          )}
          <button className="wc-icon" onClick={reset} title="Reset to starter"><i className="fa-solid fa-rotate-left" /></button>

          {/* Mobile view switch */}
          <div className="wc-view-switch">
            <button className={view === "editor" ? "active" : ""} onClick={() => setView("editor")} title="Editors"><i className="fa-solid fa-code" /></button>
            <button className={view === "preview" ? "active" : ""} onClick={() => setView("preview")} title="Preview"><i className="fa-solid fa-eye" /></button>
          </div>
        </div>
      </header>

      <div className="wc-workspace">
        {/* Editors */}
        <section className={`wc-editors ${view === "preview" ? "hide-mobile" : ""}`}>
          <div className="wc-tabs">
            {TABS.map((t) => (
              <button
                key={t.key}
                className={`wc-tab ${activeTab === t.key ? "active" : ""}`}
                onClick={() => setActiveTab(t.key)}
                style={activeTab === t.key ? { "--tab": t.color } : undefined}
              >
                <i className={t.icon} style={{ color: t.color }} /> {t.label}
              </button>
            ))}
          </div>
          <div className="wc-editor-body">
            <Editor
              height="100%"
              width="100%"
              language={active.key === "js" ? "javascript" : active.key}
              path={active.key}
              theme="vs-dark"
              value={code[active.key]}
              onChange={(v) => update(active.key, v)}
              options={EDITOR_OPTIONS}
            />
          </div>
        </section>

        {/* Preview */}
        <section className={`wc-preview ${view === "editor" ? "hide-mobile" : ""}`}>
          <div className="wc-preview-head"><i className="fa-solid fa-eye" /> Live Preview</div>
          <div className="wc-preview-frame">
            <iframe title="output" ref={outputRef} />
          </div>
        </section>
      </div>
    </div>
  );
};

export default WebCompiler;
