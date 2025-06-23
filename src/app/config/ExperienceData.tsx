import { motion } from "framer-motion";
import { MyButton } from "@/components/ui/mybutton";
import Image from "next/image";

export const ExperienceData = [
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
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <Image
              src="https://placehold.co/600x400/blue/white.png?text=eFishery+Tech+Support+1"
              alt="eFishery tech support workspace"
              width={500}
              height={500}
              className="w-full rounded-lg object-cover shadow-[0_0_15px_rgba(59,130,246,0.3)] transition-transform duration-300 hover:scale-[1.02]"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Image
              src="https://placehold.co/600x400/green/white.png?text=eFishery+Team+Collaboration"
              alt="eFishery team collaboration"
              width={500}
              height={500}
              className="w-full rounded-lg object-cover shadow-[0_0_15px_rgba(16,178,130,0.3)] transition-transform duration-300 hover:scale-[1.02]"
            />
          </motion.div>
        </div>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          viewport={{ once: true }}
          className="mb-4 text-sm font-normal text-neutral-700 dark:text-neutral-300 text-justify"
        >
          Worked as a Tech Support Intern at eFishery, Indonesia&apos;s leading aquaculture technology platform, 
          providing critical technical assistance and customer support for digital farming solutions.
        </motion.p>
        
        <motion.ul
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          viewport={{ once: true }}
          className="list-none ml-4 text-sm mb-4 space-y-2"
        >
          {[
            "Resolved 50+ technical issues daily, maintaining a 95% customer satisfaction rate",
            "Collaborated with development team to document and escalate complex technical problems",
            "Developed internal documentation and knowledge base to streamline support processes"
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
          {["Customer Support", "Technical Troubleshooting", "Documentation"].map((tech) => (
            <MyButton 
              key={tech}
              text={tech} 
              className="text-xs px-2 py-1 bg-gradient-to-r from-blue-500 to-green-500 text-white hover:from-blue-600 hover:to-green-600 transition-all duration-300" 
            />
          ))}
        </motion.div>
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
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <Image
              src="https://placehold.co/600x400/purple/white.png?text=WordPress+Development"
              alt="WordPress website development"
              width={500}
              height={500}
              className="w-full rounded-lg object-cover shadow-[0_0_15px_rgba(124,58,237,0.3)] transition-transform duration-300 hover:scale-[1.02]"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Image
              src="https://placehold.co/600x400/orange/white.png?text=Web+Design+Mockup"
              alt="Web design mockup"
              width={500}
              height={500}
              className="w-full rounded-lg object-cover shadow-[0_0_15px_rgba(249,115,22,0.3)] transition-transform duration-300 hover:scale-[1.02]"
            />
          </motion.div>
        </div>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          viewport={{ once: true }}
          className="mb-4 text-sm font-normal text-neutral-700 dark:text-neutral-300 text-justify"
        >
          Freelance WordPress Developer for PT Asamedia, creating responsive and visually appealing 
          websites with custom themes and plugins to enhance client online presence.
        </motion.p>
        
        <motion.ul
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          viewport={{ once: true }}
          className="list-none ml-4 text-sm mb-4 space-y-2"
        >
          {[
            "Designed and implemented 2 custom WordPress websites with responsive layouts",
            "Optimized website performance, improving page load times by 40%",
            "Integrated SEO best practices and implemented custom WordPress plugins"
          ].map((feature, index) => (
            <motion.li
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.6 + index * 0.1 }}
              viewport={{ once: true }}
              className="flex items-center text-neutral-600 dark:text-neutral-400 before:content-['▶'] before:mr-2 before:text-purple-500"
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
          {["WordPress", "Web Design", "SEO Optimization"].map((tech) => (
            <MyButton 
              key={tech}
              text={tech} 
              className="text-xs px-2 py-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600 transition-all duration-300" 
            />
          ))}
        </motion.div>
      </div>
    ),
  },
];
