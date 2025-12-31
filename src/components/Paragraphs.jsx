import react, { useState } from "react";
import MonacoEditorSection from "./MonacoEditorSection";
import Preview from "./Preview";
const Paragraphs = ({ showContent }) => {
  const initialCode = `
  <!DOCTYPE html>
<html>
<body>
<p>This is a paragraph1.</p>
<p>This is a paragraph2.</p>
<p>This is a paragraph3.</p>
</body>
</html>
  `
  const initialCode1 = `
  <p>
        This paragraph has multiple
        <br />lines. But HTML reduces them
        <br />to a single line, omitting
        <br />the carriage return we have used.
    </p>
  `
  const [code1, setCode1] = useState(initialCode);
  const [code2, setCode2] = useState(initialCode1);
  return (
    <div className="content-section">
      <h1>HTML Paragraphs</h1>
      <p>
        A paragraph in HTML is simply a block of text enclosed within the &lt;p&gt; tag.
        The &lt;p&gt; tag helps divide content into manageable, readable sections.
      </p>
      <h3>Syntax:</h3>
      <div className="syntax">
        <p>&lt;p&gt; Some Content... &lt;/p&gt;</p>
      </div>
      <h3>How HTML Paragraphs are Rendered?</h3>
      <p>In HTML, when you wrap text inside the &lt;p&gt; tag, it automatically:</p>
      <ul>
        <li>Adds space before and after the paragraph.</li>
        <li>Breaks the text into a single block.</li>
      </ul>
      <h2>HTML Paragraph Code Example</h2>
      <p>Here’s an example showing two paragraphs in HTML:</p>
       <MonacoEditorSection initialCode={initialCode} onCodeChange={setCode1} />
        <h3>Output Preview</h3>
        <Preview code={code1} />
        <h3>Properties of the paragraph Tag</h3>
             <ul>
              <li>The browser reduces multiple spaces added by users to a single space.</li>
              <li>If a user adds various lines, the browser compresses them into one line.</li>
              <li>By default, the display of the paragraph element is set to "block," meaning each new paragraph is placed on a new line. (Note: This behavior can be modified using CSS.)</li>
             </ul>
        <h2>
          The &lt;br&gt; tag
        </h2>
        <p>The HTML &lt;br&gt; tag element creates a line break, giving you a new line without starting a new paragraph. Use &lt;br&gt; 
          when you want to move to the next line without beginning a whole new paragraph.</p>
        <h3>Syntax:</h3>
        <div className="syntax">
          <p>&lt;br&gt;</p>
        </div>
        <p>Example: This example explains the &lt;br&gt; tag inside the &lt;p&gt; tag to add the line-break.</p>
         <MonacoEditorSection initialCode={initialCode1} onCodeChange={setCode2} />
        <h3>Output Preview</h3>
        <Preview code={code2} />
        <h3>The Horizontal Rules &lt;hr&gt; tag</h3>
      <p>The HTML &lt;hr&gt; tag is used to create a horizontal rule or line,
         visually separating content on a webpage. Use &lt;hr&gt; when you want to insert a horizontal line 
         to signify a division between sections or elements, 
        providing a clear visual break in the page.</p>
        <h3>Syntax:</h3>
        <div className="syntax">
          <p>&lt;hr&gt;</p>
        </div>
        <p>Example: In this example we will use the &lt;hr&gt; tag with an example by using &lt;p&gt; tag also.</p>
        <h3>Align attribute</h3>
        <p>The &lt;p&gt; tag specifically supports the alignment attribute and allows us to align our paragraphs in left, right, or center alignment. </p>
        <h3>Syntax:</h3>
        <div className="syntax">
          <p>&lt;p align ="value"&gt;</p>
        </div>
        <h2>Avoiding Common Mistakes with Paragraphs</h2>
        <ol>
          <li>Avoid Nested Paragraphs: You cannot nest paragraphs within one another. Each &lt;p&gt; 
            tag should contain only the text for one block of content.</li>
          <li>Avoid Using &lt;p&gt; for Non-Textual Content: The &lt;p&gt; tag is meant for text-based content. If you need to wrap images, tables, or other elements,
             use appropriate tags like &lt;img&gt; , &lt;table&gt;or &lt;div&gt;.</li>
        </ol>
    </div>
  );
};

export default Paragraphs;
