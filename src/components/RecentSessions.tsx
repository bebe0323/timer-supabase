"use client";

import { Tables } from "@/app/lib/databse.types";

export default function RecentSessions({
  sessions,
}: {
  sessions: Tables<"sessions">[] | null;
}) {
  function formatDuration(stringDuration: number): string {
    // duration is (total seconds * 10)
    const totalSeconds = Math.floor(stringDuration / 10);
    // 1hr = 60 min = 3600 sec
    // 1min = 60 sec
    const hr = Math.floor(totalSeconds / 3600);
    const minute = Math.floor((totalSeconds % 3600) / 60);
    const second = Math.floor(totalSeconds % 60);
    let ret: string = "";
    if (hr > 0) ret += hr.toString() + "h ";
    if (hr > 0 || minute > 0) ret += minute.toString() + "m ";
    // ignoring seconds if the duration is longer than an hour
    if (hr == 0) ret += second.toString() + "s";
    return ret;
  }

  function formatDate(stringDate: string): string {
    const date = new Date(stringDate);
    return (
      date.getHours().toString() +
      ":" +
      date.getMinutes().toString() +
      ":" +
      date.getSeconds().toString()
    );
  }

  if (!sessions) {
    return <div>No sessions</div>;
  }
  return (
    <div className="bg-white w-8/12 flex flex-col mt-20">
      <div className="ml-7 mt-7 text-2xl font-semibold">Today's Sessions</div>
      <div className="flex flex-row ml-12">
        <div className="w-48">Name</div>
        <div className="w-48">Duration</div>
        <div className="w-48">Start at</div>
        <div className="w-48">End at</div>
      </div>
      {sessions.map(
        (session) =>
          session &&
          session.end_at && (
            <div className="flex flex-row ml-12" key={session.created_at}>
              <div className="w-48">{session.name}</div>
              <div className="w-48">{formatDuration(session.duration)}</div>
              <div className="w-48">{formatDate(session.created_at)}</div>
              <div className="w-48">{formatDate(session.end_at)}</div>
            </div>
          )
      )}
    </div>
  );
}
