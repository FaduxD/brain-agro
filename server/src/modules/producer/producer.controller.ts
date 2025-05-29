import { Prisma } from "@prisma/client";
import { ProducerService } from "./producer.service";
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from "@nestjs/common";
import { CreateProducerDto } from "./dto/create-producer.dto";
import { ResponseProducerDto } from "./dto/response-producer.dto";
import { GetProducerByIdParamProducerDto } from "./dto/get-producer-by-id-param.dto";
import {
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
} from "@nestjs/swagger";
import { UpdateProducerDto } from "./dto/update-producer.dto";

@Controller("producer")
export class ProducerController {
  constructor(private readonly producerService: ProducerService) {}

  @Post()
  async create(@Body() body: CreateProducerDto) {
    const createdProducer = await this.producerService.create(body);

    return createdProducer;
  }

  @Get()
  @ApiOkResponse({
    description: "Sucesso",
    type: [ResponseProducerDto],
    isArray: true,
  })
  async getAll(): Promise<ResponseProducerDto[]> {
    const producers = await this.producerService.getAll();

    return producers;
  }

  @Get(":id")
  @ApiOkResponse({
    description: "Sucesso",
    type: ResponseProducerDto,
  })
  async get(
    @Param() param: GetProducerByIdParamProducerDto,
  ): Promise<ResponseProducerDto> {
    const producer = await this.producerService.get(param);

    return producer;
  }

  @Patch(":id")
  @ApiOkResponse({
    description: "Produtor rural atualizado com sucesso",
    type: ResponseProducerDto,
  })
  @ApiNotFoundResponse({
    description: "Produtor rural não encontrado",
  })
  @ApiBadRequestResponse({
    description: "Produtor rural - dados inválidos enviados",
  })
  async update(
    @Param() param: GetProducerByIdParamProducerDto,
    @Body() body: UpdateProducerDto,
  ): Promise<ResponseProducerDto> {
    const updatedProducer = await this.producerService.update(param, body);

    return updatedProducer;
  }

  @Delete(":id")
  @ApiOkResponse({
    description: "Produtor rural removido com sucesso",
    type: ResponseProducerDto,
  })
  @ApiNotFoundResponse({
    description: "Produtor rural não encontrado",
  })
  @ApiBadRequestResponse({
    description: "Produtor rural - dados inválidos enviados",
  })
  async remove(@Param() param: GetProducerByIdParamProducerDto) {
    const deletedProducer = await this.producerService.remove(param);

    return deletedProducer;
  }
}
