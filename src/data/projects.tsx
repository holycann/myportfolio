import { ProjectItem } from "@/types/project";

export const ProjectData: ProjectItem[] = [
  {
    title: "Personal Portfolio Website",
    githubUrl: "https://github.com/holycann/myportfolio",
    webUrl: "https://holyycan.com",
    description: "A modern, responsive portfolio website showcasing my projects, skills, and professional journey, built with cutting-edge web technologies.",
    features: [
      "Fully Responsive Design",
      "Dark/Light Mode Toggle",
      "Smooth Scroll Animations",
      "Interactive UI Components",
      "Performance Optimized",
      "SEO Friendly"
    ],
    techStack: [
      "Next.js 15",
      "React",
      "TypeScript", 
      "Tailwind CSS", 
      "Framer Motion",
      "Vercel Deployment"
    ],
    imageUrl: "/images/projects/portfolio-screenshot.png"
  },
  {
    title: "Aquaculture Tech Support Dashboard",
    githubUrl: "https://github.com/holycann/efishery-dashboard",
    webUrl: "https://efishery-tech-support.vercel.app",
    description: "A comprehensive tech support dashboard developed during my internship at eFishery, designed to streamline customer support processes and track technical issues.",
    features: [
      "Real-time Issue Tracking",
      "Customer Interaction Management",
      "Performance Analytics",
      "Responsive Design",
      "Role-based Access Control",
      "Automated Reporting"
    ],
    techStack: [
      "React",
      "Node.js",
      "Express",
      "MongoDB",
      "Socket.IO",
      "Chakra UI"
    ],
    imageUrl: "/images/projects/efishery-dashboard.png"
  },
  {
    title: "WordPress Website for Local Business",
    githubUrl: "https://github.com/holycann/asamedia-wordpress",
    webUrl: "https://asamedia-website.com",
    description: "A custom WordPress website developed for PT Asamedia, focusing on responsive design, SEO optimization, and enhanced user experience.",
    features: [
      "Custom WordPress Theme",
      "Responsive Mobile Design",
      "SEO Optimization",
      "Performance Tuning",
      "Custom Plugin Development",
      "Multilingual Support"
    ],
    techStack: [
      "WordPress",
      "PHP",
      "JavaScript",
      "HTML5",
      "CSS3",
      "MySQL"
    ],
    imageUrl: "/images/projects/asamedia-website.png"
  },
  {
    title: "AI-Powered Chatbot Assistant",
    githubUrl: "https://github.com/holycann/ai-chatbot-assistant",
    webUrl: "https://ai-chatbot-demo.vercel.app",
    description: "An intelligent chatbot application leveraging advanced natural language processing to provide contextual and helpful responses across multiple domains.",
    features: [
      "Natural Language Understanding",
      "Context-Aware Responses",
      "Multi-language Support",
      "Machine Learning Integration",
      "Customizable Conversation Flows",
      "User Interaction Tracking"
    ],
    techStack: [
      "Python",
      "TensorFlow",
      "Flask",
      "React",
      "WebSocket",
      "OpenAI API"
    ],
    imageUrl: "/images/projects/ai-chatbot.png"
  },
  {
    title: "Task Management & Collaboration Platform",
    githubUrl: "https://github.com/holycann/task-management-app",
    webUrl: "https://task-manager-pro.vercel.app",
    description: "A comprehensive task management application designed to enhance team productivity with advanced collaboration and tracking features.",
    features: [
      "Kanban Board View",
      "Real-time Collaboration",
      "Task Assignment and Tracking",
      "Time Logging",
      "Progress Visualization",
      "Integration with Communication Tools"
    ],
    techStack: [
      "Next.js",
      "Prisma",
      "PostgreSQL",
      "GraphQL",
      "Chakra UI",
      "WebSocket"
    ],
    imageUrl: "/images/projects/task-management.png"
  }
]; 