import * as https from 'node:https';
import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom, map } from 'rxjs';
import { BuscaClienteParams } from './dtos/busca-cliente-params.dto';
import { BuscaClienteResponse } from './dtos/busca-cliente-response.dto';
import { BuscaClienteApiResponse } from './dtos/busca-cliente-api-response.dto';
import { BuscaBoletosReceberParams } from './dtos/busca-boletos-params.dto';
import { BuscaBoletosReceberResponse } from './dtos/busca-boletos-response.dto';
import { BoletoParams } from './dtos/boleto-params.dto';
import { BoletoResponse } from './dtos/boleto-response.dto';
import { BoletoApiResponse } from './dtos/boleto-api-response.dto';

@Injectable()
export class ApiClienteService {
  constructor(private readonly httpService: HttpService) {}

  async buscaCliente(
    params: BuscaClienteParams,
  ): Promise<BuscaClienteResponse> {
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

  async buscaBoletosReceber(
    params: BuscaBoletosReceberParams,
  ): Promise<BuscaBoletosReceberResponse> {
    return firstValueFrom(
      this.httpService
        .post<BuscaBoletosReceberResponse>(
          `${process.env.API_CLIENTE_BASE}/fn_areceber`,
          {
            qtype: 'fn_areceber.id',
            query: params.id,
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
  }

  async obtemBoleto(params: BoletoParams): Promise<BoletoResponse> {
    const response = await firstValueFrom(
      this.httpService
        .post<BoletoApiResponse>(
          `${process.env.API_CLIENTE_BASE}/get_boleto`,
          {
            boletos: params.boletoId,
            juro: 'N',
            multa: 'N',
            tipo_boleto: 'arquivo',
            atualiza_boleto: 'N',
            base64: 'S',
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

    return { conteudo: response };
  }
}
