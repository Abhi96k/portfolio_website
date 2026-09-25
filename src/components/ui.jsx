import { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";

/* Section wrapper with a mono index label + heading */
export function Section({ id, index, label, title, intro, children, className = "" }) {
  return (
    <section id={id} className={`section ${className}`} aria-labelledby={`${id}-title`}>
      <div className="container">
        <Reveal>
          <p className="eyebrow">
            <span className="eyebrow-num">{index}</span>
            <span className="eyebrow-line" />
            {label}
          </p>
          <h2 id={`${id}-title`} className="section-title">{title}</h2>
          {intro && <p className="section-intro">{intro}</p>}
        </Reveal>
        {children}
      </div>
    </section>
  );
}

/* Fade/slide-in on scroll */
export function Reveal({ children, delay = 0, y = 18, as = "div", className, ...rest }) {
  const reduce = useReducedMotion();
  const Comp = motion[as] || motion.div;
  return (
    <Comp
      className={className}
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay }}
      {...rest}
    >
      {children}
    </Comp>
  );
}

/* Number that counts up when visible */
export function CountUp({ to, duration = 1400, format = (n) => n.toLocaleString("en-IN") }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const reduce = useReducedMotion();
  const [val, setVal] = useState(reduce ? to : 0);
  useEffect(() => {
    if (!inView || reduce) { setVal(to); return; }
    let raf; const start = performance.now();
    const tick = (t) => {
      const p = Math.min(1, (t - start) / duration);
      setVal(Math.round(to * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to, duration, reduce]);
  return <span ref={ref}>{format(val)}</span>;
}

/* Theme hook — persisted, respects the pre-paint script in index.html */
export function useTheme() {
  const [theme, setTheme] = useState(
    () => document.documentElement.getAttribute("data-theme") || "dark"
  );
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute("content", theme === "dark" ? "#0a0b0d" : "#fafaf9");
    try { localStorage.setItem("theme", theme); } catch (e) { /* storage blocked */ }
  }, [theme]);
  return [theme, () => setTheme((t) => (t === "dark" ? "light" : "dark"))];
}

/* Which section is currently in view */
export function useActiveSection(ids) {
  const [active, setActive] = useState(ids[0]);
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => { if (e.isIntersecting) setActive(e.target.id); });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    ids.forEach((id) => { const el = document.getElementById(id); if (el) obs.observe(el); });
    return () => obs.disconnect();
  }, [ids]);
  return active;
}

/* Small toast */
export function useToast() {
  const [msg, setMsg] = useState(null);
  const timer = useRef();
  const show = (m) => {
    setMsg(m);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setMsg(null), 2200);
  };
  const node = (
    <div className={`toast ${msg ? "toast-show" : ""}`} role="status" aria-live="polite">
      {msg}
    </div>
  );
  return [node, show];
}

export async function copyText(text) {
  try { await navigator.clipboard.writeText(text); return true; }
  catch {
    const ta = document.createElement("textarea");
    ta.value = text; document.body.appendChild(ta); ta.select();
    let ok = false; try { ok = document.execCommand("copy"); } catch { /* noop */ }
    ta.remove(); return ok;
  }
}

export function scrollToId(id) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
}
