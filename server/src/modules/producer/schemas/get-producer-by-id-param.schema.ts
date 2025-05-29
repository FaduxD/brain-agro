import { z } from "zod";

export const GetProducerByIdParamProducerSchema = z.object({
  id: z
    .string()
    .or(z.number())
    .transform((val) => parseInt(String(val), 10))
    .pipe(z.number().int().positive()),
});
