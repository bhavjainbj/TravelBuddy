export function Background() {
  return (
    <>
      {/* Base dark gradient */}
      <div style={{
        position: "fixed", inset: 0, zIndex: 0,
        background: "linear-gradient(135deg, #0A0F1E 0%, #0D1525 50%, #0A0F1E 100%)",
      }} />

      {/* Glowing orb — teal top-left */}
      <div style={{
        position: "fixed", zIndex: 0,
        top: "-15%", left: "-10%",
        width: "55vw", height: "55vw",
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(99,210,174,0.12) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />

      {/* Glowing orb — gold bottom-right */}
      <div style={{
        position: "fixed", zIndex: 0,
        bottom: "-20%", right: "-10%",
        width: "50vw", height: "50vw",
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(245,200,66,0.08) 0%, transparent 65%)",
        pointerEvents: "none",
      }} />

      {/* Subtle grid pattern */}
      <div style={{
        position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none",
        backgroundImage: `
          linear-gradient(rgba(99,210,174,0.03) 1px, transparent 1px),
          linear-gradient(90deg, rgba(99,210,174,0.03) 1px, transparent 1px)
        `,
        backgroundSize: "60px 60px",
      }} />

      {/* Noise grain */}
      <div style={{
        position: "fixed", inset: 0, zIndex: 0, opacity: 0.025, pointerEvents: "none",
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
      }} />
    </>
  );
}