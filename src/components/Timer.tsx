"use client";

import { newBrowserClient } from "@/utils/supabase/client";
import { useEffect, useState } from "react";

export default function Timer({
  duration,
  id,
  userId,
}: {
  duration: number;
  id: string | null;
  userId: string;
}) {
  const supabase = newBrowserClient();
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [totalSeconds, setTotalSeconds] = useState(duration);
  const [isRunning, setIsRunning] = useState(false);
  const [sessionId, setSessionId] = useState(id);
  //

  async function handleContinue() {
    setIsRunning(!isRunning);
    console.log("in handle continue");
    if (!isRunning && !sessionId) {
      // isRunning false -> though it set to true above
      console.log("timer started with no id");
      const { data, error } = await supabase
        .from("sessions")
        .insert({
          duration: 0,
          user_id: userId,
        })
        .select();

      if (data) {
        setSessionId(data[0].id);
        console.log("new session id" + data[0].id);
      }
    }
  }

  async function handleFinish() {
    setIsRunning(false);
    if (totalSeconds > 0) {
      console.log("in handle finish");
      if (sessionId) {
        // id is not null
        const { error } = await supabase
          .from("sessions")
          .update({
            duration: totalSeconds,
            end_at: new Date().toISOString(),
          })
          .eq("id", sessionId);
      } else {
        alert("total seconds > 0 && id is null");
      }
    }
    // Reset timer
    setTotalSeconds(0);
  }

  let intervalId: NodeJS.Timeout;

  useEffect(() => {
    if (isRunning) {
      intervalId = setInterval(() => {
        setTotalSeconds((prev) => prev + 1);
      }, 100);
    } else {
      clearInterval(intervalId);
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [isRunning]);

  useEffect(() => {
    // 1hr = 60min = 3600 sec
    setHours(Math.floor(totalSeconds / 3600 / 10));
    setMinutes(Math.floor((totalSeconds % 3600) / 60 / 10));
    setSeconds(Math.floor(totalSeconds / 10) % 60);
  }, [totalSeconds]);

  return (
    <div className="bg-white w-8/12 flex flex-col mt-20">
      <div className="ml-7 mt-7 text-2xl font-semibold">Current Session</div>
      <div className="flex flex-col items-center">
        <div>
          <p className="text-custom-yellow font-extralight font-mono text-7xl">
            <span>{hours}</span>:<span>{minutes}</span>:<span>{seconds}</span>
          </p>
        </div>
        <div className="space-x-40 my-6">
          <button
            className="auth-button py-1 border border-slate-300 hover:bg-zinc-200 w-24"
            onClick={handleContinue}
          >
            {isRunning && <p>Pause</p>}
            {!isRunning && <p>Continue</p>}
          </button>
          <button
            className="auth-button py-1 ml-2.5 text-white bg-black hover:bg-zinc-800 hover:text-gray-100 w-24"
            onClick={handleFinish}
          >
            Finish
          </button>
        </div>
      </div>
    </div>
  );
}