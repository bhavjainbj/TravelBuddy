import { COLORS, FONTS } from "../styles/theme.js";
import { TOOL_META, ALL_TOOL_KEYS } from "../mcp/toolDefinitions.js";

export function PlanningScreen({ destination, toolLog, activeTool }) {
  const progress = Math.round((toolLog.length / ALL_TOOL_KEYS.length) * 100);

  return (
    <div
      className="fade-in"
      style={{
        minHeight: "80vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "3rem 1.5rem",
        textAlign: "center",
        boxSizing: "border-box",
        width: "100%",
      }}
    >
      {/* Spinning compass */}
      <div
        style={{
          fontSize: "3.5rem",
          animation: "floatSpin 3s ease-in-out infinite",
          marginBottom: "1.5rem",
        }}
      >
        🧭
      </div>

      <div
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "0.5rem",
          background: COLORS.accentDim,
          border: `1px solid rgba(99,210,174,0.2)`,
          borderRadius: 20,
          padding: "0.3rem 0.9rem",
          marginBottom: "1.2rem",
          fontSize: "0.72rem",
          color: COLORS.accent,
          animation: "pulse 2s infinite",
        }}
      >
        AI is researching your trip…
      </div>

      <h2
        style={{
          fontFamily: FONTS.display,
          fontWeight: 800,
          fontSize: "clamp(1.4rem, 5vw, 2.2rem)",
          color: COLORS.text,
          marginBottom: "0.4rem",
          letterSpacing: "-0.02em",
          lineHeight: 1.2,
          padding: "0 0.5rem",
        }}
      >
        Crafting your trip to{" "}
        <span style={{ color: COLORS.accent }}>{destination}</span>
      </h2>
      <p
        style={{
          color: COLORS.textMuted,
          marginBottom: "2.5rem",
          fontSize: "0.88rem",
          padding: "0 1rem",
        }}
      >
        Our AI is making {ALL_TOOL_KEYS.length} research calls for you
      </p>

      {/* Progress bar */}
      <div
        style={{
          width: "100%",
          maxWidth: 420,
          marginBottom: "2rem",
          padding: "0 0.5rem",
          boxSizing: "border-box",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "0.4rem",
          }}
        >
          <span style={{ fontSize: "0.72rem", color: COLORS.textMuted }}>
            Research progress
          </span>
          <span
            style={{
              fontSize: "0.72rem",
              color: COLORS.accent,
              fontWeight: 600,
            }}
          >
            {progress}%
          </span>
        </div>
        <div
          style={{
            height: 6,
            borderRadius: 3,
            background: "rgba(255,255,255,0.06)",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              height: "100%",
              borderRadius: 3,
              background: `linear-gradient(90deg, ${COLORS.accent}, #F5C842)`,
              width: `${progress}%`,
              transition: "width 0.5s ease",
              boxShadow: "0 0 10px rgba(99,210,174,0.5)",
            }}
          />
        </div>
      </div>

      {/* Tool status cards */}
      <div
        className="tool-grid"
        style={{ padding: "0 0.5rem", boxSizing: "border-box" }}
      >
        {ALL_TOOL_KEYS.map((key) => {
          const done = toolLog.includes(key);
          const active = activeTool === key;
          const { icon, label } = TOOL_META[key];

          return (
            <div
              key={key}
              style={{
                background: done
                  ? "rgba(99,210,174,0.08)"
                  : active
                    ? "rgba(99,210,174,0.04)"
                    : COLORS.surface,
                border: done
                  ? `1px solid rgba(99,210,174,0.35)`
                  : active
                    ? `1px solid rgba(99,210,174,0.2)`
                    : `1px solid ${COLORS.border}`,
                borderRadius: 12,
                padding: "0.9rem 1rem",
                display: "flex",
                alignItems: "center",
                gap: "0.65rem",
                transition: "all 0.4s",
                animation: active ? "borderPulse 1s infinite" : "none",
              }}
            >
              <span
                style={{
                  fontSize: "1.3rem",
                  width: 36,
                  height: 36,
                  borderRadius: 8,
                  background: done
                    ? "rgba(99,210,174,0.12)"
                    : "rgba(255,255,255,0.03)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                {icon}
              </span>
              <div style={{ textAlign: "left" }}>
                <div
                  style={{
                    fontSize: "0.8rem",
                    fontWeight: 600,
                    color: done
                      ? COLORS.accent
                      : active
                        ? "#c8f0e0"
                        : COLORS.textMuted,
                    transition: "color 0.3s",
                  }}
                >
                  {done ? "✓ " : active ? "⟳ " : "○ "}
                  {label}
                </div>
                {active && (
                  <div
                    style={{
                      fontSize: "0.65rem",
                      color: COLORS.accent,
                      animation: "pulse 0.8s infinite",
                      marginTop: "0.1rem",
                    }}
                  >
                    Running…
                  </div>
                )}
                {done && (
                  <div
                    style={{
                      fontSize: "0.65rem",
                      color: "#6aaa80",
                      marginTop: "0.1rem",
                    }}
                  >
                    Done
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Dots */}
      <div
        style={{
          marginTop: "2rem",
          display: "flex",
          gap: "0.4rem",
          alignItems: "center",
        }}
      >
        {[0, 1, 2, 3, 4].map((i) => (
          <div
            key={i}
            style={{
              width: 4,
              height: 4,
              borderRadius: "50%",
              background: COLORS.accent,
              animation: `pulse 1.2s ${i * 0.15}s infinite`,
            }}
          />
        ))}
      </div>
      <p
        style={{
          fontSize: "0.72rem",
          color: COLORS.textFaint,
          marginTop: "0.8rem",
        }}
      >
        {toolLog.length} of {ALL_TOOL_KEYS.length} tools completed
      </p>
    </div>
  );
}
