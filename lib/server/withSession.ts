import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";

// declare module "next" {
//   interface NextApiRequest {
//     req: {
//       session: {
//         user?: {
//           id: number;
//         };
//       };
//     };
//   }
// }

type Override<T1, T2> = Omit<T1, keyof T2> & T2;
export type TweetApiRequest = Override<NextApiRequest, { user?: Object }>;

function withSession(next: NextApiHandler) {
  return async function (req: TweetApiRequest, res: NextApiResponse) {
    const user = JSON.parse(localStorage.getItem("user") ?? "");
    if (!user) {
      return res.status(401).json({ ok: false });
    }
    try {
      req.user = user;
      await next(req, res);
    } catch (error) {
      return res.status(500).json({ ok: false, error });
    }
  };
}

export default withSession;
