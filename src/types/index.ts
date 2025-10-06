export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  techStack: string[];
  githubLink?: string;
  liveLink?: string;
  image?: string;
  featured?: boolean;
  category: 'web' | 'ai' | 'mobile' | 'other';
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  duration: string;
  location: string;
  description: string[];
  technologies: string[];
}

export interface Skill {
  name: string;
  icon: string;
  category: 'language' | 'frontend' | 'backend' | 'database' | 'tool';
}