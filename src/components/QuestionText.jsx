import React, { useMemo } from "react";
import "../styles/QuestionText.css";

// Renders a question prompt.
//
// Generated questions carry lightweight markdown — fenced ``` code blocks for
// snippets to trace, `inline code` for identifiers, and **bold** for the part
// of the question that matters. Rendering that as raw text would show the
// backticks and collapse the newlines in a code sample, so this parses the
// small subset that questions actually use. Nothing is passed to innerHTML.
function renderInline(text, keyPrefix) {
  // Split on `code` and **bold**, keeping the delimiters.
  const parts = text.split(/(`[^`]+`|\*\*[^*]+\*\*)/g);
  return parts.filter(Boolean).map((part, i) => {
    const key = `${keyPrefix}-${i}`;
    if (part.startsWith("`") && part.endsWith("`") && part.length > 2) {
      return <code className="qt-code" key={key}>{part.slice(1, -1)}</code>;
    }
    if (part.startsWith("**") && part.endsWith("**") && part.length > 4) {
      return <strong key={key}>{part.slice(2, -2)}</strong>;
    }
    return <React.Fragment key={key}>{part}</React.Fragment>;
  });
}

export default function QuestionText({ text, className = "" }) {
  const blocks = useMemo(() => {
    const src = String(text ?? "");
    const out = [];
    // ```lang\n...\n``` fenced blocks, with the prose between them.
    const re = /```([a-zA-Z]*)\n?([\s\S]*?)```/g;
    let last = 0;
    let m;
    while ((m = re.exec(src)) !== null) {
      if (m.index > last) out.push({ type: "text", value: src.slice(last, m.index) });
      out.push({ type: "code", value: m[2].replace(/\n$/, ""), lang: m[1] });
      last = m.index + m[0].length;
    }
    if (last < src.length) out.push({ type: "text", value: src.slice(last) });
    return out;
  }, [text]);

  return (
    <div className={`qt ${className}`}>
      {blocks.map((b, bi) =>
        b.type === "code" ? (
          <pre className="qt-block" key={bi}><code>{b.value}</code></pre>
        ) : (
          // Preserve the author's line breaks in prose.
          b.value.split("\n").map((line, li) =>
            line.trim() === "" ? (
              <span className="qt-gap" key={`${bi}-${li}`} />
            ) : (
              <p className="qt-line" key={`${bi}-${li}`}>{renderInline(line, `${bi}-${li}`)}</p>
            )
          )
        )
      )}
    </div>
  );
}
