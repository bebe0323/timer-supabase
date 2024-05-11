"use client";

import { signup } from "@/app/signup/actions";
import AuthForm from "@/components/AuthForm";
import { navigate } from "../lib/Navigate";

export default function SignupForm() {

  return (
    <div className="flex justify-center items-center h-full">
      <div className="w-3/12 flex flex-col">
        <AuthForm
          action={signup}
          buttonText={"Sign up"}
          title={"Sign up to Timer"}
        />
        <div className="border my-5"></div>
        <div className="flex flex-col w-full items-center">
          <button
            className="underline text-sm mt-1 text-slate-500"
            onClick={() => navigate("login")}
          >
            Already have an Account? Log in
          </button>
        </div>
      </div>
    </div>
  );
}