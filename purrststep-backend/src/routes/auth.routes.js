import express from "express";
import { requireAuth } from "../middleware/requireAuth.js";

const router = express.Router();

router.get("/check", requireAuth, (req, res) => {
  return res.json({
    ok: true,
    message: "Auth token is valid",
    user: {
      id: req.user.id,
      email: req.user.email
    }
  });
});

export default router;