import React from "react";
// import MonacoEditorSection from "./MonacoEditorSection";
// import Preview from "./Preview";
// import note_edit from "./assets/note_edit.png";
// import step_2 from "./assets/step-2.png"
// import step_3 from "./assets/step-3.png"
// import step_4 from "./assets/step-4.png"
// import step_5 from "./assets/step-5.png"
// import atom_edit from "./assets/atom-edit.png";
// import brack_edit from "./assets/brack-edit.png";
// import sublime_edit from "./assets/sublime-edit.png";
// import vs_edit from "./assets/vs-edit.png";
// import vs_step from "./assets/vs_step-2.png";
const Editors=({showContent})=>{
    return(
        <div className="content-section">
            <h1>HTML Editors</h1>
             <p>An HTML Editor is a software application designed to help users create and modify HTML code. 
              It often includes features like syntax highlighting, tag completion, and error detection, 
              which facilitate the coding process.</p>
              <p>There are two main types of HTML editors:</p>
              <ol>
                <li><strong>Text-Based Editors</strong> - Allow direct coding with features like syntax 
                  highlighting and code completion for full control over the webpage structure. 
                  Example - Sublime Text, Visual Studio Code, etc.</li>
                <li><strong>WYSIWYG (What You See Is What You Get) Editors -</strong> Offer a graphical interface
                   to design web pages visually, automatically generating the corresponding HTML code. 
                   Example - Adobe Dreamweaver, etc.</li>
              </ol>
              <h2>HTML Editors List</h2>
              <p>There are various free and paid HTML editors available in the market, 
                but in this article, we will be covering some renowned free HTML editors 
                that you can use as a beginner or switch to if you are an experienced developer.</p>
                <div class="content">
                  <h3>Table of Content</h3>
                  <ul>
                      <li>1. Notepad</li>
                      <li>2. Brackets</li>
                      <li>3. Sublime Text Editor</li>
                      <li>4. Atom</li>
                      <li>5. Visual Studio Code</li>
                    </ul>
                </div>
                <h2>1. Notepad</h2>
                <p>Notepad is a simple text editor that is also used to write HTML code. 
                  It is an inbuilt desktop application available in Windows OS. </p>
                <h3>Steps to Write HTML Code in Text Editor:</h3>
                <p><strong>Step 1:</strong> Open any of the text editors of your choice. Here we are using the <strong>Notepad</strong> text editor. </p>
                <center><img src="/images/note_edit.png"/></center>
                <p><strong>Step 2:</strong> Create new file: File {'->'}New File or Ctrl+N.</p>
                <center><img src="/images/step-2.png"/></center>
                <p><strong>Step 3:</strong> Write HTML code in text editor.</p>
                <center><img src="/images/step-3.png"/></center>
                <p><strong>Step 4:</strong>Save the file with a suitable name of your choice and a .html extension. </p>
                <center><img src="/images/step-4.png"/></center>
                <p><strong>Step 5:</strong>Open the saved HTML file in your favorite browser (double-click on the file, or right-click - and choose "Open with"). </p>
                <center><img src="/images/step-5.png"/></center>
                <h2>2. Brackets</h2>
                <p>Brackets is an open-source software primarily used for Web development. 
                  It provides live HTML, CSS, and JavaScript editing functionality. 
                  Similar to the Notepad editor, create a new file and save it with a 
                  .html extension to run the HTML file.</p>
                  <center><img src="/images/brack-edit.png"/></center>
                <h2>3. Sublime Text Editor</h2>
                <p>Sublime is a cross-platform code editor tool. 
                  It supports all markup languages and is used as an editor for HTML. 
                  Similar to the Notepad editor, create a new file and save it with a 
                  .html extension to run an HTML file.
                </p>
                 <center><img src="/images/sublime-edit.png"/></center>
                 <h2>4. Atom</h2>
                 <p>Atom is an open-source code editor tool for MAC, Linux, and Windows.
                   We can use Atom to write and edit HTML code. 
                   Similar to the Notepad editor, create a new file and save it with a 
                   .html extension to run an HTML file.</p>
                  <center><img src="/images/atom-edit.png"/></center>
                 <h2>5. Visual Studio Code</h2>
                 <p>It is one of the most popular code editors of today's generation.
                   Many companies and software developers prefer this online HTML code editor.</p>
                 <p><strong>Step 1:</strong>Open the VS code Editor and Install the Live Server. 
                  By clicking the extension button simply search live server on the search bar and download.
                   Live server extension helps to run the code and display output.</p>
                    <center><img src="/images/vs-edit.png"/></center>
                  <p><strong>Step 2:</strong>Create a new File and save it with the 
                    .html extension and use the open live server button to click the right button.</p>
                    <center><img src="/images/vs_step-2.png"/></center>
                    <h2>HTML Editors Comparison</h2>
<div class="scroll-wrapper">
<table class="comparison-table">
  <thead>
    <tr>
      <th>Editor</th>
      <th>Platform</th>
      <th>Key Features</th>
      <th>Ideal For</th>
      <th>Pros</th>
      <th>Cons</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><b>Notepad</b></td>
      <td>Windows</td>
      <td>Basic text editing, lightweight</td>
      <td>Beginners</td>
      <td>Pre-installed, simple to use</td>
      <td>No advanced features like syntax highlighting or debugging</td>
    </tr>
    <tr>
      <td><b>VS Code</b></td>
      <td>Cross-Platform</td>
      <td>Live Server, Extensions, Debugging, Git Integration</td>
      <td>Professionals</td>
      <td>Highly extensible, supports multiple languages, great debugging tools</td>
      <td>Can be resource-heavy for basic tasks</td>
    </tr>
    <tr>
      <td><b>Atom</b></td>
      <td>Cross-Platform</td>
      <td>Open-source, Collaborative Editing, Customizable UI</td>
      <td>Advanced Learners</td>
      <td>Flexible and extensible, integrates well with GitHub</td>
      <td>Slower performance compared to other editors</td>
    </tr>
    <tr>
      <td><b>Brackets</b></td>
      <td>Cross-Platform</td>
      <td>Live Preview, Lightweight, Focused on Web Design</td>
      <td>Frontend Developers</td>
      <td>Real-time preview, supports web-centric workflows</td>
      <td>Discontinued updates, limited community support</td>
    </tr>
  </tbody>
</table>
</div>
          <h2>How to Choose the Right HTML Editor?</h2>
          <p>When selecting an HTML editor, consider the following factors:</p>
           <p>1. <strong>Skill level: </strong>Beginners might prefer WYSIWYG editors for ease of use, whereas advanced users may opt 
            for text-based editors for better control.</p>
            <p>2. <strong>Project needs:</strong>Larger projects might benefit from a more robust 
              editor with extensive features and integrations.</p>
            <p>3. <strong>Compatibility:</strong>Ensure the editor supports other technologies you plan 
              to use like CSS, JavaScript, or various frameworks.</p>
              <h2>Conclusion</h2>
              <p>By choosing the right editor for your needs and skill level, you can greatly enhance the efficiency and quality of your web development projects.
                Whether you’re just starting out or are a seasoned developer, 
                there’s an HTML editor out there that’s perfect for you.</p>
                <div class="nav-buttons">
                  <button onClick={()=>showContent("basics")}>PREVIOUS</button>
                   <button onClick={()=>showContent("elements")}>NEXT</button>
              </div>
        </div>
    );
}
export default Editors