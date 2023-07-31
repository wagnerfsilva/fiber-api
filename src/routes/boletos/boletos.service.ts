import { Injectable } from '@nestjs/common';
import { BoletosResponse } from './dtos/boletos-response.dto';

@Injectable()
export class BoletosService {
  async obtemBoletos(): Promise<BoletosResponse> {
    // TODO: retornar dados da API do cliente
    return {
      boletos: [
        {
          dataVencimento: new Date(),
        },
      ],
    };
  }
}
