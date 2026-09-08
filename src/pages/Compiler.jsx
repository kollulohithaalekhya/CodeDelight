import React from "react";
import { Link } from "react-router-dom";
import "../styles/Compiler.css";
import Header from "../components/HeaderSection";
import Footer from "../components/FooterSection";

const COMPILERS = [
  {
    id: 1,
    icon: "fa-solid fa-terminal",
    badge: "Multi-language",
    title: "Code Compiler",
    description: "Write and run 8 languages instantly — with custom input, live output and SQL results.",
    langs: ["C", "C++", "Java", "Python", "JS", "Dart", "Verilog", "SQL"],
    link: "/compiler/code-compiler",
    accent: "cyan",
  },
  {
    id: 2,
    icon: "fa-solid fa-laptop-code",
    badge: "Live preview",
    title: "Web Compiler",
    description: "Build with HTML, CSS and JavaScript side-by-side and see your page render in real time.",
    langs: ["HTML", "CSS", "JS"],
    link: "/compiler/web-compiler",
    accent: "violet",
  },
];

const FEATURES = [
  { icon: "fa-solid fa-bolt", title: "Instant runs", text: "Execute code in seconds, right in the browser." },
  { icon: "fa-solid fa-wand-magic-sparkles", title: "Smart editor", text: "Monaco editor with highlighting & autocomplete." },
  { icon: "fa-solid fa-mobile-screen", title: "Fully responsive", text: "Code comfortably on any device." },
  { icon: "fa-solid fa-download", title: "Save your work", text: "Download your code with one click." },
];

function Compiler() {
  return (
    <>
      <Header />

      <div className="cmp-landing">
        <div className="cmp-bg" aria-hidden="true">
          <span className="cmp-orb cmp-orb-1" />
          <span className="cmp-orb cmp-orb-2" />
          <span className="cmp-grid" />
        </div>

        {/* Hero */}
        <section className="cmp-hero">
          <span className="cmp-eyebrow"><i className="fa-solid fa-code" /> In-browser compilers</span>
          <h1>Code, run &amp; build — <span className="grad">instantly</span></h1>
          <p>Two powerful playgrounds to practice programming and web development, no setup required.</p>
        </section>

        {/* Compiler cards */}
        <section className="cmp-cards">
          {COMPILERS.map((c) => (
            <Link to={c.link} className={`cmp-card accent-${c.accent}`} key={c.id}>
              <div className="cmp-card-top">
                <span className="cmp-card-icon"><i className={c.icon} /></span>
                <span className="cmp-card-badge">{c.badge}</span>
              </div>
              <h3>{c.title}</h3>
              <p>{c.description}</p>
              <div className="cmp-card-langs">
                {c.langs.map((l) => <span key={l}>{l}</span>)}
              </div>
              <span className="cmp-card-cta">Open Compiler <i className="fa-solid fa-arrow-right" /></span>
            </Link>
          ))}
        </section>

        {/* Feature strip */}
        <section className="cmp-features">
          {FEATURES.map((f) => (
            <div className="cmp-feature" key={f.title}>
              <i className={f.icon} />
              <div>
                <strong>{f.title}</strong>
                <span>{f.text}</span>
              </div>
            </div>
          ))}
        </section>
      </div>

      <Footer />
    </>
  );
}

export default Compiler;
