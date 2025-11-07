import React, { useEffect, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { Github, Linkedin, Mail, FileDown, ExternalLink, Code2, Briefcase, ChevronRight, Stars, Sparkles, Globe, Terminal, ArrowUp } from "lucide-react";

// ---------------------------
// Editable content (start)
// ---------------------------
const PROFILE = {
  name: "Rohan",
  title: "Software Engineer",
  tagline:
    "I design and build reliable, scalable software — with a bias for automation, clarity, and impact.",
  location: "India (IST)",
  email: "rohan@example.com",
  resumeUrl: "/Rohan_Jaiswal_DevOps_Resume.pdf", // place your PDF in public/
  social: {
    github: "https://github.com/your-github",
    linkedin: "https://linkedin.com/in/your-linkedin",
  },
};

const SKILLS = [
  { group: "Core", items: ["TypeScript", "Python", "Go", "Java"] },
  { group: "Web / App", items: ["React", "Next.js", "Node.js", "Vite"] },
  { group: "Cloud / DevOps", items: ["AWS", "Docker", "Kubernetes (EKS)", "Terraform"] },
  { group: "Data / AI", items: ["PostgreSQL", "Redis", "Airflow", "LangChain", "OpenAI API"] },
  { group: "Practices", items: ["TDD", "Clean Architecture", "CI/CD", "Observability"] },
];

const PROJECTS = [
  {
    name: "Smart Deploy",
    description:
      "CLI + GitHub Actions to automate blue/green deployments on AWS with zero‑downtime rollbacks.",
    tech: ["TypeScript", "AWS", "GitHub Actions"],
    link: "https://example.com/project",
    repo: "https://github.com/your-github/smart-deploy",
  },
  {
    name: "DocSense",
    description:
      "RAG-powered document Q&A with embeddings, chunking, and streaming responses.",
    tech: ["Python", "FastAPI", "OpenAI", "Postgres"],
    link: "https://example.com/project",
    repo: "https://github.com/your-github/docsense",
  },
  {
    name: "CostRadar",
    description:
      "FinOps dashboard for AWS cost anomalies with alerting and auto‑tagging.",
    tech: ["Next.js", "Terraform", "AWS"],
    link: "https://example.com/project",
    repo: "https://github.com/your-github/costradar",
  },
];

const EXPERIENCE = [
  {
    role: "Software Engineer",
    company: "Acme AI",
    period: "2023 — Present",
    bullets: [
      "Built event-driven data pipelines (3x throughput, 40% lower costs).",
      "Shipped auth & billing for B2B SaaS (MRR +₹10L).",
      "Led migration to IaC and preview environments.",
    ],
  },
  {
    role: "Freelance Engineer",
    company: "Multiple startups",
    period: "2020 — 2023",
    bullets: [
      "Delivered 15+ projects in web, automation, and analytics.",
      "Introduced CI/CD and testing suites to reduce regressions by 60%.",
    ],
  },
];
// ---------------------------
// Editable content (end)
// ---------------------------

// Motion presets
const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } },
};
const item = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0 },
};

function Section({ id, title, icon, children, subtitle }) {
  return (
    <section id={id} className="scroll-mt-24" aria-labelledby={`${id}-title`}>
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center gap-2 mb-2">
          {icon}
          <h2 id={`${id}-title`} className="text-xl sm:text-2xl font-semibold tracking-tight text-neutral-100">{title}</h2>
        </div>
        {subtitle && <p className="text-sm text-neutral-400 mb-6">{subtitle}</p>}
        {children}
      </div>
    </section>
  );
}

function Pill({ children }) {
  return (
    <span className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs sm:text-sm text-neutral-200">
      {children}
    </span>
  );
}

function GlowCard({ children, className = "" }) {
  return (
    <div className={`group relative rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm ${className}`}>
      <div className="absolute inset-0 -z-10 rounded-2xl bg-gradient-to-br from-cyan-500/0 via-fuchsia-500/0 to-emerald-500/0 group-hover:from-cyan-500/10 group-hover:via-fuchsia-500/10 group-hover:to-emerald-500/10 blur-xl transition-all duration-500" />
      <div className="absolute -inset-px rounded-2xl bg-gradient-to-r from-white/15 via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      <div className="relative p-5">{children}</div>
    </div>
  );
}

function NavLink({ href, children }) {
  return (
    <a href={href} className="inline-flex items-center gap-1 text-sm font-medium text-neutral-200 hover:text-white">
      {children}
    </a>
  );
}

function ScrollProgressBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 20, restDelta: 0.001 });
  return (
    <motion.div style={{ scaleX }} className="fixed left-0 right-0 top-0 h-0.5 origin-left z-50 bg-gradient-to-r from-cyan-400 via-fuchsia-400 to-emerald-400" />
  );
}

