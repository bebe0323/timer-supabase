"use client";
import { type User } from "@supabase/supabase-js";
import { navigate } from "@/app/libs/Navigate";

export default function NavbarClient({ user }: { user: User | null }) {
  return (
    <div className="flex justify-between py-3 px-8">
      <div>
        <button onClick={() => navigate("")}>Timer</button>
      </div>
      {!user && (
        <div className="flex flex-row">
          <button
            onClick={() => navigate("login")}
            className="auth-button py-1 border border-slate-300 hover:bg-zinc-200"
          >
            Log In
          </button>
          <button
            onClick={() => navigate("signup")}
            className="auth-button py-1 ml-2.5 text-white bg-black hover:bg-zinc-800 hover:text-gray-100"
          >
            Sign Up
          </button>
        </div>
      )}
      {user && (
        <div>
          <button
            onClick={() => navigate("account")}
            className="auth-button py-1 border border-slate-300 hover:bg-zinc-200"
          >
            Account
          </button>
        </div>
      )}
    </div>
  );
}
