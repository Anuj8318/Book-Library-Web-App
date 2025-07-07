import express from 'express';
import { registerUser, loginUser } from '../controllers/authController.js';
import { verifyToken } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get("/me", verifyToken, (req, res) => {
  res.json(req.user); // user is attached in verifyToken middleware
});

export default router;
