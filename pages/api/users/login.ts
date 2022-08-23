import { NextApiRequest, NextApiResponse } from "next";
import db from "lib/server/db";
import * as bcrypt from "bcrypt";
import withHandler from "lib/server/withHandler";
import { exclude } from "lib/server/fn";
import { withApiSession } from "lib/server/withSession";
async function handler(req: NextApiRequest, res: NextApiResponse) {
  const {
    body: { email, password },
  } = req;

  const session = req.session;
  const currentUser = await db.user.findUnique({ where: { email } });
  if (!currentUser) {
    return res
      .status(400)
      .json({ ok: false, message: "존재하지 않는 유저입니다." });
  }
  const passwordCurrent = await bcrypt.compare(password, currentUser.password);
  if (!passwordCurrent) {
    return res
      .status(400)
      .json({ ok: false, message: "비밀번호가 일치하지 않습니다." });
  }
  const user = exclude(currentUser, "password");

  session.user = {
    id: user.id,
  };
  await session.save();
  return res.status(200).json({ ok: true, user });
}

export default withApiSession(
  withHandler({ methods: ["POST"], handler, isPrivate: false })
);
