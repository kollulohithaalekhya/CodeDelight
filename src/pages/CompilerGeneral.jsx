import React, { useEffect, useRef, useState } from "react";
import Editor from "@monaco-editor/react";
import InputField from "../components/CompilerGeneralInput";
import CompilerOutput from "../components/CompilerGeneralOutput";
import "../styles/CompilerGeneral.css";

const defaultCodeSnippets = {
  c: `#include <stdio.h>\n\nint main() {\n    printf("Hello, World!\\n");\n    return 0;\n}`,
  cpp: `#include <iostream>\nusing namespace std;\n\nint main() {\n    cout << "Hello, World!" << endl;\n    return 0;\n}`,
  java: `public class Main {\n    public static void main(String[] args) {\n        System.out.println("Hello, World!");\n    }\n}`,
  python: `print("Hello, World!")`,
};

const fileExtensions = { c: "c", cpp: "cpp", java: "java", python: "py" };

export default function CompilerGeneral() {
  const [language, setLanguage] = useState("c");
  const [code, setCode] = useState(defaultCodeSnippets["c"]);
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [theme, setTheme] = useState("vs-dark"); 

  const outputRef = useRef(null);

  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  }, [output]);

  const updateOutput = (text) => setOutput(text || "");

  const runCode = async () => {
    updateOutput("Running...");
    try {
      const res = await fetch(`https://compilerapi.jami.ltd/${language}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code, input }),
      });
      const data = await res.json();
      if (data.output) updateOutput(data.output);
      else if (data.error) updateOutput(`Error:\n${data.error}`);
      else updateOutput("");
    } catch (err) {
      updateOutput(`Fetch error:\n${err.message}`);
    }
  };

  const clearAll = () => {
    setInput("");
    updateOutput("");
  };

  const handleLanguageChange = (e) => {
    const lang = e.target.value;
    setLanguage(lang);
    setCode(defaultCodeSnippets[lang]);
    setInput("");
    updateOutput("");
  };

  const toggleTheme = () => {
    setTheme((prev) => (prev === "vs-dark" ? "light" : "vs-dark"));
  };

  const downloadCode = () => {
    let filename = prompt("Enter file name:", `code`);
    if (!filename) return;

    const extension = fileExtensions[language] || "txt";
    if (!filename.endsWith(`.${extension}`)) {
      filename += `.${extension}`;
    }

    const blob = new Blob([code], { type: "text/plain;charset=utf-8" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    link.click();
  };

  return (
    <div className={`compiler-container ${theme === "vs-dark" ? "dark" : "light"}`}>
      <div id="topbar">
        <div className="topbar-left">
          <label htmlFor="language">Language:</label>
          <select value={language} onChange={handleLanguageChange}>
            <option value="c">C</option>
            <option value="cpp">C++</option>
            <option value="java">Java</option>
            <option value="python">Python</option>
          </select>
        </div>

        <div className="topbar-right">
          <button onClick={runCode}>Run</button>
          <button onClick={clearAll}>Clear</button>
          <div className="icon" onClick={toggleTheme}>
            {theme === "vs-dark" ? (
              <i className="fa-solid fa-toggle-off"></i>
            ) : (
              <i className="fa-solid fa-toggle-on"></i>
            )}
          </div>
          <div className="icon" onClick={downloadCode}>
            <i className="fa-solid fa-download"></i>
          </div>
        </div>
      </div>

      <div id="main-container">
        <div id="editor-pane">
          <Editor
            height="100%"
            width="100%"
            theme={theme}
            language={language === "cpp" ? "cpp" : language}
            value={code}
            onChange={(val) => setCode(val || "")}
            options={{ minimap: { enabled: false }, automaticLayout: true }}
          />
        </div>
      
        <div id="right-pane">
          <InputField input={input} setInput={setInput} darkMode={theme === "vs-dark"} />
          <CompilerOutput output={output} ref={outputRef} darkMode={theme === "vs-dark"} />
        </div>
      </div>
    </div>
  );
}
