import React from "react";
import Hero from "./HeroSection.jsx";
import Feature from "./FeaturesSection.jsx";
import CourseSection from "./CourseSection.jsx";
import CompilerSection from "./CompilerSection.jsx";
import Reviews from "./ReviewsSection.jsx";

function Body({ setPage }) {   
  return (
    <>
      <Hero setPage={setPage} />   
      <Feature />
      <CourseSection />
      <CompilerSection />
      <Reviews />
    </>
  );
}

export default Body;
