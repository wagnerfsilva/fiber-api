import { Injectable } from '@nestjs/common';

@Injectable()
export class UtilsService {
  /**
   * Função para gerar código de 4 digitos aleatorios
   */
  geraCodigoAleatorio() {
    return Math.floor(100000 + Math.random() * 900000);
  }
}
