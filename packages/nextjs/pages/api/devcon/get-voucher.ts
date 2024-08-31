import type { NextApiRequest, NextApiResponse } from "next";
import { isAddress, verifyMessage } from "viem";

type RequestBody = {
  signature: `0x${string}`;
  message: string;
  builderAddress: string;
};

type SuccessResponse = {
  voucher: string;
};

type ErrorResponse = {
  error: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<SuccessResponse | ErrorResponse>) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const { signature, message, builderAddress } = req.body as RequestBody;

  if (!signature || !message || !builderAddress) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  if (!isAddress(builderAddress)) {
    return res.status(400).json({ error: "Invalid Ethereum address" });
  }

  try {
    const isValid = await verifyMessage({
      address: builderAddress,
      message,
      signature,
    });

    if (!isValid) {
      return res.status(401).json({ error: "Invalid signature" });
    }
  } catch (error) {
    return res.status(400).json({ error: "Signature verification failed" });
  }
  const voucher = Math.random().toString(36).substring(2, 8).toUpperCase();

  res.status(200).json({ voucher });
}
