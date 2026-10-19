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

export const createShareInDB = async ({ folderId, token, expiresAt }) => {
  const result = await prisma.$queryRaw`
  INSERT INTO shares (token,folder_id,expires_at)
  VALUES (${token},${folderId},${expiresAt}) 
    RETURNING *
  `;

  return result[0];
};

export const getSharesFromDB = async ({ folderId }) => {
  const result = await prisma.$queryRaw`
    SELECT * FROM 
    shares WHERE 
    folder_id=${folderId}
    ORDER BY created_at DESC
  `;

  return result;
};

export const deleteSharesFromDB = async ({ id, userId }) => {
  const result = await prisma.$queryRaw`
   DELETE FROM shares s
   USING folders f
   WHERE S.id=${id}
    AND folder_id=f.id
    AND f.user_id=${userId}
   RETURNING s.id 
   
  `;

  return result[0] ?? null;
};

export const getSharedFolderFromDB = async (token) => {
  const rows = await prisma.$queryRaw`
    SELECT f.id, f.name, s.expires_at
    FROM shares s
    JOIN folders f ON f.id = s.folder_id
    WHERE s.token = ${token}
  `;

  return rows[0] ?? null;
};

export const getFilesForSharedFolderFromDB = (folderId) => {
  return prisma.$queryRaw`
    SELECT id, name, size, mime_type, created_at
    FROM files
    WHERE folder_id = ${folderId}::uuid
    ORDER BY created_at DESC
  `;
};
