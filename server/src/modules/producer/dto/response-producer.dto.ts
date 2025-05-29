import { createZodDto } from "nestjs-zod";
import { CreateProducerSchema } from "../schemas/create-producer.schema";
import { ApiProperty } from "@nestjs/swagger";
import { ResponseProducerSchema } from "../schemas/response-producer.schema";

export class ResponseProducerDto extends createZodDto(ResponseProducerSchema) {
  @ApiProperty({
    description: "O id do produtor rural",
    example: 1,
    type: Number,
  })
  id: number;

  @ApiProperty({
    description: "O nome do produtor rural",
    example: "Nome",
    type: String,
  })
  name: string;

  @ApiProperty({
    description: "O CPF do produtor rural",
    example: "12345678900",
    required: false,
    type: String,
  })
  cpf?: string;

  @ApiProperty({
    description: "O CNPJ do produtor rural",
    example: "12345678901234",
    required: false,
    type: String,
  })
  cnpj?: string;

  @ApiProperty({
    description: "A data de criação do produtor rural",
    example: "2025-01-01T00:00:00.000Z",
    type: Date,
  })
  createdAt: Date;
}
