import express from "express";
import { requireAuth } from "../middleware/requireAuth.js";
import { supabaseAdmin } from "../supabase.js";

const router = express.Router();

function sanitizeSearchQuery(value) {
  const search = String(value || "")
    .trim()
    .slice(0, 60)
    .replace(/[%_,()]/g, "");

  if (!search) return "";

  if (!/^[a-zA-Z0-9\s-]+$/.test(search)) {
    return null;
  }

  return search;
}

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
      const search = sanitizeSearchQuery(q);

      if (search === null) {
        return res.status(400).json({ error: "Invalid search query" });
      }

      if (search) {
        query = query.or(
          `name.ilike.%${search}%,breed.ilike.%${search}%,location.ilike.%${search}%`
        );
      }
    }

    const { data, error } = await query;

    if (error) {
      return res.status(400).json({ error: "Failed to fetch adoption listings" });
    }

    return res.json({ listings: data });
  } catch (err) {
    console.error("Adoption listings fetch failed:", err);
    return res.status(500).json({
      error: "Failed to fetch adoption listings"
    });
  }
});

router.post("/listings/:id/favorite", requireAuth, async (req, res) => {
  try {
    const userId = req.user.id;
    const listingId = req.params.id;

    const { data: listing, error: listingError } = await supabaseAdmin
      .from("adoption_listings")
      .select("id, name")
      .eq("id", listingId)
      .eq("status", "available")
      .single();

    if (listingError || !listing) {
      return res.status(404).json({
        error: "Adoption listing not found"
      });
    }

    const { error } = await supabaseAdmin
      .from("favorites")
      .upsert(
        {
          user_id: userId,
          target_type: "adoption_listing",
          target_id: listingId
        },
        { onConflict: "user_id,target_type,target_id" }
      );

    if (error) {
      return res.status(400).json({
        error: "Failed to favorite adoption listing"
      });
    }

    await supabaseAdmin.from("notifications").insert({
      user_id: userId,
      type: "Likes",
      text: "saved an adoption listing.",
      detail: listing.name
    });

    return res.json({
      ok: true,
      message: "Adoption listing added to favorites"
    });
  } catch (err) {
    console.error("Favorite adoption listing failed:", err);
    return res.status(500).json({
      error: "Favorite adoption listing failed"
    });
  }
});

router.delete("/listings/:id/favorite", requireAuth, async (req, res) => {
  try {
    const userId = req.user.id;
    const listingId = req.params.id;

    const { error } = await supabaseAdmin
      .from("favorites")
      .delete()
      .eq("user_id", userId)
      .eq("target_type", "adoption_listing")
      .eq("target_id", listingId);

    if (error) {
      return res.status(400).json({
        error: "Failed to remove adoption favorite"
      });
    }

    return res.json({
      ok: true,
      message: "Adoption listing removed from favorites"
    });
  } catch (err) {
    console.error("Remove adoption favorite failed:", err);
    return res.status(500).json({
      error: "Remove adoption favorite failed"
    });
  }
});

export default router;
