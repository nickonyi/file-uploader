import crypto from "crypto";
import supabase from "../lib/supabase.js";
import {
  createFileInDB,
  findFolderByIdAndUser,
  findFilesByUser,
} from "../models/fileModel.js";
import { AppError } from "../utils/appError.js";

export const uploadFileService = async ({ userId, folderId = null, file }) => {
  if (folderId) {
    const folder = await findFolderByIdAndUser({ folderId, userId });

    if (!folder) {
      throw AppError("Folder not found!");
    }
  }

  const fieldId = crypto.randomUUID();
  const storageKey = `${userId}/${fieldId}`;

  const { error: uploadError } = await supabase.storage
    .from("My_files")
    .upload(storageKey, file.buffer, {
      contentType: file.mimetype,
      upsert: false,
    });

  if (uploadError) {
    throw new AppError(uploadError || "Failed to upload file.");
  }

  const savedFile = await createFileInDB({
    userId,
    folderId,
    name: file.originalname,
    storageKey,
    mimeType: file.mimetype,
    size: file.size,
  });

  return savedFile;
};

export const listFilesService = async ({ userId, folderId = null }) => {
  return findFilesByUser({ userId, folderId });
};
