"use client";

import { Tables } from "@/app/lib/databse.types";
import { newBrowserClient } from "@/utils/supabase/client";
import { User } from "@supabase/supabase-js";
import { useCallback, useEffect, useState } from "react";

export default function Timer({
  activeSession,
  user,
}: {
  activeSession: Tables<"sessions"> | null;
  user: User;
}) {
  const supabase = newBrowserClient();
  const [hours, setHours] = useState<number>(0);
  const [minutes, setMinutes] = useState<number>(0);
  const [seconds, setSeconds] = useState<number>(0);
  const [totalSeconds, setTotalSeconds] = useState<number>(
    activeSession?.duration || 0
  );
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [sessionId, setSessionId] = useState<string | null>(
    activeSession?.id || null
  );
  const [sessionName, setSessionName] = useState<string>(
    activeSession?.name ? activeSession?.name : ""
  );
  // TODO: value is either 0 or ''
  const [goalHour, setGoalHour] = useState<number>(0);
  const [goalMin, setGoalMin] = useState<number>(0);
  const [goalSec, setGoalSec] = useState<number>(0);

  async function handleContinue() {
    // setIsRunning(!isRunning);
    // if (!isRunning && !sessionId) {
    //   // creating new row in sessions table
    //   const { data, error } = await supabase
    //     .from("sessions")
    //     .insert({
    //       duration: 0,
    //       user_id: user.id,
    //       name: sessionName,
    //     })
    //     .select();

    //   if (data) {
    //     setSessionId(data[0].id);
    //   }
    // }
    if (isRunning) {
      // session paused
      const { data, error } = await supabase
        .from("sessions")
        .update({
          duration: totalSeconds,
          name: sessionName,
        })
        .eq("id", sessionId!);
    }
    setIsRunning(!isRunning);
  }

  async function handleFinish() {
    setIsRunning(false);
    if (totalSeconds > 0 && sessionId) {
      const { error } = await supabase
        .from("sessions")
        .update({
          duration: totalSeconds,
          end_at: new Date().toISOString(),
          name: sessionName,
        })
        .eq("id", sessionId);
    }
    // Reset timer
    setSessionName("Session Name");
    setTotalSeconds(0);
    setGoalHour(0);
    setGoalMin(0);
    setGoalSec(0);
    setSessionId(null);
  }

  async function handleGoal() {
    if (!goalHour) setGoalHour(0);
    if (!goalMin) setGoalMin(0);
    if (!goalSec) setGoalSec(0);
    const goalDuration =
      ((goalHour || 0) * 3600 + (goalMin || 0) * 60 + (goalSec || 0)) * 10;

    if (sessionId) {
      await supabase
        .from("sessions")
        .update({
          goal: goalDuration,
        })
        .eq("id", sessionId);
    }
  }

  let intervalId: NodeJS.Timeout;

  const createSession = useCallback(async () => {
    try {
      const { data, error } = await supabase.from("sessions").insert({
        duration: 0,
        user_id: user.id,
        name: sessionName,
        goal: 0,
      });
    } catch (error) {
      alert(error);
    }
  }, []);

  // initial rendering
  useEffect(() => {
    // create new session if doesn't exist
    if (!activeSession) {
      createSession();
    }
    // setting goal if it is already set
    if (activeSession && activeSession.goal) {
      // 1hr = 60 mins = 3600 sec
      const goalDuration = activeSession.goal;
      console.log("active session: " + goalDuration);
      setGoalHour(goalDuration / 10 / 3600);
      setGoalMin(((goalDuration / 10) % 3600) / 60);
      setGoalSec((goalDuration / 10) % 60);
    }
  }, []);

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
      <input
        className="ml-7 mt-7 mb-2 w-48 text-lg pl-2 text-black rounded-md border-slate-200"
        value={sessionName}
        placeholder="session name"
        onChange={(e) => setSessionName(e.target.value)}
      />
      <label className="ml-9 flex items-center">
        <div className="mr-4 font-semibold text-lg">GOAL</div>
        <input
          value={goalHour}
          onChange={(e) => setGoalHour(parseInt(e.target.value))}
          className="goal-input"
          placeholder="hrs"
        />
        <div className="mx-0.5">:</div>
        <input
          value={goalMin}
          onChange={(e) => setGoalMin(parseInt(e.target.value))}
          className="goal-input"
          placeholder="min"
        />
        <div className="mx-0.5">:</div>
        <input
          value={goalSec}
          onChange={(e) => setGoalSec(parseInt(e.target.value))}
          className="goal-input"
          placeholder="sec"
        />
        <button
          onClick={handleGoal}
          className="auth-button ml-2.5 text-white bg-black hover:bg-zinc-800 hover:text-gray-100 w-22"
        >
          set
        </button>
      </label>
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
