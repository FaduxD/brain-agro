import { Prisma } from "@prisma/client";
import { FarmRepository } from "./farm.repository";
import { Injectable, NotFoundException } from "@nestjs/common";
import { FarmMapper } from "./mappers/farm.mapper";

@Injectable()
export class FarmService {
  constructor(private readonly farmRepository: FarmRepository) {}

  async create(
    data: Prisma.FarmCreateManyInput,
    crops: Partial<Prisma.CropCreateManyInput[]>,
  ) {
    const createdFarm = await this.farmRepository.create(data);

    await this.farmRepository.createCrops(
      crops.map((crop) => ({ ...crop, farmId: createdFarm.id })),
    );

    return createdFarm;
  }

  async get(where: Prisma.FarmWhereInput) {
    const farm = await this.farmRepository.get(where);

    if (!farm) throw new NotFoundException("Farm not found");

    return FarmMapper.toResponse(farm);
  }

  async update(
    where: Prisma.FarmWhereUniqueInput,
    data: Prisma.FarmUpdateInput,
    crops: Partial<Prisma.CropCreateManyInput[]>,
  ) {
    const farm = await this.farmRepository.get(where);

    if (!farm) throw new NotFoundException("Farm not found");

    if (crops?.length > 0) {
      await this.farmRepository.removeCrops(farm.id);
      await this.farmRepository.createCrops(
        crops.map((crop) => ({ ...crop, farmId: farm.id })),
      );
    }

    const updatedFarm = await this.farmRepository.update(where, data);

    return FarmMapper.toResponse(updatedFarm);
  }

  async remove(where: Prisma.FarmWhereUniqueInput) {
    const farm = await this.farmRepository.get(where);

    if (!farm) throw new NotFoundException("Farm not found");

    const deletedFarm = await this.farmRepository.remove(where);

    return FarmMapper.toResponse(deletedFarm);
  }
}
