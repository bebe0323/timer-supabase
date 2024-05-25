"use client";

import { formatDuration } from "./RecentSessions";

export default function TotalDuration({ duration }: { duration: number }) {
  return (
    <div className="bg-white w-8/12 flex mt-10 px-8 py-4">
      <div className="text-lg font-semibold">Total:</div>
      <div className="text-lg ml-1.5">{formatDuration(duration)}</div>
    </div>
  );
}
