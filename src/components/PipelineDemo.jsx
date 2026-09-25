import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LuPlay, LuRotateCcw, LuFileSpreadsheet, LuServer } from "react-icons/lu";
import { SiRabbitmq } from "react-icons/si";

const TOTAL_ROWS = 1_000_000;
const CHUNK = 50_000;
const CHUNKS = TOTAL_ROWS / CHUNK; // 20
const WORKERS = 3;
const PREFETCH = 2;

/* An illustrative simulation of an async, queue-backed export:
   API publishes chunk jobs → exchange routes to a durable queue →
   workers consume with prefetch + manual acks → rows stream to the file. */
export default function PipelineDemo() {
  // Mutable model in a ref (single source of truth) + a version counter to re-render.
  const model = useRef(initial());
  const [, setVersion] = useState(0);
  const [running, setRunning] = useState(false);
  const timers = useRef([]);
  const state = model.current;

  function initial() {
    return {
      published: 0,
      queue: [],
      workers: Array.from({ length: WORKERS }, (_, i) => ({ id: i + 1, inFlight: [], done: 0 })),
      acked: 0,
      log: [],
    };
  }

  const commit = () => setVersion((v) => v + 1);
  const log = (msg) => { model.current.log = [msg, ...model.current.log].slice(0, 6); };
  const later = (fn, ms) => timers.current.push(setTimeout(fn, ms));
  const clearTimers = () => { timers.current.forEach(clearTimeout); timers.current = []; };
  useEffect(() => clearTimers, []);

  const dispatch = () => {
    const m = model.current;
    let delivered = true;
    while (m.queue.length && delivered) {
      delivered = false;
      const w = [...m.workers].sort((a, b) => a.inFlight.length - b.inFlight.length)[0];
      if (w.inFlight.length < PREFETCH) {
        const job = m.queue.shift();
        w.inFlight.push(job);
        delivered = true;
        later(() => {
          w.inFlight = w.inFlight.filter((j) => j !== job);
          w.done += 1;
          m.acked += 1;
          log(`ack      chunk#${String(job).padStart(2, "0")} by worker-${w.id} · ${CHUNK / 1000}k rows streamed`);
          if (m.acked === CHUNKS) {
            log("✔ export complete · 1,000,000 rows · file ready");
            setRunning(false);
          }
          dispatch();
          commit();
        }, 450 + Math.random() * 650);
      }
    }
  };

  const start = () => {
    clearTimers();
    model.current = initial();
    setRunning(true);
    commit();
    for (let c = 0; c < CHUNKS; c++) {
      later(() => {
        const m = model.current;
        m.published += 1;
        m.queue.push(c + 1);
        log(`publish  export.chunk#${String(c + 1).padStart(2, "0")} → export.jobs`);
        dispatch();
        commit();
      }, 120 * c + 100);
    }
  };

  const reset = () => { clearTimers(); setRunning(false); model.current = initial(); commit(); };
  const pct = Math.round((state.acked / CHUNKS) * 100);
  const rows = state.acked * CHUNK;
  const active = running;

  return (
    <div className="pipe">
      <div className="pipe-head">
        <div>
          <p className="mono small accent">system_spotlight</p>
          <h4 className="pipe-title">Async export pipeline — interactive model</h4>
          <p className="small muted">
            A simplified, illustrative model of the queue-backed export pattern I work on: chunked jobs,
            fair dispatch with prefetch, manual acks and streamed writes. Hit run.
          </p>
        </div>
        <div className="pipe-actions">
          <button className="btn btn-primary btn-sm" onClick={start} disabled={running}>
            <LuPlay size={14} /> {state.acked === CHUNKS ? "Run again" : "Run 1M-row export"}
          </button>
          <button className="icon-btn" onClick={reset} aria-label="Reset simulation"><LuRotateCcw size={15} /></button>
        </div>
      </div>

      <div className="pipe-flow">
        <Node title="Export API" sub="producer" icon={<LuServer size={16} />} metric={`${state.published}/${CHUNKS} published`} active={active} />
        <Wire active={active && state.published < CHUNKS} />
        <Node title="export.direct" sub="exchange" icon={<SiRabbitmq size={15} />} metric="routing: export.jobs" active={active} />
        <Wire active={active && state.published < CHUNKS} />
        <div className={`pnode pnode-queue ${active ? "is-active" : ""}`}>
          <div className="pnode-head"><SiRabbitmq size={15} /><span>export.jobs</span></div>
          <div className="pnode-sub mono">durable queue</div>
          <div className="queue-slots">
            <AnimatePresence initial={false}>
              {state.queue.slice(0, 10).map((j) => (
                <motion.span key={j} className="qslot" layout
                  initial={{ opacity: 0, scale: 0.6 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, x: 12 }} />
              ))}
            </AnimatePresence>
          </div>
          <div className="pnode-metric mono">depth {state.queue.length}</div>
        </div>
        <Wire active={active} />
        <div className="workers">
          {state.workers.map((w) => (
            <div key={w.id} className={`worker ${w.inFlight.length ? "is-busy" : ""}`}>
              <span className="mono">worker-{w.id}</span>
              <span className="worker-slots">
                {Array.from({ length: PREFETCH }).map((_, k) => (
                  <span key={k} className={`wslot ${w.inFlight[k] ? "on" : ""}`} />
                ))}
              </span>
              <span className="mono faint small">{w.done} acked</span>
            </div>
          ))}
        </div>
        <Wire active={active} />
        <div className={`pnode pnode-file ${state.acked === CHUNKS ? "is-done" : active ? "is-active" : ""}`}>
          <div className="pnode-head"><LuFileSpreadsheet size={16} /><span>report.xlsx</span></div>
          <div className="pnode-sub mono">streamed write</div>
          <div className="bar"><motion.div className="bar-fill" animate={{ width: `${pct}%` }} transition={{ ease: "easeOut", duration: 0.3 }} /></div>
          <div className="pnode-metric mono">{rows.toLocaleString("en-IN")} rows · {pct}%</div>
        </div>
      </div>

      <div className="pipe-log mono" aria-live="off">
        {state.log.length === 0 ? (
          <div className="faint">$ waiting for job… press “Run 1M-row export”</div>
        ) : (
          state.log.map((l, i) => <div key={l + i} className={i === 0 ? "" : "faint"}>{l}</div>)
        )}
      </div>
    </div>
  );
}

function Node({ title, sub, icon, metric, active }) {
  return (
    <div className={`pnode ${active ? "is-active" : ""}`}>
      <div className="pnode-head">{icon}<span>{title}</span></div>
      <div className="pnode-sub mono">{sub}</div>
      <div className="pnode-metric mono">{metric}</div>
    </div>
  );
}

function Wire({ active }) {
  return (
    <div className={`wire ${active ? "is-active" : ""}`} aria-hidden="true">
      <span className="wire-dot" /><span className="wire-dot d2" /><span className="wire-dot d3" />
    </div>
  );
}
