import { NextApiRequest, NextApiResponse } from "next";
import db from "lib/server/db";
import withHandler from "lib/server/withHandler";
import { withApiSession } from "lib/server/withSession";
async function handler(req: NextApiRequest, res: NextApiResponse) {
  const {
    query: { id },
    session: { user },
  } = req;
  const alreadyLike = await db.fav.findFirst({
    where: {
      tweetId: +id!.toString(),
      userId: user?.id,
    },
  });

  if (alreadyLike) {
    await db.fav.delete({
      where: {
        id: alreadyLike.id,
      },
    });
  } else {
    await db.fav.create({
      data: {
        user: {
          connect: {
            id: user?.id,
          },
        },
        tweet: {
          connect: {
            id: +id!.toString(),
          },
        },
      },
    });
  }

  return res.status(200).json({ ok: true });
}

export default withApiSession(
  withHandler({ methods: ["POST"], handler, isPrivate: true })
);
