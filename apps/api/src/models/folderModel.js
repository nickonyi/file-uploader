import { prisma } from "../lib/prisma.js";

export const getFoldersFromDB = async (userId) => {
  const result = await prisma.$queryRaw`
     SELECT * 
     FROM folders
     WHERE user_id=${userId}
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

export const getFolderByIdFromDB = async (id, userId) => {
  const result = await prisma.$queryRaw`
     SELECT *
     FROM folders
     WHERE id=${id} AND user_id=${userId}
    `;

  return result[0] ?? null;
};

export const getFilesByFolderIdFromDB = (folderId, userId) => {
  return prisma.$queryRaw`
    SELECT * FROM files
    WHERE folder_id = ${folderId} AND user_id = ${userId}
  `;
};

export const updateFolderInDB = async ({ id, userId, name }) => {
  const result = await prisma.$queryRaw`
    UPDATE folders
    SET name=${name}, updated_at=now()
    WHERE id=${id} AND user_id=${userId}
    RETURNING *
    `;

  return result[0] ?? null;
};

export const deleteFolderInDB = async ({ id, userId }) => {
  const result = await prisma.$queryRaw`
    DELETE FROM 
    folders
    WHERE id=${id} AND user_id=${userId}
    RETURNING *
    `;

  return result[0] ?? null;
};
