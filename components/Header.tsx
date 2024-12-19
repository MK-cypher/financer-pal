"use client";

import {usePathname} from "next/navigation";
import {useState} from "react";
import AdviserTab from "./advisor/AdviserTab";

export default function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const pathArr = pathname.split("/");
  const title = pathArr[pathArr.length - 1];

  return (
    <div className=" pl-10 py-5 bg-card flex justify-between items-center pr-5">
      <div className="text-xl font-semibold capitalize">{title}</div>
      <button
        onClick={() => {
          setOpen(true);
        }}
        className="bg-gradient-to-r from-pink-500 to-purple-600 rounded-lg px-2 py-1"
      >
        AI Advisor
      </button>
      <AdviserTab open={open} setOpen={setOpen} />
    </div>
  );
}
