import { FarmSchema } from "./farm.schema";

export const ResponseFarmSchema = FarmSchema.pick({
  id: true,
  name: true,
  city: true,
  state: true,
  totalArea: true,
  atricultureArea: true,
  vegetationArea: true,
  producerId: true,
  createdAt: true,
});
