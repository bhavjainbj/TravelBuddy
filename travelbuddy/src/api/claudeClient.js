const GROQ_API = "https://api.groq.com/openai/v1/chat/completions";
const API_KEY = "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";

export async function callClaude({ messages, system, tools = [] }) {
  const body = {
    model: "llama-3.3-70b-versatile",
    max_tokens: 2000,
    messages: [
      { role: "system", content: system },
      ...messages.map((m) => ({
        role: m.role,
        content: Array.isArray(m.content)
          ? m.content.map((c) => {
              if (c.type === "text") return c.text;
              if (c.type === "tool_use") return `[Calling tool: ${c.name} with input: ${JSON.stringify(c.input)}]`;
              if (c.type === "tool_result") return `[Tool result: ${c.content}]`;
              return JSON.stringify(c);
            }).join("\n")
          : m.content,
      })),
    ],
  };

  const response = await fetch(GROQ_API, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${API_KEY}`,
    },
    body: JSON.stringify(body),
  });

  const data = await response.json();

  if (data.error) throw new Error(data.error.message || "Groq API error");

  const text = data.choices?.[0]?.message?.content || "No response";
  return {
    stop_reason: "end_turn",
    content: [{ type: "text", text }],
  };
}

export function extractText(content = []) {
  return content.filter((b) => b.type === "text").map((b) => b.text).join("\n");
}

export function extractToolUses(content = []) {
  return content.filter((b) => b.type === "tool_use");
}