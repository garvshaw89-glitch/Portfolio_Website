export interface Project {
  id: string;
  title: string;
  icon: string;
  tagline: string;
  description: string;
  features: string[];
  tech: string[];
  githubUrl: string;
  demoUrl?: string;
  category: string;
  highlight: string;
}

export interface SkillCategory {
  name: string;
  skills: {
    name: string;
    level?: string;
    iconName?: string;
    highlight?: boolean;
  }[];
}

export interface InterestArea {
  id: string;
  title: string;
  icon: string;
  description: string;
  tags: string[];
  gradient: string;
}

export interface SocialLink {
  name: string;
  url: string;
  icon: string;
  label: string;
}
