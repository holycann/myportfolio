import "./globals.css";
import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import { Toaster } from "sonner";
import Navbar from "@/components/Nav";
import { getSEO, generateJsonLd, defaultMeta } from "@/lib/seo";
import { Providers, ThemeProvider } from "../providers/ThemeProvider";
import { ScrollToTop } from "@/components/ui/scroll-to-top";
import dynamic from "next/dynamic";
import { Loading } from "@/components/ui/loading";

const montserrat = Montserrat({
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

const structuredData = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Itsrama",
  url: defaultMeta.url,
  image: defaultMeta.image,
  sameAs: ["https://twitter.com/ehhramaa_", "https://instagram.com/ehhramaa_"],
  jobTitle: "Full Stack Developer & Automation Engineer",
  worksFor: {
    "@type": "Organization",
    name: "Freelance",
  },
  description: defaultMeta.description,
};

const Footer = dynamic(() => import("@/components/Footer"), {
  loading: () => (
    <div className="h-40 flex items-center justify-center">
      <Loading variant="solid" size="lg" label="Loading..." />
    </div>
  ),
  ssr: true,
});

export const metadata: Metadata = getSEO({
  themeColor: "#4A3F3A",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${montserrat.className} dark overflow-x-hidden`}>
        <Providers>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            <Navbar />
            {children}
            <Footer />
            <ScrollToTop />
            <Toaster
              position="top-right"
              richColors
              expand={false}
              closeButton
            />
          </ThemeProvider>
        </Providers>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={generateJsonLd(structuredData)}
        />
      </body>
    </html>
  );
}
