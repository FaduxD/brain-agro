import { getCities } from "@brazilian-utils/brazilian-utils";
import { FarmSchema } from "./farm.schema";
import { z } from "zod";

export const CreateFarmSchema = FarmSchema.pick({
  name: true,
  city: true,
  state: true,
  totalArea: true,
  atricultureArea: true,
  vegetationArea: true,
  producerId: true,
})
  .extend({
    plantation: z.array(z.object({ plantationId: z.number() })),
  })
  .superRefine((data, ctx) => {
    if (data.atricultureArea + data.vegetationArea > data.totalArea) {
      ctx.addIssue({
        path: ["atricultureArea"],
        code: z.ZodIssueCode.custom,
        message:
          "Total area must be greater than the sum of agriculture and vegetation areas",
      });
    }

    const cities = getCities(data.state);
    if (!cities.includes(data.city)) {
      ctx.addIssue({
        path: ["city"],
        code: z.ZodIssueCode.custom,
        message: `City '${data.city}' is not valid for the state ${data.state}.`,
      });
    }
  });
