import { useState, useEffect } from 'react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { Terminal, Github, Linkedin, Mail, Menu, X, FileText, Sparkles, Layers } from 'lucide-react';

interface NavbarProps {
  onOpenResume: () => void;
  onOpenHoloPortal?: () => void;
}

export default function Navbar({ onOpenResume, onOpenHoloPortal }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: "About", href: "#about" },
    { label: "Projects", href: "#projects" },
    { label: "3D Holo Matrix", href: "#holo-matrix" },
    { label: "Skills", href: "#skills" },
    { label: "Focus Areas", href: "#interests" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <header
      id="main-navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#0a0e27]/85 backdrop-blur-md border-b border-purple-500/20 py-3 shadow-lg shadow-purple-950/20'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Logo */}
          <a
            id="brand-logo-link"
            href="#"
            className="group flex items-center gap-3 focus:outline-none focus:ring-1 focus:ring-[#06b6d4] p-1"
          >
            <div className="text-xl sm:text-2xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-[#a78bfa] to-[#06b6d4]">
              GS / PORTFOLIO
            </div>
            <span className="hidden sm:inline-block text-[10px] font-mono text-[#60a5fa] px-1.5 py-0.5 border border-[#60a5fa]/30 bg-[#60a5fa]/10 rounded-sm">
              v1.0
            </span>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-6 lg:space-x-8 text-xs uppercase tracking-[0.2em] font-medium">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-[#c7d2fe]/75 hover:text-[#06b6d4] hover:border-b hover:border-[#06b6d4] pb-1 transition-all"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Action CTAs */}
          <div className="hidden sm:flex items-center gap-2.5">
            <a
              id="nav-github-link"
              href={PERSONAL_INFO.socials.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Garv Shaw GitHub profile"
              className="p-2 text-[#c7d2fe] hover:text-[#a78bfa] bg-white/5 border border-white/10 rounded-sm hover:bg-white/10 transition-colors"
              title="GitHub Profile"
            >
              <Github className="w-4 h-4" />
            </a>
            <a
              id="nav-linkedin-link"
              href={PERSONAL_INFO.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Garv Shaw LinkedIn profile"
              className="p-2 text-[#c7d2fe] hover:text-[#60a5fa] bg-white/5 border border-white/10 rounded-sm hover:bg-white/10 transition-colors"
              title="LinkedIn Profile"
            >
              <Linkedin className="w-4 h-4" />
            </a>

            <a
              id="nav-holo-portal-btn"
              href="#holo-matrix"
              onClick={(e) => {
                if (onOpenHoloPortal) {
                  e.preventDefault();
                  onOpenHoloPortal();
                }
              }}
              className="border border-[#06b6d4]/40 bg-[#06b6d4]/10 text-[#06b6d4] hover:bg-[#06b6d4]/20 px-3 py-2 rounded-sm font-bold text-xs tracking-widest uppercase transition-all flex items-center gap-1.5 shadow-[0_0_12px_rgba(6,182,212,0.2)]"
              title="Explore 3D Holographic Matrix"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#06b6d4] animate-spin" style={{ animationDuration: '6s' }} />
              <span className="hidden lg:inline">3D Matrix</span>
              <span className="lg:hidden">3D</span>
            </a>

            <button
              id="nav-resume-btn"
              type="button"
              onClick={onOpenResume}
              className="border border-[#e0e7ff]/20 bg-white/5 backdrop-blur-md text-white px-4 py-2 rounded-sm font-bold text-xs tracking-widest uppercase hover:bg-white/10 transition-all flex items-center gap-1.5"
            >
              <FileText className="w-3.5 h-3.5 text-[#06b6d4]" />
              <span>Resume</span>
            </button>
          </div>

          {/* Mobile menu hamburger */}
          <div className="flex md:hidden items-center gap-2">
            <a
              href="#holo-matrix"
              onClick={(e) => {
                if (onOpenHoloPortal) {
                  e.preventDefault();
                  onOpenHoloPortal();
                }
              }}
              className="px-2.5 py-1 text-[11px] font-mono font-bold uppercase rounded-sm bg-[#06b6d4]/10 text-[#06b6d4] border border-[#06b6d4]/40 flex items-center gap-1"
            >
              <span>3D</span>
            </a>
            <button
              id="nav-resume-mobile-btn"
              type="button"
              onClick={onOpenResume}
              className="px-2.5 py-1 text-[11px] font-mono font-bold uppercase rounded-sm bg-white/5 text-[#a78bfa] border border-[#a78bfa]/40"
            >
              Resume
            </button>
            <button
              id="mobile-menu-toggle-btn"
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-[#c7d2fe] hover:text-white rounded-sm hover:bg-white/10"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div
          id="mobile-nav-drawer"
          className="md:hidden bg-[#0a0e27]/98 border-b border-white/10 backdrop-blur-xl px-4 pt-3 pb-5 space-y-2 animate-in fade-in slide-in-from-top-3 duration-200"
        >
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 text-sm font-mono uppercase tracking-wider text-[#c7d2fe] hover:text-white hover:bg-white/5 rounded-sm"
            >
              {item.label}
            </a>
          ))}
          <div className="pt-3 border-t border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <a
                href={PERSONAL_INFO.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-white hover:text-[#06b6d4] rounded-sm bg-white/5 border border-white/10"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href={PERSONAL_INFO.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-white hover:text-[#06b6d4] rounded-sm bg-white/5 border border-white/10"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href={PERSONAL_INFO.socials.email}
                className="p-2 text-white hover:text-[#06b6d4] rounded-sm bg-white/5 border border-white/10"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="px-4 py-1.5 text-xs font-bold uppercase tracking-wider rounded-sm bg-gradient-to-r from-[#7c3aed] to-[#60a5fa] text-white font-mono"
            >
              Get In Touch
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
