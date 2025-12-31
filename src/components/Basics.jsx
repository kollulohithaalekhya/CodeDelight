// Introduction.js
import React, { useState } from "react";
// import structure from "./assets/structure_html.webp"
import MonacoEditorSection from "./MonacoEditorSection";
import Preview from "./Preview";

const Basics = ({showContent}) => {
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
 const initialCode2 = `
<!DOCTYPE html>
<html>
  <head>
    <title>My First Web Page</title>
  </head>
  <body>
    <h1>Welcome to HTML!</h1>
  </body>
</html>`;
const initialCode3=`
<!DOCTYPE html>
<html>
<head>
    <title>HTML</title>
</head>
<body>
      <p>
            HTML stands for HyperText Markup Language.<br>
            It is used to design web pages using a markup
            language.<br>HTML is a combination of Hypertext
            and Markup language.<br>Hypertext defines the
            link between web pages.<br>A markup language
            is used to define the text document within the
            tag which defines the structure of web pages.
      </p>
</body>
</html>
`
const initialCode4=`
<!DOCTYPE html>
<html>
<body>
<h1>This is heading 1</h1>
<p>This is some text.</p>
<hr>
<h2>This is heading 2</h2>
<p>This is some other text.</p>
<hr>
<h2>This is heading 2</h2>
<p>This is some other text.</p>
</body>
</html>
`
const initialCode5=`
<!DOCTYPE html>
<html>
<body>
<p>This is a paragraph.</p>
<!-- <p>This is another paragraph </p> -->
<p>This is a paragraph too.</p>
</body>
</html>
`
  const [code1, setCode1] = useState(initialCode);
  const [code2, setCode2] = useState(initialCode2);
  const [code3, setCode3] = useState(initialCode3);
  const [code4, setCode4] = useState(initialCode4);
  const [code5, setCode5] = useState(initialCode5);

  return (
    <div className="content-section">
            <h1>HTML Basics</h1>
            <p>HTML (HyperText Markup Language) is the standard markup language used to create and structure web pages.</p>
            <ul>
                <li>It defines the layout of a webpage using elements and tags, allowing for the display of text, images, links, and multimedia content.</li>
                <li>As the foundation of nearly all websites, HTML is used in over 95% of all web pages today, making it an essential part of modern web development.</li>
            </ul>
            <p>In this guide, we learn the basics of HTML, which includes HTML tags ( &lt;h1&gt;, &lt;p&gt;, &lt;img&gt;, etc), attributes, elements, 
              and document structure which collectively form a working web page.</p>
            <h1>HTML Basic Document and Structure</h1>
            <p>Every HTML document begins with a document type declaration, setting the foundation for the webpage. 
              This section introduces basic HTML tags that structure the page, such as &lt;head&gt;, &lt;body&gt;, and &lt;title&gt;. Although this is not mandatory, it is a good convention to start the document with the below-mentioned tag. </p>
            <center><img src="/images/structure_html.webp"/></center>
            <p>Below mentioned are the basic HTML tags that divide the whole page into various parts like head, body, etc. </p>
             <ul>
                <li>&lt;html&gt; -- Encloses the entire HTML document, serving as the root element for all HTML content.</li>
                <li>&lt;head&gt; -- Contains header information about the webpage, including title, meta tags, and linked stylesheets. 
                  It is part of the document's structure but is not displayed on the webpage.</li>
                <li>&lt;title&gt; -- Used within the &lt;head&gt;section to define the title of the HTML document. It appears in the browser tab or window and provides a brief description of the webpage's content.</li>
                <li>&lt;body&gt; -- Encloses the visible content of the webpage, such as text, images, audio, videos, and links. All elements within this tag are displayed on the actual webpage when viewed in a browser.</li>
            </ul>
            <h2>Example:</h2>
             <MonacoEditorSection initialCode={initialCode} onCodeChange={setCode1} />
            <h3>Output Preview</h3>
            <Preview code={code1} />
             <h2>HTML Headings</h2>
            <p>The HTML heading tags are used to create headings for the content of a webpage. 
              These tags are typically placed inside the body tag. HTML offers six heading tags, 
              from &lt;h1&gt; to &lt;/h6&gt;, each displaying the heading in a different font size.</p>
            <h3>Syntax:</h3>
            <div className="syntax">
              <p>{'<h1></h1>'}</p>
              <p>{'<h2></h2>'}</p>
              <p>{'<h3></h3>'}</p>
              <p>{'<h4></h4>'}</p>
              <p>{'<h5></h5>'}</p>
              <p>{'<h6></h6>'}</p>
            </div>
            <h2>Example:</h2>
            <MonacoEditorSection initialCode={initialCode2} onCodeChange={setCode2} />
            <h3>Output Preview</h3>
            <Preview code={code2} />
            <h3>Code Overview:</h3>
             <ul>
              <li>This code displays six headings (&lt;h1&gt; to &lt;/h6&gt;) on the webpage, with &lt;h1&gt; 
                being the largest and most prominent and &lt;h6&gt; being the smallest.</li>
                <li>The headings are used to define text hierarchy and emphasize content based on importance.</li>
             </ul>
             <h2>HTML Paragraph and Break Elements</h2>
             <p>HTML &lt;p&gt; tags are used to write paragraph statements on a webpage. 
              They start with the &lt;p&gt; tag and end with &lt;/p&gt;. 
              The HTML &lt;br&gt; tag is used to insert a single line break and does not require a closing tag. 
              In HTML, the break tag is written as &lt;br&gt;.</p>
              <h3>Syntax:</h3>
              <div className="syntax">
                <p>// for paragraph</p>
                <p>&lt;p&gt; Content... &lt;/p&gt;</p>
                <p>// for Break</p>
                <p>&lt;br&gt;</p>
              </div>
              <h3>Example:</h3>
               <MonacoEditorSection initialCode={initialCode3} onCodeChange={setCode3} />
               <h3>Output Preview</h3>
               <Preview code={code3} />
               <h3>Code Overview:</h3>
             <ul>
              <li>This HTML code uses a  &lt;p&gt; tag to display a paragraph of text, providing an overview of what HTML is and its purpose.</li>
              <li>The &lt;br&gt;tags are used to insert line breaks, making the text more readable by separating each sentence onto a new line within the paragraph.</li>
             </ul>
             <h2>HTML Horizontal Line</h2>
             <p>The HTML &lt;hr&gt; tag is used to divide a page into sections by creating a horizontal line that spans
               from the left to the right side of the page. This is an empty tag and does not require a closing tag 
               or any additional attributes.</p>
               <h3>Syntax:</h3>
               <div className="syntax">
                <p>&lt;hr&gt;</p>
               </div>
                <h3>Example:</h3>
               <MonacoEditorSection initialCode={initialCode4} onCodeChange={setCode4} />
               <h3>Output Preview</h3>
               <Preview code={code4} />
               <h2>HTML Comments</h2>
             <p>HTML comments are annotations in your code that are not displayed in the browser. 
              They are enclosed within &lt;!-- and --&gt; tags and are primarily used for documentation, 
              explanation, or temporarily disabling code during debugging.</p>
              <h3>Syntax of HTML Comments</h3>
              <ul>
                <li>Single-line comment:</li>
              </ul>
              <div className="syntax">
                <p>&lt;!-- This is a single-line comment --&gt;</p>
              </div>
              <ul>
                <li>Multi-line comment:</li>
              </ul>
              <div className="syntax">
                <p>&lt;!-- This is a multi-line comment <br></br>spanning multiple lines <br></br>--&gt;</p>
              </div>
               <h2>Example:</h2>
             <MonacoEditorSection language="html" initialCode={initialCode5} onCodeChange={setCode5} />
            <h3>Output Preview</h3>
            <Preview code={code5} />
            <h2>HTML Images</h2>
             <p>The &lt;img&gt; tag is used to insert an image into a webpage. 
              The source of the image is specified within the src attribute, 
              like this: &lt;img src="source_of_image"&gt;.</p>
              <h3>Syntax</h3>
              <div className="syntax">
                <p>&lt;img src="fruits.png"&gt;</p>
              </div>
              <ul>
                <li>This HTML code uses the &lt;img&gt; tag to display an image on a webpage.</li>
                <li>The src attribute specifies the URL of the image, 
                  which is loaded and displayed when the page is rendered in the browser.</li>
              </ul>
              <h2>Conclusion</h2>
              <p>Understanding HTML is the first step in becoming a web developer. 
                By learning the basic tags and structure, you can create well-organized and functional web pages. 
                The more you practice and experiment with HTML, 
                the better you'll understand how to create interactive, engaging, and well-optimized websites.</p>
              <div className="nav-buttons">
                   <button onClick={()=>showContent("introduction")}>PREVIOUS</button>
                   <button onClick={()=>showContent("editors")}>NEXT</button>
              </div>
    </div>
  );
};

export default Basics
