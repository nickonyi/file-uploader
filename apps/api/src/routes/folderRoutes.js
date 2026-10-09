import { Router } from "express";
import {
  createFolderController,
  getFolderController,
  getFoldersController,
  updateFolderController,
} from "../controllers/folderControllers.js";

const router = Router();

router.get("/", getFoldersController);
router.get("/:id", getFolderController);
router.post("/", createFolderController);

router.patch("/:id", updateFolderController);

export default router;
