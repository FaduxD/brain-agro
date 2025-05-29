import { Module } from "@nestjs/common";
import { ProducerService } from "./producer.service";
import { ProducerRepository } from "./producer.repository";
import { ProducerController } from "./producer.controller";
import { PrismaModule } from "@common/services/prisma/prisma.module";

@Module({
  imports: [PrismaModule],
  controllers: [ProducerController],
  providers: [ProducerService, ProducerRepository],
})
export class ProducerModule {}
