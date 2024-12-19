"use client";
import {Moon, Sun} from "lucide-react";
import {useTheme} from "next-themes";
import {useEffect, useState} from "react";

export default function ActiveTheme() {
  const {theme, setTheme} = useTheme();
  const [activeTheme, setActiveTheme] = useState(false);

  useEffect(() => {
    setActiveTheme(theme === "dark");
  }, [theme]);
  return (
    <div>
      <div
        className={`${
          activeTheme && "bg-primary"
        } flex items-center p-2 pr-5 rounded-lg text-start gap-2 cursor-pointer w-fit my-2 hover:bg-secondary transition-all duration-300`}
        onClick={() => setTheme("dark")}
      >
        <Moon />
        Dark
      </div>
      <div
        className={`${
          !activeTheme && "bg-primary"
        } flex items-center p-2 pr-5 rounded-lg text-start gap-2 cursor-pointer w-fit my-2 hover:bg-secondary transition-all duration-300`}
        onClick={() => setTheme("light")}
      >
        <Sun />
        Light
      </div>
    </div>
  );
}
