import { Injectable } from '@nestjs/common';
import { BoletosResponse } from './dtos/boletos-response.dto';

@Injectable()
export class BoletosService {
  async obtemBoletos(): Promise<BoletosResponse> {
    return {
      boletos: [
        {
          dataVencimento: new Date(),
        },
      ],
    };
  }
}
