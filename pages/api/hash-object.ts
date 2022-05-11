import { NextApiRequest, NextApiResponse } from "next";
import * as jwt from "jsonwebtoken";

export default async function hanlde(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const key = "asldfj;asdjfkljasdl;fj";
  if (req.method === "POST") {
    console.log(req.body);
    const token = await jwt.sign(req.body, key);
    console.log({ hashed: token });
    const d = await jwt.verify(token, key);
    console.log({ d });

    res.json({ token });
    return;
  }

  if (req.method === "GET") {
    const { token } = req.query;
    console.log({ token });
    const data = await jwt.verify(token, key);
    console.log(data);
    res.json(data);
  }
}
