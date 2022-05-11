import { NextApiRequest, NextApiResponse } from "next";
import * as jwt from "jsonwebtoken";

export default async function hanlde(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const key = process.env.SECRET_KEY;
  if (req.method === "POST") {
    const token = await jwt.sign(req.body, key);
    res.json({ token });
    return;
  }

  if (req.method === "GET") {
    const { token } = req.query;
    const data = await jwt.verify(token, key);
    res.json(data);
  }
}
