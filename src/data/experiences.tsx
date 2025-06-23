import { ExperienceItem } from "@/types/experience";
import { MyButton } from "@/components/ui/mybutton";
import Image from "next/image";

export const ExperienceData: ExperienceItem[] = [
  {
    role: "Tech Support",
    company: "eFishery",
    logo: "/images/company/efishery.png",
    jobType: "Internship",
    start: "Sep 2023",
    end: "Jan 2024",
    location: "Bandung",
    arragement: "Hybrid",
    content: (
      <div>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <Image
            src="https://placehold.co/500x500/333/FFF.png?text=eFishery+1"
            alt="eFishery experience 1"
            width={500}
            height={500}
            className="h-20 w-full rounded-lg object-cover shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] md:h-44 lg:h-60"
          />
          <Image
            src="https://placehold.co/500x500/333/FFF.png?text=eFishery+2"
            alt="eFishery experience 2"
            width={500}
            height={500}
            className="h-20 w-full rounded-lg object-cover shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] md:h-44 lg:h-60"
          />
        </div>
        <p className="mb-4 text-xs font-normal text-neutral-800 md:text-sm dark:text-neutral-200 text-justify">
          Lorem Ipsum has been the industry&apos;s standard dummy text ever since the
          1500s, when an unknown printer took a galley of type and scrambled it
          to make a type specimen book. It has survived not only five centuries,
          but also the leap into electronic typesetting, remaining essentially
          unchanged.
        </p>
        <ul className="list-disc list-inside ml-4 text-sm mb-4">
          <li>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry.
          </li>
          <li>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry.
          </li>
          <li>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry.
          </li>
        </ul>
        <MyButton text="NodeJs" />
      </div>
    ),
  },
  {
    role: "Wordpress Builder",
    company: "PT Asamedia",
    logo: "/images/company/asamedia.png",
    jobType: "Freelance",
    start: "5 Dec 2024",
    end: "11 Dec 2024",
    location: "Indonesia",
    arragement: "Remote",
    content: (
      <div>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <Image
            src="https://placehold.co/500x500/333/FFF.png?text=Asamedia+1"
            alt="Asamedia experience 1"
            width={500}
            height={500}
            className="h-20 w-full rounded-lg object-cover shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] md:h-44 lg:h-60"
          />
          <Image
            src="https://placehold.co/500x500/333/FFF.png?text=Asamedia+2"
            alt="Asamedia experience 2"
            width={500}
            height={500}
            className="h-20 w-full rounded-lg object-cover shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] md:h-44 lg:h-60"
          />
        </div>
        <p className="mb-4 text-xs font-normal text-neutral-800 md:text-sm dark:text-neutral-200 text-justify">
          Lorem Ipsum has been the industry&apos;s standard dummy text ever since the
          1500s, when an unknown printer took a galley of type and scrambled it
          to make a type specimen book. It has survived not only five centuries,
          but also the leap into electronic typesetting, remaining essentially
          unchanged.
        </p>
        <ul className="list-disc list-inside ml-4 text-sm mb-4">
          <li>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry.
          </li>
          <li>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry.
          </li>
          <li>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry.
          </li>
        </ul>
        <MyButton text="NodeJs" />
      </div>
    ),
  },
]; 