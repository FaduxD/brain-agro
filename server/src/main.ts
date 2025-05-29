import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ZodValidationPipe } from "nestjs-zod";
import { ZodValidationFilter } from "@common/http/filters/zod-validation.filter";
import { setupMiddlewares } from "@common/http/middlewares";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  setupMiddlewares(app);

  app.useGlobalPipes(new ZodValidationPipe());
  app.useGlobalFilters(new ZodValidationFilter());

  await app.listen(4444);
}
bootstrap();
