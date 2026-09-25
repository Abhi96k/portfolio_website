# Abhishek Nangare — Portfolio

Personal site of **Abhishek Nangare**, Software Development Engineer (Backend & Full Stack) at Tellius.

**Live:** https://portfolio-website-pi-peach.vercel.app

## Highlights

- **Interactive terminal** in the hero — try `help`, `projects`, `goto contact` or `sudo hire-me`
- **Async export pipeline simulation** — a live model of a queue-backed, 1M-row export (producer → exchange → queue → workers with prefetch & acks → streamed file)
- **Command palette** (`⌘K` / `Ctrl K`) to jump to sections, open projects, copy email, switch theme
- Filterable, searchable **project grid** with detail modals
- Dark / light theme (remembered), scroll progress, active-section nav, count-up stats
- Working **contact form** (EmailJS) with a mailto fallback
- Responsive down to 360px, keyboard accessible, respects `prefers-reduced-motion`
- SEO: meta + Open Graph tags and JSON-LD `Person` schema

## Stack

React 18 · Vite 5 · Framer Motion · react-icons · plain CSS (custom properties, no UI framework)

## Editing content

Everything — bio, experience, skills, projects, certifications, coding profiles — lives in
[`src/data.js`](src/data.js). Change it there and the whole site updates.

## Run locally

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build → dist/
npm run preview  # serve the build
```

## Deploy

Deployed on Vercel. `vercel.json` pins the Vite framework preset, so every push to `main` redeploys.

## Structure

```
index.html              SEO meta, fonts, theme bootstrap
src/
  data.js               all site content
  App.jsx               layout, ⌘K shortcut, footer
  index.css             design tokens + styles
  components/
    Nav.jsx             sticky nav, progress bar, mobile menu
    Hero.jsx            intro, rotating headline, stats
    Terminal.jsx        interactive terminal
    About.jsx
    Experience.jsx      timeline
    PipelineDemo.jsx    async export pipeline simulation
    Skills.jsx
    Projects.jsx        filters, search, cards, modal
    Credentials.jsx     certifications, education, problem solving
    Contact.jsx         EmailJS form
    CommandPalette.jsx
    icons.jsx           tech icon map
    ui.jsx              shared hooks & helpers
```
