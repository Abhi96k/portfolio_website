// ───────────────────────────────────────────────────────────────
//  All portfolio content lives here. Edit this file to update
//  the site — no component changes needed.
// ───────────────────────────────────────────────────────────────

export const profile = {
  name: "Abhishek Nangare",
  shortName: "Abhishek",
  role: "Software Engineer 1",
  focus: "Backend & Full Stack",
  company: "Tellius",
  companyUrl: "https://www.tellius.com/",
  location: "Bengaluru, India",
  email: "abhisheknangare96k@gmail.com",
  openTo: "Open to SDE backend / full-stack roles",
  tagline:
    "I build backend services and data-heavy product features — async pipelines, REST APIs and the React interfaces that sit on top of them.",
  rotating: [
    "1M-row data exports",
    "queue-backed export pipelines",
    "schema-driven dashboards",
    "React + TypeScript UIs",
    "Scala / Akka HTTP services",
  ],
  resume:
    "https://drive.google.com/file/d/1qlCG3WnC6nzM-5ktv1pJFjHeQQkYvxpP/view?usp=sharing",
  socials: {
    github: "https://github.com/Abhi96k",
    linkedin: "https://www.linkedin.com/in/abhishek-nangare-3b6ab1241/",
    twitter: "https://twitter.com/ABHISHEKNANGA10",
    leetcode: "https://leetcode.com/u/abhi9001/",
  },
  about: [
    "I'm a Software Engineer at Tellius, an AI-driven analytics platform, where I've spent nearly two years shipping features end to end — from the React / TypeScript app analysts use every day to the Scala services, message queues and export workers behind it.",
    "Most of my recent work is the export pipeline: RabbitMQ-backed export jobs with tracking, cancellation and retries, streaming Excel workbooks and batched exports of up to a million rows, and PDF / PPT rendering with headless Chromium on Node.js. I care about predictable systems — controlled acknowledgements, memory budgets, iterative code where recursion would blow the stack — and about testing them.",
    "Along the way I've built components for our in-house design system, translated the product into Spanish and German, and worked on Kaiya, Tellius's AI analytics assistant. Right now I'm going deep on the Java / Spring ecosystem: microservices with Spring Cloud, reactive APIs with WebFlux, Kafka, and distributed-systems patterns like SAGA, Outbox and CQRS.",
  ],
  learning: [
    "Java · Spring Boot · Spring MVC",
    "Spring Data JPA · Hibernate",
    "Spring Security 6 · JWT · OAuth2",
    "JUnit · Mockito · Testcontainers",
    "Microservices · Spring Cloud",
    "Eureka · API Gateway · Config Server",
    "Resilience4j · Zipkin · ELK",
    "WebFlux · Project Reactor · R2DBC",
    "Apache Kafka",
    "Redis caching · Pub/Sub",
    "Docker · Kubernetes",
    "AWS CodePipeline · Elastic Beanstalk",
    "SAGA · Outbox · CQRS",
    "Idempotency · Rate limiting · DLQ",
  ],
};

export const stats = [
  { value: 780, suffix: "+", label: "Pull requests at Tellius" },
  { value: 1, suffix: "M rows", label: "Largest export pipeline handled" },
  { value: 1268, suffix: "+", label: "DSA problems solved" },
  { value: 2, suffix: "× AWS", label: "Certifications" },
];

