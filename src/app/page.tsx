import { BackgroundBeamsWithCollision } from "../components/ui/background-beams-with-collision";
import Image from "next/image";
import profileImg from "@/assets/home_profile.png"; // ganti dengan path gambar kamu
import { ContainerHoverAnimation } from "@/components/ui/container-hover-animation";

export default function Home() {
  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      {/* Animasi latar belakang */}
      <BackgroundBeamsWithCollision>
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 items-center justify-items-center px-6 sm:px-12 py-20">
          {/* Kiri: Gambar dengan efek background */}
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
                src={profileImg}
                alt="hero"
                className="mx-auto rounded-2xl object-contain h-full object-center"
                draggable={false}
              />
            </ContainerHoverAnimation>
          </div>

          {/* Kanan: Konten Teks */}
          <div className="w-full max-w-xl text-center lg:text-left px-4">
            <h2 className="text-3xl sm:text-5xl font-bold text-gray-800 dark:text-white">
              Backend Developer & Crypto Enthusiast
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mt-4 text-justify">
              I&apos;m passionate about building efficient and scalable systems using Golang and PostgreSQL. Outside of tech, I actively trade crypto as an intraday trader, combining data-driven strategies with modern tools.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mt-6">
              <button className="px-5 py-2 border border-gray-400 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition">
                More About Me
              </button>
              <button className="px-5 py-2 text-gray-600 dark:text-gray-300">
                Get In Touch
              </button>
            </div>
          </div>
        </div>
      </BackgroundBeamsWithCollision>
    </div>
  );
}
