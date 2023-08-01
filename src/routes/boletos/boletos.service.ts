import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { BoletosReceberResponse } from './dtos/boletosReceber-response.dto';
import { ApiClienteService } from 'src/services/apiCliente/apiCliente.sevice';
import { Request } from 'express';

@Injectable()
export class BoletosService {
  constructor(private readonly apiClienteService: ApiClienteService) {}

  async obtemBoletosReceber(request: Request): Promise<BoletosReceberResponse> {
    if (!request.user?.id) throw new InternalServerErrorException();

    const boletosReceber = await this.apiClienteService.buscaBoletosReceber({
      id: request.user.id,
    });

    return {
      boletos: boletosReceber.registros.map((registro) => ({
        data_vencimento: registro.data_vencimento,
        nn_boleto: registro.nn_boleto,
        valor: registro.valor,
      })),
    };
  }
}
