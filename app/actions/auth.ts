"use server";

import { createClient } from "@/lib/supabase/server";
import { OWNER_EMAIL } from "@/lib/constants";
import { redirect } from "next/navigation";

export async function loginAdmin(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    return { success: false, message: "Invalid email or password." };
  }

  if (email !== OWNER_EMAIL) {
    await supabase.auth.signOut();
    return { success: false, message: "Unauthorized access." };
  }

  redirect("/admin");
}

export async function logoutAdmin() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/admin/login");
}
