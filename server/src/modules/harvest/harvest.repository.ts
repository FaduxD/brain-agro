import { PrismaService } from "@common/services/prisma/prisma.service";
import { Injectable } from "@nestjs/common";

@Injectable()
export class HarvestRepository {
  constructor(private readonly prisma: PrismaService) {}

  async getAll() {
    const harvests = await this.prisma.plantation.findMany();

    return harvests;
  }
}
