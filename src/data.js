// ───────────────────────────────────────────────────────────────
//  All portfolio content lives here. Edit this file to update
//  the site — no component changes needed.
// ───────────────────────────────────────────────────────────────

export const profile = {
  name: "Abhishek Nangare",
  shortName: "Abhishek",
  role: "Software Development Engineer",
  focus: "Backend & Full Stack",
  company: "Tellius",
  companyUrl: "https://www.tellius.com/",
  location: "Bengaluru, India",
  email: "abhisheknangare96k@gmail.com",
  openTo: "Open to SDE backend / full-stack roles",
  tagline:
    "I build backend services and data-heavy product features — async pipelines, REST APIs and the React interfaces that sit on top of them.",
  rotating: [
    "async, distributed pipelines",
    "REST APIs that scale",
    "1M-row data exports",
    "React + TypeScript UIs",
    "cloud-native services on AWS",
  ],
  resume:
    "https://drive.google.com/file/d/1qlVl_FbPefnvE5vgqrBToYCxF3Rh8uxx/view?usp=drive_link",
  socials: {
    github: "https://github.com/Abhi96k",
    linkedin: "https://www.linkedin.com/in/abhishek-nangare-3b6ab1241/",
    twitter: "https://twitter.com/ABHISHEKNANGA10",
    leetcode: "https://leetcode.com/u/abhi9001/",
  },
  about: [
    "I'm a Software Development Engineer at Tellius, an AI-driven analytics platform, where I've spent the last two years building backend services and data-intensive features end to end — from message queues and export pipelines to the React components analysts use every day.",
    "Most of my recent work sits on the backend: asynchronous, distributed export workflows on Node.js and RabbitMQ that stream, paginate and format datasets of up to a million rows without falling over. I care about predictable systems — controlled acknowledgements, back-pressure, memory budgets — and about testing them, which is why I wired Cypress UI/API regression suites into our CI/CD.",
    "Right now I'm going deeper on Java / Spring Boot, Spring Security (JWT, OAuth2), Kafka and system design.",
  ],
  learning: ["Java / Spring Boot", "Spring Security · JWT · OAuth2", "Apache Kafka", "System Design"],
};

export const stats = [
  { value: 2, suffix: "+ yrs", label: "Building production software" },
  { value: 1, suffix: "M rows", label: "Largest export pipeline handled" },
  { value: 1250, suffix: "+", label: "DSA problems solved" },
  { value: 2, suffix: "× AWS", label: "Certifications" },
];

