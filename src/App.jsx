import React, { useEffect, useRef, useState } from 'react';
import { Github, Linkedin, Mail, BookOpen, FileText, ArrowUpRight, ArrowRight, ChevronDown, Sun, Moon, MapPin, Bike, Camera, Check, Award } from 'lucide-react';
import {
  PROFILE, AVAILABILITY, HEADLINE, POSITIONING, NOW_BUILDING, TOP_CERTS, MY_STATS, SKILL_GROUPS, MY_CERTIFICATIONS, MY_AWARD,
  MY_EXPERIENCE, TONES, FEATURED_PROJECTS, PROJECT_PROBLEMS, PRINCIPLES, MORE_PROJECTS
} from './portfolio-data';

const NAV_LINKS = [
  { id: "work", label: "Work" },
  { id: "principles", label: "Principles" },
  { id: "experience", label: "Experience" },
  { id: "contact", label: "Contact" }
];

const SOCIALS = [
  { href: PROFILE.links.github, label: "GitHub", icon: Github },
  { href: PROFILE.links.linkedin, label: "LinkedIn", icon: Linkedin },
  { href: PROFILE.links.blog, label: "Blog", icon: BookOpen }
].filter((s) => s.href);

const isExternal = (href) => !href.startsWith('mailto:') && !href.startsWith('#');
const linkProps = (href) => (isExternal(href) ? { href, target: "_blank", rel: "noreferrer" } : { href });
const prefersReducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const initials = PROFILE.name.split(/\s+/).map((w) => w[0]).join('').slice(0, 2).toUpperCase();
const emailAddress = PROFILE.links.email ? PROFILE.links.email.replace(/^mailto:/, '').split('?')[0] : '';
const tile = "rounded-3xl border border-line bg-surface/80 backdrop-blur";
const label = "font-mono text-[11px] uppercase tracking-[0.18em] text-subtle";

// ==========================================
// Small pieces
// ==========================================
function ThemeToggle() {
  const toggle = (event) => {
    const root = document.documentElement;
    const apply = () => {
      const dark = !root.classList.contains('dark');
      root.classList.toggle('dark', dark);
      try { localStorage.setItem('theme', dark ? 'dark' : 'light'); } catch { /* storage blocked: theme still switches for this visit */ }
    };
    // Where supported, reveal the new theme as a circle growing from the button
    if (!document.startViewTransition || prefersReducedMotion()) return apply();
    const rect = event.currentTarget.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;
    const radius = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y));
    // If the browser skips the animation (e.g. tab not visible) these promises reject; the theme has still switched
    const ignore = () => {};
    const transition = document.startViewTransition(apply);
    transition.finished.catch(ignore);
    transition.updateCallbackDone.catch(ignore);
    transition.ready.then(() => {
      root.animate(
        { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
        { duration: 550, easing: 'cubic-bezier(0.4, 0, 0.2, 1)', pseudoElement: '::view-transition-new(root)' }
      );
    }).catch(ignore);
  };
  // Both icons render and CSS picks one, so the pre-rendered HTML matches either theme
  return (
    <button type="button" onClick={toggle} aria-label="Switch between light and dark mode" title="Switch light / dark mode"
      className="group grid h-8 w-8 place-items-center rounded-full text-muted transition-colors hover:bg-fg/[0.06] hover:text-fg">
      <Sun size={15} className="hidden transition-transform duration-500 motion-safe:group-hover:rotate-45 dark:block" />
      <Moon size={15} className="transition-transform duration-500 motion-safe:group-hover:-rotate-12 dark:hidden" />
    </button>
  );
}

function useActiveSection(ids) {
  const [active, setActive] = useState('');
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => { if (entry.isIntersecting) setActive(entry.target.id); });
    }, { rootMargin: '-40% 0px -55% 0px' });
    ['top', ...ids].forEach((id) => { const el = document.getElementById(id); if (el) observer.observe(el); });
    return () => observer.disconnect();
  }, []);
  return active;
}

