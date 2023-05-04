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

            // console.log(token);
    
            // save user token
            await prisma.cliente.update({
                where: {
                    cpf
                },
                data: {
                    token
                }
            })
    
            // user
            res.status(200).json(cliente);
        }
        res.status(400).send("Invalid Credentials");

    } catch (err) {
        console.log(err);
    }
  }


  export const register = async (req, res) => {

    // Our register logic starts here
    try {
      // Get user input
      const { nome, cpf, password } = req.body;
  
      // Validate user input
      if (!(cpf && password && nome)) {
        res.status(400).send("All input is required");
      }
  
      // check if user already exist
      // Validate if user exist in our database
      const employeeAlreadyCreated = await prisma.cliente.findUnique({
        where: {
            cpf
        }
      });
  
      if (employeeAlreadyCreated) {
        return res.status(409).send("User Already Exist. Please Login");
      }
  
      //Encrypt user password
      const encryptedPassword = await bcrypt.hash(password, 10);
  
      // Create user in our database
      const cliente = await prisma.cliente.create({
        data: {
            nome,
            cpf: cpf.toLowerCase(), // sanitize: convert email to lowercase
            password: encryptedPassword,
        }
      });
  
      // Create token
      const token = jwt.sign(
        { cliente_id: cliente.id, cpf },
        process.env.TOKEN_KEY,
        {
          expiresIn: "2h",
        }
      );
      // save user token
      await prisma.cliente.update({
        where: {
            cpf
        },
        data: {
            token
        }
      })
  
      // return new user
      res.status(201).json(cliente);
    } catch (err) {
      console.log(err);
    }
    // Our register logic ends here
  };