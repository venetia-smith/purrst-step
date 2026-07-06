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
    "kitten_revealed"
  ]),
  rescued_mello: z.boolean()
});