// Counts "100K+" up from zero when it scrolls into view; the real value is rendered first for crawlers
function CountUp({ value }) {
  const [display, setDisplay] = useState(value);
  const ref = useRef(null);
  useEffect(() => {
    const match = value.match(/^(\d+)(.*)$/);
    if (!match || prefersReducedMotion() || !('IntersectionObserver' in window)) return;
    const target = Number(match[1]);
    const suffix = match[2];
    let frame;
    setDisplay(`0${suffix}`);
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      observer.disconnect();
      const start = performance.now();
      const tick = (now) => {
        const progress = Math.min((now - start) / 1400, 1);
        setDisplay(`${Math.round(target * (1 - Math.pow(1 - progress, 3)))}${suffix}`);
        if (progress < 1) frame = requestAnimationFrame(tick);
      };
      frame = requestAnimationFrame(tick);
    });
    observer.observe(ref.current);
    return () => { observer.disconnect(); cancelAnimationFrame(frame); };
  }, [value]);
  return <span ref={ref} className="tabular-nums">{display}</span>;
}

// Current time in Bengaluru. Rendered as --:-- in the pre-built HTML and filled in on load.
function LocalTime() {
  const [time, setTime] = useState('');
  useEffect(() => {
    const format = () => setTime(new Intl.DateTimeFormat('en-GB', { hour: '2-digit', minute: '2-digit', timeZone: 'Asia/Kolkata' }).format(new Date()));
    format();
    const timer = setInterval(format, 30000);
    return () => clearInterval(timer);
  }, []);
  return <span className="tabular-nums">{time || '--:--'}</span>;
}

function Disclosure({ text, children }) {
  return (
    <details className="group/details mt-4">
      <summary className="inline-flex cursor-pointer select-none items-center gap-1 text-sm font-medium text-accent hover:underline">
        {text} <ChevronDown size={15} className="transition-transform group-open/details:rotate-180" />
      </summary>
      {children}
    </details>
  );
}

