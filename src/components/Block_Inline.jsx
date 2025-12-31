import React, { useState } from "react";
import MonacoEditorSection from "./MonacoEditorSection";
import Preview from "./Preview";
const Block_Inline = ({showContent})=>{
    const initialCode = `
    <!DOCTYPE html>
<html>
  <body>
    <div>Welcome</div>
    Hello
    <a href="https://www.youtube.com" title="YouTube official channel">
      official
    </a>
    youtube for the videos on various courses.
  </body>
</html>
    `
    const initialCode1 = `
    <!DOCTYPE html>
<html>
<head>
    <title>Block-level Element</title>
</head>
<body>
    <section>
        <h1>GeeksforGeeks</h1>
        <p>GeeksforGeeks is a science portal for geeks.</p>
    </section>
</body>
</html>
    `
    const initialCode2=`
    <!DOCTYPE html>
<html>
<head>
    <title>HTML span element</title>
    <style>
        h1 {
            color: green;
        }
        span {
            color: black;
        }
    </style>
</head>
<body>
    <h1>
        Hello <span>World</span>
    </h1>
</body>
</html>
    `
    const [code1, setCode1] = useState(initialCode);
    const [code2, setCode2] = useState(initialCode1);
    const [code3, setCode3] = useState(initialCode2);
       return(
          <div className="content-section">
              <h1>HTML Block and Inline Elements</h1>
            <p>HTML elements are either block-level, which structure the layout and 
              span full width (like &lt;div&gt; or &lt;p&gt;), or inline, which styles content within blocks 
                without breaking the flow (like &lt;span&gt; or &lt;a&gt;). 
              This distinction covers 80–90% of common HTML usage.</p>
              {/* <center><img src="../images/block.webp"></center> */}
              <p><b>Example: </b>Here, we illustrate the use of the block-level element(Div) 
                and the inline element(&lt;a&gt;).</p>
              <MonacoEditorSection initialCode={initialCode} onCodeChange={setCode1} />
              <h3>Output Preview</h3>
            <Preview code={code1} />
             <h3>Code Overview:</h3>
             <p>In the above example, we have used the &lt;div&gt; tag that always starts 
              in a new line & captures the full width available. and We have used the inline element anchor tag &lt;a&gt; that is used to provide a link to a text that doesn't start in a new line 
              & captures only the space around the element.</p>
              <h2>HTML Block Elements</h2>
              <p>A block-level element always starts on a new line and
                 stretches out to the left and right as far as it can i.e, it occupies the whole horizontal space of its parent element 
                & the height is equal to the content's height.</p>
                <ul>
                  <li> &lt;address&gt;</li>
                  <li> &lt;dd&gt;</li>
                  <li> &lt;div&gt;</li>
                  <li> &lt;form&gt;</li>
                  <li> &lt;hr&gt;</li>
                  <li> &lt;li&gt;</li>
                  <li> &lt;main&gt;</li>
                  <li> &lt;nav&gt;</li>
                  <li> &lt;noscript&gt;</li>
                  <li> &lt;ol&gt;</li>
                  <li> &lt;figcaption&gt;</li>
                  <li> &lt;header&gt;</li>
                  <li> &lt;footer&gt;</li>
                </ul>
                <h3>div element:</h3>
                <p>The &lt;div&gt; element is used as a container for other HTML elements. It has no required attributes. 
                  Style, class, and id are the commonly used attributes.</p>
                <h3>Syntax:</h3>
                <div class="syntax">
                   &lt;div&gt;HelloWorld&lt;/div&gt;
                </div>
                <p><b>Example: </b>The below code illustrates the implementation of &lt;div&gt;tag. </p>
                <MonacoEditorSection initialCode={initialCode1} onCodeChange={setCode2} />
              <h3>Output Preview</h3>
            <Preview code={code2} />
            <h2>Inline Elements</h2>
             <p>An inline element is the opposite of the block-level element. 
              It does not start on a new line and takes up only the necessary width ie., 
              it only occupies the space bounded by the tags defining the HTML element,
              instead of breaking the flow of the content. </p>
              <ul>
                 <li> &lt;br&gt;</li>
                  <li> &lt;button&gt;</li>
                  <li> &lt;time&gt;</li>
                  <li> &lt;tt&gt;</li>
                  <li> &lt;a&gt;</li>
                  <li> &lt;abbr&gt;</li>
                  <li> &lt;b&gt;</li>
                  <li> &lt;code&gt;</li>
                  <li> &lt;cite&gt;</li>
                  <li> &lt;sub&gt;</li>
                  <li> &lt;sup&gt;</li>
                  <li> &lt;input&gt;</li>
                  <li> &lt;textarea&gt;</li>
              </ul>
              <h3>span element:</h3>
              <p>The &lt;span&gt; tag is used as a container for text. It has no required attributes. 
                Style, class, and id are the commonly used attributes.</p>
              <h3>Syntax:</h3>
              <div class="syntax">
                &lt;span&gt;HelloWorld&lt;/span&gt;
              </div>
              <p><b>Example:</b> The below code illustrates the implementation of &lt;span&gt; tag. </p>
              <MonacoEditorSection initialCode={initialCode2} onCodeChange={setCode3} />
              <h3>Output Preview</h3>
            <Preview code={code3} />
             <div class="nav-buttons">
                   <button onClick={()=>showContent("attributes")}>PREVIOUS</button>
                   <button onClick={()=>showContent("headings")}>NEXT</button>
              </div>
          </div>
       );
}
export default Block_Inline;