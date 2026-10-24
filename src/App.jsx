import React, { useEffect, useRef, useState } from 'react';
import { Github, Linkedin, Mail, BookOpen, FileText, ArrowUpRight, ChevronDown, Sun, Moon, Award, Bike, Camera } from 'lucide-react';
import {
  PROFILE, AVAILABILITY, HEADLINE, TOP_CERTS, MY_STATS, SKILL_GROUPS, MY_CERTIFICATIONS, MY_AWARD,
  MY_EXPERIENCE, TONES, FEATURED_PROJECTS, MORE_PROJECTS
} from './portfolio-data';

// Split layout: identity and navigation stay pinned on the left (desktop), content scrolls on the right.

const NAV_LINKS = [
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "contact", label: "Contact" }
];

const SOCIALS = [
  { href: PROFILE.links.github, label: "GitHub", icon: Github },
  { href: PROFILE.links.linkedin, label: "LinkedIn", icon: Linkedin },
  { href: PROFILE.links.blog, label: "Blog", icon: BookOpen },
  { href: PROFILE.links.email, label: "Email", icon: Mail }
].filter((s) => s.href);

const isExternal = (href) => !href.startsWith('mailto:') && !href.startsWith('#');
const linkProps = (href) => (isExternal(href) ? { href, target: "_blank", rel: "noreferrer" } : { href });
const prefersReducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const projectLink = (title) => FEATURED_PROJECTS.find((p) => p.title === title)?.github;

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
      className="group grid h-9 w-9 place-items-center rounded-full border border-line text-muted transition-colors hover:border-accent hover:text-accent">
      <Sun size={16} className="hidden transition-transform duration-500 motion-safe:group-hover:rotate-45 dark:block" />
      <Moon size={16} className="transition-transform duration-500 motion-safe:group-hover:-rotate-12 dark:hidden" />
    </button>
  );
}

// Soft light that follows the mouse on desktop
function Spotlight() {
  const ref = useRef(null);
  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches || prefersReducedMotion()) return;
    const el = ref.current;
    const move = (e) => {
      el.style.setProperty('--x', `${e.clientX}px`);
      el.style.setProperty('--y', `${e.clientY}px`);
      el.style.opacity = '1';
    };
    window.addEventListener('pointermove', move, { passive: true });
    return () => window.removeEventListener('pointermove', move);
  }, []);
  return <div ref={ref} aria-hidden="true" className="spotlight pointer-events-none fixed inset-0 z-0 opacity-0 transition-opacity duration-700" />;
}

// Which section is in view, for the nav indicator
function useActiveSection(ids) {
  const [active, setActive] = useState(ids[0]);
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => { if (entry.isIntersecting) setActive(entry.target.id); });
    }, { rootMargin: '-35% 0px -60% 0px' });
    ids.forEach((id) => { const el = document.getElementById(id); if (el) observer.observe(el); });
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

function Section({ id, label, children }) {
  return (
    <section id={id} aria-label={label} className="mb-20 scroll-mt-16 md:mb-28 lg:mb-36 lg:scroll-mt-24">
      {/* On phones the section name sticks to the top; on desktop the pinned nav does that job */}
      <div className="sticky top-0 z-20 -mx-6 mb-6 bg-bg/80 px-6 py-5 backdrop-blur md:-mx-12 md:px-12 lg:sr-only">
        <h2 className="text-sm font-bold uppercase tracking-widest text-fg">{label}</h2>
      </div>
      {children}
    </section>
  );
}

function Pill({ children }) {
  return <li className="rounded-full bg-accent/10 px-3 py-1 text-xs font-medium leading-5 text-accent">{children}</li>;
}

function Disclosure({ label, children }) {
  return (
    <details className="group/details mt-3">
      <summary className="inline-flex cursor-pointer select-none items-center gap-1 text-sm font-medium text-muted transition-colors hover:text-accent">
        {label} <ChevronDown size={15} className="transition-transform group-open/details:rotate-180" />
      </summary>
      {children}
    </details>
  );
}