export const experience = [
  {
    company: "Tellius",
    url: "https://www.tellius.com/",
    location: "Bengaluru · Hybrid",
    roles: [
      {
        title: "Software Development Engineer (Full Stack)",
        period: "Apr 2025 — Present",
        current: true,
        points: [
          "Designed RabbitMQ-based asynchronous export workflows — exchanges, queues, consumers and controlled acknowledgements — distributed across multiple service nodes.",
          "Optimised exports of up to 1M rows with streaming, pagination and memory tuning; built nested pivot-table exports that preserve formatting in Excel/CSV.",
          "Built reusable data-visualisation components with React, Redux Toolkit, Redux-Saga, TypeScript and Storybook; kept large datasets smooth with virtualisation and memoisation.",
          "Own features end to end across frontend, middleware (Scala / Akka HTTP) and service integrations; run demos and knowledge-transfer sessions on new platform features.",
        ],
        stack: ["Node.js", "RabbitMQ", "TypeScript", "React", "Redux-Saga", "Scala", "Akka HTTP", "Storybook"],
      },
      {
        title: "Associate Software Developer",
        period: "Dec 2024 — Mar 2025",
        points: [
          "Built Cypress UI and API regression automation and integrated it into CI/CD to gate weekly release cycles.",
        ],
        stack: ["Cypress", "CI/CD", "JavaScript"],
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
      { name: "Java", icon: "java" },
      { name: "TypeScript", icon: "typescript" },
      { name: "JavaScript", icon: "javascript" },
      { name: "Python", icon: "python" },
      { name: "Scala", icon: "scala" },
      { name: "SQL", icon: "mysql" },
    ],
  },
  {
    group: "Backend",
    items: [
      { name: "Node.js", icon: "node" },
      { name: "Express", icon: "express" },
      { name: "Spring Boot", icon: "spring" },
      { name: "RabbitMQ", icon: "rabbitmq" },
      { name: "Kafka", icon: "kafka" },
      { name: "Redis", icon: "redis" },
      { name: "GraphQL", icon: "graphql" },
      { name: "REST / Microservices", icon: "api" },
    ],
  },
  {
    group: "Frontend",
    items: [
      { name: "React", icon: "react" },
      { name: "Redux Toolkit + Saga", icon: "redux" },
      { name: "Next.js", icon: "next" },
      { name: "Storybook", icon: "storybook" },
      { name: "Tailwind CSS", icon: "tailwind" },
    ],
  },
  {
    group: "Data, Cloud & DevOps",
    items: [
      { name: "AWS", icon: "aws" },
      { name: "Docker", icon: "docker" },
      { name: "Kubernetes", icon: "kubernetes" },
      { name: "MySQL", icon: "mysql" },
      { name: "PostgreSQL", icon: "postgres" },
      { name: "MongoDB", icon: "mongodb" },
      { name: "Prometheus", icon: "prometheus" },
      { name: "GitHub Actions", icon: "actions" },
    ],
  },
  {
    group: "Testing & ML",
    items: [
      { name: "Cypress", icon: "cypress" },
      { name: "PyTorch", icon: "pytorch" },
      { name: "Hugging Face", icon: "huggingface" },
      { name: "scikit-learn", icon: "sklearn" },
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
    id: "nextjs-ec2",
    title: "Next.js CI/CD to AWS EC2",
    category: "cloud",
    year: "2024",
    icon: "actions",
    summary:
      "An end-to-end delivery pipeline: every push builds a Docker image in GitHub Actions, publishes it to Docker Hub and rolls it out on an EC2 host.",
    highlights: [
      "GitHub Actions workflow: build → push → deploy",
      "Secrets injected at build time from GitHub encrypted secrets",
      "Self-hosted runner on EC2 pulls the image & swaps the container",
    ],
    stack: ["Next.js", "Docker", "GitHub Actions", "Docker Hub", "AWS EC2"],
    github: "https://github.com/Abhi96k/nextjs-app-deploy-with-docker-ec2",
  },
  {
    id: "s3-store",
    title: "S3 Web Store",
    category: "cloud",
    year: "2024",
    icon: "aws",
    summary:
      "Next.js App Router app with a server-side route handler that streams uploads straight into Amazon S3 using the AWS SDK v3.",
    highlights: [
      "Route handler parses multipart form data on the server",
      "PutObjectCommand upload with credentials kept server-side",
      "Least-privilege IAM policy for the bucket",
    ],
    stack: ["Next.js", "AWS S3", "AWS SDK v3", "IAM"],
    github: "https://github.com/Abhi96k/s3_web_store_nextjs",
  },
  {
    id: "rest-graphql",
    title: "REST + GraphQL API on EC2",
    category: "backend",
    year: "2024",
    icon: "graphql",
    summary:
      "The same user service exposed two ways — REST endpoints and a GraphQL schema with queries and mutations — dockerised and deployed to EC2.",
    highlights: [
      "GraphQL queries & mutations alongside REST routes",
      "Clients fetch exactly the fields they need",
      "Dockerised Node.js service deployed on EC2",
    ],
    stack: ["Node.js", "Express", "GraphQL", "Docker", "AWS EC2"],
    github: "https://github.com/Abhi96k/nodejs-app-mern-ec2-docker",
  },
  {
    id: "dashboard",
    title: "MERN Admin Dashboard",
    category: "fullstack",
    year: "2023",
    icon: "react",
    summary:
      "An analytics dashboard with sales, geography, customer and transaction views — Nivo charts, MUI X data grids and light/dark themes.",
    highlights: [
      "Server-side paginated MUI X data grids",
      "Nivo line, pie, choropleth and breakdown charts",
      "Express + Mongoose aggregation APIs",
    ],
    stack: ["React", "Redux Toolkit", "Node.js", "Express", "MongoDB", "MUI"],
    github: "https://github.com/Abhi96k/MERN_DASHBOARD",
    live: "https://react-dashboard12.vercel.app",
  },
  {
    id: "studyflicks",
    title: "StudyFlicks — Video Platform",
    category: "fullstack",
    year: "2023",
    icon: "video",
    summary:
      "A MERN video-sharing platform: upload, stream and search videos, user profiles and notifications, with media stored on Cloudinary.",
    highlights: [
      "Video upload pipeline to Cloudinary",
      "Search & filter across the catalogue",
      "Redux Toolkit state, Tailwind UI, fully responsive",
    ],
    stack: ["React", "Node.js", "Express", "MongoDB", "Cloudinary", "Tailwind"],
    github: "https://github.com/Abhi96k/StudyFlicks",
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
  {
    id: "health-ai",
    title: "CareTake AI — Health Assistant",
    category: "ml",
    year: "2024",
    icon: "brain",
    summary:
      "An ML-powered health companion: symptom checking, disease-risk prediction models and lifestyle suggestions, served as a Streamlit app.",
    highlights: [
      "Six disease-risk models (heart, liver, diabetes, kidney…) + XGBoost symptom model",
      "Symptom input → likely conditions & guidance",
      "Deployed on Streamlit Community Cloud",
    ],
    stack: ["Python", "scikit-learn", "XGBoost", "Pandas", "Plotly", "Streamlit"],
    github: "https://github.com/Abhi96k/AI-Based-Health-assistant-",
    live: "https://ai-health-assistance-alert.streamlit.app/",
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
