import express from "express";
import { requireAuth } from "../middleware/requireAuth.js";
import { supabaseAdmin } from "../supabase.js";

const router = express.Router();

function formatNotificationTime(createdAt) {
  const created = new Date(createdAt);
  const now = new Date();
  const diffMs = now - created;

  const diffMinutes = Math.floor(diffMs / (1000 * 60));
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffMinutes < 1) return "Just now";
  if (diffMinutes < 60) return `${diffMinutes}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;

  return created.toLocaleDateString();
}

router.get("/", requireAuth, async (req, res) => {
  try {
    const userId = req.user.id;

    const { data, error } = await supabaseAdmin
      .from("notifications")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false })
      .limit(30);

    if (error) {
      return res.status(400).json({
        error: "Failed to fetch notifications",
        details: error.message
      });
    }

    const notifications = data.map((item) => ({
      id: item.id,
      type: item.type,
      text: item.text,
      detail: item.detail,
      read: item.read,
      time: formatNotificationTime(item.created_at),
      created_at: item.created_at
    }));

    return res.json(notifications);
  } catch (err) {
    return res.status(500).json({
      error: "Notifications fetch failed",
      details: err.message
    });
  }
});

router.post("/clear", requireAuth, async (req, res) => {
  try {
    const userId = req.user.id;

    const { error } = await supabaseAdmin
      .from("notifications")
      .delete()
      .eq("user_id", userId);

    if (error) {
      return res.status(400).json({
        error: "Failed to clear notifications",
        details: error.message
      });
    }

    return res.json({
      ok: true,
      message: "Notifications cleared successfully"
    });
  } catch (err) {
    return res.status(500).json({
      error: "Notifications clear failed",
      details: err.message
    });
  }
});

router.post("/:id/read", requireAuth, async (req, res) => {
  try {
    const userId = req.user.id;
    const notificationId = req.params.id;

    const { data, error } = await supabaseAdmin
      .from("notifications")
      .update({ read: true })
      .eq("id", notificationId)
      .eq("user_id", userId)
      .select()
      .single();

    if (error) {
      return res.status(400).json({
        error: "Failed to mark notification as read",
        details: error.message
      });
    }

    return res.json({
      ok: true,
      notification: data
    });
  } catch (err) {
    return res.status(500).json({
      error: "Notification update failed",
      details: err.message
    });
  }
});

export default router;