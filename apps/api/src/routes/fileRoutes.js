import { Router } from "express";
import multer from "multer";
import {
  deleteFile,
  downloadFile,
  listFiles,
  uploadFile,
} from "../controllers/fileControllers.js";

const router = Router();

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 25 * 1024 * 1024,
  },
});

router.get("/", listFiles);
router.post("/uploads", upload.single("file"), uploadFile);

router.get("/:fileId/downloads", downloadFile);
router.delete("/:fileId", deleteFile);

export default router;
