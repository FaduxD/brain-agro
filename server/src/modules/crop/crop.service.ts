import { Prisma } from "@prisma/client";
import { CropRepository } from "./crop.repository";
import { Injectable, NotFoundException } from "@nestjs/common";
import { CropMapper } from "./mappers/crop.mapper";

@Injectable()
export class CropService {
  constructor(private readonly cropRepository: CropRepository) {}

  async create(data: Prisma.CropCreateManyInput) {
    const createdCrop = await this.cropRepository.create(data);

    return createdCrop;
  }

  async get(where: Prisma.CropWhereInput) {
    const crop = await this.cropRepository.get(where);

    if (!crop) throw new NotFoundException("Crop not found");

    return CropMapper.toResponse(crop);
  }

  async remove(where: Prisma.CropWhereUniqueInput) {
    const crop = await this.cropRepository.get(where);

    if (!crop) throw new NotFoundException("Crop not found");

    const deletedCrop = await this.cropRepository.remove(where);

    return CropMapper.toResponse(deletedCrop);
  }
}
