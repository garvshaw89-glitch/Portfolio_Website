import { PERSONAL_INFO } from '../data/portfolioData';
import HoloCube3D from './HoloCube3D';
import { 
  ArrowRight, 
  Terminal, 
  Github, 
  Linkedin, 
  Instagram, 
  Mail, 
  FileText, 
  MapPin, 
  Cpu, 
  Cloud, 
  Palette,
  Sparkles
} from 'lucide-react';

interface HeroProps {
  onOpenResume: () => void;
}

export default function Hero({ onOpenResume }: HeroProps) {
  return (
    <section
      id="hero"
      className="relative min-h-[92vh] pt-28 pb-16 lg:py-32 flex items-center justify-center overflow-hidden"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute top-1/3 right-10 w-[400px] h-[400px] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none -z-10" />
      <div className="absolute bottom-10 left-10 w-[350px] h-[350px] bg-blue-600/10 rounded-full blur-[100px] pointer-events-none -z-10" />

      {/* Cyberpunk grid overlay */}
      <div className="absolute inset-0 cyber-grid opacity-75 pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Bio & Hero Info */}
          <div className="lg:col-span-7 flex flex-col items-start text-left z-10">
            
            {/* Status chip matching Artistic Flair */}
            <p className="text-[#60a5fa] font-mono text-sm mb-3 tracking-wide">
              // B.Tech CSE Student • India
            </p>

            {/* Large Gradient Heading matching Artistic Flair */}
            <h1 className="text-5xl sm:text-7xl lg:text-8xl font-extrabold leading-[0.9] tracking-tight text-white mb-6">
              Garv <span className="text-transparent bg-clip-text bg-gradient-to-br from-[#a78bfa] via-[#7c3aed] to-[#60a5fa]">Shaw</span>
            </h1>

            {/* Subtitle & Tagline */}
            <p className="text-base sm:text-lg text-[#c7d2fe] max-w-xl leading-relaxed mb-6 font-light">
              Building the Future with Code, AI, and Design. Passionate about Cloud Computing, AI systems, and educational innovation through technology.
            </p>

            {/* Tagline details box */}
            <div className="mb-6 p-4 rounded-sm bg-white/5 border border-white/10 backdrop-blur-md max-w-xl w-full">
              <p className="text-xs font-mono text-[#a78bfa] uppercase tracking-widest font-bold mb-1.5">
                // System Mission
              </p>
              <p className="text-sm text-[#e0e7ff]/90 leading-relaxed font-sans">
                "{PERSONAL_INFO.aboutBio}"
              </p>
            </div>

            {/* CTA Buttons in Artistic Flair Style */}
            <div className="flex flex-wrap items-center gap-3.5 mb-10">
              <a
                id="hero-cta-projects"
                href="#projects"
                className="bg-[#7c3aed] text-white px-7 py-3 rounded-sm font-bold text-xs sm:text-sm tracking-widest uppercase hover:bg-[#6d28d9] border border-[#a78bfa] shadow-[0_0_15px_rgba(124,58,237,0.4)] transition-all flex items-center gap-2"
              >
                <span>Let's Build</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <button
                id="hero-cta-resume"
                type="button"
                onClick={onOpenResume}
                className="border border-[#e0e7ff]/20 bg-white/5 backdrop-blur-md text-white px-7 py-3 rounded-sm font-bold text-xs sm:text-sm tracking-widest uppercase hover:bg-white/10 transition-all flex items-center gap-2"
              >
                <FileText className="w-4 h-4 text-[#06b6d4]" />
                <span>Resume</span>
              </button>

              <a
                id="hero-cta-contact"
                href="#contact"
                className="border border-[#06b6d4]/40 bg-[#06b6d4]/10 text-[#06b6d4] px-6 py-3 rounded-sm font-bold text-xs sm:text-sm tracking-widest uppercase hover:bg-[#06b6d4]/20 transition-all flex items-center gap-2"
              >
                <Mail className="w-4 h-4" />
                <span>Contact</span>
              </a>

              <a
                href="#holo-matrix"
                className="border border-[#a78bfa]/40 bg-[#a78bfa]/10 text-[#a78bfa] px-6 py-3 rounded-sm font-bold text-xs sm:text-sm tracking-widest uppercase hover:bg-[#a78bfa]/20 transition-all flex items-center gap-2 shadow-[0_0_15px_rgba(167,139,250,0.2)]"
                title="Explore 3D Holographic Matrix Laboratory"
              >
                <Sparkles className="w-4 h-4 text-[#06b6d4]" />
                <span>3D Holo Lab</span>
              </a>
            </div>

            {/* Social Media Links Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 text-xs font-mono text-[#c7d2fe]/75">
              <span className="text-[#a78bfa] uppercase tracking-[0.2em] text-[11px] font-bold">
                Connect //
              </span>
              <div className="flex items-center gap-2">
                <a
                  id="hero-social-github"
                  href={PERSONAL_INFO.socials.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub Profile"
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-sm bg-white/5 hover:bg-white/10 border border-white/10 text-[#c7d2fe] hover:text-[#a78bfa] transition-colors"
                >
                  <Github className="w-3.5 h-3.5 text-[#06b6d4]" />
                  <span>GitHub</span>
                </a>
                <a
                  id="hero-social-linkedin"
                  href={PERSONAL_INFO.socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn Profile"
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-sm bg-white/5 hover:bg-white/10 border border-white/10 text-[#c7d2fe] hover:text-[#60a5fa] transition-colors"
                >
                  <Linkedin className="w-3.5 h-3.5 text-[#60a5fa]" />
                  <span>LinkedIn</span>
                </a>
                <a
                  id="hero-social-instagram"
                  href={PERSONAL_INFO.socials.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram Profile"
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-sm bg-white/5 hover:bg-white/10 border border-white/10 text-[#c7d2fe] hover:text-pink-400 transition-colors"
                >
                  <Instagram className="w-3.5 h-3.5 text-pink-400" />
                  <span>Instagram</span>
                </a>
                <a
                  id="hero-social-email"
                  href={PERSONAL_INFO.socials.email}
                  aria-label="Email Garv Shaw"
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-sm bg-white/5 hover:bg-white/10 border border-white/10 text-[#c7d2fe] hover:text-[#06b6d4] transition-colors"
                >
                  <Mail className="w-3.5 h-3.5 text-[#a78bfa]" />
                  <span>Email</span>
                </a>
              </div>
            </div>

          </div>

          {/* Right Column: Interactive 3D Holographic Cube */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center relative">
            <HoloCube3D />
            <div className="mt-4 text-center sm:text-right w-full px-2">
              <p className="text-[10px] uppercase tracking-[0.5em] text-[#60a5fa] mb-1 font-mono">
                Currently focusing on
              </p>
              <p className="text-xs font-mono text-white opacity-85">
                Gen-AI / Cloud Infrastructure / System Architecture
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
