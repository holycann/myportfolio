import { Tabs } from "@/components/ui/animated-tabs";
import ShinyText from "@/components/ui/shiny-text";
import Image from "next/image";
import ReactPlayer from "react-player";

const tabs = [
  {
    title: "Thinking",
    value: "thinking",
    content: (
      <div className="w-full overflow-hidden h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-white bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-secondary)]">
        <p>Strategic Problem Solving</p>
        <p className="text-sm mt-4 font-normal opacity-80">
          Analyzing complex challenges and developing innovative solutions
        </p>
        <ReactPlayer
          src="/videos/thinking.mp4" // Local video file path
          width="100%"
          height="80%"
          controls={false}
          playing={false}
          muted={true}
          className="flex justify-center items-center rounded-lg mt-4"
          style={{
            objectFit: "cover",
          }}
          autoPlay={true}
          loop={true}
        />
      </div>
    ),
  },
  {
    title: "Coding",
    value: "coding",
    content: (
      <div className="w-full overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-white bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-secondary)]">
        <p>Software Development</p>
        <p className="text-sm mt-4 font-normal opacity-80">
          Creating robust and scalable web applications
        </p>
        <ReactPlayer
          src="/videos/coding.mp4" // Local video file path
          width="100%"
          height="80%"
          controls={false}
          playing={false}
          muted={true}
          className="flex justify-center items-center rounded-lg mt-4"
          style={{
            objectFit: "cover",
          }}
          autoPlay={true}
          loop={true}
        />
      </div>
    ),
  },
  {
    title: "Automating",
    value: "automating",
    content: (
      <div className="w-full overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-white bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-secondary)]">
        <p>Process Optimization</p>
        <p className="text-sm mt-4 font-normal opacity-80">
          Streamlining workflows through intelligent automation
        </p>
        <Image
          src="/images/automation.gif"
          alt="Automation Process"
          width={500}
          height={300}
          className="flex justify-center items-center rounded-lg mt-4 w-full h-[80%] object-cover"
        />
      </div>
    ),
  },
  {
    title: "Investing",
    value: "investing",
    content: (
      <div className="w-full overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-white bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-secondary)]">
        <p>Strategic Investment</p>
        <p className="text-sm mt-4 font-normal opacity-80">
          Analyzing market trends and making data-driven financial decisions
        </p>
        <ReactPlayer
          src="/videos/invest.mp4" // Local video file path
          width="100%"
          height="80%"
          controls={false}
          playing={false}
          muted={true}
          className="flex justify-center items-center rounded-lg mt-4"
          style={{
            objectFit: "cover",
          }}
          autoPlay={true}
          loop={true}
        />
      </div>
    ),
  },
  {
    title: "Trading",
    value: "trading",
    content: (
      <div className="w-full overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-white bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-secondary)]">
        <p>Algorithmic Trading</p>
        <p className="text-sm mt-4 font-normal opacity-80">
          Developing advanced trading strategies using computational techniques
        </p>
        <ReactPlayer
          src="/videos/trading.mp4" // Local video file path
          width="100%"
          height="80%"
          controls={false}
          playing={false}
          muted={true}
          className="flex justify-center items-center rounded-lg mt-4"
          style={{
            objectFit: "cover",
          }}
          autoPlay={true}
          loop={true}
        />
      </div>
    ),
  },
];

const FeaturedActivity = () => {
  return (
    <>
      <ShinyText
        text="What I Love To Do"
        className="text-5xl font-bold capitalize mb-10"
        speed={3}
      />
      <div className="h-[20rem] md:h-[40rem] [perspective:1000px]">
        <Tabs tabs={tabs} containerClassName="justify-start items-start" />
      </div>
    </>
  );
};

export default FeaturedActivity;
