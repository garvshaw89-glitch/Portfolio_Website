import { motion } from 'motion/react';

interface HoloDividerProps {
  id?: string;
  tag?: string;
  variant?: 'cyan' | 'purple' | 'dual';
  className?: string;
}

export default function HoloDivider({
  id = 'holo-divider',
  tag,
  variant = 'dual',
  className = ''
}: HoloDividerProps) {
  const getGradient = () => {
    switch (variant) {
      case 'cyan':
        return 'from-transparent via-[#06b6d4] to-transparent';
      case 'purple':
        return 'from-transparent via-[#a78bfa] to-transparent';
      case 'dual':
      default:
        return 'from-transparent via-[#06b6d4] via-50% via-[#a78bfa] to-transparent';
    }
  };

  const getGlowColor = () => {
    switch (variant) {
      case 'cyan':
        return 'rgba(6, 182, 212, 0.4)';
      case 'purple':
        return 'rgba(167, 139, 250, 0.4)';
      case 'dual':
      default:
        return 'rgba(6, 182, 212, 0.35)';
    }
  };

  return (
    <div
      id={id}
      className={`relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 flex items-center justify-center overflow-hidden pointer-events-none select-none ${className}`}
    >
      {/* Background Soft Glow Aura */}
      <div
        className="absolute w-2/3 h-6 blur-md opacity-30 -z-10"
        style={{
          background: `radial-gradient(ellipse at center, ${getGlowColor()} 0%, transparent 75%)`
        }}
      />

      {/* Outer subtle rail line */}
      <div className="absolute inset-x-8 sm:inset-x-24 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      {/* Glowing holographic core beam */}
      <div
        className={`relative w-full h-[1.5px] bg-gradient-to-r ${getGradient()} shadow-[0_0_12px_${getGlowColor()}] flex items-center justify-center`}
      >
        {/* Animated Light Pulse traveling across the beam */}
        <motion.div
          className="absolute h-full w-24 sm:w-36 bg-gradient-to-r from-transparent via-white/80 to-transparent blur-[1px]"
          animate={{
            x: ['-250%', '250%'],
            opacity: [0, 0.9, 0]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: 'easeInOut',
            repeatDelay: 1.5
          }}
        />

        {/* Center Holographic Reticle / Diamond Node */}
        <div className="relative z-10 flex items-center justify-center px-4 bg-[#0a0e27]">
          {/* Tech crosshairs / brackets */}
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full border border-cyan-400/30 bg-[#070a1c]/90 shadow-[0_0_15px_rgba(6,182,212,0.25)]">
            <span className="w-1.5 h-1.5 rotate-45 bg-[#06b6d4] shadow-[0_0_6px_#06b6d4] inline-block" />
            
            {tag ? (
              <span className="font-mono text-[10px] sm:text-[11px] font-semibold tracking-widest text-[#c7d2fe] uppercase px-1">
                {tag}
              </span>
            ) : (
              <div className="flex items-center gap-1 px-1">
                <span className="w-1 h-1 rounded-full bg-[#a78bfa] opacity-80" />
                <span className="w-8 sm:w-12 h-px bg-gradient-to-r from-[#06b6d4] to-[#a78bfa]" />
                <span className="w-1 h-1 rounded-full bg-[#06b6d4] opacity-80" />
              </div>
            )}

            <span className="w-1.5 h-1.5 rotate-45 bg-[#a78bfa] shadow-[0_0_6px_#a78bfa] inline-block" />
          </div>
        </div>
      </div>
    </div>
  );
}
