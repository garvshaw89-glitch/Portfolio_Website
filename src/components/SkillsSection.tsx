import { useState, useMemo } from 'react';
import { SKILL_CATEGORIES } from '../data/portfolioData';
import { 
  Layers, 
  Search, 
  Sparkles, 
  Code, 
  Cpu, 
  Cloud, 
  Palette, 
  Terminal, 
  Wrench,
  CheckCircle
} from 'lucide-react';

export default function SkillsSection() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const categories = useMemo(() => ["All", ...SKILL_CATEGORIES.map(c => c.name)], []);

  // Filter skills based on selected category and search
  const filteredCategories = useMemo(() => {
    return SKILL_CATEGORIES.map(cat => {
      if (selectedCategory !== "All" && cat.name !== selectedCategory) {
        return null;
      }
      const matchingSkills = cat.skills.filter(s =>
        s.name.toLowerCase().includes(searchQuery.toLowerCase().trim())
      );
      if (matchingSkills.length === 0) return null;
      return {
        ...cat,
        skills: matchingSkills
      };
    }).filter(Boolean) as typeof SKILL_CATEGORIES;
  }, [selectedCategory, searchQuery]);

  const totalSkillCount = useMemo(() => {
    return SKILL_CATEGORIES.reduce((acc, cat) => acc + cat.skills.length, 0);
  }, []);

  const getCategoryIcon = (name: string) => {
    switch (name) {
      case "Languages": return <Code className="w-4 h-4 text-cyan-400" />;
      case "Frameworks & Libraries": return <Layers className="w-4 h-4 text-purple-400" />;
      case "Cloud & DevOps": return <Cloud className="w-4 h-4 text-blue-400" />;
      case "AI/ML & Data": return <Cpu className="w-4 h-4 text-pink-400" />;
      case "Design & Tools": return <Palette className="w-4 h-4 text-amber-400" />;
      default: return <Wrench className="w-4 h-4 text-emerald-400" />;
    }
  };

  return (
    <section id="skills" className="py-24 relative overflow-hidden bg-[#070a1c]/60">
      {/* Background grid */}
      <div className="absolute inset-0 cyber-grid opacity-50 pointer-events-none -z-10" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[550px] h-[350px] bg-purple-600/10 rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <p className="text-[#60a5fa] font-mono text-sm mb-2">
            // TECHNICAL_CORE_EXPERTISE
          </p>

          <h2 className="text-4xl sm:text-5xl font-display font-extrabold text-white tracking-tight mb-4">
            Skills & <span className="text-transparent bg-clip-text bg-gradient-to-br from-[#a78bfa] via-[#7c3aed] to-[#60a5fa]">Tech Stack</span>
          </h2>

          <p className="text-base sm:text-lg text-[#c7d2fe]/80 leading-relaxed font-light">
            A comprehensive engineering inventory covering artificial intelligence, cloud infrastructure, full-stack systems, and modern developer tooling.
          </p>
        </div>

        {/* Filter Bar & Search in Artistic Flair style */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10 pb-6 border-b border-white/10">
          
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 w-full md:w-auto">
            {categories.map((catName) => (
              <button
                key={catName}
                type="button"
                onClick={() => setSelectedCategory(catName)}
                className={`px-3.5 py-1.5 rounded-sm text-xs uppercase tracking-wider font-mono transition-all ${
                  selectedCategory === catName
                    ? 'bg-[#7c3aed] text-white border border-[#a78bfa] shadow-[0_0_15px_rgba(124,58,237,0.4)] font-bold'
                    : 'bg-white/5 text-[#c7d2fe]/80 hover:text-white hover:bg-white/10 border border-white/10'
                }`}
              >
                {catName}
              </button>
            ))}
          </div>

          {/* Quick Search */}
          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#a78bfa]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search skill (e.g. AWS, Python)..."
              className="w-full pl-9 pr-3 py-1.5 rounded-sm text-xs font-mono bg-white/5 border border-white/15 text-white placeholder:text-[#c7d2fe]/40 focus:outline-none focus:border-[#06b6d4] transition-all"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-[#c7d2fe] hover:text-white"
              >
                ✕
              </button>
            )}
          </div>

        </div>

        {/* Skills Category Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCategories.map((category, index) => (
            <div
              key={category.name}
              className={`rounded-sm p-6 backdrop-blur-sm transition-all duration-300 flex flex-col justify-between group ${
                index === 0
                  ? 'bg-[#7c3aed]/10 border border-[#7c3aed]/30 hover:border-[#a78bfa]'
                  : 'bg-white/5 border border-white/10 hover:border-white/25'
              }`}
            >
              <div>
                {/* Category Header */}
                <div className="flex items-center justify-between pb-3 mb-5 border-b border-white/10">
                  <div className="flex items-center gap-2.5">
                    <span className="p-2 rounded-sm bg-white/5 border border-white/10 text-[#06b6d4]">
                      {getCategoryIcon(category.name)}
                    </span>
                    <h3 className="font-display font-bold text-lg text-white group-hover:text-[#a78bfa] transition-colors">
                      {category.name}
                    </h3>
                  </div>
                  <span className="text-[10px] font-mono text-[#06b6d4] bg-white/5 px-2 py-0.5 rounded-sm border border-white/10 uppercase">
                    {category.skills.length} skills
                  </span>
                </div>

                {/* Badges List with Hover Effects */}
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill) => (
                    <div
                      key={skill.name}
                      className="px-2.5 py-1 bg-white/5 border border-white/10 hover:border-[#a78bfa] hover:bg-[#7c3aed]/20 text-[10px] sm:text-[11px] font-mono rounded-sm transition-colors text-[#e0e7ff] inline-flex items-center gap-1.5 cursor-default"
                    >
                      {skill.highlight && (
                        <span className="w-1.5 h-1.5 rounded-full bg-[#06b6d4] animate-pulse" />
                      )}
                      <span className="font-medium">
                        {skill.name}
                      </span>
                      {skill.level && (
                        <span className="text-[9px] text-[#c7d2fe]/60 font-normal">
                          • {skill.level}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom cyber indicator */}
              <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-[10px] font-mono text-white/50">
                <span className="flex items-center gap-1 text-white/60">
                  <CheckCircle className="w-3 h-3 text-emerald-400" /> READY_FOR_DEPLOYMENT
                </span>
                <div className="flex space-x-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#06b6d4]" />
                  <div className="w-1.5 h-1.5 rounded-full bg-white/20" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty Search Result Fallback */}
        {filteredCategories.length === 0 && (
          <div className="text-center py-12 rounded-xl bg-[#0d1338]/60 border border-purple-800/40">
            <p className="text-purple-300 font-mono text-sm mb-2">
              No matching technologies found for "{searchQuery}".
            </p>
            <button
              type="button"
              onClick={() => { setSearchQuery(""); setSelectedCategory("All"); }}
              className="text-xs font-mono text-cyan-300 underline hover:text-cyan-200"
            >
              Reset filters
            </button>
          </div>
        )}

      </div>
    </section>
  );
}
