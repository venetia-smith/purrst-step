import express from "express";
import { supabaseAdmin } from "../supabase.js";

const router = express.Router();

router.get("/listings", async (req, res) => {
  try {
    const { type, q } = req.query;

    let query = supabaseAdmin
      .from("adoption_listings")
      .select("*")
      .eq("status", "available")
      .order("created_at", { ascending: false });

    if (type && type !== "all") {
      if (!["kitten", "cat"].includes(type)) {
        return res.status(400).json({ error: "Invalid listing type" });
      }

      query = query.eq("type", type);
    }

    if (q && String(q).trim().length > 0) {
      const search = String(q).trim();

      query = query.or(
        `name.ilike.%${search}%,breed.ilike.%${search}%,location.ilike.%${search}%`
      );
    }

    const { data, error } = await query;

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    return res.json({ listings: data });
  } catch (err) {
    return res.status(500).json({ error: "Failed to fetch adoption listings" });
  }
});

export default router;