import React from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, BookOpen, FileText, ExternalLink, Award, Briefcase, Compass, Activity, Fingerprint, Radar, ScrollText, KeyRound, Eraser, ShieldCheck, Printer, Bike, Server, MapPin, Lock, Bot, LifeBuoy } from 'lucide-react';

// ==========================================
// 1. YOUR PERSONAL DATA (GitHub Pages Fallback)
// ==========================================
const DEFAULT_DATA = {
  name: "Junaid Ahmed",
  tagline: "Cloud Security & Identity Architect",
  links: {
    linkedin: "https://linkedin.com/in/iamjahmed",
    github: "https://github.com/jahmed-cloud",
    email: "mailto:iam@jahmed.cloud",
    blog: "https://learncloud.guru",
    // Put a PDF at public/resume.pdf and set this to "/resume.pdf" to show the Download Resume button
    resume: ""
  }
};

// ==========================================
// 2. HYBRID LOGIC
// ==========================================
// window is undefined while the page is pre-rendered at build time
const env = (typeof window !== 'undefined' && window.ENV) || {};
const PROFILE = {
  name: env.USER_NAME || DEFAULT_DATA.name,
  tagline: env.USER_TAGLINE || DEFAULT_DATA.tagline,
  links: {
    linkedin: env.LINKEDIN_URL !== undefined ? env.LINKEDIN_URL : DEFAULT_DATA.links.linkedin,
    github: env.GITHUB_URL !== undefined ? env.GITHUB_URL : DEFAULT_DATA.links.github,
    email: env.EMAIL_ADDRESS !== undefined ? env.EMAIL_ADDRESS : DEFAULT_DATA.links.email,
    blog: env.BLOG_URL !== undefined ? env.BLOG_URL : DEFAULT_DATA.links.blog,
    resume: DEFAULT_DATA.links.resume
  }
};

const MY_EXPERTISE = ["Entra ID & Identity Governance", "Zero Trust Architecture", "Privileged Access Workstations (PAW)", "PIM / JIT & Conditional Access", "Passwordless (FIDO2 · WHfB)", "Azure Landing Zones & Policy", "Azure Virtual Desktop", "Terraform & Policy as Code", "PowerShell & Python", "Docker & CI/CD", "FinOps & Cost Governance"];
const MY_STATS = [
  { value: "10+", label: "Years in cloud & identity" },
  { value: "100K+", label: "Users under Zero Trust designs" },
  { value: "50+", label: "Global enterprises secured" },
  { value: "6", label: "Open-source platforms shipped" }
];
const MY_CERTIFICATIONS = [
  { name: "Cybersecurity Architect Expert (SC-100)", issuer: "Microsoft" },
  { name: "Azure Solutions Architect Expert (AZ-305)", issuer: "Microsoft" },
  { name: "CISM (Certified Information Security Manager)", issuer: "ISACA" },
  { name: "Identity & Access Administrator (SC-300)", issuer: "Microsoft" },
  { name: "Azure Administrator Associate (AZ-104)", issuer: "Microsoft" },
  { name: "Microsoft Certified Trainer (MCT)", issuer: "Microsoft" },
  { name: "Instructor Recognition Award — 100+ students trained", issuer: "Skillable" }
];
const MY_EXPERIENCE = [
  {
    role: "Technology Manager — Cloud Security & Identity", company: "Ernst & Young (EY)", period: "May 2025 – Present", location: "Bengaluru",
    description: "Leading a cloud security team delivering enterprise identity programmes aligned to C-suite risk and compliance objectives.",
    highlights: ["Zero Trust & passwordless (FIDO2 + WHfB) programme for 10,000+ users — identity helpdesk tickets down 50%", "Automated PIM/JIT lifecycle removing standing access for 200+ admin accounts", "Terraform-enforced RBAC model aligned to ICFR — audit findings down 30%, full SoD compliance"]
  },
  {
    role: "Senior Consultant — Identity & Security", company: "Concentrix (Microsoft Partner)", period: "Aug 2023 – May 2025", location: "Pune",
    description: "Global Delivery Hub architect for multi-region enterprise identity and cloud designs.",
    highlights: ["Passwordless & Conditional Access strategies for 100,000+ users across 50+ enterprises", "Migrated 40,000+ machines off on-prem SCCM to cloud-first update management", "15–20% cloud cost savings across 20+ WAF/CAF reviews"]
  },
  {
    role: "Lead Consultant — Cloud & Identity", company: "Allyis (Microsoft Partner)", period: "Jun 2021 – Aug 2023", location: "Hyderabad",
    description: "Led a global team of 10+ engineers on the Microsoft Amplify Programme.",
    highlights: ["KQL & Azure Workbooks observability — MTTR improved by 60%", "Azure Firewall & hub-spoke designs protecting 1,000+ VMs", "98% on-time delivery; user onboarding effort cut by 70% via automation"]
  },
  {
    role: "Senior Azure Engineer", company: "Convergys (Microsoft Partner)", period: "Jan 2017 – Jun 2021", location: "Bengaluru",
    description: "Azure solutions for Microsoft Worldwide Learning enterprise customers.",
    highlights: ["Contributed to $1M+ in Azure Consumed Revenue", "Power Automate & Power BI pipelines saving 1,800+ manual hours a year"]
  },
  {
    role: "Technical Support Specialist", company: "Lenovo", period: "May 2015 – Aug 2016", location: "Bengaluru",
    description: "Tier-2 commercial support for IT heads of major enterprise accounts across global data-centre dispatches.",
    highlights: []
  }
];

