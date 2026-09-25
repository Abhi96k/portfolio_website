import { LuArrowUpRight, LuBadgeCheck, LuGraduationCap } from "react-icons/lu";
import { FaAws } from "react-icons/fa6";
import { certifications, codingProfiles, education } from "../data";
import { Section, Reveal, CountUp } from "./ui";
import { TechIcon } from "./icons";

export default function Credentials() {
  const total = codingProfiles.reduce((a, p) => a + (p.count || 0), 0);
  return (
    <Section id="credentials" index="05" label="credentials" title="Certified, practised, schooled.">
      <div className="cred-grid">
        {/* Certifications */}
        <div className="cred-col">
          <Reveal><p className="mono small faint col-label">certifications</p></Reveal>
          {certifications.map((c, i) => (
            <Reveal key={c.name} delay={0.06 * i} className="card cert">
              <div className="cert-badge"><FaAws size={26} /></div>
              <div>
                <h3 className="cert-name">{c.name}</h3>
                <p className="small muted">{c.issuer}</p>
                <p className="mono small cert-valid"><LuBadgeCheck size={13} className="accent" /> valid {c.valid}</p>
              </div>
            </Reveal>
          ))}

          <Reveal delay={0.12} className="card edu">
            <div className="cert-badge edu-badge"><LuGraduationCap size={24} /></div>
            <div>
              <h3 className="cert-name">{education.school}</h3>
              <p className="small muted">{education.degree}</p>
              <p className="mono small cert-valid">{education.period} · <span className="accent">{education.grade}</span></p>
              <div className="chips" style={{ marginTop: 10 }}>
                {education.coursework.map((c) => <span key={c} className="chip chip-sm">{c}</span>)}
              </div>
            </div>
          </Reveal>
        </div>

        {/* Problem solving */}
        <div className="cred-col">
          <Reveal className="ps-head">
            <p className="mono small faint col-label">problem_solving</p>
            <p className="ps-total">
              <span className="ps-total-num"><CountUp to={total} />+</span>
              <span className="muted small">DSA problems solved across platforms</span>
            </p>
          </Reveal>
          <div className="ps-grid">
            {codingProfiles.map((p, i) => (
              <Reveal key={p.platform} delay={0.05 * i} as="a" className="card ps-card"
                href={p.url} target="_blank" rel="noreferrer">
                <div className="ps-top">
                  <span className="ps-icon"><TechIcon name={p.icon} size={18} /></span>
                  <LuArrowUpRight size={15} className="faint ps-arrow" />
                </div>
                <div className="ps-count">
                  {p.count ? <><CountUp to={p.count} />{p.suffix}</> : <span className="muted">—</span>}
                </div>
                <div className="ps-platform">{p.platform}</div>
                <div className="mono small faint">{p.detail}</div>
                <div className="mono small faint ps-handle">@{p.handle}</div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
