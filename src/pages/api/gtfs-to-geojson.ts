import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // get url from request
  const { url } = req.body;

  const data = await fetch(url);
  
  res.status(200).json(data);
}
