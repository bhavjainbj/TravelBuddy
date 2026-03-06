// ─────────────────────────────────────────────────────────────────────────────
// Agent Loop
// Orchestrates the multi-turn conversation between Claude and MCP tools.
// Claude autonomously decides which tools to call and in what order.
// ─────────────────────────────────────────────────────────────────────────────

import { callClaude, extractText, extractToolUses } from "./claudeClient.js";
import { MCP_TOOLS } from "../mcp/toolDefinitions.js";
import { executeTool } from "../mcp/toolHandlers.js";

const SYSTEM_PROMPT = `You are a travel planner. For every request write a travel guide with exactly these 5 sections:
    After calling all tools, write a beautiful, detailed travel guide formatted with these exact section headers:
    🚀 HOW TO REACH [DESTINATION]
    🏨 BEST ACCOMMODATION OPTIONS
    🍽️ LOCAL CUISINES
    🏛️ MUST-VISIT ATTRACTIONS
    📅 YOUR COMPLETE [N]-DAY ITINERARY 

    YOUR COMPLETE [N]-DAY ITINERARY it should be in proper detials having all the detials of the places, food to eat, activity to do day-wise
    Use bullet points with • symbol. Include costs in INR. Be concise but specific. No intro, no outro, no filler text.`;

const MAX_ITERATIONS = 10;

/**
 * Runs the agent loop until Claude produces a final text response.
 *
 * @param {string}   userMessage  - The user's trip planning request
 * @param {Function} onToolCall   - Callback fired when a tool is called: ({ name, input })
 * @returns {Promise<string>}     - The final travel guide text
 */
export async function runAgentLoop(userMessage, onToolCall = () => {}) {
  let messages = [{ role: "user", content: userMessage }];
  let iteration = 0;

  while (iteration < MAX_ITERATIONS) {
    iteration++;

    const response = await callClaude({
      messages,
      system: SYSTEM_PROMPT,
      tools: MCP_TOOLS,
    });

    // ── Final answer ──────────────────────────────────────────────────────
    if (response.stop_reason === "end_turn") {
      return extractText(response.content);
    }

    // ── Tool calls requested ──────────────────────────────────────────────
    if (response.stop_reason === "tool_use") {
      const toolUses = extractToolUses(response.content);

      // Append Claude's assistant turn (which includes its tool_use blocks)
      messages.push({ role: "assistant", content: response.content });

      // Execute each tool and collect results
      const toolResults = [];
      for (const toolUse of toolUses) {
        onToolCall({ name: toolUse.name, input: toolUse.input });

        const result = await executeTool(toolUse.name, toolUse.input);

        toolResults.push({
          type: "tool_result",
          tool_use_id: toolUse.id,
          content: JSON.stringify(result),
        });
      }

      // Feed results back to Claude
      messages.push({ role: "user", content: toolResults });
      continue;
    }

    // ── Unexpected stop reason — try to return any text found ─────────────
    const fallbackText = extractText(response.content);
    if (fallbackText) return fallbackText;
    break;
  }

  throw new Error(
    "Agent loop exceeded maximum iterations without a final response.",
  );
}
