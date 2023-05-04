import { Interesse, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const adicionarInteresse = async (interesse: Interesse) => {
    return await prisma.interesse.create({
      data: interesse,
    });
  };

export const listarInteresses = async (id: number) => {
    return await prisma.interesse.findMany({
      where:{
        clienteId: id
      },
      include: {
        anuncio: true,
      }
    });
  };

  export const removerInteresse = async (id: number) => {
    return await prisma.interesse.delete({ where: { id } });
  };