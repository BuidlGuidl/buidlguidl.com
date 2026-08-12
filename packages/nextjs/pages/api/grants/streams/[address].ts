import type { NextApiRequest, NextApiResponse } from "next";
import { getStreamBuilder } from "~~/services/grants";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    return res.status(405).json({ error: "Method not allowed" });
  }

  const address = Array.isArray(req.query.address) ? req.query.address[0] : req.query.address;
  const data = address ? getStreamBuilder(address) : null;
  if (!data) return res.status(404).json({ error: "Stream not found" });

  res.setHeader("Cache-Control", "public, max-age=0, s-maxage=31536000, immutable");
  return res.status(200).json(data);
}
