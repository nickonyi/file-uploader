import { Router } from "express";
import {
  createFolderController,
  getFolderController,
  getFoldersController,
} from "../controllers/folderControllers.js";

const router = Router();

router.get("/", getFoldersController);
router.get("/:id", getFolderController);
router.post("/", createFolderController);

export default router;
