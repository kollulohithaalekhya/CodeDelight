import React from "react";
import Header from "../components/HeaderSection";
import Footer from "../components/FooterSection";
import Courses from "../components/Courses";
import "../styles/CoursePage.css"
const CoursePage = () => {
  return (
    <>
    <Header/>
      <Courses />
      <Footer/>
    </>
  );
};

export default CoursePage;
