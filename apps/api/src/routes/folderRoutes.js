import { Router } from "express";
import {
  createFolderController,
  createFolderShareController,
  deleteFolderController,
  getFolderController,
  getFoldersController,
  updateFolderController,
} from "../controllers/folderControllers.js";

const router = Router();

router.get("/", getFoldersController);
router.get("/:id", getFolderController);
router.post("/", createFolderController);
router.post("/:id/share", createFolderShareController);

router.patch("/:id", updateFolderController);
router.delete("/:id", deleteFolderController);

export default router;
