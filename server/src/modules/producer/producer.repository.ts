import { PrismaService } from "@common/services/prisma/prisma.service";
import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";

@Injectable()
export class ProducerRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: Prisma.ProducerCreateInput) {
    const createdProducer = await this.prisma.producer.create({ data });

    return createdProducer;
  }

  async getAll() {
    const producers = await this.prisma.producer.findMany({
      include: {
        farms: {
          include: {
            crops: {
              include: {
                plantation: true,
              },
            },
          },
        },
      },
    });

    return producers;
  }

  async get(where: Prisma.ProducerWhereInput) {
    const producer = await this.prisma.producer.findFirst({ where });

    return producer;
  }

  async update(
    where: Prisma.ProducerWhereUniqueInput,
    data: Prisma.ProducerUpdateInput,
  ) {
    const updatedProducer = await this.prisma.producer.update({ where, data });

    return updatedProducer;
  }

  async remove(where: Prisma.ProducerWhereUniqueInput) {
    const deletedProducer = await this.prisma.producer.delete({ where });

    return deletedProducer;
  }
}
