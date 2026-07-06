import { z } from "zod";

export const itemRequestSchema = z.object({
  request_type: z.enum(["buy", "donate", "claim"])
});