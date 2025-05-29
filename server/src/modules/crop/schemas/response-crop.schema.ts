import { CropSchema } from "./crop.schema";

export const ResponseCropSchema = CropSchema.pick({
  id: true,
  farmId: true,
  plantationId: true,
  createdAt: true,
});
