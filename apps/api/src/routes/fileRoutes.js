import { Router } from "express";
import multer from "multer";
import { listFiles, uploadFile } from "../controllers/fileControllers.js";

const router = Router();

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 25 * 1024 * 1024,
  },
});

router.get("/", listFiles);
router.post("/uploads", upload.single("file"), uploadFile);

export default router;
