import express from "express";
import { requireAuth } from "../middleware/requireAuth.js";
import { validate } from "../middleware/validate.js";
import {
  updateProfileSchema,
  updateSettingsSchema,
  updateCatSchema
} from "../schemas/profile.schema.js";
import { supabaseAdmin } from "../supabase.js";

const router = express.Router();

router.get("/", requireAuth, async (req, res) => {
  try {
    const userId = req.user.id;

    const { data: profile, error: profileError } = await supabaseAdmin
      .from("profiles")
      .select("*")
      .eq("id", userId)
      .single();

    if (profileError) {
      return res.status(404).json({
        error: "Profile not found",
        details: profileError.message
      });
    }

    const { data: cats, error: catsError } = await supabaseAdmin
      .from("cats")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: true })
      .limit(1);

    if (catsError) {
      return res.status(400).json({
        error: "Failed to fetch cat profile",
        details: catsError.message
      });
    }

    return res.json({
      profile,
      cat: cats?.[0] || null
    });
  } catch (err) {
    return res.status(500).json({
      error: "Failed to fetch user profile",
      details: err.message
    });
  }
});

router.patch("/profile", requireAuth, validate(updateProfileSchema), async (req, res) => {
  try {
    const userId = req.user.id;

    const { data: profile, error } = await supabaseAdmin
      .from("profiles")
      .update({
        ...req.body,
        updated_at: new Date().toISOString()
      })
      .eq("id", userId)
      .select()
      .single();

    if (error) {
      return res.status(400).json({
        error: "Failed to update profile",
        details: error.message
      });
    }

    return res.json({ profile });
  } catch (err) {
    return res.status(500).json({
      error: "Profile update failed",
      details: err.message
    });
  }
});

router.patch("/settings", requireAuth, validate(updateSettingsSchema), async (req, res) => {
  try {
    const userId = req.user.id;

    const { data: profile, error } = await supabaseAdmin
      .from("profiles")
      .update({
        ...req.body,
        updated_at: new Date().toISOString()
      })
      .eq("id", userId)
      .select()
      .single();

    if (error) {
      return res.status(400).json({
        error: "Failed to update settings",
        details: error.message
      });
    }

    return res.json({ profile });
  } catch (err) {
    return res.status(500).json({
      error: "Settings update failed",
      details: err.message
    });
  }
});

router.patch("/cat", requireAuth, validate(updateCatSchema), async (req, res) => {
  try {
    const userId = req.user.id;

    const { data: existingCats, error: checkError } = await supabaseAdmin
      .from("cats")
      .select("id")
      .eq("user_id", userId)
      .limit(1);

    if (checkError) {
      return res.status(400).json({
        error: "Failed to check cat profile",
        details: checkError.message
      });
    }

    if (!existingCats || existingCats.length === 0) {
      const { data: createdCat, error: createError } = await supabaseAdmin
        .from("cats")
        .insert({
          user_id: userId,
          name: req.body.name || "Cinnamon",
          ...req.body
        })
        .select()
        .single();

      if (createError) {
        return res.status(400).json({
          error: "Failed to create cat profile",
          details: createError.message
        });
      }

      return res.status(201).json({ cat: createdCat });
    }

    const catId = existingCats[0].id;

    const { data: cat, error } = await supabaseAdmin
      .from("cats")
      .update({
        ...req.body,
        updated_at: new Date().toISOString()
      })
      .eq("id", catId)
      .eq("user_id", userId)
      .select()
      .single();

    if (error) {
      return res.status(400).json({
        error: "Failed to update cat profile",
        details: error.message
      });
    }

    return res.json({ cat });
  } catch (err) {
    return res.status(500).json({
      error: "Cat profile update failed",
      details: err.message
    });
  }
});

export default router;