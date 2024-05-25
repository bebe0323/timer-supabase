"use client";

import { Tables } from "@/app/lib/databse.types";

export default function RecentSessions({
  sessions,
}: {
  sessions: Tables<"sessions">[] | null;
}) {
  function formatDate(stringDate: string): string {
    const date = new Date(stringDate);
    let hours: string = date.getHours().toString();
    let minutes: string = date.getMinutes().toString();
    if (hours.length < 2) hours = "0" + hours;
    if (minutes.length < 2) minutes = "0" + minutes;
    return hours + ":" + minutes;
  }

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

  if (!sessions) {
    return <div>No sessions</div>;
  }
  return (
    <div className="bg-white w-8/12 flex flex-col mt-20 px-8 py-4">
      <div className="mt-1 mb-2 text-2xl font-semibold">Today's Sessions</div>
      <div className="flex">
        <div className="w-10">#</div>
        <div className="grid grid-cols-5 w-full">
          <div className="col-span-2">Name</div>
          <div className="col-span-1">Duration</div>
          <div className="col-span-1">Start at</div>
          <div className="col-span-1">End at</div>
        </div>
      </div>
      {sessions.map(
        (session, index) =>
          session &&
          session.end_at && (
            <div className="flex mb-2" key={session.created_at}>
              <div className="w-10">{index + 1}</div>
              <div className="grid grid-cols-5 w-full">
                <div className="truncate pr-3 col-span-2">{session.name}</div>
                <div className="col-span-1">
                  {formatDuration(session.duration)}
                </div>
                <div className="col-span-1">
                  {formatDate(session.created_at)}
                </div>
                <div className="col-span-1">{formatDate(session.end_at)}</div>
              </div>
            </div>
          )
      )}
    </div>
  );
}
