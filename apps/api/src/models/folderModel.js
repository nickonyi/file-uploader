import { prisma } from "../lib/prisma.js";

export const getFoldersFromDB = async () => {
  const result = await prisma.$queryRaw`
     SELECT * 
     FROM folders
    `;

  return result;
};

export const createFolderInDB = async ({ userId, name }) => {
  const result = await prisma.$queryRaw`
    INSERT INTO folders
    (user_id,name)
    VALUES(
     ${userId},
     ${name}   
    )
    RETURNING *
    `;

  return result;
};
