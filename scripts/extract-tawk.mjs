import { readFileSync } from "fs";

const p =
  "C:/Users/Natii/.cursor/projects/c-Users-Natii-Desktop-yna-digitisers-website/agent-transcripts/9211af4e-62f0-43e6-968f-05c3c5a15ac0/9211af4e-62f0-43e6-968f-05c3c5a15ac0.jsonl";
const t = readFileSync(p, "utf8");
const embed = t.match(/embed\.tawk\.to\/[a-zA-Z0-9/._-]+/g);
console.log("embed matches:", embed?.slice(0, 10) ?? "none");
const tawkEnv = t.match(/NEXT_PUBLIC_TAWK[^\s\\"]+/g);
console.log("env matches:", tawkEnv?.slice(0, 10) ?? "none");
