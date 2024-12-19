"use client";

import {keyToVar} from "@/lib/utils";
import {ThemeProvider as NextThemesProvider} from "next-themes";
import {useEffect, useState} from "react";

export function ThemeProvider({children, ...props}: React.ComponentProps<typeof NextThemesProvider>) {
  useEffect(() => {
    const storage = localStorage.getItem("custome-themes");
    if (storage) {
      const themeJson = JSON.parse(storage);
      const r = document.querySelector(":root")!;
      for (let key of Object.keys(themeJson)) {
        const variable = keyToVar(key);
        const color = themeJson[key];
        // @ts-ignore
        r.style.setProperty(`--${variable}`, color);
      }
    }
  }, []);
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
