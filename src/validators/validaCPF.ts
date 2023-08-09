import { Injectable } from '@nestjs/common';
import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ name: 'ValidaCPF' })
@Injectable()
export class ValidaCPF implements ValidatorConstraintInterface {
  validate(value: any): boolean {
    if (!value) return false;

    const cpfLimpo = value.replace(/\D/g, ''); // Remove caracteres não numéricos
    if (cpfLimpo.length !== 11 || !/^\d{11}$/.test(cpfLimpo)) {
      return false; // Verifica se o CPF tem 11 dígitos numéricos
    }

    // Verificação de CPFs inválidos com todos os dígitos iguais
    if (/^(\d)\1{10}$/.test(cpfLimpo)) {
      return false;
    }

    // Cálculo do primeiro dígito verificador
    let soma = 0;
    for (let i = 0; i < 9; i++) {
      soma += parseInt(cpfLimpo.charAt(i)) * (10 - i);
    }
    let resto = (soma * 10) % 11;
    const primeiroDigitoVerificador = resto === 10 || resto === 11 ? 0 : resto;

    // Verificação do primeiro dígito verificador
    if (primeiroDigitoVerificador !== parseInt(cpfLimpo.charAt(9))) {
      return false;
    }

    // Cálculo do segundo dígito verificador
    soma = 0;
    for (let i = 0; i < 10; i++) {
      soma += parseInt(cpfLimpo.charAt(i)) * (11 - i);
    }
    resto = (soma * 10) % 11;
    const segundoDigitoVerificador = resto === 10 || resto === 11 ? 0 : resto;

    // Verificação do segundo dígito verificador
    if (segundoDigitoVerificador !== parseInt(cpfLimpo.charAt(10))) {
      return false;
    }

    return true; // CPF válido
  }

  defaultMessage(): string {
    return 'CPF inválido';
  }
}
