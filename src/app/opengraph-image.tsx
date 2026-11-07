import { ImageResponse } from "next/og";

export const alt = "For Nans: a Diwali letter";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background:
          "radial-gradient(circle at 50% 0%, #5A1220, #2A0E10 60%, #14070A)",
        color: "#FFF3DC",
      }}
    >
      <div style={{ fontSize: 28, letterSpacing: 8, color: "#F5A623" }}>
        HAPPY DIWALI
      </div>
      <div style={{ fontSize: 150, fontStyle: "italic", marginTop: 16 }}>
        For Nans
      </div>
      <div style={{ fontSize: 32, marginTop: 8, color: "#E8B04B" }}>
        08 · 12 13 · 07
      </div>
    </div>,
    size,
  );
}
