import { PrismaService } from "@common/services/prisma/prisma.service";
import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";

@Injectable()
export class FarmRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: Prisma.FarmCreateManyInput) {
    const createdFarm = await this.prisma.farm.create({ data });

    return createdFarm;
  }

  async createCrops(data: Prisma.CropCreateManyInput[]) {
    const createdCrops = await this.prisma.crop.createMany({ data });

    return createdCrops;
  }

  async get(where: Prisma.FarmWhereInput) {
    const farm = await this.prisma.farm.findFirst({ where });

    return farm;
  }

  async update(
    where: Prisma.FarmWhereUniqueInput,
    data: Prisma.FarmUpdateInput,
  ) {
    const updatedFarm = await this.prisma.farm.update({ where, data });

    return updatedFarm;
  }

  async removeCrops(farmId: number) {
    const crops = await this.prisma.crop.deleteMany({
      where: { farmId: farmId },
    });

    return crops;
  }

  async remove(where: Prisma.FarmWhereUniqueInput) {
    const deletedFarm = await this.prisma.farm.delete({ where });

    return deletedFarm;
  }
}
