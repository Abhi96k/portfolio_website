import { LuArrowUpRight } from "react-icons/lu";
import { experience } from "../data";
import { Section, Reveal } from "./ui";
import PipelineDemo from "./PipelineDemo";

export default function Experience() {
  return (
    <Section
      id="experience"
      index="02"
      label="experience"
      title="Where I've shipped."
      intro="Nearly two years at Tellius — 780+ pull requests across the React app, Scala services, export workers and deployment configs — plus an NLP internship before that."
    >
      <div className="timeline">
        {experience.map((co, ci) => (
          <div key={co.company} className="tl-company">
            <Reveal className="tl-co-head">
              <div className="tl-co-logo mono">{co.company.slice(0, 1)}</div>
              <div>
                <h3 className="tl-co-name">
                  {co.url ? (
                    <a href={co.url} target="_blank" rel="noreferrer" className="link-hover">
                      {co.company} <LuArrowUpRight size={14} />
                    </a>
                  ) : co.company}
                </h3>
                <p className="mono small faint">{co.location}</p>
              </div>
            </Reveal>

            <div className="tl-roles">
              {co.roles.map((r, ri) => (
                <Reveal key={r.title} delay={0.05 * ri} className="tl-role">
                  <span className={`tl-node ${r.current ? "is-current" : ""}`} aria-hidden="true" />
                  <div className="card role-card">
                    <div className="role-head">
                      <h4 className="role-title">{r.title}</h4>
                      <span className="mono small role-period">
                        {r.current && <span className="pulse pulse-sm" />}{r.period}
                      </span>
                    </div>
                    <ul className="role-points">
                      {r.points.map((p) => {
                        const [lead, text] = Array.isArray(p) ? p : [null, p];
                        return (
                          <li key={text}>
                            {lead && <strong className="point-lead">{lead}: </strong>}
                            {text}
                          </li>
                        );
                      })}
                    </ul>
                    <div className="chips">
                      {r.stack.map((s) => <span key={s} className="chip chip-sm">{s}</span>)}
                    </div>
                  </div>
                </Reveal>
              ))}
              {ci === 0 && (
                <Reveal className="tl-role tl-role-demo">
                  <span className="tl-node tl-node-demo" aria-hidden="true" />
                  <PipelineDemo />
                </Reveal>
              )}
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
