import { NextApiResponse, NextApiRequest } from "next";
import {
  adicionarCliente,
  buscarCliente,
  alterarCliente,
  removerCliente,
  listarClientes
} from "src/backend/cliente/ctrCliente";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;
  if (req.method === "GET") {
    try {
        if(id){
            const cliente = await buscarCliente(Number(id));
            res.status(200).json(cliente);
        } else{
            const cliente = await listarClientes();
            res.status(200).json(cliente);
        }
    } catch (e) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  if (req.method === "POST") {
    try {
      const cliente = await adicionarCliente(req.body);
      return res.status(200).json(cliente);
    } catch (e) {
      return res.status(400).json({ error: e });
    }
  }

  if (req.method === "PUT") {
    try {
      const cliente = await alterarCliente(Number(id), req.body);
      res.status(200).json(cliente);
    } catch (e) {
      res.status(400).json({ error: "Couldn't edit the property" });
    }
  }

  if (req.method === "DELETE") {
    try {
      const cliente = await removerCliente(Number(id));
      return res.status(200).json(cliente);
    } catch (e) {
      return res.status(400).json({ error: e });
    }
  }
};