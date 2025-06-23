import { ExperienceItem } from "@/types/experience";
import { MyButton } from "@/components/ui/mybutton";
import Image from "next/image";

export const ExperienceData: ExperienceItem[] = [
  {
    role: "Tech Support Intern",
    company: "eFishery",
    logo: "/images/company/efishery.png",
    jobType: "Internship",
    start: "Sep 2023",
    end: "Jan 2024",
    location: "Bandung, Indonesia",
    arragement: "Hybrid",
    content: (
      <div>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <Image
            src="https://placehold.co/500x500/333/FFF.png?text=eFishery+Tech+Support"
            alt="eFishery tech support workspace"
            width={500}
            height={500}
            className="h-20 w-full rounded-lg object-cover shadow-lg md:h-44 lg:h-60"
          />
          <Image
            src="https://placehold.co/500x500/333/FFF.png?text=eFishery+Team"
            alt="eFishery team collaboration"
            width={500}
            height={500}
            className="h-20 w-full rounded-lg object-cover shadow-lg md:h-44 lg:h-60"
          />
        </div>
        <p className="mb-4 text-sm font-normal text-neutral-700 dark:text-neutral-300 text-justify">
          Worked as a Tech Support Intern at eFishery, Indonesia&apos;s leading aquaculture technology platform, 
          providing critical technical assistance and customer support for digital farming solutions.
        </p>
        <ul className="list-disc list-inside ml-4 text-sm mb-4 space-y-2">
          <li>Resolved 50+ technical issues daily, maintaining a 95% customer satisfaction rate</li>
          <li>Collaborated with development team to document and escalate complex technical problems</li>
          <li>Developed internal documentation and knowledge base to streamline support processes</li>
        </ul>
        <div className="flex flex-wrap gap-2">
          <MyButton text="Customer Support" />
          <MyButton text="Technical Troubleshooting" />
          <MyButton text="Documentation" />
        </div>
      </div>
    ),
  },
  {
    role: "WordPress Developer",
    company: "PT Asamedia",
    logo: "/images/company/asamedia.png",
    jobType: "Freelance",
    start: "Dec 2023",
    end: "Jan 2024",
    location: "Remote, Indonesia",
    arragement: "Remote",
    content: (
      <div>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <Image
            src="https://placehold.co/500x500/333/FFF.png?text=WordPress+Dev"
            alt="WordPress website development"
            width={500}
            height={500}
            className="h-20 w-full rounded-lg object-cover shadow-lg md:h-44 lg:h-60"
          />
          <Image
            src="https://placehold.co/500x500/333/FFF.png?text=Web+Design"
            alt="Web design mockup"
            width={500}
            height={500}
            className="h-20 w-full rounded-lg object-cover shadow-lg md:h-44 lg:h-60"
          />
        </div>
        <p className="mb-4 text-sm font-normal text-neutral-700 dark:text-neutral-300 text-justify">
          Freelance WordPress Developer for PT Asamedia, creating responsive and visually appealing 
          websites with custom themes and plugins to enhance client online presence.
        </p>
        <ul className="list-disc list-inside ml-4 text-sm mb-4 space-y-2">
          <li>Designed and implemented 2 custom WordPress websites with responsive layouts</li>
          <li>Optimized website performance, improving page load times by 40%</li>
          <li>Integrated SEO best practices and implemented custom WordPress plugins</li>
        </ul>
        <div className="flex flex-wrap gap-2">
          <MyButton text="WordPress" />
          <MyButton text="Web Design" />
          <MyButton text="SEO Optimization" />
        </div>
      </div>
    ),
  },
]; 