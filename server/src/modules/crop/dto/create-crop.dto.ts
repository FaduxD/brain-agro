import { createZodDto } from "nestjs-zod";
import { ApiProperty } from "@nestjs/swagger";
import { CreateCropSchema } from "../schemas/create-crop.schema";

export class CreateCropDto extends createZodDto(CreateCropSchema) {
  @ApiProperty({
    description: "O ID da fazenda da cultura",
    example: 1,
    type: Number,
  })
  farmId: number;

  @ApiProperty({
    description: "O ID da plantação da cultura",
    example: 1,
    type: Number,
  })
  plantationId: number;
}
