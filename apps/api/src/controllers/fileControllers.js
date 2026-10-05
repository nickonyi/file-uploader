import {
  deleteFileService,
  downloadFileService,
  listFilesService,
  uploadFileService,
} from "../services/fileService.js";

export const uploadFile = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { folderId } = req.body;

    const file = req.file;

    const savedFile = await uploadFileService({
      userId,
      folderId: folderId || null,
      file,
    });

    return res.status(200).json({
      message: "File uploded successfully",
      file: savedFile,
    });
  } catch (err) {
    return next(err);
  }
};

export const listFiles = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const folderId = req.query.folderId;

    const files = await listFilesService({ userId, folderId });
    console.log(files);

    return res.status(200).json({
      success: true,
      files,
    });
  } catch (err) {
    return next(err);
  }
};

export const downloadFile = async (req, res, next) => {
  try {
    const { fileId } = req.params;

    const downloadFileUrl = await downloadFileService(fileId);

    return res.status(200).json({
      downloadFileUrl,
    });
  } catch (err) {
    return next(err);
  }
};

export const deleteFile = async (req, res, next) => {
  try {
    const { fileId } = req.params;
    const userId = req.user.id;

    await deleteFileService(fileId, userId);

    return res.status(200).json({
      success: true,
      message: "File deleted successfully",
    });
  } catch (err) {
    return next(err);
  }
};
