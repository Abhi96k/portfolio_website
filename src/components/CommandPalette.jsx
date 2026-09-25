import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  LuSearch, LuHash, LuFolderGit2, LuCopy, LuSunMoon, LuFileText, LuCornerDownLeft,
} from "react-icons/lu";
import { SiGithub } from "react-icons/si";
import { FaLinkedinIn } from "react-icons/fa6";
import { profile, projects } from "../data";
import { NAV_LINKS } from "./Nav";
import { scrollToId, copyText } from "./ui";

export default function CommandPalette({ open, onClose, onToggleTheme, toast }) {
  const [q, setQ] = useState("");
  const [sel, setSel] = useState(0);
  const inputRef = useRef(null);
  const listRef = useRef(null);

  const items = useMemo(() => [
    ...NAV_LINKS.map((l) => ({ group: "Navigate", label: `Go to ${l.label}`, icon: LuHash, run: () => scrollToId(l.id) })),
    ...projects.map((p) => ({
      group: "Projects", label: p.title, hint: p.stack.slice(0, 3).join(" · "), icon: LuFolderGit2,
      run: () => { scrollToId("projects"); setTimeout(() => window.dispatchEvent(new CustomEvent("open-project", { detail: p.id })), 450); },
    })),
    { group: "Actions", label: "Copy email address", hint: profile.email, icon: LuCopy,
      run: async () => { if (await copyText(profile.email)) toast("Email copied to clipboard"); } },
    { group: "Actions", label: "Toggle light / dark theme", icon: LuSunMoon, run: onToggleTheme },
    { group: "Actions", label: "Open résumé", icon: LuFileText, run: () => window.open(profile.resume, "_blank", "noopener") },
    { group: "Links", label: "GitHub", hint: "Abhi96k", icon: SiGithub, run: () => window.open(profile.socials.github, "_blank", "noopener") },
    { group: "Links", label: "LinkedIn", icon: FaLinkedinIn, run: () => window.open(profile.socials.linkedin, "_blank", "noopener") },
  ], [onToggleTheme, toast]);

  const filtered = useMemo(() => {
    const t = q.trim().toLowerCase();
    if (!t) return items;
    return items.filter((i) => `${i.label} ${i.hint || ""} ${i.group}`.toLowerCase().includes(t));
  }, [q, items]);

  useEffect(() => { setSel(0); }, [q]);
  useEffect(() => {
    if (open) { setQ(""); setSel(0); setTimeout(() => inputRef.current?.focus(), 10); }
  }, [open]);
  useEffect(() => {
    listRef.current?.querySelector(`[data-idx="${sel}"]`)?.scrollIntoView({ block: "nearest" });
  }, [sel]);

  const exec = (item) => { if (!item) return; onClose(); setTimeout(item.run, 60); };

  const onKey = (e) => {
    if (e.key === "ArrowDown") { e.preventDefault(); setSel((s) => Math.min(s + 1, filtered.length - 1)); }
    else if (e.key === "ArrowUp") { e.preventDefault(); setSel((s) => Math.max(s - 1, 0)); }
    else if (e.key === "Enter") { e.preventDefault(); exec(filtered[sel]); }
    else if (e.key === "Escape") { onClose(); }
  };

  let lastGroup = null;

  return (
    <AnimatePresence>
      {open && (
        <motion.div className="modal-backdrop palette-backdrop" onClick={onClose}
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.15 }}>
          <motion.div className="palette" role="dialog" aria-modal="true" aria-label="Command palette"
            onClick={(e) => e.stopPropagation()}
            initial={{ opacity: 0, y: -12, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }} transition={{ duration: 0.18 }}>
            <div className="palette-search">
              <LuSearch size={16} className="faint" />
              <input ref={inputRef} value={q} onChange={(e) => setQ(e.target.value)} onKeyDown={onKey}
                placeholder="Search sections, projects, actions…" aria-label="Search commands" />
              <kbd className="kbd">esc</kbd>
            </div>
            <div className="palette-list" ref={listRef} role="listbox">
              {filtered.length === 0 && <div className="palette-empty mono small faint">No results for “{q}”</div>}
              {filtered.map((it, idx) => {
                const header = it.group !== lastGroup ? it.group : null;
                lastGroup = it.group;
                const Icon = it.icon;
                return (
                  <div key={`${it.group}-${it.label}`}>
                    {header && <div className="palette-group mono">{header}</div>}
                    <button data-idx={idx} role="option" aria-selected={idx === sel}
                      className={`palette-item ${idx === sel ? "is-sel" : ""}`}
                      onMouseMove={() => setSel(idx)} onClick={() => exec(it)}>
                      <Icon size={15} className="palette-icon" />
                      <span className="palette-label">{it.label}</span>
                      {it.hint && <span className="palette-hint mono">{it.hint}</span>}
                      {idx === sel && <LuCornerDownLeft size={13} className="faint palette-enter" />}
                    </button>
                  </div>
                );
              })}
            </div>
            <div className="palette-foot mono">
              <span><kbd className="kbd">↑</kbd><kbd className="kbd">↓</kbd> navigate</span>
              <span><kbd className="kbd">↵</kbd> select</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
