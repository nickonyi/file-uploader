import {
  createFolderService,
  getFolderByIdService,
  getFoldersService,
  updateFolderService,
} from "../services/folderService.js";

export const createFolderController = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { name } = req.body;

    const folder = await createFolderService({ userId, name });

    return res
      .status(201)
      .json({ success: true, folder, message: "folder created" });
  } catch (err) {
    return next(err);
  }
};

export const getFoldersController = async (req, res, next) => {
  try {
    const userId = req.user.id;

    const folders = await getFoldersService(userId);

    return res.status(200).json({
      success: true,
      folders,
    });
  } catch (err) {
    return next(err);
  }
};

export const getFolderController = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    const folder = await getFolderByIdService(id, userId);

    return res.status(200).json({
      success: true,
      folder,
    });
  } catch (err) {
    return next(err);
  }
};

export const updateFolderController = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const userId = req.user.id;
    const folder = await updateFolderService({ id, userId, name });

    return res.status(200).json({
      success: true,
      folder,
    });
  } catch (err) {
    return next(err);
  }
};
