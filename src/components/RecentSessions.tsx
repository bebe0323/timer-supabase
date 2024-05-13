"use client";

import { Tables } from "@/app/lib/databse.types";

export default function RecentSessions({
  sessions,
}: {
  sessions: Tables<"sessions">[] | null;
}) {
  if (!sessions) {
    return <div>No sessions</div>;
  }
  return (
    <div className="bg-white w-8/12 flex flex-col mt-20">
      <div className="ml-7 mt-7 text-2xl font-semibold">Recent Sessions</div>
      <div className="flex flex-row">
        <div className="">Name</div>
        <div>Duration</div>
        <div>Start at</div>
        <div>End at</div>
      </div>
      {sessions.map((session) => (
        <div>{session.duration}</div>
      ))}
    </div>
  );
}
