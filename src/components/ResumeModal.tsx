import { PERSONAL_INFO } from '../data/portfolioData';
import { 
  X, 
  Download, 
  Printer, 
  Mail, 
  MapPin, 
  Github, 
  Linkedin, 
  ExternalLink, 
  GraduationCap, 
  Briefcase, 
  Code, 
  Cpu, 
  Layers
} from 'lucide-react';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ResumeModal({ isOpen, onClose }: ResumeModalProps) {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-4xl max-h-[90vh] bg-[#0a0e27] border border-white/20 rounded-sm shadow-2xl shadow-black overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-white/5">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rotate-45 bg-[#06b6d4]" />
            <span className="font-mono text-xs font-semibold text-white tracking-wider uppercase">
              GARV_SHAW_CURRICULUM_VITAE.PDF
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-sm text-xs font-mono font-bold uppercase tracking-wider text-white bg-white/5 hover:bg-white/10 border border-white/20 transition-colors"
            >
              <Printer className="w-3.5 h-3.5 text-[#06b6d4]" />
              <span className="hidden sm:inline">Print</span>
            </button>
            <a
              href={`mailto:${PERSONAL_INFO.email}?subject=Requesting Official PDF Resume - Garv Shaw`}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-sm text-xs font-mono font-bold uppercase tracking-wider text-white bg-gradient-to-r from-[#7c3aed] to-[#60a5fa] hover:opacity-95 transition-opacity"
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Request PDF</span>
            </a>
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-sm text-[#c7d2fe] hover:text-white hover:bg-white/10 border border-transparent hover:border-white/20 transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Resume Content Paper */}
        <div className="p-6 sm:p-10 overflow-y-auto text-purple-100 font-sans space-y-8 print:text-black print:bg-white">
          
          {/* Header */}
          <div className="border-b border-purple-800/40 pb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-display font-extrabold text-white tracking-tight">
                {PERSONAL_INFO.name}
              </h1>
              <p className="text-sm font-mono text-cyan-300 mt-1">
                {PERSONAL_INFO.headline}
              </p>
            </div>

            <div className="text-xs font-mono text-purple-300 space-y-1 sm:text-right">
              <div className="flex sm:justify-end items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-pink-400" />
                <span>India</span>
              </div>
              <div className="flex sm:justify-end items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-purple-400" />
                <a href={PERSONAL_INFO.socials.email} className="hover:text-cyan-300">
                  {PERSONAL_INFO.email}
                </a>
              </div>
              <div className="flex sm:justify-end items-center gap-2 pt-1">
                <a href={PERSONAL_INFO.socials.linkedin} target="_blank" rel="noreferrer" className="text-blue-400 hover:underline">
                  LinkedIn
                </a>
                <span>•</span>
                <a href={PERSONAL_INFO.socials.github} target="_blank" rel="noreferrer" className="text-cyan-400 hover:underline">
                  GitHub
                </a>
              </div>
            </div>
          </div>

          {/* Education */}
          <div>
            <h2 className="text-sm font-mono uppercase tracking-widest text-cyan-400 font-bold mb-3 flex items-center gap-2">
              <GraduationCap className="w-4 h-4" />
              <span>Education</span>
            </h2>
            <div className="p-4 rounded-xl bg-[#090d26] border border-purple-900/60 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h3 className="font-display font-bold text-white text-base">
                  Bachelor of Technology (B.Tech) in Computer Science & Engineering
                </h3>
                <p className="text-xs text-purple-300">
                  Specializing in Artificial Intelligence, Cloud Infrastructure & Systems Design
                </p>
              </div>
              <span className="text-xs font-mono text-purple-400 bg-purple-950 px-2.5 py-1 rounded border border-purple-800 shrink-0">
                Undergraduate
              </span>
            </div>
          </div>

          {/* Featured Engineering Projects */}
          <div>
            <h2 className="text-sm font-mono uppercase tracking-widest text-cyan-400 font-bold mb-3 flex items-center gap-2">
              <Briefcase className="w-4 h-4" />
              <span>Featured Engineering Projects</span>
            </h2>

            <div className="space-y-4">
              {/* Project 1: StockMentor */}
              <div className="p-4 rounded-xl bg-[#090d26] border border-purple-900/60">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-2">
                  <h3 className="font-display font-bold text-white text-base flex items-center gap-2">
                    <span>StockMentor</span>
                    <span className="text-xs font-mono text-purple-400 font-normal">
                      // AI-Powered Socratic Financial Learning Platform
                    </span>
                  </h3>
                  <a
                    href="https://github.com/garvshaw89-glitch/StockMentor"
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs font-mono text-cyan-300 flex items-center gap-1 hover:underline"
                  >
                    <span>View Repository</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
                <p className="text-xs text-purple-200/90 mb-3">
                  Architected an interactive trading education engine utilizing the Socratic method to guide aspiring investors through price action analysis, support/resistance mechanics, and risk mitigation.
                </p>
                <ul className="text-xs text-purple-300/80 list-disc list-inside space-y-1 font-sans">
                  <li>Built responsive technical chart visualizations simulating real-time market volatility.</li>
                  <li>Engineered guided Socratic AI mentor prompts prompting critical reasoning over rote answers.</li>
                  <li>Integrated zero-risk simulated portfolio execution for live strategy feedback.</li>
                </ul>
                <div className="mt-3 flex flex-wrap gap-1.5 font-mono text-[11px] text-purple-300">
                  <span className="px-2 py-0.5 rounded bg-purple-950/80 border border-purple-800/40">AI</span>
                  <span className="px-2 py-0.5 rounded bg-purple-950/80 border border-purple-800/40">Python</span>
                  <span className="px-2 py-0.5 rounded bg-purple-950/80 border border-purple-800/40">React</span>
                  <span className="px-2 py-0.5 rounded bg-purple-950/80 border border-purple-800/40">Chart.js</span>
                </div>
              </div>

              {/* Project 2: MicroSkill */}
              <div className="p-4 rounded-xl bg-[#090d26] border border-purple-900/60">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-2">
                  <h3 className="font-display font-bold text-white text-base flex items-center gap-2">
                    <span>MicroSkill</span>
                    <span className="text-xs font-mono text-purple-400 font-normal">
                      // Spaced Repetition Cognitive Learning Engine
                    </span>
                  </h3>
                  <a
                    href="https://github.com/garvshaw89-glitch/MicroSkill-Version-1.0"
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs font-mono text-cyan-300 flex items-center gap-1 hover:underline"
                  >
                    <span>View Repository</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
                <p className="text-xs text-purple-200/90 mb-3">
                  Developed an evidence-based micro-learning platform incorporating cognitive psychology principles, dual-axis confidence calibration, and adaptive spaced repetition schedules.
                </p>
                <ul className="text-xs text-purple-300/80 list-disc list-inside space-y-1 font-sans">
                  <li>Designed high-engagement 5-15 minute modules structured around active recall.</li>
                  <li>Implemented confidence calibration metrics to counter illusion-of-competence biases.</li>
                  <li>Structured modular client-side state machine ensuring offline durability and low latency.</li>
                </ul>
                <div className="mt-3 flex flex-wrap gap-1.5 font-mono text-[11px] text-purple-300">
                  <span className="px-2 py-0.5 rounded bg-purple-950/80 border border-purple-800/40">React</span>
                  <span className="px-2 py-0.5 rounded bg-purple-950/80 border border-purple-800/40">Algorithms</span>
                  <span className="px-2 py-0.5 rounded bg-purple-950/80 border border-purple-800/40">Cognitive Psychology</span>
                  <span className="px-2 py-0.5 rounded bg-purple-950/80 border border-purple-800/40">Tailwind CSS</span>
                </div>
              </div>
            </div>
          </div>

          {/* Technical Skills Summary */}
          <div>
            <h2 className="text-sm font-mono uppercase tracking-widest text-cyan-400 font-bold mb-3 flex items-center gap-2">
              <Code className="w-4 h-4" />
              <span>Technical Skills & Tooling</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-lg bg-[#090d26] border border-purple-900/50">
                <span className="font-mono text-purple-400 font-semibold block mb-1">
                  Languages:
                </span>
                <span className="text-purple-200">
                  Python, JavaScript (ES6+), C, C++, HTML5
                </span>
              </div>
              <div className="p-3 rounded-lg bg-[#090d26] border border-purple-900/50">
                <span className="font-mono text-purple-400 font-semibold block mb-1">
                  Frameworks & Web:
                </span>
                <span className="text-purple-200">
                  React, Express.js, Node.js, Gatsby, Firebase
                </span>
              </div>
              <div className="p-3 rounded-lg bg-[#090d26] border border-purple-900/50">
                <span className="font-mono text-purple-400 font-semibold block mb-1">
                  Cloud & DevOps:
                </span>
                <span className="text-purple-200">
                  AWS, Google Cloud Platform, Vercel, Netlify, Kubernetes
                </span>
              </div>
              <div className="p-3 rounded-lg bg-[#090d26] border border-purple-900/50">
                <span className="font-mono text-purple-400 font-semibold block mb-1">
                  AI/ML & Architecture:
                </span>
                <span className="text-purple-200">
                  TensorFlow, Neural Networks, Machine Learning, REST APIs, JWT, Docker, Git
                </span>
              </div>
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-purple-900/50 bg-[#080b20] flex items-center justify-between text-xs font-mono text-purple-400">
          <span>Garv Shaw • Candidate for Software Engineering & AI Roles</span>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-purple-900/50 hover:bg-purple-800 text-purple-200 border border-purple-600/30"
          >
            Close Viewer
          </button>
        </div>
      </div>
    </div>
  );
}
