import { NextApiResponse, NextApiRequest } from "next";
import {
  adicionarFavorito,
  listarFavoritos, removerFavorito,
} from "src/backend/favorito/ctrFavorito";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;
  if (req.method === "GET") {
    try {
      const favoritos = await listarFavoritos(Number(id));
      res.status(200).json(favoritos);
    } catch (e) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  if (req.method === "POST") {
    try {
      const interessados = await adicionarFavorito(req.body);
      return res.status(200).json(interessados);
    } catch (e) {
      return res.status(400).json({ error: e });
    }
  }

  if (req.method === "DELETE") {
    try {
      const interessados = await removerFavorito(Number(id));
      return res.status(200).json(interessados);
    } catch (e) {
      return res.status(400).json({ error: e });
    }
  }
};