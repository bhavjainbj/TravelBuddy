export const MCP_TOOLS = [
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
        place_name: {
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

// Metadata for UI display
export const TOOL_META = {
  transport_option: { icon: "✈️", label: "Finding Transport" },
  accommodation_option: { icon: "🏨", label: "Scouting Hotels" },
  top_attractions: { icon: "🗺️", label: "Discovering Spots" },
  local_cuisine: { icon: "🍜", label: "Discovering Local Cusine" },
  plan_itinerary: { icon: "📅", label: "Planning Itinerary" },
};

export const ALL_TOOL_KEYS = Object.keys(TOOL_META);
