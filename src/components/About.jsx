import { LuMapPin, LuBriefcase, LuGraduationCap, LuSprout } from "react-icons/lu";
import { profile, education } from "../data";
import { Section, Reveal } from "./ui";

export default function About() {
  const facts = [
    { icon: LuBriefcase, k: "Now", v: `SDE @ ${profile.company}` },
    { icon: LuMapPin, k: "Based in", v: profile.location },
    { icon: LuGraduationCap, k: "Studied", v: `B.Tech CSE (AI & ML), ${education.grade}` },
  ];
  return (
    <Section id="about" index="01" label="about" title="Backend-minded, product-driven.">
      <div className="about-grid">
        <Reveal className="about-photo-wrap">
          <div className="about-photo">
            <img src="/me.webp" alt="Portrait of Abhishek Nangare" width="400" height="511" loading="lazy" />
          </div>
          <ul className="facts">
            {facts.map(({ icon: Icon, k, v }) => (
              <li key={k}>
                <Icon size={15} className="accent" />
                <span className="mono faint">{k}</span>
                <span>{v}</span>
              </li>
            ))}
          </ul>
        </Reveal>

        <div className="about-copy">
          {profile.about.map((p, i) => (
            <Reveal key={i} delay={0.06 * i}><p>{p}</p></Reveal>
          ))}
          <Reveal delay={0.2} className="learning">
            <p className="mono small faint"><LuSprout size={14} className="accent" /> currently_learning</p>
            <div className="chips">
              {profile.learning.map((l) => <span key={l} className="chip">{l}</span>)}
            </div>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
