import React, { useState } from "react";
import MonacoEditorSection from "./MonacoEditorSection";
import Preview from "./Preview";
const Lists = ({showContent})=>{
const initialCode = `
<!DOCTYPE html>
<html>
<head>
    <title>HTML Lists</title>
</head>
<body>
    <h5>List of available courses</h5>
    <ul>
        <li>Data Structures and Algorithm</li>
        <li>Web Technology</li>
    </ul>
    <h5>Data Structures topics</h5>
    <ol>
        <li>Array</li>
        <li>Linked List</li>
        <li>Stacks</li>
    </ol>
</body>
</html>
`
const [code1, setCode1] = useState(initialCode);
   return(
    <div className="content-section">
       <h1>HTML Lists</h1>
<p>An HTML List allows you to organize data on web pages into an ordered or 
  unordered format to make the information easier to read and visually appealing. 
  HTML Lists are very helpful for creating structured, 
  accessible content in web development.</p>
<h1>Types of HTML Lists</h1>
<p>There are three main types of lists in HTML:</p>
<ol>
  <li>Unordered Lists (&lt;ul&gt;): These lists are used for items that do not need to be in any specific order.
     The list items are typically marked with bullets.</li>
  <li>Ordered Lists (&lt;ol&gt;): These lists are used when the order of the items is important.
    Each item in an ordered list is 
    typically marked with numbers or letters.</li>
  <li>Description Lists (&lt;dl&gt;): These lists are used to contain terms and 
    their corresponding descriptions.</li>
  <h2>Basic Example of HTML Lists</h2>
</ol>
 <MonacoEditorSection initialCode={initialCode} onCodeChange={setCode1} />
              <h3>Output Preview</h3>
            <Preview code={code1} />
            <div class="scroll-wrapper">
  <table border="1">
  <thead>
    <tr>
      <th>Tag</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>&lt;ul&gt;</td>
      <td>Defines an unordered list.</td>
    </tr>
    <tr>
      <td>&lt;ol&gt;</td>
      <td>Defines an ordered list.</td>
    </tr>
    <tr>
      <td>&lt;li&gt;</td>
      <td>Defines a list item.</td>
    </tr>
    <tr>
      <td>&lt;dl&gt;</td>
      <td>Defines a description list.</td>
    </tr>
    <tr>
      <td>&lt;dt&gt;</td>
      <td>Defines a term in a description list.</td>
    </tr>
    <tr>
      <td>&lt;dd&gt;</td>
      <td>Details the term in a description list.</td>
    </tr>
  </tbody>
</table>
</div>
<div className="syntax">
  <p>
    &lt;ul&gt;<br />
    &lt;li&gt;Item 1&lt;/li&gt;<br />
    &lt;li&gt;Item 2&lt;/li&gt;<br />
    &lt;li&gt;Item 3&lt;/li&gt;<br />
    &lt;/ul&gt;
  </p>
</div>
<p>Attribute: This tag contains two attributes which are listed below: </p>
<ul>
  <li>compact: It will render the list smaller.</li>
  <li>type: It specifies which kind of marker is used in the list.</li>
</ul>
<h2>2. Using HTML Ordered List</h2>
<p>Ordered lists are used when the items need to follow a specific sequence.</p>
<p>In an ordered list, all list items are marked with numbers by default. An ordered list starts with the &lt;ol&gt; tag, and 
  each list item begins with the &lt;li&gt; tag.</p>
<h3>Syntax:</h3>
<div class="syntax">
  <p>&lt;ol&gt;<br />
   &lt;li&gt;Item1&lt;/li&gt;<br />
   &lt;li&gt;Item2&lt;/li&gt;<br />
   &lt;li&gt;Item3&lt;/li&gt;<br />
&lt;/ol&gt;
</p>
</div>
<h3>Attributes:</h3>
<ul>
  <li>compact: It defines the list should be compacted 
    (compact attribute is not supported in HTML5. Use CSS instead.).</li>
  <li>reversed: It defines that the order will be descending.</li>
  <li>start: It defines from which number or alphabet the order will start.</li>
  <li>type: It defines which type(1, A, a, I, and i) of the order you want in your list of numeric, alphabetic, or roman numbers.</li>
</ul>
<h2>3. Using HTML Description List</h2>
<p>A description list is a list of terms, with a description of each term. Description lists are less common but very useful for definitions, glossaries, 
  or any other key-value pairs of items.</p>
<p>The &lt;dl&gt; tag defines the description list, the &lt;dt&gt; tag defines the term name, and the &lt;dd&gt; tag describes each term.</p>
<h3>Syntax:</h3>
<div class="syntax">
  <p>
  &lt;dl&gt;<br />
    &lt;dt&gt;Item 1&lt;/dt&gt;<br />
    &lt;dd&gt;Description of Item 1&lt;/dd&gt;<br />
    &lt;dt&gt;Item 2&lt;/dt&gt;<br />
    &lt;dd&gt;Description of Item 2&lt;/dd&gt;<br />
&lt;/dl&gt;
</p>
</div>
<p>Here, &lt;dt&gt; (description term) is used for the term being defined, and &lt;dd&gt;(description details) is used for the description.</p>
 <div class="nav-buttons">
                   <button onClick={()=>showContent("textformatting")}>PREVIOUS</button>
                   <button onClick={()=>showContent("types")}>NEXT</button>
              </div>
    </div>
   );
}
export default Lists;