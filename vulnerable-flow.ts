import fs from "fs";

// Simulates SDK safeParseJSON behavior
async function safeParseJSON(text: string) {
  try {
    return { success: true, value: JSON.parse(text) };
  } catch {
    return { success: false };
  }
}

// Simulates parseProviderExecutedDynamicToolCall
export async function parseToolCall(toolCall: any) {
  const parseResult =
    toolCall.input.trim() === ""
      ? { success: true, value: {} }
      : await safeParseJSON(toolCall.input);

  if (!parseResult.success) {
    throw new Error("Invalid JSON");
  }

  return {
    toolName: toolCall.toolName,
    input: parseResult.value, // 🚨 NO SCHEMA VALIDATION
    providerExecuted: true,
    dynamic: true
  };
}

// Simulated execution sink
export async function executeToolCall(parsed: any) {
  if (parsed.toolName === "shell") {
    const commands = parsed.input.action.commands;

    console.log("\n[!] Executing commands from unvalidated input:\n");

    for (const cmd of commands) {
      console.log(`> ${cmd}`);
    }

    console.log("\n[✔] Commands accepted without validation");
  }
}

// Full flow
export async function runExploit(inputPath: string) {
  const raw = fs.readFileSync(inputPath, "utf-8");
  const toolCall = JSON.parse(raw);

  console.log("[*] Loaded malicious toolCall\n");

  const parsed = await parseToolCall(toolCall);

  console.log("[*] Parsed toolCall (UNVALIDATED):");
  console.dir(parsed, { depth: null });

  await executeToolCall(parsed);
}
