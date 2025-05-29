import { Farm } from "@prisma/client";
import { ResponseFarmDto } from "../dto/response-farm.dto";
import { StateCode } from "@brazilian-utils/brazilian-utils/dist/common/states";

export class FarmMapper {
  static toResponse(farm: Farm): ResponseFarmDto {
    return {
      id: farm.id,
      name: farm.name,
      city: farm.city,
      state: farm.state as StateCode,
      totalArea: farm.totalArea,
      atricultureArea: farm.atricultureArea,
      vegetationArea: farm.vegetationArea,
      producerId: farm.producerId,
      createdAt: farm.createdAt,
    };
  }
}
