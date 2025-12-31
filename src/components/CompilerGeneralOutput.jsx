import React, { forwardRef } from "react";
import "../styles/CompilerGeneral.css";

const CompilerGeneralOutput = forwardRef(({ output, darkMode }, ref) => {
  return (
    <div id="output-area" className={darkMode ? "dark" : "light"} ref={ref}>
      {output && output.trim() !== "" ? (
        output
          .split("\n")
          .filter((line) => line.trim() !== "")
          .map((line, index) => (
            <div key={index} className="output-line">
              <span className="output-line-number">{index + 1}.</span>
              <span>{line}</span>
            </div>
          ))
      ) : (
        <div className="output-placeholder">Output will appear here...</div>
      )}
    </div>
  );
});

export default CompilerGeneralOutput;
