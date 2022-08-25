import { NextApiRequest, NextApiResponse } from "next";
import withHandler from "lib/server/withHandler";
import db from "lib/server/db";
import { withApiSession } from "lib/server/withSession";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const {
    query: { id },
    session: { user },
  } = req;
  const tweet = await db.tweet.findUnique({
    where: { id: +id! },
    include: {
      user: true,
    },
  });
  const isLike = !!(await db.fav.findFirst({
    where: {
      tweetId: tweet?.id,
      userId: user?.id,
    },
    select: {
      id: true,
    },
  }));
  const result = { ...tweet, isLike };
  return res.status(200).json({ ok: true, result });
}

export default withApiSession(withHandler({ methods: ["GET"], handler }));
