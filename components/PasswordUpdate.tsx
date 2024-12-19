"use client";

import {updatePassword} from "@/app/(auth)/actions";
import {useToast} from "@/hooks/use-toast";
import {useState} from "react";
import {useUser} from "./UserContext";
import {Button, buttonVariants} from "./ui/button";

interface password {
  password: string;
  newPassword: string;
  confirmPassword: string;
}

export default function PasswordUpdate() {
  const {toast} = useToast();
  const {user} = useUser();
  const [loading, setLoading] = useState(false);
  const [Password, setPassword] = useState<password>({
    password: "",
    newPassword: "",
    confirmPassword: "",
  });

  const savePassword = async () => {
    setLoading(true);
    const valuesCheck = Object.values(Password).every((value) => value.length >= 6);
    if (valuesCheck) {
      if (Password.newPassword == Password.confirmPassword) {
        const {error, success} = JSON.parse(await updatePassword(Password));
        if (error) {
          toast({
            title: error,
            variant: "destructive",
          });
        } else {
          toast({
            title: success,
            variant: "success",
          });
        }
      } else {
        toast({
          title: "password no not match",
          variant: "destructive",
        });
      }
    } else {
      toast({
        title: "password must be between 6 and 30 characters",
        variant: "destructive",
      });
    }
    setLoading(false);
  };

  return (
    <>
      {user.provider == "email" && (
        <div className="card rounded-lg mb-4">
          <h3 className="text-lg font-bold mb-5">Password</h3>
          <div className="grid grid-cols-5 items-center my-2">
            <p className="col-span-2 ">Password</p>
            <input
              className="col-span-2 max-md:col-span-3"
              placeholder="******"
              onChange={(e) => {
                setPassword((prev: password) => ({
                  ...prev,
                  password: e.target.value,
                }));
              }}
            />
          </div>
          <div className="grid grid-cols-5 items-center my-2">
            <p className="col-span-2 ">New Password</p>
            <input
              className="col-span-2 max-md:col-span-3"
              placeholder="******"
              onChange={(e) => {
                setPassword((prev: password) => ({
                  ...prev,
                  newPassword: e.target.value,
                }));
              }}
            />
          </div>
          <div className="grid grid-cols-5 items-center my-2">
            <p className="col-span-2 ">Confirm New Password</p>
            <input
              className="col-span-2 max-md:col-span-3"
              placeholder="******"
              onChange={(e) => {
                setPassword((prev: password) => ({
                  ...prev,
                  confirmPassword: e.target.value,
                }));
              }}
            />
          </div>
          <div className="flex gap-3 mt-5">
            <Button
              className={`${buttonVariants({variant: "secondary"})}`}
              onClick={() => {
                setPassword({
                  password: "",
                  newPassword: "",
                  confirmPassword: "",
                });
              }}
            >
              cancel
            </Button>
            <Button className={`${loading ? "loading" : ""}`} onClick={savePassword}>
              Save
              <span></span>
            </Button>
          </div>
        </div>
      )}
    </>
  );
}
