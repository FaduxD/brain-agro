import { getCities } from "@brazilian-utils/brazilian-utils";
import { FarmSchema } from "./farm.schema";
import { z } from "zod";

export const UpdateFarmSchema = FarmSchema.pick({
  name: true,
  city: true,
  state: true,
  totalArea: true,
  atricultureArea: true,
  vegetationArea: true,
  producerId: true,
})
  .extend({
    plantation: z.array(
      z.object({ farmId: z.number(), plantationId: z.number() }),
    ),
  })
  .superRefine((data, ctx) => {
    if ((data.state && !data.city) || (!data.state && data.city)) {
      ctx.addIssue({
        path: ["city"],
        code: z.ZodIssueCode.custom,
        message: "City and state must be provided together",
      });
    }
  });
