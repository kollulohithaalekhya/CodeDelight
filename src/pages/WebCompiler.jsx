import React, { useState, useEffect, useRef } from "react";
import Editor from "@monaco-editor/react";
import "../styles/WebCompiler.css"; 

const HtmlIcon = () => <i className="fa-brands fa-html5"></i>;
const CssIcon = () => <i className="fa-brands fa-css3-alt"></i>;
const JsIcon = () => <i className="fa-brands fa-js"></i>;
const PlayIcon = () => <i className="fa-solid fa-play"></i>;

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

  return (
    <div className="webcompiler-container">
      <div className="editors-section">
        <div className="editor-card">
          <label>
            <HtmlIcon /> HTML
          </label>
          <Editor
            height="100%"
            defaultLanguage="html"
            theme="vs-dark"
            value={htmlCode}
            onChange={(value) => setHtmlCode(value || "")}
          />

          {/* <Editor
            height="100%"
            width="100%"
            theme= "vs-dark"
            value={htmlCode}
            
            onChange={(value) => setHtmlCode(value || "")}
            options={{
              minimap: { enabled: false },
              automaticLayout: true,

              suggest: {
                showDetails: false,
                preview: false,
              },
              quickSuggestions: true,
              parameterHints: {
                enabled: true,
              },
            }}
          /> */}
        </div>

        <div className="editor-card">
          <label>
            <CssIcon /> CSS
          </label>
          <Editor
            height="100%"
            defaultLanguage="css"
            theme="vs-dark"
            value={cssCode}
            onChange={(value) => setCssCode(value || "")}
          />
        </div>

        <div className="editor-card">
          <label>
            <JsIcon /> JavaScript
          </label>
          <Editor
            height="100%"
            defaultLanguage="javascript"
            theme="vs-dark"
            value={jsCode}
            onChange={(value) => setJsCode(value || "")}
          />
        </div>
      </div>

      <div className="output-section">
        <label>
          <PlayIcon /> Output
        </label>
        <iframe title="output" ref={outputRef} />
      </div>
    </div>
  );
};

export default WebCompiler;
