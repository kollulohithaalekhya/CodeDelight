import React, { useState } from "react";
import Editor from "./CompilerWebEditor";
import Output from "./CompilerWebOutput";
import "../styles/CompilerWeb.css";

function CompilerWeb() {
  const [code, setCode] = useState({
    html: "",
    css: "",
    js: ""
  });

  const handleCodeChange = (language, value) => {
    setCode({ ...code, [language]: value });
  };

  return (
    <div className="container">
      <div className="top-editors">
        <div className="left">
          <Editor
            label="HTML"
            icon="fab fa-html5"
            language="html"
            value={code.html}
            onChange={handleCodeChange}
          />
          <Editor
            label="CSS"
            icon="fab fa-css3-alt"
            language="css"
            value={code.css}
            onChange={handleCodeChange}
          />
          <Editor
            label="JavaScript"
            icon="fab fa-js"
            language="js"
            value={code.js}
            onChange={handleCodeChange}
          />
        </div>
      </div>
      <Output html={code.html} css={code.css} js={code.js} />
    </div>
  );
}

export default CompilerWeb;
