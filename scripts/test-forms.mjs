import { readFileSync } from "fs";
import { createClient } from "@supabase/supabase-js";

function loadEnv() {
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
}

loadEnv();

const url = (process.env.NEXT_PUBLIC_SUPABASE_URL ?? "")
  .replace(/\/rest\/v1\/?$/i, "")
  .replace(/\/+$/, "");
const key = process.env.SUPABASE_SERVICE_ROLE_KEY ?? "";

const supabase = createClient(url, key, {
  auth: { autoRefreshToken: false, persistSession: false },
});

const { data, error } = await supabase
  .from("project_requests")
  .insert({
    name: "Diag Test",
    business_name: "Test Co",
    email: "diag-project@example.com",
    website_type: "Other",
    budget: "Below $500",
    description: "Test project request",
    status: "New",
  })
  .select()
  .maybeSingle();

if (error) {
  console.log("project_requests: FAIL", error.code, error.message);
  process.exit(1);
}

console.log("project_requests: OK", data.id);
await supabase.from("project_requests").delete().eq("id", data.id);

const { data: nData, error: nError } = await supabase
  .from("newsletter_subscribers")
  .insert({ email: "diag-newsletter2@example.com" })
  .select()
  .maybeSingle();

if (nError) {
  console.log("newsletter_subscribers: FAIL", nError.code, nError.message);
  process.exit(1);
}

console.log("newsletter_subscribers: OK", nData.id);
await supabase.from("newsletter_subscribers").delete().eq("id", nData.id);
