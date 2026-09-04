import { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import AboutSection from './components/AboutSection';
import ProjectsSection from './components/ProjectsSection';
import HoloMatrixShowcaseSection from './components/HoloMatrixShowcaseSection';
import SkillsSection from './components/SkillsSection';
import InterestsSection from './components/InterestsSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import ResumeModal from './components/ResumeModal';
import ProjectDemoModal from './components/ProjectDemoModal';
import HoloDivider from './components/HoloDivider';
import ScrollRevealSection from './components/ScrollRevealSection';
import { Project } from './types';

export default function App() {
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [activeDemoProject, setActiveDemoProject] = useState<Project | null>(null);

  return (
    <div className="min-h-screen bg-[#0a0e27] text-[#e0e7ff] relative selection:bg-purple-500/30 selection:text-cyan-200">
      {/* Global artistic grid pattern */}
      <div className="fixed inset-0 artistic-grid pointer-events-none -z-20" />

      {/* Atmospheric ambient lighting matching futuristic aesthetics */}
      <div className="fixed top-[-10%] right-[-10%] w-[500px] h-[500px] bg-[#7c3aed] blur-[160px] opacity-20 rounded-full pointer-events-none -z-10" />
      <div className="fixed bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-[#06b6d4] blur-[160px] opacity-20 rounded-full pointer-events-none -z-10" />

      {/* Top Header Navigation */}
      <Navbar onOpenResume={() => setIsResumeOpen(true)} />

      {/* Main Portfolio Content */}
      <main className="relative">
        <Hero onOpenResume={() => setIsResumeOpen(true)} />

        {/* Sleek Glowing Holographic Line Divider */}
        <HoloDivider id="divider-about" tag="SYS // ABOUT" variant="cyan" />

        <ScrollRevealSection id="reveal-about">
          <AboutSection onOpenResume={() => setIsResumeOpen(true)} />
        </ScrollRevealSection>

        {/* Sleek Glowing Holographic Line Divider */}
        <HoloDivider id="divider-projects" tag="CORE // PROJECTS" variant="dual" />

        <ScrollRevealSection id="reveal-projects">
          <ProjectsSection onOpenDemo={(project) => setActiveDemoProject(project)} />
        </ScrollRevealSection>

        {/* Sleek Glowing Holographic Line Divider */}
        <HoloDivider id="divider-matrix" tag="HOLO // 3D MATRIX" variant="purple" />

        <ScrollRevealSection id="reveal-matrix">
          <HoloMatrixShowcaseSection />
        </ScrollRevealSection>

        {/* Sleek Glowing Holographic Line Divider */}
        <HoloDivider id="divider-skills" tag="TECH // ARSENAL" variant="cyan" />

        <ScrollRevealSection id="reveal-skills">
          <SkillsSection />
        </ScrollRevealSection>

        {/* Sleek Glowing Holographic Line Divider */}
        <HoloDivider id="divider-interests" tag="FOCUS // DOMAINS" variant="dual" />

        <ScrollRevealSection id="reveal-interests">
          <InterestsSection />
        </ScrollRevealSection>

        {/* Sleek Glowing Holographic Line Divider */}
        <HoloDivider id="divider-contact" tag="COMMS // UPLINK" variant="purple" />

        <ScrollRevealSection id="reveal-contact">
          <ContactSection />
        </ScrollRevealSection>
      </main>

      {/* Footer */}
      <Footer />

      {/* Interactive Modals */}
      <ResumeModal 
        isOpen={isResumeOpen} 
        onClose={() => setIsResumeOpen(false)} 
      />

      <ProjectDemoModal 
        project={activeDemoProject} 
        onClose={() => setActiveDemoProject(null)} 
      />
    </div>
  );
}

