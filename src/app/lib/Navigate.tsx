"use server";

import { redirect } from "next/navigation";

export async function navigate(path: string) {
  if (!path) redirect("/");
  else redirect(`/${path}`);
}
