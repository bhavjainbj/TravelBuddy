 #TRIP BUDDY — AI Trip Planner

A fully modular AI-powered trip planning platform built with **React + Claude AI + MCP Tools**.

---

## Project Structure

```
src/
├── App.jsx                     Root component — wires everything together
│
├── hooks/
│   └── useTripPlanner.js       All app state + trip planning side-effects
│
├── api/
│   ├── claudeClient.js         Anthropic /v1/messages API wrapper
│   └── agentLoop.js            Multi-turn MCP tool-calling agent loop
│
├── mcp/
│   ├── toolDefinitions.js      MCP tool schemas (sent to Claude) + UI metadata
│   └── toolHandlers.js         MCP tool execution logic (swap for real APIs here)
│
├── screens/
│   ├── HomeScreen.jsx          Trip planning form
│   ├── PlanningScreen.jsx      Live agent status while tools run
│   └── ResultScreen.jsx        Formatted AI travel guide output
│
├── components/
│   ├── Header.jsx              Top navigation bar
│   ├── Background.jsx          Ambient gradient + film grain
│   └── RichText.jsx            Markdown-style AI output renderer
│
└── styles/
    └── theme.js                Global CSS, design tokens, colors, fonts
```

---

## How It Works

1. **User fills in the form** (HomeScreen) — destination, origin, days, budget, style, interests
2. **App calls `runAgentLoop()`** (agentLoop.js) with the user's query
3. **Claude AI decides** which MCP tools to call (all 4, in order)
4. **Each tool is executed** via `executeTool()` in toolHandlers.js
5. **Tool results are fed back** to Claude in the conversation
6. **Claude writes the final guide** once all tools are complete
7. **ResultScreen renders** the formatted travel guide

---

## MCP Tools

| Tool | File | Purpose |
|---|---|---|
| `get_transport_options` | toolHandlers.js | Flights, trains, road options |
| `recommend_accommodations` | toolHandlers.js | Hotels by budget |
| `top_sightseeing` | toolHandlers.js | Attractions & hidden gems |
| `plan_itinerary` | toolHandlers.js | Day-by-day schedule |

### Connecting Real APIs

Replace the mock functions in `src/mcp/toolHandlers.js` with real API calls:

- **Transport** → Skyscanner API / Rome2Rio / Google Flights
- **Hotels** → Booking.com API / Hotels.com / Airbnb
- **Sightseeing** → Google Places API / TripAdvisor / Foursquare
- **Itinerary** → Custom logic or dedicated travel planning APIs

---

## Getting Started

```bash
npx create-react-app wandr
cp -r src/ wandr/src/
cd wandr && npm start
```

The Anthropic API key is handled automatically via the Claude.ai artifact environment.
For standalone deployment, add your key to the `callClaude()` function in `claudeClient.js`.