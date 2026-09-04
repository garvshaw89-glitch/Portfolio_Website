import { Project, SkillCategory, InterestArea } from '../types';

export const PERSONAL_INFO = {
  name: "Garv Shaw",
  headline: "Computer Science & Engineering Student | Developer | Designer",
  subtitle: "Developer & Creator",
  tagline: "Building the Future with Code, AI, and Design",
  extendedTagline: "Building the Future with Code, Cloud, Artificial Intelligence & Business Innovation",
  location: "India",
  email: "garvshawinfo@gmail.com",
  aboutTagline: "Exploring the intersection of AI, Cloud Computing, and Creative Design",
  aboutBio: "I'm a passionate B.Tech Computer Science student exploring the intersection of artificial intelligence, cloud computing, software development, and creative design. I love building with AI, developing modern web experiences, experimenting with emerging technologies, and turning ideas into useful digital products.",
  ctaText: "Let's create something extraordinary together. Whether it's a startup idea, a technical challenge, or just interesting conversation about tech and innovation, I'm always open to collaborating.",
  socials: {
    linkedin: "https://linkedin.com/in/garv-shaw-08a33237b",
    github: "https://github.com/garvshaw89-glitch",
    instagram: "https://instagram.com/garvshaw",
    email: "mailto:garvshawinfo@gmail.com"
  }
};

export const PROJECTS: Project[] = [
  {
    id: "stock-mentor",
    title: "StockMentor",
    icon: "📈",
    tagline: "AI-Powered Financial Learning Platform with Socratic Guidance",
    description: "AI-powered stock market learning platform using the Socratic method to guide aspiring traders through market dynamics, risk assessment, and technical indicators.",
    features: [
      "Interactive technical charts with simulated market volatility",
      "Socratic AI mentoring tutor providing guided hints rather than plain answers",
      "Real-time trading simulation for risk-free tactical learning",
      "Concept checkpoint quizzes with adaptive mastery scoring"
    ],
    tech: ["AI", "Python", "React", "Chart.js", "APIs"],
    githubUrl: "https://github.com/garvshaw89-glitch/StockMentor",
    demoUrl: "https://stock-mentortutor.vercel.app/",
    category: "FinTech & AI",
    highlight: "Socratic AI Method"
  },
  {
    id: "micro-skill",
    title: "MicroSkill",
    icon: "🕹️",
    tagline: "Cognitive Science-Backed Spaced Repetition Learning Engine",
    description: "Science-backed micro-learning platform leveraging spaced repetition and confidence calibration algorithms to maximize knowledge retention in short, focused bursts.",
    features: [
      "High-engagement 5-15 minute bite-sized sessions",
      "Dual-axis confidence calibration metric to combat illusory mastery",
      "Adaptive spaced repetition scheduling algorithm",
      "Gamified progress streaks with retention decay visualization"
    ],
    tech: ["React", "Algorithms", "Psychology-based learning", "Tailwind CSS"],
    githubUrl: "https://github.com/garvshaw89-glitch/MicroSkill-Version-1.0",
    demoUrl: "https://microskillversion-10.vercel.app/",
    category: "EdTech & Web",
    highlight: "Spaced Repetition"
  },
  {
    id: "typing-speed-checker",
    title: "Typing Speed Checker",
    icon: "⌨️",
    tagline: "Fast, Minimal Typing Speed Test with Real-Time WPM & Accuracy",
    description: "A beautiful, lightweight typing speed test built with pure HTML, CSS, and JavaScript. Zero setup required, no frameworks, and no dependencies — just you and the keyboard.",
    features: [
      "Real-time WPM, accuracy, and consistency tracking",
      "Fully responsive design (desktop, tablet, mobile)",
      "Dark / Light mode toggle with optional sound effects",
      "Test history and personal best tracking (offline-first local storage)",
      "WCAG 2.1 AA accessible, keyboard navigation & image result export"
    ],
    tech: ["HTML5", "CSS3", "JavaScript", "LocalStorage", "Vanilla JS"],
    githubUrl: "https://github.com/garvshaw89-glitch/Typing-Speed-Checker",
    demoUrl: "https://typing-speed-checker-liard.vercel.app/",
    category: "Web & Performance",
    highlight: "Zero Dependencies"
  }
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    name: "Languages",
    skills: [
      { name: "Python", level: "Advanced", highlight: true },
      { name: "JavaScript", level: "Advanced", highlight: true },
      { name: "C++", level: "Proficient", highlight: true },
      { name: "C", level: "Intermediate" },
      { name: "HTML5", level: "Advanced" }
    ]
  },
  {
    name: "Frameworks & Libraries",
    skills: [
      { name: "React", level: "Advanced", highlight: true },
      { name: "Node.js", level: "Advanced", highlight: true },
      { name: "Express.js", level: "Advanced" },
      { name: "Firebase", level: "Proficient", highlight: true },
      { name: "Gatsby", level: "Intermediate" }
    ]
  },
  {
    name: "Cloud & DevOps",
    skills: [
      { name: "AWS", level: "Proficient", highlight: true },
      { name: "Google Cloud", level: "Proficient", highlight: true },
      { name: "Vercel", level: "Advanced" },
      { name: "Netlify", level: "Advanced" },
      { name: "Kubernetes", level: "Familiar" }
    ]
  },
  {
    name: "AI/ML & Data",
    skills: [
      { name: "TensorFlow", level: "Proficient", highlight: true },
      { name: "Machine Learning", level: "Advanced", highlight: true },
      { name: "Neural Networks", level: "Proficient", highlight: true }
    ]
  },
  {
    name: "Design & Tools",
    skills: [
      { name: "Figma", level: "Advanced", highlight: true },
      { name: "UI/UX Design", level: "Advanced", highlight: true },
      { name: "Graphic Design", level: "Proficient" },
      { name: "Adobe Creative Suite", level: "Proficient" }
    ]
  },
  {
    name: "Other & Tooling",
    skills: [
      { name: "Git", level: "Advanced", highlight: true },
      { name: "GitHub", level: "Advanced" },
      { name: "GitLab", level: "Proficient" },
      { name: "Docker", level: "Proficient", highlight: true },
      { name: "REST APIs", level: "Advanced" },
      { name: "JWT", level: "Proficient" },
      { name: "Chart.js", level: "Proficient" },
      { name: "Testing Library", level: "Proficient" }
    ]
  }
];

