import express from "express";

import { improveText } from "../controllers/aiController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/improve", protect, improveText);

export default router;

