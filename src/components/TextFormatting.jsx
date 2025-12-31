import react, { useState } from "react";
import MonacoEditorSection from "./MonacoEditorSection";
import Preview from "./Preview";
const TextFormatting = ({showContent})=>{
   const initialCode = `
   <!DOCTYPE html>
<html lang="en">
<head>
</head>
<body>
    <p>
        <strong>Strong:</strong> 
        This text is important and bold.
    </p>
    <p>
        <em>Emphasized:</em> 
        This text is emphasized and italic.
    </p>
    <p>
        <b>Bold:</b> 
        This text is bold.
    </p>
    <p>
        <i>Italic:</i> 
        This text is italic.
    </p>
    <p>
        <mark>Marked:</mark> 
        This text is highlighted.
    </p>
</body>
</html>
   `
    const [code1, setCode1] = useState(initialCode);
   return(
     <div className="content-section">
        <h1>HTML Text Formatting</h1>
        <p>HTML text formatting refers to the use of specific HTML tags to modify
           the appearance and structure of text on a webpage. It allows you to style text in different ways,
            such as making it bold,
          italic, underlined, highlighted, or struck-through.</p>
        <h2>Categories of HTML Text Formatting</h2>
        <p>HTML text formatting can be divided into two main categories: 
          <b>Logical Tags</b> and <b>Physical Tags.</b></p>
        <h3>1. Logical Tags</h3>
        <p>Logical tags convey the meaning or importance of the text without necessarily altering its visual appearance. 
          These tags help browsers, search engines, and assistive 
          technologies understand the purpose of the text.</p>
          <ul>
            <li><b>&lt;em&gt;</b> Emphasizes text, typically rendered in italics. It implies that the text carries special 
              importance or requires emphasis.</li>
            <li><b>&lt;strong&gt;</b>Marks text as important, often displayed in bold. 
              It implies the content is of strong importance.</li>
          </ul>
          <h3>2. Physical Tags</h3>
          <p>Physical tags directly affect how text looks on the webpage by changing the font,
             size, or style.</p>
          <ul>
            <li>&lt;b&gt;: Displays text in bold without implying importance.</li>
            <li>&lt;i&gt;: Italicizes text without any implied emphasis.</li>
          </ul>
          <p>Here’s a list of commonly used HTML text formatting tags and their description:</p>
          <h3>HTML Formatting Elements</h3>
          <h4>1. &lt;i&gt; – Italicizes text</h4>
          <p>Use the &lt;i&gt; tag to display text in italics without implying emphasis.</p>
          <div className="syntax">&lt;i&gt;This is italic text.&lt;/i&gt;</div>
          <h4>2. &lt;small&gt; – Reduces the font size of the text</h4>
          <p>The &lt;small&gt; tag renders text in a smaller font than the surrounding text.</p>
          <div className="syntax">&lt;small&gt;This text is smaller than the rest.&lt;/small&gt;</div>
          <h4>3. &lt;ins&gt; – Highlights inserted text</h4>
          <p>The &lt;ins&gt; tag marks text as newly added or inserted, often displayed with an underline.</p>
          <div className="syntax">&lt;ins&gt;This is inserted text.&lt;/ins&gt;</div>
          <h4>
            4. &lt;sub&gt; – Displays subscript text
          </h4>
          <p>Use the &lt;sub&gt; tag for subscripted text, often used in chemical formulas or footnotes.</p>
          <div className="syntax">H&lt;sub&gt;2&lt;sub&gt;O</div>
          <h4>5. &lt;mark&gt; – Highlights text with a background color</h4>
          <p>The &lt;mark&gt; tag highlights text with a background color, similar to using a highlighter on paper.</p>
          <div className="syntax">&lt;mark&gt;This text is highlighted.&lt;/mark&gt;</div>
          <h2>Examples of HTML Text Formatting</h2>
          <h3>Example 1: Basic Text Formatting</h3>
          <MonacoEditorSection initialCode={initialCode} onCodeChange={setCode1} />
        <h3>Output Preview</h3>
        <Preview code={code1} />
     </div>
   );
}
export default TextFormatting;