import { createZodDto } from "nestjs-zod";
import { CreateProducerSchema } from "../schemas/create-producer.schema";
import { ApiProperty } from "@nestjs/swagger";

export class CreateProducerDto extends createZodDto(CreateProducerSchema) {
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
}
