"use server";

import { newServerClient } from "@/utils/supabase/server";
import NavbarClient from "@/components/NavbarClient";

export default async function NavbarServer() {
  const supabase = newServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return <NavbarClient user={user} />;
}