// Flagship platforms — shown as large cards
const FEATURED_PROJECTS = [
  {
    title: "Guardian365", subtitle: "Microsoft 365 Security Monitoring Platform", status: "v1.0 · In active development", accent: "from-blue-500/20",
    icon: <Activity className="text-blue-400" size={28} />,
    description: "A self-hosted, multi-tenant security operations platform for Microsoft 365 — think Grafana + Defender XDR + Splunk, built for M365. Collects telemetry from Microsoft Graph, Entra ID Protection, Intune, Defender XDR and Purview, plus cross-platform endpoint agents, into one real-time dashboard.",
    highlights: ["Graph collection every 15 min: risky users, sign-ins, Secure Score, CA, Defender incidents", "Alert engine with 60s rule evaluation, z-score anomaly detection", "Go endpoint agent over mTLS (Windows / Linux / macOS)", "Alerts to Teams, Slack, Email, Webhook & PagerDuty"],
    tech: ["ASP.NET Core 9", "React + TS", "Node.js", "Go", "PostgreSQL", "ClickHouse", "Redis", "Helm"],
    github: "", demo: ""
  },
  {
    title: "EntraGuard", subtitle: "Identity Security Posture Management (ISPM)", status: "Open source · Docker Hub", accent: "from-emerald-500/20",
    icon: <Fingerprint className="text-emerald-400" size={28} />,
    description: "Continuously assesses a Microsoft Entra ID tenant against 115 security checks across 12 domains — Conditional Access, MFA, PIM, guest access, break-glass, app & service principal hygiene — with plain-English risk, step-by-step remediation and evidence for every finding.",
    highlights: ["115 automated checks via Microsoft Graph, scans in under 5 minutes", "Findings mapped to NIST CSF, CIS Azure v2 and ISO 27001", "Exceptions workflow & effort-based remediation plans", "Multi-arch images (amd64 / arm64)"],
    tech: ["Python", "FastAPI", "Celery", "React", "PostgreSQL", "Redis", "Docker"],
    github: "https://github.com/jahmed-cloud/entra-guard", demo: "https://hub.docker.com/r/jahmed22/entra-guard-api"
  },
  {
    title: "Azure Resource Guardian (ARG)", subtitle: "Discover. Govern. Optimize.", status: "v0.2 · Open source", accent: "from-purple-500/20",
    icon: <Radar className="text-purple-400" size={28} />,
    description: "A self-hosted Azure governance platform giving a single pane of glass across the entire estate: orphaned and idle resources, cost savings, CAF + Zero Trust scoring, Azure Policy effectiveness, Entra ID hygiene and Terraform drift — with an approval-based remediation engine.",
    highlights: ["76 scanners, 20+ orphan / idle resource checks", "Per-resource monthly & annual savings projections", "\"What governs this resource?\" Azure Policy analysis", "CI/CD gating with SARIF / JUnit for GitHub Actions & Azure DevOps"],
    tech: ["Python 3.12", "FastAPI", "React (MUI)", "Celery", "PostgreSQL", "Resource Graph", "Docker"],
    image: { src: "projects/arg-savings.jpg", alt: "ARG top savings opportunities: each idle resource with severity, recommendation and monthly and annual savings (demo data)" },
    github: "https://github.com/jahmed-cloud/ARG", demo: ""
  },
  {
    title: "AZPaC — Azure Policy as Code", subtitle: "Policy governance through pull requests", status: "Open source · Production framework", accent: "from-yellow-500/20",
    icon: <ScrollText className="text-yellow-400" size={28} />,
    description: "A Terraform framework for managing Azure Policy at scale: write a definition once, group it into an initiative and assign it to management groups or subscriptions — all reviewed through pull requests. Every exemption has an owner and an expiry date.",
    highlights: ["One-word audit → enforce switch with automatic effect downgrade", "Built-in & custom definitions side by side", "Azure DevOps pipelines for definitions, nightly drift and remediation", "Least-privilege service principals per pipeline"],
    tech: ["Terraform", "Azure Policy", "Azure DevOps", "HCL"],
    image: { src: "projects/azpac-architecture.svg", alt: "AZPaC architecture: definitions and initiative files flow through the Terraform engine and an approval pipeline into Azure definitions, initiatives, assignments and time-bound exemptions", contain: true },
    github: "https://github.com/jahmed-cloud/AZPaC", demo: ""
  },
  {
    title: "Privileged Access Workstations as Code", subtitle: "PAW baselines for Entra ID & Intune", status: "Enterprise engagements", accent: "from-red-500/20",
    icon: <Lock className="text-red-400" size={28} />,
    description: "Designing and deploying Privileged Access Workstations, physical and Azure Virtual Desktop, so privileged roles can only be used from hardened, locked-down devices. The baseline is delivered as version-controlled code, so it is reviewable, repeatable across tenants and protected against drift.",
    highlights: ["Device isolation, Conditional Access, compliance, AppLocker & WDAC, Autopilot and scope tags", "Configurable controls with scenario presets: AVD, physical, cloud-only, pilot and compromise recovery", "Dry-run and idempotent deployments with drift detection", "Eligible-only PIM roles and break-glass alerting"],
    tech: ["PowerShell", "Microsoft Graph", "Intune", "Entra ID", "Terraform", "AVD"],
    github: "", demo: "", note: "Client work — source not public"
  },
  {
    title: "Entra MFA & TAP Portal", subtitle: "Approval-driven MFA reset & Temporary Access Pass", status: "In development", accent: "from-cyan-500/20",
    icon: <KeyRound className="text-cyan-400" size={28} />,
    description: "An approval-driven portal for resetting MFA methods and issuing Temporary Access Passes in Microsoft Entra ID. Every privileged action runs through Microsoft Graph on behalf of a signed-in, group-authorised user, and every action is audited. Privileged Graph scopes never reach the browser.",
    highlights: ["MSAL sign-in (PKCE) with On-Behalf-Of token exchange to Graph", "Policy and approval engine: single, dual, auto or bypass, with manager-first approval and escalation", "Append-only audit log, CSV/JSON export, Teams/Slack/SMTP notifications", "Horizontally scalable worker with Postgres leader election"],
    tech: ["ASP.NET Core 9", "React 19", "Fluent UI", "PostgreSQL", "Redis", "Docker"],
    github: "", demo: ""
  }
];

