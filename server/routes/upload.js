import express from "express";
import upload from "../middlewares/uploadMiddleware.js";

const router = express.Router();

router.post("/cover", upload.single("image"), (req, res) => {
  const filePath = `/uploads/${req.file.filename}`;
  res.json({ url: filePath });
});

export default router;
