import { INestApplication } from "@nestjs/common";
import { setupSwagger } from "./swagger.middleware";
import { setupValidation } from "./validation.middleware";

export function setupMiddlewares(app: INestApplication) {
  setupSwagger(app);
  setupValidation(app);
}
