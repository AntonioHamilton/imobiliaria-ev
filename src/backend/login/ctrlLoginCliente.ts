import { PrismaClient } from "@prisma/client";
const bcrypt = require('bcryptjs')
const prisma = new PrismaClient();
const jwt = require("jsonwebtoken");

export const login = async (req, res) => {
    try {
        const { cpf, password } = req.body
        
        if (!(cpf && password)) {
            res.status(400).send("All input is required");
        }

        const cliente = await prisma.cliente.findUnique({
            where: {
              cpf
            }
        })

        if (cliente && (await bcrypt.compare(password, cliente.password))) {
            // Create token
            const token = jwt.sign(
            { cliente_id: cliente.id, cpf },
              process.env.TOKEN_KEY,
            {
              expiresIn: "2h",
            }
            );
    
            // user
            res.status(200).json(cliente);
        }
        res.status(400).send("Invalid Credentials");

    } catch (err) {
        console.log(err);
    }
  }