export const INTEREST_AREAS: InterestArea[] = [
  {
    id: "ai",
    title: "Artificial Intelligence",
    icon: "🤖",
    description: "Developing intelligent algorithms, neural network architectures, and LLM-powered interfaces that augment human cognition.",
    tags: ["Neural Nets", "Socratic Agents", "Deep Learning"],
    gradient: "from-purple-600/30 to-indigo-600/20"
  },
  {
    id: "cloud",
    title: "Cloud Computing",
    icon: "☁️",
    description: "Architecting resilient, elastic, and serverless backends utilizing modern microservices, containers, and multi-cloud environments.",
    tags: ["AWS", "Google Cloud", "Distributed Systems"],
    gradient: "from-blue-600/30 to-cyan-600/20"
  },
  {
    id: "software-dev",
    title: "Software Development",
    icon: "💻",
    description: "Crafting robust full-stack software with clean code principles, typed APIs, modular components, and performance-first execution.",
    tags: ["Full Stack", "TypeScript", "Clean Architecture"],
    gradient: "from-cyan-600/30 to-teal-600/20"
  },
  {
    id: "ai-business",
    title: "AI for Business",
    icon: "📊",
    description: "Bridging technical intelligence with enterprise efficiency, automating critical decision flows, and deploying applied data analytics.",
    tags: ["Automation", "Workflow Optimization", "Predictive Analytics"],
    gradient: "from-violet-600/30 to-purple-600/20"
  },
  {
    id: "fintech",
    title: "FinTech & Capital Markets",
    icon: "📈",
    description: "Exploring algorithmic trading dynamics, market microstructure, risk modelling, and interactive investor education platforms.",
    tags: ["Trading Algorithms", "Market Simulation", "Financial Literacy"],
    gradient: "from-emerald-600/30 to-cyan-600/20"
  },
  {
    id: "web-tech",
    title: "Web Technologies & Innovation",
    icon: "🌐",
    description: "Pushing the browser to its limits with interactive 3D graphics, fluid responsive micro-interactions, and accessible web standards.",
    tags: ["WebGL / Three.js", "Modern React", "Cyber Aesthetics"],
    gradient: "from-fuchsia-600/30 to-blue-600/20"
  }
];

export const CUBE_FACES = [
  { label: "AI", color: "#a78bfa", subtitle: "Intelligence", icon: "🧠" },
  { label: "CODE", color: "#60a5fa", subtitle: "Algorithms", icon: "💻" },
  { label: "CLOUD", color: "#06b6d4", subtitle: "Scale", icon: "☁️" },
  { label: "BUILD", color: "#34d399", subtitle: "Creation", icon: "⚡" },
  { label: "CREATE", color: "#f472b6", subtitle: "Innovation", icon: "✨" },
  { label: "DESIGN", color: "#fbbf24", subtitle: "Aesthetics", icon: "🎨" }
];
