import { useCallback, useEffect, useState } from "react";
import { LuArrowUp } from "react-icons/lu";
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
          <p className="mono small faint">
            © {new Date().getFullYear()} {profile.name} · Built with React, Vite & Framer Motion
          </p>
          <button className="link-btn mono small" onClick={() => scrollToId("top")}>
            back to top <LuArrowUp size={13} />
          </button>
        </div>
      </footer>

      <CommandPalette open={paletteOpen} onClose={() => setPaletteOpen(false)} onToggleTheme={toggleTheme} toast={showToast} />
      {toastNode}
    </>
  );
}
