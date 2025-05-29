import { PrismaService } from "@common/services/prisma/prisma.service";
import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";

@Injectable()
export class CropRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: Prisma.CropCreateManyInput) {
    const createdCrop = await this.prisma.crop.create({ data });

    return createdCrop;
  }

  async get(where: Prisma.CropWhereInput) {
    const crop = await this.prisma.crop.findFirst({ where });

    return crop;
  }

  async remove(where: Prisma.CropWhereUniqueInput) {
    const deletedCrop = await this.prisma.crop.delete({ where });

    return deletedCrop;
  }
}
