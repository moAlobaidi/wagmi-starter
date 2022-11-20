// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(404).json({ error: "Method not allowed" });
  }
  const body: { code: string } = req.body;
  const code = body.code;
  const resp = await fetch("https://paper.xyz/api/v1/oauth/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.PAPER_API_SECRET_KEY}`,
    },
    body: JSON.stringify({
      code,
      clientId: process.env.NEXT_PUBLIC_PAPER_CLIENT_ID,
    }),
  });

  if (resp.status !== 200) {
    return res.status(500).json({ error: "Error getting user token" });
  }
  const { userToken } = await resp.json();

  return res.status(200).json({ userToken });
}
