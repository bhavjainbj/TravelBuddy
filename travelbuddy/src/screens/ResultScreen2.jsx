import React, { useState } from "react";
import { COLORS, FONTS } from "../styles/theme.js";
import { RichText } from "../components/RichText.jsx";

// 1. Premium Card Component for Itinerary Days
function DayCard({ dayNumber, content, isOpen, onToggle }) {
  // Using high-quality travel photography placeholders
  const imageUrl = `https://images.unsplash.com/photo-${1500000000000 + dayNumber * 123456}?auto=format&fit=crop&q=80&w=1200`;

  return (
    <div style={{ 
      background: "rgba(255, 255, 255, 0.03)",
      border: `1px solid ${COLORS.border}`,
      borderRadius: "24px",
      marginBottom: "1.5rem",
      overflow: "hidden",
      transition: "transform 0.3s ease"
    }}>
      <button
        onClick={onToggle}
        style={{
          width: "100%",
          padding: "1.5rem 2rem",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          background: isOpen ? "rgba(99,210,174,0.06)" : "transparent",
          border: "none",
          cursor: "pointer",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "1.5rem" }}>
          <div style={{
            width: "40px",
            height: "40px",
            borderRadius: "12px",
            background: isOpen ? COLORS.accent : "rgba(255,255,255,0.1)",
            color: isOpen ? "#0A0F1E" : COLORS.text,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "1rem",
            fontWeight: 800,
            fontFamily: FONTS.display
          }}>
            {dayNumber}
          </div>
          <h3 style={{ 
            margin: 0,
            fontFamily: FONTS.display, 
            fontSize: "1.25rem", 
            fontWeight: 700,
            color: COLORS.text 
          }}>
            Day {dayNumber} Activities
          </h3>
        </div>
        <div style={{ color: COLORS.accent, fontSize: "1.5rem" }}>
          {isOpen ? "−" : "+"}
        </div>
      </button>

      {isOpen && (
        <div style={{ padding: "0 2rem 2rem 2rem", animation: "fadeIn 0.4s ease" }}>
          <img 
            src={imageUrl} 
            alt="Travel view"
            style={{ 
              width: "100%", 
              height: "320px", 
              objectFit: "cover", 
              borderRadius: "16px",
              marginBottom: "1.5rem",
              border: `1px solid ${COLORS.border}`
            }} 
          />
          <RichText text={content} />
        </div>
      )}
    </div>
  );
}

export function ResultScreen({ form, result, onReset }) {
  const [openDay, setOpenDay] = useState(1);

  // Parsing logic to separate AI output into days
  const daySections = result.split(/Day\s*\d+[:\s]*/gi).filter(s => s.trim().length > 10);

  return (
    <div style={{
      width: "100%",
      minHeight: "100vh",
      padding: "3rem 5% 6rem", // Wide layout
      boxSizing: "border-box",
    }}>
      <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
        
        {/* Header Section */}
        <header style={{ marginBottom: "4rem" }}>
          <button onClick={onReset} style={{ 
            background: "transparent", border: "none", color: COLORS.accent, 
            cursor: "pointer", fontSize: "0.9rem", fontWeight: 600, marginBottom: "1rem",
            display: "flex", alignItems: "center", gap: "0.5rem"
          }}>
            ← EDIT PLAN
          </button>
          <h1 style={{
            fontFamily: FONTS.display,
            fontSize: "clamp(2.5rem, 7vw, 4.5rem)",
            color: COLORS.text,
            fontWeight: 800,
            letterSpacing: "-0.04em",
            margin: 0,
            lineHeight: 1
          }}>
            {form.destination} <span style={{ color: COLORS.textMuted, fontWeight: 300 }}>Explorer</span>
          </h1>
        </header>

        {/* Main 2-Column Grid */}
        <div style={{ 
          display: "grid", 
          gridTemplateColumns: "1fr 360px", 
          gap: "4rem",
          alignItems: "start"
        }}>
          
          {/* Left: Itinerary List */}
          <section>
            <div style={{
              fontSize: "0.75rem",
              fontWeight: 800,
              color: COLORS.textMuted,
              textTransform: "uppercase",
              letterSpacing: "0.2em",
              marginBottom: "2rem",
              display: "flex",
              alignItems: "center",
              gap: "1rem"
            }}>
              <div style={{ width: "40px", height: "1px", background: COLORS.accent }}></div>
              Daily Schedule
            </div>

            {daySections.map((content, idx) => (
              <DayCard 
                key={idx}
                dayNumber={idx + 1}
                content={content}
                isOpen={openDay === idx + 1}
                onToggle={() => setOpenDay(openDay === idx + 1 ? null : idx + 1)}
              />
            ))}
          </section>

          {/* Right: Sticky Sidebar Card */}
          <aside style={{ position: "sticky", top: "120px" }}>
            <div style={{
              background: "rgba(255, 255, 255, 0.02)",
              backdropFilter: "blur(20px)",
              border: `1px solid ${COLORS.border}`,
              borderRadius: "32px",
              padding: "2.5rem",
              boxShadow: "0 30px 60px rgba(0,0,0,0.4)"
            }}>
              <h2 style={{ 
                fontFamily: FONTS.display, fontSize: "1rem", fontWeight: 800, 
                color: COLORS.text, marginBottom: "2rem", textTransform: "uppercase",
                letterSpacing: "0.1em", borderBottom: `1px solid ${COLORS.border}`,
                paddingBottom: "1rem"
              }}>
                📊 Trip Summary
              </h2>

              <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                <SidebarItem label="Destination" value={form.destination} icon="📍" />
                <SidebarItem label="Trip Length" value={`${form.days} Days`} icon="⏳" />
                <SidebarItem label="Budget" value={form.budget} icon="💰" />
                <SidebarItem label="Travel Style" value={form.style} icon="🎭" />
              </div>

              {/* Exact heading style for Cuisines */}
              <h2 style={{ 
                fontFamily: FONTS.display, fontSize: "1rem", fontWeight: 800, 
                color: COLORS.text, marginTop: "3.5rem", marginBottom: "1.5rem", 
                textTransform: "uppercase", letterSpacing: "0.1em",
                borderBottom: `1px solid ${COLORS.border}`, paddingBottom: "1rem"
              }}>
                🍽️ Local Cuisines
              </h2>
              
              <div style={{
                background: "rgba(99,210,174,0.05)",
                padding: "1.25rem",
                borderRadius: "16px",
                border: "1px solid rgba(99,210,174,0.1)",
                color: COLORS.text,
                fontSize: "0.95rem",
                lineHeight: 1.6
              }}>
                {form.cuisine || "Savor authentic regional flavors and seasonal street food favorites."}
              </div>

              <button onClick={() => window.print()} style={{
                width: "100%", marginTop: "3rem", padding: "1.2rem",
                borderRadius: "16px", background: COLORS.accent, color: "#0A0F1E",
                border: "none", fontWeight: 800, fontFamily: FONTS.display,
                cursor: "pointer", letterSpacing: "0.05em"
              }}>
                DOWNLOAD PDF
              </button>
            </div>
          </aside>

        </div>
      </div>
    </div>
  );
}

function SidebarItem({ label, value, icon }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
      <span style={{ fontSize: "0.8rem", color: COLORS.textMuted, fontWeight: 500 }}>{icon} {label}</span>
      <span style={{ fontSize: "1rem", fontWeight: 700, color: COLORS.text }}>{value}</span>
    </div>
  );
}