function Bullets({ items }) {
  return (
    <ul className="mt-3 space-y-1.5">
      {items.map((item) => (
        <li key={item} className="flex gap-2.5 text-sm leading-relaxed text-muted">
          <span className="mt-[0.55rem] h-1 w-1 shrink-0 rounded-full bg-accent" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

// Hover card used by the experience and project lists: on desktop the hovered row lights up and the others dim
function Row({ children, stagger = 0 }) {
  return (
    <li className="reveal mb-12" style={{ '--stagger': stagger }}>
      <div className="group relative grid gap-2 pb-1 transition-all duration-300 sm:grid-cols-8 sm:gap-6 lg:hover:!opacity-100 lg:group-hover/list:opacity-50">
        <div className="absolute -inset-x-4 -inset-y-4 z-0 hidden rounded-xl transition motion-reduce:transition-none lg:-inset-x-6 lg:block lg:group-hover:bg-surface/70 lg:group-hover:shadow-[inset_0_1px_0_0_rgb(var(--line)/0.8)] lg:group-hover:drop-shadow-lg" />
        {children}
      </div>
    </li>
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
      <a href="#content" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-fg focus:px-4 focus:py-2 focus:text-bg">Skip to content</a>
      <div aria-hidden="true" className="scroll-progress fixed inset-x-0 top-0 z-50 h-0.5 bg-gradient-to-r from-accent via-sky-500 to-violet-500" />
      <Spotlight />

      <div id="top" className="relative z-10 mx-auto min-h-screen max-w-screen-xl px-6 py-12 md:px-12 md:py-20 lg:px-24 lg:py-0">
        <div className="lg:flex lg:justify-between lg:gap-8">

          {/* ===== Pinned identity column ===== */}
          <header className="lg:sticky lg:top-0 lg:flex lg:max-h-screen lg:w-[46%] lg:flex-col lg:justify-between lg:py-24">
            <div>
              {AVAILABILITY && (
                <p className="enter mb-6 inline-flex items-center gap-2 rounded-full border border-line px-3 py-1 text-xs font-medium text-muted" style={{ '--i': 0 }}>
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75 motion-safe:animate-ping" />
                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  </span>
                  {AVAILABILITY}
                </p>
              )}
              <h1 className="enter text-4xl font-bold tracking-tight text-fg sm:text-5xl" style={{ '--i': 1 }}>
                <a href="#top">{PROFILE.name}</a>
              </h1>
              <p className="enter mt-3 text-lg font-medium tracking-tight text-fg sm:text-xl" style={{ '--i': 2 }}>{PROFILE.tagline}</p>
              <p className="enter mt-4 max-w-sm leading-relaxed text-muted" style={{ '--i': 3 }}>{HEADLINE}</p>
              <ul className="enter mt-6 flex flex-wrap gap-2" style={{ '--i': 4 }} aria-label="Key certifications">
                {TOP_CERTS.map((c) => (
                  <li key={c} className="rounded-md border border-line px-2 py-1 font-mono text-[11px] font-semibold tracking-wide text-muted">{c}</li>
                ))}
              </ul>

              <nav className="enter hidden lg:block" style={{ '--i': 5 }} aria-label="Sections">
                <ul className="mt-14 w-max">
                  {NAV_LINKS.map(({ id, label }) => {
                    const isActive = active === id;
                    return (
                      <li key={id}>
                        <a href={`#${id}`} aria-current={isActive ? "true" : undefined} className="group flex items-center py-3">
                          <span className={`mr-4 h-px transition-all motion-reduce:transition-none group-hover:w-16 group-hover:bg-fg group-focus-visible:w-16 group-focus-visible:bg-fg ${isActive ? "w-16 bg-fg" : "w-8 bg-subtle"}`} />
                          <span className={`text-xs font-bold uppercase tracking-widest transition-colors group-hover:text-fg group-focus-visible:text-fg ${isActive ? "text-fg" : "text-subtle"}`}>{label}</span>
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </nav>
            </div>

            <div className="enter mt-8 flex items-center gap-1" style={{ '--i': 6 }}>
              {SOCIALS.map(({ href, label, icon: Icon }) => (
                <a key={label} {...linkProps(href)} aria-label={label} title={label} className="grid h-9 w-9 place-items-center rounded-full text-subtle transition-colors hover:text-accent">
                  <Icon size={20} />
                </a>
              ))}
              {PROFILE.links.resume && (
                <a href={PROFILE.links.resume} download aria-label="Resume" title="Resume" className="grid h-9 w-9 place-items-center rounded-full text-subtle transition-colors hover:text-accent"><FileText size={20} /></a>
              )}
              <span className="mx-3 h-5 w-px bg-line" />
              <ThemeToggle />
            </div>
          </header>

          {/* ===== Scrolling content ===== */}
          <main id="content" className="pt-20 lg:w-[54%] lg:py-24">

            <Section id="about" label="About">
              <div className="reveal space-y-4 leading-relaxed text-muted">
                <p>
                  I'm a cloud security and identity architect with 10+ years of helping enterprises decide <span className="font-medium text-fg">who gets access to what, and prove it</span>.
                  Today I lead cloud security and identity work as a Technology Manager at <span className="font-medium text-fg">EY</span>, focused on Zero Trust, passwordless, privileged access and Azure governance.
                </p>
                <p>
                  Before that, as a Microsoft partner consultant at <span className="font-medium text-fg">Concentrix</span>, I designed passwordless and Conditional Access strategies covering 100,000+ users across 50+ enterprises,
                  after leading delivery teams at <span className="font-medium text-fg">Allyis</span> and <span className="font-medium text-fg">Convergys</span>.
                </p>
                <p>
                  Outside client work I build open-source tools for the jobs I kept doing by hand:{" "}
                  <a {...linkProps(projectLink("EntraGuard"))} className="font-medium text-fg underline decoration-accent/40 underline-offset-4 transition-colors hover:text-accent hover:decoration-accent">EntraGuard</a> for Entra ID posture,{" "}
                  <a {...linkProps(projectLink("Azure Resource Guardian"))} className="font-medium text-fg underline decoration-accent/40 underline-offset-4 transition-colors hover:text-accent hover:decoration-accent">Azure Resource Guardian</a> for governance and cost, and{" "}
                  <a {...linkProps(projectLink("AZPaC"))} className="font-medium text-fg underline decoration-accent/40 underline-offset-4 transition-colors hover:text-accent hover:decoration-accent">AZPaC</a> for Azure Policy as code.
                </p>
                <p className="flex items-center gap-2">
                  <Bike size={16} className="text-subtle" /><Camera size={16} className="text-subtle" />
                  <span>Off the clock, I'm a motorcycle enthusiast and photographer.</span>
                </p>
              </div>

              <dl className="reveal mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-4">
                {MY_STATS.map((s) => (
                  <div key={s.label} className="flex flex-col-reverse bg-bg p-4">
                    <dt className="mt-1 text-xs leading-snug text-subtle">{s.label}</dt>
                    <dd className="text-2xl font-semibold tracking-tight text-fg"><CountUp value={s.value} /></dd>
                  </div>
                ))}
              </dl>
            </Section>

            <Section id="experience" label="Experience">
              <ol className="group/list">
                {MY_EXPERIENCE.map((job) => (
                  <Row key={job.company}>
                    <header className="z-10 mt-1 text-xs font-semibold uppercase tracking-wide text-subtle sm:col-span-2">
                      {job.period}
                      <span className="mt-1 block font-normal normal-case tracking-normal">{job.location}</span>
                    </header>
                    <div className="z-10 sm:col-span-6">
                      <h3 className="font-medium leading-snug text-fg">
                        {job.role} <span className="text-subtle">·</span> <span className="text-accent">{job.company}</span>
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-muted">{job.description}</p>
                      {job.highlights.length > 0 && <Bullets items={job.highlights} />}
                    </div>
                  </Row>
                ))}
              </ol>
            </Section>

            <Section id="projects" label="Projects">
              <ol className="group/list">
                {FEATURED_PROJECTS.map((p) => {
                  const Icon = p.icon;
                  return (
                    <Row key={p.title}>
                      <div className="z-10 sm:col-span-2 sm:pt-1">
                        <span className={`grid h-11 w-11 place-items-center rounded-xl transition-transform duration-300 motion-safe:group-hover:scale-110 ${TONES[p.tone].icon}`}><Icon size={22} /></span>
                        <p className="mt-3 text-[11px] font-semibold uppercase tracking-wide text-subtle">{p.status}</p>
                      </div>
                      <div className="z-10 sm:col-span-6">
                        <h3 className="font-medium leading-snug text-fg">
                          {p.github ? (
                            <a {...linkProps(p.github)} className="group/link inline-flex items-baseline gap-1 transition-colors hover:text-accent focus-visible:text-accent">
                              {p.title}
                              <ArrowUpRight size={15} className="translate-y-0.5 transition-transform motion-safe:group-hover/link:-translate-y-0 motion-safe:group-hover/link:translate-x-0.5" />
                            </a>
                          ) : p.title}
                        </h3>
                        <p className="text-sm text-subtle">{p.tagline}</p>
                        <p className="mt-2 text-sm leading-relaxed text-muted">{p.summary}</p>
                        <ul className="mt-3 flex flex-wrap gap-2" aria-label="Highlights">
                          {p.metrics.map((m) => <Pill key={m}>{m}</Pill>)}
                        </ul>
                        <Disclosure label="Key features"><Bullets items={p.highlights} /></Disclosure>
                        <p className="mt-3 font-mono text-[11px] leading-relaxed text-subtle">{p.tech.join(" · ")}</p>
                        <p className="mt-2 text-xs text-subtle">
                          {p.demo && <a {...linkProps(p.demo)} className="font-medium text-muted hover:text-accent">{p.demo.includes("hub.docker.com") ? "Docker Hub ↗" : "Live demo ↗"}</a>}
                          {!p.github && !p.demo && (p.note || "Public release coming soon")}
                        </p>
                      </div>
                    </Row>
                  );
                })}
              </ol>

              <h3 className="reveal mb-4 mt-4 text-sm font-bold uppercase tracking-widest text-fg">More tools</h3>
              <ul className="group/list">
                {MORE_PROJECTS.map((p) => {
                  const Icon = p.icon;
                  const Title = p.link ? 'a' : 'span';
                  return (
                    <li key={p.title} className="reveal">
                      <div className="flex gap-4 border-t border-line py-4 transition-opacity duration-300 lg:hover:!opacity-100 lg:group-hover/list:opacity-50">
                        <span className={`grid h-8 w-8 shrink-0 place-items-center rounded-lg ${TONES[p.tone].icon}`}><Icon size={16} /></span>
                        <div className="min-w-0">
                          <Title {...(p.link ? linkProps(p.link) : {})} className={`inline-flex items-baseline gap-1 text-sm font-medium text-fg ${p.link ? "hover:text-accent" : ""}`}>
                            {p.title}{p.link ? <ArrowUpRight size={13} /> : <span className="ml-1 text-xs font-normal text-subtle">· coming soon</span>}
                          </Title>
                          <p className="mt-0.5 text-sm leading-relaxed text-muted">{p.description}</p>
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>
              {PROFILE.links.github && (
                <a {...linkProps(PROFILE.links.github)} className="reveal group mt-6 inline-flex items-center gap-1 text-sm font-semibold text-fg hover:text-accent">
                  All repositories on GitHub <ArrowUpRight size={15} className="transition-transform motion-safe:group-hover:-translate-y-0.5 motion-safe:group-hover:translate-x-0.5" />
                </a>
              )}
            </Section>

            <Section id="skills" label="Skills">
              <div className="grid gap-x-8 gap-y-8 sm:grid-cols-2">
                {SKILL_GROUPS.map(({ title, icon: Icon, skills }, i) => (
                  <div key={title} className="reveal" style={{ '--stagger': i % 2 }}>
                    <h3 className="flex items-center gap-2 font-medium text-fg"><Icon size={17} className="text-accent" /> {title}</h3>
                    <ul className="mt-3 flex flex-wrap gap-2">
                      {skills.map((s) => <li key={s} className="rounded-md border border-line px-2.5 py-1 text-xs text-muted">{s}</li>)}
                    </ul>
                  </div>
                ))}
              </div>

              <h3 className="reveal mb-4 mt-14 flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-fg"><Award size={16} className="text-accent" /> Certifications</h3>
              <ul className="divide-y divide-line border-y border-line">
                {MY_CERTIFICATIONS.map((c, i) => (
                  <li key={c.code} className="reveal flex items-baseline gap-4 py-3" style={{ '--stagger': i % 3 }}>
                    <span className="w-16 shrink-0 font-mono text-sm font-semibold text-accent">{c.code}</span>
                    <span className="flex-1 text-sm text-fg">{c.name}</span>
                    <span className="text-xs text-subtle">{c.issuer}</span>
                  </li>
                ))}
              </ul>
              <p className="reveal mt-4 text-sm text-muted">{MY_AWARD}</p>
            </Section>

            <Section id="contact" label="Contact">
              <div className="reveal">
                <p className="max-w-md leading-relaxed text-muted">
                  Working on an identity, Zero Trust or Azure governance problem, or want to talk about one of the projects? I'm happy to hear from you.
                </p>
                {PROFILE.links.email && (
                  <a href={PROFILE.links.email} className="group mt-6 inline-flex items-center gap-2 text-2xl font-semibold tracking-tight text-fg transition-colors hover:text-accent sm:text-3xl">
                    {PROFILE.links.email.replace(/^mailto:/, '').split('?')[0]}
                    <ArrowUpRight size={24} className="transition-transform motion-safe:group-hover:-translate-y-1 motion-safe:group-hover:translate-x-1" />
                  </a>
                )}
              </div>
            </Section>

            <footer className="pb-16 text-sm leading-relaxed text-subtle sm:pb-0">
              <p>© {new Date().getFullYear()} {PROFILE.name}. Built with React and Tailwind CSS, pre-rendered for search, with light and dark mode.</p>
            </footer>
          </main>
        </div>
      </div>
    </>
  );
}
