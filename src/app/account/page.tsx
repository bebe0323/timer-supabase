import AccountForm from "./account-form";
import { newServerClient } from "@/utils/supabase/server";

export default async function Account() {
  const supabase = newServerClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return <AccountForm user={user} />;
}