export const experience = [
  {
    company: "Tellius",
    url: "https://www.tellius.com/",
    location: "Bengaluru · Hybrid",
    roles: [
      {
        title: "Software Engineer 1",
        period: "Apr 2025 — Present",
        current: true,
        // Each point: [lead, detail] — the lead renders in bold
        points: [
          ["Export pipeline (current focus)", "Moved dashboard and chart exports onto a RabbitMQ job queue with job tracking (including a WAITING state), cancellation of running exports and automatic retries for transient failures — each state surfaced in the UI."],
          ["Exports up to 1M rows", "Built streaming Excel workbooks (Apache POI) and batched, paginated pivot and table exports to CSV / Excel in Scala / Akka HTTP; fixed a StackOverflowError in pivot exports by rewriting a recursive loop iteratively; kept conditional formatting in exported files."],
          ["PDF / PPT exports", "Built selective export of chosen tabs, sections and charts, rendered by a headless-Chromium service on Node.js."],
          ["Vizpad v2 dashboard builder", "My largest area: a schema-driven formatting panel (axes, legends, data labels, KPI targets, number and conditional formatting), Highcharts renderers on a custom patch engine, Gridstack section layouts, viewport virtualisation and 15+ features including bulk apply, multi-sort, year-over-year difference, AI summary and embed URLs."],
          ["Kaiya AI assistant", "Built prompt management, agentic insights, the Skills and Context admin pages and credits, plus a Deepgram-powered voice assistant shipped in release 6.0."],
          ["Design system & i18n", "Built core components and schema-driven form fields for the in-house design system in Storybook; translated the whole app into Spanish and German with i18next."],
          ["Quality", "Wrote Jest + React Testing Library suites (Viz KPI module at 100% coverage) and moved CI from Travis CI to GitHub Actions."],
        ],
        stack: ["TypeScript", "React", "Redux-Saga", "Node.js", "Scala", "Akka HTTP", "RabbitMQ", "Apache POI", "Highcharts", "AG Grid", "Headless Chromium", "Kubernetes / Helm", "Jest", "GitHub Actions"],
      },
      {
        title: "Associate Software Developer",
        period: "Dec 2024 — Mar 2025",
        points: [
          ["UI regression automation", "Wrote Cypress end-to-end suites covering the core flows of the analytics app, replacing repetitive manual checks before each release."],
          ["API test coverage", "Added Cypress API tests that validate backend responses alongside the UI suites, catching regressions before they reached the frontend."],
          ["Release gating in CI/CD", "Integrated both suites into the CI/CD pipeline so weekly release builds are blocked on test failures, reducing manual QA effort."],
          ["Frontend bug fixes", "Fixed UI and production bugs in the React + Redux-Saga frontend while ramping up on the codebase and release process."],
          ["Design system groundwork", "Started the in-house design system's first components (inputs, button variants, breadcrumb and base icons), work I carried into the Software Engineer role."],
        ],
        stack: ["Cypress", "JavaScript", "TypeScript", "React", "Redux-Saga", "CI/CD"],
      },
    ],
  },
  {
    company: "Dhruva Research",
    location: "Remote",
    roles: [
      {
        title: "NLP Intern",
        period: "Jan 2023 — Mar 2023",
        points: [
          "Built NLP pipelines with Hugging Face Transformers, SpaCy and NLTK; fine-tuned transformer models to an F1 score of 0.85.",
          "Worked on Spark + Airflow data pipelines feeding model training.",
        ],
        stack: ["Python", "Transformers", "SpaCy", "Spark", "Airflow"],
      },
    ],
  },
];

