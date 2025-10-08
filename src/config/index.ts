import type { Content } from "./types";

export const content: Content = {
  site: {
    title: "Siddhant Gaikwad — Full Stack Developer",
    description:
      "Full-stack developer skilled in building high-performance, scalable web applications with React, Node.js, and modern technologies.",
    favicon: "/favicon.ico",
    ogImage: "/og-image.jpg",
  },
  nav: [
    { label: "About", href: "#about" },
    { label: "Skills", href: "#skills" },
    { label: "Projects", href: "#projects" },
    { label: "Experience", href: "#experience" },
    { label: "Contact", href: "#contact" },
  ],
  hero: {
    name: "Siddhant Gaikwad",
    role: "Full Stack Developer",
    tagline:
      "Crafting scalable applications and intuitive digital experiences with modern web technologies.",
    ctas: [
      { label: "View Resume", href: "/resume.pdf" },
      { label: "Contact Me", href: "#contact" },
    ],
    marquee: [
      "Full Stack Developer",
      "React Specialist",
      "Next.js Enthusiast",
      "Node.js Developer",
      "Problem Solver",
      "System Design Learner",
    ],
    resumeUrl: "/resume.pdf",
  },
  about: {
    heading: "About",
    body: [
      "I'm a Computer Science student and full-stack developer passionate about building scalable, high-performance web applications. My focus is on creating secure backends, responsive UIs, and efficient systems that enhance user experience.",
      "I specialize in React, Node.js, and modern web technologies, with hands-on experience developing real-time, production-ready applications. I enjoy tackling complex problems and optimizing performance for smooth, reliable software.",
    ],
    highlights: [
      "Strong foundation in full-stack development and system design",
      "Experience with AI-integrated and real-time web applications",
      "Focus on clean architecture, performance, and scalability",
      "Proficient in modern tools and frameworks like React, Node.js, and MongoDB",
    ],
  },
  skills: {
    heading: "Skills",
    groups: [
      {
        title: "Languages",
        items: ["JavaScript", "Python", "Java", "C"],
      },
      {
        title: "Frontend",
        items: ["React", "Next.js", "Tailwind CSS", "HTML5", "CSS3"],
      },
      {
        title: "Backend",
        items: ["Node.js", "Express.js", "Flask", "Spring Boot", "REST APIs"],
      },
      {
        title: "Databases",
        items: ["MongoDB", "MySQL", "Redis"],
      },
      {
        title: "Tools & Platforms",
        items: ["Git", "GitHub", "Postman", "Vercel", "Figma"],
      },
      {
        title: "Core Competencies",
        items: [
          "System Design",
          "Performance Optimization",
          "Responsive Design",
          "Real-time Applications",
          "Problem Solving",
        ],
      },
    ],
  },
  projects: {
    heading: "Projects",
    items: [
      {
        id: "proj-1",
        title: "CraftConnect — Service Marketplace Platform",
        description:
          "A service marketplace platform connecting professionals and customers with real-time location-based search, OTP verification, and role-based authentication.",
        tags: ["React", "TailwindCSS", "Node.js", "MongoDB", "Redis"],
        image: "/assets/projects/craftconnect.jpg",
        liveUrl: "https://example.com",
        repoUrl: "https://github.com/Soul1754/CraftConnect",
        year: "2025",
      },
      {
        id: "proj-2",
        title: "AI-Based Email Phishing Detection",
        description:
          "Developed a BERT+LSTM hybrid model for phishing detection using NLP and deep learning techniques, trained on diverse datasets for high accuracy.",
        tags: ["Python", "PyTorch", "Transformers", "Deep Learning"],
        image: "/assets/projects/phishing.jpg",
        liveUrl: "https://example.com",
        repoUrl: "https://github.com/Soul1754/PhishingDetection",
        year: "2025",
      },
      {
        id: "proj-3",
        title: "Raga Music Generator — AI Research Project",
        description:
          "Trained a double LSTM model to generate classical Indian ragas, achieving 85% accuracy and improving model precision by 35%.",
        tags: ["Python", "TensorFlow", "LSTM", "Deep Learning", "Streamlit"],
        image: "/assets/projects/raga.jpg",
        liveUrl: "https://example.com",
        repoUrl: "https://github.com/Soul1754/RagaGenerator",
        year: "2024",
      },
    ],
  },
  experience: {
    heading: "Experience",
    items: [
      {
        company: "E-Zest by Accion Labs",
        role: "Industry Project Intern",
        start: "Mar 2025",
        end: "Sep 2025",
        location: "Pune, India (Remote)",
        bullets: [
          "Developed a full-stack calendar management application with React, Node.js, Express, and MongoDB.",
          "Integrated OAuth 2.0 for Google and Microsoft login authentication.",
          "Built an AI-powered conversational scheduling system with NLP for conflict detection and optimal meeting time suggestions.",
          "Delivered production-ready APIs with JWT authentication and real-time chatbot integration.",
        ],
        tech: ["React", "Node.js", "Express", "MongoDB", "NLP"],
      },
    ],
  },
  education: {
    heading: "Education",
    items: [
      {
        institution: "Vishwakarma Institute of Technology, Pune",
        degree: "Bachelor of Technology in Computer Science",
        start: "Nov 2022",
        end: "Present",
        details: [
          "CGPA: 8.75",
          "Relevant Coursework: Data Structures, Algorithms, Web Development, System Design",
        ],
      },
    ],
  },
  certifications: {
    heading: "Certifications",
    items: [
      "Full Stack Web Development — freeCodeCamp",
      "Advanced JavaScript Concepts — Udemy",
      "Deep Learning with TensorFlow — Coursera",
    ],
  },
  contact: {
    heading: "Get In Touch",
    email: "siddhant.gaikwad1754@gmail.com",
    socials: [
      {
        name: "GitHub",
        url: "https://github.com/Soul1754",
        iconKey: "github",
        handle: "@Soul1754",
      },
      {
        name: "LinkedIn",
        url: "https://www.linkedin.com/in/siddhant-gaikwad1754/",
        iconKey: "linkedin",
        handle: "/in/siddhant-gaikwad1754",
      },
    ],
  },
  assets: {
    portrait: "/assets/portrait.jpg",
    about: "/assets/about.jpg",
  },
};

export default content;
