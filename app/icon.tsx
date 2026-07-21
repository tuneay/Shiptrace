import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 7,
          background: "#11110F",
          color: "#FFFCF6",
          fontFamily: "Arial, sans-serif",
          fontSize: 18,
          fontWeight: 800,
        }}
      >
        S<span style={{ width: 5, height: 5, marginLeft: 2, marginBottom: 14, background: "#D7FF45" }} />
      </div>
    ),
    size,
  );
}
