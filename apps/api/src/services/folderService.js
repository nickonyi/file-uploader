import {
  createFolderInDB,
  createShareInDB,
  deleteFolderInDB,
  deleteSharesFromDB,
  getFolderByIdFromDB,
  getFoldersFromDB,
  getSharesFromDB,
  updateFolderInDB,
} from "../models/folderModel.js";
import { AppError } from "../utils/appError.js";
import crypto from "crypto";

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

export const deleteFolderService = async ({ id, userId }) => {
  const deleted = await deleteFolderInDB({ id, userId });

  if (!deleted) {
    throw new AppError("Folder not found", 404);
  }
};

export const createFolderShareService = async ({ id, userId, hours }) => {
  const MAX_HOURS = 24 * 30;
  if (!Number.isInteger(hours) || hours < 1 || hours > MAX_HOURS) {
    throw new AppError("Invalid share duration", 400);
  }

  const folder = await getFolderByIdFromDB(id, userId);
  if (!folder) {
    throw new AppError("Folder not found", 404);
  }

  const expiresAt = new Date(Date.now() + hours * 60 * 60 * 1000);
  const token = crypto.randomBytes(32).toString("base64url");

  const share = await createShareInDB({ folderId: id, token, expiresAt });

  return {
    url: `${process.env.CLIENT_URL}/shared/${share.token}`,
    expires_at: share.expires_at,
  };
};

export const getFolderSharesService = async ({ folderId }) => {
  const result = await getSharesFromDB({ folderId });

  return result;
};

export const deleteSharesService = async ({ id, userId }) => {
  const deleted = await deleteSharesFromDB({ id, userId });

  if (!deleted) {
    throw new AppError("Share not found", 404);
  }
};
