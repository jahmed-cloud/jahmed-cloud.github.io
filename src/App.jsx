import React from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, Shield, Zap, BookOpen, FileText, ExternalLink, Award, Briefcase, Compass } from 'lucide-react';

// ==========================================
// 1. YOUR PERSONAL DATA (GitHub Pages Fallback)
// ==========================================
const DEFAULT_DATA = {
  name: "Junaid Ahmed",
  tagline: "Cloud Security & Identity Architect",
  links: {
    linkedin: "https://linkedin.com/in/yourprofile",
    github: "https://github.com/yourusername",
    email: "mailto:junaid@example.com",
    blog: "https://learncloud.guru",
    resume: "/resume.pdf"
  }
};

// ==========================================
// 2. HYBRID LOGIC
// ==========================================
const env = window.ENV || {};
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

const MY_EXPERTISE = ["Azure Security", "Identity & Access (Entra ID)", "Zero Trust Architecture", "Terraform & PowerShell", "DevSecOps", "Python"];
const MY_CERTIFICATIONS = [
  { name: "CISM (Certified Information Security Manager)", issuer: "ISACA" },
  { name: "Cybersecurity Architect Expert (SC-100)", issuer: "Microsoft" },
  { name: "Azure Solutions Architect Expert (AZ-305)", issuer: "Microsoft" },
  { name: "Identity & Access Administrator (SC-300)", issuer: "Microsoft" },
  { name: "Microsoft Certified Trainer (MCT)", issuer: "Microsoft" },
  { name: "Professional Cloud Security Engineer", issuer: "Google Cloud" }
];
const MY_EXPERIENCE = [
  { role: "Technology Manager", company: "EY", period: "Present", description: "Leading technology initiatives and architecting robust security frameworks for enterprise clients." },
  { role: "Cloud Solution Architect", company: "Microsoft", period: "Previous", description: "Designed and implemented scalable, secure cloud architectures." },
  { role: "Technical Lead", company: "Allyis", period: "Previous", description: "Spearheaded technical delivery, automation, and infrastructure optimization." },
  { role: "Operations Lead / SME", company: "Concentrix", period: "Previous", description: "Managed critical operations and technical support workflows." }
];
const MY_PROJECTS = [
  { title: "Zero Trust Implementation", description: "Designed and deployed a comprehensive Zero Trust architecture across a multi-tenant Azure environment.", icon: <Shield className="text-blue-400 mb-4 md:mb-6" size={28} />, github: "https://github.com/yourusername/repo1", demo: "" },
  { title: "Jahmed MotoHub", description: "A full-stack Flask web application built for a riding club, featuring rider management and deployment pipelines.", icon: <Zap className="text-yellow-400 mb-4 md:mb-6" size={28} />, github: "https://github.com/yourusername/repo2", demo: "https://yourdemo.com" }
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
        </section>

        {/* Optimized Expertise */}
        <section id="expertise" className="py-20 md:py-32">
          <FadeIn>
            <h2 className="text-3xl md:text-5xl font-medium tracking-tight mb-10 md:mb-16">Expertise.</h2>
            <div className="grid md:grid-cols-2 gap-8 md:gap-12 mb-16 md:mb-20 items-center">
              <p className="text-lg md:text-xl text-gray-400 font-light leading-relaxed">I design secure, resilient cloud solutions. With over 10 years of experience in Identity and Access Management (IAM), threat mitigation, and Zero Trust architecture, I help organizations safeguard their digital assets.</p>
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
                  <p className="text-blue-400 font-medium text-sm md:text-base mb-2 md:mb-3 flex items-center gap-2"><Briefcase size={16} /> {job.company}</p>
                  <p className="text-gray-400 font-light text-sm md:text-base">{job.description}</p>
                </div>
              ))}
            </div>
          </FadeIn>
        </section>

        {/* Optimized Work */}
        <section id="work" className="py-20 md:py-32 border-t border-white/10">
          <FadeIn>
            <h2 className="text-3xl md:text-5xl font-medium tracking-tight mb-10 md:mb-16">Selected Work.</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              {MY_PROJECTS.map((project, i) => (
                <div key={i} className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl md:rounded-3xl p-6 md:p-8 hover:bg-white/10 transition-colors duration-500 flex flex-col h-full">
                  {project.icon}
                  <h3 className="text-lg md:text-xl font-medium mb-3 md:mb-4">{project.title}</h3>
                  <p className="text-gray-400 font-light text-sm md:text-base flex-grow mb-6">{project.description}</p>
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
              <Compass className="text-white/5 absolute -right-10 -bottom-10" size={180} className="md:w-[250px] md:h-[250px]" />
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
