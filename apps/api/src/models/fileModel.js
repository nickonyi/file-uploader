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
