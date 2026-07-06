import express from "express";
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
    return res.status(500).json({ error: "Failed to fetch marketplace items" });
  }
});

export default router;