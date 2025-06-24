import { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { BottomNavbar } from "@/components/ui/bottom-navbar";
import { HiBriefcase, HiEnvelope, HiFolder, HiHome } from "react-icons/hi2";
import { FaLinkedinIn, FaStackOverflow, FaGithub } from "react-icons/fa6";
import { Analytics } from "@vercel/analytics/next";
import { LenisProvider } from "@/components/LenisProvider";
import { Toaster } from "react-hot-toast";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "Muhamad Ramadhan",
  description:
    "Portfolio Muhamad Ramadhan - Backend Developer dengan pengalaman dalam Node.js, Golang, dan PostgreSQL.",
  metadataBase: new URL("https://holycan.dev"),
  openGraph: {
    title: "Muhamad Ramadhan",
    description:
      "Portfolio Backend Developer: Golang, Node.js, PostgreSQL, dan AWS.",
    url: "https://holyycan.com",
    siteName: "Muhamad Ramadhan Portfolio",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Muhamad Ramadhan Portfolio",
      },
    ],
    locale: "id_ID",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Muhamad Ramadhan",
    description:
      "Portfolio Backend Developer: Golang, Node.js, dan PostgreSQL.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

const navItems = [
  {
    name: "Home",
    link: "#hero",
    icon: <HiHome className="text-neutral-500 dark:text-white" size={24} />,
  },
  {
    name: "Experience",
    link: "#experience",
    icon: <HiBriefcase className="text-neutral-500 dark:text-white" size={24} />,
  },
  {
    name: "Projects",
    link: "#project",
    icon: <HiFolder className="text-neutral-500 dark:text-white" size={24} />,
  },
  {
    name: "Contact",
    link: "#contact",
    icon: <HiEnvelope className="text-neutral-500 dark:text-white" size={24} />,
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
    <html lang="en" dir="ltr">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Muhamad Ramadhan",
              url: "https://holyycan.com",
              image: "https://holyycan.com/_next/image?url=%2Fimages%2Fhero.png&w=828&q=75",
              description:
                "Portfolio profesional yang menampilkan karya dan proyek terbaik saya sebagai seorang backend developer, termasuk aplikasi web dan solusi teknis yang telah dikembangkan menggunakan teknologi terkini seperti Golang, Node.js, dan PostgreSQL.",
              contactPoint: {
                "@type": "ContactPoint",
                telephone: "+62-851-7995-5480",
                contactType: "WhatsApp Number",
                areaServed: "ID",
                availableLanguage: "Indonesian",
              },
              address: {
                "@type": "PostalAddress",
                streetAddress: "Jatiwangi",
                addressLocality: "Bekasi",
                addressRegion: "West Java",
                postalCode: "17530",
                addressCountry: "ID",
              },
              sameAs: [
                "https://www.linkedin.com/in/muhamad-ramadhan-bb6289237",
                "https://github.com/holycann",
              ],
            }),
          }}
        />
      </head>
      <body className={`${poppins.variable} antialiased`}>
        <Toaster 
          position="top-right"
          toastOptions={{
            style: {
              background: '#333',
              color: '#fff',
            },
          }}
        />
        <LenisProvider>
          <BottomNavbar navItems={navItems} socialItems={socialItems} />
          <div className="bg-gradient-to-b from-white to-neutral-100 dark:from-neutral-950 dark:to-neutral-800">
            <div className="container mx-auto">{children}</div>
          </div>
          <Analytics />
        </LenisProvider>
      </body>
    </html>
  );
}
