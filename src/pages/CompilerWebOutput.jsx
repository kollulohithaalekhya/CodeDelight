import React, { useEffect, useRef } from "react";
import "../styles/CompilerWeb.css";

function CompilerWebOutput({ html, css, js }) {
  const iframeRef = useRef(null);

  useEffect(() => {
    const document = iframeRef.current.contentDocument;
    const documentContents = `
      <html>
        <head>
          <style>${css}</style>
        </head>
        <body>
          ${html}
          <script>${js}<\/script>
        </body>
      </html>
    `;
    document.open();
    document.write(documentContents);
    document.close();
  }, [html, css, js]);

  return (
    <div className="right">
      <label>Output</label>
      <iframe ref={iframeRef} title="output"></iframe>
    </div>
  );
}

export default CompilerWebOutput;
