import { Injectable } from '@nestjs/common';
import { SolicitaCodigoLoginBody } from './dtos/solicita-codigo-login-body.dto';
import { ApiClienteService } from 'src/services/apiCliente/apiCliente.sevice';

@Injectable()
export class LoginService {
  constructor(private readonly apiClienteService: ApiClienteService) {}

  async login(body: SolicitaCodigoLoginBody): Promise<void> {
    const email = this.apiClienteService.buscaCliente(body);
    console.log('email', email);
    console.log('body', body);
  }
}
