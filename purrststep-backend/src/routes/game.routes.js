import express from "express";
import { requireAuth } from "../middleware/requireAuth.js";
import { validate } from "../middleware/validate.js";
import { updateGameProgressSchema } from "../schemas/game.schema.js";
import { supabaseAdmin } from "../supabase.js";

const router = express.Router();

router.get("/progress", requireAuth, async (req, res) => {
  try {
    const userId = req.user.id;

    const { data: progress, error } = await supabaseAdmin
      .from("game_progress")
      .select("*")
      .eq("user_id", userId)
      .single();

    if (error) {
      return res.status(404).json({
        error: "Game progress not found",
        details: error.message
      });
    }

    return res.json({ progress });
  } catch (err) {
    return res.status(500).json({
      error: "Failed to fetch game progress",
      details: err.message
    });
  }
});

router.post("/progress", requireAuth, validate(updateGameProgressSchema), async (req, res) => {
  try {
    const userId = req.user.id;

    const unlockedLessons = [...new Set(req.body.unlocked_lessons)]
      .sort((a, b) => a - b);

    if (!unlockedLessons.includes(1)) {
      return res.status(400).json({
        error: "Lesson 1 must always be unlocked"
      });
    }

    if (!unlockedLessons.includes(req.body.current_lesson_id)) {
      return res.status(400).json({
        error: "Current lesson must be included in unlocked lessons"
      });
    }

    const { data: progress, error } = await supabaseAdmin
      .from("game_progress")
      .upsert(
        {
          user_id: userId,
          current_lesson_id: req.body.current_lesson_id,
          unlocked_lessons: unlockedLessons,
          current_stage: req.body.current_stage,
          rescued_mello: req.body.rescued_mello,
          updated_at: new Date().toISOString()
        },
        { onConflict: "user_id" }
      )
      .select()
      .single();

    if (error) {
      return res.status(400).json({
        error: "Failed to update game progress",
        details: error.message
      });
    }

    if (req.body.rescued_mello) {
      const { data: existingNotification } = await supabaseAdmin
        .from("notifications")
        .select("id")
        .eq("user_id", userId)
        .eq("type", "Achievements")
        .eq("detail", "You saved Mello and unlocked the first care pathway!")
        .limit(1);

      if (!existingNotification || existingNotification.length === 0) {
        await supabaseAdmin
          .from("notifications")
          .insert({
            user_id: userId,
            type: "Achievements",
            text: "earned a new badge.",
            detail: "You saved Mello and unlocked the first care pathway!"
          });
      }
    }

    return res.json({ progress });
  } catch (err) {
    return res.status(500).json({
      error: "Game progress update failed",
      details: err.message
    });
  }
});

export default router;