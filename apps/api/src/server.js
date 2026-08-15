import express from "express";

const app = express();
const PORT = 3000;

app.use(express.json());

app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "API is running",
  });
});

app.listen(PORT, () => {
  console.log(`API running on port ${PORT}`);
});
