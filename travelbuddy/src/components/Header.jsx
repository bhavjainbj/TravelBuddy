import { COLORS, FONTS } from "../styles/theme.js";

export function Header({ onLogoClick }) {
  return (
    <header style={{
      width: "100%",
      padding: "1rem 1.5rem",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      borderBottom: `1px solid ${COLORS.border}`,
      background: "rgba(10,15,30,0.85)",
      backdropFilter: "blur(16px)",
      WebkitBackdropFilter: "blur(16px)",
      position: "sticky",
      top: 0,
      zIndex: 100,
      boxSizing: "border-box",
    }}>
      {/* Logo */}
      <div onClick={onLogoClick} style={{ display: "flex", alignItems: "center", gap: "0.65rem", cursor: "pointer" }}>
        <div style={{
          width: 36, height: 36, borderRadius: 9,
          background: `linear-gradient(135deg, ${COLORS.accent}, #3ab893)`,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: "1rem", boxShadow: "0 4px 14px rgba(99,210,174,0.3)",
          flexShrink: 0,
        }}>
          ✈️
        </div>
        <div>
          <div style={{ fontFamily: FONTS.display, fontSize: "1.1rem", fontWeight: 800, color: COLORS.text, letterSpacing: "-0.01em", lineHeight: 1 }}>
            Travel<span style={{ color: COLORS.accent }}>Buddy</span>
          </div>
          <div style={{ fontSize: "0.58rem", color: COLORS.textMuted, letterSpacing: "0.12em", textTransform: "uppercase", marginTop: "0.1rem" }}>
            AI Trip Planner
          </div>
        </div>
      </div>

      
    </header>
  );
}