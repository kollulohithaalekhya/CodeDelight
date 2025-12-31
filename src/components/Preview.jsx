// Preview.js
import React, { useRef, useEffect } from "react";

const Preview = ({ code }) => {
  const iframeRef = useRef();

  useEffect(() => {
    const document = iframeRef.current.contentDocument;
    document.open();
    document.write(code);
    document.close();
  }, [code]);

  return <iframe ref={iframeRef} className="output-box" title="preview"></iframe>;
};

export default Preview;