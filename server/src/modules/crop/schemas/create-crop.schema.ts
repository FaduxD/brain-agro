import { CropSchema } from "./crop.schema";

export const CreateCropSchema = CropSchema.pick({
  farmId: true,
  plantationId: true,
});
