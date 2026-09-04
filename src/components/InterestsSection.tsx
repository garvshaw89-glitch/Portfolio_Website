import { useState } from 'react';
import { INTEREST_AREAS } from '../data/portfolioData';
import { Sparkles, Compass, ArrowUpRight } from 'lucide-react';

export default function InterestsSection() {
  const [activeCard, setActiveCard] = useState<string | null>(null);

  return (
    <section id="interests" className="py-24 relative overflow-hidden">
      {/* Background ambient light */}
      <div className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#7c3aed]/10 rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-[#60a5fa] font-mono text-sm mb-2">
            // CORE_FOCUS_MATRIX
          </p>

          <h2 className="text-4xl sm:text-5xl font-display font-extrabold text-white tracking-tight mb-4">
            Interests & <span className="text-transparent bg-clip-text bg-gradient-to-br from-[#a78bfa] via-[#7c3aed] to-[#60a5fa]">Focus Areas</span>
          </h2>

          <p className="text-base sm:text-lg text-[#c7d2fe]/80 leading-relaxed font-light">
            Key research directions and technical domains where Garv focuses his engineering energy, research exploration, and product craft.
          </p>
        </div>

        {/* 6 Interactive Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {INTEREST_AREAS.map((item, index) => {
            const isSelected = activeCard === item.id;

            return (
              <div
                key={item.id}
                onMouseEnter={() => setActiveCard(item.id)}
                onMouseLeave={() => setActiveCard(null)}
                className={`relative rounded-sm bg-white/5 border p-7 backdrop-blur-sm transition-all duration-300 flex flex-col justify-between group cursor-default ${
                  isSelected
                    ? 'border-[#06b6d4] shadow-[0_0_25px_rgba(6,182,212,0.2)] -translate-y-1.5'
                    : 'border-white/10 hover:border-white/25 shadow-lg shadow-black/30'
                }`}
              >
                {/* Subtle top indicator bar */}
                <div
                  className={`absolute top-0 left-6 right-6 h-[2px] bg-gradient-to-r ${item.gradient} opacity-0 group-hover:opacity-100 transition-opacity`}
                />

                <div>
                  {/* Top Bar: Icon & Index */}
                  <div className="flex items-center justify-between mb-5">
                    <div className="text-3xl p-2.5 rounded-sm bg-white/5 border border-white/10 group-hover:scale-105 transition-transform">
                      {item.icon}
                    </div>
                    <span className="font-mono text-[10px] text-[#06b6d4] bg-white/5 px-2 py-0.5 rounded-sm border border-white/10 uppercase tracking-wider">
                      0{index + 1} / DOMAIN
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="font-display font-bold text-xl text-white group-hover:text-[#a78bfa] transition-colors mb-3 flex items-center justify-between">
                    <span>{item.title}</span>
                    <ArrowUpRight className="w-4 h-4 text-[#06b6d4] opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                  </h3>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-[#c7d2fe]/75 leading-relaxed mb-6 font-light">
                    {item.description}
                  </p>
                </div>

                {/* Tags */}
                <div className="pt-4 border-t border-white/10 flex flex-wrap gap-1.5">
                  {item.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 text-[10px] font-mono rounded-sm bg-white/5 border border-white/10 text-[#c7d2fe]/90 group-hover:text-[#06b6d4] group-hover:border-[#06b6d4]/40 transition-colors"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
