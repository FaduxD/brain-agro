import { createZodDto } from "nestjs-zod";
import { CreateProducerSchema } from "../schemas/create-producer.schema";
import { ApiProperty } from "@nestjs/swagger";
import { ResponseProducerSchema } from "../schemas/response-producer.schema";
import { UpdateProducerSchema } from "../schemas/update-producer.schema";

export class UpdateProducerDto extends createZodDto(UpdateProducerSchema) {
  @ApiProperty({
    description: "O nome do produtor rural",
    example: "Nome",
    required: false,
    type: String,
  })
  name?: string;

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
