import { Injectable } from '@nestjs/common';
import outdent from 'outdent';
import { EnviaCodigoLoginParams } from './dtos/envia-codigo-login-params.dto';

@Injectable()
export class TemplatesEmailService {
  enviaCodigoLogin(params: EnviaCodigoLoginParams) {
    const html = `
    <div style="background-color: #ffffff; padding: 12px;">
      <div style="width: 415px; margin: 0 auto;">
        <p style="margin: 10px 0 10px 0; color: #565a5c; font-size: 18px">Olá,</p>
        <p style="margin: 10px 0 10px 0; color: #565a5c; font-size: 18px">
          esse é o seu código:
        </p>
        <div style="padding: 10px; color: #565a5c; font-size: 32px; font-weight: 500; text-align: center; padding-bottom: 25px;">${params.codigo}</div>
      </div>
    </div>
    `;

    const text = outdent`
    Olá, esse é o seu código:

    ${params.codigo}
    `;

    return { html, text };
  }
}
