import { IronSessionOptions } from "iron-session";
import { withIronSessionApiRoute } from "iron-session/next";
import { NextApiHandler } from "next";

declare module "iron-session" {
  interface IronSessionData {
    user?: {
      id: number;
    };
  }
}

const cookieOptions: IronSessionOptions = {
  cookieName: "Tweet-session",
  password: "x/?Eq/PQu^mx^-VY.4q6Un,<qW9YK(,{c28}M4NTk:dZLXJvU9",
  cookieOptions: {
    secure: false,
  },
};

export function withApiSession(fn: NextApiHandler) {
  return withIronSessionApiRoute(fn, cookieOptions);
}
