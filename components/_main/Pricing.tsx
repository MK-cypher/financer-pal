"use client";

import {prices} from "@/lib/consts";
import {useState} from "react";
import {TextGenerateEffect} from "../ui/text-generate-effect";
import PriceCard from "./PriceCard";
import PriceType from "./PriceType";

export default function Pricing() {
  const [type, setType] = useState<"monthly" | "annual">("monthly");
  return (
    <section id="pricing" className="container min-h-svh py-20 flex items-center justify-center">
      <div className="w-full">
        <div className="mb-10 text-center mx-auto max-w-[600px]">
          <TextGenerateEffect duration={2} className="font-bold text-3xl" words={"Best Prices Ever!"} />
        </div>
        <div>
          <PriceType type={type} setType={setType} />
        </div>
        <div className="container pricing-container flex max-sm:flex-col items-stretch justify-center mt-10 gap-3">
          {prices.map((item, i) => (
            <PriceCard key={i} item={item} i={i} type={type} />
          ))}
        </div>
      </div>
    </section>
  );
}
