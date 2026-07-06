import { z } from "zod";

export const updateProfileSchema = z.object({
  display_name: z.string().min(1).max(80).optional(),
  handle: z
    .string()
    .min(3)
    .max(30)
    .regex(/^[a-zA-Z0-9_]+$/, "Handle can only contain letters, numbers, and underscores")
    .optional(),
  bio: z.string().max(300).optional(),
  location: z.string().max(120).optional(),
  private_account: z.boolean().optional()
});

export const updateSettingsSchema = z.object({
  theme: z.string().min(1).max(30).optional(),
  dark_mode: z.boolean().optional(),
  notification_likes: z.boolean().optional(),
  notification_comments: z.boolean().optional(),
  notification_follows: z.boolean().optional(),
  notification_achievements: z.boolean().optional()
});

export const updateCatSchema = z.object({
  name: z.string().min(1).max(80).optional(),
  breed: z.string().max(80).optional(),
  age: z.string().max(40).optional(),
  personality: z.string().max(200).optional(),
  favorite_treat: z.string().max(120).optional(),
  quirk: z.string().max(250).optional(),
  image_url: z.string().max(500).optional()
});