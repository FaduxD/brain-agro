import { Injectable } from "@nestjs/common";
import { HarvestRepository } from "./harvest.repository";

@Injectable()
export class HarvestService {
  constructor(private readonly harvestRepository: HarvestRepository) {}

  async getAll() {
    const harvests = await this.harvestRepository.getAll();

    return harvests;
  }
}
