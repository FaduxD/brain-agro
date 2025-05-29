import { createZodDto } from "nestjs-zod";
import { CreateCropSchema } from "../schemas/create-crop.schema";
import { ApiProperty } from "@nestjs/swagger";
import { GetCropByIdParamCropSchema } from "../schemas/get-crop-by-id-param.schema";

export class GetCropByIdParamCropDto extends createZodDto(
  GetCropByIdParamCropSchema,
) {
  @ApiProperty({
    description: "O id da cultura",
    example: 1,
    type: Number,
  })
  id: number;
}
