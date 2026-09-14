import {
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
    console.log(savedFile);

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

    return res.status(200).json({
      success: true,
      files,
    });
  } catch (err) {
    return next(err);
  }
};
