import { useState } from 'react';
import HoloMatrix3DCanvas, { HoloMatrixMode, HoloColorTheme } from './HoloMatrix3DCanvas';
import { 
  Maximize2, 
  Cpu, 
  Compass, 
  Zap,
  X,
  Layers
} from 'lucide-react';

interface HoloMatrixShowcaseSectionProps {
  onOpenPortal?: () => void;
}

const MODES: {
  id: HoloMatrixMode;
  name: string;
  category: string;
  icon: string;
  description: string;
  highlights: string[];
}[] = [
  {
    id: 'quantum-tesseract',
    name: 'Quantum 4D Tesseract',
    category: 'Hyperdimensional Topology',
    icon: '⬡',
    description: 'A dual-nested 4D hypercube projected into 3D space with contra-rotating inner geometry, illuminated vertex nodes, and orbital quantum field rings.',
    highlights: ['4D Axis Projections', '16 Dynamic Nodes', 'Contra-rotational Core']
  },
  {
    id: 'matrix-rain',
    name: 'Neural Matrix Rain & Vortex',
    category: 'Cybernetic Cryptography',
    icon: '☵',
    description: '3D cylindrical digital code vortex with falling hexadecimal data glyphs, surrounding cybernetic data cage, and rotating singularity toruses.',
    highlights: ['1800 Particle Glyphs', 'Cylindrical 3D Depth', 'Singularity Torus Field']
  },
  {
    id: 'cyber-sphere',
    name: 'Geodesic Holo-Sphere',
    category: 'Orbital Telemetry & Scanner',
    icon: '🌐',
    description: 'A high-frequency icosahedral wireframe sphere encapsulated by 3 concentric orbital gyroscopic rings and an oscillating laser scanner plane.',
    highlights: ['Icosahedral Wireframe', 'Gyroscopic Telemetry', 'Laser Oscillating Plane']
  },
  {
    id: 'dna-helix',
    name: 'Cybernetic DNA Helix',
    category: 'Biometric Holographic Lattice',
    icon: '🧬',
    description: 'A bioluminescent double-helix data ladder rendering dual polynucleotide strands connected by reactive data rungs surrounded by cosmic particle dust.',
    highlights: ['Double Strand Helix', '60 Dynamic Rungs', '400 Ambient Dust Nodes']
  },
  {
    id: 'wavefield-mesh',
    name: 'Topography Wavefield',
    category: 'Harmonic Terrain Dynamics',
    icon: '〰️',
    description: 'A high-density mathematical terrain mesh that undulates continuously using harmonic trigonometric wave equations and reacts to cursor coordinates.',
    highlights: ['Harmonic Wave Function', 'Interactive Tilt Reactive', 'Beacon Resonance']
  }
];

