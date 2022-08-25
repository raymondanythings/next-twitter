import { NextApiRequest, NextApiResponse } from "next";
import withHandler from "lib/server/withHandler";
import { withApiSession } from "lib/server/withSession";
async function handler(req: NextApiRequest, res: NextApiResponse) {
  req.session.destroy();
  return res.status(200).json({ ok: true });
}

export default withApiSession(
  withHandler({ methods: ["POST"], handler, isPrivate: true })
);
