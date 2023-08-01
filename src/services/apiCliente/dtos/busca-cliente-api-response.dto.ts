import { BuscaClienteResponse } from './busca-cliente-response.dto';

export class BuscaClienteApiResponse {
  page: string;
  total: string;
  registros: BuscaClienteResponse[];
}
