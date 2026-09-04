import { useState, useEffect } from 'react';
import HoloMatrix3DCanvas, { HoloMatrixMode, HoloColorTheme } from './HoloMatrix3DCanvas';
import ResumeModal from './ResumeModal';
import { PERSONAL_INFO } from '../data/portfolioData';
import { 
  Sparkles, 
  Layers, 
  Zap, 
  ShieldCheck, 
  ArrowRight,
  Radio,
  Eye,
  EyeOff,
  Github,
  Linkedin,
  ExternalLink,
  Mail,
  FileText,
  RotateCcw,
  CheckCircle2
} from 'lucide-react';

interface HoloMatrixEntryPortalProps {
  onEnter?: () => void;
}

const MODES_CONFIG: { id: HoloMatrixMode; label: string; icon: string; desc: string }[] = [
  {
    id: 'quantum-tesseract',
    label: 'Quantum Tesseract',
    icon: '⬡',
    desc: '4D hyperdimensional rotating wireframe lattice'
  },
  {
    id: 'matrix-rain',
    label: 'Neural Matrix Rain',
    icon: '☵',
    desc: 'Cascading cylindrical data vortex & cyber runes'
  },
  {
    id: 'cyber-sphere',
    label: 'Geodesic Holo-Sphere',
    icon: '🌐',
    desc: 'Icosahedral energy orb with orbital telemetry rings'
  },
  {
    id: 'dna-helix',
    label: 'Cybernetic DNA Helix',
    icon: '🧬',
    desc: 'Bioluminescent data ladder & molecular cloud'
  },
  {
    id: 'wavefield-mesh',
    label: 'Topography Wavefield',
    icon: '〰️',
    desc: 'Mathematical terrain mesh reacting to mouse input'
  }
];

