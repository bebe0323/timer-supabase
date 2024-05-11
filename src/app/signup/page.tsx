import { newServerClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import SignupForm from "./SignupForm";

export default async function SignupPage() {
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
      <SignupForm />
    </div>
  )
}
