"use client";
import {opacityAnimation} from "@/lib/animations";
import {FeatureType} from "@/lib/types";
import {motion} from "framer-motion";
import React from "react";
import {AnimatedCard} from "../ui/AnimatedCard";

export default function SingleFeature({item, delay}: {item: FeatureType; delay: number}) {
  return (
    <motion.div
      variants={opacityAnimation(delay, 1)}
      initial={"initial"}
      whileInView={"animate"}
      className=""
      viewport={{once: true}}
    >
      <AnimatedCard item={item} />
    </motion.div>
  );
}
