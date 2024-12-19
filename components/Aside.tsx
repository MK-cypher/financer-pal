"use client";

import {signOut} from "@/app/(auth)/actions";
import {asideLinks} from "@/lib/consts";
import {LogOut} from "lucide-react";
import Link from "next/link";
import {usePathname} from "next/navigation";
import {useEffect, useRef, useState} from "react";

export default function Aside() {
  const [navState, setNavState] = useState(false);
  const pathname = usePathname();
  const asideRef = useRef<HTMLElement>(null);
  const [ready, setReady] = useState(false);

  const mobileNavAutoClose = () => {
    const width = window.innerWidth;
    if (width < 500) {
      localStorage.setItem("nav-state", "closed");
      setNavState(false);
    }
  };

  useEffect(() => {
    const savedNavState = localStorage.getItem("nav-state");
    if (savedNavState) {
      setNavState(savedNavState !== "closed");
    } else {
      setNavState(true);
      localStorage.setItem("nav-state", "open");
    }
    setReady(true);
  }, []);

  return (
    <>
      {ready && (
        <aside
          ref={asideRef}
          className={`${navState ? "opened" : "closed"} text-foreground bg-card/80 backdrop-blur-lg`}
        >
          <button
            className={`${
              navState ? "max-[215px]:flex" : "closed"
            } aside-btn space-y-1.5 p-2 transition-all duration-300 hover:bg-secondary rounded-full aspect-square flex flex-col justify-center`}
            onClick={() => {
              if (navState) {
                localStorage.setItem("nav-state", "closed");
              } else {
                localStorage.setItem("nav-state", "open");
              }
              setNavState(!navState);
            }}
          >
            <div
              className={`${
                navState ? "rotate-45 translate-y-[2px]" : ""
              } w-5 h-[1px] bg-foreground transition-all duration-300`}
            ></div>
            <div className={`${navState ? "hidden" : ""} w-5 h-[1px] bg-foreground transition-all duration-300`}></div>
            <div
              className={`${
                navState ? "-rotate-45 -translate-y-[5px]" : ""
              } w-5 h-[1px] bg-foreground transition-all duration-300`}
            ></div>
          </button>
          <div className="flex flex-col justify-between h-full">
            <div>
              <Link href="/" className="logo">
                <div className="p-2">
                  <img src="/logo.png" alt="logo" className="mx-auto" />
                </div>
              </Link>
              <div className="aside-links">
                {asideLinks.map((item, i) => {
                  return (
                    <Link
                      onClick={mobileNavAutoClose}
                      key={i}
                      className={` ${
                        pathname == item.href ? "active" : " text-muted-foreground"
                      } flex items-center gap-2 transition-all duration-300 hover:text-foreground hover:bg-primary/70 rounded-lg`}
                      href={item.href}
                      title={item.name}
                    >
                      <item.Icon className="shrink-0" size={navState ? 15 : 20} />
                      {navState && item.name}
                    </Link>
                  );
                })}
              </div>
            </div>
            <div className="flex justify-center items-center mb-20">
              <button
                className="flex items-center py-2 px-1 gap-2 transition-all duration-300 hover:text-foreground hover:bg-primary/70 rounded-lg"
                onClick={signOut}
              >
                <LogOut />
                {navState && "Logout"}
              </button>
            </div>
          </div>
        </aside>
      )}
    </>
  );
}
