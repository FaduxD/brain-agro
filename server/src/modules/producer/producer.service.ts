import { Prisma } from "@prisma/client";
import { ProducerRepository } from "./producer.repository";
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { ProducerMapper } from "./mappers/producer.mapper";

@Injectable()
export class ProducerService {
  constructor(private readonly producerRepository: ProducerRepository) {}

  async create(data: Prisma.ProducerCreateInput) {
    const producer = await this.producerRepository.get({
      OR: [{ cpf: data.cpf }, { cnpj: data.cnpj }],
    });

    if (producer) throw new BadRequestException("Producer already exists");

    const createdProducer = await this.producerRepository.create(data);

    return createdProducer;
  }

  async getAll() {
    const producers = await this.producerRepository.getAll();

    return producers;
  }

  async get(where: Prisma.ProducerWhereInput) {
    const producer = await this.producerRepository.get(where);

    if (!producer) throw new NotFoundException("Producer not found");

    return ProducerMapper.toResponse(producer);
  }

  async update(
    where: Prisma.ProducerWhereUniqueInput,
    data: Prisma.ProducerUpdateInput,
  ) {
    const producer = await this.producerRepository.get(where);

    if (!producer) throw new NotFoundException("Producer not found");

    if (data.cpf) {
      const producerWithCpf = await this.producerRepository.get({
        cpf: data.cpf.toString(),
      });

      if (producerWithCpf && data.cpf !== producer.cpf)
        throw new BadRequestException("CPF already exists");
    } else if (data.cnpj) {
      const producerWithCnpj = await this.producerRepository.get({
        cnpj: data.cnpj.toString(),
      });

      if (producerWithCnpj && data.cnpj !== producer.cnpj)
        throw new BadRequestException("CNPJ already exists");
    }

    const updatedProducer = await this.producerRepository.update(where, data);

    return ProducerMapper.toResponse(updatedProducer);
  }

  async remove(where: Prisma.ProducerWhereUniqueInput) {
    const producer = await this.producerRepository.get(where);

    if (!producer) throw new NotFoundException("Producer not found");

    const deletedProducer = await this.producerRepository.remove(where);

    return ProducerMapper.toResponse(deletedProducer);
  }
}
