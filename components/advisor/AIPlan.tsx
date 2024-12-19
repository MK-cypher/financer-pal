"use client";

import {getAIPlan} from "@/app/actions/AIAdvisor";
import {useToast} from "@/hooks/use-toast";
import {useState} from "react";

export default function AIPlan({setResponse}: {setResponse: any}) {
  const [loading, setLoading] = useState(false);
  const {toast} = useToast();
  const submit = async () => {
    setLoading(true);
    try {
      const {error, title, description, response, variant} = JSON.parse(await getAIPlan());
      if (error) {
        toast({title, description, variant});
      } else {
        setResponse(response);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };
  return (
    <button
      onClick={submit}
      className={`bg-gradient-to-r from-pink-500 to-purple-600 rounded-lg px-2 py-1 ${loading && "loading"}`}
    >
      Get Saving Plan
      <span></span>
    </button>
  );
}
