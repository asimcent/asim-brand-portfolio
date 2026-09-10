import { type ReactNode, useEffect, useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ArrowDownRight, ArrowRight, ArrowUpRight, Box, Check, Dribbble, Linkedin, Mail, MapPin, Menu, Palette, PenTool, Share2, X } from 'lucide-react';
import edulgaImage from '@assets/image_1787763175552.png';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';
import { Route, Switch, useLocation, Router as WouterRouter } from 'wouter';

const queryClient = new QueryClient();

const navItems = [
  { label: 'About', href: '#about' },
  { label: 'Selected work', href: '#work' },
  { label: 'Services', href: '#skills' },
  { label: 'Contact', href: '#contact' },
];

const projects = [
  {
    number: '01',
    title: 'Edulga.Ai',
    category: 'Brand identity · 2024',
    description: 'A confident identity for an AI that turns learning into connected, bite-sized nodes — rebuilt from outdated to unmistakably smart.',
    tags: ['Brand identity', 'Logo design', 'Art direction'],
    visual: 'orbit',
    accent: 'coral',
  },
  {
    number: '02',
    title: 'Aqua World',
    category: 'Packaging design · 2024',
    description: 'A bold visual system and packaging direction for a world of fresh, everyday essentials.',
    tags: ['Packaging', 'Print production', 'Brand identity'],
    visual: 'field',
    accent: 'teal',
  },
  {
    number: '03',
    title: 'Club Billionaire',
    category: 'Creative direction · 2023',
    description: 'A confident campaign world built to make a premium lifestyle brand impossible to scroll past.',
    tags: ['Creative direction', 'Social creatives', 'Campaigns'],
    visual: 'civic',
    accent: 'yellow',
  },
];

const capabilities = [
  { icon: Palette, title: 'Brand Identity', text: 'Distinctive visual worlds, from the first idea to the final brand guidelines.' },
  { icon: PenTool, title: 'Logo Design', text: 'Memorable marks with the clarity and flexibility to work everywhere your brand shows up.' },
  { icon: Box, title: 'Packaging Design', text: 'Shelf-ready packaging that feels good in the hand and makes the product memorable.' },
  { icon: Share2, title: 'Creative Direction', text: 'A clear visual point of view across campaigns, social content, and every brand touchpoint.' },
];

