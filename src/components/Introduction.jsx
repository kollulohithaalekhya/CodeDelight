// Introduction.js
import React, { useState } from "react";
// import page_struct from "./assets/page_struct.png";
// import element from "./assets/element.png";
// import web_browser from "./assets/web_browse.png";
import MonacoEditorSection from "./MonacoEditorSection";
import Preview from "./Preview";

const Introduction = ({showContent}) => {
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

  const [code, setCode] = useState(initialCode);

  return (
    <div className="content-section">
      <h1>HTML Introduction</h1>
                   <p>HTML stands for <b>Hyper Text Markup Language,</b> which is the core language used to structure content on the web. 
                    It organizes text, images, links, and media using tags and elements that browsers can interpret. 
                    As of 2025, over 95% of websites rely on HTML alongside CSS and JavaScript, making it a fundamental tool in modern web development.</p>
                    <ul>
                      <li>It is a markup language, not a programming language. 
                      This means it annotates text to define how it is structured and displayed by web browsers.</li>
                      <li>It is a static language, meaning it does not inherently provide interactive features 
                      but can be combined with CSS for styling and JavaScript for interactivity.</li>
                    </ul>
                   <h2>Basic HTML Code Example</h2>
      <MonacoEditorSection initialCode={initialCode} onCodeChange={setCode} />
      <h3>Output Preview</h3>
      <Preview code={code} />
      <h2>HTML Page Structure</h2>
             <p>The basic structure of an HTML page is shown below. It contains the essential building-block elements
               (i.e. doctype declaration, HTML, head, title, and body elements)
               upon which all web pages are created.</p>
               <center><img src="/images/page_struct.png"/></center>
               <ul>
                <li>{'<!Doctype'} - This is the document type declaration, not a tag. 
                  It declares that the document is an HTML5 document.</li>
                <li>{'<html>'} - This is called the HTML root element. 
                  All other elements are contained within it.</li>
                  <li>&lt;head&gt; - The head tag contains the "behind the scenes" elements for a webpage. Elements within the head aren't visible on the front end of a webpage. 
                   </li>
                    <li>Typical elements inside the &lt;head&gt; include:</li>
                  <ul>
                    <li>&lt;title&gt;: Defines the title displayed on the browser tab.</li>
                    <li>&lt;meta&gt;: Provides information like the character set or viewport settings.</li>
                    <li>&lt;link&gt;: Links external stylesheets or resources.</li>
                    <li>&lt;style&gt;: Embeds internal CSS styles.</li>
                    <li>&lt;script&gt;: Embeds JavaScript for functionality.</li>
                  </ul>
                  <li>&lt;title&gt; - The title is what is displayed on the top of your browser when you visit a website and contains 
                    the title of the webpage that you are viewing.</li>
                  <li>&lt;h2&gt; - The &lt;h2&gt; tag is a second-level heading tag.</li>
                  <li>&lt;p&gt; - The &lt;p&gt; tag represents a paragraph of text.</li>
                  <li>&lt;body&gt; - The body tag is used to enclose all the visible content of a webpage.
                     In other words, the body content is what the browser will show on the front end.</li>
               </ul>
               <p>An HTML document can be created using an HTML text editor. 
                Save the text file using the ".html" or ".htm" extension. Once saved as an HTML document, 
                the file can be opened as a webpage in the browser.</p>
              <h1>HTML Elements and HTML Tag</h1>
              <p>HTML Elements and HTML Tags are related but distinct. An HTML element is the 
                complete structure, including the opening tag, content 
                (if any), and the closing tag (if applicable).</p>
              <p>On the other hand, A tag is the actual keyword or name enclosed in angle brackets (&lt; &gt;) that tells 
                the browser what kind of content to expect.</p>
                <center><img src="/images/element.png"/></center>
                <div className="scroll-wrapper">
              <table border="1" >
  <thead>
    <tr>
      <th>Tag</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>&lt;html&gt;</td>
      <td>The root element of an HTML document</td>
    </tr>
    <tr>
      <td>&lt;head&gt;</td>
      <td>Contains meta-information about the webpage</td>
    </tr>
    <tr>
      <td>&lt;body&gt;</td>
      <td>Contains the visible content of the webpage</td>
    </tr>
    <tr>
      <td>&lt;h1&gt; to &lt;h6&gt;</td>
      <td>Headings of various levels (h1 being the largest)</td>
    </tr>
    <tr>
      <td>&lt;p&gt;</td>
      <td>Defines a paragraph</td>
    </tr>
    <tr>
      <td>&lt;a&gt;</td>
      <td>Defines a hyperlink</td>
    </tr>
    <tr>
      <td>&lt;img&gt;</td>
      <td>Embed an image</td>
    </tr>
    <tr>
      <td>&lt;ul&gt;</td>
      <td>Defines an unordered list</td>
    </tr>
    <tr>
      <td>&lt;ol&gt;</td>
      <td>Defines an ordered list</td>
    </tr>
    <tr>
      <td>&lt;li&gt;</td>
      <td>Defines a list item</td>
    </tr>
  </tbody>
</table>
</div>
<h2>Web Browser</h2>
<p>Unlike other programming languages, HTML does not show output on the any compiler.
   Web browsers is an compiler
   which show the results of an your HTML code.</p>
   <p>It reads HTML files and determines how to show content with the help of HTML tags. 
    Any web browser (Google, Safari, Mozilla Firefox, etc) can be used to open a .
     HTML file and view the results.</p>
     <center><img src="/images/web_browse.png"/></center>
     <h2>Why Learn HTML?</h2>
     <p>Here are 5 common reasons to learn HTML:</p>
     <ol>
      <li><b>Build Websites:</b> HTML is the basic building block for creating any website. Learning HTML can 
        help you pursue a career in web development.</li>
      <li><b>Customize Content:</b> Allows you to edit or tweak web pages, 
        emails, or templates to fit your needs.</li>
      <li><b>Understand how the web works:</b> This helps you grasp how the internet works
         and how web pages are structured.</li>
      <li><b>Employment Opportunities:</b> According to the Bureau of Labor Statistics, projects that employment 
        for web developers will grow 16% between 2022 and 2032, which is much 
        faster than the average across all occupations.</li>
      <li><b>Learn Easily:</b> HTML is beginner-friendly, making it a great first step into the world of coding and technology.</li>
     </ol>
     <h2>Applications of HTML</h2>
     <ul>
      <li><b>Web Development:</b> HTML is the backbone of every webpage. It structures the content and integrates multimedia, hyperlinks, and more.</li>
      <li><b>Web Applications:</b> HTML, in combination with CSS and JavaScript, powers complex web applications (e.g., Google Docs, Trello).</li>
      <li><b>Emails:</b> HTML emails use table-based layouts and embedded media to deliver rich, interactive content.</li>
      <li><b>Mobile App Development:</b> HTML5 is used with frameworks like PhoneGap to build mobile apps for iOS and Android.</li>
     </ul>
     <h2>Limitations of HTML</h2>
     <ul>
      <li><b>No Logic or Functionality:</b> HTML cannot handle complex logic, interactivity, or dynamic content on its own. 
        It requires JavaScript for such tasks.</li>
      <li><b>SEO Limitations:</b> While HTML provides structure, it’s not enough by itself for search engine 
        optimization (SEO). Proper metadata and content structuring, 
        as well as external SEO practices, are necessary.</li>
      <li><b>Limited Styles:</b> While HTML can handle basic styles via the style attribute, it is typically complemented by CSS for complex styling and layout.</li>
     </ul>
              <div className="nav-buttons">
                    <button onClick={()=>showContent("basics")}>NEXT</button>
              </div>
    </div>
  );
};

export default Introduction;
