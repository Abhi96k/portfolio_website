import { useCallback, useEffect, useState } from "react";
import { LuArrowUp, LuMail } from "react-icons/lu";
import { SiGithub, SiLeetcode } from "react-icons/si";
import { FaLinkedinIn } from "react-icons/fa6";
import Nav, { NAV_LINKS } from "./components/Nav";
import Hero from "./components/Hero";
import About from "./components/About";
import Experience from "./components/Experience";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Credentials from "./components/Credentials";
import Contact from "./components/Contact";
import CommandPalette from "./components/CommandPalette";
import { useActiveSection, useTheme, useToast, scrollToId } from "./components/ui";
import { profile } from "./data";

const SECTION_IDS = ["top", ...NAV_LINKS.map((l) => l.id)];

export default function App() {
  const [theme, toggleTheme] = useTheme();
  const active = useActiveSection(SECTION_IDS);
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [toastNode, toast] = useToast();
  const showToast = useCallback((m) => toast(m), []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    const onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setPaletteOpen((o) => !o);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <a href="#about" className="skip-link">Skip to content</a>
      <Nav active={active} theme={theme} onToggleTheme={toggleTheme} onOpenPalette={() => setPaletteOpen(true)} />
      <main>
        <Hero onToggleTheme={toggleTheme} />
        <About />
        <Experience />
        <Skills />
        <Projects />
        <Credentials />
        <Contact toast={showToast} />
      </main>

      <footer className="footer">
        <div className="container footer-inner">
          <div className="footer-cta">
            <p className="footer-title">Open to SDE backend and full-stack roles — let's talk.</p>
            <a className="mono small accent" href={`mailto:${profile.email}`}>{profile.email}</a>
          </div>
          <div className="footer-side">
            <div className="socials">
              <a href={profile.socials.github} target="_blank" rel="noreferrer" aria-label="GitHub"><SiGithub size={17} /></a>
              <a href={profile.socials.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn"><FaLinkedinIn size={17} /></a>
              <a href={profile.socials.leetcode} target="_blank" rel="noreferrer" aria-label="LeetCode"><SiLeetcode size={17} /></a>
              <a href={`mailto:${profile.email}`} aria-label="Email"><LuMail size={17} /></a>
            </div>
            <button className="link-btn mono small" onClick={() => scrollToId("top")}>
              back to top <LuArrowUp size={13} />
            </button>
          </div>
        </div>
        <div className="container">
          <p className="mono small faint footer-copy">
            © {new Date().getFullYear()} {profile.name} · Built with React, Vite & Framer Motion
          </p>
        </div>
      </footer>

      <CommandPalette open={paletteOpen} onClose={() => setPaletteOpen(false)} onToggleTheme={toggleTheme} toast={showToast} />
      {toastNode}
    </>
  );
}
