import { DocumentHelper } from "@common/helpers/document.helper";
import { z } from "zod";

export const ProducerSchema = z.object({
  id: z.number(),
  name: z.string().min(3).max(100),
  cpf: z
    .string()
    .min(11)
    .max(11)
    .optional()
    .refine((val) => !val || DocumentHelper.isValidCpf(val), {
      message: "Invalid CPF",
    }),
  cnpj: z
    .string()
    .min(14)
    .max(14)
    .optional()
    .refine((val) => !val || DocumentHelper.isValidCnpj(val), {
      message: "Invalid CNPJ",
    }),
  createdAt: z.date(),
});
