import { useState, useCallback } from "react";
import { runAgentLoop } from "../api/agentLoop.js";

const DEFAULT_FORM = {
  destination: "",
  origin: "",
  days: "5",
  budget: "mid-range",
  style: "cultural",
  cuisine: "non-veg",
  interests: [],
};

export function useTripPlanner() {
  const [screen, setScreen] = useState("home");
  const [form, setForm] = useState(DEFAULT_FORM);
  const [toolLog, setToolLog] = useState([]);
  const [activeTool, setActiveTool] = useState(null);
  const [result, setResult] = useState("");
  const [error, setError] = useState("");

  const toggleInterest = useCallback((interest) => {
    setForm((f) => ({
      ...f,
      interests: f.interests.includes(interest)
        ? f.interests.filter((x) => x !== interest)
        : [...f.interests, interest],
    }));
  }, []);

  const updateField = useCallback((field, value) => {
    setForm((f) => ({ ...f, [field]: value }));
  }, []);

  const reset = useCallback(() => {
    setScreen("home");
    setResult("");
    setToolLog([]);
    setActiveTool(null);
    setError("");
  }, []);

  const planTrip = useCallback(async () => {
    // Read latest form state via a ref-like pattern
    setForm((currentForm) => {
      if (!currentForm.destination.trim()) {
        setError("Please enter a destination!");
        return currentForm;
      }

      setError("");
      setToolLog([]);
      setResult("");
      setActiveTool(null);
      setScreen("planning");

      const query = [
        `Plan a complete ${currentForm.days}-day ${currentForm.style} trip to ${currentForm.destination}`,
        currentForm.origin ? `departing from ${currentForm.origin}` : "",
        `Budget: ${currentForm.budget}.`,
        `Dietary preference: ${currentForm.cuisine}.`,
        currentForm.interests?.length
          ? `Interests: ${currentForm.interests.join(", ")}.`
          : "",
        "Give a full travel guide: transport options, accommodation, sightseeing, food, and a detailed day-by-day itinerary.",
      ]
        .filter(Boolean)
        .join(" ");

      runAgentLoop(query, ({ name }) => {
        setActiveTool(name);
        setToolLog((prev) => (prev.includes(name) ? prev : [...prev, name]));
        setTimeout(() => setActiveTool(null), 1800);
      })
        .then((text) => {
          setResult(text);
          setScreen("result");
        })
        .catch((e) => {
          setError("Something went wrong: " + e.message);
          setScreen("home");
        });

      return currentForm;
    });
  }, []);

  return {
    screen,
    form,
    toolLog,
    activeTool,
    result,
    error,
    updateField,
    toggleInterest,
    planTrip,
    reset,
  };
}
