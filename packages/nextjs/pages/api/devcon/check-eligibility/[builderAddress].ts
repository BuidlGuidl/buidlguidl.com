import type { NextApiRequest, NextApiResponse } from "next";
import { isAddress } from "viem";

type Data = {
  isEligible: boolean;
  type: "builder" | "batch" | null;
};

type ErrorResponse = {
  error: string;
};

export default function handler(req: NextApiRequest, res: NextApiResponse<Data | ErrorResponse>) {
  const { builderAddress } = req.query;

  if (typeof builderAddress !== "string") {
    return res.status(400).json({ error: "Invalid builder address" });
  }

  // Validate the builder address
  if (!isAddress(builderAddress)) {
    return res.status(400).json({ error: "Invalid Ethereum address" });
  }

  const isEligible = Math.random() > 0.5;
  const type = isEligible ? (Math.random() > 0.5 ? "builder" : "batch") : null;

  res.status(200).json({ isEligible, type });
}
