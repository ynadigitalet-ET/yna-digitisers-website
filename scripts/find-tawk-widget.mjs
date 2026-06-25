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

const pid = process.env.NEXT_PUBLIC_TAWK_PROPERTY_ID ?? "";
const suffix = pid.slice(-7);
const candidates = new Set([
  process.env.NEXT_PUBLIC_TAWK_WIDGET_ID,
  `1${suffix}`,
  `1${pid.slice(0, 7)}`,
  `1${pid.slice(8, 15)}`,
  `1${pid.slice(-8)}`,
  "1default",
  "1f5kgf5s",
  "1es6qjdu3",
  "1i6q2h0i0",
  "1h7k9m2n",
  "1j023abc",
].filter(Boolean));

async function checkWidget(widgetId) {
  const res = await fetch(`https://embed.tawk.to/${pid}/${widgetId}`, {
    headers: { "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36" },
  });
  const text = await res.text();
  return { status: res.status, ok: res.ok, hasTawk: text.includes("tawk") || text.includes("Tawk") };
}

console.log("Property:", pid);
for (const w of candidates) {
  try {
    const { status, ok, hasTawk } = await checkWidget(w);
    console.log(`${w}: ${status}${ok ? " OK" : ""}${hasTawk ? " tawk-js" : ""}`);
    if (ok && hasTawk) {
      console.log("FOUND_WIDGET_ID=" + w);
      break;
    }
  } catch {
    console.log(`${w}: error`);
  }
}
