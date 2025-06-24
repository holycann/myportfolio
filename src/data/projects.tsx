import { AnimatedProjectImage } from "@/components/ui/animated-testimonials";
import { ProjectItem } from "@/types/project";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";

const projectImages = {
  smartParkingSystem: [{ alt: "Smart Parking System", src: "https://placehold.co/800x600/333/FFF?text=Smart+Parking+System" }],
  studentEnrollmentSystem: [{ alt: "Student Enrollment System", src: "https://placehold.co/800x600/333/FFF?text=Student+Enrollment+System" }],
  todoApplication: [{ alt: "Todo Application", src: "https://placehold.co/800x600/333/FFF?text=Todo+Application" }],
  agriMarket: [{ alt: "Agri Market", src: "https://placehold.co/800x600/333/FFF?text=Agri+Market" }],
};

export const ProjectData: ProjectItem[] = [
  {
    title: "Smart Parking System",
    githubUrl: "https://github.com/username/smart-parking",
    webUrl: "https://smart-parking-demo.vercel.app",
    features: ["Real-time collaboration", "Shared editing"],
    techStack: ["React", "Node.js", "MongoDB"],
    description: "An innovative smart parking solution that leverages IoT and real-time data processing to optimize parking space management and improve urban mobility.",
    content: <AnimatedProjectImage projectImage={projectImages.smartParkingSystem} />,
    githubIcon: <FaGithub className="text-2xl text-gray-800 dark:text-white hover:text-blue-600 transition-colors" />,
    webIcon: <FaExternalLinkAlt className="text-2xl text-gray-800 dark:text-white hover:text-green-600 transition-colors" />,
  },
  {
    title: "Student Enrollment System",
    githubUrl: "https://github.com/username/student-enrollment",
    webUrl: "https://student-enrollment-platform.vercel.app",
    features: ["Automated Registration", "Course Management", "Student Tracking"],
    techStack: ["Next.js", "TypeScript", "PostgreSQL", "Prisma"],
    description: "A comprehensive student enrollment platform designed to streamline the academic registration process, providing intuitive course selection and real-time administrative tools.",
    content: <AnimatedProjectImage projectImage={projectImages.studentEnrollmentSystem} />,
    githubIcon: <FaGithub className="text-2xl text-gray-800 dark:text-white hover:text-blue-600 transition-colors" />,
    webIcon: <FaExternalLinkAlt className="text-2xl text-gray-800 dark:text-white hover:text-green-600 transition-colors" />,
  },
  {
    title: "Todo Application",
    githubUrl: "https://github.com/username/todo-app",
    webUrl: "https://todo-app-productivity.vercel.app",
    features: ["Task Tracking", "Priority Management", "Collaboration"],
    techStack: ["React", "Firebase", "Chakra UI"],
    description: "A powerful task management application that helps users organize, prioritize, and collaborate on tasks with intuitive design and seamless synchronization.",
    content: <AnimatedProjectImage projectImage={projectImages.todoApplication} />,
    githubIcon: <FaGithub className="text-2xl text-gray-800 dark:text-white hover:text-blue-600 transition-colors" />,
    webIcon: <FaExternalLinkAlt className="text-2xl text-gray-800 dark:text-white hover:text-green-600 transition-colors" />,
  },
  {
    title: "Agri Market Platform",
    githubUrl: "https://github.com/username/agri-market",
    webUrl: "https://agri-market-platform.vercel.app",
    features: ["Farmer Marketplace", "Price Tracking", "Inventory Management"],
    techStack: ["Next.js", "GraphQL", "MongoDB", "Tailwind CSS"],
    description: "An innovative agricultural marketplace connecting farmers directly with buyers, providing real-time price tracking, inventory management, and seamless transaction capabilities.",
    content: <AnimatedProjectImage projectImage={projectImages.agriMarket} />,
    githubIcon: <FaGithub className="text-2xl text-gray-800 dark:text-white hover:text-blue-600 transition-colors" />,
    webIcon: <FaExternalLinkAlt className="text-2xl text-gray-800 dark:text-white hover:text-green-600 transition-colors" />,
  }
]; 