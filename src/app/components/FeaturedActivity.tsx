import React, { useMemo } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";

// Centralized configuration and utility imports
import { Skeleton } from "@/components/ui/skeleton";
import { useInView } from "react-intersection-observer";

// Dynamic imports with loading states
const Tabs = dynamic(
  () =>
    import("@/components/ui/animated-tabs").then((mod) => ({
      default: mod.Tabs,
    })),
  {
    loading: () => <Skeleton variant="default" height="500px" />,
    ssr: false,
  }
);
const ShinyText = dynamic(() => import("@/components/ui/shiny-text"), {
  loading: () => <Skeleton variant="default" height="100px" />,
  ssr: false,
});

/**
 * Configuration for featured activity tabs
 * Provides a centralized and extensible tab definition
 */
const ACTIVITY_CONFIG = {
  tabs: [
    {
      title: "Thinking",
      value: "thinking",
      description: "Strategic Problem Solving",
      subtitle:
        "Analyzing complex challenges and developing innovative solutions",
      media: {
        type: "video",
        src: "/videos/thinking.mp4",
        alt: "Strategic Thinking Process",
      },
    },
    {
      title: "Coding",
      value: "coding",
      description: "Software Development",
      subtitle: "Creating robust and scalable web applications",
      media: {
        type: "video",
        src: "/videos/coding.mp4",
        alt: "Software Development Process",
      },
    },
    {
      title: "Automating",
      value: "automating",
      description: "Process Optimization",
      subtitle: "Streamlining workflows through intelligent automation",
      media: {
        type: "image",
        src: "/images/automation.gif",
        alt: "Automation Process",
      },
    },
    {
      title: "Investing",
      value: "investing",
      description: "Strategic Investment",
      subtitle:
        "Analyzing market trends and making data-driven financial decisions",
      media: {
        type: "video",
        src: "/videos/invest.mp4",
        alt: "Investment Strategy",
      },
    }
  ],
};

/**
 * Media Renderer Component
 * Handles different types of media with optimized rendering
 */
const MediaRenderer = React.memo(
  ({ media }: { media: (typeof ACTIVITY_CONFIG.tabs)[0]["media"] }) => {
    if (media.type === "video") {
      const { ref: inViewRef, inView } = useInView({ threshold: 0.5 });
      const videoRef = React.useRef<HTMLVideoElement>(null);

      React.useEffect(() => {
        if (videoRef.current) {
          if (inView) {
            videoRef.current.play().catch(() => {});
          } else {
            videoRef.current.pause();
          }
        }
      }, [inView]);

      return (
        <div
          ref={inViewRef}
          className="flex justify-center items-center rounded-lg pb-4 w-full h-full max-h-[600px] overflow-hidden"
        >
          <video
            ref={videoRef}
            key={media.src}
            src={media.src}
            muted
            loop
            playsInline
            preload="none"
            className="w-full h-[40vh] lg:h-[70vh] xl:h-[50vh] 2xl:h-[40vh] rounded-2xl object-cover transition-all duration-300 hover:scale-105"
          />
        </div>
      );
    }

    return (
      <Image
        src={media.src}
        alt={media.alt}
        width={500}
        height={300}
        sizes="(max-width: 768px) 100vw, 500px"
        className="flex justify-center items-center rounded-lg mt-4 w-full h-[80%] object-cover"
      />
    );
  }
);
MediaRenderer.displayName = "MediaRenderer";

/**
 * Featured Activity Component
 * Displays interactive tabs showcasing different professional activities
 */
const FeaturedActivity = React.memo(() => {
  // Memoize tabs to prevent unnecessary re-renders
  const memoizedTabs = useMemo(
    () =>
      ACTIVITY_CONFIG.tabs.map((tab) => ({
        ...tab,
        content: (
          <div className="w-full overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-white bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-secondary)]">
            <p>{tab.description}</p>
            <p className="text-sm mt-4 font-normal opacity-80">
              {tab.subtitle}
            </p>
            <MediaRenderer media={tab.media} />
          </div>
        ),
      })),
    []
  );

  return (
    <>
      <ShinyText
        text="What I Love To Do"
        className="text-5xl font-bold capitalize mb-10"
        speed={3}
      />
      <div className="h-[20rem] md:h-[40rem] [perspective:1000px]">
        <Tabs
          tabs={memoizedTabs}
          containerClassName="justify-start items-start"
        />
      </div>
    </>
  );
});

FeaturedActivity.displayName = "FeaturedActivity";

export default FeaturedActivity;
