import { z } from "zod";

export const CropSchema = z.object({
  id: z.number(),
  farmId: z.number(),
  plantationId: z.number(),
  createdAt: z.date(),
});
