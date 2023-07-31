import { Injectable } from '@nestjs/common';
import type { Request } from 'express';

@Injectable()
export class AuthService {
  cookieOrHeaderExtractor(req?: Request) {
    if (req?.cookies?.token) return req.cookies.token;

    if (req?.headers?.authorization) {
      return req.headers.authorization.replace('Bearer ', '');
    }

    return null;
  }

  // async validaUsuario(id: number) {
  //   try {
  //     const usuario = await this.usuarioRepositorio.findUniqueAuth({
  //       where: {
  //         idLoginIdeiaInterno: id,
  //       },
  //     });

  //     if (!usuario) {
  //       return undefined;
  //     }

  //     return usuario;
  //   } catch (e) {
  //     return undefined;
  //   }
  // }
}
