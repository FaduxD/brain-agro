import { z } from "zod";
import { getStates, getCities } from "@brazilian-utils/brazilian-utils";
import { StateCode } from "@brazilian-utils/brazilian-utils/dist/common/states";

const stateCodes: StateCode[] = getStates().map((s) => s.code);

export const FarmSchema = z.object({
  id: z.number(),
  name: z.string().min(3).max(100),
  city: z.string().min(3).max(50),
  state: z.enum(stateCodes as [StateCode, ...StateCode[]]),
  totalArea: z.number(),
  atricultureArea: z.number(),
  vegetationArea: z.number(),
  producerId: z.number(),
  createdAt: z.date(),
});
