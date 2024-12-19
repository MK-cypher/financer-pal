"use client";
import {features} from "@/lib/consts";
import {motion} from "framer-motion";
import {useRef, useState} from "react";
import {TextGenerateEffect} from "../ui/text-generate-effect";
import SingleFeature from "./SingleFeature";

export default function Features() {
  const trackerRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({x: -1000, y: -1000});

  const handleMouse = (e: any) => {
    if (trackerRef.current && containerRef.current) {
      const container = containerRef.current;
      const tracker = trackerRef.current;
      const x = e.pageX - container.offsetLeft - tracker.clientWidth / 2;
      const y = e.pageY - container.offsetTop - tracker.clientHeight / 2;
      setPosition({x, y});
    }
  };

  return (
    <div className="overflow-hidden">
      <section id="features" className="container py-20 min-h-svh flex items-center justify-center ">
        <div>
          <div className="mb-10 text-center mx-auto max-w-[600px]">
            <TextGenerateEffect
              duration={2}
              className="font-bold text-3xl"
              words={"Powerful Features for Smart Financial Management"}
            />
          </div>
          <div
            ref={containerRef}
            className="grid md:grid-cols-2 max-md:grid-cols-1 gap-5 relative mb-40"
            onPointerMove={handleMouse}
          >
            <div
              ref={trackerRef}
              className="w-96 h-96 rounded-full bg-primary blur-3xl absolute z-[-1] opacity-10"
              style={{top: position.y, left: position.x}}
            />
            {features.map((item, i) => (
              <SingleFeature item={item} key={i} delay={i * 0.4 + 0.4} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
