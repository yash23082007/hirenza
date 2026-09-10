import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "HIRENZA — The Offline-First Prep OS for Power Users";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "space-between",
          backgroundColor: "#08080c",
          backgroundImage:
            "radial-gradient(circle at 25px 25px, #1a1a2e 2%, transparent 0%), radial-gradient(circle at 75px 75px, #131322 2%, transparent 0%)",
          backgroundSize: "100px 100px",
          padding: "80px",
          color: "#ffffff",
          fontFamily: "sans-serif",
        }}
      >
        {/* Top Brand */}
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <div
            style={{
              width: "48px",
              height: "48px",
              borderRadius: "12px",
              background: "linear-gradient(135deg, #a855f7 0%, #6366f1 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 0 30px rgba(168, 85, 247, 0.4)",
            }}
          >
            <div
              style={{
                width: "24px",
                height: "24px",
                borderRadius: "6px",
                border: "3px solid #ffffff",
              }}
            />
          </div>
          <span
            style={{
              fontSize: "36px",
              fontWeight: 900,
              letterSpacing: "-0.04em",
              color: "#ffffff",
            }}
          >
            hirenza
          </span>
          <span
            style={{
              marginLeft: "12px",
              padding: "6px 14px",
              borderRadius: "999px",
              backgroundColor: "rgba(168, 85, 247, 0.15)",
              border: "1px solid rgba(168, 85, 247, 0.4)",
              color: "#c084fc",
              fontSize: "14px",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.08em",
            }}
          >
            Offline-First
          </span>
        </div>

        {/* Center Headlines */}
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <div
            style={{
              fontSize: "64px",
              fontWeight: 900,
              lineHeight: 1.1,
              letterSpacing: "-0.03em",
              background: "linear-gradient(135deg, #ffffff 0%, #cbd5e1 50%, #94a3b8 100%)",
              backgroundClip: "text",
              color: "transparent",
            }}
          >
            Prep like it&apos;s production.
          </div>
          <div
            style={{
              fontSize: "26px",
              color: "#94a3b8",
              maxWidth: "850px",
              lineHeight: 1.4,
            }}
          >
            Sheets, patterns, SQL, system design, and your personal Leitner memory engine — 100% offline-first. No account required.
          </div>
        </div>

        {/* Bottom Stats Pills */}
        <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              padding: "12px 24px",
              borderRadius: "16px",
              backgroundColor: "#11111a",
              border: "1px solid #262638",
            }}
          >
            <span style={{ fontSize: "20px", fontWeight: 800, color: "#ffffff" }}>600+</span>
            <span style={{ fontSize: "15px", color: "#64748b" }}>Problems</span>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              padding: "12px 24px",
              borderRadius: "16px",
              backgroundColor: "#11111a",
              border: "1px solid #262638",
            }}
          >
            <span style={{ fontSize: "20px", fontWeight: 800, color: "#a855f7" }}>124</span>
            <span style={{ fontSize: "15px", color: "#64748b" }}>Patterns</span>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              padding: "12px 24px",
              borderRadius: "16px",
              backgroundColor: "#11111a",
              border: "1px solid #262638",
            }}
          >
            <span style={{ fontSize: "20px", fontWeight: 800, color: "#38bdf8" }}>6 Companies</span>
            <span style={{ fontSize: "15px", color: "#64748b" }}>Tracked</span>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              padding: "12px 24px",
              borderRadius: "16px",
              backgroundColor: "#11111a",
              border: "1px solid #262638",
            }}
          >
            <span style={{ fontSize: "20px", fontWeight: 800, color: "#34d399" }}>0</span>
            <span style={{ fontSize: "15px", color: "#64748b" }}>Trackers / Cookies</span>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
