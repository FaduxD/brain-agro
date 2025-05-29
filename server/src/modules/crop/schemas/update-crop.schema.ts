import { CropSchema } from "./crop.schema";

export const UpdateCropSchema = CropSchema.pick({
  farmId: true,
  plantationId: true,
});
