import { Database } from "@/app/lib/databse.types";
import { createBrowserClient } from "@supabase/ssr";

export function newBrowserClient() {
  // Create a supabase client on the browser with project's credentials
  return createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
