import { createZodDto } from "nestjs-zod";
import { CreateProducerSchema } from "../schemas/create-producer.schema";
import { ApiProperty } from "@nestjs/swagger";
import { GetProducerByIdParamProducerSchema } from "../schemas/get-producer-by-id-param.schema";

export class GetProducerByIdParamProducerDto extends createZodDto(
  GetProducerByIdParamProducerSchema,
) {
  @ApiProperty({
    description: "O id do produtor rural",
    example: "1",
    type: Number,
  })
  id: number;
}
