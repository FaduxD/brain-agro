import { DocumentHelper } from "@common/helpers/document.helper";
import { z } from "zod";
import { ProducerSchema } from "./producer.schema";

export const CreateProducerSchema = ProducerSchema.pick({
  name: true,
  cpf: true,
  cnpj: true,
})
  .refine((data) => !!data.cpf || !!data.cnpj, {
    message: "CPF or CNPJ must be provided",
    path: ["Document"],
  })
  .refine((data) => !(data.cpf && data.cnpj), {
    message: "Only one document must be provided",
    path: ["Document"],
  });
