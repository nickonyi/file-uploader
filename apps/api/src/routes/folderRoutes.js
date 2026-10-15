import { Router } from "express";
import {
  createFolderController,
  createFolderShareController,
  deleteFolderController,
  deleteSharesController,
  getFolderController,
  getFoldersController,
  getFolderSharesController,
  updateFolderController,
} from "../controllers/folderControllers.js";

const router = Router();

router.get("/", getFoldersController);
router.get("/:id", getFolderController);
router.get("/:id/shares", getFolderSharesController);

router.post("/", createFolderController);
router.post("/:id/share", createFolderShareController);

router.patch("/:id", updateFolderController);
router.delete("/:id", deleteFolderController);
router.delete("/:id/shares", deleteSharesController);

export default router;
