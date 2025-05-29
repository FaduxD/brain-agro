import { INestApplication } from "@nestjs/common";
import { ZodValidationPipe } from "nestjs-zod";
import { ZodValidationFilter } from "@common/http/filters/zod-validation.filter";

export function setupValidation(app: INestApplication) {
  app.useGlobalPipes(new ZodValidationPipe());
  app.useGlobalFilters(new ZodValidationFilter());
}
