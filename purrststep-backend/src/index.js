import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import { env } from "./env.js";
import { supabaseAdmin } from "./supabase.js";
import adoptionRoutes from "./routes/adoption.routes.js";
import marketplaceRoutes from "./routes/marketplace.routes.js";
import authRoutes from "./routes/auth.routes.js";
import meRoutes from "./routes/me.routes.js";
import gameRoutes from "./routes/game.routes.js";
import notificationsRoutes from "./routes/notifications.routes.js";

const app = express();

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
    message: "Backend is running with env config",
    environment: env.nodeEnv,
    time: new Date().toISOString()
  });
});

app.get("/supabase-health", async (req, res) => {
  try {
    const { data, error } = await supabaseAdmin.auth.admin.listUsers({
      page: 1,
      perPage: 1
    });

    if (error) {
      return res.status(500).json({
        ok: false,
        message: "Supabase connection failed",
        error: error.message
      });
    }

    return res.json({
      ok: true,
      message: "Backend connected to Supabase successfully",
      usersChecked: data.users.length
    });
  } catch (err) {
    return res.status(500).json({
      ok: false,
      message: "Supabase test crashed",
      error: err.message
    });
  }
});

app.use("/api/adoption", adoptionRoutes);
app.use("/api/marketplace", marketplaceRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/me", meRoutes);
app.use("/api/game", gameRoutes);
app.use("/api/notifications", notificationsRoutes);

app.listen(env.port, () => {
  console.log(`Purrst Step backend running on http://localhost:${env.port}`);
});