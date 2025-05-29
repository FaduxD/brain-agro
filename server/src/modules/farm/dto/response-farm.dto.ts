import { createZodDto } from "nestjs-zod";
import { ApiProperty } from "@nestjs/swagger";
import { ResponseFarmSchema } from "../schemas/response-farm.schema";
import { StateCode } from "@brazilian-utils/brazilian-utils/dist/common/states";

export class ResponseFarmDto extends createZodDto(ResponseFarmSchema) {
  @ApiProperty({
    description: "O id da fazenda",
    example: 1,
    type: Number,
  })
  id: number;

  @ApiProperty({
    description: "O nome da fazenda",
    example: "Nome",
    type: String,
  })
  name: string;

  @ApiProperty({
    description: "A cidade da fazenda",
    example: "São Paulo",
    type: String,
  })
  city: string;

  @ApiProperty({
    description: "O ID do produtor da fazenda",
    example: "São Paulo",
    type: Number,
  })
  producerId: number;

  @ApiProperty({
    description: "O estado da fazenda",
    example: "SP",
    type: String,
  })
  state: StateCode;

  @ApiProperty({
    description: "A área total da fazenda",
    example: "SP",
    type: Number,
  })
  totalArea: number;

  @ApiProperty({
    description: "A área de agricultura da fazenda",
    example: "SP",
    type: Number,
  })
  atricultureArea: number;

  @ApiProperty({
    description: "A área de vegetação da fazenda",
    example: "SP",
    type: Number,
  })
  vegetationArea: number;

  @ApiProperty({
    description: "A data de criação da fazenda",
    example: "2025-01-01T00:00:00.000Z",
    type: Date,
  })
  createdAt: Date;
}
