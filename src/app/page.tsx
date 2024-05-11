"use server";

import Timer from "@/components/Timer";
import { newServerClient } from "@/utils/supabase/server";

export default async function Home() {
  const supabase = newServerClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return <div>Unsigned user / TODO: Website Description</div>;
  }

  const today: Date = new Date();

  // TODO: created_at should be today
  const { data: sessions } = await supabase
    .from("sessions")
    .select()
    .eq("user_id", user.id);

  console.log("previous sessions" + sessions + sessions?.length);

  // TODO: pass the unfinished session if there exists
  return (
    <div className="flex justify-center">
      <Timer duration={0} id={null} userId={user.id} />
    </div>
  );
}
