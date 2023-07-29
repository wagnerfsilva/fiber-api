import { Controller, Post, Body } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { LoginService } from './login.service';
import { SolicitaCodigoLoginBody } from './dtos/solicita-codigo-login-body.dto';

@ApiTags('Login')
@Controller('login')
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  @ApiResponse({ description: 'Código enviado para o e-mail do usuário' })
  @Post()
  login(@Body() body: SolicitaCodigoLoginBody): Promise<void> {
    return this.loginService.login(body);
  }
}
