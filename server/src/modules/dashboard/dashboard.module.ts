import { Module } from "@nestjs/common";
import { DashboardService } from "./dashboard.service";
import { DashboardRepository } from "./dashboard.repository";
import { DashboardController } from "./dashboard.controller";
import { PrismaModule } from "@common/services/prisma/prisma.module";

@Module({
  imports: [PrismaModule],
  controllers: [DashboardController],
  providers: [DashboardService, DashboardRepository],
})
export class DashboardModule {}
