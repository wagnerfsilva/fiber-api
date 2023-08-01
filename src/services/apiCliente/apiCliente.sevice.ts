import * as https from 'node:https';
import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom, map } from 'rxjs';
import { BuscaClienteParams } from './dtos/busca-cliente-params.dto';
import { BuscaClienteResponse } from './dtos/busca-cliente-response.dto';
import { BuscaClienteApiResponse } from './dtos/busca-cliente-api-response.dto';

@Injectable()
export class ApiClienteService {
  constructor(private readonly httpService: HttpService) {}

  async buscaCliente(
    params: BuscaClienteParams,
  ): Promise<BuscaClienteResponse> {
    // TODO: buscar cliente real na API
    if (params.cpf === '19100000000') {
      return new Promise((resolve) => {
        resolve({
          id: '1234',
          cnpj_cpf: params.cpf,
          email: 'igor_goncalves_ferrari@hotmail.com',
        });
      });
    }

    const response = await firstValueFrom(
      this.httpService
        .post<BuscaClienteApiResponse>(
          `${process.env.API_CLIENTE_BASE}/cliente`,
          {
            qtype: 'cliente.cnpj_cpf',
            query: params.cpf,
            oper: '=',
          },
          {
            headers: {
              Authorization: `Basic ${process.env.API_CLIENTE_TOKEN}`,
              ixcsoft: 'listar',
            },
            httpsAgent: new https.Agent({
              rejectUnauthorized: false,
            }),
          },
        )
        .pipe(map((res) => res.data)),
    );

    return response.registros[0];
  }
}
