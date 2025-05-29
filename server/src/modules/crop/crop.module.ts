import { Module } from "@nestjs/common";
import { CropService } from "./crop.service";
import { CropRepository } from "./crop.repository";
import { CropController } from "./crop.controller";
import { PrismaModule } from "@common/services/prisma/prisma.module";

@Module({
  imports: [PrismaModule],
  controllers: [CropController],
  providers: [CropService, CropRepository],
})
export class CropModule {}
