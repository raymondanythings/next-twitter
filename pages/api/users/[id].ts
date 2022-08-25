import { NextApiRequest, NextApiResponse } from "next";
import db from "lib/server/db";
import withHandler from "lib/server/withHandler";
import { exclude } from "lib/server/fn";
import { withApiSession } from "lib/server/withSession";
async function handler(req: NextApiRequest, res: NextApiResponse) {
  const {
    query: { id },
  } = req;
  const exist = await db.user.findUnique({
    where: { id: +id! },
  });
  if (!exist) {
    return res
      .status(400)
      .json({ ok: false, message: "존재하지 않는 유저입니다." });
  }

  const user = exclude(exist, "password");
  return res.status(200).json({ ok: true, user });
}

export default withHandler({ methods: ["GET"], handler, isPrivate: true });
