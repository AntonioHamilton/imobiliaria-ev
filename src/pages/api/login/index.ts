import { NextApiResponse, NextApiRequest } from "next";
import { login as loginFunc } from "src/backend/login/ctrLoginFunc";
import { login as loginCliente } from "src/backend/login/ctrlLoginCliente"

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    try {
      if (req.query.cliente) {
        return await loginCliente(req, res);
      }
      return await loginFunc(req, res);
    } catch (e) {
      console.log({e});
      res.status(400).json({ error: "Failed authenticating" });
    }
  }
};
