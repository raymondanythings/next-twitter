import { NextApiRequest, NextApiResponse } from "next";
import db from "lib/server/db";
import * as bcrypt from "bcrypt";
import withHandler from "lib/server/withHandler";
async function handler(req: NextApiRequest, res: NextApiResponse) {
  const {
    body: { email, password },
  } = req;
  const exist = await db.user.findUnique({ where: { email } });
  if (exist) {
    return res.status(400).json({ ok: false });
  }
  const newPassword = await bcrypt.hash(password, 10);
  const user = await db.user.create({ data: { email, password: newPassword } });
  delete user.password;
  return res.status(200).json({ ok: true, user });
}

export default withHandler({ methods: ["POST"], handler, isPrivate: false });
