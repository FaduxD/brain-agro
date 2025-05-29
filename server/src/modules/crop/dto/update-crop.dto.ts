import { createZodDto } from "nestjs-zod";
import { ApiProperty } from "@nestjs/swagger";
import { UpdateCropSchema } from "../schemas/update-crop.schema";

export class UpdateCropDto extends createZodDto(UpdateCropSchema) {
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
