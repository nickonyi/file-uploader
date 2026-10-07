import { Router } from "express";
import { createFolderController } from "../controllers/folderControllers.js";

const router = Router();

//router.get("/", listFiles);
router.post("/folders", createFolderController);

export default router;
