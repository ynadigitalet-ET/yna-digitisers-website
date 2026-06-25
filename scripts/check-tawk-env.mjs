import { readFileSync } from "fs";
const content = readFileSync(".env.local", "utf8");
for (const line of content.split("\n")) {
  if (line.includes("TAWK")) {
    const [k] = line.split("=");
    console.log(k.trim(), "=", line.includes("=") ? "(set)" : "(missing)");
  }
}
