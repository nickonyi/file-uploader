import { prisma } from "../lib/prisma.js";

export const findFolderByIdAndUser = async ({ folderId, userId }) => {
  const folder = await prisma.$queryRaw`
       SELECT id 
        FROM folders
         WHERE id=${folderId}
          AND  user_id=${userId}
    `;

  return folder[0] ?? null;
};

export const createFileInDB = async ({
  userId,
  folderId,
  name,
  storageKey,
  mimeType,
  size,
}) => {
  const file = await prisma.$queryRaw`
    INSERT into files(
      user_id,
      folder_id,
      name,
      storage_key,
      mime_type,size
    )
     VALUES (
      ${userId},
      ${folderId},
      ${name},
      ${storageKey},
      ${mimeType},
      ${size}
    )
    RETURNING
      id,
      user_id,
      folder_id,
      name,
      storage_key,
      mime_type,
      size,
      created_at,
      updated_at
`;

  return file[0] ?? null;
};
