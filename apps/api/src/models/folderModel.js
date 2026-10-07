import { prisma } from "../lib/prisma.js";

export const getFoldersFromDB = async () => {
  const result = await prisma.$queryRaw`
     SELECT * 
     FROM folders
    `;

  return result[0] ?? null;
};

export const createFolderInDB = async ({ userId, name }) => {
  const result = await prisma.$queryRaw`
    INSERT INTO folder
    (user_id,name)
    VALUES(
     ${userId},
     ${name}   
    )
    RETURNING *
    `;
};
