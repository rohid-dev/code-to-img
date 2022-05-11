import { NextApiRequest, NextApiResponse } from "next";
import * as bcrypt from "bcrypt";

export default async function hanlde(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // console.log(req.body);
  // const hashed = await bcrypt.hash("Hello world", 10);
  // console.log({ hashed });
}
