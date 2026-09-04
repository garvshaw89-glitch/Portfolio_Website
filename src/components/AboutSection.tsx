import { PERSONAL_INFO } from '../data/portfolioData';
import { 
  GraduationCap, 
  Sparkles, 
  Compass, 
  Lightbulb, 
  Rocket, 
  Layers, 
  FileText,
  Terminal,
  HeartHandshake
} from 'lucide-react';

interface AboutSectionProps {
  onOpenResume: () => void;
}

export default function AboutSection({ onOpenResume }: AboutSectionProps) {
  const pillars = [
    {
      icon: <GraduationCap className="w-5 h-5 text-cyan-400" />,
      title: "B.Tech Computer Science",
      desc: "Undergraduate student in Computer Science & Engineering with strong foundations in algorithms, data structures, and computer architecture."
    },
    {
      icon: <Sparkles className="w-5 h-5 text-purple-400" />,
      title: "AI & Neural Systems",
      desc: "Passionate about building AI-powered solutions that enhance human decision-making, from Socratic educational bots to ML pipelines."
    },
    {
      icon: <Rocket className="w-5 h-5 text-blue-400" />,
      title: "Full-Stack & Cloud",
      desc: "Hands-on experience deploying responsive web applications on AWS, Google Cloud, Docker, and serverless edge frameworks."
    },
    {
      icon: <Lightbulb className="w-5 h-5 text-pink-400" />,
      title: "EdTech & FinTech Creator",
      desc: "Creator of StockMentor and MicroSkill, turning cognitive psychology and financial market principles into interactive software."
    }
  ];

  return (
    <section id="about" className="py-24 relative overflow-hidden">
      {/* Ambient background blur */}
      <div className="absolute top-1/2 right-10 w-96 h-96 bg-cyan-600/10 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-purple-600/10 rounded-full blur-[120px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-[#60a5fa] font-mono text-sm mb-2">
            // PHILOSOPHY_AND_BACKGROUND
          </p>

          <h2 className="text-4xl sm:text-5xl font-display font-extrabold text-white tracking-tight mb-4">
            About <span className="text-transparent bg-clip-text bg-gradient-to-br from-[#a78bfa] via-[#7c3aed] to-[#60a5fa]">Garv Shaw</span>
          </h2>

          <p className="text-base sm:text-xl font-medium text-[#c7d2fe] font-display max-w-2xl mx-auto leading-relaxed">
            "{PERSONAL_INFO.aboutTagline}"
          </p>
        </div>

        {/* 2-Column Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center mb-16">
          
          {/* Left Column: Narrative story & Key Interests */}
          <div className="lg:col-span-7 space-y-6">
            <div className="rounded-sm bg-white/5 border border-white/10 p-6 sm:p-8 backdrop-blur-md shadow-xl shadow-black/30">
              <h3 className="text-xl font-display font-bold text-white mb-4 flex items-center gap-2">
                <Terminal className="w-5 h-5 text-[#06b6d4]" />
                <span>The Engineering Journey</span>
              </h3>
              
              <p className="text-sm sm:text-base text-[#c7d2fe]/90 leading-relaxed mb-4">
                {PERSONAL_INFO.aboutBio}
              </p>

              <p className="text-sm sm:text-base text-[#c7d2fe]/80 leading-relaxed mb-6">
                Whether formulating Socratic learning loops in <strong className="text-white">StockMentor</strong> to demystify financial market indicators, or calibrating recall curves in <strong className="text-white">MicroSkill</strong>, my engineering ethos revolves around combining rigorous algorithmic logic with human-centric, fluid design.
              </p>

              {/* Focus badges */}
              <div className="pt-4 border-t border-white/10">
                <span className="text-[10px] font-mono uppercase text-[#a78bfa] tracking-widest font-bold block mb-2">
                  Primary Research & Industry Interests:
                </span>
                <div className="flex flex-wrap gap-2">
                  {["AI for Business", "FinTech & Capital Markets", "EdTech Innovation", "Open Source Systems", "Cloud Microservices", "Creative UI/UX"].map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 text-[11px] font-mono rounded-sm bg-white/5 border border-white/10 text-[#e0e7ff]"
                    >
                      • {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action */}
              <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
                <span className="text-xs font-mono text-[#06b6d4]">
                  STATUS: B.Tech CS Student (India)
                </span>
                <button
                  type="button"
                  onClick={onOpenResume}
                  className="border border-[#e0e7ff]/20 bg-white/5 hover:bg-white/10 text-white px-4 py-2 rounded-sm font-bold text-xs tracking-widest uppercase transition-all inline-flex items-center gap-1.5"
                >
                  <FileText className="w-3.5 h-3.5 text-[#06b6d4]" />
                  <span>Resume</span>
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Key Pillars Grid */}
          <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {pillars.map((pillar, idx) => (
              <div
                key={idx}
                className="p-5 rounded-sm bg-white/5 border border-white/10 hover:border-[#06b6d4]/40 transition-all duration-200 group flex flex-col justify-between"
              >
                <div>
                  <div className="p-2.5 rounded-sm bg-white/5 border border-white/10 w-fit mb-3 group-hover:scale-105 transition-transform">
                    {pillar.icon}
                  </div>
                  <h4 className="text-base font-display font-bold text-white group-hover:text-[#06b6d4] transition-colors mb-2">
                    {pillar.title}
                  </h4>
                  <p className="text-xs text-[#c7d2fe]/75 leading-relaxed">
                    {pillar.desc}
                  </p>
                </div>
                <div className="mt-4 pt-2 border-t border-white/10 text-[10px] font-mono text-[#a78bfa]">
                  PILLAR // 0{idx + 1}
                </div>
              </div>
            ))}
          </div>

        </div>

        {/* Stats Strip in Artistic Flair style */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 rounded-sm bg-white/5 border border-white/10">
          <div className="text-center p-3">
            <span className="text-3xl sm:text-4xl font-display font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#a78bfa] to-[#06b6d4] block">
              2+
            </span>
            <span className="text-xs font-mono text-[#c7d2fe]/80 mt-1 block">
              Major Live Platforms
            </span>
          </div>
          <div className="text-center p-3 border-l border-white/10">
            <span className="text-3xl sm:text-4xl font-display font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#06b6d4] to-[#60a5fa] block">
              25+
            </span>
            <span className="text-xs font-mono text-[#c7d2fe]/80 mt-1 block">
              Frameworks & Tools
            </span>
          </div>
          <div className="text-center p-3 border-l border-white/10">
            <span className="text-3xl sm:text-4xl font-display font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#60a5fa] to-[#a78bfa] block">
              B.Tech
            </span>
            <span className="text-xs font-mono text-[#c7d2fe]/80 mt-1 block">
              Computer Science & Eng.
            </span>
          </div>
          <div className="text-center p-3 border-l border-white/10">
            <span className="text-3xl sm:text-4xl font-display font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#a78bfa] to-[#60a5fa] block">
              100%
            </span>
            <span className="text-xs font-mono text-[#c7d2fe]/80 mt-1 block">
              Passion for Innovation
            </span>
          </div>
        </div>

      </div>
    </section>
  );
}
