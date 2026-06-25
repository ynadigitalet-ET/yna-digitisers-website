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
const candidates = new Set();

for (let i = 0; i <= pid.length - 7; i++) {
  candidates.add(`1${pid.slice(i, i + 7)}`);
}

for (const w of ["1default", "1f5kgf5s", "1es6qjdu3", "1i6q2h0i0", "1h7k9m2n", "1j023abc", "1g3bc530", "1a3bc530", "1b755bc1", "1d4b9a55"]) {
  candidates.add(w);
}

async function check(widgetId) {
  const res = await fetch(`https://embed.tawk.to/${pid}/${widgetId}`, {
    headers: {
      "User-Agent": "Mozilla/5.0",
      Accept: "*/*",
    },
    signal: AbortSignal.timeout(5000),
  });
  const text = await res.text();
  const valid = res.ok && text.length > 500 && /tawk|Tawk|widget/i.test(text);
  return { widgetId, status: res.status, len: text.length, valid };
}

console.log(`Checking ${candidates.size} candidates for ${pid}...`);
for (const w of candidates) {
  try {
    const r = await check(w);
    if (r.valid) {
      console.log("FOUND", r);
      break;
    }
  } catch {
    // skip
  }
}
