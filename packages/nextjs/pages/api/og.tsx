import { NextRequest } from "next/server";
import { ImageResponse } from "@vercel/og";

export const config = {
  runtime: "edge",
};

export default async function handler(req: NextRequest) {
  const { searchParams, origin } = new URL(req.url);
  const title = searchParams.get("title") || "BuidlGuidl";
  const logoUrl = `${origin}/logo.svg`;

  // Space Grotesk (ttf format required by Satori)
  const font = await fetch(
    "https://fonts.gstatic.com/s/spacegrotesk/v22/V8mQoQDjQSkFtoMM3T6r8E7mF71Q-gOoraIAEj4PVksj.ttf",
  ).then(res => res.arrayBuffer());

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          height: "100%",
          backgroundColor: "#EFFBCA",
          padding: "60px",
          justifyContent: "space-between",
          fontFamily: "Space Grotesk",
        }}
      >
        {/* Top: Logo */}
        <div style={{ display: "flex", justifyContent: "flex-start" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={logoUrl} width={220} height={44} alt="" />
        </div>

        {/* Center: Blog Title */}
        <div
          style={{
            display: "flex",
            fontSize: title.length > 60 ? 48 : title.length > 40 ? 56 : 64,
            color: "#182232",
            fontWeight: 700,
            lineHeight: 1.15,
            maxWidth: "95%",
          }}
        >
          {title}
        </div>

        {/* Bottom: decorative line */}
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <div
            style={{
              display: "flex",
              width: "60px",
              height: "4px",
              backgroundColor: "#808CFF",
            }}
          />
          <div
            style={{
              display: "flex",
              width: "100%",
              height: "2px",
              backgroundColor: "#182232",
              opacity: 0.15,
            }}
          />
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: "Space Grotesk",
          data: font,
          style: "normal",
          weight: 700,
        },
      ],
    },
  );
}
