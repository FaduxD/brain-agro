import { ProducerSchema } from "@modules/producer/schemas/producer.schema";
import { CreateProducerSchema } from "@modules/producer/schemas/create-producer.schema";
import { ZodError } from "zod";
import { cnpj, cpf } from "cpf-cnpj-validator";

describe("CreateProducerSchema", () => {
  const validCpf = cpf.generate();
  const validCnpj = cnpj.generate();

  describe("name", () => {
    it("deve aceitar um nome válido", () => {
      const result = CreateProducerSchema.safeParse({
        name: "Nome Válido",
        cpf: validCpf,
      });
      expect(result.success).toBe(true);
    });

    it("deve falhar se o nome for muito curto", () => {
      expect(() =>
        CreateProducerSchema.parse({
          name: "Jo",
          cpf: validCpf,
        }),
      ).toThrow(ZodError);
    });

    it("deve falhar se nome for um número", () => {
      const result = CreateProducerSchema.safeParse({
        name: 123,
        cpf: validCpf,
      });
      expect(result.success).toBe(false);
    });

    it("deve falhar se nome for um objeto", () => {
      const result = CreateProducerSchema.safeParse({
        name: { firstName: 123 },
        cpf: validCpf,
      });
      expect(result.success).toBe(false);
    });
  });

  describe("CPF", () => {
    it("deve validar com CPF válido", () => {
      const result = CreateProducerSchema.parse({
        name: "Produtor Teste",
        cpf: validCpf,
      });

      expect(result).toEqual({
        name: "Produtor Teste",
        cpf: validCpf,
      });
    });

    it("deve falhar se CPF for inválido", () => {
      expect(() =>
        CreateProducerSchema.parse({
          name: "Produtor Teste",
          cpf: "12345678900",
        }),
      ).toThrow(ZodError);
    });
  });

  describe("CNPJ", () => {
    it("deve validar com CNPJ válido", () => {
      const result = CreateProducerSchema.parse({
        name: "Produtor Teste",
        cnpj: validCnpj,
      });

      expect(result).toEqual({
        name: "Produtor Teste",
        cnpj: validCnpj,
      });
    });
    it("deve falhar se CNPJ for inválido", () => {
      expect(() =>
        CreateProducerSchema.parse({
          name: "Produtor Teste",
          cnpj: "12345678000100",
        }),
      ).toThrow(ZodError);
    });
  });

  describe("regra: CPF ou CNPJ deve ser informado", () => {
    it("deve falhar se CPF e CNPJ estiverem ausentes", () => {
      try {
        CreateProducerSchema.parse({
          name: "Produtor Teste",
        });
      } catch (err) {
        expect(err).toBeInstanceOf(ZodError);
        const error = err as ZodError;
        expect(error.errors[0].message).toBe("CPF or CNPJ must be provided");
        expect(error.errors[0].path).toEqual(["Document"]);
      }
    });
  });
});