export default function HoloMatrixEntryPortal({ onEnter }: HoloMatrixEntryPortalProps) {
  const [selectedMode, setSelectedMode] = useState<HoloMatrixMode>('quantum-tesseract');
  const [selectedColor, setSelectedColor] = useState<HoloColorTheme>('cyan');
  const [speed, setSpeed] = useState<number>(1.2);
  const [isWarping, setIsWarping] = useState<boolean>(false);
  const [showAccessGranted, setShowAccessGranted] = useState<boolean>(false);
  const [isHudHidden, setIsHudHidden] = useState<boolean>(false);
  const [isResumeOpen, setIsResumeOpen] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<string>('');

  // Clock ticker for sci-fi terminal authenticity
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toTimeString().split(' ')[0] + '.' + String(now.getMilliseconds()).padStart(3, '0').slice(0, 2));
    };
    updateTime();
    const timer = setInterval(updateTime, 100);
    return () => clearInterval(timer);
  }, []);

  // Keyboard shortcut: Press Enter to access
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter' && !showAccessGranted && !isResumeOpen) {
        handleEnterPortal();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [showAccessGranted, isResumeOpen]);

  // Futuristic audio synthesis effect using Web Audio API
  const playCyberSound = () => {
    try {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioContextClass) return;
      const ctx = new AudioContextClass();
      
      // Dual oscillator cyber chime
      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const gain = ctx.createGain();

      osc1.type = 'sine';
      osc2.type = 'triangle';

      osc1.frequency.setValueAtTime(320, ctx.currentTime);
      osc1.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.35);

      osc2.frequency.setValueAtTime(160, ctx.currentTime);
      osc2.frequency.exponentialRampToValueAtTime(440, ctx.currentTime + 0.35);

      gain.gain.setValueAtTime(0.12, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.5);

      osc1.connect(gain);
      osc2.connect(gain);
      gain.connect(ctx.destination);

      osc1.start();
      osc2.start();
      osc1.stop(ctx.currentTime + 0.55);
      osc2.stop(ctx.currentTime + 0.55);
    } catch {
      // Audio autoplay policy fallback
    }
  };

  const handleEnterPortal = () => {
    if (isWarping) return;
    setIsWarping(true);
    playCyberSound();

    setTimeout(() => {
      setIsWarping(false);
      setShowAccessGranted(true);
      if (onEnter) onEnter();
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#070a1c] text-[#e0e7ff] overflow-hidden flex flex-col justify-between select-none">
      {/* Background Holographic Cyber Grid */}
      <div className="absolute inset-0 artistic-grid pointer-events-none opacity-20" />
      
      {/* Atmospheric Ambient Lighting */}
      <div className="absolute top-[-15%] left-[20%] w-[600px] h-[600px] bg-[#7c3aed] blur-[180px] opacity-25 rounded-full pointer-events-none" />
      <div className="absolute bottom-[-15%] right-[20%] w-[600px] h-[600px] bg-[#06b6d4] blur-[180px] opacity-25 rounded-full pointer-events-none" />

      {/* Futuristic Scanline Layer */}
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_50%,rgba(0,0,0,0.35)_51%)] bg-[length:100%_4px] pointer-events-none opacity-30" />

      {/* FULLSCREEN 3D ANIMATION STAGE (CENTERPIECE) */}
      <div 
        className={`absolute inset-0 flex items-center justify-center transition-transform duration-700 ${
          isWarping ? 'scale-150 filter blur-[2px]' : 'scale-100'
        }`}
      >
        <HoloMatrix3DCanvas
          mode={selectedMode}
          colorTheme={selectedColor}
          speed={isWarping ? 8 : speed}
          interactive={true}
          className="w-full h-full"
        />
      </div>

      {/* ZEN ANIMATION MODE FLOATING TOGGLE (Always accessible) */}
      <button
        type="button"
        onClick={() => setIsHudHidden(!isHudHidden)}
        className="absolute top-4 right-4 z-40 px-3 py-1.5 rounded-sm bg-[#0a0e27]/85 hover:bg-[#0a0e27] border border-white/20 backdrop-blur-md font-mono text-[11px] text-[#c7d2fe] hover:text-white flex items-center gap-2 shadow-lg transition-colors cursor-pointer"
        title={isHudHidden ? "Show HUD & Controls" : "Hide HUD for pure 3D animation"}
      >
        {isHudHidden ? <Eye className="w-3.5 h-3.5 text-[#06b6d4]" /> : <EyeOff className="w-3.5 h-3.5 text-[#a78bfa]" />}
        <span>{isHudHidden ? "Show HUD Controls" : "Zen View (Hide HUD)"}</span>
      </button>

      {/* TOP SCI-FI TERMINAL STATUS BAR */}
      <header 
        className={`relative z-20 border-b border-white/10 bg-[#0a0e27]/85 backdrop-blur-md px-4 sm:px-8 py-3.5 flex items-center justify-between transition-opacity duration-300 ${
          isHudHidden ? 'opacity-0 pointer-events-none' : 'opacity-100'
        }`}
      >
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#06b6d4] animate-ping" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#06b6d4]" />
          </div>
          <div>
            <div className="font-mono text-xs sm:text-sm font-bold tracking-widest text-white uppercase flex items-center gap-2">
              <span>GARV SHAW</span>
              <span className="text-white/30">//</span>
              <span className="text-[#06b6d4]">HOLO MATRIX PORTAL</span>
            </div>
          </div>
        </div>

        {/* Status indicators */}
        <div className="hidden sm:flex items-center gap-4 sm:gap-6 font-mono text-[11px] mr-36">
          <div className="flex items-center gap-2 text-purple-300">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>CLEARANCE: UNRESTRICTED</span>
          </div>

          <div className="flex items-center gap-2 text-[#c7d2fe]">
            <Radio className="w-3.5 h-3.5 text-[#06b6d4] animate-pulse" />
            <span className="text-[#06b6d4]">{currentTime || 'ONLINE'}</span>
          </div>
        </div>
      </header>

      {/* INTERACTIVE CONTROLS & HUD OVERLAYS */}
      <div className="relative flex-1 flex flex-col items-center justify-between p-4 sm:p-6 pointer-events-none">
        
        {/* Sci-Fi HUD Reticle Frame Over 3D Canvas */}
        <div 
          className={`pointer-events-none absolute inset-6 sm:inset-12 border border-white/5 rounded-sm flex flex-col justify-between transition-opacity duration-300 ${
            isHudHidden ? 'opacity-0' : 'opacity-100'
          }`}
        >
          {/* Top brackets */}
          <div className="flex justify-between p-2 text-white/40 font-mono text-[10px]">
            <span className="border-t-2 border-l-2 border-[#06b6d4] w-6 h-6 block" />
            <span className="tracking-widest uppercase text-white/60">
              SYS::RENDERER // {selectedMode.toUpperCase()}
            </span>
            <span className="border-t-2 border-r-2 border-[#06b6d4] w-6 h-6 block" />
          </div>

          {/* Bottom brackets */}
          <div className="flex justify-between p-2 text-white/40 font-mono text-[10px]">
            <span className="border-b-2 border-l-2 border-[#a78bfa] w-6 h-6 block" />
            <span className="hidden sm:inline tracking-widest text-[#a78bfa]/80">
              CLICK ENTER PORTFOLIO BELOW TO LAUNCH
            </span>
            <span className="border-b-2 border-r-2 border-[#a78bfa] w-6 h-6 block" />
          </div>
        </div>

        {/* LEFT FLOATING CONTROLS: 3D MATRIX MODEL SELECTOR */}
        <div 
          className={`absolute top-6 left-6 z-30 hidden lg:flex flex-col gap-2 max-w-xs bg-[#0a0e27]/90 backdrop-blur-md p-4 rounded-sm border border-white/10 shadow-xl pointer-events-auto transition-opacity duration-300 ${
            isHudHidden ? 'opacity-0 pointer-events-none' : 'opacity-100'
          }`}
        >
          <div className="flex items-center justify-between pb-2 border-b border-white/10">
            <span className="font-mono text-xs font-bold text-[#06b6d4] uppercase tracking-wider flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5" />
              <span>3D Matrix Models</span>
            </span>
            <span className="text-[10px] font-mono text-white/40">5 MODES</span>
          </div>

          <div className="space-y-1.5 pt-1">
            {MODES_CONFIG.map((m) => (
              <button
                key={m.id}
                type="button"
                onClick={() => setSelectedMode(m.id)}
                className={`w-full text-left p-2 rounded-sm transition-all flex items-center gap-2.5 text-xs font-mono cursor-pointer ${
                  selectedMode === m.id
                    ? 'bg-gradient-to-r from-[#7c3aed]/40 to-[#06b6d4]/30 border border-[#06b6d4] text-white font-bold shadow-[0_0_12px_rgba(6,182,212,0.3)]'
                    : 'bg-white/5 hover:bg-white/10 border border-white/5 text-[#c7d2fe]/70 hover:text-white'
                }`}
              >
                <span className="text-base">{m.icon}</span>
                <div className="flex-1 truncate">
                  <div className="truncate">{m.label}</div>
                  <div className="text-[9px] text-white/40 font-normal truncate">{m.desc}</div>
                </div>
              </button>
            ))}
          </div>

          {/* Color & Speed Quick HUD */}
          <div className="pt-2 border-t border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              {(['cyan', 'purple', 'emerald', 'amber'] as HoloColorTheme[]).map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setSelectedColor(c)}
                  className={`w-4 h-4 rounded-full transition-transform cursor-pointer ${
                    selectedColor === c ? 'ring-2 ring-white scale-110' : 'opacity-60 hover:opacity-100'
                  }`}
                  style={{
                    backgroundColor: 
                      c === 'cyan' ? '#06b6d4' :
                      c === 'purple' ? '#a78bfa' :
                      c === 'emerald' ? '#10b981' : '#f59e0b'
                  }}
                  title={`Switch to ${c} wavelength`}
                />
              ))}
            </div>

            <div className="flex items-center gap-1.5 text-[10px] font-mono text-[#c7d2fe]">
              <span>Speed:</span>
              <button
                type="button"
                onClick={() => setSpeed(s => s === 1 ? 2 : s === 2 ? 0.5 : 1)}
                className="px-1.5 py-0.5 rounded bg-white/10 hover:bg-white/20 text-white font-bold cursor-pointer"
              >
                {speed}x
              </button>
            </div>
          </div>
        </div>

        {/* MOBILE MATRIX MODE BAR (SM/MD SCREENS) */}
        <div 
          className={`lg:hidden absolute top-4 inset-x-4 z-30 flex items-center justify-center gap-1.5 overflow-x-auto pb-1 pointer-events-auto transition-opacity duration-300 ${
            isHudHidden ? 'opacity-0 pointer-events-none' : 'opacity-100'
          }`}
        >
          {MODES_CONFIG.map((m) => (
            <button
              key={m.id}
              type="button"
              onClick={() => setSelectedMode(m.id)}
              className={`px-2.5 py-1.5 rounded-sm text-xs font-mono whitespace-nowrap flex items-center gap-1.5 cursor-pointer ${
                selectedMode === m.id
                  ? 'bg-[#7c3aed] text-white border border-[#a78bfa]'
                  : 'bg-[#0a0e27]/90 text-[#c7d2fe]/80 border border-white/10'
              }`}
            >
              <span>{m.icon}</span>
              <span>{m.label}</span>
            </button>
          ))}
        </div>

        {/* CENTRAL ACTION CALLOUT (ENTER PORTFOLIO BUTTON) */}
        <div 
          className={`relative z-30 flex flex-col items-center text-center mt-auto mb-4 sm:mb-8 max-w-lg px-4 pointer-events-auto transition-opacity duration-300 ${
            isHudHidden ? 'opacity-0 pointer-events-none' : 'opacity-100'
          }`}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm bg-white/5 border border-white/10 backdrop-blur-md font-mono text-[11px] text-[#06b6d4] uppercase tracking-widest mb-3 animate-pulse">
            <Zap className="w-3.5 h-3.5" />
            <span>Interactive 3D Holographic Matrix Ready</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold font-display text-white tracking-tight mb-2">
            Garv Shaw <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#a78bfa] to-[#06b6d4]">Mainframe</span>
          </h1>

          <p className="text-xs sm:text-sm text-[#c7d2fe]/80 mb-6 font-sans">
            Explore the 3D animated matrix or launch the portfolio access terminal below.
          </p>

          {/* MAIN PROMINENT ENTER PORTFOLIO BUTTON */}
          <button
            type="button"
            id="enter-portfolio-btn"
            onClick={handleEnterPortal}
            className="group relative px-8 sm:px-10 py-4 rounded-sm font-mono text-sm sm:text-base font-bold uppercase tracking-widest text-white bg-gradient-to-r from-[#7c3aed] via-[#6366f1] to-[#06b6d4] hover:opacity-95 shadow-[0_0_30px_rgba(124,58,237,0.5)] border border-[#a78bfa] transition-all transform hover:scale-105 active:scale-95 flex items-center gap-3 cursor-pointer"
          >
            <Sparkles className="w-5 h-5 text-[#06b6d4] animate-spin" style={{ animationDuration: '4s' }} />
            <span>Enter Portfolio</span>
            <ArrowRight className="w-5 h-5 text-white group-hover:translate-x-1 transition-transform" />

            {/* Corner glowing notches */}
            <span className="absolute -top-1 -left-1 w-2 h-2 bg-[#06b6d4]" />
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-[#06b6d4]" />
            <span className="absolute -bottom-1 -left-1 w-2 h-2 bg-[#a78bfa]" />
            <span className="absolute -bottom-1 -right-1 w-2 h-2 bg-[#a78bfa]" />
          </button>

          <span className="mt-3 text-[11px] font-mono text-white/40 tracking-wider">
            Press <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-white font-mono text-[10px]">ENTER</kbd> on keyboard or click button to enter
          </span>
        </div>

      </div>

      {/* FOOTER TICKER */}
      <footer 
        className={`relative z-20 border-t border-white/10 bg-[#0a0e27]/85 backdrop-blur-md px-4 sm:px-8 py-2.5 flex flex-wrap items-center justify-between text-[11px] font-mono text-[#c7d2fe]/60 transition-opacity duration-300 ${
          isHudHidden ? 'opacity-0 pointer-events-none' : 'opacity-100'
        }`}
      >
        <div className="flex items-center gap-4">
          <span>PORTAL PROTOCOL // V4.2</span>
          <span className="hidden sm:inline text-white/30">•</span>
          <span className="hidden sm:inline">ZERO AUTH REQUIRED</span>
        </div>

        <div className="flex items-center gap-4 text-[#06b6d4]">
          <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block" />
          <span>PORTAL ONLINE // 60 FPS WEBGL</span>
        </div>
      </footer>

      {/* PORTFOLIO ACCESS GRANTED MODAL OVERLAY */}
      {showAccessGranted && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-300">
          <div className="relative w-full max-w-2xl bg-[#0a0e27] border border-[#06b6d4]/40 rounded-sm shadow-2xl p-6 sm:p-8 flex flex-col">
            
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 animate-pulse" />
                <span className="font-mono text-xs sm:text-sm font-bold tracking-wider text-emerald-400 uppercase">
                  ACCESS GRANTED // PORTFOLIO GATEWAY
                </span>
              </div>
              <button
                type="button"
                onClick={() => setShowAccessGranted(false)}
                className="font-mono text-xs text-[#c7d2fe]/70 hover:text-white flex items-center gap-1.5 px-2.5 py-1 rounded bg-white/5 hover:bg-white/10 border border-white/10 transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5 text-[#06b6d4]" />
                <span>Return to Matrix</span>
              </button>
            </div>

            {/* Profile Brief */}
            <div className="mb-6">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-1">
                {PERSONAL_INFO.name}
              </h2>
              <p className="text-sm font-mono text-[#06b6d4] mb-2">
                {PERSONAL_INFO.headline}
              </p>
              <p className="text-xs sm:text-sm text-[#c7d2fe]/80 leading-relaxed font-sans">
                {PERSONAL_INFO.aboutBio}
              </p>
            </div>

            {/* Direct Portfolio Actions */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6 font-mono text-xs">
              
              {/* GitHub */}
              <a
                href={PERSONAL_INFO.socials.github}
                target="_blank"
                rel="noreferrer"
                className="p-3.5 rounded-sm bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[#06b6d4] transition-all flex items-center justify-between group"
              >
                <div className="flex items-center gap-3">
                  <Github className="w-5 h-5 text-white" />
                  <div>
                    <div className="font-bold text-white group-hover:text-[#06b6d4]">GitHub Portfolio</div>
                    <div className="text-[10px] text-white/40">Repositories & Code</div>
                  </div>
                </div>
                <ExternalLink className="w-4 h-4 text-white/40 group-hover:text-white transition-colors" />
              </a>

              {/* Featured Project */}
              <a
                href="https://stock-mentortutor.vercel.app/"
                target="_blank"
                rel="noreferrer"
                className="p-3.5 rounded-sm bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[#a78bfa] transition-all flex items-center justify-between group"
              >
                <div className="flex items-center gap-3">
                  <Zap className="w-5 h-5 text-[#a78bfa]" />
                  <div>
                    <div className="font-bold text-white group-hover:text-[#a78bfa]">StockMentor Live Demo</div>
                    <div className="text-[10px] text-white/40">AI Trading Platform</div>
                  </div>
                </div>
                <ExternalLink className="w-4 h-4 text-white/40 group-hover:text-white transition-colors" />
              </a>

              {/* LinkedIn */}
              <a
                href={PERSONAL_INFO.socials.linkedin}
                target="_blank"
                rel="noreferrer"
                className="p-3.5 rounded-sm bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[#60a5fa] transition-all flex items-center justify-between group"
              >
                <div className="flex items-center gap-3">
                  <Linkedin className="w-5 h-5 text-[#60a5fa]" />
                  <div>
                    <div className="font-bold text-white group-hover:text-[#60a5fa]">LinkedIn Profile</div>
                    <div className="text-[10px] text-white/40">Professional Network</div>
                  </div>
                </div>
                <ExternalLink className="w-4 h-4 text-white/40 group-hover:text-white transition-colors" />
              </a>

              {/* Direct Email */}
              <a
                href={`mailto:${PERSONAL_INFO.email}`}
                className="p-3.5 rounded-sm bg-white/5 hover:bg-white/10 border border-white/10 hover:border-emerald-400 transition-all flex items-center justify-between group"
              >
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-emerald-400" />
                  <div>
                    <div className="font-bold text-white group-hover:text-emerald-400">Direct Email</div>
                    <div className="text-[10px] text-white/40">{PERSONAL_INFO.email}</div>
                  </div>
                </div>
                <ExternalLink className="w-4 h-4 text-white/40 group-hover:text-white transition-colors" />
              </a>

            </div>

            {/* Bottom Actions */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-white/10">
              <button
                type="button"
                onClick={() => setIsResumeOpen(true)}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-sm bg-white/10 hover:bg-white/15 border border-white/20 text-xs font-mono font-bold text-white uppercase tracking-wider transition-colors cursor-pointer"
              >
                <FileText className="w-4 h-4 text-[#06b6d4]" />
                <span>View Full Resume / CV</span>
              </button>

              <button
                type="button"
                onClick={() => setShowAccessGranted(false)}
                className="inline-flex items-center gap-2 px-5 py-2 rounded-sm bg-gradient-to-r from-[#7c3aed] to-[#06b6d4] text-xs font-mono font-bold text-white uppercase tracking-wider hover:opacity-90 transition-opacity cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Back to 3D Matrix</span>
              </button>
            </div>

          </div>
        </div>
      )}

      {/* Resume Modal */}
      <ResumeModal 
        isOpen={isResumeOpen} 
        onClose={() => setIsResumeOpen(false)} 
      />
    </div>
  );
}

