import { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { LuArrowRight, LuArrowUpRight, LuMapPin, LuMail } from "react-icons/lu";
import { SiGithub, SiLeetcode } from "react-icons/si";
import { FaLinkedinIn } from "react-icons/fa6";
import { profile, stats } from "../data";
import { CountUp, scrollToId } from "./ui";
import Terminal from "./Terminal";

function Rotator({ words }) {
  const [i, setI] = useState(0);
  const reduce = useReducedMotion();
  useEffect(() => {
    if (reduce) return;
    const t = setInterval(() => setI((n) => (n + 1) % words.length), 2600);
    return () => clearInterval(t);
  }, [words.length, reduce]);
  return (
    <span className="rotator" aria-live="polite">
      <AnimatePresence mode="wait">
        <motion.span
          key={words[i]}
          className="rotator-word"
          initial={{ y: 14, opacity: 0, filter: "blur(6px)" }}
          animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
          exit={{ y: -14, opacity: 0, filter: "blur(6px)" }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        >
          {words[i]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

const fade = (d) => ({
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: d },
});

export default function Hero({ onToggleTheme }) {
  const onMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
  };

  return (
    <section id="top" className="hero" onMouseMove={onMove}>
      <div className="hero-grid-bg" aria-hidden="true" />
      <div className="hero-spot" aria-hidden="true" />
      <div className="container hero-inner">
        <div className="hero-copy">
          <motion.a {...fade(0)} className="status-pill" href="#contact"
            onClick={(e) => { e.preventDefault(); scrollToId("contact"); }}>
            <span className="pulse" /> {profile.openTo}
          </motion.a>

          <motion.h1 {...fade(0.08)} className="hero-title">
            {profile.name}
          </motion.h1>

          <motion.p {...fade(0.16)} className="hero-sub">
            <span className="muted">{profile.role}</span>{" "}
            <span className="mono accent">@{profile.company.toLowerCase()}</span>
            <br />
            <span className="hero-build">I build <Rotator words={profile.rotating} /></span>
          </motion.p>

          <motion.p {...fade(0.24)} className="hero-tagline">{profile.tagline}</motion.p>

          <motion.div {...fade(0.32)} className="hero-ctas">
            <button className="btn btn-primary" onClick={() => scrollToId("projects")}>
              See my work <LuArrowRight size={16} />
            </button>
            <a className="btn btn-ghost" href={profile.resume} target="_blank" rel="noreferrer">
              Résumé <LuArrowUpRight size={16} />
            </a>
          </motion.div>

          <motion.div {...fade(0.4)} className="hero-meta">
            <span className="meta-item"><LuMapPin size={14} /> {profile.location}</span>
            <span className="meta-sep" />
            <div className="socials">
              <a href={profile.socials.github} target="_blank" rel="noreferrer" aria-label="GitHub"><SiGithub size={17} /></a>
              <a href={profile.socials.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn"><FaLinkedinIn size={17} /></a>
              <a href={profile.socials.leetcode} target="_blank" rel="noreferrer" aria-label="LeetCode"><SiLeetcode size={17} /></a>
              <a href={`mailto:${profile.email}`} aria-label="Email"><LuMail size={17} /></a>
            </div>
          </motion.div>
        </div>

        <motion.div
          className="hero-term"
          initial={{ opacity: 0, y: 24, rotateX: 8 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
        >
          <Terminal onToggleTheme={onToggleTheme} />
        </motion.div>
      </div>

      <div className="container">
        <motion.dl {...fade(0.5)} className="stats">
          {stats.map((s) => (
            <div key={s.label} className="stat">
              <dt className="stat-label">{s.label}</dt>
              <dd className="stat-value">
                <CountUp to={s.value} />
                <span className="stat-suffix">{s.suffix}</span>
              </dd>
            </div>
          ))}
        </motion.dl>
      </div>
    </section>
  );
}
