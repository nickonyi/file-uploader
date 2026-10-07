import { createFolderService } from "../services/folderService.js";

export const createFolderController = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const name = req.query.body;

    const folder = await createFolderService({ userId, name });

    return res
      .status(201)
      .json({ success: true, folder, message: "folder created" });
  } catch (err) {
    return next(err);
  }
};
