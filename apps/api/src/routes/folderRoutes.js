import { Router } from "express";
import {
  createFolderController,
  getFolderController,
} from "../controllers/folderControllers.js";

const router = Router();

router.get("/", getFolderController);
router.post("/", createFolderController);

export default router;
