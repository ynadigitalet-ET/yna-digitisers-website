import { readFileSync } from "fs";

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

const base = (process.env.NEXT_PUBLIC_SUPABASE_URL ?? "")
  .replace(/\/rest\/v1\/?$/i, "")
  .replace(/\/+$/, "");
const key = process.env.SUPABASE_SERVICE_ROLE_KEY ?? "";

const res = await fetch(`${base}/rest/v1/`, {
  headers: {
    apikey: key,
    Authorization: `Bearer ${key}`,
    Accept: "application/openapi+json",
  },
});

if (!res.ok) {
  console.log("OpenAPI fetch failed:", res.status, await res.text());
  process.exit(1);
}

const schema = await res.json();
const table = schema.definitions?.project_requests;
if (!table) {
  console.log("project_requests not in schema. Available:", Object.keys(schema.definitions ?? {}).filter(k => !k.startsWith("")).slice(0, 20));
} else {
  console.log("project_requests columns:", Object.keys(table.properties ?? {}).sort().join(", "));
}

const newsletter = schema.definitions?.newsletter_subscribers;
if (newsletter) {
  console.log("newsletter_subscribers columns:", Object.keys(newsletter.properties ?? {}).sort().join(", "));
}
