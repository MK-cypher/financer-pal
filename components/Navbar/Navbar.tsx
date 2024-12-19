"use client";
import Link from "next/link";
import {useState} from "react";
import NavBtn from "./NavBtn";
import NavLinks from "./navLinks";
import Logo from "@/app/(auth)/components/Logo";

export default function Navbar({user}: {user: any}) {
  const [navState, setNavState] = useState(false);

  return (
    <div className="w-svw mx-auto top-3 left-0 fixed z-10 sm:backdrop-blur">
      <div className="container mx-auto rounded-full bg-secondary/30 px-5">
        <div className="flex items-center justify-between">
          <div className="backdrop-blur w-full flex items-center justify-between py-4">
            <Logo />
            <button
              className="sm:hidden space-y-1.5 p-2 transition-all duration-300 hover:bg-background-alt rounded-full aspect-square flex flex-col justify-cente outline-none border-none focu"
              onClick={() => {
                setNavState(!navState);
              }}
            >
              <NavBtn navState={navState} />
            </button>
          </div>
          <div
            className={`${
              navState ? "max-sm:translate-x-0" : "max-sm:translate-x-full"
            } transition-all duration-300 grow max-sm:fixed max-sm:w-full max-sm:h-[calc(100svh-90px)] max-sm:p-5 max-sm:bg-gray-600/30 left-0 top-[90px] sm:justify-end flex max-sm:flex-col backdrop-blur gap-5`}
          >
            <NavLinks setNavState={setNavState} />
            {user ? (
              <Link
                className={`min-w-24 bg-primary px-2 py-1 rounded-full flex justify-center items-center hover:bg-primary/80 transition-all duration-300`}
                onClick={() => {
                  setNavState(false);
                }}
                href={`/dashboard`}
              >
                Dashboard
              </Link>
            ) : (
              <Link
                className={`min-w-24 bg-primary px-2 py-1 rounded-full flex justify-center items-center hover:bg-primary/80 transition-all duration-300`}
                onClick={() => {
                  setNavState(false);
                }}
                href={`/signin`}
              >
                Signin
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
