import express from "express";
import cors from "cors";
import { globalErrorHandler } from "./middlewares/errorMiddleware.js";

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "API is running",
  });
});

app.use(globalErrorHandler);

export default app;
