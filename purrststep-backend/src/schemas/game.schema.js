import { z } from "zod";

export const updateGameProgressSchema = z.object({
  current_lesson_id: z.number().int().min(1).max(10),

  unlocked_lessons: z
    .array(z.number().int().min(1).max(10))
    .min(1)
    .max(10),

  current_stage: z.enum([
    "intro",
    "story_scene",
    "entrance_scene",
    "kitten_revealed",
    "player_see_kitty",
    "player_confused",
    "wisp_scene",
    "portal_scene",
    "lesson1_intro",
    "lesson1_uncomfortable_room",
    "lesson1_safety_lesson",
    "lesson1_puzzle",
    "lesson1_kitten_box",
    "lesson1_key_reward",
    "lesson1_door_unlock",
    "lesson1_complete"
  ]),

  rescued_mello: z.boolean()
});
