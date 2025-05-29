import { cnpj, cpf } from "cpf-cnpj-validator";

export class DocumentHelper {
  static isValidCpf(value: string): boolean {
    return cpf.isValid(value);
  }

  static isValidCnpj(value: string): boolean {
    return cnpj.isValid(value);
  }
}
