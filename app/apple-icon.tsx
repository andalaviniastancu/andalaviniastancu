import { ImageResponse } from "next/og";
import { getSettings } from "../lib/sanity";

export const dynamic = "force-static";
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

function initials(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .map((part) => part[0])
    .join("")
    .toUpperCase()
    .slice(0, 3);
}

export default async function AppleIcon() {
  const settings = await getSettings();

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#141414",
          color: "#ebebeb",
          fontSize: 60,
          letterSpacing: -2,
          fontWeight: 500,
        }}
      >
        {initials(settings?.name ?? "Anda Lavinia Stancu")}
      </div>
    ),
    size,
  );
}
