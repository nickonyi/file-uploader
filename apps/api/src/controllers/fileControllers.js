import { uploadFile } from "../services/fileService.js";

export const uploadFileController = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const folderId = req.body.folderId;
    const file = req.file;

    const savedFile = await uploadFile({ userId, folderId, file });

    return res.status(200).json({
      message: "File uploded successfully",
      file: savedFile,
    });
  } catch (err) {
    return next(err);
  }
};
