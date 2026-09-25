import { useEffect, useRef, useState } from "react";
import { profile, skills, projects, experience, certifications } from "../data";
import { scrollToId } from "./ui";

const PROMPT = "abhishek@portfolio:~$";

function buildCommands({ onToggleTheme }) {
  const cmds = {
    help: () => [
      "Available commands:",
      "  whoami       short intro",
      "  about        a bit more about me",
      "  experience   where I've worked",
      "  skills       tech I use",
      "  projects     things I've built",
      "  certs        certifications",
      "  contact      how to reach me",
      "  resume       open my résumé",
      "  goto <id>    scroll to a section (about, projects, …)",
      "  theme        toggle light / dark",
      "  clear        clear the screen",
    ],
    whoami: () => [
      `${profile.name} — ${profile.role} (${profile.focus}) @ ${profile.company}`,
      `📍 ${profile.location}  ·  ${profile.openTo}`,
    ],
    about: () => [profile.tagline, "", `Currently learning: ${profile.learning.join(", ")}`],
    experience: () =>
      experience.flatMap((e) => e.roles.map((r) => `${r.period.padEnd(20)} ${r.title} · ${e.company}`)),
    skills: () => skills.map((g) => `${(g.group + ":").padEnd(22)} ${g.items.map((i) => i.name).join(", ")}`),
    projects: () => [
      ...projects.slice(0, 8).map((p) => `• ${p.title.padEnd(38)} [${p.stack.slice(0, 3).join(", ")}]`),
      "",
      "→ run `goto projects` to explore them all",
    ],
    certs: () => certifications.map((c) => `✔ ${c.name} (${c.valid})`),
    contact: () => [
      `email     ${profile.email}`,
      `linkedin  ${profile.socials.linkedin.replace("https://www.", "")}`,
      `github    ${profile.socials.github.replace("https://", "")}`,
    ],
    resume: () => { window.open(profile.resume, "_blank", "noopener"); return ["Opening résumé in a new tab…"]; },
    theme: () => { onToggleTheme(); return ["Theme toggled."]; },
    ls: () => ["about/  experience/  skills/  projects/  credentials/  contact/"],
    date: () => [new Date().toString()],
    echo: (args) => [args.join(" ")],
    pwd: () => ["/home/abhishek/portfolio"],
    "sudo": (args) =>
      args.join(" ") === "hire-me"
        ? ["[sudo] password for recruiter: ••••••••", "✔ Permission granted. Let's talk → " + profile.email]
        : ["Nice try. Try `sudo hire-me` instead 😉"],
    goto: (args) => {
      const id = (args[0] || "").toLowerCase();
      const ok = ["about", "experience", "skills", "projects", "credentials", "contact"].includes(id);
      if (ok) { setTimeout(() => scrollToId(id), 150); return [`Scrolling to #${id}…`]; }
      return ["usage: goto <about|experience|skills|projects|credentials|contact>"];
    },
  };
  return cmds;
}

export default function Terminal({ onToggleTheme }) {
  const [lines, setLines] = useState([]);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState([]);
  const [hIdx, setHIdx] = useState(-1);
  const [booting, setBooting] = useState(true);
  const bodyRef = useRef(null);
  const inputRef = useRef(null);
  const cmds = useRef(null);
  cmds.current = buildCommands({ onToggleTheme });

  const run = (raw) => {
    const text = raw.trim();
    if (!text) { setLines((l) => [...l, { type: "cmd", text: "" }]); return; }
    const [name, ...args] = text.split(/\s+/);
    if (name === "clear") { setLines([]); return; }
    const fn = cmds.current[name.toLowerCase()];
    const out = fn ? fn(args) : [`command not found: ${name}. Type \`help\`.`];
    setLines((l) => [...l, { type: "cmd", text }, ...out.map((t) => ({ type: fn ? "out" : "err", text: t }))]);
    setHistory((h) => [text, ...h].slice(0, 30));
  };

  // Boot sequence: type "whoami" automatically
  useEffect(() => {
    let cancelled = false;
    const word = "whoami";
    let i = 0;
    const typeNext = () => {
      if (cancelled) return;
      if (i <= word.length) {
        setInput(word.slice(0, i)); i += 1;
        setTimeout(typeNext, 90);
      } else {
        setTimeout(() => {
          if (cancelled) return;
          run(word); setInput("");
          setLines((l) => [...l, { type: "hint", text: "Type `help` to see what else I can do." }]);
          setBooting(false);
        }, 250);
      }
    };
    const t = setTimeout(typeNext, 700);
    return () => { cancelled = true; clearTimeout(t); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (bodyRef.current) bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
  }, [lines]);

  const onKeyDown = (e) => {
    if (booting) { e.preventDefault(); return; }
    if (e.key === "Enter") { run(input); setInput(""); setHIdx(-1); }
    else if (e.key === "ArrowUp") {
      e.preventDefault();
      const n = Math.min(hIdx + 1, history.length - 1);
      if (history[n] !== undefined) { setHIdx(n); setInput(history[n]); }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      const n = hIdx - 1;
      setHIdx(Math.max(n, -1)); setInput(n >= 0 ? history[n] : "");
    } else if (e.key === "Tab") {
      e.preventDefault();
      const match = Object.keys(cmds.current).find((c) => c.startsWith(input.trim()));
      if (match && input.trim()) setInput(match);
    } else if (e.key === "l" && e.ctrlKey) { e.preventDefault(); setLines([]); }
  };

  const quick = ["help", "projects", "skills", "sudo hire-me"];

  return (
    <div className="terminal" onClick={() => inputRef.current?.focus({ preventScroll: true })}>
      <div className="term-bar">
        <span className="dot dot-r" /><span className="dot dot-y" /><span className="dot dot-g" />
        <span className="term-title mono">~/portfolio — zsh</span>
      </div>
      <div className="term-body mono" ref={bodyRef} aria-live="polite">
        {lines.map((l, i) =>
          l.type === "cmd" ? (
            <div key={i} className="term-line"><span className="term-prompt">{PROMPT}</span> {l.text}</div>
          ) : (
            <div key={i} className={`term-line term-${l.type}`}>{l.text || " "}</div>
          )
        )}
        <label className="term-line term-input-row">
          <span className="term-prompt">{PROMPT}</span>
          <input
            ref={inputRef}
            className="term-input"
            value={input}
            onChange={(e) => !booting && setInput(e.target.value)}
            onKeyDown={onKeyDown}
            spellCheck={false}
            autoComplete="off"
            autoCapitalize="off"
            aria-label="Terminal input"
          />
        </label>
      </div>
      <div className="term-quick">
        {quick.map((q) => (
          <button key={q} className="chip chip-btn mono" disabled={booting}
            onClick={(e) => { e.stopPropagation(); run(q); }}>
            {q}
          </button>
        ))}
      </div>
    </div>
  );
}
