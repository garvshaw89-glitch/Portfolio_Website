import { useState, useRef, MouseEvent } from 'react';
import { PROJECTS } from '../data/portfolioData';
import { Project } from '../types';
import { 
  ExternalLink, 
  Github, 
  TrendingUp, 
  CheckCircle2, 
  Code2, 
  Globe,
  Zap
} from 'lucide-react';

interface ProjectsSectionProps {
  onOpenDemo?: (project: Project) => void;
}

// 3D Tilt Card wrapper component
function ProjectTiltCard({ 
  project, 
  index
}: { 
  project: Project; 
  index: number;
  key?: string;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Calculate rotation (-6 to +6 deg)
    const rotX = -((y - centerY) / centerY) * 6;
    const rotY = ((x - centerX) / centerX) * 6;

    setRotateX(rotX);
    setRotateY(rotY);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotateX(0);
    setRotateY(0);
  };

  const isStockMentor = project.id === 'stock-mentor';
  const isTypingChecker = project.id === 'typing-speed-checker';
  const indexTag = `${String(index + 1).padStart(2, '0')} / PROJECT`;

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(${isHovered ? -6 : 0}px)`,
        transition: isHovered ? 'transform 0.1s ease-out' : 'transform 0.5s ease-out',
      }}
      className="relative rounded-sm bg-white/5 border border-white/10 hover:border-[#06b6d4]/50 p-5 sm:p-7 backdrop-blur-sm transition-all duration-300 shadow-xl shadow-black/40 hover:shadow-[0_0_30px_rgba(6,182,212,0.15)] flex flex-col justify-between group overflow-hidden h-full"
    >
      {/* Background glow when hovered */}
      <div 
        className={`absolute -top-20 -right-20 w-64 h-64 rounded-full blur-3xl pointer-events-none transition-opacity duration-500 ${
          isStockMentor 
            ? 'bg-[#06b6d4]/15 group-hover:bg-[#06b6d4]/25' 
            : isTypingChecker
            ? 'bg-emerald-500/15 group-hover:bg-emerald-500/25'
            : 'bg-[#7c3aed]/15 group-hover:bg-[#7c3aed]/25'
        } ${isHovered ? 'opacity-100' : 'opacity-30'}`} 
      />

      {/* Cyber edge indicator */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#06b6d4]/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

      <div>
        {/* Top bar with icon & index tag */}
        <div className="flex items-center justify-between gap-3 mb-5">
          <div className="flex items-center gap-3">
            <span className="text-2xl sm:text-3xl p-2.5 rounded-sm bg-white/5 border border-white/10 group-hover:scale-105 transition-transform">
              {project.icon}
            </span>
            <div>
              <span className="text-[11px] font-mono font-medium text-[#60a5fa] tracking-wider uppercase block">
                {project.category}
              </span>
              <h3 className="text-xl sm:text-2xl font-display font-bold text-white group-hover:text-[#a78bfa] transition-colors">
                {project.title}
              </h3>
            </div>
          </div>

          <span className="text-[10px] font-mono tracking-widest text-[#06b6d4] px-2 py-0.5 rounded-sm border border-[#06b6d4]/30 bg-[#06b6d4]/10 uppercase font-bold shrink-0">
            {indexTag}
          </span>
        </div>

        {/* Tagline & Description */}
        <p className="text-xs sm:text-sm font-medium text-[#e0e7ff] mb-2 font-display">
          {project.tagline}
        </p>
        <p className="text-xs text-[#c7d2fe]/75 mb-5 leading-relaxed">
          {project.description}
        </p>

        {/* UI Mockup / Engine Simulation Preview Box */}
        <div className="mb-5 rounded-sm bg-[#0a0e27]/80 border border-white/10 p-3.5 font-mono text-xs overflow-hidden relative">
          <div className="flex items-center justify-between pb-2 mb-2.5 border-b border-white/10 text-[10px]">
            <span className="flex items-center gap-1.5 text-[#06b6d4]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#06b6d4] animate-pulse" />
              {isStockMentor 
                ? 'stockmentor_engine.py' 
                : isTypingChecker 
                ? 'typing_speed_engine.js' 
                : 'microskill_spaced_engine.ts'}
            </span>
            <span className="text-[#a78bfa] text-[9px] tracking-wider uppercase">
              {isTypingChecker ? 'ZERO DEPENDENCIES' : 'ACTIVE ENGINE'}
            </span>
          </div>

          {isStockMentor ? (
            <div className="space-y-1.5 text-[#c7d2fe]">
              <div className="flex items-center justify-between text-[10px]">
                <span className="text-emerald-400 flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" /> AAPL simulated: $184.20 (+3.4%)
                </span>
                <span className="text-[#06b6d4]">Socratic Mode</span>
              </div>
              <p className="text-[10px] text-[#e0e7ff]/90 bg-white/5 p-2 rounded-sm border border-white/10">
                <strong className="text-[#06b6d4]">AI Mentor:</strong> "Notice the bullish engulfing pattern. What risk-to-reward ratio would protect your capital?"
              </p>
            </div>
          ) : isTypingChecker ? (
            <div className="space-y-1.5 text-[#c7d2fe]">
              <div className="flex items-center justify-between text-[10px]">
                <span className="text-emerald-400 flex items-center gap-1">
                  <Zap className="w-3 h-3" /> Live WPM: 96 • Acc: 98.4%
                </span>
                <span className="text-[#a78bfa]">Consistency: 94%</span>
              </div>
              <p className="text-[10px] text-[#e0e7ff]/90 bg-white/5 p-2 rounded-sm border border-white/10">
                <strong className="text-emerald-400">Pure JS:</strong> "Zero frameworks. Instant DOM updates, offline-first local history, and audio feedback."
              </p>
            </div>
          ) : (
            <div className="space-y-1.5 text-[#c7d2fe]">
              <div className="flex items-center justify-between text-[10px]">
                <span className="text-[#a78bfa]">Retention calibration: 94.2%</span>
                <span className="text-emerald-400">Streak: 12 days</span>
              </div>
              <p className="text-[10px] text-[#e0e7ff]/90 bg-white/5 p-2 rounded-sm border border-white/10">
                <strong className="text-[#a78bfa]">MicroSession:</strong> "Confidence score: 85%. Spaced interval expanded to 7 days based on recall latency."
              </p>
            </div>
          )}
        </div>

        {/* Features Checklist */}
        <div className="space-y-1.5 mb-5">
          <span className="text-[10px] font-mono uppercase text-[#a78bfa] tracking-widest font-bold block mb-1">
            Key Architecture & Features:
          </span>
          {project.features.map((feat, idx) => (
            <div key={idx} className="flex items-start gap-2 text-xs text-[#c7d2fe]/90">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#06b6d4] shrink-0 mt-0.5" />
              <span className="leading-snug">{feat}</span>
            </div>
          ))}
        </div>

        {/* Tech Stack Pills in Artistic Flair theme */}
        <div className="flex flex-wrap gap-1.5 mb-6">
          {project.tech.map((t) => (
            <span
              key={t}
              className="text-[9px] bg-[#7c3aed]/20 text-[#a78bfa] px-2 py-0.5 border border-[#7c3aed]/30 uppercase font-mono tracking-wider rounded-sm font-semibold"
            >
              {t}
            </span>
          ))}
        </div>
      </div>

      {/* Action Footer with Live Demo & Source Code Buttons */}
      <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-2.5">
        {project.demoUrl ? (
          <a
            href={project.demoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="border border-[#06b6d4]/50 bg-[#06b6d4]/15 hover:bg-[#06b6d4]/25 text-[#06b6d4] hover:text-white px-3.5 py-2 rounded-sm font-bold text-xs tracking-widest uppercase transition-all inline-flex items-center gap-1.5 shadow-[0_0_15px_rgba(6,182,212,0.2)] hover:scale-105"
          >
            <Globe className="w-3.5 h-3.5" />
            <span>Live Demo</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        ) : null}

        <a
          href={project.githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="border border-[#e0e7ff]/20 bg-white/5 hover:bg-white/10 text-white px-3.5 py-2 rounded-sm font-bold text-xs tracking-widest uppercase transition-all inline-flex items-center gap-1.5"
        >
          <Github className="w-3.5 h-3.5" />
          <span>Source Code</span>
          <ExternalLink className="w-3 h-3 text-[#c7d2fe] ml-0.5" />
        </a>
      </div>
    </div>
  );
}

export default function ProjectsSection({ onOpenDemo }: ProjectsSectionProps) {
  return (
    <section id="projects" className="py-24 relative overflow-hidden">
      {/* Background ambient accents */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-purple-600/10 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute bottom-10 right-0 w-96 h-96 bg-cyan-600/10 rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-[#60a5fa] font-mono text-sm mb-2">
            // PORTFOLIO_PROJECTS_SHOWCASE
          </p>

          <h2 className="text-4xl sm:text-5xl font-display font-extrabold text-white tracking-tight mb-4">
            Featured <span className="text-transparent bg-clip-text bg-gradient-to-br from-[#a78bfa] via-[#7c3aed] to-[#60a5fa]">Projects</span>
          </h2>

          <p className="text-base sm:text-lg text-[#c7d2fe]/80 leading-relaxed font-light">
            Production systems engineered by Garv Shaw spanning algorithmic AI tutoring, cognitive spaced repetition, and ultra-minimal client-side web utilities.
          </p>
        </div>

        {/* Projects Grid: 3 Columns on large screens */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
          {PROJECTS.map((project, idx) => (
            <ProjectTiltCard
              key={project.id}
              project={project}
              index={idx}
            />
          ))}
        </div>

        {/* GitHub Repository Callout banner in Artistic Flair style */}
        <div className="mt-12 p-6 rounded-sm bg-white/5 border border-white/10 backdrop-blur-md flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="p-3 rounded-sm bg-white/5 border border-white/10 text-[#06b6d4]">
              <Code2 className="w-5 h-5" />
            </span>
            <div>
              <h4 className="text-base font-bold text-white">
                Interested in exploring more open source commits?
              </h4>
              <p className="text-xs sm:text-sm text-[#c7d2fe]/70 font-mono">
                Technical repositories, commit histories, and architecture blueprints on GitHub.
              </p>
            </div>
          </div>

          <a
            id="projects-github-repo-link"
            href="https://github.com/garvshaw89-glitch"
            target="_blank"
            rel="noopener noreferrer"
            className="border border-[#a78bfa]/40 bg-[#7c3aed]/20 hover:bg-[#7c3aed]/30 text-white px-5 py-2.5 rounded-sm font-bold text-xs font-mono tracking-widest uppercase transition-all flex items-center gap-2 shrink-0"
          >
            <Github className="w-4 h-4 text-[#06b6d4]" />
            <span>github.com/garvshaw89-glitch</span>
            <ExternalLink className="w-3.5 h-3.5 text-[#c7d2fe]" />
          </a>
        </div>

      </div>
    </section>
  );
}
