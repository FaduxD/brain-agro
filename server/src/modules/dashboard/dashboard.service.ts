import { Injectable } from "@nestjs/common";
import { DashboardRepository } from "./dashboard.repository";

@Injectable()
export class DashboardService {
  constructor(private readonly dashboardRepository: DashboardRepository) {}

  async getStats() {
    const stats = await this.dashboardRepository.getStats();
    const farmsByState = await this.dashboardRepository.getByState();
    const soilArea = await this.dashboardRepository.getSoilArea();
    const crops = await this.dashboardRepository.getCrops();

    const cropsByType = crops.reduce<Record<string, number>>((acc, crop) => {
      const name = crop.plantation.name;
      acc[name] = (acc[name] || 0) + 1;
      return acc;
    }, {});

    return {
      totalFarms: stats.totalFarms,
      totalHectares: stats.totalHectares,
      farmsByState: farmsByState.map((f) => ({
        state: f.state,
        count: f._count._all,
      })),
      cropsByName: Object.entries(cropsByType).map(([name, count]) => ({
        crop: name,
        count,
      })),
      soilArea: Object.entries(soilArea._sum).map(([key, value]) => ({
        type:
          key == "vegetationArea" ? "Área de vegetação" : "Área de agricultura",
        hectares: value,
      })),
    };
  }
}
