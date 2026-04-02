import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";

import authRoutes from "./routes/authRoutes.js";
import portfolioRoutes from "./routes/portfolioRoutes.js";
import aiRoutes from "./routes/aiRoutes.js";
import { errorHandler, notFound } from "./middleware/errorMiddleware.js";

dotenv.config();

const app = express();

const allowedOrigins = (process.env.CLIENT_URL || "http://localhost:5173")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

const isAllowedVercelOrigin = (origin) => /^https:\/\/[a-z0-9-]+\.vercel\.app$/i.test(origin);

app.use(
  cors({
    origin(origin, callback) {
      if (!origin || allowedOrigins.includes(origin) || isAllowedVercelOrigin(origin)) {
        callback(null, true);
        return;
      }

      callback(new Error("CORS origin not allowed"));
    }
  })
);
app.use(helmet());
app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true }));

if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}

app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

app.use("/api/auth", authRoutes);
app.use("/api/portfolio", portfolioRoutes);
app.use("/api/ai", aiRoutes);

app.use(notFound);
app.use(errorHandler);

export default app;
