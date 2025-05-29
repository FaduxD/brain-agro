import { ProducerSchema } from "./producer.schema";

export const UpdateProducerSchema = ProducerSchema.pick({
  name: true,
  cpf: true,
  cnpj: true,
}).refine((data) => !(data.cpf && data.cnpj), {
  message: "Only one document must be provided",
  path: ["Document"],
});
