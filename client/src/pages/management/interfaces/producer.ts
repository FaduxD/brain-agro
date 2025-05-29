export type Producer = {
  id: number;
  name: string;
  cpf: string;
  cnpj: string;
  // city: string;
  // state: string;
  // totalArea: number;
  // atricultureArea: number;
  // vegetationArea: number;
  // producerId: number;
  createdAt: string;
  // updatedAt: string;
  farms: Farm[];
};

export type Crop = {
  id: number;
  farmId: number;
  plantationId: number;
  createdAt: string;
  updatedAt: string;
  plantation: Plantation;
};

export type Plantation = {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
};

export type Farm = {
  id: number;
  name: string;
  city: string;
  state: string;
  totalArea: number;
  atricultureArea: number;
  vegetationArea: number;
  producerId: number;
  createdAt: string;
  updatedAt: string;
  crops: Crop[];
};
