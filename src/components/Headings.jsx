import react, { useState } from "react";
import MonacoEditorSection from "./MonacoEditorSection";
import Preview from "./Preview";
const Headings = ({showContent})=>
{
    const initialCode = `
    <!DOCTYPE html>
<html>
<body>
<h1>Heading 1</h1>
<h2>Heading 2</h2>
<h3>Heading 3</h3>
<h4>Heading 4</h4>
<h5>Heading 5</h5>
<h6>Heading 6</h6>
</body>
</html>
    `
     const [code1, setCode1] = useState(initialCode);
     return(
        <div className="content-section">
             <h1>HTML Headings</h1>
        <p>
          <b>HTML headings</b> are used to define the titles and subtitles of sections on a webpage. 
          They help organize 
          the content and create a structure that is easy to navigate.
        </p>
        <ul>
          <li>Proper use of headings enhances readability by 
            organizing content into clear sections.</li>
          <li>Search engines utilize headings to understand page structure,
            aiding in SEO.</li>
        </ul>
        <MonacoEditorSection initialCode={initialCode} onCodeChange={setCode1} />
        <h3>Output Preview</h3>
        <Preview code={code1} />
        <h3>Code Overview:</h3>
             <ul>
              <li>This code displays six headings (&lt;h1&gt; to &lt;/h6&gt;) on the webpage, with &lt;h1&gt; 
                being the largest and most prominent and &lt;h6&gt; being the smallest.</li>
                <li>Each tag shoes the hierarchy of the content, helping organize the structure of the webpage.</li>
             </ul>
              <p><b>Note:</b>the 'h' inside the tag should always be in lowercase.</p>
              <h2>Levels of HTML Heading Tags</h2>
              <p>HTML offers <b>six levels of heading tags,</b> each serving a different purpose in structuring your content:</p>
              <center><img src="/images/header.png"/></center>
              <div>
                <h2>&lt;h1&gt; -  Main Heading (Largest)</h2>
                <ul>
                  <li>Represents the primary focus of the page,
                     usually used for the main title.</li>
                  <li>Use only one &lt;h1&gt; tag per page for the best SEO practices.</li>
                  <li>Makes it clear to both users and search engines what the main topic is.</li>
                </ul>
              </div>
              <div>
                <h2>&lt;h2&gt; - Subheadings</h2>
                <ul>
                  <li>deal for dividing the content into major sections.</li>
                  <li>If the content has further subsections, use &lt;h3&gt; to create a logical flow.</li>
                  <li>Makes it clear to both users and search engines what the main topic is.</li>
                </ul>
              </div>
              <div>
                <h2>&lt;h3&gt; to &lt;h6&gt; - Smaller Headings</h2>
                <ul>
                  <li>These heading levels are used for finer subdivisions, gradually decreasing in size and importance.</li>
                  <li>&lt;h3&gt; is used for subsections under &lt;h2&gt;, while &lt;h4&gt; to &lt;h6&gt; are used for additional, less important subdivisions.</li>
                  <li>&lt;h6&gt; defines the least important heading.</li>
                </ul>
              </div>
              <h2>Best Practices for Using HTML Headings</h2>
              <ul>
                <li><b>Use Only One &lt;h1&gt; per Page:</b> &lt;h1&gt; tag should be reserved for the main title of the page. Too many  &lt;h1&gt; tags can confuse both users 
                  and search engines about the content’s priority.</li>
                <li><b>Maintain a Logical Structure:</b> Follow a logical hierarchy of headings (&lt;h1&gt; → &lt;h2&gt; → &lt;h3&gt;) to ensure content is organized. 
                  Don't jump directly from &lt;h1&gt; to &lt;h4&gt;,
                   as it can make the content harder to navigate.</li>
                  <li><b>Keep Headings Descriptive:</b> Headings should clearly describe the content that follows. This makes it easier for 
                    readers to understand what each section is about.</li>
                  <li><b>Avoid Overusing Heading Tags:</b> Headings are for organizing content, not for styling text. Use them where appropriate and avoid using 
                    heading tags for emphasis or styling alone.</li>
              </ul>
             <div class="nav-buttons">
        <button onClick={() => showContent("editors")}>PREVIOUS</button>
        <button onClick={() => showContent("attributes")}>NEXT</button>
      </div>
        </div>
     );
}
export default Headings;