// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(404).json({ error: "Method not allowed" });
  }
  const body: { contractId: string } = req.body;
  const contractId = body.contractId;

  const options = {
    method: "POST",
    headers: {
      accept: "application/json",
      "content-type": "application/json",
      Authorization: `Bearer ${process.env.PAPER_API_SECRET_KEY}`,
    },
    body: JSON.stringify({
      quantity: 1,
      metadata: {},
      expiresInMinutes: 15,
      usePaperKey: false,
      hideApplePayGooglePay: false,
      sendEmailOnTransferSucceeded: true,
      contractId: contractId,
    }),
  };
  const resp = await fetch(
    "https://paper.xyz/api/2022-08-12/checkout-sdk-intent",
    options
  );

  if (resp.status !== 200) {
    return res.status(500).json({ error: "Error getting user token" });
  }
  const { SDKClientSecret } = await resp.json();

  return res.status(200).json({ SDKClientSecret });
}
