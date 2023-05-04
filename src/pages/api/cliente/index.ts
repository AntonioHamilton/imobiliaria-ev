import { NextApiResponse, NextApiRequest } from "next";
import {
  adicionarCliente,
  buscarCliente,
  alterarCliente,
  removerCliente,
  listarClientes
} from "src/backend/cliente/ctrCliente";

export default async (req: NextApiRequest, res: NextApiResponse) => {

  if (req.method === "GET") {
    try {
      const cliente = await listarClientes();
      res.status(200).json(cliente);
    }
    catch (e) {
      console.log({e})
      return res.status(404).json({ error: e });
    }
  }

  if (req.method === "POST") {
    try {
      const cliente = await adicionarCliente(req.body);
      return res.status(200).json(cliente);
    } catch (e) {
      console.log({e})
      return res.status(400).json({ error: e });
    }
  }


};