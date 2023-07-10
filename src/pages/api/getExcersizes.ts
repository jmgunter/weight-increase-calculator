import type { NextApiRequest, NextApiResponse } from "next";
import { kv } from "@vercel/kv";

type Data = {
  name: string;
  sets: number[];
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data | null>
) {
  await kv.hset("1", {
    name: "Bench Press",
    sets: [8, 8, 8, 8, 8],
  });
  const exercise = await kv.hgetall<any>("1");
  res.status(200).json(exercise?.sets[0]);
}
