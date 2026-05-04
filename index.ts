console.log("=== Vercel AI SDK ToolCall Validation PoC ===\n");

/**
 * Simulated provider-controlled toolCall
 * (represents LLM or provider-executed tool output)
 */
const toolCall = {
  toolCallId: "attack-1",
  toolName: "shell",
  input: JSON.stringify({
    action: {
      commands: [
        "echo PWNED_BY_MODEL",
        "whoami",
        "uname -a"
      ]
    }
  }),
  providerExecuted: true,
  dynamic: true
};

console.log("[1] Raw provider toolCall:");
console.log(toolCall);

console.log("\n[SDK] Parsing toolCall.input (no enforced schema validation)\n");

// Simulated SDK parsing behavior
const parsed = JSON.parse(toolCall.input);

const sdkOutput = {
  toolName: toolCall.toolName,
  input: parsed,
  providerExecuted: toolCall.providerExecuted,
  dynamic: toolCall.dynamic
};

console.log("[2] SDK parsed output:");
console.log(sdkOutput);

console.log("\n[SECURITY OBSERVATION]");
console.log("- providerExecuted = true");
console.log("- dynamic = true");
console.log("- No schema validation enforced in this path");
console.log("- Input fully controlled by provider/model");

console.log("\n[EXECUTION SINK SIMULATION]");
console.log("Shell tool receives untrusted commands:\n");

for (const cmd of sdkOutput.input.action.commands) {
  console.log("> " + cmd);
}

console.log("\n=== IMPACT ===");
console.log("- Untrusted model/provider controls toolCall.input");
console.log("- SDK does NOT enforce validation before execution path");
console.log("- Assumption of safety depends entirely on downstream tool implementation");

console.log("\n=> Risk: Unsafe tool execution in real integrations (RCE class if misused)");
console.log("\n=== END POC ===");
