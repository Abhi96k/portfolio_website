import { useEffect, useState } from "react";
import { motion, useScroll, useSpring, AnimatePresence } from "framer-motion";
import { LuSun, LuMoon, LuCommand, LuMenu, LuX, LuArrowUpRight } from "react-icons/lu";
import { profile } from "../data";
import { scrollToId } from "./ui";

export const NAV_LINKS = [
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "credentials", label: "Credentials" },
  { id: "contact", label: "Contact" },
];

export default function Nav({ active, theme, onToggleTheme, onOpenPalette }) {
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 30, restDelta: 0.001 });
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const isMac = typeof navigator !== "undefined" && /Mac|iPhone|iPad/.test(navigator.platform);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  const go = (id) => { setOpen(false); scrollToId(id); };

  return (
    <>
      <motion.div className="progress" style={{ scaleX: progress }} aria-hidden="true" />
      <header className={`nav ${scrolled ? "nav-scrolled" : ""}`}>
        <div className="container nav-inner">
          <a href="#top" className="logo" onClick={(e) => { e.preventDefault(); go("top"); }} aria-label="Back to top">
            <span className="logo-mark">an</span>
            <span className="logo-text">abhishek<span className="accent">.</span>nangare</span>
          </a>

          <nav className="nav-links" aria-label="Primary">
            {NAV_LINKS.map((l) => (
              <a
                key={l.id}
                href={`#${l.id}`}
                className={`nav-link ${active === l.id ? "is-active" : ""}`}
                onClick={(e) => { e.preventDefault(); go(l.id); }}
              >
                {active === l.id && <motion.span layoutId="nav-pill" className="nav-pill" transition={{ type: "spring", stiffness: 380, damping: 32 }} />}
                <span className="nav-link-text">{l.label}</span>
              </a>
            ))}
          </nav>

          <div className="nav-actions">
            <button className="kbd-btn" onClick={onOpenPalette} aria-label="Open command palette">
              <LuCommand size={14} />
              <span className="kbd-hint">{isMac ? "⌘K" : "Ctrl K"}</span>
            </button>
            <button className="icon-btn" onClick={onToggleTheme} aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}>
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={theme}
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  style={{ display: "inline-flex" }}
                >
                  {theme === "dark" ? <LuSun size={16} /> : <LuMoon size={16} />}
                </motion.span>
              </AnimatePresence>
            </button>
            <a className="btn btn-sm btn-primary hide-sm" href={profile.resume} target="_blank" rel="noreferrer">
              Resume <LuArrowUpRight size={14} />
            </a>
            <button className="icon-btn show-sm" onClick={() => setOpen((o) => !o)} aria-label="Menu" aria-expanded={open}>
              {open ? <LuX size={18} /> : <LuMenu size={18} />}
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="mobile-menu"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
          >
            {NAV_LINKS.map((l, i) => (
              <motion.a
                key={l.id}
                href={`#${l.id}`}
                onClick={(e) => { e.preventDefault(); go(l.id); }}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.03 * i }}
                className={active === l.id ? "is-active" : ""}
              >
                <span className="mono faint">0{i + 1}</span> {l.label}
              </motion.a>
            ))}
            <a className="btn btn-primary" href={profile.resume} target="_blank" rel="noreferrer">
              View résumé <LuArrowUpRight size={14} />
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
