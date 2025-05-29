import { createZodDto } from "nestjs-zod";
import { CreateFarmSchema } from "../schemas/create-farm.schema";
import { ApiProperty } from "@nestjs/swagger";
import { GetFarmByIdParamFarmSchema } from "../schemas/get-farm-by-id-param.schema";

export class GetFarmByIdParamFarmDto extends createZodDto(
  GetFarmByIdParamFarmSchema,
) {
  @ApiProperty({
    description: "O id da fazenda",
    example: "1",
    type: Number,
  })
  id: number;
}