function BackToTop() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 600);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  if (!show) return null;
  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="fixed bottom-6 right-6 z-40 inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-neutral-200 hover:bg-white/10"
      aria-label="Back to top"
    >
      <ArrowUp size={16} /> Top
    </button>
  );
}

export default function Portfolio() { // tailored to Rohan's resume
  useEffect(() => {
    // Keyboard shortcuts: g = go to top, c = contact
    const handler = (e) => {
      if (e.key.toLowerCase() === "g") window.scrollTo({ top: 0, behavior: "smooth" });
      if (e.key.toLowerCase() === "c") location.hash = "#contact";
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  return (
    <div className="min-h-screen bg-black text-neutral-200">
      {/* Ambient background accents */}
      <div className="pointer-events-none fixed inset-0 -z-20">
        <div className="absolute -top-28 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-fuchsia-500/10 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-cyan-500/10 blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.04),transparent_60%)]" />
      </div>

      <ScrollProgressBar />

      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-white/10 backdrop-blur supports-[backdrop-filter]:bg-black/50">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <a href="#home" className="font-semibold text-neutral-100">{PROFILE.name}</a>
          <nav className="hidden sm:flex items-center gap-6">
            <NavLink href="#projects">Projects</NavLink>
            <NavLink href="#skills">Skills</NavLink>
            <NavLink href="#experience">Experience</NavLink>
            <NavLink href="#contact">Contact</NavLink>
          </nav>
          <div className="flex items-center gap-2">
            <a aria-label="GitHub" href={PROFILE.social.github} className="p-2 rounded hover:bg-white/10"><Github size={18} /></a>
            <a aria-label="LinkedIn" href={PROFILE.social.linkedin} className="p-2 rounded hover:bg-white/10"><Linkedin size={18} /></a>
            <a href={PROFILE.resumeUrl} className="hidden sm:inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-1.5 text-sm hover:bg-white/10">
              <FileDown size={16} /> Resume
            </a>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section id="home" className="relative border-b border-white/10">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <motion.div variants={container} initial="hidden" animate="show" className="grid md:grid-cols-12 gap-8 items-center">
            <motion.div variants={item} className="md:col-span-7">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-neutral-300">
                <Stars size={14} /> Available for select projects
              </div>
              <h1 className="mt-4 text-3xl sm:text-5xl font-bold tracking-tight text-white">
                {PROFILE.title}
              </h1>
              <p className="mt-4 text-base sm:text-lg text-neutral-300 max-w-2xl">
                {PROFILE.tagline}
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <a href={`mailto:${PROFILE.email}`} className="inline-flex items-center gap-2 rounded-xl bg-white text-black px-4 py-2 hover:opacity-90">
                  <Mail size={16} /> Contact me
                </a>
                <a href={PROFILE.resumeUrl} className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2 hover:bg-white/10">
                  <FileDown size={16} /> Download CV
                </a>
              </div>
              <div className="mt-6 text-sm text-neutral-400">
                <span className="mr-3">📍 {PROFILE.location}</span>
                <span>📧 {PROFILE.email}</span>
              </div>
              <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3">
                {["Reliable", "Scalable", "Automated", "Observable"].map((k) => (
                  <GlowCard key={k} className="p-0">
                    <div className="flex items-center gap-2 p-3">
                      <Sparkles size={16} className="text-neutral-300" />
                      <span className="text-sm text-neutral-200">{k}</span>
                    </div>
                  </GlowCard>
                ))}
              </div>
            </motion.div>

            <motion.div variants={item} className="md:col-span-5">
              <GlowCard>
                <div className="flex items-center gap-3 mb-3">
                  <div className="rounded-xl p-2 border border-white/10 bg-white/5"><Code2 size={18} /></div>
                  <div>
                    <p className="font-medium text-neutral-100">Currently building</p>
                    <p className="text-sm text-neutral-400">Performance, tooling, and AI automation.</p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  {SKILLS[0].items.slice(0,4).map((s) => (<Pill key={s}>{s}</Pill>))}
                </div>
                <div className="mt-4 flex items-center gap-2 text-xs text-neutral-400">
                  <Globe size={14} /> Available remotely · IST
                </div>
              </GlowCard>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Projects */}
      <Section id="projects" title="Projects" subtitle="Selected work with measurable impact" icon={<Briefcase size={18} className="opacity-70 text-neutral-300" />}> 
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {PROJECTS.map((p) => (
            <motion.article
              key={p.name}
              variants={item}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
              className="group relative"
            >
              <GlowCard>
                <div className="flex items-start justify-between gap-4">
                  <h3 className="font-semibold text-lg tracking-tight text-neutral-100">{p.name}</h3>
                  <div className="flex gap-2">
                    <a href={p.link} aria-label="Live" className="p-2 rounded hover:bg-white/10"><ExternalLink size={16} /></a>
                    <a href={p.repo} aria-label="Repo" className="p-2 rounded hover:bg-white/10"><Github size={16} /></a>
                  </div>
                </div>
                <p className="mt-2 text-sm text-neutral-300 min-h-[48px]">{p.description}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {p.tech.map((t) => (<Pill key={t}>{t}</Pill>))}
                </div>
                <div className="mt-4 text-xs text-neutral-400 inline-flex items-center gap-1">
                  <Terminal size={14} /> Built with intent · Robust tests
                </div>
              </GlowCard>
            </motion.article>
          ))}
        </div>
      </Section>

      {/* Skills */}
      <Section id="skills" title="Skills" subtitle="Breadth where useful, depth where it matters" icon={<Code2 size={18} className="opacity-70 text-neutral-300" />}> 
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {SKILLS.map((sg) => (
            <GlowCard key={sg.group}>
              <h3 className="font-medium mb-3 text-neutral-100">{sg.group}</h3>
              <div className="flex flex-wrap gap-2">
                {sg.items.map((s) => (<Pill key={s}>{s}</Pill>))}
              </div>
            </GlowCard>
          ))}
        </div>
      </Section>

      {/* Experience */}
      <Section id="experience" title="Experience" subtitle="Highlights and outcomes — not task lists" icon={<Briefcase size={18} className="opacity-70 text-neutral-300" />}> 
        <div className="space-y-6">
          {EXPERIENCE.map((e) => (
            <GlowCard key={e.role + e.company}>
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h3 className="font-medium text-neutral-100">{e.role} · {e.company}</h3>
                <span className="text-sm text-neutral-400">{e.period}</span>
              </div>
              <ul className="mt-3 list-disc pl-5 text-sm text-neutral-300 space-y-1">
                {e.bullets.map((b, i) => (<li key={i}>{b}</li>))}
              </ul>
            </GlowCard>
          ))}
        </div>
      </Section>

      {/* Contact */}
      <Section id="contact" title="Contact" subtitle="Zero-fluff conversations welcome" icon={<Mail size={18} className="opacity-70 text-neutral-300" />}> 
        <GlowCard>
          <p className="text-neutral-300">Want to collaborate or discuss an idea? I’m open to consulting, freelance, and full‑time roles.</p>
          <a href={`mailto:${PROFILE.email}`} className="mt-4 inline-flex items-center gap-2 rounded-xl bg-white text-black px-4 py-2 hover:opacity-90">
            <ChevronRight size={16} /> Email me
          </a>
        </GlowCard>
      </Section>

      {/* Certifications */}
      <Section id="certs" title="Certifications" subtitle="Selected credentials" icon={<Stars size={18} className="opacity-70 text-neutral-300" />}> 
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            "Microsoft: Azure Developer Associate (AZ‑204)",
            "Microsoft: DevOps Engineer Expert (AZ‑400)",
            "Google Cloud: Associate Cloud Engineer (ACE)",
            "GitHub Actions (GH‑200)",
            "GitHub Copilot (GH‑300)",
            "Vertex AI: Generative AI Explorer",
            "Kubernetes in Google Cloud",
            "Google Cloud Operations Suite",
          ].map((c) => (
            <GlowCard key={c}><div className="text-sm text-neutral-200">{c}</div></GlowCard>
          ))}
        </div>
      </Section>

      {/* Impact */}
      <Section id="impact" title="Impact" subtitle="Numbers that matter" icon={<Sparkles size={18} className="opacity-70 text-neutral-300" />}> 
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[{k:"Cost ↓", v:"25%"},{k:"Components", v:"300+"},{k:"Uptime", v:"99.9%"},{k:"Cycle Time", v:"20% faster"}].map(({k,v}) => (
            <GlowCard key={k}>
              <p className="text-xs text-neutral-400">{k}</p>
              <p className="text-2xl font-semibold text-neutral-100">{v}</p>
            </GlowCard>
          ))}
        </div>
      </Section>

      <BackToTop />

      {/* Footer */}
      <footer className="border-t border-white/10">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-8 text-sm text-neutral-400 flex flex-wrap items-center justify-between gap-3">
          <p>© {new Date().getFullYear()} {PROFILE.name}. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <a href={PROFILE.social.github} className="hover:text-white">GitHub</a>
            <a href={PROFILE.social.linkedin} className="hover:text-white">LinkedIn</a>
            <a href="#home" className="hover:text-white">Back to top</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
