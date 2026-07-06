import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";

const app = express();
const PORT = process.env.PORT || 8080;

app.use(helmet());

app.use(cors({
  origin: [
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
    time: new Date().toISOString()
  });
});

app.listen(PORT, () => {
  console.log(`Purrst Step backend running on http://localhost:${PORT}`);
});