// icon keys map to react-icons in components/icons.js
export const skills = [
  {
    group: "Languages",
    items: [
      { name: "TypeScript", icon: "typescript" },
      { name: "JavaScript", icon: "javascript" },
      { name: "Scala", icon: "scala" },
      { name: "Java", icon: "java" },
      { name: "Python", icon: "python" },
      { name: "SQL", icon: "mysql" },
    ],
  },
  {
    group: "Backend",
    items: [
      { name: "Node.js", icon: "node" },
      { name: "Express", icon: "express" },
      { name: "Akka HTTP", icon: "server" },
      { name: "RabbitMQ", icon: "rabbitmq" },
      { name: "Redis", icon: "redis" },
      { name: "Apache POI", icon: "apache" },
      { name: "Headless Chromium", icon: "chrome" },
      { name: "REST / Microservices", icon: "api" },
    ],
  },
  {
    group: "Frontend",
    items: [
      { name: "React", icon: "react" },
      { name: "Redux Toolkit + Saga", icon: "redux" },
      { name: "Highcharts", icon: "chart" },
      { name: "AG Grid", icon: "table" },
      { name: "Storybook", icon: "storybook" },
      { name: "i18next", icon: "i18n" },
      { name: "Next.js", icon: "next" },
      { name: "Tailwind CSS", icon: "tailwind" },
    ],
  },
  {
    group: "Data, Cloud & DevOps",
    items: [
      { name: "AWS", icon: "aws" },
      { name: "Docker", icon: "docker" },
      { name: "Kubernetes", icon: "kubernetes" },
      { name: "Helm", icon: "helm" },
      { name: "GitHub Actions", icon: "actions" },
      { name: "Prometheus", icon: "prometheus" },
      { name: "MySQL", icon: "mysql" },
      { name: "PostgreSQL", icon: "postgres" },
      { name: "MongoDB", icon: "mongodb" },
    ],
  },
  {
    group: "Testing",
    items: [
      { name: "Jest", icon: "jest" },
      { name: "React Testing Library", icon: "rtl" },
      { name: "Cypress", icon: "cypress" },
    ],
  },
  {
    group: "AI & ML",
    items: [
      { name: "Hugging Face", icon: "huggingface" },
      { name: "PyTorch", icon: "pytorch" },
      { name: "scikit-learn", icon: "sklearn" },
      { name: "Deepgram", icon: "voice" },
    ],
  },
];

// category: backend | fullstack | cloud | ml
export const projects = [
  {
    id: "redis-queue",
    title: "Redis Job Queue & Worker",
    category: "backend",
    year: "2024",
    icon: "redis",
    summary:
      "A code-submission pipeline: an Express API validates and enqueues jobs in Redis, and an independent worker pool drains them with blocking pops.",
    highlights: [
      "Express + TypeScript API with request validation middleware",
      "Redis list as a durable queue (LPUSH / BRPOP) decoupling API from workers",
      "Workers scale horizontally with no coordination code",
      "Graceful error handling for malformed jobs",
    ],
    stack: ["TypeScript", "Node.js", "Express", "Redis", "Docker"],
    github: "https://github.com/Abhi96k/redis_DB",
    featured: true,
  },
  {
    id: "prometheus",
    title: "Express Observability with Prometheus",
    category: "backend",
    year: "2024",
    icon: "prometheus",
    summary:
      "Instrumented an Express service with prom-client — request counters, in-flight gauges and latency histograms — scraped by Prometheus via Docker Compose.",
    highlights: [
      "Counter, Gauge and Histogram metrics via reusable middleware",
      "Labels per method / route / status code for fine-grained queries",
      "/metrics endpoint scraped by a Prometheus container",
      "One-command local stack with docker-compose",
    ],
    stack: ["TypeScript", "Express", "Prometheus", "Docker Compose"],
    github: "https://github.com/Abhi96k/Prometheus",
    featured: true,
  },
  {
    id: "cloud-monitor",
    title: "Cloud Monitor on Amazon EKS",
    category: "cloud",
    year: "2024",
    icon: "kubernetes",
    summary:
      "A Flask + psutil system-monitoring dashboard with live CPU/memory charts, containerised and shipped to Amazon EKS through ECR — provisioned with Python (boto3).",
    highlights: [
      "Live CPU / memory history charts with high-usage alerts",
      "Docker image pushed to Amazon ECR from a Python script",
      "Kubernetes Deployment + Service created programmatically on EKS",
      "Gunicorn-served Flask app, production-style container",
    ],
    stack: ["Python", "Flask", "Docker", "AWS ECR", "AWS EKS", "Kubernetes"],
    github: "https://github.com/Abhi96k/cloud_monitor",
    featured: true,
  },
  {
    id: "webrtc",
    title: "WebRTC Peer-to-Peer Video",
    category: "backend",
    year: "2024",
    icon: "webrtc",
    summary:
      "Real-time P2P video between browsers, with a lightweight WebSocket signaling server brokering SDP offers/answers and ICE candidates.",
    highlights: [
      "Typed WebSocket signaling server (ws) in Node.js",
      "Offer / answer / ICE-candidate relay between sender and receiver",
      "React + Vite client using RTCPeerConnection",
    ],
    stack: ["TypeScript", "WebRTC", "WebSocket", "React", "Vite"],
    github: "https://github.com/Abhi96k/WebRtc",
  },
  {
    id: "auth",
    title: "MERN Advanced Auth",
    category: "fullstack",
    year: "2024",
    icon: "jwt",
    summary:
      "Production-style authentication: signup, email verification, login, forgot/reset password and protected routes — JWT in httpOnly cookies.",
    highlights: [
      "JWT issued as httpOnly cookie + verifyToken middleware",
      "Transactional emails (verify, welcome, reset) via Mailtrap",
      "Time-boxed verification & reset tokens stored in MongoDB",
      "React client with protected / redirect routes",
    ],
    stack: ["Node.js", "Express", "MongoDB", "JWT", "React", "Zustand"],
    github: "https://github.com/Abhi96k/mern-advanced-auth",
  },
  {
    id: "tree-viz",
    title: "Binary Tree Visualizer",
    category: "fullstack",
    year: "2023",
    icon: "tree",
    summary:
      "Type an array and watch it become a binary tree, max-heap and BST — rendered as interactive SVG with D3.js.",
    highlights: [
      "Builds tree, heap and BST from the same input",
      "D3.js SVG rendering with hover inspection",
      "Zero-dependency static deploy on Vercel",
    ],
    stack: ["JavaScript", "D3.js", "SVG", "CSS"],
    github: "https://github.com/Abhi96k/Tree_Algo_visulization",
    live: "https://tree-algo-visulization.vercel.app/",
  },
];

