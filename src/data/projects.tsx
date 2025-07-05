import { AnimatedProjectImage } from "@/components/ui/animated-project-image";
import { ProjectItem } from "@/types/project";
import { FaGithub, FaExternalLinkAlt, FaCar, FaUserGraduate, FaTasks, FaStore, FaReact, FaNodeJs, FaDatabase, FaChrome } from "react-icons/fa";
import { IoMdTimer } from "react-icons/io";
import { MdSecurity, MdSchool, MdNotifications } from "react-icons/md";
import { BsFillCalendarCheckFill, BsGraphUp } from "react-icons/bs";
import { HiUserGroup } from "react-icons/hi";
import { SiNextdotjs, SiTypescript, SiPostgresql, SiPrisma, SiFirebase, SiChakraui, SiMongodb, SiGraphql, SiTailwindcss } from "react-icons/si";

const projectImages = {
  smartParkingSystem: [{ alt: "Smart Parking System", src: "https://placehold.co/800x600/333/FFF?text=Smart+Parking+System" }],
  studentEnrollmentSystem: [{ alt: "Student Enrollment System", src: "https://placehold.co/800x600/333/FFF?text=Student+Enrollment+System" }],
  todoApplication: [{ alt: "Todo Application", src: "https://placehold.co/800x600/333/FFF?text=Todo+Application" }],
  agriMarket: [{ alt: "Agri Market", src: "https://placehold.co/800x600/333/FFF?text=Agri+Market" }],
};

const techStackIcons = {
  React: <FaReact className="text-[#61DAFB]" />,
  "Node.js": <FaNodeJs className="text-[#339933]" />,
  MongoDB: <SiMongodb className="text-[#47A248]" />,
  "Next.js": <SiNextdotjs className="text-white dark:text-white" />,
  TypeScript: <SiTypescript className="text-[#3178C6]" />,
  PostgreSQL: <SiPostgresql className="text-[#336791]" />,
  Prisma: <SiPrisma className="text-white dark:text-white" />,
  Firebase: <SiFirebase className="text-[#FFCA28]" />,
  "Chakra UI": <SiChakraui className="text-[#319795]" />,
  GraphQL: <SiGraphql className="text-[#E10098]" />,
  "Tailwind CSS": <SiTailwindcss className="text-[#06B6D4]" />,
};

export const ProjectData: ProjectItem[] = [
  {
    title: "Smart Parking System",
    githubUrl: "https://github.com/username/smart-parking",
    webUrl: "https://smart-parking-demo.vercel.app",
    features: [
      { text: "Real-time Monitoring", icon: <IoMdTimer className="text-blue-500" /> },
      { text: "Security System", icon: <MdSecurity className="text-blue-500" /> },
      { text: "Space Management", icon: <FaCar className="text-blue-500" /> }
    ],
    techStack: [
      { name: "React", icon: techStackIcons.React },
      { name: "Node.js", icon: techStackIcons["Node.js"] },
      { name: "MongoDB", icon: techStackIcons.MongoDB }
    ],
    description: "An innovative smart parking solution that leverages IoT and real-time data processing to optimize parking space management and improve urban mobility.",
    content: <AnimatedProjectImage projectImage={projectImages.smartParkingSystem} />,
    githubIcon: <FaGithub className="text-2xl text-gray-800 dark:text-white hover:text-blue-600 transition-colors" />,
    webIcon: <FaExternalLinkAlt className="text-2xl text-gray-800 dark:text-white hover:text-green-600 transition-colors" />,
  },
  {
    title: "Student Enrollment System",
    githubUrl: "https://github.com/username/student-enrollment",
    webUrl: "https://student-enrollment-platform.vercel.app",
    features: [
      { text: "Automated Registration", icon: <BsFillCalendarCheckFill className="text-purple-500" /> },
      { text: "Course Management", icon: <MdSchool className="text-purple-500" /> },
      { text: "Student Tracking", icon: <FaUserGraduate className="text-purple-500" /> }
    ],
    techStack: [
      { name: "Next.js", icon: techStackIcons["Next.js"] },
      { name: "TypeScript", icon: techStackIcons.TypeScript },
      { name: "PostgreSQL", icon: techStackIcons.PostgreSQL },
      { name: "Prisma", icon: techStackIcons.Prisma }
    ],
    description: "A comprehensive student enrollment platform designed to streamline the academic registration process, providing intuitive course selection and real-time administrative tools.",
    content: <AnimatedProjectImage projectImage={projectImages.studentEnrollmentSystem} />,
    githubIcon: <FaGithub className="text-2xl text-gray-800 dark:text-white hover:text-blue-600 transition-colors" />,
    webIcon: <FaExternalLinkAlt className="text-2xl text-gray-800 dark:text-white hover:text-green-600 transition-colors" />,
  },
  {
    title: "Todo Application",
    githubUrl: "https://github.com/username/todo-app",
    webUrl: "https://todo-app-productivity.vercel.app",
    features: [
      { text: "Task Tracking", icon: <FaTasks className="text-green-500" /> },
      { text: "Priority Management", icon: <MdNotifications className="text-green-500" /> },
      { text: "Collaboration", icon: <HiUserGroup className="text-green-500" /> }
    ],
    techStack: [
      { name: "React", icon: techStackIcons.React },
      { name: "Firebase", icon: techStackIcons.Firebase },
      { name: "Chakra UI", icon: techStackIcons["Chakra UI"] }
    ],
    description: "A powerful task management application that helps users organize, prioritize, and collaborate on tasks with intuitive design and seamless synchronization.",
    content: <AnimatedProjectImage projectImage={projectImages.todoApplication} />,
    githubIcon: <FaGithub className="text-2xl text-gray-800 dark:text-white hover:text-blue-600 transition-colors" />,
    webIcon: <FaExternalLinkAlt className="text-2xl text-gray-800 dark:text-white hover:text-green-600 transition-colors" />,
  },
  {
    title: "Agri Market Platform",
    githubUrl: "https://github.com/username/agri-market",
    webUrl: "https://agri-market-platform.vercel.app",
    features: [
      { text: "Farmer Marketplace", icon: <FaStore className="text-orange-500" /> },
      { text: "Price Tracking", icon: <BsGraphUp className="text-orange-500" /> },
      { text: "Inventory Management", icon: <FaTasks className="text-orange-500" /> }
    ],
    techStack: [
      { name: "Next.js", icon: techStackIcons["Next.js"] },
      { name: "GraphQL", icon: techStackIcons.GraphQL },
      { name: "MongoDB", icon: techStackIcons.MongoDB },
      { name: "Tailwind CSS", icon: techStackIcons["Tailwind CSS"] }
    ],
    description: "An innovative agricultural marketplace connecting farmers directly with buyers, providing real-time price tracking, inventory management, and seamless transaction capabilities.",
    content: <AnimatedProjectImage projectImage={projectImages.agriMarket} />,
    githubIcon: <FaGithub className="text-2xl text-gray-800 dark:text-white hover:text-blue-600 transition-colors" />,
    webIcon: <FaExternalLinkAlt className="text-2xl text-gray-800 dark:text-white hover:text-green-600 transition-colors" />,
  }
]; 