import { FONTS, COLORS } from "../styles/theme.js";

const SECTION_EMOJIS = ["🚀", "🏨", "🗺️", "🍜", "📅", "✈️", "🏛️", "🎯"];

function isSectionHeader(line) {
  return SECTION_EMOJIS.some((e) => line.startsWith(e));
}

function InlineText({ text }) {
  const parts = text.split(/\*\*(.*?)\*\*/g);
  return (
    <>
      {parts.map((p, i) =>
        i % 2 === 1 ? (
          <strong key={i} style={{ color: COLORS.accent, fontWeight: 600 }}>
            {p}
          </strong>
        ) : (
          p
        ),
      )}
    </>
  );
}

export function RichText({ text }) {
  const lines = text.split("\n");

  return (
    <div style={{ color: COLORS.text, fontFamily: FONTS.body }}>
      {lines.map((line, i) => {
        if (!line.trim()) return <div key={i} style={{ height: "0.7rem" }} />;

        if (isSectionHeader(line)) {
          return (
            <div
              key={i}
              style={{
                background:
                  "linear-gradient(135deg, rgba(99,210,174,0.1), rgba(99,210,174,0.04))",
                border: "1px solid rgba(99,210,174,0.2)",
                borderLeft: `3px solid ${COLORS.accent}`,
                borderRadius: "0 12px 12px 0",
                padding: "0.85rem 1.4rem",
                margin: "2rem 0 1rem",
                fontSize: "1.05rem",
                fontWeight: 700,
                color: COLORS.text,
                fontFamily: FONTS.display,
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                letterSpacing: "-0.01em",
              }}
            >
              {line}
            </div>
          );
        }

        if (line.startsWith("### "))
          return (
            <h4
              key={i}
              style={{
                color: COLORS.accent,
                fontSize: "0.95rem",
                margin: "1.2rem 0 0.4rem",
                fontFamily: FONTS.display,
                fontWeight: 700,
              }}
            >
              {line.slice(4)}
            </h4>
          );
        if (line.startsWith("## "))
          return (
            <h3
              key={i}
              style={{
                color: COLORS.text,
                fontSize: "1.1rem",
                margin: "1.5rem 0 0.5rem",
                fontFamily: FONTS.display,
                fontWeight: 700,
              }}
            >
              {line.slice(3)}
            </h3>
          );
        if (line.startsWith("# "))
          return (
            <h2
              key={i}
              style={{
                color: COLORS.text,
                fontSize: "1.3rem",
                margin: "1.8rem 0 0.6rem",
                fontFamily: FONTS.display,
                fontWeight: 800,
              }}
            >
              {line.slice(2)}
            </h2>
          );

        if (
          line.startsWith("• ") ||
          line.startsWith("- ") ||
          line.startsWith("* ")
        ) {
          return (
            <div
              key={i}
              style={{
                display: "flex",
                gap: "0.75rem",
                margin: "0.45rem 0",
                paddingLeft: "0.5rem",
                alignItems: "flex-start",
              }}
            >
              <span
                style={{
                  color: COLORS.accent,
                  flexShrink: 0,
                  marginTop: "0.45rem",
                  fontSize: "0.45rem",
                }}
              >
                ◆
              </span>
              <span style={{ lineHeight: 1.75, color: "#b0b8d0" }}>
                <InlineText text={line.slice(2)} />
              </span>
            </div>
          );
        }

        if (/^\d+\./.test(line)) {
          const num = line.match(/^\d+/)[0];
          const rest = line.replace(/^\d+\./, "").trim();
          return (
            <div
              key={i}
              style={{
                display: "flex",
                gap: "0.75rem",
                margin: "0.5rem 0",
                paddingLeft: "0.5rem",
                alignItems: "flex-start",
              }}
            >
              <span
                style={{
                  color: "#0A0F1E",
                  background: COLORS.accent,
                  flexShrink: 0,
                  fontWeight: 800,
                  fontSize: "0.7rem",
                  width: 20,
                  height: 20,
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginTop: "0.25rem",
                }}
              >
                {num}
              </span>
              <span style={{ lineHeight: 1.75, color: "#b0b8d0" }}>
                <InlineText text={rest} />
              </span>
            </div>
          );
        }

        return (
          <p
            key={i}
            style={{
              margin: "0.35rem 0",
              lineHeight: 1.8,
              color: "#a0aac0",
              fontSize: "0.95rem",
            }}
          >
            <InlineText text={line} />
          </p>
        );
      })}
    </div>
  );
}
