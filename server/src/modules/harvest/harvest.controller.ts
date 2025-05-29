import { Controller, Get } from "@nestjs/common";
import { HarvestService } from "./harvest.service";

@Controller("harvest")
export class HarvestController {
  constructor(private readonly harvestService: HarvestService) {}

  @Get()
  async getAll() {
    const harvests = await this.harvestService.getAll();

    return harvests;
  }
}
