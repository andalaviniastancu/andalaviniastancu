import { ImageResponse } from "next/og";
import { getSettings } from "../lib/sanity";

export const dynamic = "force-static";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Anda Lavinia Stancu";

export default async function OpengraphImage() {
  const settings = await getSettings();

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#ebebeb",
          color: "#141414",
        }}
      >
        <div style={{ fontSize: 92, letterSpacing: -3, fontWeight: 500 }}>
          {settings?.name ?? "Anda Lavinia Stancu"}
        </div>
        <div style={{ fontSize: 30, color: "#636363", marginTop: 20 }}>
          {settings?.role ?? ""}
        </div>
      </div>
    ),
    size,
  );
}
