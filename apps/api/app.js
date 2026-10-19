import express from "express";
import cors from "cors";
import passport from "./src/config/passportConfig.js";
import authRoutes from "./src/routes/authRoutes.js";
import fileRoutes from "./src/routes/fileRoutes.js";
import folderRoutes from "./src/routes/folderRoutes.js";
import { ensureAuth } from "./src/middlewares/authMiddleware.js";
import { sessionMiddleware } from "./src/middlewares/sessionMiddleware.js";
import { globalErrorHandler } from "./src/middlewares/errorMiddleware.js";

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:5173", "https://file-uploader-4yun.vercel.app"],
    credentials: true,
  }),
);
app.use(sessionMiddleware);
app.use(passport.session());

app.use("/api/auth", authRoutes);
app.use("/api/files", ensureAuth, fileRoutes);
app.use("/api/folders", ensureAuth, folderRoutes);
app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "API is running",
  });
});

app.use(globalErrorHandler);

export default app;
