import { Producer } from "@prisma/client";
import { ResponseProducerDto } from "../dto/response-producer.dto";

export class ProducerMapper {
  static toResponse(producer: Producer): ResponseProducerDto {
    return {
      id: producer.id,
      name: producer.name,
      cpf: producer.cpf,
      cnpj: producer.cnpj,
      createdAt: producer.createdAt,
    };
  }
}
