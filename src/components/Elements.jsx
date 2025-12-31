import React, { useState } from "react";
// import structure from "./assets/structure_html.webp";
import MonacoEditorSection from "./MonacoEditorSection";
import Preview from "./Preview";
// import element from "./assets/element.png";

const Elements = ({ showContent }) => {
  const initialCode = `
<!DOCTYPE html>
<html>
  <head>
    <title>My First Web Page</title>
  </head>
  <body>
    <h1>Welcome to HTML!</h1>
  </body>
</html>`;
  const initialCode1 = `
<!DOCTYPE html>
<html>
<head>
    <title>HTML Elements</title>
</head>
<body style="text-align: center">
    <h1>GeeksforGeeks</h1>
    <p>Computer science portal</p>
</body>
</html>
`;
  const initialCode2 = `
<!DOCTYPE html>
<html>
<head>
    <title>Empty HTML Elements</title>
</head>
<body>
    <h2>Welcome To GfG</h2>
    <br />
    <p>Hello Geeks.</p>
</body>
</html>
`;
  const [code1, setCode1] = useState(initialCode);
  const [code2, setCode2] = useState(initialCode1);
  const [code3, setCode3] = useState(initialCode2);
  return (
    <div className="content-section">
      <h1>HTML Elements</h1>
      <p>
        An <b>HTML Element</b> consists of a <b>start tag, content,</b> and an{" "}
        <b>end tag,</b>
        which together define the element's structure and functionality.
        Elements are the basic building blocks of a webpage and can represent
        different types of content, such as text, links, images, or headings.
      </p>
      <p>
        For example, the &lt;p&gt; element for paragraphs includes opening and
        closing tags with text content in between.
      </p>
      <center>
        <img src="/images/element.png" />
      </center>
      <h3 class="above">Syntax</h3>
      <div class="syntax">
        &lt;tagname&gt; Your Contents... &lt;/tagname&gt;
      </div>
      <h3>HTML Element Code Example:</h3>
      <p>
        In this example &lt;p&gt; is a starting tag, &lt;/p&gt; is an ending tag
        and it contains some content between the tags, which form an element
      </p>
      <MonacoEditorSection initialCode={initialCode} onCodeChange={setCode1} />
      <h3>Output Preview</h3>
      <Preview code={code1} />
      <h2>Some Key Points About HTML Elements</h2>
      <h3>1. Syntax:</h3>
      <ul>
        <li>
          An opening tag indicates where the content begins: &lt;tagname&gt;.
        </li>
        <li>
          A closing tag indicates where the content ends: &lt;tagname&gt;.
        </li>
        <li>
          The actual content resides between the opening and closing tags.
        </li>
      </ul>
      <h3>2. Case Sensitivity:</h3>
      <ul>
        <li>
          HTML tags are not case-sensitive. For example, &lt;B&gt; and &lt;b&gt;
          both represent bold text.
        </li>
        <li>
          However, it’s a best practice to use lowercase tags for consistency
          and readability.
        </li>
      </ul>
      <h2>Nested HTML Elements</h2>
      <p>
        Nested HTML Elements occur when one element is placed inside another,
        creating a hierarchical structure. This structure is crucial for
        organizing content on web pages effectively, ensuring that different
        elements relate logically and visually to each other.
      </p>
      <p>
        <b>Example:</b>Here, the &lt;html&gt;tag contains the &lt;head&gt; and
        &lt;body&gt; tags, forming a nested structure.
      </p>
      <MonacoEditorSection initialCode={initialCode1} onCodeChange={setCode2} />
      <h3>Output Preview</h3>
      <Preview code={code2} />
      <p>
        Here, the &lt;html&gt;tag contains the&lt;head&gt;and &lt;body&gt;. The
        &lt;head&gt; and &lt;body&gt;tag contain other elements so it is called
        a nested element.
      </p>
      <h2>Necessary to Add an End Tag</h2>
      <p>
        For non-empty HTML elements, if you forget to add a closing or end tag,
        modern browsers may automatically add it in some cases.
      </p>
      <p>
        However, this can cause issues when you add additional HTML elements
        later on. Therefore, it is best practice to always include the closing
        tag for non-void HTML elements.
      </p>
      <MonacoEditorSection initialCode={initialCode1} onCodeChange={setCode2} />
      <h3>Output Preview</h3>
      <Preview code={code2} />
      <p>
        <b>Output:</b>This Image is showing the Browser's Developer Tools and
        you can see that the missing closing tag of the paragraph element in the
        above-written code is automatically added by the browser without showing
        any error.
      </p>
      <h2>HTML Empty Element</h2>
      <p>
        HTML Elements without any content i.e., that do not print anything are
        called Empty elements. Empty HTML elements do not have an ending tag.
        For instance. &lt;br&gt;, &lt;hr&gt;, &lt;link&gt;,&lt;input&gt; etc are
        HTML elements.
      </p>
      <p>
        <b>Example:</b>In this example &lt;br&gt; tag doesn't print anything. It
        is used as a line break that breaks the line between &lt;h2&gt;and
        &lt;p&gt; tags.
      </p>
      <MonacoEditorSection initialCode={initialCode2} onCodeChange={setCode3} />
      <h3>Output Preview</h3>
      <Preview code={code3} />
      <h2>Block-Level Elements and Inline Elements</h2>
      <p>
        In HTML, elements are broadly categorized into two main types based on
        how they display in the document layout: block-level elements and inline
        elements.
      </p>
      <p>
        <b>1. Block-Level Elements</b>
      </p>
      <p>
        Block-level elements typically start on a new line and take up the full
        width available to them, regardless of their actual content width. This
        means they stack vertically and can contain other block-level elements
        as well as inline elements. Here are some examples of block-level
        elements:
      </p>
      <p>
        <b>Examples:</b>
      </p>
      <ul>
        <li>&lt;div&gt;: A general-purpose container for other elements.</li>
        <li>&lt;p&gt;:Defines a paragraph.</li>
        <li>
          &lt;h1&gt;,&lt;h2&gt;, ..., &lt;h6&gt;: Heading elements of different
          levels.
        </li>
        <li>&lt;ol&gt;,&lt;ul&gt;: Ordered and unordered lists.</li>
        <li>&lt;table&gt;: Defines a table.</li>
        <li>&lt;form&gt;: Used for HTML forms to collect user inputs.</li>
        <li>
          &lt;section&gt;, &lt;article&gt;, &lt;nav&gt;, &lt;aside&gt;,
          &lt;header&gt;, &lt;footer&gt;: Semantic elements that define areas of
          a webpage.
        </li>
      </ul>
      <p>
        <b>2. Inline Elements</b>
      </p>
      <p>
        Inline elements do not start on a new line; they appear on the same line
        as adjacent content, as long as there is space. They only take up as
        much width as their content requires. Inline elements are typically used
        within block-level elements to add content or style. Here are some
        examples of inline elements:
      </p>
      <p>
        <b>Examples:</b>
      </p>
      <ul>
        <li>
          &lt;span&gt;: A general-purpose inline container for phrasing content.
        </li>
        <li>&lt;a&gt;: Creates hyperlinks.</li>
        <li>&lt;img&gt;: Embeds an image.</li>
        <li>
          &lt;strong&gt;, &lt;b&gt;: Used for strong emphasis and bold text,
          respectively.
        </li>
        <li>
          &lt;em&gt;, &lt;i&gt;: Used for emphasis and italic text,
          respectively.
        </li>
        <li>&lt;br&gt;: Inserts a line break within text.</li>
        <li>&lt;input&gt;: Creates interactive controls for forms.</li>
      </ul>
      <h2>Best Practices When Using HTML Elements</h2>
      <ul>
        <li>
          <b>Semantic HTML:</b>Use HTML elements according to their intended
          purpose. For example, use heading elements for headings, &lt;p&gt; for
          paragraphs, and &lt;a&gt; for links.
        </li>
        <li>
          <b>Accessibility:</b>Enhance accessibility by using proper elements
          like &lt;main&gt;, &lt;aside&gt;, &lt;header&gt;, and &lt;footer&gt;.
          Also, always include alt text for images.
        </li>
        <li>
          <b>Keep it Simple:</b>Avoid unnecessary complexity in HTML structure.
          Use the simplest possible elements to achieve the desired layout and
          functionality.
        </li>
      </ul>
      <div class="nav-buttons">
        <button onClick={() => showContent("editors")}>PREVIOUS</button>
        <button onClick={() => showContent("attributes")}>NEXT</button>
      </div>
    </div>
  );
};
export default Elements;
