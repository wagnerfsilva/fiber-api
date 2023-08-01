import { Injectable, InternalServerErrorException } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { SolicitaCodigoLoginBody } from './dtos/solicita-codigo-login-body.dto';
import { ApiClienteService } from 'src/services/apiCliente/apiCliente.sevice';
import { CodigosValidaEmailRepositorio } from 'src/repositorios/codigosValidaEmail-repositorio';
import { UtilsService } from 'src/utils/utils/utils.service';
import { ValidaCodigoLoginBody } from './dtos/valida-codigo-login-body.dto';
import { ValidaCodigoLoginResponse } from './dtos/valida-codigo-login-response.dto';

@Injectable()
export class LoginService {
  constructor(
    private readonly apiClienteService: ApiClienteService,
    private readonly codigosValidaEmailRepositorio: CodigosValidaEmailRepositorio,
    private readonly utilsService: UtilsService,
  ) {}

  async login(body: SolicitaCodigoLoginBody): Promise<void> {
    const clienteResponse = await this.apiClienteService.buscaCliente(body);

    if (!clienteResponse) return;

    // gera codigo aleatorio
    const codigo = this.utilsService.geraCodigoAleatorio();

    await this.codigosValidaEmailRepositorio.create({
      data: {
        codigo,
        tentativas: 0,
      },
      where: {
        cpf: body.cpf,
      },
    });

    // TODO: enviar e-mail com o codigo para o usuario
  }

  async validaCodigo(
    body: ValidaCodigoLoginBody,
  ): Promise<ValidaCodigoLoginResponse> {
    const codigoValidaEmail =
      await this.codigosValidaEmailRepositorio.findUnique({
        where: {
          cpf: body.cpf,
        },
      });

    // verifica se usuario ja tentou 3 ou mais vezes o login
    if (!codigoValidaEmail || codigoValidaEmail.tentativas >= 3) {
      throw new InternalServerErrorException();
    }

    if (codigoValidaEmail.codigo !== body.codigo) {
      // se codigo errado, incrementa as tentativas
      await this.codigosValidaEmailRepositorio.update({
        data: {
          codigo: codigoValidaEmail.codigo,
          tentativas: (codigoValidaEmail.tentativas += 1),
        },
        where: { cpf: body.cpf },
      });
      throw new InternalServerErrorException();
    }

    // se acertou o codigo, remove da base
    await this.codigosValidaEmailRepositorio.delete({
      where: {
        cpf: body.cpf,
      },
    });

    const clienteResponse = await this.apiClienteService.buscaCliente(body);

    if (!clienteResponse) throw new InternalServerErrorException();

    const payload = {
      id: clienteResponse.id,
      cpf: body.cpf,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET || '', {
      algorithm: 'HS256',
      expiresIn: '2h',
    });

    return { token };
  }
}
