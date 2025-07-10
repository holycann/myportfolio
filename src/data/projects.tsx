import React from "react";
import {
  FaGithub,
  FaExternalLinkAlt,
  FaCrown,
  FaPlug,
  FaUserShield,
  FaStore,
  FaUserGraduate,
  FaTasks,
  FaWpforms,
} from "react-icons/fa";
import {
  MdSecurity,
  MdOutlineSchedule,
  MdOutlineAnalytics,
  MdSchool,
  MdNotifications,
} from "react-icons/md";
import { BsFillCalendarCheckFill } from "react-icons/bs";
import {
  SiNextdotjs,
  SiTypescript,
  SiTailwindcss,
  SiFirebase,
  SiSocketdotio,
  SiRadixui,
  SiWordpress,
  SiElementor,
  SiPostgresql,
  SiPrisma,
  SiShadcnui,
  SiPhp,
  SiMariadb,
  SiVercel,
  SiReacthookform,
  SiZod,
  SiVite,
  SiReact,
  SiFramer,
  SiDaisyui,
  SiSwiper,
  SiHeadlessui,
  SiChartdotjs,
  SiAstra,
  SiUikit,
  SiJsonwebtokens,
  SiMaterialdesign,
} from "react-icons/si";
import { BiChart, BiMessage } from "react-icons/bi";
import { FaMessage } from "react-icons/fa6";
import {
  HiBell,
  HiCalendar,
  HiChartBar,
  HiCreditCard,
  HiCube,
  HiDeviceMobile,
  HiFilter,
  HiKey,
  HiMoon,
  HiOutlineMailOpen,
  HiShieldCheck,
  HiShoppingCart,
  HiViewGrid,
} from "react-icons/hi";
import {
  HiCursorArrowRays,
  HiEnvelope,
  HiMapPin,
  HiPhoto,
} from "react-icons/hi2";

// Utility function for placeholder images
const createPlaceholder = (text: string) =>
  `https://placehold.co/800x600/333/FFF?text=${encodeURIComponent(text)}`;

// Project Icons Configuration
const ProjectIcons = {
  default: {
    github: (
      <FaGithub className="text-2xl text-gray-800 dark:text-white hover:text-blue-600 transition-colors" />
    ),
    web: (
      <FaExternalLinkAlt className="text-2xl text-gray-800 dark:text-white hover:text-green-600 transition-colors" />
    ),
  },
  tech: {
    NextJS: <SiNextdotjs className="text-white" />,
    TypeScript: <SiTypescript className="text-[#3178C6]" />,
    TailwindCSS: <SiTailwindcss className="text-[#06B6D4]" />,
    WordPress: <SiWordpress className="text-white" />,
    RadixUI: <SiRadixui className="text-white" />,
    ShadcnUI: <SiShadcnui className="text-white" />,
    SocketIO: <SiSocketdotio className="text-white" />,
    Firebase: <SiFirebase className="text-yellow-500" />,
    PostgreSQL: <SiPostgresql className="text-blue-500" />,
    Prisma: <SiPrisma className="text-green-500" />,
    MariaDB: <SiMariadb className="text-orange-500" />,
    PHP: <SiPhp className="text-purple-500" />,
    Elementor: <SiElementor className="text-pink-300" />,
    Vercel: <SiVercel className="text-white" />,
    React: <SiReact className="text-blue-500" />,
    Vite: <SiVite className="text-purple-700" />,
    Zod: <SiZod className="text-blue-400" />,
    ReactHookForm: <SiReacthookform className="text-pink-500" />,
    FramerMotion: <SiFramer className="text-yellow-500" />,
    DaisyUI: <SiDaisyui className="text-yellow-500" />,
    Swiper: <SiSwiper className="text-blue-700" />,
    HeadlessUI: <SiHeadlessui className="text-cyan-500" />,
    ChartJS: <SiChartdotjs className="text-pink-400" />,
    WpForms: <FaWpforms className="text-orange-800" />,
    Astra: <SiAstra className="text-purple-600" />,
    UIKit: <SiUikit className="text-cyan-500" />,
    JWT: <SiJsonwebtokens className="text-yellow-300" />,
    MaterialUI: <SiMaterialdesign className="text-white" />,
  },
};

