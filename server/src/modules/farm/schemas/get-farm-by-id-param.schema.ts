import { z } from "zod";
import { FarmSchema } from "./farm.schema";

export const GetFarmByIdParamFarmSchema = z.object({
  id: z
    .string()
    .or(z.number())
    .transform((val) => parseInt(String(val), 10))
    .pipe(z.number().int().positive()),
});
