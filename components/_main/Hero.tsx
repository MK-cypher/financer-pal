"use client";
import {opacityAnimation} from "@/lib/animations";
import {motion} from "framer-motion";
import {ArrowUpRight} from "lucide-react";
import Link from "next/link";
import {BackgroundBeams} from "../ui/background-beams";
import {SparklesCore} from "../ui/sparkles";
import {TextGenerateEffect} from "../ui/text-generate-effect";
import {useUser} from "../UserContext";

export default function Hero() {
  const {user} = useUser();
  return (
    <motion.div
      className="container min-h-[calc(100svh-80px)]"
      variants={opacityAnimation()}
      initial={"initial"}
      whileInView={"animate"}
      viewport={{once: true}}
    >
      <div className="min-h-[calc(100svh-200px)] rounded-3xl flex flex-col justify-center items-center overflow-hidden relative">
        <div className="w-full h-full rounded-lg absolute bottom-[20%] left-[60%] rotate-45 blur-effect-1" />
        <div className="w-full h-full rounded-lg absolute top-[80%] right-[80%] blur-effect-1" />
        <div className="absolute w-full h-full top-0 left-0">
          <SparklesCore
            id="tsparticlesfullpage"
            background="transparent"
            minSize={0.3}
            maxSize={0.6}
            particleDensity={20}
            className="w-full h-full opacity-10"
            particleColor="#FFFFFF"
          />
          <BackgroundBeams />
        </div>
        <div className="text-center mb-10 flex flex-col justify-center items-center max-w-[700px] relative z-[1]">
          <div className="mb-2">
            <TextGenerateEffect duration={2} className="text-5xl" words={"Lorem ipsum dolor sit amet consectetur"} />
          </div>
          <div className="text-muted-foreground">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto facilis ex labore placeat incidunt
          </div>
        </div>
        <div className="relative z-[1]">
          {user ? (
            <Link
              className={`min-w-24 bg-primary px-2 py-1 rounded-full flex justify-center items-center gap-2 hover:bg-primary/80 transition-all duration-300`}
              href={`/dashboard`}
            >
              Dashboard
              <ArrowUpRight size={18} />
            </Link>
          ) : (
            <Link
              className={`min-w-24 bg-primary px-2 py-1 rounded-full flex justify-center items-center hover:bg-primary/80 transition-all duration-300`}
              href={`/signin`}
            >
              Signin
            </Link>
          )}
        </div>
      </div>
    </motion.div>
  );
}
