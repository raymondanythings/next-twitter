import { NextApiRequest, NextApiResponse } from "next";
import db from "lib/server/db";
import withHandler from "lib/server/withHandler";
import { exclude } from "lib/server/fn";
import { withApiSession } from "lib/server/withSession";
async function handler(req: NextApiRequest, res: NextApiResponse) {
  const {
    body: { email, name },
  } = req;
  const exist = await db.user.findUnique({
    where: { id: req.session.user!.id },
  });
  if (!exist) {
    return res
      .status(400)
      .json({ ok: false, message: "존재하지 않는 유저입니다." });
  }

  const result = await db.user.update({
    where: { id: req.session.user?.id },
    data: { email, name },
  });

  const user = exclude(result, "password");
  return res.status(200).json({ ok: true, user });
}

export default withApiSession(withHandler({ methods: ["POST"], handler }));
