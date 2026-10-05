import crypto from "crypto";
import supabase from "../lib/supabase.js";
import {
  createFileInDB,
  findFolderByIdAndUser,
  findFilesByUser,
  findFileByIdFromDB,
  deleteFileFromDB,
} from "../models/fileModel.js";
import { AppError } from "../utils/appError.js";
import { prisma } from "../lib/prisma.js";

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
  const result = await findFilesByUser({ userId, folderId });
  console.log(result);

  return result;
};

export const downloadFileService = async (fileId) => {
  const file = await findFileByIdFromDB(fileId);

  if (!file) {
    throw new AppError("File not found");
  }

  const { data, error } = await supabase.storage
    .from("My_files")
    .createSignedUrl(file.storage_key, 60);

  if (error) {
    throw error;
  }

  return data.signedUrl;
};

export const deleteFileService = async (fileId, userId) => {
  const file = await findFileByIdFromDB(fileId);

  if (!file) {
    throw new AppError("File not found");
  }

  if (file.user_id !== userId) {
    throw new AppError("You are not allowed to delete file.");
  }

  const { error } = await supabase.storage
    .from("My_files")
    .remove([file.storage_key]);

  if (error) {
    throw error;
  }

  const result = await deleteFileFromDB(fileId);

  return result;
};
