import { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { BottomNavbar } from "@/components/ui/bottom-navbar";
import { HiHome } from "react-icons/hi2";
import { FaLinkedinIn, FaStackOverflow, FaGithub } from "react-icons/fa6";
import { Analytics } from '@vercel/analytics/next';

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "Muhamad Ramadhan",
  description: "Portfolio Muhamad Ramadhan",
};

const navItems = [
  {
    link: "/",
    icon: <HiHome className="text-neutral-500 dark:text-white" size={24} />,
  },
  {
    name: "Experience",
    link: "/experience",
  },
  {
    name: "Projects",
    link: "/projects",
  },
  {
    name: "Contact",
    link: "/contact",
  },
];

const socialItems = [
  {
    name: "Github",
    link: "https://github.com/holycann",
    icon: <FaGithub className="text-neutral-500 dark:text-white" size={24} />,
  },
  {
    name: "Linkedin",
    link: "https://www.linkedin.com/in/muhamad-ramadhan-bb6289237/",
    icon: (
      <FaLinkedinIn className="text-neutral-500 dark:text-white" size={24} />
    ),
  },
  {
    name: "Stack Overflow",
    link: "https://stackoverflow.com/users/21961396/holycan",
    icon: (
      <FaStackOverflow className="text-neutral-500 dark:text-white" size={24} />
    ),
  },
];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${poppins.variable} antialiased`}
      >
        <BottomNavbar navItems={navItems} socialItems={socialItems} />
        <div className="bg-gradient-to-b from-white to-neutral-100 dark:from-neutral-950 dark:to-neutral-800">
          <div className="container mx-auto">{children}</div>
        </div>
        <Analytics />
      </body>
    </html>
  );
}
