"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { newServerClient } from "@/utils/supabase/server";

export async function signup(formData: FormData) {
  const supabase = newServerClient();

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const { error } = await supabase.auth.signUp(data);

  if (error) {
    console.log(error.message);
    redirect(`/error/${error.message}`);
  }

  revalidatePath("/", "layout");
  redirect("/account");
}
