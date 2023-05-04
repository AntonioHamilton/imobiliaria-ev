import { NextApiResponse, NextApiRequest } from "next";
import {
    adicionarInteresse,
    listarInteresses,
    removerInteresse,
} from "src/backend/interesse/ctlInteresse";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;

  if (req.method === "GET") {
    try {
      const interesses = await listarInteresses(Number(id));
      return res.status(200).json(interesses);
    } catch (e) {
      return res.status(400).json({ error: e });
    }
  }

  if (req.method === "POST") {
    try {
      const interesse = await adicionarInteresse(req.body);
      return res.status(200).json(interesse);
    } catch (e) {
      return res.status(400).json({ error: e });
    }
  }

  if (req.method === "DELETE") {
    try {
      const interesse = await removerInteresse(Number(id));
      return res.status(200).json(interesse);
    } catch (e) {
      return res.status(400).json({ error: e });
    }
  }
};
