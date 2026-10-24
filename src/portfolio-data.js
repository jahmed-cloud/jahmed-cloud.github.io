import { Activity, Fingerprint, Radar, ScrollText, Lock, KeyRound, Bot, LifeBuoy, Eraser, ShieldCheck, Printer, Bike, Server, Shield, Cloud, Workflow, Monitor } from 'lucide-react';

// ==========================================
// 1. YOUR PERSONAL DATA (GitHub Pages Fallback)
// ==========================================
export const DEFAULT_DATA = {
  name: "Junaid Ahmed",
  tagline: "Cloud Security & Identity Architect",
  links: {
    linkedin: "https://linkedin.com/in/iamjahmed",
    github: "https://github.com/jahmed-cloud",
    email: "mailto:iam@jahmed.cloud",
    blog: "https://learncloud.guru",
    // Put a PDF at public/resume.pdf and set this to "/resume.pdf" to show the Resume button
    resume: ""
  }
};

// ==========================================
// 2. HYBRID LOGIC
// ==========================================
// window is undefined while the page is pre-rendered at build time
const env = (typeof window !== 'undefined' && window.ENV) || {};
export const PROFILE = {
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

// ==========================================
// 3. CONTENT
// ==========================================
export const AVAILABILITY = "Available for new opportunities"; // set to "" to hide the badge
export const HEADLINE = "I secure identities and cloud estates for global enterprises, and build open-source tools that make Entra ID, Azure and Microsoft 365 safer to run.";
export const CURRENT_ROLE = { title: "Technology Manager - Cloud Security & Identity", company: "Ernst & Young (EY)", location: "Bengaluru, India" };
export const FOCUS = "Entra ID · Zero Trust · PAW · Azure governance";
export const TOP_CERTS = ["SC-100", "AZ-305", "CISM", "MCT"];

export const MY_STATS = [
  { value: "10+", label: "Years in cloud & identity" },
  { value: "100K+", label: "Users under Zero Trust designs" },
  { value: "50+", label: "Enterprises across identity designs" },
  { value: "3", label: "Public flagship projects" }
];

export const SKILL_GROUPS = [
  { title: "Identity & Zero Trust", icon: Shield, skills: ["Entra ID & Identity Governance", "PIM / JIT & Conditional Access", "Passwordless (FIDO2 · WHfB)", "Privileged Access Workstations", "Zero Trust architecture"] },
  { title: "Cloud Governance", icon: Cloud, skills: ["Azure Landing Zones & Management Groups", "Azure Policy as Code", "CAF / WAF reviews", "FinOps & cost governance", "Defender XDR & Sentinel"] },
  { title: "Automation & IaC", icon: Workflow, skills: ["Terraform", "PowerShell & Python", "Azure Automation & Logic Apps", "GitHub Actions & Azure DevOps", "Docker"] },
  { title: "Modern Workplace", icon: Monitor, skills: ["Azure Virtual Desktop", "Windows 365", "Intune", "FSLogix", "Azure Arc & Update Manager"] }
];

export const MY_CERTIFICATIONS = [
  { code: "SC-100", name: "Cybersecurity Architect Expert", issuer: "Microsoft" },
  { code: "AZ-305", name: "Azure Solutions Architect Expert", issuer: "Microsoft" },
  { code: "CISM", name: "Certified Information Security Manager", issuer: "ISACA" },
  { code: "SC-300", name: "Identity & Access Administrator", issuer: "Microsoft" },
  { code: "AZ-104", name: "Azure Administrator Associate", issuer: "Microsoft" },
  { code: "MCT", name: "Microsoft Certified Trainer", issuer: "Microsoft" }
];
export const MY_AWARD = "Instructor Recognition Award - 100+ students trained (Skillable)";

export const MY_EXPERIENCE = [
  {
    role: "Technology Manager - Cloud Security & Identity", company: "Ernst & Young (EY)", period: "May 2025 – Present", location: "Bengaluru",
    description: "Leading a cloud security team delivering enterprise identity programmes aligned to C-suite risk and compliance objectives.",
    highlights: ["Zero Trust & passwordless (FIDO2 + WHfB) programme for 10,000+ users - identity helpdesk tickets down 50%", "Automated PIM/JIT lifecycle removing standing access for 200+ admin accounts", "Terraform-enforced RBAC model aligned to ICFR - audit findings down 30%, full SoD compliance"]
  },
  {
    role: "Senior Consultant - Identity & Security", company: "Concentrix (Microsoft Partner)", period: "Aug 2023 – May 2025", location: "Pune",
    description: "Global Delivery Hub architect for multi-region enterprise identity and cloud designs.",
    highlights: ["Passwordless & Conditional Access strategies for 100,000+ users across 50+ enterprises", "Migrated 40,000+ machines off on-prem SCCM to cloud-first update management", "15–20% cloud cost savings across 20+ WAF/CAF reviews"]
  },
  {
    role: "Lead Consultant - Cloud & Identity", company: "Allyis (Microsoft Partner)", period: "Jun 2021 – Aug 2023", location: "Hyderabad",
    description: "Led a global team of 10+ engineers on the Microsoft Amplify Programme.",
    highlights: ["KQL & Azure Workbooks observability - MTTR improved by 60%", "Azure Firewall & hub-spoke designs protecting 1,000+ VMs", "98% on-time delivery; user onboarding effort cut by 70% via automation"]
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

// Accent colours per project, readable in both themes
export const TONES = {
  blue: { icon: "bg-blue-500/10 text-blue-600 dark:text-blue-400", dot: "bg-blue-500" },
  emerald: { icon: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400", dot: "bg-emerald-500" },
  violet: { icon: "bg-violet-500/10 text-violet-600 dark:text-violet-400", dot: "bg-violet-500" },
  amber: { icon: "bg-amber-500/10 text-amber-600 dark:text-amber-400", dot: "bg-amber-500" },
  red: { icon: "bg-red-500/10 text-red-600 dark:text-red-400", dot: "bg-red-500" },
  cyan: { icon: "bg-cyan-500/10 text-cyan-600 dark:text-cyan-400", dot: "bg-cyan-500" },
  pink: { icon: "bg-pink-500/10 text-pink-600 dark:text-pink-400", dot: "bg-pink-500" },
  sky: { icon: "bg-sky-500/10 text-sky-600 dark:text-sky-400", dot: "bg-sky-500" },
  orange: { icon: "bg-orange-500/10 text-orange-600 dark:text-orange-400", dot: "bg-orange-500" },
  indigo: { icon: "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400", dot: "bg-indigo-500" }
};

// Flagship platforms - large cards
export const FEATURED_PROJECTS = [
  {
    title: "EntraGuard", tagline: "Identity Security Posture Management", status: "Open source", tone: "emerald", icon: Fingerprint,
    summary: "Continuously assesses a Microsoft Entra ID tenant. Every finding comes with the risk in plain English, step-by-step remediation, affected objects and evidence.",
    // Pull count is the API image on Docker Hub (964 on 23 Oct 2026); each install pulls both images, so they aren't added together
    metrics: ["115 checks", "12 security domains", "NIST · CIS · ISO mapped", "950+ pulls · Oct 2026"],
    highlights: ["Conditional Access, MFA, PIM, guest access, break-glass and app & service principal hygiene", "Scans in under 5 minutes, scheduled daily", "Exceptions workflow and effort-based remediation plans", "Multi-arch Docker images (amd64 / arm64)"],
    tech: ["Python", "FastAPI", "Celery", "React", "PostgreSQL", "Docker"],
    github: "https://github.com/jahmed-cloud/entra-guard", demo: "https://hub.docker.com/r/jahmed22/entra-guard-api"
  },
  {
    title: "Azure Resource Guardian", tagline: "Discover. Govern. Optimize.", status: "Open source · v0.2", tone: "violet", icon: Radar,
    summary: "A single pane of glass for an Azure estate: idle and orphaned resources, savings, Azure Policy effectiveness, Entra ID hygiene and Terraform drift - with approval-based remediation.",
    metrics: ["76 scanners", "Savings per resource", "SARIF / JUnit CI gates"],
    highlights: ["20+ orphan and idle resource checks across compute, network, storage and databases", "Monthly and annual savings projections from Azure Cost Management", "\"What governs this resource?\" Azure Policy analysis", "CAF + Zero Trust governance scoring"],
    tech: ["Python 3.12", "FastAPI", "React", "Celery", "PostgreSQL", "Resource Graph"],
    github: "https://github.com/jahmed-cloud/ARG", demo: ""
  },
  {
    title: "AZPaC", tagline: "Azure Policy as Code", status: "Open source", tone: "amber", icon: ScrollText,
    summary: "Azure Policy managed in Terraform and reviewed through pull requests. Write a rule once, group it, choose where it applies - and every exemption has an owner and an expiry date.",
    metrics: ["Audit → enforce in one word", "Nightly drift checks", "Least-privilege pipelines"],
    highlights: ["Automatic effect downgrade in audit mode (Deny → Audit, DINE → AINE)", "Built-in and custom definitions side by side", "Azure DevOps pipelines for definitions, drift and remediation", "Separate service principals per pipeline"],
    tech: ["Terraform", "Azure Policy", "Azure DevOps"],
    github: "https://github.com/jahmed-cloud/AZPaC", demo: ""
  },
  {
    title: "Guardian365", tagline: "Microsoft 365 security monitoring", status: "In development", tone: "blue", icon: Activity,
    summary: "Self-hosted, multi-tenant security monitoring for Microsoft 365. Pulls signals from Microsoft Graph, Entra ID Protection, Intune, Defender XDR and Purview, plus endpoint agents, into one real-time dashboard.",
    metrics: ["Graph collection every 15 min", "60s alert rules", "Windows · Linux · macOS agents"],
    highlights: ["Risky users, sign-ins, Secure Score, Conditional Access and Defender incidents per tenant", "Alert engine with acknowledge/resolve workflow and z-score anomaly detection", "Go endpoint agent over mTLS: event logs, services, BitLocker, pending updates", "Alerts to Teams, Slack, Email, Webhook and PagerDuty"],
    tech: ["ASP.NET Core 9", "React + TS", "Node.js", "Go", "PostgreSQL", "ClickHouse", "Redis"],
    github: "", demo: ""
  },
  {
    title: "Entra MFA & TAP Portal", tagline: "Approval-driven MFA reset & Temporary Access Pass", status: "In development", tone: "cyan", icon: KeyRound,
    summary: "Resets MFA methods and issues Temporary Access Passes through an approval workflow. Privileged Graph scopes never reach the browser, and every action is audited.",
    metrics: ["Single / dual approval", "On-Behalf-Of to Graph", "Append-only audit"],
    highlights: ["MSAL sign-in with PKCE and group-derived permissions", "Manager-first approval with security-admin fallback and escalation", "Teams, Slack, webhook and SMTP notifications", "Horizontally scalable worker with Postgres leader election"],
    tech: ["ASP.NET Core 9", "React 19", "Fluent UI", "PostgreSQL", "Redis"],
    github: "", demo: ""
  },
  {
    title: "Privileged Access Workstations as Code", tagline: "PAW baselines for Entra ID & Intune", status: "Client work", tone: "red", icon: Lock,
    summary: "Hardened Privileged Access Workstations - physical or Azure Virtual Desktop - so admin roles can only be used from locked-down devices, delivered as version-controlled code.",
    metrics: ["Scenario presets", "Dry-run & idempotent", "Drift detection"],
    highlights: ["Device isolation, Conditional Access, compliance, AppLocker & WDAC, Autopilot and scope tags", "Presets for AVD, physical, cloud-only, pilot and compromise recovery", "Eligible-only PIM roles and break-glass alerting"],
    tech: ["PowerShell", "Microsoft Graph", "Intune", "Terraform", "AVD"],
    github: "", demo: "", note: "Client work - source not public"
  }
];

// One-line positioning shown at the top of the page
export const POSITIONING = "I make sure the right people, and only the right people, can reach your cloud.";

// What I'm building right now (shown in the hero grid)
export const NOW_BUILDING = { title: "Guardian365", note: "Self-hosted security monitoring for Microsoft 365" };

// The problem each flagship project solves, shown before what it does
export const PROJECT_PROBLEMS = {
  "EntraGuard": "Entra ID tenants drift: stale guests, weak Conditional Access, standing admin roles. Finding them by hand takes days.",
  "Azure Resource Guardian": "Azure estates collect idle resources, unowned costs and Azure Policy blind spots that nobody is looking at.",
  "AZPaC": "Azure Policy managed in the portal has no review, no history, and exemptions that quietly last for years.",
  "Guardian365": "Microsoft 365 security signals are spread across half a dozen admin portals, so incidents are spotted late.",
  "Entra MFA & TAP Portal": "Helpdesk MFA resets are a favourite target for social engineering, and are often done with too much access.",
  "Privileged Access Workstations as Code": "Admins doing privileged work from the same laptop they use for email and browsing."
};

// How I work - each principle points to where it shows up in my work
export const PRINCIPLES = [
  { title: "Least privilege, by default", text: "Standing admin access is a liability. Roles are eligible, not active; elevation is just-in-time; privileged work happens on hardened devices.", seenIn: ["PIM / JIT at EY", "PAW as code"] },
  { title: "Policy is code, and code gets reviewed", text: "Conditional Access, RBAC and Azure Policy change through pull requests, with history, review and rollback.", seenIn: ["AZPaC", "Terraform RBAC"] },
  { title: "Audit before you enforce", text: "Measure first. The list of things that fail is the list of work to do before switching enforcement on.", seenIn: ["AZPaC", "EntraGuard"] },
  { title: "Exceptions expire", text: "Every exemption has an owner and an end date, so a temporary exception can't quietly become permanent.", seenIn: ["AZPaC", "EntraGuard"] }
];

// Smaller tools & utilities - compact list
export const MORE_PROJECTS = [
  { title: "CloudSkills", description: "Azure architecture and FinOps reviews from an MCP server or CLI, exported as HTML, JSON and Mermaid reports.", icon: Bot, tone: "pink", tech: ["Node.js", "MCP", "Resource Graph"], link: "" },
  { title: "Entra Helpdesk Portal", description: "Keeps Tier 1/2 support out of the Entra admin centre, with mandatory ticket numbers and a full audit log.", icon: LifeBuoy, tone: "sky", tech: ["Python", "Microsoft Graph", "Docker"], link: "https://github.com/jahmed-cloud/entra-helpdesk" },
  { title: "Entra ID Environment Teardown", description: "Safely resets an Entra ID tenant with a domain safety lock, protected break-glass accounts and dry runs.", icon: Eraser, tone: "red", tech: ["PowerShell", "Microsoft Graph"], link: "https://github.com/jahmed-cloud/Entra-ID-Environment-Teardown" },
  { title: "PIM Role Assignment Export", description: "Exports every active and eligible PIM role assignment for access reviews and audits.", icon: ShieldCheck, tone: "blue", tech: ["PowerShell", "Graph SDK"], link: "https://github.com/jahmed-cloud/EntraID" },
  { title: "OpenPrint Server", description: "Docker-based CUPS print server for Raspberry Pi and Linux with a secure admin dashboard.", icon: Printer, tone: "orange", tech: ["Python", "Flask", "CUPS", "Docker"], link: "https://github.com/jahmed-cloud/OpenPrint-Server" },
  { title: "Jahmed MotoHub", description: "Containerised web app for my riding club, with rider management and automated CI/CD.", icon: Bike, tone: "amber", tech: ["Python", "Flask", "Docker"], link: "https://motohub.jahmed.cloud" },
  { title: "AVD Monitor", description: "KQL queries for Azure Monitor and Log Analytics to troubleshoot Azure Virtual Desktop.", icon: Server, tone: "indigo", tech: ["KQL", "Azure Monitor"], link: "https://github.com/jahmed-cloud/AVD-Monitor" }
];


