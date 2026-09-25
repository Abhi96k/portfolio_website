import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LuArrowUpRight, LuSearch, LuX, LuStar, LuExternalLink } from "react-icons/lu";
import { SiGithub } from "react-icons/si";
import { projects, projectFilters, profile } from "../data";
import { Section, Reveal } from "./ui";
import { TechIcon } from "./icons";

const catLabel = Object.fromEntries(projectFilters.map((f) => [f.id, f.label]));

function repoName(url) {
  return url ? url.replace(/\/$/, "").split("/").pop() : "";
}

function Cover({ p, big = false }) {
  return (
    <div className={`cover cover-${p.category} ${big ? "cover-big" : ""}`} aria-hidden="true">
      <div className="cover-grid" />
      <div className="cover-icon"><TechIcon name={p.icon} size={big ? 44 : 34} /></div>
      <span className="cover-path mono">~/{repoName(p.github)}</span>
      {p.featured && <span className="cover-badge mono"><LuStar size={11} /> featured</span>}
    </div>
  );
}

function ProjectCard({ p, onOpen }) {
  const onMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--cx", `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty("--cy", `${e.clientY - r.top}px`);
  };
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className="pcard"
      onMouseMove={onMove}
    >
      <button className="pcard-hit" onClick={() => onOpen(p)} aria-label={`Open details for ${p.title}`} />
      <Cover p={p} />
      <div className="pcard-body">
        <div className="pcard-meta mono small">
          <span className="accent">{catLabel[p.category]}</span>
          <span className="faint">{p.year}</span>
        </div>
        <h3 className="pcard-title">{p.title}</h3>
        <p className="pcard-summary">{p.summary}</p>
        <div className="chips">
          {p.stack.map((s) => <span key={s} className="chip chip-sm">{s}</span>)}
        </div>
        <div className="pcard-links">
          {p.github && (
            <a href={p.github} target="_blank" rel="noreferrer" className="plink">
              <SiGithub size={14} /> Code
            </a>
          )}
          {p.live && (
            <a href={p.live} target="_blank" rel="noreferrer" className="plink">
              <LuExternalLink size={14} /> Live
            </a>
          )}
          <span className="plink plink-more">Details <LuArrowUpRight size={14} /></span>
        </div>
      </div>
    </motion.article>
  );
}

function ProjectModal({ p, onClose }) {
  const closeRef = useRef(null);
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => { window.removeEventListener("keydown", onKey); document.body.style.overflow = ""; };
  }, [onClose]);

  return (
    <motion.div className="modal-backdrop" onClick={onClose}
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <motion.div
        className="modal" role="dialog" aria-modal="true" aria-labelledby="pm-title"
        onClick={(e) => e.stopPropagation()}
        initial={{ opacity: 0, y: 30, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.98 }} transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      >
        <button ref={closeRef} className="icon-btn modal-close" onClick={onClose} aria-label="Close"><LuX size={18} /></button>
        <Cover p={p} big />
        <div className="modal-body">
          <div className="pcard-meta mono small">
            <span className="accent">{catLabel[p.category]}</span><span className="faint">{p.year}</span>
          </div>
          <h3 id="pm-title" className="modal-title">{p.title}</h3>
          <p className="muted">{p.summary}</p>
          <p className="mono small faint modal-sub">highlights</p>
          <ul className="role-points">
            {p.highlights.map((h) => <li key={h}>{h}</li>)}
          </ul>
          <p className="mono small faint modal-sub">stack</p>
          <div className="chips">{p.stack.map((s) => <span key={s} className="chip">{s}</span>)}</div>
          <div className="modal-actions">
            {p.github && <a className="btn btn-primary" href={p.github} target="_blank" rel="noreferrer"><SiGithub size={15} /> View source</a>}
            {p.live && <a className="btn btn-ghost" href={p.live} target="_blank" rel="noreferrer">Live demo <LuArrowUpRight size={15} /></a>}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Projects() {
  const [filter, setFilter] = useState("all");
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(null);

  useEffect(() => {
    const onOpen = (e) => {
      const p = projects.find((x) => x.id === e.detail);
      if (p) setOpen(p);
    };
    window.addEventListener("open-project", onOpen);
    return () => window.removeEventListener("open-project", onOpen);
  }, []);

  const list = useMemo(() => {
    const term = q.trim().toLowerCase();
    return projects.filter((p) =>
      (filter === "all" || p.category === filter) &&
      (!term || [p.title, p.summary, ...p.stack].join(" ").toLowerCase().includes(term))
    );
  }, [filter, q]);

  const counts = useMemo(() => Object.fromEntries(projectFilters.map((f) => [
    f.id, f.id === "all" ? projects.length : projects.filter((p) => p.category === f.id).length,
  ])), []);

  return (
    <Section id="projects" index="04" label="projects" title="Things I've built."
      intro="Selected side projects where I explore queues, observability, cloud deployment and real-time systems. Click any card for details.">
      <Reveal className="proj-toolbar">
        <div className="tabs" role="tablist" aria-label="Filter projects">
          {projectFilters.filter((f) => counts[f.id] > 0).map((f) => (
            <button key={f.id} role="tab" aria-selected={filter === f.id}
              className={`tab ${filter === f.id ? "is-active" : ""}`} onClick={() => setFilter(f.id)}>
              {filter === f.id && <motion.span layoutId="proj-tab" className="tab-pill" transition={{ type: "spring", stiffness: 400, damping: 34 }} />}
              <span className="tab-text">{f.label} <span className="tab-count mono">{counts[f.id]}</span></span>
            </button>
          ))}
        </div>
        <label className="search">
          <LuSearch size={15} className="faint" />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search by tech — e.g. Redis, AWS…" aria-label="Search projects" />
          {q && <button className="search-clear" onClick={() => setQ("")} aria-label="Clear search"><LuX size={14} /></button>}
        </label>
      </Reveal>

      <motion.div layout className="proj-grid">
        <AnimatePresence mode="popLayout">
          {list.map((p) => <ProjectCard key={p.id} p={p} onOpen={setOpen} />)}
        </AnimatePresence>
      </motion.div>
      {list.length === 0 && (
        <p className="empty mono">No projects match “{q}”. <button className="link-btn" onClick={() => { setQ(""); setFilter("all"); }}>Reset filters</button></p>
      )}

      <Reveal className="proj-more">
        <a href={`${profile.socials.github}?tab=repositories`} target="_blank" rel="noreferrer" className="btn btn-ghost">
          <SiGithub size={15} /> More on GitHub <LuArrowUpRight size={15} />
        </a>
      </Reveal>

      <AnimatePresence>{open && <ProjectModal p={open} onClose={() => setOpen(null)} />}</AnimatePresence>
    </Section>
  );
}
