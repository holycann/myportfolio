import { motion } from "motion/react";
import { MyButton } from "@/components/ui/mybutton";
import Image from "next/image";
import { ExperienceItem } from "@/types/experience";

export const ExperienceData: ExperienceItem[] = [
  {
    role: "Full Stack Developer",
    company: "Freelance",
    logo: "/images/company/kawasandigital.png",
    jobType: "Remote",
    start: "Jan 2024",
    end: "Present",
    location: "Remote",
    arragement: "Remote",
    content: (
      <div>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          viewport={{ once: true }}
          className="mb-4 text-xs md:text-sm font-normal text-neutral-700 dark:text-neutral-300 text-justify"
        >
          As a freelance Full Stack Developer, I worked on several client and
          internal projects ranging from landing pages, dashboards,
          service-based systems, and mobile apps. I used technologies like HTML,
          CSS, JavaScript, Laravel, WordPress, and React Native Expo. I built
          both SQL (MariaDB) and NoSQL (Firebase/Firestore) integrations
          depending on use case. I implemented component-based frontend
          structures, and backend with separation of concerns and clean
          architecture, often applying SOLID and DRY principles to ensure
          maintainability. I also hosted bots and apps on AWS and explored
          Docker for Golang deployment.
        </motion.p>
        <motion.ul
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          viewport={{ once: true }}
          className="list-none ml-4 text-xs md:text-sm mb-4 space-y-2"
        >
          {[
            "Developed and delivered various client projects including websites and applications using HTML, CSS, JavaScript, Laravel, and WordPress.",
            "Designed and deployed a media storage solution using Cloudinary for client projects.",
            "Developed user-friendly web forms with validation and error handling.",
            "Developed functional databases, applications, and servers to support websites on the back-end.",
            "Used SQL and NoSQL in different use cases to support client requirements.",
            "Collaborated with clients remotely via iterative feedback cycles, improving delivery accuracy and timeline.",
          ].map((feature, index) => (
            <motion.li
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.6 + index * 0.1 }}
              viewport={{ once: true }}
              className="flex items-center text-neutral-600 dark:text-neutral-400 before:content-['▶'] before:mr-2 before:text-blue-500"
            >
              {feature}
            </motion.li>
          ))}
        </motion.ul>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          viewport={{ once: true }}
          className="flex flex-wrap gap-2"
        >
          {[
            "HTML",
            "CSS",
            "JavaScript",
            "Tailwind CSS",
            "Wordpress",
            "React Native (Expo)",
            "Responsive Design",
            "Laravel",
            "MariaDB",
            "Firebase Auth",
            "Firestore",
            "Git",
            "Github",
          ].map((tech) => {
            return <MyButton key={tech} text={tech} />;
          })}
        </motion.div>
      </div>
    ),
  },
  {
    role: "Technical Support Intern",
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
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <Image
              src="/images/experience/efishery.jpg"
              alt="eFishery tech support workspace"
              width={500}
              height={500}
              className="w-full rounded-lg object-cover shadow-[0_0_15px_rgba(59,130,246,0.3)] transition-transform duration-300 hover:scale-[1.02]"
            />
          </motion.div>
        </div>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          viewport={{ once: true }}
          className="mb-4 text-xs md:text-sm font-normal text-neutral-700 dark:text-neutral-300 text-justify"
        >
          At eFishery, I served as the first level tech support for both system
          and operational field issues, providing initial handling based on
          documentation or self analysis before escalating to the engineering
          team. I managed defect tracking and reporting using ClickUp, conducted
          monthly analyses, measured SLA performance, and collaborated with the
          team to identify recurring issues. I also contributed to black box
          testing and developed a WhatsApp automation bot that improved the
          consistency and timeliness of issue reporting by field teams.
        </motion.p>
        <motion.ul
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          viewport={{ once: true }}
          className="list-none ml-4 text-xs md:text-sm mb-4 space-y-2"
        >
          {[
            "Managed defect tracking and documentation using ClickUp, including monthly analysis, SLA measurement, and collaboration with the team to identify recurring issues and drive process improvements.",
            "Handled 50+ bug reports with a 50% - 80% resolution rate at the first level.",
            "Reduced average escalation time by 40% through accurate initial analysis.",
            "Built a WhatsApp bot reminder using Node.js and AWS to remind field teams to submit daily reports.",
            "Helped increase reporting compliance in field operations by an estimated 20-30% after bot implementation.",
            "Participated in black box testing for internal applications to ensure functionality and user experience before deployment.",
          ].map((feature, index) => (
            <motion.li
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.6 + index * 0.1 }}
              viewport={{ once: true }}
              className="flex items-center text-neutral-600 dark:text-neutral-400 before:content-['▶'] before:mr-2 before:text-green-500"
            >
              {feature}
            </motion.li>
          ))}
        </motion.ul>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          viewport={{ once: true }}
          className="flex flex-wrap gap-2"
        >
          {[
            "ClickUp",
            "Google Sheets",
            "Google Cloud Console",
            "Node.js",
            "JavaScript",
            "Black Box Testing",
            "Postman",
            "AWS",
          ].map((tech) => (
            <MyButton key={tech} text={tech} />
          ))}
        </motion.div>
      </div>
    ),
  },
];
