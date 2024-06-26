import { newServerClient } from "@/utils/supabase/server";
import LoginForm from "./LoginForm";
import { redirect } from "next/navigation";
import { Database } from "../lib/databse.types";

export default async function LoginPage() {
  const supabase = newServerClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (session) {
    // redirect already logged in user
    redirect("/");
  }

  return (
    <div>
      <LoginForm />
    </div>
  );
}
