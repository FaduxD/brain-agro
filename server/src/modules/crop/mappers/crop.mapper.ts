import { Crop } from "@prisma/client";
import { ResponseCropDto } from "../dto/response-crop.dto";

export class CropMapper {
  static toResponse(crop: Crop): ResponseCropDto {
    return {
      id: crop.id,
      farmId: crop.farmId,
      plantationId: crop.plantationId,
      createdAt: crop.createdAt,
    };
  }
}
