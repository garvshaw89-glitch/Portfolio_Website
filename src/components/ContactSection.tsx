import { useState } from 'react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { 
  Mail, 
  Github, 
  Linkedin, 
  Instagram,
  CheckCircle2, 
  Copy, 
  ExternalLink, 
  Sparkles,
  MapPin,
  Clock
} from 'lucide-react';

export default function ContactSection() {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-gradient-to-r from-purple-600/15 via-cyan-500/10 to-blue-600/15 rounded-full blur-[150px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-[#60a5fa] font-mono text-sm mb-2">
            // COMMUNICATIONS_AND_CONNECTIVITY
          </p>

          <h2 className="text-4xl sm:text-5xl font-display font-extrabold text-white tracking-tight mb-4">
            Let's Build <span className="text-transparent bg-clip-text bg-gradient-to-br from-[#a78bfa] via-[#7c3aed] to-[#60a5fa]">Something Amazing</span>
          </h2>

          <p className="text-base sm:text-lg text-[#c7d2fe]/80 leading-relaxed font-light">
            {PERSONAL_INFO.ctaText}
          </p>
        </div>

        {/* 3 Main Action CTA Buttons in Artistic Flair styling */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-16">
          {/* Primary CTA: Contact Me */}
          <a
            id="cta-primary-email"
            href={PERSONAL_INFO.socials.email}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-sm font-mono font-bold text-xs tracking-widest uppercase bg-gradient-to-r from-[#7c3aed] to-[#60a5fa] hover:opacity-95 text-white shadow-[0_0_20px_rgba(124,58,237,0.4)] transition-all hover:scale-105 active:scale-95"
          >
            <Mail className="w-4 h-4" />
            <span>Contact Me</span>
          </a>

          {/* Secondary CTA: View GitHub */}
          <a
            id="cta-secondary-github"
            href={PERSONAL_INFO.socials.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-sm font-mono font-bold text-xs tracking-widest uppercase text-white bg-white/5 hover:bg-white/10 border border-white/20 transition-all hover:scale-105"
          >
            <Github className="w-4 h-4 text-[#06b6d4]" />
            <span>View GitHub</span>
            <ExternalLink className="w-3.5 h-3.5 text-[#c7d2fe]" />
          </a>

          {/* Tertiary CTA: Connect on LinkedIn */}
          <a
            id="cta-tertiary-linkedin"
            href={PERSONAL_INFO.socials.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-sm font-mono font-bold text-xs tracking-widest uppercase text-[#06b6d4] bg-[#06b6d4]/10 hover:bg-[#06b6d4]/20 border border-[#06b6d4]/40 transition-all hover:scale-105"
          >
            <Linkedin className="w-4 h-4 text-[#06b6d4]" />
            <span>Connect on LinkedIn</span>
            <ExternalLink className="w-3.5 h-3.5 text-[#c7d2fe]" />
          </a>
        </div>

        {/* Contact Information & Channels Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          
          {/* Direct Communication Channels */}
          <div className="rounded-sm bg-white/5 border border-white/10 p-6 sm:p-7 backdrop-blur-md space-y-5 flex flex-col justify-between">
            <div>
              <span className="text-[10px] font-mono uppercase text-[#a78bfa] tracking-widest font-bold block mb-2">
                Direct Inquiries:
              </span>
              <div className="flex items-center justify-between gap-2 p-3 rounded-sm bg-black/40 border border-white/10">
                <span className="font-mono text-xs sm:text-sm text-[#06b6d4] truncate">
                  {PERSONAL_INFO.email}
                </span>
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="p-1.5 rounded-sm bg-white/5 hover:bg-white/10 text-white transition-colors shrink-0"
                  title="Copy email to clipboard"
                  aria-label="Copy email address"
                >
                  {copied ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
              {copied && (
                <span className="text-[11px] font-mono text-emerald-400 mt-2 block animate-in fade-in">
                  ✓ Email address copied to clipboard!
                </span>
              )}
            </div>

            <div>
              <span className="text-[10px] font-mono uppercase text-[#a78bfa] tracking-widest font-bold block mb-3">
                Connect Across Platforms:
              </span>
              <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                <a
                  href={PERSONAL_INFO.socials.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 p-2.5 rounded-sm bg-white/5 hover:bg-white/10 border border-white/10 text-[#c7d2fe] hover:text-white transition-colors"
                >
                  <Github className="w-4 h-4 text-[#06b6d4]" />
                  <span>GitHub</span>
                </a>
                <a
                  href={PERSONAL_INFO.socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 p-2.5 rounded-sm bg-white/5 hover:bg-white/10 border border-white/10 text-[#c7d2fe] hover:text-white transition-colors"
                >
                  <Linkedin className="w-4 h-4 text-[#06b6d4]" />
                  <span>LinkedIn</span>
                </a>
                <a
                  href={PERSONAL_INFO.socials.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 p-2.5 rounded-sm bg-white/5 hover:bg-white/10 border border-white/10 text-[#c7d2fe] hover:text-white transition-colors"
                >
                  <Instagram className="w-4 h-4 text-[#06b6d4]" />
                  <span>Instagram</span>
                </a>
                <a
                  href={PERSONAL_INFO.socials.email}
                  className="flex items-center gap-2 p-2.5 rounded-sm bg-white/5 hover:bg-white/10 border border-white/10 text-[#c7d2fe] hover:text-white transition-colors"
                >
                  <Mail className="w-4 h-4 text-[#06b6d4]" />
                  <span>Direct Mail</span>
                </a>
              </div>
            </div>
          </div>

          {/* Availability & Scope info */}
          <div className="rounded-sm bg-white/5 border border-white/10 p-6 sm:p-7 backdrop-blur-md space-y-4 font-mono text-xs text-[#c7d2fe]/80 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-white font-medium text-sm">
                <Sparkles className="w-4 h-4 text-[#06b6d4]" />
                <span>Collaboration Scope</span>
              </div>
              <p className="text-xs font-sans text-[#c7d2fe]/75 leading-relaxed">
                Currently open to software engineering internships, AI research collaborations, freelance full-stack architecture, and tech startup discussions.
              </p>
            </div>

            <div className="pt-4 border-t border-white/10 space-y-2.5 text-[11px]">
              <div className="flex items-center justify-between">
                <span className="text-[#a78bfa]">Response Window:</span>
                <span className="text-[#06b6d4] flex items-center gap-1">
                  <Clock className="w-3 h-3" /> Within 24-48 Hours
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#a78bfa]">Location Base:</span>
                <span className="text-white flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-[#60a5fa]" /> India (Remote/Global)
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#a78bfa]">Current Status:</span>
                <span className="text-emerald-400 flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" /> Available for Roles
                </span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
