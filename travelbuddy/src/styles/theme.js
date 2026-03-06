export const GLOBAL_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:ital,wght@0,300;0,400;0,500;1,300&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  html, body, #root {
    width: 100%;
    min-height: 100vh;
    background: #0A0F1E;
  }

  body {
    font-family: 'DM Sans', sans-serif;
    color: #E8EAF0;
    -webkit-font-smoothing: antialiased;
    overflow-x: hidden;
  }

  /* ── Animations ── */
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(28px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes fadeIn {
    from { opacity: 0; }
    to   { opacity: 1; }
  }
  @keyframes floatSpin {
    0%   { transform: rotate(0deg) scale(1); }
    50%  { transform: rotate(180deg) scale(1.1); }
    100% { transform: rotate(360deg) scale(1); }
  }
  @keyframes pulse {
    0%, 100% { opacity: 1; transform: scale(1); }
    50%       { opacity: 0.5; transform: scale(0.95); }
  }
  @keyframes gradientShift {
    0%   { background-position: 0% 50%; }
    50%  { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }
  @keyframes scaleIn {
    from { opacity: 0; transform: scale(0.95); }
    to   { opacity: 1; transform: scale(1); }
  }
  @keyframes borderPulse {
    0%, 100% { border-color: rgba(99,210,174,0.3); }
    50%       { border-color: rgba(99,210,174,0.8); }
  }

  .fade-up    { animation: fadeUp 0.7s cubic-bezier(0.22,1,0.36,1) both; }
  .fade-up-d1 { animation: fadeUp 0.7s 0.1s cubic-bezier(0.22,1,0.36,1) both; }
  .fade-up-d2 { animation: fadeUp 0.7s 0.2s cubic-bezier(0.22,1,0.36,1) both; }
  .fade-up-d3 { animation: fadeUp 0.7s 0.3s cubic-bezier(0.22,1,0.36,1) both; }
  .fade-in    { animation: fadeIn 0.5s ease both; }
  .scale-in   { animation: scaleIn 0.5s cubic-bezier(0.22,1,0.36,1) both; }

  /* ── Inputs ── */
  input, select, textarea { font-family: 'DM Sans', sans-serif; }
  input:focus, select:focus, textarea:focus {
    outline: none;
    border-color: rgba(99,210,174,0.6) !important;
    box-shadow: 0 0 0 3px rgba(99,210,174,0.12) !important;
  }
  input::placeholder, textarea::placeholder { color: rgba(232,234,240,0.2); }
  select option { background: #141929; color: #E8EAF0; }

  /* ── Scrollbar ── */
  ::-webkit-scrollbar { width: 5px; height: 5px; }
  ::-webkit-scrollbar-track { background: transparent; }
  ::-webkit-scrollbar-thumb { background: rgba(99,210,174,0.2); border-radius: 3px; }

  /* ── Buttons ── */
  .btn-generate:hover  { transform: translateY(-2px) !important; box-shadow: 0 20px 40px rgba(99,210,174,0.35) !important; }
  .btn-generate:active { transform: translateY(0) !important; }
  .back-btn:hover      { background: rgba(99,210,174,0.08) !important; }
  .tag-btn:hover       { border-color: rgba(99,210,174,0.5) !important; color: #63D2AE !important; }

  /* ── Destination cards ── */
  .dest-card:hover             { transform: translateY(-5px) !important; border-color: rgba(99,210,174,0.35) !important; box-shadow: 0 12px 32px rgba(0,0,0,0.4); }
  .dest-card:hover img         { transform: scale(1.07); }
  .dest-card:hover .dest-hint  { opacity: 1 !important; }

  /* ══════════════════════════════════════
     RESPONSIVE LAYOUT CLASSES
  ══════════════════════════════════════ */

  /* Form grid rows */
  .form-row-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 1.2rem; }
  .form-row-4 { display: grid; grid-template-columns: 1fr 1fr 1fr 1fr; gap: 1.2rem; }

  /* Destination grid */
  .dest-grid  { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1rem; }

  /* Result layout */
  .result-grid { display: grid; grid-template-columns: 1fr 300px; gap: 1.5rem; align-items: start; }

  /* Header */
  .header-badges { display: flex; gap: 0.5rem; align-items: center; }

  /* Planning tool grid */
  .tool-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 0.75rem; width: 100%; max-width: 520px; }

  /* ── Tablet (≤ 900px) ── */
  @media (max-width: 900px) {
    .form-row-4  { grid-template-columns: 1fr 1fr; }
    .dest-grid   { grid-template-columns: repeat(2, 1fr); }
    .result-grid { grid-template-columns: 1fr; }
  }

  /* ── Mobile (≤ 600px) ── */
  @media (max-width: 600px) {
    .form-row-2  { grid-template-columns: 1fr; gap: 0; }
    .form-row-4  { grid-template-columns: 1fr 1fr; gap: 0.75rem; }
    .dest-grid   { grid-template-columns: repeat(2, 1fr); gap: 0.75rem; }
    .result-grid { grid-template-columns: 1fr; }
    .tool-grid   { grid-template-columns: 1fr; max-width: 100%; }
    .header-badges .badge-free { display: none; }

    /* Tighten padding on mobile */
    .page-pad    { padding-left: 1rem !important; padding-right: 1rem !important; }
    .form-card   { padding: 1.3rem !important; }
    .result-card { padding: 1.3rem 1.1rem !important; }
  }

  /* ── Small mobile (≤ 400px) ── */
  @media (max-width: 400px) {
    .form-row-4 { grid-template-columns: 1fr; }
  }
`;

export const COLORS = {
  bg:          "#0A0F1E",
  surface:     "#141929",
  surfaceHigh: "#1A2035",
  border:      "rgba(255,255,255,0.07)",
  borderHover: "rgba(99,210,174,0.3)",
  accent:      "#63D2AE",
  accentDim:   "rgba(99,210,174,0.15)",
  accentGlow:  "rgba(99,210,174,0.08)",
  gold:        "#F5C842",
  goldDim:     "rgba(245,200,66,0.15)",
  text:        "#E8EAF0",
  textMuted:   "#7A8099",
  textFaint:   "#3A4060",
  error:       "#F07070",
};

export const FONTS = {
  display: "'Syne', sans-serif",
  body:    "'DM Sans', sans-serif",
};