import {
  IconBrandFramer,
  IconBrowser,
  IconCloud,
  IconDatabase,
  IconServer2,
  IconTools,
} from "@tabler/icons-react";
import FeaturedSection, { FeaturedSectionProps } from "../ui/featured-section";
import { MyButton } from "../ui/mybutton";

const techStacks: FeaturedSectionProps[] = [
  {
    title: "Frontend Technologies",
    description: "Frontend technologies I use",
    icon: <IconBrowser />,
    children: (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-8">
        <MyButton text="React" color="primary" />
        <MyButton text="HTML5" color="danger" />
        <MyButton text="CSS3" color="success" />
        <MyButton text="JavaScript" color="warning" />
        <MyButton text="TypeScript" color="secondary" />
      </div>
    ),
  },
  {
    title: "Backend Technologies",
    description: "Backend technologies I use",
    icon: <IconServer2 />,
    children: (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-8">
        <MyButton text="Go" color="primary" />
        <MyButton text="PHP" color="warning" />
        <MyButton text="Node.js" color="success" />
      </div>
    ),
  },
  {
    title: "Frameworks",
    description: "Frameworks I use",
    icon: <IconBrandFramer />,
    children: (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-8">
        <MyButton text="Next.js" color="secondary" />
        <MyButton text="Vite" color="primary" />
        <MyButton text="Laravel" color="danger" />
        <MyButton text="Next.js" color="secondary" />
        <MyButton text="Gin" color="primary" />
      </div>
    ),
  },
  {
    title: "Database Systems",
    description: "Database systems I use",
    icon: <IconDatabase />,
    children: (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-8">
        <MyButton text="Firebase" color="primary" />
        <MyButton text="PostgreSQL" color="secondary" />
        <MyButton text="MySQL" color="success" />
        <MyButton text="MariaDB" color="warning" />
      </div>
    ),
  },
  {
    title: "Platforms & CMS",
    description: "Platforms and Content Management Systems",
    icon: <IconCloud />,
    children: (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-8">
        <MyButton text="Vercel" color="primary" />
        <MyButton text="WordPress" color="secondary" />
        <MyButton text="Cloudflare" color="success" />
        <MyButton text="Cloudinary" color="warning" />
      </div>
    ),
  },
  {
    title: "Development Tools",
    description: "Development and workflow tools",
    icon: <IconTools />,
    children: (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-8">
        <MyButton text="Git" color="primary" />
        <MyButton text="GitHub" color="secondary" />
        <MyButton text="Postman" color="success" />
        <MyButton text="Notion" color="warning" />
        <MyButton text="ClickUp" color="danger" />
        <MyButton text="Figma" color="primary" />
        <MyButton text="Canva" color="secondary" />
      </div>
    ),
  },
];

export default function TechStack() {
  return (
    <div className="container mx-auto py-10 md:py-20 lg:py-30" id="tech-stack">
      <div className="flex justify-center">
        <h1 className="relative text-center text-4xl md:text-6xl leading-none block drop-shadow-[6px_6px_0px_rgba(0,0,0,0.3)] dark:drop-shadow-[6px_6px_0px_rgba(255,255,255,0.2)] font-['Cascadia_Code']">
          Tech Stack
          <div className="w-full flex items-center justify-center lg:justify-start overflow-hidden">
            {[...Array(10)].map((_, index) => (
              <div
                key={index}
                className="w-2 md:w-6 h-1 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 mx-1 animate-ping"
                style={{
                  animationDelay: `${index * Math.random() * 6}s`,
                  animationDuration: "3s",
                  transform: `rotate(${index * 5}deg)`,
                }}
              />
            ))}
          </div>
        </h1>
      </div>

      <div className="px-6 md:px-0 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 relative z-10 py-10 max-w-7xl mx-auto">
        {techStacks.map((techStack, index) => (
          <FeaturedSection
            key={techStack.title}
            props={techStack}
            index={index}
          />
        ))}
      </div>
    </div>
  );
}
