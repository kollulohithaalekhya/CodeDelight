import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Editor from "@monaco-editor/react";
import { useAuth } from "../context/AuthContext";
import { API_BASE } from "../api/client";
import "../styles/CompilerGeneral.css";

// Per-language config: editor language, starter snippet, file extension, the API
// endpoint, whether it accepts stdin, and how to read its response.
const LANGS = {
  c: {
    label: "C", icon: "fa-solid fa-c", monaco: "c", ext: "c", endpoint: "/c", stdin: true,
    starter: `#include <stdio.h>\n\nint main() {\n    printf("Hello, World!\\n");\n    return 0;\n}`,
  },
  cpp: {
    label: "C++", icon: "fa-solid fa-code", monaco: "cpp", ext: "cpp", endpoint: "/cpp", stdin: true,
    starter: `#include <iostream>\nusing namespace std;\n\nint main() {\n    cout << "Hello, World!" << endl;\n    return 0;\n}`,
  },
  java: {
    label: "Java", icon: "fa-brands fa-java", monaco: "java", ext: "java", endpoint: "/java", stdin: true,
    starter: `public class Main {\n    public static void main(String[] args) {\n        System.out.println("Hello, World!");\n    }\n}`,
  },
  python: {
    label: "Python", icon: "fa-brands fa-python", monaco: "python", ext: "py", endpoint: "/python", stdin: true,
    starter: `print("Hello, World!")`,
  },
  javascript: {
    label: "JavaScript", icon: "fa-brands fa-js", monaco: "javascript", ext: "js", endpoint: "/javascript", stdin: true,
    starter: `console.log("Hello, World!");`,
  },
  dart: {
    label: "Dart", icon: "fa-solid fa-bullseye", monaco: "dart", ext: "dart", endpoint: "/dart", stdin: true,
    starter: `void main() {\n  print("Hello, World!");\n}`,
  },
  verilog: {
    label: "Verilog", icon: "fa-solid fa-microchip", monaco: "verilog", ext: "v", endpoint: "/verilog", stdin: true,
    starter: `module main;\n  initial begin\n    $display("Hello, World!");\n    $finish;\n  end\nendmodule`,
  },
  sql: {
    label: "SQL", icon: "fa-solid fa-database", monaco: "sql", ext: "sql", endpoint: "/problemcompiler/sql", stdin: false, isSql: true,
    starter: `-- Create a table, insert rows, then query them\nCREATE TABLE IF NOT EXISTS users (id INT, name VARCHAR(50));\nINSERT INTO users VALUES (1, 'Ada'), (2, 'Alan');\nSELECT * FROM users;`,
  },
};

const ORDER = ["c", "cpp", "java", "python", "javascript", "dart", "verilog", "sql"];