// Smaller tools & utilities
const MY_PROJECTS = [
  { title: "CloudSkills", description: "A cloud architecture & FinOps toolkit with an MCP server, deterministic CLI and reusable agent skills. It runs read-only Azure reviews (security, identity, RBAC/PIM, policy, network, WAF, cost) and produces HTML, JSON and Mermaid reports, with or without an AI client.", icon: <Bot className="text-pink-400 mb-4 md:mb-6" size={28} />, tech: ["Node.js", "MCP", "Azure Resource Graph"], github: "", demo: "" },
  { title: "Entra Helpdesk Portal", description: "Zero Trust ITSM portal that keeps Tier 1/2 support out of the Entra admin centre — password resets, MFA clearing, session revocation and group management through a scoped service principal, with mandatory ticket numbers and a full audit log.", icon: <LifeBuoy className="text-cyan-400 mb-4 md:mb-6" size={28} />, tech: ["Python", "Microsoft Graph", "Docker"], github: "https://github.com/jahmed-cloud/entra-helpdesk", demo: "" },
  { title: "Entra ID Environment Teardown", description: "Dependency-aware CI/CD pipeline that safely resets an Entra ID tenant — CA policies, groups, apps, devices and users — with a tenant-domain safety lock, protected break-glass accounts, dry-run on PRs and full audit reports.", icon: <Eraser className="text-red-400 mb-4 md:mb-6" size={28} />, tech: ["PowerShell", "Microsoft Graph", "Gitea Actions"], github: "https://github.com/jahmed-cloud/Entra-ID-Environment-Teardown", demo: "" },
  { title: "PIM Role Assignment Export", description: "PowerShell tool that collects every active and eligible PIM role assignment in Entra ID and exports detailed and summary reports for access reviews and audits.", icon: <ShieldCheck className="text-blue-400 mb-4 md:mb-6" size={28} />, tech: ["PowerShell", "Graph SDK"], github: "https://github.com/jahmed-cloud/EntraID", demo: "" },
  { title: "OpenPrint Server", description: "Docker-based CUPS print server with a secure admin dashboard for Raspberry Pi and Linux — device discovery, queue and job management, Avahi network sharing, HTTPS, CSRF protection and rate-limited login.", icon: <Printer className="text-orange-400 mb-4 md:mb-6" size={28} />, tech: ["Python", "Flask", "CUPS", "Docker"], github: "https://github.com/jahmed-cloud/OpenPrint-Server", demo: "" },
  { title: "Jahmed MotoHub", description: "A containerised Flask web application for my riding club, featuring rider management and automated CI/CD deployment.", icon: <Bike className="text-yellow-400 mb-4 md:mb-6" size={28} />, tech: ["Python", "Flask", "Docker"], github: "", demo: "https://motohub.jahmed.cloud" },
  { title: "AVD Monitor", description: "KQL queries for Azure Monitor and Log Analytics to troubleshoot and report on Azure Virtual Desktop health, sessions and performance.", icon: <Server className="text-indigo-400 mb-4 md:mb-6" size={28} />, tech: ["KQL", "Azure Monitor"], github: "https://github.com/jahmed-cloud/AVD-Monitor", demo: "" }
];

