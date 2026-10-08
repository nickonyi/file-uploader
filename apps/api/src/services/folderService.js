import {
  createFolderInDB,
  getFolderByIdFromDB,
  getFoldersFromDB,
} from "../models/folderModel.js";
import { AppError } from "../utils/appError.js";

export const getFoldersService = async () => {
  return await getFoldersFromDB();
};

export const createFolderService = async ({ userId, name }) => {
  return createFolderInDB({ userId, name });
};

export const getFolderByIdService = async (id, userId) => {
  const folder = await getFolderByIdFromDB(id, userId);

  if (!folder) {
    throw new AppError("Folder not found", 404);
  }

  return folder;
};
