import { motion } from "framer-motion";
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
          Used Javascript, SQL and HTML to develop app-solutions. Increased
          website performance by optimizing front-end and back-end code for
          faster loading times. Applied responsive design principles to ensure
          consistent display and functionality across a wide range of devices,
          including mobile phones, tablets, and desktop computers.
        </motion.p>
        <motion.ul
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          viewport={{ once: true }}
          className="list-none ml-4 text-xs md:text-sm mb-4 space-y-2"
        >
          {[
            "Created easy-to-use APIs for third-party integrations, enhancing the functionality of existing applications without compromising on performance or security.",
            "Developed user-friendly web forms with validation and error handling.",
            "Developed functional databases, applications and servers to support websites on back-end.",
            "Worked with back-end developers to design APIs.",
            "Used NodeJS, ORM and SQL/No-SQL to develop and manage databases.",
            "Reviewed code, debugged problems, and corrected issues.",
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
            "JavaScript",
            "SQL",
            "HTML",
            "NodeJS",
            "API",
            "Responsive Design",
          ].map((tech) => {
            return (
              <MyButton
                key={tech}
                text={tech}
              />
            );
          })}
        </motion.div>
      </div>
    ),
  },
  // {
  //   role: "WordPress Designer",
  //   company: "PT Asamedia",
  //   logo: "/images/company/asamedia.png",
  //   jobType: "Remote",
  //   start: "Dec 2024",
  //   end: "Dec 2024",
  //   location: "Remote",
  //   arragement: "Remote",
  //   content: (
  //     <div>
  //       <div className="grid grid-cols-2 gap-4 mb-4">
  //         <motion.div
  //           initial={{ opacity: 0, scale: 0.9 }}
  //           whileInView={{ opacity: 1, scale: 1 }}
  //           transition={{ duration: 0.5 }}
  //           viewport={{ once: true }}
  //         >
  //           <Image
  //             src="/images/experience/web_asamedia.png"
  //             alt="WordPress Designer"
  //             width={500}
  //             height={500}
  //             className="w-full rounded-lg object-cover shadow-[0_0_15px_rgba(124,58,237,0.3)] transition-transform duration-300 hover:scale-[1.02]"
  //           />
  //         </motion.div>
  //         <motion.div
  //           initial={{ opacity: 0, scale: 0.9 }}
  //           whileInView={{ opacity: 1, scale: 1 }}
  //           transition={{ duration: 0.5, delay: 0.2 }}
  //           viewport={{ once: true }}
  //         >
  //         <Image
  //             src="/images/experience/web_asamedia_2.png"
  //             alt="Web Design"
  //           width={500}
  //           height={500}
  //             className="w-full rounded-lg object-cover shadow-[0_0_15px_rgba(249,115,22,0.3)] transition-transform duration-300 hover:scale-[1.02]"
  //           />
  //         </motion.div>
  //       </div>
  //       <motion.p
  //         initial={{ opacity: 0, y: 20 }}
  //         whileInView={{ opacity: 1, y: 0 }}
  //         transition={{ duration: 0.5, delay: 0.4 }}
  //         viewport={{ once: true }}
  //         className="mb-4 text-xs md:text-sm font-normal text-neutral-700 dark:text-neutral-300 text-justify"
  //       >
  //         Developed user-friendly web forms with validation and error handling.
  //         Proved successful working within tight deadlines and a fast-paced
  //         environment. Optimized web applications for speed, scalability and
  //         security.
  //       </motion.p>
  //       <motion.ul
  //         initial={{ opacity: 0 }}
  //         whileInView={{ opacity: 1 }}
  //         transition={{ duration: 0.5, delay: 0.6 }}
  //         viewport={{ once: true }}
  //         className="list-none ml-4 text-xs md:text-sm mb-4 space-y-2"
  //       >
  //         {[
  //           "Collected, defined and translated user requirements into project designs and implementation plans.",
  //           "Provided front-end website development using WordPress, Hubspot, and other editing software.",
  //           "Adhered to SEO best practices while designing sites.",
  //           "Implemented custom post types and taxonomies to organize content effectively on various WordPress websites.",
  //         ].map((feature, index) => (
  //           <motion.li
  //             key={index}
  //             initial={{ opacity: 0, x: -20 }}
  //             whileInView={{ opacity: 1, x: 0 }}
  //             transition={{ duration: 0.3, delay: 0.6 + index * 0.1 }}
  //             viewport={{ once: true }}
  //             className="flex items-center text-neutral-600 dark:text-neutral-400 before:content-['▶'] before:mr-2 before:text-purple-500"
  //           >
  //             {feature}
  //           </motion.li>
  //         ))}
  //       </motion.ul>
  //       <motion.div
  //         initial={{ opacity: 0 }}
  //         whileInView={{ opacity: 1 }}
  //         transition={{ duration: 0.5, delay: 0.8 }}
  //         viewport={{ once: true }}
  //         className="flex flex-wrap gap-2"
  //       >
  //         {["WordPress", "Web Design", "SEO", "Front-end", "Hubspot"].map(
  //           (tech) => (
  //             <MyButton
  //               key={tech}
  //               text={tech}
  //               className="text-xs px-2 py-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600 transition-all duration-300"
  //             />
  //           )
  //         )}
  //       </motion.div>
  //     </div>
  //   ),
  // },
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
          Generated reports to track performance and analyze trends. Tested new
          software and hardware prior to deployment. Researched and identified
          solutions to technical problems. Collaborated with cross-functional
          teams to identify, analyze, and resolve software defects, improving
          overall product quality.
        </motion.p>
        <motion.ul
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          viewport={{ once: true }}
          className="list-none ml-4 text-xs md:text-sm mb-4 space-y-2"
        >
          {["Build Whatsapp Bot Reminder", "Build SLA Scrapper Slack Bot"].map(
            (feature, index) => (
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
            )
          )}
        </motion.ul>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          viewport={{ once: true }}
          className="flex flex-wrap gap-2"
        >
          {["Technical Support", "Reporting", "Bot Development"].map((tech) => (
            <MyButton
              key={tech}
              text={tech}
            />
          ))}
        </motion.div>
      </div>
    ),
  },
]; 
