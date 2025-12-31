import React from "react";

export default function CompilerGeneralInput({ input, setInput, darkMode }) {
  return (
    <div id="input-area" className={darkMode ? "dark" : "light"}>
      <label htmlFor="input-textarea" style={{backgroundColor: "#2c3e50", color: "white"}}>Input:</label>
      <textarea
        id="input-textarea"
        placeholder="Enter your program input here..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className={darkMode ? "textarea-dark" : "textarea-light"}
      />
    </div>
  );
}
