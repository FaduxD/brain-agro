import { createZodDto } from "nestjs-zod";
import { ApiProperty } from "@nestjs/swagger";
import { CreateFarmSchema } from "../schemas/create-farm.schema";
import { StateCode } from "@brazilian-utils/brazilian-utils/dist/common/states";

export class CreateFarmDto extends createZodDto(CreateFarmSchema) {
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
    description: "O estado da fazenda",
    example: "SP",
    type: String,
  })
  state: StateCode;

  @ApiProperty({
    description: "A área total da fazenda",
    example: 50,
    type: Number,
  })
  totalArea: number;

  @ApiProperty({
    description: "A área de agricultura da fazenda",
    example: 10,
    type: Number,
  })
  atricultureArea: number;

  @ApiProperty({
    description: "A área de vegetação da fazenda",
    example: 10,
    type: Number,
  })
  vegetationArea: number;

  @ApiProperty({
    description: "O ID do produtor rural da fazenda",
    example: 1,
    type: Number,
  })
  producerId: number;

  plantation: Array<{ farmId: number; plantationId: number }>;
}
