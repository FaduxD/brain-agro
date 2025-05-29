import { INestApplication } from "@nestjs/common";
import { apiReference } from "@scalar/nestjs-api-reference";
import { getSwaggerDocument } from "src/configs/swagger.config";

export function setupSwagger(app: INestApplication) {
  app.use(
    "/reference",
    apiReference({
      spec: {
        content: getSwaggerDocument(app),
      },
    }),
  );
}