function Bullets({ items }) {
  return (
    <ul className="mt-3 space-y-2">
      {items.map((item) => (
        <li key={item} className="flex gap-2.5 text-sm leading-relaxed text-muted">
          <span className="mt-[0.6rem] h-1 w-1 shrink-0 rounded-full bg-accent" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

function Section({ id, eyebrow, title, intro, children }) {
  return (
    <section id={id} className="scroll-mt-20 border-t border-line">
      <div className="mx-auto max-w-6xl px-4 py-20 md:px-6 md:py-28">
        <div className="reveal mb-12 max-w-2xl md:mb-16">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">{eyebrow}</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-5xl">{title}</h2>
          {intro && <p className="mt-4 leading-relaxed text-muted md:text-lg">{intro}</p>}
        </div>
        {children}
      </div>
    </section>
  );
}

// Profile written as a Conditional Access-style policy. Plain text, so crawlers read it too.
function PolicyCard() {
  const K = ({ children }) => <span className="text-sky-700 dark:text-sky-300">"{children}"</span>;
  const S = ({ children }) => <span className="text-emerald-700 dark:text-emerald-300">"{children}"</span>;
  const P = ({ children }) => <span className="text-subtle">{children}</span>;
  const lines = [
    <P>{'{'}</P>,
    <>{'  '}<K>displayName</K><P>: </P><S>{PROFILE.name}</S><P>,</P></>,
    <>{'  '}<K>role</K><P>: </P><S>{PROFILE.tagline}</S><P>,</P></>,
    <>{'  '}<K>state</K><P>: </P><S>enabled</S><P>,</P></>,
    <>{'  '}<K>conditions</K><P>{': {'}</P></>,
    <>{'    '}<K>experience</K><P>: </P><S>10+ years</S><P>,</P></>,
    <>{'    '}<K>scale</K><P>: </P><S>100K+ users</S><P>,</P></>,
    <>{'    '}<K>location</K><P>: </P><S>Bengaluru, IN</S></>,
    <>{'  '}<P>{'},'}</P></>,
    <>{'  '}<K>grantControls</K><P>{': ['}</P></>,
    <>{'    '}<S>{TOP_CERTS[0]}</S><P>, </P><S>{TOP_CERTS[1]}</S><P>,</P></>,
    <>{'    '}<S>{TOP_CERTS[2]}</S><P>, </P><S>{TOP_CERTS[3]}</S></>,
    <>{'  '}<P>]</P></>,
    <P>{'}'}</P>
  ];
  return (
    <figure className={`${tile} enter flex h-full flex-col overflow-hidden`} style={{ '--i': 1 }}>
      <div className="flex items-center gap-2 border-b border-line px-5 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-red-400/80" />
        <span className="h-2.5 w-2.5 rounded-full bg-amber-400/80" />
        <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/80" />
        <span className="ml-2 font-mono text-xs text-subtle">junaid.policy.json</span>
        <span className="ml-auto inline-flex items-center gap-1.5 rounded-full bg-ok/10 px-2.5 py-0.5 text-[11px] font-medium text-ok">
          <Check size={12} strokeWidth={3} /> Access granted
        </span>
      </div>
      <pre className="flex-1 overflow-x-auto px-5 py-5 font-mono text-[12.5px] leading-6 sm:text-[13px]">
        <code>
          {lines.map((line, i) => <span key={i} className="enter block" style={{ '--i': 2 + i * 0.35 }}>{line}</span>)}
        </code>
      </pre>
      <figcaption className="sr-only">Profile summary written as a Conditional Access policy</figcaption>
    </figure>
  );
}

// ==========================================
// Page
// ==========================================
export default function App() {
  const active = useActiveSection(NAV_LINKS.map((l) => l.id));

  useEffect(() => {
    window.__appReady = true;

    // Reveal content as it scrolls into view
    const elements = document.querySelectorAll('.reveal');
    let observer;
    if ('IntersectionObserver' in window) {
      observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      }, { rootMargin: '0px 0px -40px 0px' });
      elements.forEach((el) => observer.observe(el));
    } else {
      elements.forEach((el) => el.classList.add('is-visible'));
    }

    // Follow the OS light/dark setting until the visitor picks a theme with the toggle
    const media = window.matchMedia('(prefers-color-scheme: dark)');
    const onSystemChange = (e) => {
      let saved = null;
      try { saved = localStorage.getItem('theme'); } catch { /* ignore */ }
      if (!saved) document.documentElement.classList.toggle('dark', e.matches);
    };
    media.addEventListener?.('change', onSystemChange);

    return () => {
      observer?.disconnect();
      media.removeEventListener?.('change', onSystemChange);
    };
  }, []);

  return (
    <>
      <a href="#work" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-md focus:bg-fg focus:px-4 focus:py-2 focus:text-bg">Skip to content</a>
      <div aria-hidden="true" className="scroll-progress fixed inset-x-0 top-0 z-[60] h-0.5 bg-gradient-to-r from-accent via-violet-500 to-emerald-500" />

      {/* Floating pill navigation */}
      <header className="fixed inset-x-0 top-3 z-50 flex justify-center px-3 md:top-4">
        <nav aria-label="Main" className="flex items-center gap-0.5 rounded-full border border-line bg-surface/80 p-1 shadow-lg shadow-black/[0.04] backdrop-blur-xl dark:shadow-black/40">
          <a href="#top" aria-label="Back to top" className="grid h-8 w-8 place-items-center rounded-full bg-fg text-[11px] font-bold text-bg">{initials}</a>
          {NAV_LINKS.map(({ id, label: text }) => (
            <a key={id} href={`#${id}`} aria-current={active === id ? "true" : undefined}
              className={`rounded-full px-2.5 py-1.5 text-xs font-medium transition-colors sm:px-3.5 sm:text-sm ${active === id ? "bg-fg/[0.07] text-fg" : "text-muted hover:text-fg"}`}>
              {text}
            </a>
          ))}
          <ThemeToggle />
        </nav>
      </header>

      <main>
        {/* ===== Hero: one screen of facts ===== */}
        <section id="top" className="relative overflow-hidden">
          <div aria-hidden="true" className="dot-grid pointer-events-none absolute inset-x-0 top-0 -z-10 h-[720px]" />
          <div aria-hidden="true" className="pointer-events-none absolute -top-40 left-1/2 -z-10 h-[420px] w-[min(900px,130vw)] -translate-x-1/2 rounded-full bg-accent/15 blur-3xl" />

          <div className="mx-auto max-w-6xl px-4 pb-20 pt-24 md:px-6 md:pb-28 md:pt-32">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-12">
              <div className={`${tile} enter flex flex-col justify-between p-7 sm:col-span-2 md:p-10 lg:col-span-7`} style={{ '--i': 0 }}>
                <div>
                  {AVAILABILITY && (
                    <p className="inline-flex items-center gap-2 rounded-full border border-line px-3 py-1 text-xs font-medium text-muted">
                      <span className="relative flex h-1.5 w-1.5">
                        <span className="absolute inline-flex h-full w-full rounded-full bg-ok opacity-75 motion-safe:animate-ping" />
                        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-ok" />
                      </span>
                      {AVAILABILITY}
                    </p>
                  )}
                  <h1 className="mt-8">
                    <span className="block text-base font-medium text-fg md:text-lg">
                      {PROFILE.name} <span className="text-subtle">· {PROFILE.tagline}</span>
                    </span>
                    <span className="mt-4 block text-[2.4rem] font-semibold leading-[1.05] tracking-tight sm:text-5xl lg:text-[3.4rem]">{POSITIONING}</span>
                  </h1>
                  <p className="mt-6 max-w-xl leading-relaxed text-muted md:text-lg">{HEADLINE}</p>
                </div>
                <div className="mt-10 flex flex-wrap items-center gap-3">
                  <a href="#work" className="group inline-flex items-center gap-2 rounded-full bg-fg px-5 py-2.5 text-sm font-medium text-bg transition-opacity hover:opacity-90">
                    See the work <ArrowRight size={16} className="transition-transform motion-safe:group-hover:translate-x-1" />
                  </a>
                  {PROFILE.links.email && (
                    <a href={PROFILE.links.email} className="inline-flex items-center gap-2 rounded-full border border-line px-5 py-2.5 text-sm font-medium transition-colors hover:bg-fg/[0.05]"><Mail size={16} /> Email me</a>
                  )}
                  {PROFILE.links.resume && (
                    <a href={PROFILE.links.resume} download className="inline-flex items-center gap-2 rounded-full border border-line px-5 py-2.5 text-sm font-medium transition-colors hover:bg-fg/[0.05]"><FileText size={16} /> Resume</a>
                  )}
                  <span className="flex items-center">
                    {SOCIALS.map(({ href, label: text, icon: Icon }) => (
                      <a key={text} {...linkProps(href)} aria-label={text} title={text} className="grid h-10 w-10 place-items-center rounded-full text-muted transition-colors hover:bg-fg/[0.05] hover:text-fg"><Icon size={18} /></a>
                    ))}
                  </span>
                </div>
              </div>

              <div className="sm:col-span-2 lg:col-span-5"><PolicyCard /></div>

              <a href="#work" className={`${tile} enter group flex flex-col p-6 transition-colors hover:border-accent/50 lg:col-span-3`} style={{ '--i': 3 }}>
                <p className={`${label} flex items-center gap-2`}>
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="absolute inline-flex h-full w-full rounded-full bg-accent opacity-75 motion-safe:animate-ping" />
                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
                  </span>
                  Now building
                </p>
                <p className="mt-5 flex items-center justify-between text-xl font-semibold tracking-tight">
                  {NOW_BUILDING.title}
                  <ArrowUpRight size={18} className="text-subtle transition-transform motion-safe:group-hover:-translate-y-0.5 motion-safe:group-hover:translate-x-0.5" />
                </p>
                <p className="mt-1 text-sm leading-relaxed text-muted">{NOW_BUILDING.note}</p>
              </a>

              <dl className={`${tile} enter grid grid-cols-2 gap-x-4 gap-y-5 p-6 lg:col-span-3`} style={{ '--i': 4 }}>
                {MY_STATS.map((s) => (
                  <div key={s.label} className="flex flex-col-reverse">
                    <dt className="mt-0.5 text-[11px] leading-snug text-subtle">{s.label}</dt>
                    <dd className="text-2xl font-semibold tracking-tight"><CountUp value={s.value} /></dd>
                  </div>
                ))}
              </dl>

              <div className={`${tile} enter flex flex-col p-6 lg:col-span-3`} style={{ '--i': 5 }}>
                <p className={label}>Local time</p>
                <p className="mt-5 text-3xl font-semibold tracking-tight"><LocalTime /></p>
                <p className="mt-1 flex items-center gap-1 text-sm text-muted"><MapPin size={13} /> Bengaluru, India · IST</p>
              </div>

              <div className={`${tile} enter flex flex-col p-6 lg:col-span-3`} style={{ '--i': 6 }}>
                <p className={label}>Off the clock</p>
                <div className="mt-5 flex gap-2">
                  <span className="grid h-10 w-10 place-items-center rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400"><Bike size={19} /></span>
                  <span className="grid h-10 w-10 place-items-center rounded-xl bg-pink-500/10 text-pink-600 dark:text-pink-400"><Camera size={19} /></span>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-muted">Motorcycle enthusiast and photographer.</p>
              </div>
            </div>
          </div>
        </section>

        {/* ===== Work ===== */}
        <Section id="work" eyebrow="Selected work" title="Tools I built for problems I kept meeting"
          intro="Each one started as a task I was doing by hand for clients. The public ones are open source and run on your own infrastructure.">
          <div>
            {FEATURED_PROJECTS.map((p) => {
              const Icon = p.icon;
              return (
                <article key={p.title} className="reveal grid gap-6 border-t border-line py-10 first:border-t-0 first:pt-0 lg:grid-cols-12 lg:gap-10">
                  <div className="lg:col-span-4">
                    <div className="flex items-center gap-3">
                      <span className={`grid h-11 w-11 place-items-center rounded-xl ${TONES[p.tone].icon}`}><Icon size={22} /></span>
                      <span className="rounded-full border border-line px-2.5 py-0.5 text-[11px] font-medium text-subtle">{p.status}</span>
                    </div>
                    <h3 className="mt-5 text-2xl font-semibold tracking-tight">{p.title}</h3>
                    <p className="mt-1 text-sm text-subtle">{p.tagline}</p>
                    <p className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-sm">
                      {p.github && <a {...linkProps(p.github)} className="inline-flex items-center gap-1.5 font-medium text-fg hover:text-accent"><Github size={15} /> Source</a>}
                      {p.demo && <a {...linkProps(p.demo)} className="inline-flex items-center gap-1 font-medium text-fg hover:text-accent">{p.demo.includes("hub.docker.com") ? "Docker Hub" : "Live demo"} <ArrowUpRight size={14} /></a>}
                      {!p.github && !p.demo && <span className="text-subtle">{p.note || "Public release coming soon"}</span>}
                    </p>
                  </div>
                  <div className="lg:col-span-5">
                    {PROJECT_PROBLEMS[p.title] && (
                      <>
                        <p className={label}>The problem</p>
                        <p className="mt-2 leading-relaxed text-fg">{PROJECT_PROBLEMS[p.title]}</p>
                      </>
                    )}
                    <p className={`${label} mt-6`}>What it does</p>
                    <p className="mt-2 text-sm leading-relaxed text-muted">{p.summary}</p>
                    <Disclosure text="Key features"><Bullets items={p.highlights} /></Disclosure>
                  </div>
                  <div className="lg:col-span-3">
                    <ul className="space-y-2.5">
                      {p.metrics.map((m) => (
                        <li key={m} className="flex items-start gap-2 text-sm font-medium">
                          <Check size={15} strokeWidth={2.5} className="mt-0.5 shrink-0 text-ok" />{m}
                        </li>
                      ))}
                    </ul>
                    <p className="mt-5 font-mono text-[11px] leading-relaxed text-subtle">{p.tech.join(" · ")}</p>
                  </div>
                </article>
              );
            })}
          </div>

          <div className="reveal mt-16 flex items-end justify-between gap-4">
            <h3 className="text-xl font-semibold tracking-tight">More tools</h3>
            {PROFILE.links.github && (
              <a {...linkProps(PROFILE.links.github)} className="group inline-flex items-center gap-1 text-sm font-medium text-muted hover:text-accent">
                All repositories <ArrowUpRight size={15} className="transition-transform motion-safe:group-hover:-translate-y-0.5 motion-safe:group-hover:translate-x-0.5" />
              </a>
            )}
          </div>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {MORE_PROJECTS.map((p, i) => {
              const Icon = p.icon;
              const Wrapper = p.link ? 'a' : 'div';
              return (
                <li key={p.title} className="reveal" style={{ '--stagger': i % 3 }}>
                  <Wrapper {...(p.link ? linkProps(p.link) : {})} className={`group flex h-full flex-col rounded-2xl border border-line bg-surface/60 p-5 transition-colors ${p.link ? "hover:border-accent/50" : ""}`}>
                    <div className="flex items-center justify-between">
                      <span className={`grid h-9 w-9 place-items-center rounded-lg ${TONES[p.tone].icon}`}><Icon size={17} /></span>
                      {p.link
                        ? <ArrowUpRight size={16} className="text-subtle transition-transform motion-safe:group-hover:-translate-y-0.5 motion-safe:group-hover:translate-x-0.5" />
                        : <span className="text-[11px] text-subtle">Coming soon</span>}
                    </div>
                    <p className="mt-4 font-medium">{p.title}</p>
                    <p className="mt-1 text-sm leading-relaxed text-muted">{p.description}</p>
                  </Wrapper>
                </li>
              );
            })}
          </ul>
        </Section>

        {/* ===== Principles ===== */}
        <Section id="principles" eyebrow="How I work" title="Four rules I design by"
          intro="The same ideas run through my client work and my projects.">
          <ol className="grid gap-4 sm:grid-cols-2">
            {PRINCIPLES.map((p, i) => (
              <li key={p.title} className={`${tile} reveal p-7`} style={{ '--stagger': i % 2 }}>
                <p className="font-mono text-sm text-accent">0{i + 1}</p>
                <h3 className="mt-4 text-xl font-semibold tracking-tight">{p.title}</h3>
                <p className="mt-3 leading-relaxed text-muted">{p.text}</p>
                <p className="mt-5 flex flex-wrap items-center gap-2">
                  <span className={label}>Seen in</span>
                  {p.seenIn.map((s) => <span key={s} className="rounded-full bg-fg/[0.05] px-2.5 py-0.5 text-xs font-medium">{s}</span>)}
                </p>
              </li>
            ))}
          </ol>
        </Section>

        {/* ===== Experience ===== */}
        <Section id="experience" eyebrow="Experience" title="10+ years in identity, security and cloud">
          <ol className="relative ml-1.5 border-l border-line">
            {MY_EXPERIENCE.map((job, i) => (
              <li key={job.company} className="reveal relative pb-12 pl-8 last:pb-0 md:pl-12">
                <span className={`absolute -left-[5px] top-1.5 h-2.5 w-2.5 rounded-full ring-4 ring-bg ${i === 0 ? "bg-accent" : "bg-subtle/60"}`} />
                <div className="grid gap-2 md:grid-cols-12 md:gap-8">
                  <p className="font-mono text-xs leading-6 text-subtle md:col-span-3">
                    {job.period}<span className="block">{job.location}</span>
                  </p>
                  <div className="md:col-span-9">
                    <h3 className="text-lg font-semibold tracking-tight">{job.role}</h3>
                    <p className="text-sm font-medium text-accent">{job.company}</p>
                    <p className="mt-2 leading-relaxed text-muted">{job.description}</p>
                    {job.highlights.length > 0 && <Bullets items={job.highlights} />}
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </Section>

        {/* ===== Credentials & skills ===== */}
        <Section id="credentials" eyebrow="Credentials" title="Certified, and still teaching">
          <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
            {MY_CERTIFICATIONS.map((c, i) => (
              <li key={c.code} className="reveal rounded-2xl border border-line bg-surface/60 p-5" style={{ '--stagger': i % 3 }}>
                <p className="font-mono text-base font-semibold text-accent">{c.code}</p>
                <p className="mt-2 text-sm leading-snug">{c.name}</p>
                <p className="mt-3 text-[11px] uppercase tracking-wider text-subtle">{c.issuer}</p>
              </li>
            ))}
          </ul>
          <p className="reveal mt-5 flex items-center gap-2 text-sm text-muted"><Award size={16} className="text-amber-500" /> {MY_AWARD}</p>

          <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {SKILL_GROUPS.map(({ title, icon: Icon, skills }, i) => (
              <div key={title} className="reveal" style={{ '--stagger': i }}>
                <h3 className="flex items-center gap-2 font-semibold"><Icon size={17} className="text-accent" /> {title}</h3>
                <ul className="mt-4 space-y-2 text-sm text-muted">
                  {skills.map((s) => <li key={s}>{s}</li>)}
                </ul>
              </div>
            ))}
          </div>
        </Section>

        {/* ===== Contact ===== */}
        <section id="contact" className="scroll-mt-20 border-t border-line">
          <div className="mx-auto max-w-6xl px-4 py-20 md:px-6 md:py-28">
            <div className="reveal relative overflow-hidden rounded-[2rem] bg-fg px-7 py-14 text-bg md:px-14 md:py-20">
              <div aria-hidden="true" className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-accent/40 blur-3xl" />
              <p className="relative font-mono text-xs uppercase tracking-[0.2em] text-bg/60">Contact</p>
              <h2 className="relative mt-4 max-w-3xl text-4xl font-semibold leading-[1.05] tracking-tight md:text-6xl">Let's talk about who has access to your cloud.</h2>
              <p className="relative mt-5 max-w-xl leading-relaxed text-bg/70">Identity, Zero Trust, privileged access or Azure governance, or one of the projects above. I read every message.</p>
              <div className="relative mt-10 flex flex-wrap gap-3">
                {PROFILE.links.email && (
                  <a href={PROFILE.links.email} className="group inline-flex items-center gap-2 rounded-full bg-bg px-6 py-3 text-sm font-semibold text-fg transition-opacity hover:opacity-90">
                    <Mail size={16} /> {emailAddress}
                  </a>
                )}
                {PROFILE.links.linkedin && <a {...linkProps(PROFILE.links.linkedin)} className="inline-flex items-center gap-2 rounded-full border border-bg/25 px-6 py-3 text-sm font-medium transition-colors hover:bg-bg/10"><Linkedin size={16} /> LinkedIn</a>}
                {PROFILE.links.github && <a {...linkProps(PROFILE.links.github)} className="inline-flex items-center gap-2 rounded-full border border-bg/25 px-6 py-3 text-sm font-medium transition-colors hover:bg-bg/10"><Github size={16} /> GitHub</a>}
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-line">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-8 text-sm text-subtle sm:flex-row sm:items-center sm:justify-between md:px-6">
          <p>© {new Date().getFullYear()} {PROFILE.name}</p>
          <a href="#top" className="hover:text-fg">Back to top ↑</a>
        </div>
      </footer>
    </>
  );
}
