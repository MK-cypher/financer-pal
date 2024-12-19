import {Accordion, AccordionContent, AccordionItem, AccordionTrigger} from "@/components/ui/accordion";
import {faqs} from "@/lib/consts";
import {TextGenerateEffect} from "../ui/text-generate-effect";

export default function Faq() {
  return (
    <section className="py-20" id="faq">
      <div className="mb-10 text-center mx-auto max-w-[600px]">
        <TextGenerateEffect duration={2} className="font-bold text-3xl" words={"Have any Questions?"} />
      </div>
      <div className="container flex gap-5 max-md:flex-col">
        <div className="md:w-1/2 w-full">
          <Accordion type="multiple" className="text-start flex flex-col gap-3 max-lg:text-center border-none">
            {faqs.slice(0, faqs.length / 2).map((item, i) => (
              <AccordionItem
                key={i}
                value={`item-${item.id}`}
                className="border-none rounded-xl bg-secondary/40 overflow-hidden h-fit"
              >
                <AccordionTrigger className="bg-secondary rounded-t-xl px-2 duration-300 data-[state=open]:bg-primary">
                  <div className="flex justify-start items-center gap-3">
                    <div className="">{item.id}.</div>
                    <div>{item.title}</div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="rounded-b-xl p-2 text-start">{item.description}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
        <div className="md:w-1/2 w-full">
          <Accordion type="multiple" className="text-start flex flex-col gap-3 max-lg:text-center border-none">
            {faqs.slice(faqs.length / 2, faqs.length).map((item, i) => (
              <AccordionItem
                key={i}
                value={`item-${item.id}`}
                className="border-none rounded-xl bg-secondary/40 overflow-hidden h-fit"
              >
                <AccordionTrigger className="bg-secondary rounded-t-xl px-2 duration-300 data-[state=open]:bg-primary">
                  <div className="flex justify-start items-center gap-3">
                    <div className="">{item.id}.</div>
                    <div>{item.title}</div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="rounded-b-xl p-2 text-start">{item.description}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
