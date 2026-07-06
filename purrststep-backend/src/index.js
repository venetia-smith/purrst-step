import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import { env } from "./env.js";

import adoptionRoutes from "./routes/adoption.routes.js";
import marketplaceRoutes from "./routes/marketplace.routes.js";
import authRoutes from "./routes/auth.routes.js";
import meRoutes from "./routes/me.routes.js";
import gameRoutes from "./routes/game.routes.js";
import notificationsRoutes from "./routes/notifications.routes.js";

const app = express();

app.disable("x-powered-by");

app.use(helmet());

app.use(cors({
  origin: [
    env.frontendUrl,
    "http://localhost:5173",
    "https://purrst-step-4iv6.vercel.app"
  ],
  credentials: true
}));

app.use(express.json({ limit: "100kb" }));

app.use(rateLimit({
  windowMs: 60 * 1000,
  limit: 120,
  standardHeaders: true,
  legacyHeaders: false
}));

app.get("/health", (req, res) => {
  res.json({
    ok: true,
    service: "purrst-step-backend",
    message: "Backend is running",
    environment: env.nodeEnv,
    time: new Date().toISOString()
  });
});

app.use("/api/adoption", adoptionRoutes);
app.use("/api/marketplace", marketplaceRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/me", meRoutes);
app.use("/api/game", gameRoutes);
app.use("/api/notifications", notificationsRoutes);

app.use((req, res) => {
  res.status(404).json({
    error: "Route not found",
    path: req.originalUrl
  });
});

app.use((err, req, res, next) => {
  console.error("Unhandled backend error:", err);

  res.status(500).json({
    error: "Internal server error"
  });
});

app.listen(env.port, () => {
  console.log(`Purrst Step backend running on http://localhost:${env.port}`);
});