export const projectFilters = [
  { id: "all", label: "All" },
  { id: "backend", label: "Backend & Systems" },
  { id: "cloud", label: "Cloud & DevOps" },
  { id: "fullstack", label: "Full Stack" },
  { id: "ml", label: "ML" },
];

export const certifications = [
  {
    name: "AWS Certified Solutions Architect – Associate",
    issuer: "Amazon Web Services",
    valid: "Jan 2024 — Jan 2027",
    level: "Associate",
  },
  {
    name: "AWS Certified Cloud Practitioner",
    issuer: "Amazon Web Services",
    valid: "Jan 2024 — Jan 2027",
    level: "Foundational",
  },
];

export const codingProfiles = [
  {
    platform: "LeetCode",
    icon: "leetcode",
    count: 500,
    suffix: "+",
    detail: "Global rank 99,831",
    handle: "abhi9001",
    url: "https://leetcode.com/u/abhi9001/",
  },
  {
    platform: "GeeksforGeeks",
    icon: "gfg",
    count: 468,
    suffix: "",
    detail: "Institute rank 127",
    handle: "abhisheknangare96k",
    url: "https://www.geeksforgeeks.org/user/abhisheknangare96k/",
  },
  {
    platform: "Code360",
    icon: "code",
    count: 300,
    suffix: "+",
    detail: "by Coding Ninjas",
    handle: "Abhi9001",
    url: "https://www.naukri.com/code360/profile/Abhi9001",
  },
  {
    platform: "HackerRank",
    icon: "hackerrank",
    count: null,
    detail: "Skill badges",
    handle: "abhisheknangare2",
    url: "https://www.hackerrank.com/abhisheknangare2",
  },
];

export const education = {
  school: "VIT Bhopal University",
  degree: "B.Tech, Computer Science & Engineering (AI & ML)",
  period: "2021 — 2025",
  grade: "CGPA 8.63",
  coursework: ["Data Structures & Algorithms", "Operating Systems", "DBMS", "Computer Networks", "Machine Learning"],
};

// EmailJS (public keys — safe to ship client-side)
export const emailjsConfig = {
  serviceId: "service_nx386i3",
  templateId: "template_1txr0mi",
  publicKey: "7XF9yA_VeGVthqBCE",
};
