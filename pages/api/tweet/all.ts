import { NextApiRequest, NextApiResponse } from "next";
import withHandler from "lib/server/withHandler";
import db from "lib/server/db";
import { withApiSession } from "lib/server/withSession";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const result = await db.tweet.findMany({
    include: {
      user: true,
      Fav: {
        where: {
          userId: req.session.user!.id,
        },
      },
    },
    orderBy: { updatedAt: "desc" },
  });
  return res.status(200).json({ ok: true, result });
}

export default withApiSession(withHandler({ methods: ["GET"], handler }));
