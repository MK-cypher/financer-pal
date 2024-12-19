"use client";
import React, {useState} from "react";
import {useUser} from "../UserContext";
import {MoneyFormat} from "@/lib/utils";
import {Pen} from "lucide-react";
import {saveGoal} from "@/app/actions/users";
import {useToast} from "@/hooks/use-toast";

export default function SavingGoal() {
  const {user} = useUser();
  const [editable, setEditable] = useState(false);
  const [newGoal, setNewGoal] = useState(String(user?.goal) || "0");
  const {toast} = useToast();

  const submit = async () => {
    if (user?.goal != newGoal) {
      const {error} = JSON.parse(await saveGoal(Number(newGoal)));
      if (error) {
        toast({title: "Couldn't save New Goal! Please try again later", variant: "destructive"});
        setNewGoal("");
      } else {
        toast({title: "Goal Saved", variant: "success"});
      }
    }
  };
  return (
    <div className="bg-background rounded-lg p-2">
      <div className="">
        <div className="text-xl mb-2 text-muted-foreground">Saving Goal</div>
        <h3
          onClick={() => {
            setEditable(true);
          }}
          className="flex items-center gap-5 cursor-pointer text-xl font-bold w-fit"
        >
          {editable ? (
            <input
              onKeyDown={(e) => {
                const value = e.key;
                const pass = ["e", "-", "+", "=", "."];
                if (pass.includes(value)) {
                  e.preventDefault();
                } else if (e.code === "Enter") {
                  e.currentTarget.blur();
                }
              }}
              autoFocus
              className="min-w-[60px] pr-5"
              onBlur={(e) => {
                setEditable(false);
                submit();
              }}
              onChange={(e) => {
                const value = e.target.value;
                setNewGoal(value);
              }}
              id="amount"
              name="amount"
              type="number"
              // @ts-ignore
              style={{width: `${newGoal.length * 8 + 40}px`}}
              defaultValue={String(newGoal || "0")}
              readOnly={false}
            />
          ) : (
            <div className="font-bold text-2xl">{MoneyFormat.format(Number(newGoal || user?.goal || 0))}</div>
          )}
          {!editable && <Pen size={18} className="text-primary" />}
        </h3>
      </div>
    </div>
  );
}
