import express from "express";

import { getPortfolio, savePortfolio } from "../controllers/portfolioController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").get(protect, getPortfolio).post(protect, savePortfolio);

export default router;

