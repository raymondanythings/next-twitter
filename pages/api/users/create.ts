import { NextApiRequest, NextApiResponse } from "next";
import db from "lib/server/db";
import * as bcrypt from "bcrypt";
import withHandler from "lib/server/withHandler";
import { exclude } from "lib/server/fn";
async function handler(req: NextApiRequest, res: NextApiResponse) {
  const {
    body: { email, password },
  } = req;
  const exist = await db.user.findUnique({ where: { email } });
  if (exist) {
    return res
      .status(400)
      .json({ ok: false, message: "이미 존재하는 유저입니다." });
  }
  const newPassword = await bcrypt.hash(password, 10);
  const result = await db.user.create({
    data: { email, password: newPassword },
  });
  const user = exclude(result, "password");
  return res.status(200).json({ ok: true, user });
}

export default withHandler({ methods: ["POST"], handler, isPrivate: false });
