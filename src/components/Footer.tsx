import { PERSONAL_INFO } from '../data/portfolioData';
import { Github, Linkedin, Instagram, Mail, ArrowUp, Heart, Sparkles } from 'lucide-react';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="main-footer" className="border-t border-white/10 bg-[#0a0e27]/95 relative z-10 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center justify-between">
          
          {/* Left: Brand & Tagline */}
          <div className="md:col-span-5 space-y-2">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rotate-45 bg-[#06b6d4] inline-block" />
              <span className="font-display font-bold text-lg text-white tracking-widest uppercase">
                {PERSONAL_INFO.name}
              </span>
              <span className="text-xs font-mono text-[#60a5fa]">
                // 2026
              </span>
            </div>
            <p className="text-xs sm:text-sm text-[#c7d2fe]/80 font-mono">
              "Building the future, one line of code at a time."
            </p>
            <p className="text-xs text-[#c7d2fe]/60">
              Computer Science & Engineering Student | Developer | Designer • India
            </p>
          </div>

          {/* Center: Quick navigation links */}
          <div className="md:col-span-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs font-mono uppercase tracking-wider text-[#c7d2fe]/75">
            <a href="#hero" className="hover:text-[#06b6d4] transition-colors">Hero</a>
            <a href="#about" className="hover:text-[#06b6d4] transition-colors">About</a>
            <a href="#projects" className="hover:text-[#06b6d4] transition-colors">Projects</a>
            <a href="#skills" className="hover:text-[#06b6d4] transition-colors">Skills</a>
            <a href="#interests" className="hover:text-[#06b6d4] transition-colors">Focus Areas</a>
            <a href="#contact" className="hover:text-[#06b6d4] transition-colors">Contact</a>
          </div>

          {/* Right: Social icons & back to top */}
          <div className="md:col-span-3 flex items-center justify-between md:justify-end gap-3">
            <div className="flex items-center gap-2">
              <a
                href={PERSONAL_INFO.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub Profile"
                className="p-2 rounded-sm bg-white/5 hover:bg-white/10 border border-white/10 text-white hover:text-[#06b6d4] transition-colors"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href={PERSONAL_INFO.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn Profile"
                className="p-2 rounded-sm bg-white/5 hover:bg-white/10 border border-white/10 text-white hover:text-[#06b6d4] transition-colors"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href={PERSONAL_INFO.socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram Profile"
                className="p-2 rounded-sm bg-white/5 hover:bg-white/10 border border-white/10 text-white hover:text-[#06b6d4] transition-colors"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={PERSONAL_INFO.socials.email}
                aria-label="Email Garv Shaw"
                className="p-2 rounded-sm bg-white/5 hover:bg-white/10 border border-white/10 text-white hover:text-[#06b6d4] transition-colors"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>

            <button
              id="footer-back-to-top-btn"
              type="button"
              onClick={scrollToTop}
              aria-label="Scroll back to top"
              className="p-2 rounded-sm bg-white/5 hover:bg-white/10 border border-white/10 text-white hover:text-[#06b6d4] transition-colors"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>

        </div>

        {/* Bottom copyright line */}
        <div className="mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-[10px] font-mono text-[#c7d2fe]/50 gap-2">
          <span>© 2026 Garv Shaw. All rights reserved.</span>
          <span className="flex items-center gap-1">
            Engineered with React, Three.js & Tailwind CSS // Artistic Flair
          </span>
        </div>
      </div>
    </footer>
  );
}
