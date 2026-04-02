import asyncHandler from "../utils/asyncHandler.js";
import { improvePortfolioText } from "../utils/mockAi.js";

export const improveText = asyncHandler(async (req, res) => {
  const { text = "", context = "general" } = req.body;

  if (!text.trim()) {
    res.status(400);
    throw new Error("Text is required");
  }

  const improvedText = improvePortfolioText({ text, context });

  res.json({
    originalText: text,
    improvedText,
    provider: "mock-fallback"
  });
});

