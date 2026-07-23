import { NextRequest } from "next/server";
import { ImageResponse } from "@vercel/og";

export const config = {
  runtime: "edge",
};

// Space Grotesk (ttf format required by Satori). Cached across warm
// invocations; null if it can't be loaded, so we still render the card.
let fontPromise: Promise<ArrayBuffer | null> | null = null;

const loadFont = (origin: string) => {
  if (!fontPromise) {
    fontPromise = fetch(`${origin}/assets/SpaceGrotesk-Bold.ttf`)
      .then(res => (res.ok ? res.arrayBuffer() : null))
      .catch(() => null);
  }
  return fontPromise;
};

export default async function handler(req: NextRequest) {
  const { searchParams, origin } = new URL(req.url);
  const title = (searchParams.get("title") || "BuidlGuidl").slice(0, 120);
  const logoUrl = `${origin}/logo.svg`;

  const font = await loadFont(origin);

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          height: "100%",
          backgroundColor: "#EFFBCA",
          backgroundImage:
            "linear-gradient(180deg, #C3DBFF 0%, rgba(217, 235, 229, 0.51) 40%, rgba(239, 251, 202, 0) 70%)",
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
        <div style={{ display: "flex", alignItems: "center" }}>
          <div
            style={{
              display: "flex",
              width: "60px",
              height: "4px",
              backgroundColor: "#808CFF",
            }}
          />
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: font ? [{ name: "Space Grotesk", data: font, style: "normal", weight: 700 }] : [],
    },
  );
}
