import { runExploit } from "./vulnerable-flow";

(async () => {
  console.log("=== Vercel AI SDK PoC ===\n");

  await runExploit("./exploit-input.json");

  console.log("\n=== PoC Complete ===");
})();
