import { createFileInDB } from "../models/fileModel.js";

export const getFolders = async () => {
  return lis;
};

export const createFolderService = async ({ userId, name }) => {
  return createFileInDB({ userId, name });
};
