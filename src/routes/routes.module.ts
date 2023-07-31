import { Module } from '@nestjs/common';
import { LoginModule } from './login/login.module';
import { BoletosModule } from './boletos/boletos.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [LoginModule, BoletosModule, AuthModule],
})
export class RoutesModule {}
