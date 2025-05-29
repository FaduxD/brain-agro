import { createZodDto } from "nestjs-zod";
import { ApiProperty } from "@nestjs/swagger";
import { ResponseCropSchema } from "../schemas/response-crop.schema";

export class ResponseCropDto extends createZodDto(ResponseCropSchema) {
  @ApiProperty({
    description: "O id da cultura",
    example: 1,
    type: Number,
  })
  id: number;

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

  @ApiProperty({
    description: "A data de criação da cultura",
    example: "2025-01-01T00:00:00.000Z",
    type: Date,
  })
  createdAt: Date;
}
