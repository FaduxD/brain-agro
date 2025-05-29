import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from "@nestjs/common";
import { CropService } from "./crop.service";
import { CreateCropDto } from "./dto/create-crop.dto";
import {
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
} from "@nestjs/swagger";
import { ResponseCropDto } from "./dto/response-crop.dto";
import { GetCropByIdParamCropDto } from "./dto/get-crop-by-id-param.dto";

@Controller("crop")
export class CropController {
  constructor(private readonly cropService: CropService) {}

  @Post()
  async create(@Body() body: CreateCropDto) {
    const createdCrop = await this.cropService.create(body);

    return createdCrop;
  }

  @Get(":id")
  @ApiOkResponse({
    description: "Sucesso",
    type: ResponseCropDto,
  })
  async get(@Param() param: GetCropByIdParamCropDto): Promise<ResponseCropDto> {
    const crop = await this.cropService.get(param);

    return crop;
  }

  @Delete(":id")
  @ApiOkResponse({
    description: "Produtor rural removido com sucesso",
    type: ResponseCropDto,
  })
  @ApiNotFoundResponse({
    description: "Produtor rural não encontrado",
  })
  @ApiBadRequestResponse({
    description: "Produtor rural - dados inválidos enviados",
  })
  async remove(@Param() param: GetCropByIdParamCropDto) {
    const deletedCrop = await this.cropService.remove(param);

    return deletedCrop;
  }
}
