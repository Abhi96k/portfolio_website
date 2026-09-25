import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { skills } from "../data";
import { Section, Reveal } from "./ui";
import { TechIcon } from "./icons";

export default function Skills() {
  const tabs = ["All", ...skills.map((g) => g.group)];
  const [tab, setTab] = useState("All");
  const groups = tab === "All" ? skills : skills.filter((g) => g.group === tab);

  return (
    <Section id="skills" index="03" label="skills" title="The toolbox."
      intro="What I reach for day to day — heavier on the backend, comfortable across the stack.">
      <Reveal className="tabs" role="tablist" aria-label="Skill groups">
        {tabs.map((t) => (
          <button key={t} role="tab" aria-selected={tab === t}
            className={`tab ${tab === t ? "is-active" : ""}`} onClick={() => setTab(t)}>
            {tab === t && <motion.span layoutId="skill-tab" className="tab-pill" transition={{ type: "spring", stiffness: 400, damping: 34 }} />}
            <span className="tab-text">{t}</span>
          </button>
        ))}
      </Reveal>

      <div className="skill-groups">
        <AnimatePresence mode="popLayout" initial={false}>
          {groups.map((g) => (
            <motion.div key={g.group} layout className="skill-group card"
              initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.3 }}>
              <p className="mono small faint skill-group-name">{g.group.toLowerCase().replace(/[^a-z]+/g, "_")}</p>
              <ul className="skill-list">
                {g.items.map((s) => (
                  <li key={s.name} className="skill">
                    <span className="skill-icon"><TechIcon name={s.icon} size={18} /></span>
                    <span>{s.name}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </Section>
  );
}
