"use client";
import { login } from "@/app/login/actions";
import { newBrowserClient } from "@/utils/supabase/client";
import { FcGoogle } from "react-icons/fc";
import { navigate } from "../lib/Navigate";
import AuthForm from "@/components/AuthForm";

export default function LoginForm() {
  return (
    <div className="flex justify-center items-center h-full">
      <div className="w-3/12 flex flex-col">
        {/* <AuthForm action={login} buttonText={"Login"} title={"Log in to Timer"}/> */}
        <form className="flex flex-col">
          <div className="flex w-full justify-center">
            <p className="text-3xl mb-6 font-bold">Log in to Timer</p>
          </div>
          <label htmlFor="email" className="mb-2 text-slate-500">
            Email address
          </label>
          <input
            className="auth-input"
            id="email"
            name="email"
            type="email"
            placeholder="Your email address"
            required
          />
          <label htmlFor="password" className="mb-2 text-slate-500">
            Password
          </label>
          <input
            className="auth-input"
            id="password"
            name="password"
            type="password"
            placeholder="Your password"
            required
          />
          <button
            className="auth-button border rounded-lg bg-green-400 hover:bg-green-500 py-3"
            formAction={login}
          >
            login
          </button>
        </form>
        <div className="border my-5"></div>
        <button
          className="border rounded-lg border-slate-300 hover:bg-gray-200 flex justify-center py-2 space-x-2"
          onClick={async () => {
            const supabase = newBrowserClient();
            const { data, error } = await supabase.auth.signInWithOAuth({
              provider: "google",
              options: {
                redirectTo: `http://localhost:3000/auth/callback`,
              },
            });
            console.log(data);
            console.log(error);
          }}
        >
          <FcGoogle size={30} />
          <p className="pt-1">Sign in with Google</p>
        </button>
        <div className="flex flex-col w-full items-center">
          <button className="underline text-sm mt-4 text-slate-500">
            Forgot your password?
          </button>
          <button
            className="underline text-sm mt-1 text-slate-500"
            onClick={() => navigate("signup")}
          >
            Don't have an Account? Sign up
          </button>
        </div>
      </div>
    </div>
  );
}
