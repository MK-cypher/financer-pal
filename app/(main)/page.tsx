import Faq from "@/components/_main/Faq";
import Features from "@/components/_main/Features";
import Footer from "@/components/_main/Footer";
import Hero from "@/components/_main/Hero";
import HowItWorks from "@/components/_main/HowItWorks";
import Pricing from "@/components/_main/Pricing";

export default async function page() {
  return (
    <div className="w-full">
      <Hero />
      <Features />
      <HowItWorks />
      <Pricing />
      <Faq />
      <Footer />
    </div>
  );
}
