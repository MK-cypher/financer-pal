"use client";

import {hexToHSL, hslToHex} from "@/lib/utils";
import {useEffect, useState} from "react";

export default function CustomeTheme({variable, objKey, name}: {variable: string; objKey: string; name: string}) {
  const [hex, setHex] = useState("");

  const updateColor = (color: string) => {
    const {h, s, l} = hexToHSL(color);
    setHex(color);
    const r = document.querySelector(":root")!;
    // @ts-ignore
    r.style.setProperty(variable, `${h} ${s}% ${l}%`);
    let customeThemes = localStorage.getItem("custome-themes");
    if (customeThemes) {
      let colors = JSON.parse(customeThemes);
      colors[objKey] = `${h} ${s}% ${l}%`;
      localStorage.setItem("custome-themes", JSON.stringify(colors));
    } else {
      localStorage.setItem("custome-themes", JSON.stringify({[objKey]: `${h} ${s}% ${l}%`}));
    }
  };

  useEffect(() => {
    let customeThemes = localStorage.getItem("custome-themes");
    if (customeThemes) {
      let colors = JSON.parse(customeThemes);
      let color = colors[objKey];
      const r = document.querySelector(":root")!;
      if (color) {
        // @ts-ignore
        r.style.setProperty(variable, color);
        let hsl = color.replace(/%/g, "").split(" ");
        let [h, s, l] = hsl;
        const hexC = hslToHex(Number(h), Number(s), Number(l));
        setHex(hexC);
      } else {
        let c = getComputedStyle(r).getPropertyValue(variable);
        let hsl = c.replace(/%/g, "").split(" ");
        let [h, s, l] = hsl;
        const hexC = hslToHex(Number(h), Number(s), Number(l));
        setHex(hexC);
      }
    }
  }, []);

  return (
    <div className="flex items-center my-2 rounded-lg bg-secondary w-fit p-2 ">
      <label htmlFor={variable} className="min-w-[170px] cursor-pointer">
        {name}
      </label>
      <input
        className="cursor-pointer"
        id={variable}
        type="color"
        value={hex}
        readOnly={false}
        onChange={(e) => {
          updateColor(e.target.value);
        }}
      />
    </div>
  );
}
