import { PrismaService } from "@common/services/prisma/prisma.service";
import { Injectable } from "@nestjs/common";

@Injectable()
export class DashboardRepository {
  constructor(private readonly prisma: PrismaService) {}

  async getStats() {
    const [farmCount, totalAreaSum] = await Promise.all([
      this.prisma.farm.count(),
      this.prisma.farm.aggregate({
        _sum: {
          totalArea: true,
        },
      }),
    ]);

    return {
      totalFarms: farmCount,
      totalHectares: totalAreaSum._sum.totalArea ?? 0,
    };
  }

  async getByState() {
    const farmsByState = await this.prisma.farm.groupBy({
      by: ["state"],
      _count: {
        _all: true,
      },
    });

    return farmsByState;
  }

  async getSoilArea() {
    const areaSums = await this.prisma.farm.aggregate({
      _sum: {
        atricultureArea: true,
        vegetationArea: true,
      },
    });

    return areaSums;
  }

  async getCrops() {
    const crops = await this.prisma.crop.findMany({
      include: {
        plantation: {
          select: {
            name: true,
          },
        },
      },
    });

    return crops;
  }
}
