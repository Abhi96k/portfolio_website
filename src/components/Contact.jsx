import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { LuCopy, LuCheck, LuSend, LuArrowUpRight, LuMail, LuLoader } from "react-icons/lu";
import { SiGithub } from "react-icons/si";
import { FaLinkedinIn, FaXTwitter } from "react-icons/fa6";
import { profile, emailjsConfig } from "../data";
import { Section, Reveal, copyText } from "./ui";

export default function Contact({ toast }) {
  const form = useRef(null);
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error
  const [copied, setCopied] = useState(false);

  const onCopy = async () => {
    if (await copyText(profile.email)) {
      setCopied(true); toast("Email copied to clipboard");
      setTimeout(() => setCopied(false), 1800);
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const fd = new FormData(form.current);
    if (fd.get("website")) return; // honeypot
    setStatus("sending");
    try {
      await emailjs.sendForm(emailjsConfig.serviceId, emailjsConfig.templateId, form.current, {
        publicKey: emailjsConfig.publicKey,
      });
      setStatus("sent");
      form.current.reset();
      toast("Message sent — I'll get back to you soon!");
    } catch (err) {
      setStatus("error");
    }
  };

  const mailto = () => {
    const fd = new FormData(form.current);
    const subject = encodeURIComponent(fd.get("subject") || "Hello from your portfolio");
    const body = encodeURIComponent(`${fd.get("message") || ""}\n\n— ${fd.get("from_name") || ""}`);
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
  };

  return (
    <Section id="contact" index="06" label="contact" title="Let's build something."
      intro="I'm open to SDE backend and full-stack roles. The fastest way to reach me is email — I usually reply within a day.">
      <div className="contact-grid">
        <Reveal className="contact-side">
          <button className="email-big" onClick={onCopy} aria-label="Copy email address">
            <LuMail size={20} className="accent" />
            <span className="email-text">{profile.email}</span>
            <span className="email-copy">{copied ? <LuCheck size={16} /> : <LuCopy size={16} />}</span>
          </button>
          <div className="contact-links">
            <a className="contact-link" href={profile.socials.linkedin} target="_blank" rel="noreferrer">
              <FaLinkedinIn size={16} /> LinkedIn <LuArrowUpRight size={14} className="faint" />
            </a>
            <a className="contact-link" href={profile.socials.github} target="_blank" rel="noreferrer">
              <SiGithub size={16} /> GitHub <LuArrowUpRight size={14} className="faint" />
            </a>
            <a className="contact-link" href={profile.socials.twitter} target="_blank" rel="noreferrer">
              <FaXTwitter size={15} /> X / Twitter <LuArrowUpRight size={14} className="faint" />
            </a>
            <a className="contact-link" href={profile.resume} target="_blank" rel="noreferrer">
              <LuArrowUpRight size={16} /> Résumé (PDF) <LuArrowUpRight size={14} className="faint" />
            </a>
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <form ref={form} className="card form" onSubmit={onSubmit}>
            <div className="form-row">
              <label className="field">
                <span className="mono small faint">name</span>
                <input name="from_name" required placeholder="Jane Doe" autoComplete="name" />
              </label>
              <label className="field">
                <span className="mono small faint">email</span>
                <input name="from_email" type="email" required placeholder="jane@company.com" autoComplete="email" />
              </label>
            </div>
            <label className="field">
              <span className="mono small faint">subject</span>
              <input name="subject" placeholder="SDE role at …" />
            </label>
            <label className="field">
              <span className="mono small faint">message</span>
              <textarea name="message" rows="5" required placeholder="Hi Abhishek, …" />
            </label>
            <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hp" aria-hidden="true" />
            <div className="form-foot">
              {status === "error" ? (
                <p className="small err">Couldn't send right now. <button type="button" className="link-btn" onClick={mailto}>Open in your email app →</button></p>
              ) : status === "sent" ? (
                <p className="small accent">Thanks! Your message is on its way.</p>
              ) : (
                <p className="small faint">Prefer email? Click my address to copy it.</p>
              )}
              <button className="btn btn-primary" type="submit" disabled={status === "sending"}>
                {status === "sending" ? <><LuLoader size={15} className="spin" /> Sending…</> : <><LuSend size={15} /> Send message</>}
              </button>
            </div>
          </form>
        </Reveal>
      </div>
    </Section>
  );
}
