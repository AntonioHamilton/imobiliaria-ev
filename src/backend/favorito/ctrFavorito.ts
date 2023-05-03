import { Favorito, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const adicionarFavorito = async (favorito: Favorito) => {
  return await prisma.favorito.create({
    data: favorito,
  });
};

export const listarFavoritos = async () => {
  return await prisma.favorito.findMany();
};

export const removerFavorito = async (id: number) => {
    return await prisma.favorito.delete({ where: { id } });
  };