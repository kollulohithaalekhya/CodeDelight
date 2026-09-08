import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import CoursePage from "./pages/CoursePage";
import "./styles/App.css";
import HTMLLevels from "./pages/HTMLLevels";
import CSSLevels from "./pages/CSSLevels";
import JSLevels from "./pages/JSLevels";
import DSALevels from "./pages/DSALevels";
import Compiler from "./pages/Compiler";
import InorderTraversal from "./pages/Inorder";
import PreorderTraversal from "./pages/Preorder";
import PostorderTraversal from "./pages/Postorder";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Forgot from "./pages/Forgot";
import Dashboard from "./components/Dashboard";
import NotFound from "./pages/NotFound";
import Profile from "./pages/ProfileContainer.jsx";
import CodeCompiler from "./pages/CompilerGeneral";
import WebCompiler from "./pages/WebCompiler";
import CourseView from "./pages/CourseView";
import QuizLevel from "./pages/QuizLevel";
import FunZone from "./pages/FunZone";
import StackGame from "./pages/StackGame";
import SortSprint from "./pages/SortSprint";
import PracticeHome from "./pages/PracticeHome";
import ProblemList from "./pages/ProblemList";
import ProblemSolve from "./pages/ProblemSolve";
import BuildTaskList from "./pages/BuildTaskList";
import BuildTaskSolve from "./pages/BuildTaskSolve";
import ChallengeGame from "./pages/ChallengeGame";
import Settings from "./pages/Settings";
import Logout from "./components/SettingsLogout";
import RequireAuth from "./components/RequireAuth";

function App() {
  return (
    <Router>
      <Routes>
        {/* ---------- Public: landing + auth ---------- */}
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/login" element={<Navigate to="/signin" replace />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/forgot" element={<Forgot />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/homepage" element={<Navigate to="/" replace />} />

        {/* ---------- Protected: everything that needs a signed-in user ---------- */}
        <Route element={<RequireAuth />}>
          <Route path="/profile" element={<Profile />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/settings" element={<Settings />} />

          {/* Courses */}
          <Route path="/course" element={<CoursePage />} />
          <Route path="/courses" element={<Navigate to="/course" replace />} />
          <Route path="/learn/:slug" element={<CourseView />} />
          <Route path="/html-course" element={<CourseView course="html" />} />
          <Route path="/css-course" element={<CourseView course="css" />} />
          <Route path="/js-course" element={<CourseView course="js" />} />
          <Route path="/dsa-course" element={<CourseView course="dsa" />} />

          {/* Quiz levels + the quizzes themselves */}
          <Route path="/html-levels" element={<HTMLLevels />} />
          <Route path="/css-levels" element={<CSSLevels />} />
          <Route path="/js-levels" element={<JSLevels />} />
          <Route path="/dsa-levels" element={<DSALevels />} />
          <Route path="/quiz/:track/:level" element={<QuizLevel />} />
          <Route path="/quiz" element={<Navigate to="/dsa-levels" replace />} />

          {/* Compilers */}
          <Route path="/compiler" element={<Compiler />} />
          <Route path="/compilers" element={<Navigate to="/compiler" replace />} />
          <Route path="/compiler/code-compiler" element={<CodeCompiler />} />
          <Route path="/compiler/web-compiler" element={<WebCompiler />} />

          {/* Practice Arena */}
          <Route path="/practice" element={<PracticeHome />} />
          <Route path="/practice/problems" element={<ProblemList />} />
          <Route path="/practice/problem/:id" element={<ProblemSolve />} />
          <Route path="/practice/build" element={<BuildTaskList />} />
          <Route path="/practice/build/:id" element={<BuildTaskSolve />} />

          {/* Fun Zone */}
          <Route path="/funzone" element={<FunZone />} />
          <Route path="/funzone/stack-simulator" element={<StackGame />} />
          <Route path="/funzone/sort-sprint" element={<SortSprint />} />
          <Route path="/funzone/challenge/:id" element={<ChallengeGame />} />
          <Route path="/traversals/inorder" element={<InorderTraversal />} />
          <Route path="/traversals/preorder" element={<PreorderTraversal />} />
          <Route path="/traversals/postorder" element={<PostorderTraversal />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
