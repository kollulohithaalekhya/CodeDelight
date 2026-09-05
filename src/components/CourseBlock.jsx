import React, { useEffect, useRef, useState } from "react";
import MonacoEditorSection from "./MonacoEditorSection";
import Preview from "./Preview";

/**
 * One block of course content: either prose lifted from the original course
 * page, or a live editor + preview pair (the old pages used CodeMirror on a
 * textarea with an iframe beside it).
 */
function CourseBlock({ block }) {
  const [code, setCode] = useState(block.type === "editor" ? block.code : "");
  const htmlRef = useRef(null);

  useEffect(() => {
    if (block.type !== "html" || !htmlRef.current) return;
    const root = htmlRef.current;

    // The course tables carry a min-width from the original stylesheet, so give
    // each one its own horizontal scroller instead of letting it widen the page.
    root.querySelectorAll("table").forEach((table) => {
      if (table.parentElement && table.parentElement.classList.contains("scroll-wrapper")) return;
      const wrapper = document.createElement("div");
      wrapper.className = "scroll-wrapper";
      table.parentNode.insertBefore(wrapper, table);
      wrapper.appendChild(table);
    });

    // A handful of images referenced by the original course pages were never
    // shipped with the project. Hide those rather than show a broken-image icon.
    const images = root.querySelectorAll("img");
    const hide = (event) => {
      event.target.style.display = "none";
    };
    images.forEach((img) => {
      if (img.complete && img.naturalWidth === 0) img.style.display = "none";
      img.addEventListener("error", hide);
    });
    return () => images.forEach((img) => img.removeEventListener("error", hide));
  }, [block]);

  if (block.type === "editor") {
    return (
      <div className="course-editor-block">
        <MonacoEditorSection initialCode={block.code} onCodeChange={setCode} />
        <h3>Output Preview</h3>
        <Preview code={code} />
      </div>
    );
  }

  return <div ref={htmlRef} dangerouslySetInnerHTML={{ __html: block.value }} />;
}

export default CourseBlock;
