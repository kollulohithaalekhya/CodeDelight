import React from "react";
import { Link } from "react-router-dom";
import "../styles/Compiler.css";
import Header from "../components/HeaderSection";
import Footer from "../components/FooterSection";

function Compiler() {
  const compilerList = [
    {
      id: 1,
      icon: "fa-solid fa-code",
      title: "CODING",
      description: "Start Coding with Confidence",
      link: "code-compiler",
    },
    {
      id: 2,
      icon: "fa-solid fa-laptop-code",
      title: "DEVELOPMENT",
      description: "Build the structure of the web",
      link: "web-compiler",
    },
  ];

  return (
    <>
      <Header />

      <section className="compiler-ui-section">
        <h2 className="compiler-ui-heading">Explore Our Compilers</h2>

        <div className="compiler-ui-wrapper">
          <div className="compiler-ui-container">
            {compilerList.map((compiler) => (
              <div className="compiler-ui-card" key={compiler.id}>
                <i className={compiler.icon}></i>
                <h3>{compiler.title}</h3>
                <p>{compiler.description}</p>
                <Link to={compiler.link}>Open Compiler</Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}

export default Compiler;
