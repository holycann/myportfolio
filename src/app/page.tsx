import { ContainerHoverAnimation } from "@/components/ui/container-hover-animation";
import Image from "next/image";
import { MyButton } from "@/components/ui/mybutton";
import { HiOutlineEye } from "react-icons/hi";

export default function Home() {
  return (
    <section className="mx-auto p-4 h-[100vh]" id="home">
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 items-center justify-items-center">
        <div className="flex flex-col overflow-hidden">
          <ContainerHoverAnimation
            titleComponent={
              <>
                <h1 className="text-4xl font-semibold text-black dark:text-white">
                  Hi, Im <br />
                  <span className="text-3xl md:text-[5rem] font-bold mt-1 leading-none">
                    Muhamad Ramadhan
                  </span>
                </h1>
              </>
            }
          >
            <Image
              src="/images/hero.png"
              width={800}
              height={600}
              alt="hero"
              className="mx-auto rounded-2xl object-contain h-full object-center"
              draggable={false}
            />
          </ContainerHoverAnimation>
        </div>

        {/* Kanan: Konten Teks */}
        <div className="w-full max-w-xl text-center lg:text-left px-4">
          <h2 className="text-3xl sm:text-5xl font-bold text-gray-800 dark:text-white">
            Backend Developer
          </h2>
          <h3 className="font-normal text-3xl font-semibold">& Crypto Enthusiast</h3>
          <p className="text-gray-600 dark:text-gray-300 py-6 text-justify">
            I&apos;m passionate about building efficient and scalable systems
            using Golang and PostgreSQL. Outside of tech, I actively trade
            crypto as an intraday trader, combining data-driven strategies with
            modern tools.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 py-6">
            <MyButton text="My Resume" icon={<HiOutlineEye />} />
            <button className="px-2 py-2 text-gray-600 dark:text-gray-300 dark:hover:text-white cursor-pointer transition duration-500">
              Get In Touch
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
