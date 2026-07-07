import { z } from "zod";

const safeText = (maxLength) =>
  z
    .string()
    .trim()
    .max(maxLength)
    .regex(/^[^<>]*$/, "Text cannot contain angle brackets")
    .optional();

export const updateProfileSchema = z.object({
  display_name: safeText(80),
  handle: z
    .string()
    .trim()
    .min(3)
    .max(30)
    .regex(/^[a-zA-Z0-9_]+$/, "Handle can only contain letters, numbers, and underscores")
    .optional(),
  bio: safeText(300),
  location: safeText(120),
  private_account: z.boolean().optional()
});

export const updateSettingsSchema = z.object({
  theme: z.enum(["orange", "calico", "britishshorthair", "siamese"]).optional(),
  dark_mode: z.boolean().optional(),
  notification_likes: z.boolean().optional(),
  notification_comments: z.boolean().optional(),
  notification_follows: z.boolean().optional(),
  notification_achievements: z.boolean().optional()
});

export const updateCatSchema = z.object({
  name: safeText(80),
  breed: safeText(80),
  age: safeText(40),
  personality: safeText(200),
  favorite_treat: safeText(120),
  quirk: safeText(250),
  image_url: z.string().trim().url().max(500).optional()
});
