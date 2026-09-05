import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import CoursePage from "./pages/CoursePage";
import HTMLCourse from "./pages/HTMLCourse"
import "./styles/App.css";
import HTMLLevels from "./pages/HTMLLevels";
import CSSLevels from "./pages/CSSLevels";
import JSLevels from "./pages/JSLevels";
import DSALevels from "./pages/DSALevels";
// import Compiler from "./pages/Compiler";
// import InorderTraversal from "./pages/Inorder";
// import PreorderTraversal from "./pages/Preorder";
// import PostorderTraversal from "./pages/Postorder";
// import SignIn from "./pages/SignIn";
// import SignUp from "./pages/SignUp";
import Dashboard from "./components/Dashboard";
import NotFound from "./pages/NotFound"; 
import Profile from "./pages/ProfileContainer.jsx";
import CodeCompiler from "./pages/CompilerGeneral"
import WebCompiler from "./pages/WebCompiler"
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/course" element={<CoursePage />} />
        <Route path="/html-levels" element={<HTMLLevels />} />
        <Route path="/html-course" element={<HTMLCourse/>}></Route>
        <Route path="/css-levels" element={<CSSLevels />} />
        <Route path="/js-levels" element={<JSLevels />} />
        <Route path="/dsa-levels" element={<DSALevels />} />
        {/* <Route path="/compiler" element={<Compiler />} /> */}
        <Route path="/dashboard" element={<Dashboard />} />
        {/* <Route path="/traversals/inorder" element={<InorderTraversal />} />
        <Route path="/traversals/preorder" element={<PreorderTraversal />} />
        <Route path="/traversals/postorder" element={<PostorderTraversal />} /> */}
        <Route path="/code-compiler" element={<CodeCompiler />} />
        <Route path="/web-compiler" element={<WebCompiler />} />
        {/* <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} /> */}
        <Route path="/profile" element={<Profile />} />
        <Route path="*" element={<NotFound />} />
        {/*  testing git */}
      </Routes>
    </Router>
  );
}
export default App;