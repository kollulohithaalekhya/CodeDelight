import react, { useState } from "react";
import MonacoEditorSection from "./MonacoEditorSection";
import Preview from "./Preview";
const Attributes=({showContent})=>{
   const initialCode =`
   <!DOCTYPE html>
<html>
<head>
    <title>HTML img src Attribute</title>
</head>
<body>
    <img src=
"https://m.media-amazon.com/images/I/81OXEQrFPTL._UF1000,1000_QL80_.jpg">
</body>
</html>
   `
   const initialCode1 =`
   <!DOCTYPE html>
<html>
<head>
    <title>HTML img alt Attribute</title>
</head>
<body>
    <img src=
"https://m.media-amazon.com/images/I/81OXEQrFPTL._UF1000,1000_QL80_.jpg" 
         alt="The Logo"><br>
    <img src="" 
         alt="Since the src value is blank,the alt value is displayed">
</body>
</html>
   `
     const [code1, setCode1] = useState(initialCode);
     const [code2, setCode2] = useState(initialCode1);
    return(
       <div className="content-section">
           <h1>HTML Attributes</h1>
            <p><b>HTML Attributes</b> are special words <b>used within the opening tag of an HTML element. </b>They provide additional information 
              about HTML elements. HTML attributes are used to configure and adjust the element's behavior, appearance, 
              or functionality in a variety of ways.</p>
            <p>Each attribute has a name and a value, formatted as <b>name="value".</b> Attributes tell the browser how to render the element or how it s
              hould behave during user interactions.</p>
            <h3>Syntax:</h3>
            <div class="syntax">
              <p>&lt;tagname attribute_name = "attribute_value"&gt; content... &lt;/tagname&gt;</p>
            </div>
            <h2>Code Example of Using HTML Attributes</h2>
            <p>This HTML code demonstrates the use of the <b>src attribute</b> within the &lt;img&gt;tag to display an image.</p>
             <MonacoEditorSection initialCode={initialCode} onCodeChange={setCode1} />
            <h3>Output Preview</h3>
            <Preview code={code1} />
             <h4>In this example:</h4>
             <ul>
              <li><b>Tag:</b>&lt;img&gt;</li>
              <li><b>Attribute:</b>src</li>
              <li><b>Value of Attribute : </b>"https://m.media-amazon.com/images/I/81OXEQrFPTL._UF1000,1000_QL80_.jpg"</li>
              <li><b>Purpose:</b>The &lt;img&gt; tag is used for embedding images in an HTML page. 
                The src attribute within the &lt;img&gt; tag specifies the path to the image file you wish to display. This attribute is crucial as it directs the browser to the image’s
                 location on the internet or a local directory.</li>
             </ul>
             <h2>Components of Attribute</h2>
             <p>An HTML attribute consists of two primary components:</p>
             <p><b>1. attribute_name:</b> This is the name of the attribute, which specifies what kind of additional information or property you are defining for the element. 
              Common attribute names include href, src, class, id, etc.</p>
             <p><b>2. attribute_value: </b>The value is assigned to the attribute to define the specific setting or behavior. 
              It is always placed in quotes.</p>
              <h2>Common HTML Attributes</h2>
              <p>Let's take look at some of the most commonly used HTML attributes:</p>
              <h2>1. HTML alt Attribute</h2>
              <p>The alt attribute in HTML provides alternative text for an image if the image cannot be displayed. 
                It improves accessibility and provides context for screen readers.</p>
              <p><b>Example:</b> This example explains the HTML <b>alt Attributes</b> to specify
                 the name of the file when the image is not loaded properly.</p>
               <MonacoEditorSection initialCode={initialCode1} onCodeChange={setCode2} />
               <h3>Output Preview</h3>
               <Preview code={code2} />
       </div>
    );
}
export default Attributes