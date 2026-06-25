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

const { data, error } = await supabase.from("project_requests").select("*").limit(1);
if (error) {
  console.log("Select error:", error.code, error.message);
} else if (data?.[0]) {
  console.log("Columns:", Object.keys(data[0]).sort().join(", "));
} else {
  console.log("Table empty — trying head request");
  const { error: headError } = await supabase.from("project_requests").select("id").limit(0);
  console.log("Head:", headError ? `${headError.code} ${headError.message}` : "table accessible");
}
