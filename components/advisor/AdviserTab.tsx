"use client";
import React, {useState} from "react";
import SavingGoal from "./SavingGoal";
import {X} from "lucide-react";
import CurrentSaving from "./CurrentSaving";
import AIPlan from "./AIPlan";
import PlanDisplay from "./PlanDisplay";

export default function AdviserTab({open, setOpen}: {open: boolean; setOpen: any}) {
  const [response, setResponse] = useState("");
  return (
    <div
      className={`${
        open ? "right-0" : "-right-full"
      } bg-secondary z-50 transition-all duration-300 fixed top-0 h-svh max-w-[500px] max-sm:max-w-none overflow-y-auto w-full pt-10 p-3`}
    >
      <button
        className="absolute top-0 left-0 p-2"
        onClick={() => {
          setOpen(false);
        }}
      >
        <X />
      </button>
      <div className="space-y-3">
        <SavingGoal />
        <CurrentSaving />
        <AIPlan setResponse={setResponse} />
        <PlanDisplay response={response} />
      </div>
    </div>
  );
}
