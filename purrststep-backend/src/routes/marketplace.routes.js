import express from "express";
import { requireAuth } from "../middleware/requireAuth.js";
import { validate } from "../middleware/validate.js";
import { itemRequestSchema } from "../schemas/marketplace.schema.js";
import { supabaseAdmin } from "../supabase.js";

const router = express.Router();

router.get("/items", async (req, res) => {
  try {
    const { category } = req.query;

    let query = supabaseAdmin
      .from("marketplace_items")
      .select("*")
      .eq("status", "available")
      .order("created_at", { ascending: false });

    if (category && category !== "all") {
      if (!["food", "toys", "donation", "free"].includes(category)) {
        return res.status(400).json({ error: "Invalid marketplace category" });
      }

      query = query.eq("category", category);
    }

    const { data, error } = await query;

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    return res.json({ items: data });
  } catch (err) {
    return res.status(500).json({
      error: "Failed to fetch marketplace items",
      details: err.message
    });
  }
});

router.post("/items/:id/favorite", requireAuth, async (req, res) => {
  try {
    const userId = req.user.id;
    const itemId = req.params.id;

    const { data: item, error: itemError } = await supabaseAdmin
      .from("marketplace_items")
      .select("id, name")
      .eq("id", itemId)
      .eq("status", "available")
      .single();

    if (itemError || !item) {
      return res.status(404).json({ error: "Marketplace item not found" });
    }

    const { error } = await supabaseAdmin
      .from("favorites")
      .upsert(
        {
          user_id: userId,
          target_type: "marketplace_item",
          target_id: itemId
        },
        { onConflict: "user_id,target_type,target_id" }
      );

    if (error) {
      return res.status(400).json({
        error: "Failed to favorite item",
        details: error.message
      });
    }

    await supabaseAdmin.from("notifications").insert({
      user_id: userId,
      type: "Likes",
      text: "saved a marketplace item.",
      detail: item.name
    });

    return res.json({
      ok: true,
      message: "Item added to favorites"
    });
  } catch (err) {
    return res.status(500).json({
      error: "Favorite action failed",
      details: err.message
    });
  }
});

router.delete("/items/:id/favorite", requireAuth, async (req, res) => {
  try {
    const userId = req.user.id;
    const itemId = req.params.id;

    const { error } = await supabaseAdmin
      .from("favorites")
      .delete()
      .eq("user_id", userId)
      .eq("target_type", "marketplace_item")
      .eq("target_id", itemId);

    if (error) {
      return res.status(400).json({
        error: "Failed to remove favorite",
        details: error.message
      });
    }

    return res.json({
      ok: true,
      message: "Item removed from favorites"
    });
  } catch (err) {
    return res.status(500).json({
      error: "Remove favorite failed",
      details: err.message
    });
  }
});

router.post("/items/:id/request", requireAuth, validate(itemRequestSchema), async (req, res) => {
  try {
    const userId = req.user.id;
    const itemId = req.params.id;
    const requestType = req.body.request_type;

    const { data: item, error: itemError } = await supabaseAdmin
      .from("marketplace_items")
      .select("id, name, category, status")
      .eq("id", itemId)
      .eq("status", "available")
      .single();

    if (itemError || !item) {
      return res.status(404).json({ error: "Marketplace item not found" });
    }

    const { data: request, error } = await supabaseAdmin
      .from("item_requests")
      .insert({
        user_id: userId,
        item_id: itemId,
        request_type: requestType
      })
      .select()
      .single();

    if (error) {
      return res.status(400).json({
        error: "Failed to create marketplace request",
        details: error.message
      });
    }

    await supabaseAdmin.from("notifications").insert({
      user_id: userId,
      type: "Achievements",
      text: "submitted a marketplace request.",
      detail: `Your ${requestType} request for ${item.name} was received.`
    });

    return res.status(201).json({
      ok: true,
      message: "Marketplace request created",
      request
    });
  } catch (err) {
    return res.status(500).json({
      error: "Marketplace request failed",
      details: err.message
    });
  }
});

export default router;