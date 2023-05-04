import { NextApiResponse, NextApiRequest } from "next";
import {
  emitirContrato,
  listarContratos,
  listarContratosPorImovel,
} from "src/backend/contrato/ctrContrato";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;
  if (req.method === "GET") {
    try {
      if (id) {
        const contratos = await listarContratosPorImovel(Number(id));
        res.status(200).json(contratos);
      } else{
        const contratos = await listarContratos();
        res.status(200).json(contratos);
      }
    } catch (e) {
      res.status(500).json({ error: "Server Error" });
    }
  }

  if (req.method === "POST") {
    try {
      const contrato = await emitirContrato(req.body);

      res.status(201).json(contrato);
    } catch (e) {
      res
        .status(401)
        .json({ error: "Send the right fields to create a contract" });
    }
  }
};