function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [activeSection, setActiveSection] = useState('about');

  useEffect(() => {
    const sections = ['about', 'work', 'skills', 'contact']
      .map((id) => document.getElementById(id))
      .filter((section): section is HTMLElement => Boolean(section));
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActiveSection(visible.target.id);
      },
      { rootMargin: '-25% 0px -60% 0px', threshold: [0.1, 0.3, 0.6] },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <div className="portfolio-shell">
      <header className="site-header" data-testid="header-main">
        <a href="#top" className="brand-mark" data-testid="link-brand">
          <span className="brand-dot" aria-hidden="true" />
          <span>Asim Abdul Ghafoor</span>
        </a>
        <nav className={`desktop-nav ${menuOpen ? 'mobile-nav-open' : ''}`} aria-label="Primary navigation">
          {navItems.map((item) => (
            <a
              href={item.href}
              key={item.href}
              onClick={closeMenu}
              className={activeSection === item.href.slice(1) ? 'nav-link active' : 'nav-link'}
              data-testid={`link-nav-${item.label.toLowerCase().replace(/\s/g, '-')}`}
            >
              <span className="nav-index">0{navItems.indexOf(item) + 1}</span>{item.label}
            </a>
          ))}
        </nav>
        <a className="header-availability" href="mailto:asimworkspace41@gmail.com" data-testid="link-header-email">
          <span className="availability-dot" /> Available for select brand projects
        </a>
        <button
          type="button"
          className="menu-toggle"
          aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((value) => !value)}
          data-testid="button-toggle-menu"
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </header>

      <main id="top">
        <section className="hero-section" aria-labelledby="hero-heading">
          <div className="hero-grid" aria-hidden="true" />
          <div className="hero-content">
            <p className="eyebrow reveal-up"><span className="eyebrow-line" /> Designer</p>
            <h1 id="hero-heading" className="hero-heading reveal-up delay-1">
              <span className="hero-title-line">Brand design</span><br /><em>that stands</em><br /><span className="hero-outline">out.</span>
            </h1>
            <div className="hero-bottom reveal-up delay-2">
              <p className="hero-intro">Brand Designer crafting identities, creative direction, and packaging that stand out.</p>
              <a href="#work" className="round-arrow-link" aria-label="Scroll to selected work" data-testid="link-hero-work">
                <ArrowDownRight size={28} strokeWidth={1.5} />
              </a>
            </div>
          </div>
        </section>

        <section id="about" className="about-section section-pad" aria-labelledby="about-heading">
          <div className="section-kicker"><span>01</span><span>About me</span></div>
          <div className="about-layout">
             <h2 id="about-heading" className="display-heading">Good design<br />starts with a <em>feeling.</em></h2>
            <div className="about-copy">
               <p className="lead-copy">I don’t just sell logos. I sell clarity — the kind that makes people instantly get who you are, what you stand for, and why you matter.</p>
               <p>I help founders, brands, and growing businesses turn strong concepts into sharp visual identities that stick. Leading creative direction across brand identity, logo design, digital art, packaging, and video, my approach focuses on finding the precise detail that brings the entire narrative to life.</p>
              <a href="#contact" className="text-link" data-testid="link-about-contact">Let’s make it memorable <ArrowRight size={17} /></a>
            </div>
          </div>
          <div className="about-detail-row">
            <div className="detail-block"><span className="detail-label">Working from</span><strong>Anywhere in the world <MapPin size={14} /></strong></div>
             <div className="detail-block"><span className="detail-label">Currently</span><strong>Available for freelance &amp; creative direction.</strong></div>
             <div className="detail-block"><span className="detail-label">Focus</span><strong>Brand Identity · Digital Art · Video &amp; Motion.</strong></div>
          </div>
        </section>

        <section id="work" className="work-section section-pad" aria-labelledby="work-heading">
          <div className="section-kicker"><span>02</span><span>Selected work</span><span className="kicker-note">A few things I’m proud of</span></div>
          <div className="work-heading-row">
            <h2 id="work-heading" className="display-heading">Work with<br /><em>some edge.</em></h2>
             <p className="section-aside">A small selection of identities, objects, and campaigns made to give good ideas a longer life.</p>
          </div>
          <div className="project-list">
            {projects.map((project) => (
              <a className={`project-card project-${project.visual}`} href="#contact" key={project.number} data-testid={`card-project-${project.visual}`}>
                <div className={`project-visual ${project.accent}`} aria-hidden="true">
                   {project.visual === 'orbit' && <img className="project-image" src={edulgaImage} alt="Edulga.Ai brand identity" />}
                   {project.visual === 'field' && <><div className="field-sun" /><div className="field-sheet sheet-back">AQUA<br />WORLD</div><div className="field-sheet sheet-front">PURE<br /><em>by nature.</em></div><div className="visual-caption">PACKED<br />WITH INTENTION</div></>}
                   {project.visual === 'civic' && <><div className="civic-bars"><i /><i /><i /><i /><i /><i /></div><div className="civic-label">CLUB<br /><strong>ONE</strong></div><div className="civic-orbit" /><div className="visual-caption">A FEED<br />WORTH PAUSING</div></>}
                </div>
                <div className="project-meta">
                  <div><span className="project-number">{project.number}</span><h3>{project.title}</h3><p>{project.category}</p></div>
                  <ArrowUpRight className="project-arrow" size={25} strokeWidth={1.5} />
                </div>
                <p className="project-description">{project.description}</p>
                <div className="tag-row">{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
              </a>
            ))}
          </div>
        </section>

        <section id="skills" className="skills-section section-pad" aria-labelledby="skills-heading">
          <div className="section-kicker"><span>03</span><span>How I work</span></div>
          <div className="skills-layout">
             <div><h2 id="skills-heading" className="display-heading">Make it clear.<br />Make it <em>yours.</em></h2><p className="skills-intro">Different outputs, same intention: make your brand feel impossible to confuse with anyone else.</p></div>
            <div className="capability-list">
              {capabilities.map((capability, index) => { const Icon = capability.icon; return <div className="capability" key={capability.title}><span className="capability-number">0{index + 1}</span><Icon size={23} strokeWidth={1.5} /><div><h3>{capability.title}</h3><p>{capability.text}</p></div></div>; })}
            </div>
          </div>
        </section>

        <section id="contact" className="contact-section section-pad" aria-labelledby="contact-heading">
           <div className="contact-topline"><span>04 / Contact</span><span>Have a good brief? Start there.</span></div>
          <div className="contact-layout">
             <div className="contact-prompt"><h2 id="contact-heading">Let’s make<br /><em>your mark.</em></h2><p>Tell me what you’re building, launching, or rethinking. Whether you need a full identity or a focused campaign, I’d love to hear the story behind it.</p><a href="mailto:asimworkspace41@gmail.com" className="contact-email" data-testid="link-contact-email"><Mail size={17} /> asimworkspace41@gmail.com</a></div>
             <form className="contact-form" onSubmit={(event) => { event.preventDefault(); setSubmitted(true); }} aria-label="Contact Asim Abdul Ghafoor">
              {!submitted ? <><label><span>Your name</span><input required name="name" placeholder="The human behind the brief" data-testid="input-contact-name" /></label><label><span>Email address</span><input required type="email" name="email" placeholder="you@company.com" data-testid="input-contact-email" /></label><label><span>What’s on your mind?</span><textarea required name="message" rows={3} placeholder="A sentence or two is perfect." data-testid="input-contact-message" /></label><button type="submit" className="submit-button" data-testid="button-submit-contact">Send the note <ArrowUpRight size={18} /></button></> : <div className="form-success" role="status" data-testid="status-contact-success"><div className="success-icon"><Check size={22} /></div><h3>Note received.</h3><p>Thanks for reaching out — I’ll be in touch soon.</p><button type="button" className="text-link" onClick={() => setSubmitted(false)} data-testid="button-send-another">Send another note <ArrowRight size={16} /></button></div>}
            </form>
          </div>
          <footer className="site-footer"><a href="#top" className="brand-mark footer-brand" data-testid="link-footer-brand"><span className="brand-dot" /><span>Asim Abdul Ghafoor</span></a><span>© 2024 Asim Abdul Ghafoor</span><div className="social-links"><a href="https://www.linkedin.com" target="_blank" rel="noreferrer" aria-label="Asim Abdul Ghafoor on LinkedIn" data-testid="link-social-linkedin"><Linkedin size={18} /></a><a href="https://dribbble.com" target="_blank" rel="noreferrer" aria-label="Asim Abdul Ghafoor on Dribbble" data-testid="link-social-dribbble"><Dribbble size={18} /></a></div></footer>
        </section>
      </main>
    </div>
  );
}

function Router() {
  return <RoutedErrorBoundary><Switch><Route path="/" component={Home} /><Route component={NotFound} /></Switch></RoutedErrorBoundary>;
}

function RoutedErrorBoundary({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  return <ErrorBoundary resetKey={location}>{children}</ErrorBoundary>;
}

function App() {
  return <QueryClientProvider client={queryClient}><TooltipProvider><WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}><Router /></WouterRouter><Toaster /></TooltipProvider></QueryClientProvider>;
}

export default App;