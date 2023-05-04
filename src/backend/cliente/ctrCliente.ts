import { Cliente, PrismaClient } from "@prisma/client";
const bcrypt = require("bcryptjs");

const prisma = new PrismaClient();

export const listarClientes = async () => {
    return await prisma.cliente.findMany();
  };

export const adicionarCliente = async (cliente: Cliente) => {
  return await prisma.cliente.create({
    data: cliente,
  });
};

export const buscarCliente = async (id: number) => {
    return await prisma.cliente.findMany({
        where:{ id }
  });
};

export const alterarCliente = async (id: number, data: Cliente) => {
    if (data.password) {
      let { password } = data;
      data.password = bcrypt.hashSync(password, 10);
    }
  
    return await prisma.cliente.update({
      where: {
        id,
      },
      data,
      select: {
        id: true,
        nome: true,
        email: true,
      },
    });
};

export const removerCliente = async (id: number) => {
    return await prisma.cliente.delete({ where: { id } 
    });
};