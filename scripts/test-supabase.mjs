import { readFileSync } from "fs";
import { createClient } from "@supabase/supabase-js";

function loadEnv() {
  try {
    const content = readFileSync(".env.local", "utf8");
    for (const line of content.split("\n")) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) continue;
      const eq = trimmed.indexOf("=");
      if (eq === -1) continue;
      const key = trimmed.slice(0, eq).trim();
      const value = trimmed.slice(eq + 1).trim();
      if (!process.env[key]) process.env[key] = value;
    }
  } catch {
    console.error("Could not read .env.local");
    process.exit(1);
  }
}

loadEnv();

const rawUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
const url = rawUrl.replace(/\/rest\/v1\/?$/i, "").replace(/\/+$/, "");
const key = process.env.SUPABASE_SERVICE_ROLE_KEY ?? "";

console.log("URL ends with:", url.slice(-30));
console.log("Key type:", key.startsWith("sb_secret_") ? "sb_secret" : key.startsWith("eyJ") ? "jwt" : "unknown");

const supabase = createClient(url, key, {
  auth: { autoRefreshToken: false, persistSession: false },
});

async function testTable(name, payload) {
  const { data, error } = await supabase.from(name).insert(payload).select().maybeSingle();
  if (error) {
    console.log(`${name}: FAIL`, error.code, error.message);
    return null;
  }
  console.log(`${name}: OK`, data?.id ?? "inserted");
  if (data?.id) {
    await supabase.from(name).delete().eq("id", data.id);
  }
  return data;
}

await testTable("contact_messages", {
  name: "Diag Test",
  email: "diag-test@example.com",
  subject: "Test",
  message: "Test",
  is_read: false,
});

await testTable("project_requests", {
  full_name: "Diag Test",
  business_name: "Test Co",
  email: "diag-test@example.com",
  website_type: "Other",
  budget_range: "Below $500",
  project_description: "Test",
  status: "New",
});

await testTable("newsletter_subscribers", {
  email: "diag-newsletter@example.com",
});