export default function CompilerGeneral() {
  const { user } = useAuth();
  const [language, setLanguage] = useState("c");
  const [code, setCode] = useState(LANGS.c.starter);
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [table, setTable] = useState(null); // SQL result grid
  const [status, setStatus] = useState("idle");
  const [running, setRunning] = useState(false);
  const [dark, setDark] = useState(true);
  const [copied, setCopied] = useState(false);
  const [mobileTab, setMobileTab] = useState("editor");

  const cfg = LANGS[language];
  const outputRef = useRef(null);

  useEffect(() => {
    if (outputRef.current) outputRef.current.scrollTop = outputRef.current.scrollHeight;
  }, [output]);

  const runCode = async () => {
    setRunning(true);
    setStatus("running");
    setTable(null);
    setOutput("Running…");
    try {
      const body = cfg.isSql
        ? { code, values: [], userId: user?.id || user?.username || "guest" }
        : { code, input, userName: user?.username || "guest" };
      const res = await fetch(`${API_BASE}${cfg.endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = await res.json();

      if (cfg.isSql) {
        if (data.success) {
          const result = data.data;
          if (Array.isArray(result) && result.length) {
            setTable(result);
            setOutput("");
          } else if (result && typeof result === "object" && "affectedRows" in result) {
            // INSERT / UPDATE / CREATE etc. — show an affected-rows summary.
            setOutput(`✓ Query OK — ${result.affectedRows} row(s) affected.${result.info ? "\n" + result.info : ""}`);
          } else {
            setOutput("✓ Query executed — no rows returned.");
          }
          setStatus("ok");
        } else {
          setOutput(data.error || data.message || "SQL error");
          setStatus("error");
        }
      } else if (data.output && data.output.trim()) {
        setOutput(data.output);
        setStatus(data.error ? "error" : "ok");
      } else if (data.error) {
        setOutput(data.error);
        setStatus("error");
      } else {
        setOutput("(no output)");
        setStatus("ok");
      }
    } catch (err) {
      setOutput(`Network error:\n${err.message}`);
      setStatus("error");
    } finally {
      setRunning(false);
    }
  };

  const clearAll = () => { setInput(""); setOutput(""); setTable(null); setStatus("idle"); };

  const selectLanguage = (lang) => {
    setLanguage(lang);
    setCode(LANGS[lang].starter);
    setInput("");
    setOutput("");
    setTable(null);
    setStatus("idle");
  };

  const copyCode = async () => {
    try { await navigator.clipboard.writeText(code); setCopied(true); setTimeout(() => setCopied(false), 1500); }
    catch { /* clipboard unavailable */ }
  };

  const downloadCode = () => {
    let filename = prompt("Enter file name:", "code");
    if (!filename) return;
    if (!filename.endsWith(`.${cfg.ext}`)) filename += `.${cfg.ext}`;
    const blob = new Blob([code], { type: "text/plain;charset=utf-8" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    link.click();
  };

  return (
    <div className={`cg ${dark ? "cg-dark" : "cg-light"}`}>
      {/* Toolbar */}
      <header className="cg-toolbar">
        <div className="cg-tb-left">
          <Link to="/compiler" className="cg-back" title="Back to compilers"><i className="fa-solid fa-arrow-left" /></Link>
          <span className="cg-brand"><i className="fa-solid fa-terminal" /> Code Compiler</span>
        </div>

        <div className="cg-langs">
          {ORDER.map((id) => (
            <button
              key={id}
              className={`cg-lang ${language === id ? "active" : ""}`}
              onClick={() => selectLanguage(id)}
            >
              <i className={LANGS[id].icon} /> <span>{LANGS[id].label}</span>
            </button>
          ))}
        </div>

        <div className="cg-tb-right">
          <button className="cg-icon" onClick={copyCode} title="Copy code"><i className={`fa-solid ${copied ? "fa-check" : "fa-copy"}`} /></button>
          <button className="cg-icon" onClick={downloadCode} title="Download code"><i className="fa-solid fa-download" /></button>
          <button className="cg-icon" onClick={() => setDark((d) => !d)} title="Toggle theme"><i className={`fa-solid ${dark ? "fa-sun" : "fa-moon"}`} /></button>
          <button className="cg-icon" onClick={clearAll} title="Clear I/O"><i className="fa-solid fa-eraser" /></button>
          <button className="cg-run" onClick={runCode} disabled={running}>
            <i className={`fa-solid ${running ? "fa-spinner fa-spin" : "fa-play"}`} />
            {running ? "Running" : "Run"}
          </button>
        </div>
      </header>

      {/* Mobile tabs */}
      <div className="cg-mobile-tabs">
        <button className={mobileTab === "editor" ? "active" : ""} onClick={() => setMobileTab("editor")}><i className="fa-solid fa-code" /> Editor</button>
        <button className={mobileTab === "io" ? "active" : ""} onClick={() => setMobileTab("io")}><i className="fa-solid fa-terminal" /> {cfg.isSql ? "Result" : "Input / Output"}</button>
      </div>

      {/* Workspace */}
      <div className="cg-workspace">
        <section className={`cg-editor ${mobileTab === "editor" ? "show" : ""}`}>
          <Editor
            height="100%" width="100%"
            theme={dark ? "vs-dark" : "light"}
            language={cfg.monaco}
            path={`main.${cfg.ext}`}
            value={code}
            onChange={(val) => setCode(val || "")}
            options={{
              minimap: { enabled: false },
              automaticLayout: true,
              scrollBeyondLastLine: false,
              padding: { top: 14 },
              fontSize: Number(localStorage.getItem("fontSize")) || 14,
              lineNumbers: localStorage.getItem("lineNumbers") !== "false" ? "on" : "off",
            }}
          />
        </section>

        <section className={`cg-io ${mobileTab === "io" ? "show" : ""}`}>
          {/* Input panel — hidden for SQL (no stdin) */}
          {cfg.stdin && (
            <div className="cg-panel">
              <div className="cg-panel-head"><i className="fa-solid fa-keyboard" /> Input</div>
              <textarea
                className="cg-input"
                placeholder="Enter program input here (stdin)…"
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
            </div>
          )}

          <div className={`cg-panel cg-panel-output ${cfg.stdin ? "" : "full"}`}>
            <div className="cg-panel-head">
              <span><i className="fa-solid fa-square-poll-horizontal" /> {cfg.isSql ? "Result" : "Output"}</span>
              <span className={`cg-status cg-status-${status}`}>
                {status === "running" ? "Running…" : status === "ok" ? "Success" : status === "error" ? "Error" : "Ready"}
              </span>
            </div>
            <div className="cg-output" ref={outputRef}>
              {table && table.length ? (
                <SqlTable rows={table} />
              ) : output && output.trim() ? (
                output.split("\n").map((line, i) => (
                  <div className="cg-out-line" key={i}>
                    <span className="cg-out-num">{i + 1}</span>
                    <span className="cg-out-text">{line || " "}</span>
                  </div>
                ))
              ) : (
                <div className="cg-out-empty">
                  {cfg.isSql ? "Run a query to see the result table…" : "Run your code to see the output here…"}
                </div>
              )}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

// Renders SQL result rows as a table.
function SqlTable({ rows }) {
  const cols = Object.keys(rows[0] || {});
  return (
    <div className="cg-sql-wrap">
      <table className="cg-sql-table">
        <thead><tr>{cols.map((c) => <th key={c}>{c}</th>)}</tr></thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i}>{cols.map((c) => <td key={c}>{String(r[c])}</td>)}</tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
