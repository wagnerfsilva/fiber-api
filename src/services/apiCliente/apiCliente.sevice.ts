import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { BuscaClienteParams } from './dtos/busca-cliente-params.dto';

@Injectable()
export class ApiClienteService {
  constructor(private readonly httpService: HttpService) {}

  buscaCliente(params: BuscaClienteParams): Promise<string> {
    return new Promise((resolve) => {
      if (params.cpf === '19100000000') {
        resolve('teste@teste.com');
      } else {
        resolve('');
      }
    });
  }
}
