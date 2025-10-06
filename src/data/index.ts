import { Project, Experience, Skill } from '@/types';

export const projects: Project[] = [
  {
    id: 'craftconnect',
    title: 'CraftConnect',
    description: 'Service Marketplace Platform connecting professionals with customers',
    longDescription: 'Built a comprehensive platform that connects professionals with customers for service bookings. Features real-time location-based professional search, OTP verification, and role-based authentication system.',
    techStack: ['React', 'TailwindCSS', 'Node.js', 'MongoDB', 'Redis'],
    githubLink: '#',
    liveLink: '#',
    image: '/projects/craftconnect.jpg',
    featured: true,
    category: 'web'
  },
  {
    id: 'raga-music-generator',
    title: 'Raga Music Generator',
    description: 'AI Research Project for generating Indian classical music',
    longDescription: 'Trained 4 AI models using a double LSTM architecture, improving raga accuracy by 35%. Processed 500+ music samples, achieving an 85% accuracy rate by optimizing loss functions.',
    techStack: ['Python', 'TensorFlow', 'LSTM', 'Deep Learning', 'Streamlit'],
    githubLink: '#',
    liveLink: '#',
    image: '/projects/raga-generator.jpg',
    featured: true,
    category: 'ai'
  },
  {
    id: 'email-phishing-detection',
    title: 'AI-Based Email Phishing Detection',
    description: 'NLP-powered system for detecting phishing emails',
    longDescription: 'Built a BERT+LSTM hybrid model to detect phishing emails with high accuracy. Implemented dataset handling classes, model saving/loading, and trained on diverse datasets.',
    techStack: ['Python', 'PyTorch', 'Transformers', 'LSTM', 'Deep Learning'],
    githubLink: '#',
    liveLink: '#',
    image: '/projects/phishing-detection.jpg',
    featured: true,
    category: 'ai'
  },
  {
    id: 'calendar-management',
    title: 'Calendar Management App',
    description: 'Full-stack calendar application with AI-powered scheduling',
    longDescription: 'Developed a full-stack calendar management application with OAuth 2.0 authentication for Google and Microsoft integration. Implemented an AI-powered conversational scheduling system with NLP that detects conflicts and suggests optimal meeting times via chatbot.',
    techStack: ['React', 'Node.js', 'Express', 'MongoDB', 'OAuth 2.0', 'JWT'],
    githubLink: '#',
    liveLink: '#',
    image: '/projects/calendar-app.jpg',
    featured: false,
    category: 'web'
  }
];

export const experiences: Experience[] = [
  {
    id: 'ezest-intern',
    company: 'E-Zest by Accion Labs',
    position: 'Industry Project Intern',
    duration: 'Mar 2025 – Sep 2025',
    location: 'Pune, India',
    description: [
      'Developed a full-stack calendar management application using React, Node.js, Express, and MongoDB with OAuth 2.0 authentication for Google and Microsoft integration.',
      'Implemented an AI-powered conversational scheduling system with NLP that detects conflicts and suggests optimal meeting times via chatbot.',
      'Delivered a production-ready web application with RESTful APIs, JWT authentication, and real-time chatbot integration.'
    ],
    technologies: ['React', 'Node.js', 'Express', 'MongoDB', 'OAuth 2.0', 'JWT', 'NLP']
  }
];

export const skills: Skill[] = [
  // Languages
  { name: 'JavaScript', icon: 'SiJavascript', category: 'language' },
  { name: 'Java', icon: 'SiJava', category: 'language' },
  { name: 'Python', icon: 'SiPython', category: 'language' },
  { name: 'C', icon: 'SiC', category: 'language' },
  
  // Frontend
  { name: 'React', icon: 'SiReact', category: 'frontend' },
  { name: 'TailwindCSS', icon: 'SiTailwindcss', category: 'frontend' },
  
  // Backend
  { name: 'Node.js', icon: 'SiNodedotjs', category: 'backend' },
  { name: 'Express.js', icon: 'SiExpress', category: 'backend' },
  { name: 'Flask', icon: 'SiFlask', category: 'backend' },
  { name: 'Spring Boot', icon: 'SiSpringboot', category: 'backend' },
  
  // Databases
  { name: 'MySQL', icon: 'SiMysql', category: 'database' },
  { name: 'MongoDB', icon: 'SiMongodb', category: 'database' },
  { name: 'Redis', icon: 'SiRedis', category: 'database' },
  
  // Tools
  { name: 'TensorFlow', icon: 'SiTensorflow', category: 'tool' },
  { name: 'PyTorch', icon: 'SiPytorch', category: 'tool' },
  { name: 'Git', icon: 'SiGit', category: 'tool' },
];