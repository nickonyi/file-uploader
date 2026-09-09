import crypto from "crypto";
import supabase from "../lib/supabase";
import { createFileInDB, findFolderByIdAndUser } from "../models/fileModel.js";
import { AppError } from "../utils/appError.js";

export const uploadFile = async ({ userId, folderId = null, file }) => {
  if (folderId) {
    const folder = await findFolderByIdAndUser({ folderId, userId });

    if (!folder) {
      throw AppError("Folder not found!");
    }
  }

  const fieldId = crypto.randomUUID();
  const storageKey = `${userId}/${fieldId}`;

  const { error: uploadError } = await supabase.storage
    .from("files")
    .upload(storageKey, file.buffer, {
      contentType: file.mimeType,
      upsert: false,
    });

  if (uploadError) {
    throw new AppError("Failed to upload file.");
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
