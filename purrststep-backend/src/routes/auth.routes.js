import express from "express";
import { requireAuth } from "../middleware/requireAuth.js";
import { supabaseAdmin } from "../supabase.js";

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

router.post("/sync-user", requireAuth, async (req, res) => {
  try {
    const userId = req.user.id;
    const email = req.user.email;

    const displayName =
      req.body?.display_name ||
      email?.split("@")[0] ||
      "Cat Parent";

    const { data: profile, error: profileError } = await supabaseAdmin
      .from("profiles")
      .upsert(
        {
          id: userId,
          email,
          display_name: displayName,
          updated_at: new Date().toISOString()
        },
        { onConflict: "id" }
      )
      .select()
      .single();

    if (profileError) {
      return res.status(400).json({
        error: "Failed to sync profile",
        details: profileError.message
      });
    }

    const { error: gameError } = await supabaseAdmin
      .from("game_progress")
      .upsert(
        {
          user_id: userId,
          current_lesson_id: 1,
          unlocked_lessons: [1],
          current_stage: "intro",
          rescued_mello: false,
          updated_at: new Date().toISOString()
        },
        { onConflict: "user_id" }
      );

    if (gameError) {
      return res.status(400).json({
        error: "Failed to create game progress",
        details: gameError.message
      });
    }

    const { data: existingCats, error: catCheckError } = await supabaseAdmin
      .from("cats")
      .select("id")
      .eq("user_id", userId)
      .limit(1);

    if (catCheckError) {
      return res.status(400).json({
        error: "Failed to check cat profile",
        details: catCheckError.message
      });
    }

    if (!existingCats || existingCats.length === 0) {
      const { error: catInsertError } = await supabaseAdmin
        .from("cats")
        .insert({
          user_id: userId,
          name: "Cinnamon",
          breed: "Ginger Tabby",
          age: "1 Year",
          personality: "Playful, Escape Artist, Sunshine Worshipper",
          favorite_treat: "Salmon Pate & Crunchy Bites",
          quirk: "Meows at closed doors even if he doesn't want to go inside."
        });

      if (catInsertError) {
        return res.status(400).json({
          error: "Failed to create default cat",
          details: catInsertError.message
        });
      }
    }

    const { data: existingWelcome } = await supabaseAdmin
      .from("notifications")
      .select("id")
      .eq("user_id", userId)
      .eq("type", "Achievements")
      .eq("detail", "Welcome to Purrst Step!")
      .limit(1);

    if (!existingWelcome || existingWelcome.length === 0) {
      await supabaseAdmin
        .from("notifications")
        .insert({
          user_id: userId,
          type: "Achievements",
          text: "joined Purrst Step.",
          detail: "Welcome to Purrst Step!"
        });
    }

    return res.json({
      ok: true,
      message: "User synced successfully",
      profile
    });
  } catch (err) {
    return res.status(500).json({
      error: "User sync failed",
      details: err.message
    });
  }
});

export default router;