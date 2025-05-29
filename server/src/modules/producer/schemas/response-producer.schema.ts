import { ProducerSchema } from "./producer.schema";

export const ResponseProducerSchema = ProducerSchema.pick({
  id: true,
  name: true,
  cpf: true,
  cnpj: true,
  createdAt: true,
});
