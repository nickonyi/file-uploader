import {
  createFolderInDB,
  getFolderByIdFromDB,
  getFoldersFromDB,
  updateFolderInDB,
} from "../models/folderModel.js";
import { AppError } from "../utils/appError.js";

export const getFoldersService = async (userId) => {
  const folders = await getFoldersFromDB(userId);

  return folders;
};

export const createFolderService = async ({ userId, name }) => {
  if (typeof name !== "string" || name.trim() === "") {
    throw new AppError("You have to provide the folder name!", 400);
  }

  const trimmed = name.trim();

  if (trimmed.length > 255) {
    throw new AppError("Folder name is too long (max 255 characters)", 400);
  }

  return createFolderInDB({ userId, name: trimmed });
};

export const getFolderByIdService = async (id, userId) => {
  const folder = await getFolderByIdFromDB(id, userId);

  if (!folder) {
    throw new AppError("Folder not found", 404);
  }

  return folder;
};

export const updateFolderService = async ({ id, userId, name }) => {
  if (typeof name !== "string" || name.trim() === "") {
    throw new AppError("You have to provide the folder name!", 400);
  }

  const trimmed = name.trim();

  if (trimmed.length > 255) {
    throw new AppError("Folder name is too long (max 255 characters)", 400);
  }

  const folder = await updateFolderInDB({ id, userId, name: trimmed });

  if (!folder) {
    throw new AppError("Folder not found", 404);
  }

  return folder;
};
