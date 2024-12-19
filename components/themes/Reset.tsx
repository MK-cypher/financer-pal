"use client";
import {RotateCcw} from "lucide-react";
import {useTheme} from "next-themes";
import React from "react";

export default function Reset() {
  const {theme} = useTheme();
  const reset = () => {
    localStorage.setItem("custome-themes", "{}");
    const r = document.querySelector(":root")!;
    // @ts-ignore
    r.style = `color-scheme: ${theme}`;
  };

  return (
    <button
      onClick={reset}
      className="flex items-center gap-2 bg-secondary rounded-lg px-2 py-1 text-sm hover:bg-secondary/80 transition-d"
    >
      Reset <RotateCcw size={18} />
    </button>
  );
}
