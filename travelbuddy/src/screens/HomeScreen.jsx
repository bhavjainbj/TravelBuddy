import { useState, useRef, useEffect, useCallback } from "react";
import { COLORS, FONTS } from "../styles/theme.js";

// Returns true if window width is mobile (<= 600px)
const isMobile = () => typeof window !== "undefined" && window.innerWidth <= 600;

const INTERESTS = [
  "🏖️ Beach", "🏔️ Mountains", "🏛️ History", "🍜 Food",
  "🎨 Art", "🌿 Nature", "🎉 Nightlife", "🛍️ Shopping",
  "🙏 Temples", "📸 Photography",
];

// ── Add / remove destinations here freely ──────────────────────────────────
// Slider always shows 4 per row × 2 rows = 8 per page, auto-paginates
const POPULAR = [
  { name: "Bali",      country: "Indonesia",    tag: "Tropical",    tagColor: "#4ade80", tagBg: "rgba(74,222,128,0.15)",  img: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=500&q=80",  origin: "Delhi",    days: "7", style: "relaxed",   budget: "mid-range" },
  { name: "Paris",     country: "France",       tag: "Romantic",    tagColor: "#f472b6", tagBg: "rgba(244,114,182,0.15)", img: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=500&q=80",  origin: "Delhi",    days: "5", style: "cultural",  budget: "luxury"    },
  { name: "Tokyo",     country: "Japan",        tag: "Culture",     tagColor: "#f87171", tagBg: "rgba(248,113,113,0.15)", img: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=500&q=80",  origin: "Delhi",     days: "7", style: "cultural",  budget: "mid-range" },
  { name: "Dubai",     country: "UAE",          tag: "Luxury",      tagColor: "#fbbf24", tagBg: "rgba(251,191,36,0.15)",  img: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=500&q=80",  origin: "Delhi", days: "5", style: "luxury",    budget: "luxury"    },
  { name: "New York",  country: "USA",          tag: "Urban",       tagColor: "#60a5fa", tagBg: "rgba(96,165,250,0.15)",  img: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=500&q=80",  origin: "Delhi",    days: "7", style: "adventure", budget: "mid-range" },
  { name: "Santorini", country: "Greece",       tag: "Scenic",      tagColor: "#a78bfa", tagBg: "rgba(167,139,250,0.15)", img: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=500&q=80",  origin: "Delhi",    days: "5", style: "relaxed",   budget: "luxury"    },
  { name: "Bangkok",   country: "Thailand",     tag: "Street Food", tagColor: "#34d399", tagBg: "rgba(52,211,153,0.15)",  img: "https://images.unsplash.com/photo-1563492065599-3520f775eeed?w=500&q=80",  origin: "Delhi",    days: "5", style: "cultural",  budget: "budget"    },
  { name: "Maldives",  country: "Maldives",     tag: "Paradise",    tagColor: "#38bdf8", tagBg: "rgba(56,189,248,0.15)",  img: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=500&q=80",  origin: "Delhi",   days: "7", style: "relaxed",   budget: "luxury"    },
  { name: "Rome",      country: "Italy",        tag: "Historic",    tagColor: "#fb923c", tagBg: "rgba(251,146,60,0.15)",  img: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=500&q=80",  origin: "Delhi",    days: "5", style: "cultural",  budget: "mid-range" },
  { name: "Sydney",    country: "Australia",    tag: "Coastal",     tagColor: "#22d3ee", tagBg: "rgba(34,211,238,0.15)",  img: "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?w=500&q=80",  origin: "Delhi", days: "7", style: "relaxed",   budget: "mid-range" },
  { name: "Barcelona", country: "Spain",        tag: "Vibrant",     tagColor: "#facc15", tagBg: "rgba(250,204,21,0.15)",  img: "https://images.unsplash.com/photo-1523531294919-4bcd7c65e216?w=500&q=80",  origin: "Delhi",    days: "5", style: "cultural",  budget: "mid-range" },
  { name: "Singapore", country: "Singapore",    tag: "Modern",      tagColor: "#4ade80", tagBg: "rgba(74,222,128,0.15)",  img: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=500&q=80",  origin: "Delhi",    days: "5", style: "luxury",    budget: "mid-range" },
  { name: "Kyoto",     country: "Japan",        tag: "Serene",      tagColor: "#f9a8d4", tagBg: "rgba(249,168,212,0.15)", img: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=500&q=80",  origin: "Delhi",     days: "6", style: "cultural",  budget: "mid-range" },
  { name: "Cape Town", country: "South Africa", tag: "Adventure",   tagColor: "#f87171", tagBg: "rgba(248,113,113,0.15)", img: "https://images.unsplash.com/photo-1580060839134-75a5edca2e99?w=500&q=80",  origin: "Delhi",    days: "7", style: "adventure", budget: "mid-range" },
  { name: "Amsterdam", country: "Netherlands",  tag: "Charming",    tagColor: "#a78bfa", tagBg: "rgba(167,139,250,0.15)", img: "https://res.cloudinary.com/htt8g4cd/image/upload/w_1920,c_limit,f_auto,q_auto/wp/09_25_36_hours_in_amsterdam_hero_gettyimages-1553500306_1920x1280",  origin: "Delhi",    days: "4", style: "relaxed",   budget: "mid-range" },
  { name: "Phuket",    country: "Thailand",     tag: "Beach",       tagColor: "#38bdf8", tagBg: "rgba(56,189,248,0.15)",  img: "https://images.unsplash.com/photo-1589394815804-964ed0be2eb5?w=500&q=80",  origin: "Delhi",    days: "6", style: "relaxed",   budget: "budget"    },
];

// Desktop: 4 cols × 2 rows = 8 per page
// Mobile:  2 cols × 2 rows = 4 per page
const DESKTOP_PER_PAGE = 8;
const MOBILE_PER_PAGE  = 4;

const FEATURES = [
  ["✈️", "Transport Options",    "Flights, trains & road routes with costs"],
  ["🏨", "Best Accommodations",  "Hotels matched to your budget & style"],
  ["🗺️", "Top Sightseeing",      "Must-visits, hidden gems & insider tips"],
  ["📅", "Day-by-Day Itinerary", "Complete hour-by-hour schedule"],
  ["🍜", "Food & Dining",        "Local cuisines & restaurant picks"],
  ["💡", "Insider Tips",         "Safety notes & money-saving hacks"],
];

function Field({ label, children }) {
  return (
    <div style={{ marginBottom: "1rem" }}>
      <label style={{
        display: "block", fontSize: "0.67rem", fontWeight: 600,
        color: COLORS.textMuted, letterSpacing: "0.1em",
        textTransform: "uppercase", marginBottom: "0.45rem",
        fontFamily: FONTS.display,
      }}>{label}</label>
      {children}
    </div>
  );
}

const inputBase = {
  width: "100%", boxSizing: "border-box",
  background: "rgba(255,255,255,0.04)",
  border: "1px solid rgba(255,255,255,0.08)",
  borderRadius: 10, padding: "0.78rem 1rem",
  color: COLORS.text, fontSize: "0.93rem",
  fontFamily: FONTS.body, transition: "all 0.2s",
  WebkitAppearance: "none", appearance: "none",
};

function DestCard({ dest, onClick }) {
  return (
    <div className="dest-card" onClick={onClick} style={{
      borderRadius: 14, overflow: "hidden",
      cursor: "pointer", transition: "all 0.3s",
      border: `1px solid ${COLORS.border}`,
      background: COLORS.surface,
    }}>
      <div style={{ position: "relative", height: 130, overflow: "hidden", background: "rgba(99,210,174,0.06)" }}>
        <img src={dest.img} alt={dest.name} loading="lazy" style={{
          width: "100%", height: "100%", objectFit: "cover", display: "block",
          transition: "transform 0.45s ease",
        }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(10,15,30,0.82) 0%, rgba(10,15,30,0.05) 55%)" }} />
        <div style={{
          position: "absolute", top: 7, right: 7,
          background: dest.tagBg, border: `1px solid ${dest.tagColor}50`,
          borderRadius: 20, padding: "0.15rem 0.5rem",
          fontSize: "0.6rem", color: dest.tagColor, fontWeight: 700,
          backdropFilter: "blur(8px)",
        }}>{dest.tag}</div>
        <div className="dest-hint" style={{
          position: "absolute", bottom: 8, left: "50%", transform: "translateX(-50%)",
          background: COLORS.accent, borderRadius: 20, padding: "0.2rem 0.8rem",
          fontSize: "0.6rem", color: "#0A0F1E", fontWeight: 700,
          opacity: 0, transition: "opacity 0.25s", whiteSpace: "nowrap", pointerEvents: "none",
        }}>✦ Generate Itinerary</div>
      </div>
      <div style={{ padding: "0.75rem 0.85rem 0.9rem" }}>
        <div style={{ fontFamily: FONTS.display, fontSize: "0.9rem", fontWeight: 700, color: COLORS.text, marginBottom: "0.15rem" }}>{dest.name}</div>
        <div style={{ fontSize: "0.67rem", color: COLORS.textMuted }}>{dest.country} · {dest.days}d · {dest.budget}</div>
      </div>
    </div>
  );
}

// Split flat array into chunks of n
function chunk(arr, n) {
  const out = [];
  for (let i = 0; i < arr.length; i += n) out.push(arr.slice(i, i + n));
  return out;
}

export function HomeScreen({ form, error, updateField, onPlan }) {
  const [page, setPage]         = useState(0);
  const [mobile, setMobile]     = useState(isMobile);
  const viewportRef             = useRef(null);
  const touchStartX             = useRef(null);

  // Detect mobile on mount + resize
  useEffect(() => {
    const handle = () => {
      const m = isMobile();
      setMobile(m);
      setPage(0); // reset to page 1 when layout changes
    };
    window.addEventListener("resize", handle);
    return () => window.removeEventListener("resize", handle);
  }, []);

  const perPage  = mobile ? MOBILE_PER_PAGE : DESKTOP_PER_PAGE;
  const cols     = mobile ? 2 : 4;
  const pages    = chunk(POPULAR, perPage);
  const totalPages = pages.length;

  // Recalculate offset whenever page changes
  const getOffset = () => {
    if (!viewportRef.current) return 0;
    return page * viewportRef.current.offsetWidth;
  };

  const goTo   = (p) => setPage(Math.max(0, Math.min(p, totalPages - 1)));
  const goNext = () => goTo(page + 1);
  const goPrev = () => goTo(page - 1);

  const toggleInterest = (i) => {
    const curr = form.interests || [];
    updateField("interests", curr.includes(i) ? curr.filter(x => x !== i) : [...curr, i]);
  };

  const handleDestClick = (dest) => {
    updateField("destination", dest.name);
    updateField("origin",      dest.origin);
    updateField("days",        dest.days);
    updateField("style",       dest.style);
    updateField("budget",      dest.budget);
    setTimeout(onPlan, 80);
  };

  // Pixel offset = page × viewport width
  const [offsetPx, setOffsetPx] = useState(0);

  useEffect(() => {
    const update = () => {
      if (viewportRef.current) {
        setOffsetPx(page * viewportRef.current.offsetWidth);
      }
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [page]);

  return (
    <div style={{ width: "100%", paddingBottom: "5rem" }}>

      {/* ── HERO ── */}
      <div className="fade-up" style={{ textAlign: "center", padding: "2.5rem 1.5rem 2rem" }}>
        
        <h1 style={{
          fontFamily: FONTS.display, fontWeight: 800,
          fontSize: "clamp(1.9rem, 6vw, 4rem)",
          lineHeight: 1.1, color: COLORS.text,
          marginBottom: "1rem", letterSpacing: "-0.02em",
        }}>
          Plan your perfect trip<br />
          <span style={{
            background: "linear-gradient(90deg, #63D2AE, #F5C842, #63D2AE)",
            backgroundSize: "200% auto",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
            animation: "gradientShift 4s linear infinite",
          }}>in seconds with AI</span>
        </h1>
        <p style={{
          fontSize: "clamp(0.9rem, 2.5vw, 1.05rem)",
          color: COLORS.textMuted, maxWidth: 500, margin: "0 auto",
          lineHeight: 1.7, fontWeight: 300,
        }}>
          Tell us your destination and preferences. Get transport, hotels, sightseeing & a full itinerary — instantly.
        </p>
      </div>

      {/* ── FORM ── */}
      <div className="fade-up-d1" style={{ maxWidth: 1100, margin: "0 auto 2.5rem", padding: "0 1.5rem", width: "100%", boxSizing: "border-box" }}>
        <div className="form-card" style={{ background: COLORS.surface, border: `1px solid ${COLORS.border}`, borderRadius: 20, padding: "1.8rem 2rem" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.5rem", flexWrap: "wrap", gap: "0.5rem" }}>
            <div>
              <div style={{ fontFamily: FONTS.display, fontSize: "1.1rem", fontWeight: 700, color: COLORS.text, marginBottom: "0.15rem" }}>Plan Your Trip</div>
              <div style={{ fontSize: "0.75rem", color: COLORS.textMuted }}>Fill in your travel details</div>
            </div>
            <span style={{ background: COLORS.accentDim, border: `1px solid rgba(99,210,174,0.2)`, borderRadius: 20, padding: "0.28rem 0.8rem", fontSize: "0.68rem", color: COLORS.accent, fontWeight: 500 }}>✦ Free · Instant</span>
          </div>

          <div className="form-row-2">
            <Field label="Where to?">
              <input style={inputBase} placeholder="e.g. Bangkok, Thailand" value={form.destination}
                onChange={e => updateField("destination", e.target.value)} onKeyDown={e => e.key === "Enter" && onPlan()} />
            </Field>
            <Field label="Departing from">
              <input style={inputBase} placeholder="e.g. Mumbai, India" value={form.origin}
                onChange={e => updateField("origin", e.target.value)} />
            </Field>
          </div>

          <div className="form-row-4">
            <Field label="Duration">
              <select style={inputBase} value={form.days} onChange={e => updateField("days", e.target.value)}>
                {[2,3,4,5,6,7,10,14].map(d => <option key={d} value={d}>{d} Days</option>)}
              </select>
            </Field>
            <Field label="Budget">
              <select style={inputBase} value={form.budget} onChange={e => updateField("budget", e.target.value)}>
                <option value="budget">Budget 💰</option>
                <option value="mid-range">Mid-Range 💰💰</option>
                <option value="luxury">Luxury 💰💰💰</option>
              </select>
            </Field>
            <Field label="Travel Style">
              <select style={inputBase} value={form.style} onChange={e => updateField("style", e.target.value)}>
                <option value="cultural">Cultural</option>
                <option value="adventure">Adventure</option>
                <option value="relaxed">Relaxed</option>
                <option value="luxury">Luxury</option>
                <option value="budget">Backpacker</option>
              </select>
            </Field>
            <Field label="Dietary Pref.">
              <select style={inputBase} value={form.cuisine} onChange={e => updateField("cuisine", e.target.value)}>
                <option value="veg">Vegetarian 🌱</option>
                <option value="non-veg">Standard 🍖</option>
                <option value="vegan">Vegan ☘️</option>
              </select>
            </Field>
          </div>

          <div style={{ marginTop: "0.2rem", marginBottom: "1.5rem" }}>
            <label style={{ display: "block", fontSize: "0.67rem", fontWeight: 600, color: COLORS.textMuted, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "0.55rem", fontFamily: FONTS.display }}>
              Interests (optional)
            </label>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
              {INTERESTS.map(i => {
                const active = (form.interests || []).includes(i);
                return (
                  <span key={i} className="tag-btn" onClick={() => toggleInterest(i)} style={{
                    padding: "0.28rem 0.75rem", borderRadius: 20, fontSize: "0.75rem",
                    cursor: "pointer", userSelect: "none", transition: "all 0.15s",
                    border: active ? `1px solid ${COLORS.accent}` : "1px solid rgba(255,255,255,0.08)",
                    background: active ? COLORS.accentDim : "transparent",
                    color: active ? COLORS.accent : COLORS.textMuted,
                  }}>{i}</span>
                );
              })}
            </div>
          </div>

          {error && <p style={{ color: "#F07070", fontSize: "0.82rem", marginBottom: "1rem", textAlign: "center" }}>{error}</p>}

          <button onClick={onPlan} className="btn-generate" style={{
            width: "100%", padding: "1rem", borderRadius: 12,
            background: `linear-gradient(135deg, ${COLORS.accent}, #3ab893)`,
            color: "#0A0F1E", fontSize: "1rem", fontWeight: 700,
            fontFamily: FONTS.display, border: "none", cursor: "pointer",
            letterSpacing: "0.04em", transition: "all 0.25s",
            boxShadow: "0 8px 28px rgba(99,210,174,0.28)", touchAction: "manipulation",
          }}>✦ Generate My Itinerary</button>

          
        </div>
      </div>

      {/* ── POPULAR DESTINATIONS SLIDER ── */}
      <div style={{ maxWidth: 1100, margin: "0 auto 2.5rem", padding: "0 1.5rem", boxSizing: "border-box" }}>

        {/* Header + controls */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.1rem", flexWrap: "wrap", gap: "0.75rem" }}>
          <div>
            <h2 style={{ fontFamily: FONTS.display, fontSize: "clamp(1.1rem, 4vw, 1.3rem)", fontWeight: 800, color: COLORS.text, letterSpacing: "-0.01em", marginBottom: "0.2rem" }}>
              🔥 Popular Destinations
            </h2>
            <p style={{ fontSize: "0.78rem", color: COLORS.textMuted }}>Tap any card to instantly generate a complete itinerary</p>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", flexShrink: 0 }}>
            {/* Dot indicators */}
            <div style={{ display: "flex", gap: "0.3rem", alignItems: "center" }}>
              {pages.map((_, i) => (
                <button key={i} onClick={() => goTo(i)} style={{
                  width: i === page ? 22 : 7, height: 7, borderRadius: 4, border: "none",
                  background: i === page ? COLORS.accent : "rgba(255,255,255,0.15)",
                  cursor: "pointer", padding: 0, transition: "all 0.3s ease",
                }} />
              ))}
            </div>

            {/* Prev */}
            <button onClick={goPrev} disabled={page === 0} style={{
              width: 36, height: 36, borderRadius: "50%", border: "none",
              background: page === 0 ? "rgba(255,255,255,0.04)" : COLORS.accentDim,
              color: page === 0 ? COLORS.textFaint : COLORS.accent,
              cursor: page === 0 ? "not-allowed" : "pointer",
              fontSize: "1.2rem", display: "flex", alignItems: "center", justifyContent: "center",
              transition: "all 0.2s", outline: `1px solid ${page === 0 ? COLORS.border : "rgba(99,210,174,0.3)"}`,
            }}>‹</button>

            <span style={{ fontSize: "0.72rem", color: COLORS.textMuted, minWidth: 32, textAlign: "center" }}>
              {page + 1}/{totalPages}
            </span>

            {/* Next */}
            <button onClick={goNext} disabled={page === totalPages - 1} style={{
              width: 36, height: 36, borderRadius: "50%", border: "none",
              background: page === totalPages - 1 ? "rgba(255,255,255,0.04)" : COLORS.accentDim,
              color: page === totalPages - 1 ? COLORS.textFaint : COLORS.accent,
              cursor: page === totalPages - 1 ? "not-allowed" : "pointer",
              fontSize: "1.2rem", display: "flex", alignItems: "center", justifyContent: "center",
              transition: "all 0.2s", outline: `1px solid ${page === totalPages - 1 ? COLORS.border : "rgba(99,210,174,0.3)"}`,
            }}>›</button>
          </div>
        </div>

        {/* ── THE ACTUAL SLIDER ──
            Key insight: the viewport ref gives us the real pixel width.
            We translate the track by -(page × viewportWidth)px.
            Each page panel is set to exactly viewportWidth px wide.       */}
        <div
          ref={viewportRef}
          style={{ overflow: "hidden", borderRadius: 16, width: "100%" }}
          onTouchStart={e => { touchStartX.current = e.touches[0].clientX; }}
          onTouchEnd={e => {
            const dx = e.changedTouches[0].clientX - (touchStartX.current ?? 0);
            if (dx < -40) goNext();
            if (dx >  40) goPrev();
          }}
        >
          {/* Track — laid out as a single flex row, translated by pixel amount */}
          <div style={{
            display: "flex",
            transition: "transform 0.45s cubic-bezier(0.22, 1, 0.36, 1)",
            transform: `translateX(-${offsetPx}px)`,
            willChange: "transform",
          }}>
            {pages.map((pageDests, pageIdx) => {
              const row1 = pageDests.slice(0, cols);
              const row2 = pageDests.slice(cols, cols * 2);
              return (
                <div
                  key={pageIdx}
                  style={{
                    // Each page panel must be exactly as wide as the viewport — no more, no less
                    width:    viewportRef.current ? `${viewportRef.current.offsetWidth}px` : "100%",
                    minWidth: viewportRef.current ? `${viewportRef.current.offsetWidth}px` : "100%",
                    maxWidth: viewportRef.current ? `${viewportRef.current.offsetWidth}px` : "100%",
                    flexShrink: 0,
                    display: "flex", flexDirection: "column", gap: "1rem",
                    boxSizing: "border-box",
                  }}
                >
                  <div style={{ display: "grid", gridTemplateColumns: `repeat(${cols}, 1fr)`, gap: mobile ? "0.6rem" : "1rem" }}>
                    {row1.map(dest => <DestCard key={dest.name} dest={dest} onClick={() => handleDestClick(dest)} />)}
                  </div>
                  {row2.length > 0 && (
                    <div style={{ display: "grid", gridTemplateColumns: `repeat(${cols}, 1fr)`, gap: mobile ? "0.6rem" : "1rem" }}>
                      {row2.map(dest => <DestCard key={dest.name} dest={dest} onClick={() => handleDestClick(dest)} />)}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── WHAT YOU'LL GET ── */}
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 1.5rem", boxSizing: "border-box" }}>
        <h2 style={{ fontFamily: FONTS.display, fontSize: "clamp(1.1rem, 4vw, 1.3rem)", fontWeight: 800, color: COLORS.text, letterSpacing: "-0.01em", marginBottom: "0.2rem" }}>
          ✦ What you'll get
        </h2>
        <p style={{ fontSize: "0.78rem", color: COLORS.textMuted, marginBottom: "1.1rem" }}>
          Everything you need for a perfect trip, generated in one click
        </p>
        <div style={{ display: "flex", gap: "0.85rem", overflowX: "auto", paddingBottom: "1rem", scrollbarWidth: "thin", scrollbarColor: "rgba(99,210,174,0.2) transparent", WebkitOverflowScrolling: "touch" }}>
          {FEATURES.map(([icon, title, desc]) => (
            <div key={title} style={{ background: COLORS.surface, border: `1px solid ${COLORS.border}`, borderRadius: 14, padding: "1.2rem 1rem", minWidth: 180, maxWidth: 180, flexShrink: 0 }}>
              <div style={{ width: 42, height: 42, borderRadius: 10, background: COLORS.accentGlow, border: `1px solid rgba(99,210,174,0.15)`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.3rem", marginBottom: "0.85rem" }}>{icon}</div>
              <div style={{ fontFamily: FONTS.display, fontSize: "0.83rem", fontWeight: 700, color: COLORS.text, marginBottom: "0.35rem" }}>{title}</div>
              <div style={{ fontSize: "0.72rem", color: COLORS.textMuted, lineHeight: 1.55 }}>{desc}</div>
            </div>
          ))}
        </div>
        <p style={{ fontSize: "0.64rem", color: COLORS.textFaint, textAlign: "center", marginTop: "0.25rem", letterSpacing: "0.07em" }}>← swipe to explore →</p>
      </div>

      <style>{`
        .dest-card:hover { transform: translateY(-5px) !important; border-color: rgba(99,210,174,0.35) !important; box-shadow: 0 12px 32px rgba(0,0,0,0.4); }
        .dest-card:hover img { transform: scale(1.07); }
        .dest-card:hover .dest-hint { opacity: 1 !important; }
        @media (max-width: 600px) {
          .dest-card-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
      `}</style>
    </div>
  );
}