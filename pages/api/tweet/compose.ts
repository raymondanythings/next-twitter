import { NextApiRequest, NextApiResponse } from "next";
import withHandler from "lib/server/withHandler";
import db from "lib/server/db";
import { withApiSession } from "lib/server/withSession";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const {
    session: { user },
    body: { content },
  } = req;
  const result = await db.tweet.create({
    data: { content, userId: user?.id! },
  });
  return res.status(200).json({ ok: true, result });
}

export default withApiSession(withHandler({ methods: ["POST"], handler }));
