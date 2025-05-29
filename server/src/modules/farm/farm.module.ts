import { Module } from "@nestjs/common";
import { FarmService } from "./farm.service";
import { FarmRepository } from "./farm.repository";
import { FarmController } from "./farm.controller";
import { PrismaModule } from "@common/services/prisma/prisma.module";

@Module({
  imports: [PrismaModule],
  controllers: [FarmController],
  providers: [FarmService, FarmRepository],
})
export class FarmModule {}