export const projects = [
  {
    title: "GoWAG",
    subtitle: "WhatsApp API Gateway",
    description:
      "Fullstack web dashboard built to simplify and scale WhatsApp Business operations. Developed with Next.js 14, TypeScript, and Firebase Auth, it combines real-time communication via WebSocket with a robust architecture that emphasizes clean code and separation of concerns. Designed for modern teams, the platform enables businesses to automate workflows, monitor performance, and manage user roles securely - making it a comprehensive solution for messaging management. Built with Next.js 14, TypeScript, and Firebase Auth, it combines real-time communication via WebSocket with a robust architecture that emphasizes clean code and separation of concerns. Designed for modern teams, the platform enables businesses to automate workflows, monitor performance, and manage user roles securely - making it a comprehensive solution for messaging management.",
    category: "SaaS",
    githubUrl: "https://github.com/holycann/GoWAG-App",
    webUrl: "https://wag.holyycan.com",
    githubIcon: ProjectIcons.default.github,
    webIcon: ProjectIcons.default.web,
    thumbnails: [
      {
        alt: "GoWAG App",
        src: "/images/projects/gowag/thumbnails/wag-phone-homepage.png",
        device: "phone",
        deviceColor: "border-blue-500",
      },
      {
        alt: "GoWAG Login Page",
        src: "/images/projects/gowag/thumbnails/wag-phone-login.png",
      },
      {
        alt: "GoWAG Register Page",
        src: "/images/projects/gowag/thumbnails/wag-phone-register.png",
      },
    ],
    images: [
      {
        alt: "GoWAG App",
        src: "/images/projects/gowag/wag-homepage.png",
        device: "phone",
        deviceColor: "border-blue-500",
      },
      {
        alt: "GoWAG Dashboard",
        src: "/images/projects/gowag/wag-dashboard.png",
        device: "window",
        deviceColor: "border-green-500",
      },
      {
        alt: "GoWAG Contacts Page",
        src: "/images/projects/gowag/wag-contacts.png",
        device: "phone",
        deviceColor: "border-purple-500",
      },
      {
        alt: "GoWAG Groups Page",
        src: "/images/projects/gowag/wag-groups.png",
        device: "window",
        deviceColor: "border-blue-500",
      },
      {
        alt: "GoWAG Messages Page",
        src: "/images/projects/gowag/wag-messages.png",
        device: "phone",
        deviceColor: "border-yellow-500",
      },
      {
        alt: "GoWAG Schedule Messages Page",
        src: "/images/projects/gowag/wag-schedule-messages.png",
        device: "phone",
        deviceColor: "border-yellow-500",
      },
      {
        alt: "GoWAG Campaigns Page",
        src: "/images/projects/gowag/wag-campaigns.png",
        device: "phone",
        deviceColor: "border-yellow-500",
      },
      {
        alt: "GoWAG Media Page",
        src: "/images/projects/gowag/wag-media.png",
        device: "phone",
        deviceColor: "border-yellow-500",
      },
      {
        alt: "GoWAG Auto Reply Page",
        src: "/images/projects/gowag/wag-auto-reply.png",
        device: "phone",
        deviceColor: "border-yellow-500",
      },
      {
        alt: "GoWAG Sessions Page",
        src: "/images/projects/gowag/wag-sessions.png",
        device: "phone",
        deviceColor: "border-yellow-500",
      },
      {
        alt: "GoWAG Analytics Page",
        src: "/images/projects/gowag/wag-analytics.png",
        device: "phone",
        deviceColor: "border-yellow-500",
      },
      {
        alt: "GoWAG System Health Page",
        src: "/images/projects/gowag/wag-system-health.png",
        device: "phone",
        deviceColor: "border-yellow-500",
      },
      {
        alt: "GoWAG Network Status Page",
        src: "/images/projects/gowag/wag-network-status.png",
        device: "phone",
        deviceColor: "border-yellow-500",
      },
      {
        alt: "GoWAG Message Logs Page",
        src: "/images/projects/gowag/wag-message-logs.png",
        device: "phone",
        deviceColor: "border-yellow-500",
      },
      {
        alt: "GoWAG Webhook Management Page",
        src: "/images/projects/gowag/wag-webhook-management.png",
        device: "phone",
        deviceColor: "border-yellow-500",
      },
      {
        alt: "GoWAG Webhook Logs Page",
        src: "/images/projects/gowag/wag-webhook-logs.png",
        device: "phone",
        deviceColor: "border-yellow-500",
      },
      {
        alt: "GoWAG Integrations Page",
        src: "/images/projects/gowag/wag-integrations.png",
        device: "phone",
        deviceColor: "border-yellow-500",
      },
      {
        alt: "GoWAG Api Keys Page",
        src: "/images/projects/gowag/wag-api-keys.png",
        device: "phone",
        deviceColor: "border-yellow-500",
      },
      {
        alt: "GoWAG Rate Limiting Page",
        src: "/images/projects/gowag/wag-rate-limiting.png",
        device: "phone",
        deviceColor: "border-yellow-500",
      },
      {
        alt: "GoWAG Access Management Page",
        src: "/images/projects/gowag/wag-access-management.png",
        device: "phone",
        deviceColor: "border-yellow-500",
      },
      {
        alt: "GoWAG Billing Page",
        src: "/images/projects/gowag/wag-billing.png",
        device: "phone",
        deviceColor: "border-yellow-500",
      },
      {
        alt: "GoWAG Feedback Page",
        src: "/images/projects/gowag/wag-feedback.png",
        device: "phone",
        deviceColor: "border-yellow-500",
      },
      {
        alt: "GoWAG Settings Page",
        src: "/images/projects/gowag/wag-settings.png",
        device: "phone",
        deviceColor: "border-yellow-500",
      },
    ],
    techStack: [
      { name: "Next.js", icon: ProjectIcons.tech.NextJS },
      { name: "TypeScript", icon: ProjectIcons.tech.TypeScript },
      { name: "Tailwind CSS", icon: ProjectIcons.tech.TailwindCSS },
      { name: "Firebase", icon: ProjectIcons.tech.Firebase },
      { name: "Radix UI", icon: ProjectIcons.tech.RadixUI },
      { name: "Shadcn UI", icon: ProjectIcons.tech.ShadcnUI },
      { name: "Socket.IO", icon: ProjectIcons.tech.SocketIO },
      { name: "PostgreSQL", icon: ProjectIcons.tech.PostgreSQL },
      { name: "Vercel", icon: ProjectIcons.tech.Vercel },
      { name: "Framer Motion", icon: ProjectIcons.tech.FramerMotion },
      { name: "Zod", icon: ProjectIcons.tech.Zod },
      { name: "ChartJS", icon: ProjectIcons.tech.ChartJS },
    ],
    features: [
      {
        text: "Bulk messaging, auto-replies, templates, and scheduling",
        icon: <HiOutlineMailOpen className="text-blue-500" />,
      },
      {
        text: "Real-time analytics on delivery and engagement",
        icon: <HiChartBar className="text-green-500" />,
      },
      {
        text: "Role-Based Access Control (Admin, Moderator, User, Guest)",
        icon: <HiShieldCheck className="text-purple-500" />,
      },
      {
        text: "Webhook & API key management",
        icon: <HiKey className="text-yellow-500" />,
      },
      {
        text: "Subscription tiers with feature segmentation",
        icon: <HiCreditCard className="text-cyan-500" />,
      },
    ],
    developmentStatus: "Alpha",
    progressStatus: "In Progress",
    progressPercentage: 65, // Added progress percentage
  },
  {
    title: "BubblePi Store",
    subtitle: "Premium Accounts Marketplace",
    description:
      "Stylish and responsive frontend for a premium accounts selling platform. Built using React, Vite, and TailwindCSS, the interface is designed with a vibrant modern UI and optimized UX, supporting both light and dark modes. The project includes dynamic routing, cart management, product filtering, and a fully-featured admin dashboard — showcasing frontend development at a professional SaaS level. Built with React, Vite, and TailwindCSS, the interface is designed with a vibrant modern UI and optimized UX, supporting both light and dark modes. The project includes dynamic routing, cart management, product filtering, and a fully-featured admin dashboard — showcasing frontend development at a professional SaaS level.",
    category: "Marketplace",
    githubUrl: "https://github.com/holycann/Bubblepi-Store",
    webUrl: "https://bubblepi-store.vercel.app",
    githubIcon: ProjectIcons.default.github,
    webIcon: ProjectIcons.default.web,
    images: [
      {
        alt: "BubblePi Store",
        src: "/images/projects/bubblepi/thumbnail.png",
        device: "phone",
        deviceColor: "border-blue-500",
      },
      {
        alt: "BubblePi Products",
        src: "/images/projects/bubblepi/bs-products.png",
        device: "phone",
        deviceColor: "border-purple-500",
      },
      {
        alt: "BubblePi Detail Product",
        src: "/images/projects/bubblepi/bs-detail-product.png",
        device: "phone",
        deviceColor: "border-purple-500",
      },
      {
        alt: "BubblePi Cart",
        src: "/images/projects/bubblepi/bs-cart.png",
        device: "window",
        deviceColor: "border-yellow-500",
      },
      {
        alt: "BubblePi Shipping Method",
        src: "/images/projects/bubblepi/bs-shipping-method.png",
        device: "phone",
        deviceColor: "border-green-500",
      },
      {
        alt: "BubblePi Payment Method",
        src: "/images/projects/bubblepi/bs-payment-method.png",
        device: "phone",
        deviceColor: "border-green-500",
      },
      {
        alt: "BubblePi Make Payment",
        src: "/images/projects/bubblepi/bs-make-payment.png",
        device: "phone",
        deviceColor: "border-green-500",
      },
      {
        alt: "BubblePi Checkout",
        src: "/images/projects/bubblepi/bs-checkout-completed.png",
        device: "phone",
        deviceColor: "border-green-500",
      },
    ],
    techStack: [
      { name: "React", icon: ProjectIcons.tech.React },
      { name: "Vite", icon: ProjectIcons.tech.Vite },
      { name: "Tailwind CSS", icon: ProjectIcons.tech.TailwindCSS },
      { name: "Shadcn UI", icon: ProjectIcons.tech.ShadcnUI },
      { name: "Zod", icon: ProjectIcons.tech.Zod },
      { name: "React Hook Form", icon: ProjectIcons.tech.ReactHookForm },
      { name: "Framer Motion", icon: ProjectIcons.tech.FramerMotion },
      { name: "DaisyUI", icon: ProjectIcons.tech.DaisyUI },
    ],
    features: [
      {
        text: "Fully responsive layout with cheerful, modern UI",
        icon: <FaStore className="text-cyan-500" />,
      },
      {
        text: "Dark mode toggle",
        icon: <HiMoon className="text-gray-200" />,
      },
      {
        text: "Product browsing & filtering by category",
        icon: <HiFilter className="text-blue-500" />,
      },
      {
        text: "Shopping cart and checkout flow",
        icon: <HiShoppingCart className="text-yellow-500" />,
      },
    ],
    developmentStatus: "Alpha",
    progressStatus: "On Hold",
    progressPercentage: 40, // Added progress percentage
  },
  {
    title: "ASA Media",
    subtitle: "Digital Media Portfolio",
    description:
      "Official digital presence for a leading Indonesian consulting firm specializing in sustainability and annual report services. Designed to convey credibility, professionalism, and trust, the website delivers key information on the company's services, values, and portfolio with a modern and responsive layout. Built with WordPress, Elementor, and Astra theme, the platform ensures seamless navigation and a visually appealing user experience.",
    category: "Portfolio",
    webUrl: "https://asamedia.id",
    webIcon: ProjectIcons.default.web,
    images: [
      {
        alt: "ASA Media",
        src: "/images/projects/asamedia/thumbnail.png",
        device: "phone",
        deviceColor: "border-blue-500",
      },
      {
        alt: "ASA Media Portfolio",
        src: "/images/projects/asamedia/asamedia-porto.png",
        device: "phone",
        deviceColor: "border-green-500",
      },
      {
        alt: "ASA Media Detail Portfolio",
        src: "/images/projects/asamedia/asamedia-detail-porto.png",
        device: "phone",
        deviceColor: "border-green-500",
      },
    ],
    techStack: [
      { name: "WordPress", icon: ProjectIcons.tech.WordPress },
      { name: "Elementor", icon: ProjectIcons.tech.Elementor },
      { name: "Astra", icon: ProjectIcons.tech.Astra },
      { name: "UIKit", icon: ProjectIcons.tech.UIKit },
    ],
    features: [
      {
        text: "Responsive Design",
        icon: <HiDeviceMobile className="text-blue-500" />,
      },
      {
        text: "Smooth Navigation",
        icon: <HiCursorArrowRays className="text-pink-200" />,
      },
      {
        text: "Portfolio Showcase",
        icon: <HiPhoto className="text-green-500" />,
      },
      {
        text: "Contact Form Integration",
        icon: <HiEnvelope className="text-yellow-500" />,
      },
    ],
    developmentStatus: "Delivered",
    progressStatus: "Completed",
    progressPercentage: 100, // Added progress percentage
  },
  {
    title: "Kawasan Digital",
    subtitle: "Digital Innovation Partner",
    description:
      "Cutting-edge interactive portfolio website designed to showcase creative work through rich visuals and smooth user interactions. Leveraging React 19, Next.js 15 (App Router), and advanced animation libraries like Framer Motion and React Three Fiber, the website combines performance, responsive design, and immersive 3D experiences into a modern digital presence.",
    category: "Company Profile",
    webUrl: "https://kawasan-digital.vercel.app",
    githubUrl: "https://github.com/holycann/Kawasan-Digital",
    webIcon: ProjectIcons.default.web,
    githubIcon: ProjectIcons.default.github,
    images: [
      {
        alt: "Kawasan Digital",
        src: "/images/projects/kawasan-digital/thumbnail.png",
        device: "window",
        deviceColor: "border-red-500",
      },
      {
        alt: "Kawasan Digital About Page",
        src: "/images/projects/kawasan-digital/kd-about.png",
        device: "window",
        deviceColor: "border-green-500",
      },
      {
        alt: "Kawasan Digital Services Page",
        src: "/images/projects/kawasan-digital/kd-services.png",
        device: "window",
        deviceColor: "border-green-500",
      },
      {
        alt: "Kawasan Digital Portfolio Page",
        src: "/images/projects/kawasan-digital/kd-portfolio.png",
        device: "window",
        deviceColor: "border-green-500",
      },
      {
        alt: "Kawasan Digital Contact Page",
        src: "/images/projects/kawasan-digital/kd-contact.png",
        device: "window",
        deviceColor: "border-green-500",
      },
    ],
    techStack: [
      { name: "React", icon: ProjectIcons.tech.React },
      { name: "Next.js", icon: ProjectIcons.tech.NextJS },
      { name: "Tailwind CSS", icon: ProjectIcons.tech.TailwindCSS },
      { name: "Framer Motion", icon: ProjectIcons.tech.FramerMotion },
    ],
    features: [
      {
        text: "3D Card Interactions with React Three Fibert",
        icon: <HiCube className="text-blue-500" />,
      },
      {
        text: "Animated UI & Bento Grid Layout",
        icon: <HiViewGrid className="text-gray-200" />,
      },
      {
        text: "Responsive Design",
        icon: <HiDeviceMobile className="text-yellow-500" />,
      },
    ],
    developmentStatus: "MVP",
    progressStatus: "In Progress",
    progressPercentage: 55, // Added progress percentage
  },
  {
    title: "Smart Parking System",
    subtitle: "Intelligent Parking Reservation Web App",
    description:
      "Modern web application designed to streamline parking space management through real-time visualization, reservations, and secure user access. Built with React 18 and Tailwind CSS, it delivers a responsive, intuitive UI backed by live WebSocket updates and JWT-based authentication. The app focuses on user convenience and efficient space allocation for smart city environments.",
    category: "SaaS",
    githubUrl: "https://github.com/holycann/SmartParkingSystem",
    webUrl: "https://autoparkin.holyycan.com/",
    githubIcon: ProjectIcons.default.github,
    webIcon: ProjectIcons.default.web,
    images: [
      {
        alt: "Smart Parking System",
        src: "/images/projects/smart-parking/thumbnail.png",
        device: "window",
        deviceColor: "border-red-500",
      }
    ],
    techStack: [
      { name: "React", icon: ProjectIcons.tech.React },
      { name: "Tailwind CSS", icon: ProjectIcons.tech.TailwindCSS },
      { name: "Socket.IO", icon: ProjectIcons.tech.SocketIO },
      { name: "JWT", icon: ProjectIcons.tech.JWT },
      { name: "Headless UI", icon: ProjectIcons.tech.HeadlessUI },
      { name: "Material UI", icon: ProjectIcons.tech.MaterialUI },
    ],
    features: [
      {
        text: "Real-time Parking Space Visualization",
        icon: <HiMapPin className="text-green-500" />,
      },
      {
        text: "Secure User Authentication",
        icon: <HiShieldCheck className="text-blue-500" />,
      },
      {
        text: "Reservation and schedule management",
        icon: <HiCalendar className="text-white" />,
      },
      {
        text: "Interactive toast notifications",
        icon: <HiBell className="text-yellow-500" />,
      },
    ],
    developmentStatus: "Beta",
    progressStatus: "On Hold",
    progressPercentage: 45, // Added progress percentage
  },
];
