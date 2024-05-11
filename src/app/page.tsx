"use server";

import Timer from "@/components/Timer";
import { newServerClient } from "@/utils/supabase/server";
import { Database } from "./lib/databse.types";

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

  let activeSession: Database["public"]["Tables"]["sessions"]["Row"] | null =
    null;
  if (
    sessions &&
    sessions.length > 0 &&
    !sessions[sessions.length - 1].end_at
  ) {
    activeSession = sessions[sessions.length - 1];
  }

  return (
    <div className="flex justify-center">
      {activeSession && (
        <Timer
          duration={activeSession.duration}
          id={activeSession.id}
          userId={user.id}
        />
      )}
      {!activeSession && <Timer duration={0} id={null} userId={user.id} />}
    </div>
  );
}
