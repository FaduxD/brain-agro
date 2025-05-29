import { FarmService } from "./farm.service";
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from "@nestjs/common";
import { CreateFarmDto } from "./dto/create-farm.dto";
import { ResponseFarmDto } from "./dto/response-farm.dto";
import { GetFarmByIdParamFarmDto } from "./dto/get-farm-by-id-param.dto";
import {
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
} from "@nestjs/swagger";
import { UpdateFarmDto } from "./dto/update-farm.dto";

@Controller("farm")
export class FarmController {
  constructor(private readonly farmService: FarmService) {}

  @Post()
  async create(@Body() body: CreateFarmDto) {
    const { plantation, ...farmData } = body;
    const createdFarm = await this.farmService.create(
      farmData,
      body.plantation,
    );

    return createdFarm;
  }

  @Get(":id")
  @ApiOkResponse({
    description: "Sucesso",
    type: ResponseFarmDto,
  })
  async get(@Param() param: GetFarmByIdParamFarmDto): Promise<ResponseFarmDto> {
    const farm = await this.farmService.get(param);

    return farm;
  }

  @Patch(":id")
  @ApiOkResponse({
    description: "Produtor rural atualizado com sucesso",
    type: ResponseFarmDto,
  })
  @ApiNotFoundResponse({
    description: "Produtor rural não encontrado",
  })
  @ApiBadRequestResponse({
    description: "Produtor rural - dados inválidos enviados",
  })
  async update(
    @Param() param: GetFarmByIdParamFarmDto,
    @Body() body: UpdateFarmDto,
  ): Promise<ResponseFarmDto> {
    const { plantation, ...farmData } = body;
    const updatedFarm = await this.farmService.update(
      param,
      farmData,
      body.plantation,
    );

    return updatedFarm;
  }

  @Delete(":id")
  @ApiOkResponse({
    description: "Produtor rural removido com sucesso",
    type: ResponseFarmDto,
  })
  @ApiNotFoundResponse({
    description: "Produtor rural não encontrado",
  })
  @ApiBadRequestResponse({
    description: "Produtor rural - dados inválidos enviados",
  })
  async remove(@Param() param: GetFarmByIdParamFarmDto) {
    const deletedFarm = await this.farmService.remove(param);

    return deletedFarm;
  }
}
