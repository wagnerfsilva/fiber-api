import { Controller, Post, Body } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { LoginService } from './login.service';
import { SolicitaCodigoLoginBody } from './dtos/solicita-codigo-login-body.dto';
import { ValidaCodigoLoginBody } from './dtos/valida-codigo-login-body.dto';
import { ValidaCodigoLoginResponse } from './dtos/valida-codigo-login-response.dto';

@ApiTags('Login')
@Controller('login')
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  @ApiResponse({
    description: 'Código enviado para o e-mail do usuário',
    status: 201,
  })
  @Post()
  login(@Body() body: SolicitaCodigoLoginBody): Promise<void> {
    return this.loginService.login(body);
  }

  @ApiResponse({
    description: 'Token gerado com sucesso',
    status: 201,
    type: ValidaCodigoLoginResponse,
  })
  @Post('/valida_codigo')
  validaCodigo(
    @Body() body: ValidaCodigoLoginBody,
  ): Promise<ValidaCodigoLoginResponse> {
    return this.loginService.validaCodigo(body);
  }
}