const FadeIn = ({ children, delay = 0 }) => (
  <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}>{children}</motion.div>
);

export default function App() {
  return (
    <div className="relative min-h-screen overflow-hidden selection:bg-blue-500/30">
      <div className="absolute top-[-10%] left-[-10%] w-[80vw] md:w-[50vw] h-[80vw] md:h-[50vw] bg-blue-600/10 rounded-full blur-[100px] md:blur-[120px] -z-10" />
      <div className="absolute bottom-[20%] right-[-10%] w-[70vw] md:w-[40vw] h-[70vw] md:h-[40vw] bg-purple-600/10 rounded-full blur-[100px] md:blur-[120px] -z-10" />

      {/* Optimized Navbar for Mobile */}
      <nav className="fixed top-4 md:top-6 left-1/2 -translate-x-1/2 w-[92%] md:w-[90%] max-w-4xl bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl md:rounded-3xl px-5 md:px-6 py-3 flex justify-between items-center z-50">
        <span className="font-bold tracking-tight text-lg">JA.</span>
        <div className="hidden md:flex gap-8 text-sm text-gray-400">
          <a href="#home" className="hover:text-white transition-colors">Home</a>
          <a href="#expertise" className="hover:text-white transition-colors">Expertise</a>
          <a href="#timeline" className="hover:text-white transition-colors">Journey</a>
          <a href="#work" className="hover:text-white transition-colors">Work</a>
        </div>
        <a href="#contact" className="bg-white text-black px-4 md:px-5 py-2 rounded-full text-xs md:text-sm font-medium hover:scale-105 transition-transform">Let's Talk</a>
      </nav>

      <main className="max-w-5xl mx-auto px-5 md:px-6">
        
        {/* Optimized Hero */}
        <section id="home" className="min-h-[100svh] flex flex-col justify-center items-center text-center pt-24 md:pt-20">
          <FadeIn><div className="inline-block px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-gray-400 text-xs md:text-sm mb-6 md:mb-8">Available for new opportunities</div></FadeIn>
          <FadeIn delay={0.1}><h1 className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tighter mb-4 md:mb-6 bg-gradient-to-br from-white to-gray-500 bg-clip-text text-transparent pb-2">Hi, I'm <br/>{PROFILE.name}</h1></FadeIn>
          <FadeIn delay={0.2}><p className="text-lg md:text-xl text-gray-400 font-light mb-8 md:mb-10 max-w-2xl mx-auto">{PROFILE.tagline}</p></FadeIn>
          
          <FadeIn delay={0.3}>
            {/* Buttons stack on mobile, side-by-side on larger screens */}
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center mb-8 md:mb-10 w-full sm:w-auto">
              {PROFILE.links.blog && <a href={PROFILE.links.blog} target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2 px-6 py-3 bg-white/5 border border-white/10 rounded-full hover:bg-white/10 transition-colors text-sm"><BookOpen size={18} /> View My Blog</a>}
              {PROFILE.links.resume && <a href={PROFILE.links.resume} download className="flex items-center justify-center gap-2 px-6 py-3 bg-white/5 border border-white/10 rounded-full hover:bg-white/10 transition-colors text-sm"><FileText size={18} /> Download Resume</a>}
            </div>
          </FadeIn>

          <FadeIn delay={0.4}>
            <div className="flex gap-5 md:gap-6 justify-center">
              {PROFILE.links.linkedin && <a href={PROFILE.links.linkedin} target="_blank" rel="noreferrer" className="text-gray-400 hover:text-white hover:-translate-y-1 transition-all"><Linkedin size={22} className="md:w-6 md:h-6" /></a>}
              {PROFILE.links.github && <a href={PROFILE.links.github} target="_blank" rel="noreferrer" className="text-gray-400 hover:text-white hover:-translate-y-1 transition-all"><Github size={22} className="md:w-6 md:h-6" /></a>}
              {PROFILE.links.email && <a href={PROFILE.links.email} className="text-gray-400 hover:text-white hover:-translate-y-1 transition-all"><Mail size={22} className="md:w-6 md:h-6" /></a>}
            </div>
          </FadeIn>

          <FadeIn delay={0.5}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mt-12 md:mt-16 w-full max-w-3xl">
              {MY_STATS.map((stat, i) => (
                <div key={i} className="p-4 md:p-5 rounded-2xl bg-white/5 border border-white/10">
                  <p className="text-2xl md:text-3xl font-semibold tracking-tight">{stat.value}</p>
                  <p className="text-[11px] md:text-xs text-gray-500 mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
          </FadeIn>
        </section>

        {/* Optimized Expertise */}
        <section id="expertise" className="py-20 md:py-32">
          <FadeIn>
            <h2 className="text-3xl md:text-5xl font-medium tracking-tight mb-10 md:mb-16">Expertise.</h2>
            <div className="grid md:grid-cols-2 gap-8 md:gap-12 mb-16 md:mb-20 items-center">
              <p className="text-lg md:text-xl text-gray-400 font-light leading-relaxed">I design secure, resilient cloud solutions. With 10+ years in Identity and Access Management, Zero Trust and cloud governance, I turn compliance requirements into enforceable Security-as-Code — and build open-source platforms that help teams see and fix risk across Entra ID, Azure and Microsoft 365.</p>
              <div className="flex flex-wrap gap-2 md:gap-3">
                {MY_EXPERTISE.map((skill, i) => (<span key={i} className="px-3 md:px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-xs md:text-sm">{skill}</span>))}
              </div>
            </div>
            
            <h3 className="text-xl md:text-2xl font-medium mb-6 md:mb-8 flex items-center gap-3"><Award className="text-yellow-500" size={24} /> Credentials & Certifications</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
              {MY_CERTIFICATIONS.map((cert, i) => (
                <div key={i} className="p-4 md:p-5 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                  <p className="text-[10px] md:text-xs text-gray-500 uppercase tracking-wider mb-1">{cert.issuer}</p>
                  <p className="font-medium text-sm text-gray-200">{cert.name}</p>
                </div>
              ))}
            </div>
          </FadeIn>
        </section>

        {/* Optimized Timeline */}
        <section id="timeline" className="py-20 md:py-32 border-t border-white/10">
          <FadeIn>
            <h2 className="text-3xl md:text-5xl font-medium tracking-tight mb-10 md:mb-16">Career Journey.</h2>
            {/* Margins adjusted here to prevent mobile dot clipping */}
            <div className="max-w-3xl ml-8 md:ml-10 border-l border-white/20 pl-6 md:pl-8 relative space-y-10 md:space-y-12">
              {MY_EXPERIENCE.map((job, i) => (
                <div key={i} className="relative">
                  {/* The dot is precisely positioned based on the pl-6/pl-8 padding */}
                  <span className="absolute -left-[35px] md:-left-[43px] top-1 h-4 w-4 md:h-5 md:w-5 rounded-full bg-black border-2 border-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]"></span>
                  <div className="flex flex-col md:flex-row md:items-baseline gap-1 md:gap-2 mb-2">
                    <h3 className="text-lg md:text-xl font-medium">{job.role}</h3>
                    <span className="text-gray-500 text-xs md:text-sm md:ml-auto">{job.period}</span>
                  </div>
                  <p className="text-blue-400 font-medium text-sm md:text-base mb-2 md:mb-3 flex flex-wrap items-center gap-x-4 gap-y-1">
                    <span className="flex items-center gap-2"><Briefcase size={16} /> {job.company}</span>
                    {job.location && <span className="flex items-center gap-1.5 text-gray-500 text-xs md:text-sm font-normal"><MapPin size={14} /> {job.location}</span>}
                  </p>
                  <p className="text-gray-400 font-light text-sm md:text-base">{job.description}</p>
                  {job.highlights.length > 0 && (
                    <ul className="mt-3 space-y-1.5">
                      {job.highlights.map((point, j) => (
                        <li key={j} className="text-gray-400 font-light text-sm flex gap-2"><span className="text-blue-500 mt-[2px]">▹</span><span>{point}</span></li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </FadeIn>
        </section>

        {/* Optimized Work */}
        <section id="work" className="py-20 md:py-32 border-t border-white/10">
          <FadeIn>
            <h2 className="text-3xl md:text-5xl font-medium tracking-tight mb-4 md:mb-6">Selected Work.</h2>
            <p className="text-gray-400 font-light text-base md:text-lg mb-10 md:mb-16 max-w-2xl">Open-source platforms I design and build — self-hosted, containerised, and focused on identity, governance and security operations across the Microsoft cloud.</p>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 mb-16 md:mb-20">
              {FEATURED_PROJECTS.map((project, i) => (
                <div key={i} className={`relative overflow-hidden bg-gradient-to-br ${project.accent} to-white/[0.02] border border-white/10 rounded-2xl md:rounded-3xl p-6 md:p-8 hover:border-white/20 transition-colors duration-500 flex flex-col h-full`}>
                  <div className="flex items-start justify-between gap-4 mb-4 md:mb-5">
                    <div className="p-2.5 rounded-xl bg-black/30 border border-white/10">{project.icon}</div>
                    <span className="text-[10px] md:text-xs text-gray-400 px-3 py-1 rounded-full border border-white/10 bg-black/20 text-right">{project.status}</span>
                  </div>
                  <h3 className="text-xl md:text-2xl font-medium">{project.title}</h3>
                  <p className="text-xs md:text-sm text-gray-500 uppercase tracking-wider mt-1 mb-3 md:mb-4">{project.subtitle}</p>
                  <p className="text-gray-300 font-light text-sm md:text-base mb-5">{project.description}</p>
                  <ul className="space-y-1.5 mb-6">
                    {project.highlights.map((point, j) => (
                      <li key={j} className="text-gray-400 font-light text-sm flex gap-2"><span className="text-white/40 mt-[2px]">▹</span><span>{point}</span></li>
                    ))}
                  </ul>
                  {project.image && (
                    <div className="mb-6 rounded-xl overflow-hidden border border-white/10 bg-black/40 h-48 md:h-56">
                      <img src={project.image.src} alt={project.image.alt} loading="lazy" className={`w-full h-full ${project.image.contain ? "object-contain p-3" : "object-cover object-left-top"}`} />
                    </div>
                  )}
                  <div className="flex flex-wrap gap-1.5 md:gap-2 mb-6">
                    {project.tech.map((t, j) => (<span key={j} className="px-2.5 py-1 rounded-md bg-black/30 border border-white/10 text-[11px] md:text-xs text-gray-300">{t}</span>))}
                  </div>
                  <div className="flex gap-4 mt-auto border-t border-white/10 pt-4">
                    {project.github && <a href={project.github} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 md:gap-2 text-xs md:text-sm text-gray-400 hover:text-white transition-colors"><Github size={16} /> Source</a>}
                    {project.demo && <a href={project.demo} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 md:gap-2 text-xs md:text-sm text-gray-400 hover:text-white transition-colors"><ExternalLink size={16} /> {project.demo.includes("hub.docker.com") ? "Docker Hub" : "Demo"}</a>}
                    {!project.github && !project.demo && <span className="text-xs md:text-sm text-gray-500">{project.note || "Public release coming soon"}</span>}
                  </div>
                </div>
              ))}
            </div>

            <h3 className="text-xl md:text-2xl font-medium mb-6 md:mb-8">More Tools & Projects</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {MY_PROJECTS.map((project, i) => (
                <div key={i} className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl md:rounded-3xl p-6 md:p-8 hover:bg-white/10 transition-colors duration-500 flex flex-col h-full">
                  {project.icon}
                  <h3 className="text-lg md:text-xl font-medium mb-3 md:mb-4">{project.title}</h3>
                  <p className="text-gray-400 font-light text-sm md:text-base flex-grow mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {project.tech.map((t, j) => (<span key={j} className="px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-[11px] text-gray-400">{t}</span>))}
                  </div>
                  <div className="flex gap-4 mt-auto border-t border-white/10 pt-4">
                    {project.github && <a href={project.github} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 md:gap-2 text-xs md:text-sm text-gray-400 hover:text-white transition-colors"><Github size={16} /> Source</a>}
                    {project.demo && <a href={project.demo} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 md:gap-2 text-xs md:text-sm text-gray-400 hover:text-white transition-colors"><ExternalLink size={16} /> Demo</a>}
                  </div>
                </div>
              ))}
            </div>
          </FadeIn>
        </section>

        {/* Optimized Hobbies */}
        <section id="hobbies" className="py-20 md:py-32 border-t border-white/10">
          <FadeIn>
            <div className="bg-gradient-to-br from-white/5 to-white/0 border border-white/10 rounded-2xl md:rounded-3xl p-6 md:p-12 relative overflow-hidden">
              <Compass className="text-white/5 absolute -right-10 -bottom-10 md:w-[250px] md:h-[250px]" size={180} />
              <div className="relative z-10 max-w-2xl">
                <h2 className="text-2xl md:text-4xl font-medium tracking-tight mb-4 md:mb-6">Beyond the Screen.</h2>
                <p className="text-base md:text-lg text-gray-400 font-light leading-relaxed mb-4 md:mb-6">When I am not architecting cloud security solutions, you will likely find me on two wheels. I own a Royal Enfield Himalayan 450 and a KTM 390 Adventure, and actively ride with my local motorcycle club.</p>
                <p className="text-base md:text-lg text-gray-400 font-light leading-relaxed">I love blending my technical skills with my passions—which is exactly how the <strong>Jahmed MotoHub</strong> web app was born, giving our riding community a dedicated digital home.</p>
              </div>
            </div>
          </FadeIn>
        </section>

        {/* Optimized Contact */}
        <section id="contact" className="py-20 md:py-32 border-t border-white/10 text-center mt-10">
          <FadeIn>
            <h2 className="text-3xl sm:text-4xl md:text-6xl font-medium tracking-tight mb-8 md:mb-10">Let's build something secure.</h2>
            <a href={PROFILE.links.email} className="inline-flex items-center gap-2 bg-white text-black px-6 md:px-8 py-3 md:py-4 rounded-full text-sm md:text-base font-medium hover:scale-105 transition-transform">Get in Touch <Mail size={18} /></a>
            <div className="mt-20 md:mt-32 text-gray-500 text-xs md:text-sm flex flex-col md:flex-row justify-center items-center gap-2">
              <p>&copy; {new Date().getFullYear()} {PROFILE.name}. All rights reserved.</p>
            </div>
          </FadeIn>
        </section>
      </main>
    </div>
  );
}
