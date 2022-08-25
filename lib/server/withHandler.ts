import { NextApiResponse, NextApiRequest } from "next";

export interface ResponseType {
  ok?: boolean;
  [key: string]: any;
}

type method = "GET" | "POST" | "UPDATE" | "DELETE";

interface ConfigType<T> {
  methods: method[];
  handler: (req: NextApiRequest, res: NextApiResponse) => Promise<T>;
  isPrivate?: boolean;
}

export default function withHandler<T = any>({
  methods,
  handler,
  isPrivate = true,
}: ConfigType<T>) {
  return async function (
    req: NextApiRequest,
    res: NextApiResponse
  ): Promise<any> {
    if (req.method && !methods.includes(req.method as any)) {
      return res.status(405).end();
    }
    if (isPrivate && !req.session?.user) {
      return res.status(401).json({ ok: false });
    }
    try {
      await handler(req, res);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error });
    }
  };
}
