import { useRef, useEffect } from "react";
import "./App.css";
import { GLOBAL_CSS, COLORS } from "./styles/theme.js";
import { useTripPlanner } from "./hooks/useTripPlanner.js";
import { Background } from "./components/Background.jsx";
import { Header } from "./components/Header.jsx";
import { HomeScreen } from "./screens/HomeScreen.jsx";
import { PlanningScreen } from "./screens/PlanningScreen.jsx";
import ResultScreen from "./screens/ResultScreen.jsx";

export default function App() {
  const topRef = useRef(null);
  const {
    screen,
    form,
    toolLog,
    activeTool,
    result,
    error,
    updateField,
    planTrip,
    reset,
  } = useTripPlanner();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [screen]);

  return (
    <div
      ref={topRef}
      style={{
        minHeight: "100vh",
        width: "100%",
        background: COLORS.bg,
        position: "relative",
        overflowX: "hidden",
      }}
    >
      <style>{GLOBAL_CSS}</style>
      <Background />

      <div style={{ position: "relative", zIndex: 2, width: "100%" }}>
        <Header onLogoClick={reset} />

        {screen === "home" && (
          <HomeScreen
            form={form}
            error={error}
            updateField={updateField}
            onPlan={planTrip}
          />
        )}
        {screen === "planning" && (
          <PlanningScreen
            destination={form.destination}
            toolLog={toolLog}
            activeTool={activeTool}
          />
        )}
        {screen === "result" && (
          <ResultScreen
            form={form}
            toolLog={toolLog}
            result={result}
            onReset={reset}
          />
        )}
      </div>
    </div>
  );
}
