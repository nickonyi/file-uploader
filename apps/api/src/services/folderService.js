import { createFolderInDB, getFoldersFromDB } from "../models/folderModel.js";

export const getFoldersService = async () => {
  return await getFoldersFromDB();
};

export const createFolderService = async ({ userId, name }) => {
  return createFolderInDB({ userId, name });
};
