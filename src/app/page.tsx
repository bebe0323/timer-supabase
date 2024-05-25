"use server";

import Timer from "@/components/Timer";
import { newServerClient } from "@/utils/supabase/server";
import { Tables } from "./lib/databse.types";
import RecentSessions from "@/components/RecentSessions";
import TotalDuration from "@/components/TotalDuration";

export default async function Home() {
  const supabase = newServerClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return <div>Unsigned user / TODO: Website Description</div>;
  }

  // start of the day
  let startOfDay: Date = new Date();
  startOfDay.setHours(0, 0, 0, 0);
  const start = startOfDay.toISOString();

  // end of the day
  let endOfDay: Date = new Date();
  endOfDay.setDate(endOfDay.getDate() + 1);
  endOfDay.setHours(0, 0, 0, 0);
  const end = endOfDay.toISOString();

  const { data: sessions } = await supabase
    .from("sessions")
    .select()
    .eq("user_id", user.id)
    .gte("created_at", start)
    .lte("created_at", end);

  let activeSession: Tables<"sessions"> | null = null;
  if (
    sessions &&
    sessions.length > 0 &&
    !sessions[sessions.length - 1].end_at
  ) {
    activeSession = sessions[sessions.length - 1];
  }

  let totalDuration = 0;
  for (let i = 0; sessions && i < sessions?.length; i++) {
    totalDuration += sessions[i].duration;
  }

  return (
    <div className="w-full flex flex-col items-center">
      <Timer activeSession={activeSession} user={user} />
      <TotalDuration duration={totalDuration} />
      <RecentSessions sessions={sessions} />
    </div>
  );
}
