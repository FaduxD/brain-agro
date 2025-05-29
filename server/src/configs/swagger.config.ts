import { INestApplication } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

export function getSwaggerDocument(app: INestApplication) {
  const config = new DocumentBuilder()
    .setTitle("Agro API")
    .setVersion("1.0")
    .addServer("http://localhost:4444")
    .build();

  return SwaggerModule.createDocument(app, config);
}