export default function HoloMatrixShowcaseSection({ onOpenPortal }: HoloMatrixShowcaseSectionProps) {
  const [activeMode, setActiveMode] = useState<HoloMatrixMode>('quantum-tesseract');
  const [activeColor, setActiveColor] = useState<HoloColorTheme>('cyan');
  const [speed, setSpeed] = useState<number>(1);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

  const currentModeInfo = MODES.find(m => m.id === activeMode) || MODES[0];

  const handleLaunchFullscreen = () => {
    if (onOpenPortal) {
      onOpenPortal();
    } else {
      setIsFullscreen(true);
    }
  };

  return (
    <section 
      id="holo-matrix" 
      className="relative py-24 sm:py-32 overflow-hidden border-t border-purple-900/30"
    >
      {/* Background glow and grid */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-[#7c3aed]/10 blur-[170px] rounded-full pointer-events-none -z-10" />
      <div className="absolute bottom-10 right-10 w-[400px] h-[400px] bg-[#06b6d4]/10 blur-[150px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm bg-[#7c3aed]/10 border border-[#7c3aed]/30 text-[#a78bfa] font-mono text-xs uppercase tracking-widest mb-3">
              <Zap className="w-3.5 h-3.5 text-[#06b6d4]" />
              <span>3D Holographic Laboratory</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold font-display text-white tracking-tight">
              Interactive <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#a78bfa] via-[#7c3aed] to-[#06b6d4]">Holo Matrix</span> Models
            </h2>
            <p className="mt-3 text-sm sm:text-base text-[#c7d2fe]/80 max-w-2xl font-light">
              Explore 5 distinct GPU-accelerated 3D mathematical holographic matrices. Switch between models, alter color wavelengths, and adjust simulation speeds in real-time.
            </p>
          </div>

          <button
            type="button"
            onClick={handleLaunchFullscreen}
            className="self-start md:self-auto px-5 py-2.5 rounded-sm font-mono text-xs font-bold uppercase tracking-wider text-white bg-gradient-to-r from-[#7c3aed] to-[#06b6d4] hover:opacity-90 transition-all flex items-center gap-2 shadow-[0_0_20px_rgba(6,182,212,0.3)] cursor-pointer"
          >
            <Maximize2 className="w-4 h-4" />
            <span>Launch Fullscreen 3D</span>
          </button>
        </div>

        {/* Interactive Holo Matrix Studio Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          
          {/* Left Column: 3D Holographic Stage (lg:col-span-7) */}
          <div className="lg:col-span-7 bg-[#0a0e27]/80 rounded-sm border border-white/10 backdrop-blur-md overflow-hidden flex flex-col relative min-h-[460px] sm:min-h-[520px]">
            
            {/* Top Canvas HUD Toolbar */}
            <div className="p-3 sm:p-4 border-b border-white/10 bg-white/5 flex items-center justify-between font-mono text-xs">
              <div className="flex items-center gap-2">
                <span className="text-lg">{currentModeInfo.icon}</span>
                <div>
                  <div className="text-white font-bold">{currentModeInfo.name}</div>
                  <div className="text-[10px] text-[#06b6d4]">{currentModeInfo.category}</div>
                </div>
              </div>

              {/* Color Palettes */}
              <div className="flex items-center gap-2">
                <span className="text-[10px] text-white/50 hidden sm:inline">THEME:</span>
                {(['cyan', 'purple', 'emerald', 'amber'] as HoloColorTheme[]).map((c) => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => setActiveColor(c)}
                    className={`w-4 h-4 rounded-full transition-all ${
                      activeColor === c ? 'scale-125 ring-2 ring-white' : 'opacity-60 hover:opacity-100'
                    }`}
                    style={{
                      backgroundColor:
                        c === 'cyan' ? '#06b6d4' :
                        c === 'purple' ? '#a78bfa' :
                        c === 'emerald' ? '#10b981' : '#f59e0b'
                    }}
                    title={`${c} wavelength`}
                  />
                ))}
              </div>
            </div>

            {/* 3D WebGL Canvas */}
            <div className="relative flex-1 w-full h-full min-h-[380px]">
              <HoloMatrix3DCanvas
                mode={activeMode}
                colorTheme={activeColor}
                speed={speed}
                interactive={true}
                className="w-full h-full"
              />

              {/* Reticle guide markings */}
              <div className="pointer-events-none absolute inset-4 border border-white/5 flex flex-col justify-between p-2 font-mono text-[9px] text-white/30">
                <div className="flex justify-between">
                  <span>[X: AUTO]</span>
                  <span>[Y: INTERACTIVE]</span>
                  <span>[Z: ORTHO]</span>
                </div>
                <div className="flex justify-between">
                  <span>[RENDER: WEBGL 2.0]</span>
                  <span>[TILT: ACTIVE]</span>
                </div>
              </div>
            </div>

            {/* Bottom Controls Bar */}
            <div className="p-3 border-t border-white/10 bg-[#080c24] flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
              <div className="flex items-center gap-2 text-[#c7d2fe]/70">
                <Compass className="w-3.5 h-3.5 text-[#06b6d4]" />
                <span className="text-[11px]">Click & drag cursor to rotate 3D matrix in real-time</span>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-[11px] text-white/50">Speed:</span>
                {[0.5, 1, 1.8].map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setSpeed(s)}
                    className={`px-2 py-0.5 rounded text-[11px] font-mono ${
                      speed === s 
                        ? 'bg-[#7c3aed] text-white font-bold' 
                        : 'bg-white/5 text-[#c7d2fe]/60 hover:bg-white/10'
                    }`}
                  >
                    {s}x
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Mode Selector & Telemetry Cards (lg:col-span-5) */}
          <div className="lg:col-span-5 flex flex-col gap-3">
            
            {/* Mode selection buttons */}
            <div className="space-y-2">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#a78bfa] block mb-1">
                // Select Holographic Model Architecture:
              </span>

              {MODES.map((modeItem) => {
                const isSelected = activeMode === modeItem.id;
                return (
                  <button
                    key={modeItem.id}
                    type="button"
                    onClick={() => setActiveMode(modeItem.id)}
                    className={`w-full text-left p-3.5 rounded-sm border transition-all flex items-start gap-3 cursor-pointer ${
                      isSelected
                        ? 'bg-gradient-to-r from-[#7c3aed]/25 to-[#06b6d4]/15 border-[#06b6d4] shadow-[0_0_15px_rgba(6,182,212,0.2)]'
                        : 'bg-white/5 hover:bg-white/10 border-white/10 hover:border-white/20'
                    }`}
                  >
                    <span className="text-2xl mt-0.5">{modeItem.icon}</span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className={`text-sm font-display font-bold truncate ${isSelected ? 'text-white' : 'text-[#e0e7ff]'}`}>
                          {modeItem.name}
                        </span>
                        {isSelected && (
                          <span className="text-[9px] font-mono uppercase px-1.5 py-0.5 rounded bg-[#06b6d4]/20 text-[#06b6d4] border border-[#06b6d4]/30">
                            Active
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-[#c7d2fe]/75 font-sans mt-0.5 line-clamp-2">
                        {modeItem.description}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Selected Mode Architectural Breakdown Card */}
            <div className="p-4 rounded-sm bg-white/5 border border-white/10 font-mono text-xs space-y-3 mt-auto">
              <div className="flex items-center justify-between text-[#06b6d4] font-bold uppercase text-[11px] pb-1 border-b border-white/10">
                <span className="flex items-center gap-1.5">
                  <Cpu className="w-3.5 h-3.5" />
                  <span>Hardware Specifications</span>
                </span>
                <span>{currentModeInfo.category}</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1">
                {currentModeInfo.highlights.map((highlight, idx) => (
                  <div key={idx} className="p-2 rounded bg-white/5 border border-white/5 text-[10px] text-purple-200">
                    <span className="text-[#06b6d4] block font-bold mb-0.5">0{idx + 1} //</span>
                    <span>{highlight}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>

      </div>

      {/* Immersive Fullscreen 3D Holo Matrix Modal */}
      {isFullscreen && (
        <div className="fixed inset-0 z-50 bg-[#070a1c] text-[#e0e7ff] flex flex-col justify-between overflow-hidden animate-in fade-in duration-300 select-none">
          {/* Background Grid */}
          <div className="absolute inset-0 artistic-grid pointer-events-none opacity-20" />

          {/* Fullscreen 3D Canvas */}
          <div className="absolute inset-0 flex items-center justify-center">
            <HoloMatrix3DCanvas
              mode={activeMode}
              colorTheme={activeColor}
              speed={speed}
              interactive={true}
              className="w-full h-full"
            />
          </div>

          {/* Top Bar */}
          <div className="relative z-20 flex items-center justify-between p-4 sm:p-6 bg-[#0a0e27]/80 backdrop-blur-md border-b border-white/10">
            <div className="flex items-center gap-3">
              <span className="text-2xl">{currentModeInfo.icon}</span>
              <div>
                <div className="font-mono text-xs sm:text-sm font-bold text-white uppercase tracking-wider">
                  {currentModeInfo.name}
                </div>
                <div className="text-[10px] font-mono text-[#06b6d4]">
                  {currentModeInfo.category} // 60 FPS WEBGL 3D
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {/* Theme switcher */}
              <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-sm bg-white/5 border border-white/10">
                {(['cyan', 'purple', 'emerald', 'amber'] as HoloColorTheme[]).map((c) => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => setActiveColor(c)}
                    className={`w-4 h-4 rounded-full transition-transform cursor-pointer ${
                      activeColor === c ? 'ring-2 ring-white scale-110' : 'opacity-60 hover:opacity-100'
                    }`}
                    style={{
                      backgroundColor:
                        c === 'cyan' ? '#06b6d4' :
                        c === 'purple' ? '#a78bfa' :
                        c === 'emerald' ? '#10b981' : '#f59e0b'
                    }}
                    title={`${c} wavelength`}
                  />
                ))}
              </div>

              {/* Close Fullscreen Button */}
              <button
                type="button"
                onClick={() => setIsFullscreen(false)}
                className="px-4 py-2 rounded-sm bg-white/10 hover:bg-white/20 border border-white/20 text-white font-mono text-xs font-bold uppercase tracking-wider flex items-center gap-2 cursor-pointer transition-colors"
              >
                <X className="w-4 h-4 text-[#06b6d4]" />
                <span>Exit Fullscreen</span>
              </button>
            </div>
          </div>

          {/* Bottom Floating Selector */}
          <div className="relative z-20 flex items-center justify-center p-4 bg-[#0a0e27]/80 backdrop-blur-md border-t border-white/10 gap-2 overflow-x-auto">
            {MODES.map((m) => (
              <button
                key={m.id}
                type="button"
                onClick={() => setActiveMode(m.id)}
                className={`px-3 py-1.5 rounded-sm text-xs font-mono whitespace-nowrap flex items-center gap-2 cursor-pointer transition-all ${
                  activeMode === m.id
                    ? 'bg-[#7c3aed] text-white border border-[#06b6d4] shadow-[0_0_12px_rgba(6,182,212,0.4)]'
                    : 'bg-white/5 hover:bg-white/10 border border-white/10 text-[#c7d2fe]/70'
                }`}
              >
                <span>{m.icon}</span>
                <span>{m.name}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
