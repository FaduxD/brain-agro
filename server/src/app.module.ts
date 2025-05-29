import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ProducerModule } from "@modules/producer/producer.module";
import { FarmModule } from "@modules/farm/farm.module";
import { HarvestModule } from "@modules/harvest/harvest.module";
import { CropModule } from "@modules/crop/crop.module";
import { DashboardModule } from "@modules/dashboard/dashboard.module";

@Module({
  imports: [
    ProducerModule,
    FarmModule,
    HarvestModule,
    CropModule,
    DashboardModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
