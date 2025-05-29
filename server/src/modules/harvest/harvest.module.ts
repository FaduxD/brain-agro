import { Module } from "@nestjs/common";
import { HarvestService } from "./harvest.service";
import { HarvestRepository } from "./harvest.repository";
import { HarvestController } from "./harvest.controller";
import { PrismaModule } from "@common/services/prisma/prisma.module";

@Module({
  imports: [PrismaModule],
  controllers: [HarvestController],
  providers: [HarvestService, HarvestRepository],
})
export class HarvestModule {}
