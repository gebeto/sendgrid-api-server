import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  method: "POST" | "GET";
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === "POST") {
    res.status(200).json({ method: "POST" });
  } else {
    res.status(200).json({ method: "GET" });
  }
}
