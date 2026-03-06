async function handleGetTransportOption({
  origin,
  destination,
  travel_date,
  return_date,
}) {
  return {
    status: "success",
    tool: "transport_option",
    data: {
      origin: origin || "your city",
      destination,
      travel_date: travel_date || "flexible",
      return_date: return_date,
      message: `Transport options from ${origin || "your city"} to ${destination} retrieved — flights, trains, buses and road trip routes with estimated durations and costs.`,
    },
  };
}

async function handleAccomodationOptions({ destination, nights }) {
  return {
    status: "success",
    tool: "accommodation_option",
    data: {
      destination,
      nights,
      message: `Top Hotels in ${toolInput.destination} for ${toolInput.nights} nights accommodation options.`,
    },
  };
}

async function handleTopAttraction({ destination }) {
  return {
    status: "success",
    tool: "top_attractions",
    data: {
      destination,
      message: `Top attractions and hidden gems in ${toolInput.destination} retrieved with entry fees and best visiting times.`,
    },
  };
}

async function handleLocalCuisine({ destination, food_type }) {
  return {
    status: "success",
    tool: "local_cuisine",
    data: {
      destination,
      food_type,
      message: `Best ${toolInput.food_type} cuisine options in ${toolInput.destination} retrieved with costs and ratings.`,
    },
  };
}

async function handlePlanItinerary({ destination, days }) {
  return {
    status: "success",
    tool: "plan_itinerary",
    data: {
      destination,
      days,
      message: `${toolInput.days} - Days Itinerary for ${toolInput.destination}`,
    },
  };
}

// TOOL ROUTER
const HANDLERS = {
  transport_option: handleGetTransportOption,
  accommodation_option: handleAccomodationOptions,
  top_attractions: handleTopAttraction,
  local_cuisine: handleLocalCuisine,
  plan_itinerary: handlePlanItinerary,
};


/**
* Executes a named MCP tool with the given input.
* Called by the agent loop whenever Claude requests a tool.
*/

export async function executeTool (toolName, toolInput) {
    const handler = HANDLERS[toolName];
    if(!handler){
        return { status: "error", message: `Unknown tool: ${toolName}` };
    }

    try {
        return await handler(toolInput);
    }
    catch (err) {
        return {status: "error", message: err.message};
    }
}
