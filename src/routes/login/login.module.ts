import { Module } from '@nestjs/common';
import { LoginController } from './login.controller';
import { LoginService } from './login.service';
import { ApiClienteModule } from 'src/services/apiCliente/apiCliente.module';

@Module({
  imports: [ApiClienteModule],
  controllers: [LoginController],
  providers: [LoginService],
})
export class LoginModule {}
