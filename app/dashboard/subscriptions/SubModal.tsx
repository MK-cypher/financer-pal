import PriceCard from "@/components/_main/PriceCard";
import PriceType from "@/components/_main/PriceType";
import {DialogContent, DialogTitle} from "@/components/ui/dialog";
import {prices} from "@/lib/consts";
import {useState} from "react";

export default function SubModal() {
  const [type, setType] = useState<"monthly" | "annual">("monthly");
  return (
    <DialogContent
      aria-description={undefined}
      className="max-w-[700px] settings-model max-h-[90%] block overflow-auto"
    >
      <DialogTitle></DialogTitle>
      <PriceType type={type} setType={setType} />
      <div className="container pricing-container flex max-sm:flex-col items-stretch justify-center mt-10 gap-3">
        {prices.map((item, i) => (
          <PriceCard key={i} item={item} i={i} type={type} />
        ))}
      </div>
    </DialogContent>
  );
}
