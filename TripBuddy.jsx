import { useState, useEffect, useRef } from "react";

const ANTHROPIC_API = "https://api.anthropic.com/v1/messages";

// MCP TOOLS

const MCP_TOOLS = [
  {
    name: "plan_itinerary",
    description:
      "Generate a detailed day-by-day itinerary for the destination including morning, afternoon and evening activities.",
    input_schema: {
      type: "object",
      properties: {
        destination: {
          type: "string",
          description: "The destination city / country travelling to",
        },
        days: { type: "number", description: "The number of days travelling" },
      },
      required: ["destination", "days"],
    },
  },
  {
    name: "transport_option",
    description:
      "Generate a list of best transport options for the destination including flights, trains, buses, etc. also include the cost and duration of the journey.",
    input_schema: {
      type: "object",
      properties: {
        origin: {
          type: "string",
          description: "The city / country travelling from",
        },
        destination: {
          type: "string",
          description: "The destination city / country travelling to",
        },
        travel_date: { type: "string", description: "The date of the travel" },
        return_date: { type: "string", description: "The date of the return" },
      },
      required: ["origin", "destination", "travel_date", "return_date"],
    },
  },
  {
    name: "accommodation_option",
    description:
      "Generate a list of best accommodation options for the destination including hotels, hostels, etc. also include the cost, rating, and duration of the stay.",
    input_schema: {
      type: "object",
      properties: {
        destination: {
          type: "string",
          description: "The destination city / country travelling to",
        },
        nights: { type: "number", description: "The number of nights staying" },
      },
      required: ["destination", "nights"],
    },
  },
  {
    name: "top_attractions",
    description:
      "Get the top sightseeing spots, hidden gems, and must-visit places at the destination with entry fees and timings.",
    input_schema: {
      type: "object",
      properties: {
        destination: {
          type: "string",
          description: "The destination city / country travelling to",
        },
      },
      required: ["destination"],
    },
  },
  {
    name: "local_cuisine",
    description:
      "Generate a list of local cuisines for the destination including traditional dishes, street food, etc. also include the cost and ratings.",
    input_schema: {
      type: "object",
      properties: {
        destination: {
          type: "string",
          description: "The destination city / country travelling to",
        },
        food_type: {
          type: "string",
          description: "The type of food to search for",
          enum: ["vegetarian", "vegan", "non-vegetarian"],
          default: "vegetarian",
        },
      },
      required: ["destination", "food_type"],
    },
  },
];

// MCP Server TOOLS Execution Funtions

async function executeMCPTool(toolName, toolInput) {
  const mock = {
    plan_itinerary: () => ({
      status: "success",
      itinerary: `${toolInput.days} - Days Itinerary for ${toolInput.destination}`,
    }),

    transport_option: () => ({
      status: "success",
      transport: `Transport option from ${toolInput.origin || "your location"} to ${toolInput.destination} retrieved: flights, trains, road options with costs.`,
    }),
    accommodation_option: () => ({
      status: "success",
      accommodation: `Top Hotels in ${toolInput.destination} for ${toolInput.nights} nights accommodation options.`,
    }),
    top_attractions: () => ({
      status: "success",
      attractions: `Top attractions and hidden gems in ${toolInput.destination} retrieved with entry fees and best visiting times.`,
    }),
    local_cuisine: () => ({
      status: "success",
      cuisine: `Best ${toolInput.food_type} cuisine options in ${toolInput.destination} retrieved with costs and ratings.`,
    }),
  };
  return mock[toolName]
    ? mock[toolName]()
    : { status: "error", error: "Unknown Tool: " + toolName };
}

// AGENT LOGIC with MCP TOOLS

async function tripBuddyAgent(userMessage, onUpdate) {
  const systemPrompt = `You are an expert AI travel planner with access to 5 MCP tools.
    1. transport_option — how to reach the destination
    2. accommodation_option — best places to stay
    3. local_cuisine — local cuisines
    4. top_attractions — must-visit attractions
    5. plan_itinerary — complete day-by-day schedule

    After calling all tools, write a beautiful, detailed travel guide formatted with these exact section headers:
    🚀 HOW TO REACH [DESTINATION]
    🏨 BEST ACCOMMODATION OPTIONS
    🍽️ LOCAL CUISINES
    🏛️ MUST-VISIT ATTRACTIONS
    📅 YOUR COMPLETE [N]-DAY ITINERARY

    Include all the information from the tools in a beautiful, detailed travel guide.
    Under each section, provide rich, practical details with bullet points using • symbol.
    Include estimated costs in INR, pro tips, and specific recommendations.
    Be enthusiastic, specific, and genuinely helpful like a knowledgeable local friend.
    Extract origin, budget, days, travel style, and interests from user input intelligently.`;

  let messages = [{ role: "user", content: userMessage }];

  let iterations = 0;
  let maxIterations = 10;

  while (iterations < maxIterations) {
    iterations++;
    const data = await fetch(ANTHROPIC_API, {
      method: "POST",      
      headers: {
        "Content-Type": "application/json",
        //Authorization: `Bearer ${process.env.ANTHROPIC_API_KEY}`,
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-20250514",
        maxTokens: 8000,
        system: systemPrompt,
        tools: MCP_TOOLS,
        messages
      }),
    }).then(res => res.json());

    if (data.error) throw new Error(data.error.message || "API error");

    if (data.stop_reason === "end_turn") {
        return data.content.filter(b => b.type === "text").map(b => b.text).join("\n");
    }

    if (data.stop_reason === "tool_use") {
        const toolUses = data.content.filter(b => b.type === "tool_use");
        messages.push({ role: "assistant", content: data.content });
        const results = [];
        for (const t of toolUses) {
          onUpdate({ type: "tool", name: t.name, input: t.input });
          const result = await executeTool(t.name, t.input);
          results.push({ type: "tool_result", tool_use_id: t.id, content: JSON.stringify(result) });
        }
        messages.push({ role: "user", content: results });
      } else {
        const text = data.content?.filter(b => b.type === "text").map(b => b.text).join("\n") || "";
        if (text) return text;
        break;
      }
  }
  return "Trip Planning Complete!!"
}

