import { Router } from "express";
import multer from "multer";
import { uploadFileController } from "../controllers/fileControllers.js";

const router = Router();

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 25 * 1024 * 1024,
  },
});

router.post("/uploads", upload.single("file"), uploadFileController);

export default router;
